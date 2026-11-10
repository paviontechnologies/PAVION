// src/services/supabaseBlogService.ts
import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '../data/blogData';
import { Newspaper, Sparkles, Code2, Cpu, Brain } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://aptrslrgfvcudtgqmtwi.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ppppIGJDP_9UGXAprXxEOw__sNH7Ri3';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role?: string;
  image_url?: string;
  read_time: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published: boolean;
  created_at: string;
}

export interface NewBlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  authorRole?: string;
  imageFile?: File | null;
  imageUrl?: string;
  readTime?: string;
  tags?: string[];
  metaDescription?: string;
  metaKeywords?: string;
}

// Map category to an appropriate Lucide icon and gradient
function getCategoryVisuals(category: string) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('ai') || cat.includes('model') || cat.includes('agent')) {
    return { icon: Brain, gradient: 'from-pink-500 to-purple-600' };
  }
  if (cat.includes('cloud') || cat.includes('devops') || cat.includes('infra')) {
    return { icon: Cpu, gradient: 'from-blue-500 to-cyan-600' };
  }
  if (cat.includes('software') || cat.includes('code') || cat.includes('web')) {
    return { icon: Code2, gradient: 'from-emerald-500 to-teal-600' };
  }
  if (cat.includes('strategy') || cat.includes('news') || cat.includes('business')) {
    return { icon: Newspaper, gradient: 'from-amber-500 to-orange-600' };
  }
  return { icon: Sparkles, gradient: 'from-violet-500 to-indigo-600' };
}

