// src/components/BlogPostPage.tsx
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlogBySlug, getRelatedPosts, BlogPost } from '../data/blogData';
import SEO from './SEO';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);

  // Scroll reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(slug, 2));
        window.scrollTo(0, 0);
      } else {
        navigate('/blog');
      }
    }
  }, [slug, navigate]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    if (post) {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    }
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050508] pt-36 pb-16 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-white/20 border-t-[#DB2777] rounded-full animate-spin" />
      </div>
    );
  }

  const IconComponent = post.icon;

  return (
    <>
      <SEO
        title={`${post.title} | Pavion Technologies Blog`}
        description={post.metaDescription}
        keywords={post.metaKeywords}
        canonical={`https://paviontechnologies.com/blog/${post.slug}`}
        ogUrl={`https://paviontechnologies.com/blog/${post.slug}`}
        ogType="article"
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA] z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-[#050508] pt-36 pb-24 text-white relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />

        <article className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-8 font-semibold overflow-x-auto">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-zinc-600 flex-shrink-0" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={14} className="text-zinc-600 flex-shrink-0" />
            <span className="text-[#60A5FA] truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group font-bold text-sm sm:text-base"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-[#DB2777]" />
              <span>Back to all articles</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Article Header */}
            <header className="mb-10">
              
              {/* Category Badge & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#DB2777]/10 border border-[#DB2777]/20 flex items-center justify-center text-[#DB2777]">
                  <IconComponent size={20} />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] uppercase tracking-widest">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-8 leading-[1.15] uppercase tracking-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-xs sm:text-sm pb-8 border-b border-white/10 font-semibold">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-[#60A5FA]" />
                  <span className="text-white">{post.author}</span>
                  {post.authorRole && (
                    <span className="text-zinc-500">• {post.authorRole}</span>
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#60A5FA]" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[#60A5FA]" />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </header>

            {/* Hero Cover Image Banner */}
            {post.image && (
              <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 relative aspect-[16/9] shadow-2xl bg-black/40">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
              </div>
            )}

            {/* Article Content Container */}
            <div className="bg-[#0D1222] border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-12 mb-12">
              <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-normal leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Handle bold headers like **Header**
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={index} className="text-2xl sm:text-3xl font-black text-white mt-10 mb-5 uppercase tracking-tight flex items-center gap-2">
                        <span className="w-2 h-6 rounded-full bg-[#DB2777] inline-block mr-2" />
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  
                  // Handle headers followed by content
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={index} className="text-zinc-300 leading-relaxed mb-6">
                        {parts.map((part, partIndex) => (
                          partIndex % 2 === 1 
                            ? <strong key={partIndex} className="text-white font-black">{part}</strong>
                            : part
                        ))}
                      </p>
                    );
                  }

                  // Handle bullet points
                  if (paragraph.includes('• ')) {
                    const items = paragraph.split('• ').filter(item => item.trim());
                    return (
                      <ul key={index} className="space-y-3 mb-6 my-4">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] mt-2.5 flex-shrink-0" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="text-zinc-300 leading-relaxed mb-6 text-sm sm:text-base md:text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-white/10">
                <Tag size={16} className="text-zinc-500 mr-2" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm font-bold text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-8 border-t border-white/10">
                <span className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-bold">
                  <Share2 size={16} />
                  <span>Share this article</span>
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={shareOnTwitter}
                    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] hover:bg-white/10 transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    onClick={shareOnLinkedin}
                    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] hover:bg-white/10 transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] hover:bg-white/10 transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] hover:bg-white/10 transition-all relative"
                    aria-label="Copy link"
                  >
                    <Copy size={18} />
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#DB2777] text-white text-xs font-bold rounded-lg shadow-lg whitespace-nowrap">
                        Copied Link!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Author Profile Bio Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#080B14] border border-white/10 shadow-2xl mb-16 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DB2777] to-[#60A5FA] p-0.5 flex-shrink-0 shadow-lg shadow-pink-600/20">
                <div className="w-full h-full bg-[#0D1222] rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                  PT
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-xl font-black text-white uppercase">{post.author}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] font-bold">
                    {post.authorRole || 'Engineering Team'}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Pavion Technologies delivers enterprise software development, AI automation architecture, and digital engineering solutions for global businesses.
                </p>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 uppercase tracking-tight flex items-center gap-3">
                  <BookOpen size={24} className="text-[#60A5FA]" />
                  <span>Related Articles</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => {
                    const RelatedIcon = relatedPost.icon;
                    return (
                      <motion.div
                        key={relatedPost.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                          className="block bg-[#0D1222] border border-white/10 rounded-3xl overflow-hidden hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all shadow-xl h-full flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-transparent to-transparent opacity-90" />
                              <div className="absolute bottom-3 left-4">
                                <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/15 text-[#60A5FA]">
                                  <RelatedIcon size={16} />
                                </div>
                              </div>
                            </div>
                            <div className="p-6 space-y-2">
                              <span className="text-xs font-extrabold uppercase text-[#DB2777]">
                                {relatedPost.category}
                              </span>
                              <h3 className="text-lg font-black text-white line-clamp-2 uppercase group-hover:text-[#60A5FA]">
                                {relatedPost.title}
                              </h3>
                              <p className="text-zinc-400 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                            </div>
                          </div>
                          
                          <div className="p-6 pt-0">
                            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-zinc-400 font-bold">
                              <span>{relatedPost.readTime}</span>
                              <div className="flex items-center gap-1 text-[#60A5FA]">
                                <span>Read Article</span>
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-16"
            >
              <div className="bg-[#080B14] rounded-[2.5rem] p-8 sm:p-14 border border-white/10 relative overflow-hidden text-center shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
                
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs font-extrabold uppercase tracking-wider mb-4">
                  <Sparkles size={14} />
                  Let's Collaborate
                </span>
                
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                  Ready to Transform Your Business with AI?
                </h3>
                <p className="text-zinc-300 mb-8 max-w-xl mx-auto font-normal text-sm sm:text-base leading-relaxed">
                  Let's discuss how Pavion Technologies can help you leverage cutting-edge AI automation, cloud systems, and custom software for your specific business needs.
                </p>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-600/25"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
