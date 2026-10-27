// src/pages/BlogAdminPage.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Trash2, 
  ArrowLeft, 
  RefreshCw, 
  ExternalLink,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Code2,
  FileText,
  Tag,
  Search,
  Globe,
  PlusCircle,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  createBlogPost, 
  getSupabaseBlogs, 
  deleteBlogPost, 
  optimizeAndCompressImage,
  getDeletedSlugs 
} from '../services/supabaseBlogService';
import { blogPosts, BlogPost } from '../data/blogData';

const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || 'pavion2026';

const categories = [
  'AI & Automation',
  'AI Agents & Models',
  'Cloud & DevOps',
  'Software Engineering',
  'Strategy & News',
  'IT Staffing & Architecture'
];

interface ManageableBlog extends BlogPost {
  isCustom?: boolean;
}

export const BlogAdminPage: React.FC = () => {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pavion_blog_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Top Tabs: 'create' | 'manage'
  const [activeAdminTab, setActiveAdminTab] = useState<'create' | 'manage'>('create');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [author, setAuthor] = useState('Pavion Technologies');
  const [authorRole, setAuthorRole] = useState('Engineering Team');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('AI, Software, Automation');
  const [readTime, setReadTime] = useState('5 min read');

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [useExternalUrl, setUseExternalUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editor Preview Tab
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    publishedSlug?: string;
  }>({ type: null, message: '' });

  // Manage Blogs State
  const [allManageableBlogs, setAllManageableBlogs] = useState<ManageableBlog[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);
  const [manageSearch, setManageSearch] = useState('');

  // Auto-slug generator from title
  useEffect(() => {
    if (title && !slug) {
      const generated = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  }, [title]);

  // Load existing blogs on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadBlogs();
    }
  }, [isAuthenticated]);

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const dynamicBlogs = await getSupabaseBlogs();
      const deletedSlugs = new Set(getDeletedSlugs());

      const dynamicMapped: ManageableBlog[] = dynamicBlogs.map((b) => ({
        ...b,
        isCustom: true
      }));

      const dynamicSlugs = new Set(dynamicBlogs.map((b) => b.slug));

      const staticMapped: ManageableBlog[] = blogPosts
        .filter((b) => !dynamicSlugs.has(b.slug) && !deletedSlugs.has(b.slug))
        .map((b) => ({
          ...b,
          isCustom: false
        }));

      setAllManageableBlogs([...dynamicMapped, ...staticMapped]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem('pavion_blog_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Default is pavion2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pavion_blog_admin_auth');
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      try {
        const { dataUrl } = await optimizeAndCompressImage(file);
        setImagePreview(dataUrl);
      } catch (err) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'Sample text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    setContent(content.substring(0, start) + replacement + content.substring(end));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in Title, Excerpt, and Content.'
      });
      return;
    }

    if (!imageFile && !imageUrl) {
      setSubmitStatus({
        type: 'error',
        message: 'Please upload an image or select a wallpaper.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const splitTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      const finalCategory = customCategory.trim() || category;

      const created = await createBlogPost({
        title,
        slug: slug.trim(),
        excerpt,
        content,
        category: finalCategory,
        author,
        authorRole,
        imageFile: useExternalUrl ? null : imageFile,
        imageUrl: useExternalUrl ? imageUrl : undefined,
        readTime,
        tags: splitTags,
        metaDescription: excerpt,
        metaKeywords: tags
      });

      setSubmitStatus({
        type: 'success',
        message: 'Blog published successfully! It is now live on the main website.',
        publishedSlug: created.slug
      });

      // Reset form
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setImageFile(null);
      setImagePreview('');
      setImageUrl('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Reload list
      loadBlogs();
    } catch (err: any) {
      console.error(err);
      setSubmitStatus({
        type: 'error',
        message: err.message || 'Failed to publish blog.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (slugToDelete: string) => {
    setDeletingSlug(slugToDelete);
    try {
      await deleteBlogPost(slugToDelete);
      setAllManageableBlogs((prev) => prev.filter((b) => b.slug !== slugToDelete));
      setDeleteConfirmSlug(null);
      setSubmitStatus({
        type: 'success',
        message: `Blog post "${slugToDelete}" was permanently deleted from the website.`
      });
    } catch (err: any) {
      alert('Delete failed: ' + (err.message || err));
    } finally {
      setDeletingSlug(null);
    }
  };

  // Filtered blogs for Manage tab
  const filteredManageableBlogs = useMemo(() => {
    if (!manageSearch.trim()) return allManageableBlogs;
    const q = manageSearch.toLowerCase().trim();
    return allManageableBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q)
    );
  }, [allManageableBlogs, manageSearch]);

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center px-4 py-16">
        <SEO 
          title="Admin Blog Publisher - Pavion Technologies" 
          description="Publisher portal" 
          canonical="https://paviontechnologies.com/admin/blog" 
        />
        <div className="max-w-md w-full bg-[#0E1326] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">Pavion Blog Admin</h1>
          <p className="text-sm text-slate-400 text-center mb-6">
            Enter your Admin Security PIN to create, edit or delete blogs.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Security PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: pavion2026)"
                className="w-full px-4 py-3 bg-[#151B33] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-center tracking-widest text-lg font-mono"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-red-400 text-xs flex items-center gap-1.5 justify-center">
                <AlertCircle className="w-4 h-4" /> {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" /> Unlock Admin Portal
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/blog" className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070913] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Admin Blog Dashboard - Pavion Technologies"
        description="Publish, manage and delete blogs"
        canonical="https://paviontechnologies.com/admin/blog"
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmSlug && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full bg-[#0E1326] border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete this Blog Post?</h3>
                <p className="text-sm text-slate-300 mt-1">
                  Are you sure you want to delete <span className="text-red-400 font-mono">"{deleteConfirmSlug}"</span>?
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  This blog will be removed immediately from the website.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmSlug(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deletingSlug === deleteConfirmSlug}
                  onClick={() => handleDeletePost(deleteConfirmSlug)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {deletingSlug === deleteConfirmSlug ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Yes, Delete Blog
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Blog Management Suite
            </div>
            <h1 className="text-3xl font-extrabold text-white">Pavion Blog Admin</h1>
            <p className="text-sm text-slate-400 mt-1">
              Add new blogs with instant image uploads, or delete existing blogs from the live website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/blog" 
              target="_blank"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-slate-300 flex items-center gap-1.5 transition-all"
            >
              <Globe className="w-4 h-4 text-emerald-400" /> View Live Blog
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-sm font-medium text-red-400 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Primary Action Tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveAdminTab('create')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === 'create'
                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/25'
                : 'bg-[#0E1326] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> ✍️ Write & Publish New Blog
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAdminTab('manage');
              loadBlogs();
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === 'manage'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25'
                : 'bg-[#0E1326] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Trash2 className="w-4 h-4 text-red-400" /> 🗑️ Delete & Manage Articles ({allManageableBlogs.length})
          </button>
        </div>

        {/* Status Message */}
        <AnimatePresence>
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{submitStatus.message}</p>
                  {submitStatus.publishedSlug && (
                    <Link
                      to={`/blog/${submitStatus.publishedSlug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-white underline font-medium mt-1 hover:text-pink-300"
                    >
                      Open your newly published post <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSubmitStatus({ type: null, message: '' })}
                className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= TAB 1: CREATE BLOG ================= */}
        {activeAdminTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Form Fields */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
              
              {/* Title & Slug */}
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Article Title <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. How AI Automation Saves 60+ Minutes Daily for Small Businesses"
                    className="w-full px-4 py-3 bg-[#151B33] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-all font-medium text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    URL Slug (Auto-generated or custom)
                  </label>
                  <div className="flex items-center px-4 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm font-mono text-slate-400">
                    <span className="text-slate-500 hidden sm:inline">paviontechnologies.com/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="article-slug"
                      className="bg-transparent text-pink-400 focus:outline-none flex-1 ml-1"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image Upload */}
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Featured Cover Image <span className="text-pink-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseExternalUrl(!useExternalUrl)}
                    className="text-xs text-pink-400 hover:text-pink-300 underline font-medium cursor-pointer"
                  >
                    {useExternalUrl ? 'Upload File from Device instead' : 'Use External Image URL instead'}
                  </button>
                </div>

                {!useExternalUrl ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="blog-image-input"
                    />
                    <label
                      htmlFor="blog-image-input"
                      className="border-2 border-dashed border-white/15 hover:border-pink-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-[#151B33]/50 hover:bg-[#151B33] text-center"
                    >
                      {imagePreview ? (
                        <div className="space-y-3 w-full">
                          <div className="relative aspect-[16/9] w-full max-w-lg mx-auto rounded-xl overflow-hidden border border-white/15 shadow-xl bg-black/50">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-emerald-400 border border-white/10">
                              16:9 Preview Fit
                            </div>
                          </div>
                          <p className="text-xs text-pink-400 font-medium">Click to choose a different image</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-3">
                            <Upload className="w-6 h-6 text-pink-400" />
                          </div>
                          <p className="text-sm font-semibold text-white">Click to upload featured cover image</p>
                          <p className="text-xs text-pink-400 font-semibold mt-1">Auto-crops to 16:9 Landscape (Like existing blogs)</p>
                          <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Zero Restrictions: Any image size & format accepted</p>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-3 bg-[#151B33] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-all text-sm"
                    />
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="URL Preview" 
                        className="mt-3 max-h-40 rounded-xl object-cover"
                        onError={() => setImagePreview('')}
                      />
                    )}
                  </div>
                )}

                {/* 1-Click Curated Tech Images */}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-pink-400" /> Or 1-Click Select Premium HD Tech Wallpaper (Like Existing Blogs):
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { label: 'AI Neural', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Robotics', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Cyber Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Global Cloud', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Hardware', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setUseExternalUrl(true);
                          setImageUrl(preset.url);
                          setImagePreview(preset.url);
                          setImageFile(null);
                        }}
                        className="group/preset relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 hover:border-pink-500 transition-all text-left cursor-pointer"
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover/preset:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                          <span className="text-[10px] font-bold text-white group-hover/preset:text-pink-300">{preset.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Short Excerpt */}
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Short Excerpt / Summary <span className="text-pink-500">*</span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="A compelling 2-line summary shown on cards, Google search results, and social previews..."
                  className="w-full px-4 py-3 bg-[#151B33] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-all text-sm"
                  required
                />
              </div>

              {/* Content Editor */}
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-pink-400" />
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Article Body Content <span className="text-pink-500">*</span>
                    </label>
                  </div>
                  {/* Tabs */}
                  <div className="flex bg-[#151B33] p-1 rounded-lg border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('write')}
                      className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        activeTab === 'write' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        activeTab === 'preview' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeTab === 'write' ? (
                  <>
                    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#151B33] rounded-xl border border-white/10 text-slate-300">
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs italic flex items-center gap-1 cursor-pointer"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-[1px] h-4 bg-white/20 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n## ', '\n')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5" /> H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n### ', '\n')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Heading 3"
                      >
                        <Heading3 className="w-3.5 h-3.5" /> H3
                      </button>
                      <div className="w-[1px] h-4 bg-white/20 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n• ', '')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs flex items-center gap-1 cursor-pointer"
                        title="Bullet Point"
                      >
                        <List className="w-3.5 h-3.5" /> Bullet
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n> ', '\n')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs flex items-center gap-1 cursor-pointer"
                        title="Quote"
                      >
                        <Quote className="w-3.5 h-3.5" /> Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n```\n', '\n```\n')}
                        className="p-1.5 hover:bg-white/10 rounded text-xs flex items-center gap-1 cursor-pointer"
                        title="Code Block"
                      >
                        <Code2 className="w-3.5 h-3.5" /> Code
                      </button>
                    </div>

                    <textarea
                      id="content-editor"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={14}
                      placeholder="Write your article content here..."
                      className="w-full px-4 py-3 bg-[#151B33] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-all font-mono text-sm leading-relaxed"
                      required
                    />
                  </>
                ) : (
                  <div className="min-h-[350px] p-6 bg-[#151B33] border border-white/10 rounded-xl prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                    {content || <span className="text-slate-500 italic">No content written yet. Switch to "Write" tab to enter content.</span>}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-pink-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Publishing to Live Website...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Publish Blog to Main Website
                  </>
                )}
              </button>
            </form>

            {/* Sidebar Settings: Category, Metadata, Tags */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Category & Meta info */}
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white pb-2 border-b border-white/10 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-pink-400" /> Category & Author
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="custom">+ Custom Category</option>
                  </select>

                  {category === 'custom' && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full mt-2 px-3 py-2 bg-[#151B33] border border-white/10 rounded-xl text-xs text-white"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author Role</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI, Software, Cloud"
                    className="w-full px-3 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="w-full px-3 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Quick Delete Shortcut Card */}
              <div className="bg-[#0E1326] border border-red-500/20 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-red-400">
                  <Trash2 className="w-5 h-5" />
                  <h4 className="font-bold text-sm text-white">Manage & Delete Blogs</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Want to delete or remove any existing blog from the live website?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveAdminTab('manage');
                    loadBlogs();
                  }}
                  className="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Open Delete Manager ({allManageableBlogs.length})
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: MANAGE & DELETE BLOGS ================= */}
        {activeAdminTab === 'manage' && (
          <div className="space-y-6">
            
            {/* Search & Stats Bar */}
            <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={manageSearch}
                  onChange={(e) => setManageSearch(e.target.value)}
                  placeholder="Search articles to delete..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#151B33] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <span className="text-xs text-slate-400">
                  Showing <strong className="text-white">{filteredManageableBlogs.length}</strong> of {allManageableBlogs.length} blogs
                </span>
                <button
                  onClick={loadBlogs}
                  disabled={isLoadingBlogs}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBlogs ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>
            </div>

            {/* List of Manageable Blogs */}
            {filteredManageableBlogs.length === 0 ? (
              <div className="bg-[#0E1326] border border-white/10 rounded-2xl p-12 text-center space-y-3">
                <FileText className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Articles Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {manageSearch ? 'No articles match your search query.' : 'There are no articles available to manage.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredManageableBlogs.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-[#0E1326] border border-white/10 hover:border-white/20 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-28 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
                            {post.category}
                          </span>
                          {post.isCustom ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                              ✨ Custom
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                              Default
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                          {post.title}
                        </h4>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-500" /> {post.author}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" /> View Post
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmSlug(post.slug)}
                        className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Blog
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default BlogAdminPage;
