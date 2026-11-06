// worker.js - Cloudflare Worker for Pavion Website & Global Blog API

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle CORS Preflight Requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // 2. Handle /api/blogs API endpoints
    if (url.pathname === '/api/blogs' || url.pathname === '/api/blogs/') {
      // GET /api/blogs - Fetch all dynamic blogs globally
      if (request.method === 'GET') {
        try {
          const raw = await env.PAVION_BLOGS.get('blog_index', { type: 'json' });
          const blogs = Array.isArray(raw) ? raw : [];
          return jsonResponse({ success: true, blogs });
        } catch (err) {
          console.error('KV get error:', err);
          return jsonResponse({ success: false, blogs: [], error: err.message }, 500);
        }
      }

      // POST /api/blogs - Publish a new blog globally
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          if (!body.title || !body.content) {
            return jsonResponse({ success: false, error: 'Title and content are required' }, 400);
          }

          const slug = (body.slug || body.title)
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

          const newPost = {
            id: 'blog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            title: body.title.trim(),
            slug,
            excerpt: (body.excerpt || '').trim(),
            content: body.content.trim(),
            category: body.category || 'AI & Technology',
            author: (body.author || 'Pavion Technologies').trim(),
            author_role: (body.author_role || body.authorRole || 'Engineering Team').trim(),
            image_url: body.image_url || body.imageUrl || '',
            read_time: body.read_time || body.readTime || '5 min read',
            tags: Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : [body.category || 'Technology'],
            meta_title: (body.meta_title || body.title).trim(),
            meta_description: (body.meta_description || body.metaDescription || body.excerpt || body.title).trim(),
            meta_keywords: (body.meta_keywords || body.metaKeywords || '').trim(),
            published: true,
            created_at: body.created_at || new Date().toISOString(),
          };

          // Fetch existing index from Cloudflare KV
          const existing = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
          const filtered = Array.isArray(existing) ? existing.filter((p) => p.slug !== slug && p.id !== newPost.id) : [];
          const updated = [newPost, ...filtered];

          // Save to Cloudflare KV globally
          await env.PAVION_BLOGS.put('blog_index', JSON.stringify(updated));
          await env.PAVION_BLOGS.put('post_' + slug, JSON.stringify(newPost));

          return jsonResponse({ success: true, blog: newPost });
        } catch (err) {
          console.error('KV post error:', err);
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // DELETE /api/blogs - Delete a blog post globally
      if (request.method === 'DELETE') {
        try {
          const body = await request.json();
          const { slug, id, pin } = body;

          // Simple pin authorization
          if (pin !== 'pavion2026') {
            return jsonResponse({ success: false, error: 'Unauthorized: Invalid PIN' }, 401);
          }

          if (!slug && !id) {
            return jsonResponse({ success: false, error: 'Slug or ID is required' }, 400);
          }

          // Fetch existing index
          const existing = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
          const updated = Array.isArray(existing) ? existing.filter((p) => p.slug !== slug && p.id !== id) : [];

          // Save updated list to Cloudflare KV
          await env.PAVION_BLOGS.put('blog_index', JSON.stringify(updated));
          if (slug) {
            await env.PAVION_BLOGS.delete('post_' + slug);
          }

          return jsonResponse({ success: true, message: 'Blog deleted successfully from global KV' });
        } catch (err) {
          console.error('KV delete error:', err);
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }
    }

    // 3. Handle single blog lookup /api/blogs/:slug
    if (url.pathname.startsWith('/api/blogs/')) {
      const slug = decodeURIComponent(url.pathname.replace('/api/blogs/', '').trim());
      if (slug && request.method === 'GET') {
        const post = await env.PAVION_BLOGS.get('post_' + slug, { type: 'json' });
        if (post) {
          return jsonResponse({ success: true, blog: post });
        }
        // Fallback to checking index
        const index = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
        const match = Array.isArray(index) ? index.find((p) => p.slug === slug) : null;
        if (match) {
          return jsonResponse({ success: true, blog: match });
        }
        return jsonResponse({ success: false, error: 'Blog not found' }, 404);
      }
    }

    // 4. Default: delegate to Cloudflare static assets (React Single Page App)
    return env.ASSETS.fetch(request);
  },
};
