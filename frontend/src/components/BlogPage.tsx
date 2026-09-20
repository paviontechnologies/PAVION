// src/components/BlogPage.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  User, 
  BookOpen, 
  X,
  Tag as TagIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { blogPosts } from '../data/blogData';

const categories = [
  'All Articles',
  'AI & Automation',
  'AI Agents & Models',
  'Cloud & DevOps',
  'Software Engineering',
  'Strategy & News'
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filtered posts based on search & category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));

      const cat = post.category.toLowerCase();
      let matchesCategory = selectedCategory === 'All Articles';

      if (selectedCategory === 'AI & Automation') {
        matchesCategory = cat.includes('automation') || cat.includes('ai') || post.tags.some(t => t.toLowerCase().includes('automation'));
      } else if (selectedCategory === 'AI Agents & Models') {
        matchesCategory = cat.includes('agent') || cat.includes('platform') || post.tags.some(t => t.toLowerCase().includes('agent') || t.toLowerCase().includes('openai') || t.toLowerCase().includes('gemini'));
      } else if (selectedCategory === 'Cloud & DevOps') {
        matchesCategory = cat.includes('cloud') || cat.includes('aws') || cat.includes('saas') || cat.includes('transformation');
      } else if (selectedCategory === 'Software Engineering') {
        matchesCategory = cat.includes('software') || cat.includes('development') || post.tags.some(t => t.toLowerCase().includes('coding') || t.toLowerCase().includes('developer'));
      } else if (selectedCategory === 'Strategy & News') {
        matchesCategory = cat.includes('strategy') || cat.includes('news') || cat.includes('roi') || post.tags.some(t => t.toLowerCase().includes('news') || t.toLowerCase().includes('roi'));
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = blogPosts[0];
  const isShowingAll = selectedCategory === 'All Articles' && !searchQuery;
  const gridPosts = isShowingAll ? filteredPosts.filter(p => p.id !== featuredPost?.id) : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050508] pt-36 pb-24 relative overflow-hidden text-white">
      <SEO 
        title="Pavion Insights & Engineering Blog - AI, Cloud & Web Architecture"
        description="Explore technical breakdowns, AI automation guides, full-stack architecture patterns, and enterprise digital strategies from Pavion Technologies."
        canonical="https://paviontechnologies.com/blog"
        ogUrl="https://paviontechnologies.com/blog"
      />

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[750px] h-[750px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              <Sparkles size={14} />
              Insights & Architecture
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Pavion <span className="text-[#60A5FA]">Insights</span>
            </h1>
            <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl leading-relaxed">
              Explore technical breakdowns, AI automation guides, and modern software architectures written by our engineering leads.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Search & Categories Bar */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl space-y-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, tag, or technology (e.g. OpenAI, Cloud, ROI)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm sm:text-base focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label="Clear Search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-lg shadow-pink-600/25'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-zinc-400 font-mono font-bold">
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </div>
          </div>
        </div>

        {/* Featured Post Card (Shown when 'All Articles' and no search query) */}
        {featuredPost && isShowingAll && (
          <div className="mb-16 rounded-[2.5rem] bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 shadow-2xl overflow-hidden transition-all duration-500 group">
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[320px] bg-black/40 overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#DB2777] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-pink-600/30">
                    ⭐ Featured Article
                  </span>
                </div>
              </div>
              <div className="lg:col-span-6 p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs font-extrabold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <Link to={`/blog/${featuredPost.slug}`} className="block">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#60A5FA] transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-zinc-400 font-semibold">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[#60A5FA]" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#60A5FA]" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#60A5FA]" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-[#DB2777] group-hover:text-[#60A5FA] font-black uppercase transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {gridPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-transparent to-transparent opacity-90" />
                      
                      {/* Category Badge & Icon */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-extrabold uppercase shadow-md">
                          {post.category}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#60A5FA]">
                          <Icon size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <h3 className="text-xl font-black text-white group-hover:text-[#60A5FA] transition-colors uppercase leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-bold bg-white/[0.02]">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#60A5FA]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#60A5FA]" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#60A5FA] group-hover:translate-x-1 transition-transform font-black">
                      <span>Read</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-16 rounded-3xl bg-[#0D1222] border border-white/10 text-center shadow-xl mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA] mx-auto mb-4 border border-[#60A5FA]/20">
              <BookOpen size={30} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Articles Found</h3>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-sm mx-auto">
              We couldn't find any articles matching your query "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Articles'); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-pink-600/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter Subscription Card */}
        <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#080B14] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs font-extrabold uppercase tracking-wider">
              Weekly Newsletter
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Get Tech Insights <br />
              <span className="text-[#60A5FA]">Delivered to Your Inbox</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-lg font-normal leading-relaxed">
              We publish weekly guides on AI engineering, serverless scalability patterns, 
              and enterprise technical roadmaps. No spam. Unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-md">
                <span className="text-emerald-400 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  <span>Subscribed Successfully! Welcome to the List.</span>
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your professional email address"
                  className="flex-1 px-5 py-4 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm sm:text-base focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-2xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-pink-600/20"
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