// Convert Supabase DB row to the frontend BlogPost model
export function formatDbPostToBlogPost(dbPost: DbBlogPost, numericId: number): BlogPost {
  const visuals = getCategoryVisuals(dbPost.category);
  const formattedDate = new Date(dbPost.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return {
    id: numericId,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt || '',
    content: dbPost.content,
    category: dbPost.category || 'AI & Technology',
    icon: visuals.icon,
    readTime: dbPost.read_time || '5 min read',
    date: formattedDate,
    author: dbPost.author || 'Pavion Technologies',
    authorRole: dbPost.author_role || 'Engineering Team',
    gradient: visuals.gradient,
    tags: Array.isArray(dbPost.tags) ? dbPost.tags : [dbPost.category || 'Technology'],
    metaDescription: dbPost.meta_description || dbPost.excerpt || dbPost.title,
    metaKeywords: dbPost.meta_keywords || (Array.isArray(dbPost.tags) ? dbPost.tags.join(', ') : 'technology, ai'),
    image: dbPost.image_url,
    featuredImage: dbPost.image_url
  };
}

// LocalStorage fallback helpers
const LOCAL_STORAGE_KEY = 'pavion_local_blogs';
const DELETED_SLUGS_KEY = 'pavion_deleted_blog_slugs';

export function getDeletedSlugs(): string[] {
  try {
    const raw = localStorage.getItem(DELETED_SLUGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markSlugAsDeleted(slug: string) {
  try {
    const current = getDeletedSlugs();
    if (!current.includes(slug)) {
      localStorage.setItem(DELETED_SLUGS_KEY, JSON.stringify([...current, slug]));
    }
  } catch (err) {
    console.warn('Failed to mark slug as deleted:', err);
  }
}

export function restoreDeletedSlug(slug: string) {
  try {
    const current = getDeletedSlugs();
    localStorage.setItem(DELETED_SLUGS_KEY, JSON.stringify(current.filter((s) => s !== slug)));
  } catch (err) {
    console.warn('Failed to restore slug:', err);
  }
}

function getLocalStoredBlogs(): DbBlogPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalStoredBlog(post: DbBlogPost) {
  try {
    restoreDeletedSlug(post.slug);
    const existing = getLocalStoredBlogs();
    const updated = [post, ...existing.filter((p) => p.slug !== post.slug)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

function removeLocalStoredBlog(slugOrId: string) {
  try {
    const existing = getLocalStoredBlogs();
    const updated = existing.filter((p) => p.slug !== slugOrId && p.id !== slugOrId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to remove from localStorage:', err);
  }
}

// Cloudflare KV Global Blog Endpoint (Instant edge sync across all devices & laptops worldwide)
const CLOUDFLARE_BLOGS_API =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'https://paviontechnologies.com/api/blogs'
    : '/api/blogs';

/**
 * Fetch all published blogs from Cloudflare KV & Supabase (with automatic LocalStorage fallback)
 */
export async function getSupabaseBlogs(includeDeleted = false): Promise<BlogPost[]> {
  const localList = getLocalStoredBlogs();
  let cloudflareList: DbBlogPost[] = [];
  let supabaseList: DbBlogPost[] = [];
  const deletedSlugs = new Set(getDeletedSlugs());

  // 1. Fetch from Cloudflare KV Edge API (Synchronized globally across all devices & laptops)
  try {
    const res = await fetch(CLOUDFLARE_BLOGS_API);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.blogs)) {
        cloudflareList = json.blogs as DbBlogPost[];
      }
    }
  } catch (cfErr) {
    console.warn('Cloudflare KV blogs fetch note:', cfErr);
  }

  // 2. Auto-sync: If user published any blogs in localStorage on this machine that are not yet in Cloudflare KV, sync them now!
  if (localList.length > 0) {
    const cfSlugs = new Set(cloudflareList.map((p) => p.slug));
    for (const localPost of localList) {
      if (!cfSlugs.has(localPost.slug) && !deletedSlugs.has(localPost.slug)) {
        fetch(CLOUDFLARE_BLOGS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localPost),
        }).catch((e) => console.warn('Background sync note:', e));
      }
    }
  }

  // 3. Fallback check to Supabase
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      supabaseList = data as DbBlogPost[];
    }
  } catch (err) {
    // Supabase optional
  }

  // Merge Cloudflare + Supabase + LocalStorage (avoiding duplicates by slug)
  const combined = [...cloudflareList];
  const seenSlugs = new Set(cloudflareList.map((p) => p.slug));

  for (const item of supabaseList) {
    if (!seenSlugs.has(item.slug)) {
      combined.push(item);
      seenSlugs.add(item.slug);
    }
  }

  for (const item of localList) {
    if (!seenSlugs.has(item.slug)) {
      combined.push(item);
      seenSlugs.add(item.slug);
    }
  }

  const filtered = includeDeleted 
    ? combined 
    : combined.filter((p) => !deletedSlugs.has(p.slug));

  return filtered.map((item, idx) => formatDbPostToBlogPost(item, 1000 + idx));
}

/**
 * Fetch single blog by slug from Cloudflare KV, Supabase or LocalStorage
 */
export async function getSupabaseBlogBySlug(slug: string): Promise<BlogPost | null> {
  const deletedSlugs = new Set(getDeletedSlugs());
  if (deletedSlugs.has(slug)) {
    return null;
  }

  // 1. Fetch from Cloudflare KV Edge API
  try {
    const res = await fetch(`${CLOUDFLARE_BLOGS_API}/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.blog) {
        return formatDbPostToBlogPost(json.blog as DbBlogPost, 9999);
      }
    }
  } catch (cfErr) {
    console.warn('Cloudflare KV slug fetch note:', cfErr);
  }

  // 2. Check local storage first
  const localList = getLocalStoredBlogs();
  const localMatch = localList.find((p) => p.slug === slug);
  if (localMatch) {
    return formatDbPostToBlogPost(localMatch, 9999);
  }

  // 3. Check Supabase
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return formatDbPostToBlogPost(data as DbBlogPost, 9999);
    }
  } catch (err) {
    console.warn('Failed to fetch blog by slug from Supabase:', err);
  }

  return null;
}

/**
 * Automatically resize & compress ANY image to standard 16:9 (1200x675) WebP/JPEG
 * No matter what size, orientation, or file type the user uploads!
 */
export async function optimizeAndCompressImage(
  file: File, 
  maxWidth = 1200, 
  maxHeight = 675
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve({ blob: file, dataUrl: e.target?.result as string });
            return;
          }

          // Compute aspect ratio cover (center crop)
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShiftX = (canvas.width - img.width * ratio) / 2;
          const centerShiftY = (canvas.height - img.height * ratio) / 2;

          // Fill dark background first
          ctx.fillStyle = '#0D1222';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw image centered and scaled
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShiftX,
            centerShiftY,
            img.width * ratio,
            img.height * ratio
          );

          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          canvas.toBlob(
            (blob) => {
              resolve({ blob: blob || file, dataUrl });
            },
            'image/jpeg',
            0.82
          );
        } catch (err) {
          console.warn('Canvas optimization fallback:', err);
          resolve({ blob: file, dataUrl: e.target?.result as string });
        }
      };
      img.onerror = () => resolve({ blob: file, dataUrl: (e.target?.result as string) || '' });
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve({ blob: file, dataUrl: '' });
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image file with zero restrictions and automatic fallback
 */
export async function uploadBlogImage(file: File): Promise<string> {
  // 1. Automatically optimize & compress in browser (works for any size: 1MB to 50MB)
  const { blob, dataUrl } = await optimizeAndCompressImage(file);

  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filePath = `uploads/${Date.now()}_${cleanName}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'image/jpeg'
      });

    // If storage upload succeeded, return CDN public URL
    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        return publicUrlData.publicUrl;
      }
    } else {
      console.warn('Supabase storage upload bypassed, using direct compressed image:', uploadError.message);
    }
  } catch (storageErr) {
    console.warn('Supabase storage unavailable, using direct compressed image:', storageErr);
  }

  // 2. Fail-proof fallback: return the high-performance compressed dataUrl
  // This guarantees the blog will NEVER fail to publish, even if Supabase storage bucket is not configured yet!
  return dataUrl;
}

/**
 * Create a new blog post in Supabase
 */
export async function createBlogPost(input: NewBlogPostInput): Promise<DbBlogPost> {
  let finalImageUrl = input.imageUrl || '';

  // If a file was uploaded, upload or compress it
  if (input.imageFile) {
    finalImageUrl = await uploadBlogImage(input.imageFile);
  }

  // Generate clean URL slug if not provided
  const generatedSlug = (input.slug || input.title)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Calculate estimated reading time
  const wordCount = (input.content || '').split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = input.readTime || `${readTimeMinutes} min read`;

  const newPost = {
    title: input.title.trim(),
    slug: generatedSlug,
    excerpt: input.excerpt.trim(),
    content: input.content.trim(),
    category: input.category || 'AI & Technology',
    author: input.author?.trim() || 'Pavion Technologies',
    author_role: input.authorRole?.trim() || 'Engineering Team',
    image_url: finalImageUrl,
    read_time: readTime,
    tags: input.tags && input.tags.length > 0 ? input.tags : [input.category || 'Technology'],
    meta_title: input.title.trim(),
    meta_description: input.metaDescription?.trim() || input.excerpt.trim(),
    meta_keywords: input.metaKeywords?.trim() || (input.tags ? input.tags.join(', ') : 'technology, ai'),
    published: true,
    created_at: new Date().toISOString()
  };

  let createdPost: DbBlogPost = {
    id: 'blog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...newPost
  };

  // 1. Save to Cloudflare KV Global API (syncs across all devices & laptops worldwide)
  try {
    const res = await fetch(CLOUDFLARE_BLOGS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    if (res.ok) {
      const resJson = await res.json();
      if (resJson.success && resJson.blog) {
        createdPost = resJson.blog as DbBlogPost;
      }
    }
  } catch (cfErr) {
    console.warn('Cloudflare KV post error, using local fallback:', cfErr);
  }

  // 2. Also try Supabase (optional fallback)
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([newPost])
      .select()
      .single();

    if (!error && data) {
      createdPost = data as DbBlogPost;
    }
  } catch (err: any) {
    // Optional
  }

  // Save to local storage for instant zero-latency feedback on current machine
  saveLocalStoredBlog(createdPost);
  return createdPost;
}

/**
 * Delete blog post by ID or Slug globally
 */
export async function deleteBlogPost(slugOrId: string): Promise<boolean> {
  markSlugAsDeleted(slugOrId);
  removeLocalStoredBlog(slugOrId);

  // 1. Delete from Cloudflare KV Edge globally
  try {
    await fetch(CLOUDFLARE_BLOGS_API, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slugOrId, id: slugOrId, pin: 'pavion2026' })
    });
  } catch (cfErr) {
    console.warn('Cloudflare KV delete error:', cfErr);
  }

  // 2. Delete from Supabase if connected
  try {
    await supabase.from('blogs').delete().or(`id.eq.${slugOrId},slug.eq.${slugOrId}`);
  } catch (err) {
    console.warn('Supabase delete bypassed:', err);
  }
  return true;
}
