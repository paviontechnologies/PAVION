// src/pages/SEOLandingPage.tsx
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Code2, 
  Zap, 
  ChevronRight,
  Globe2,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { seoPagesData, SEOPageData } from '../data/seoPagesData';

interface SEOLandingPageProps {
  pageSlug?: string;
}

const SEOLandingPage: React.FC<SEOLandingPageProps> = ({ pageSlug: explicitSlug }) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const activeSlug = explicitSlug || routeSlug;

  const data: SEOPageData | undefined = activeSlug ? seoPagesData[activeSlug] : undefined;

  // Track expanded FAQ index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Structured Data Schemas
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': data.title,
    'description': data.metaDescription,
    'provider': {
      '@type': 'Organization',
      'name': 'Pavion Technologies',
      'url': 'https://paviontechnologies.com',
      'logo': 'https://paviontechnologies.com/logo.png',
      'sameAs': [
        'https://www.linkedin.com/company/pavion-technologies/',
        'https://github.com/paviontechnologies',
        'https://www.instagram.com/pavion.technologies'
      ]
    },
    'areaServed': [
      { '@type': 'Country', 'name': 'United States' },
      { '@type': 'Country', 'name': 'United Kingdom' },
      { '@type': 'Country', 'name': 'Canada' },
      { '@type': 'Country', 'name': 'Australia' },
      { '@type': 'Country', 'name': 'India' },
      { '@type': 'Country', 'name': 'Germany' }
    ],
    'url': `https://paviontechnologies.com/${data.slug}`
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://paviontechnologies.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': data.type === 'service' ? 'Services' : 'Industries',
        'item': data.type === 'service' ? 'https://paviontechnologies.com/services' : 'https://paviontechnologies.com/#industries'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': data.title,
        'item': `https://paviontechnologies.com/${data.slug}`
      }
    ]
  };

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.metaDescription}
        keywords={`${data.primaryKeyword}, ${data.secondaryKeywords.join(', ')}`}
        canonical={`https://paviontechnologies.com/${data.slug}`}
        ogUrl={`https://paviontechnologies.com/${data.slug}`}
        schema={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="bg-[#050508] text-white min-h-screen selection:bg-[#DB2777] selection:text-white">
        
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="relative pt-24 pb-10 sm:pt-36 sm:pb-20 border-b border-white/10 overflow-hidden">
          {/* Ambient Cyber Accents */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#60A5FA]/10 via-[#DB2777]/10 to-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
              <ol className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400 font-medium">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <ChevronRight size={13} className="text-zinc-600" />
                </li>
                <li>
                  <Link 
                    to={data.type === 'service' ? '/services' : '/#industries'} 
                    className="hover:text-white transition-colors capitalize"
                  >
                    {data.type === 'service' ? 'Services' : 'Industries'}
                  </Link>
                </li>
                <li>
                  <ChevronRight size={13} className="text-zinc-600" />
                </li>
                <li className="text-[#60A5FA] font-semibold truncate max-w-[180px] sm:max-w-none">
                  {data.title}
                </li>
              </ol>
            </nav>

            {/* Badge & Target Market Pill */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777] animate-pulse" />
                {data.badge}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#60A5FA] text-[10px] sm:text-xs font-semibold">
                <Globe2 size={12} />
                <span>Target: {data.targetMarkets}</span>
              </span>
            </div>

            {/* Hero Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.15] max-w-5xl mb-4 sm:mb-6"
            >
              {data.heroHeadline}
            </motion.h1>

            {/* Hero Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-300 text-xs sm:text-base md:text-lg max-w-3xl leading-relaxed mb-6 sm:mb-8 font-normal"
            >
              {data.heroSubheadline}
            </motion.p>

            {/* Conversion CTA Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-12"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#DB2777] to-pink-600 hover:from-[#DB2777]/90 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-pink-600/25 transition-all hover:scale-105"
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={`https://wa.me/919528991434?text=Hi%20Pavion%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20${encodeURIComponent(data.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-emerald-500/20 hover:scale-105"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp</span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-black uppercase">Fastest</span>
              </a>

              <a
                href={`mailto:Contact@paviontechnologies.com?subject=Book%20a%2030-Min%20Discovery%20Call%20-%20${encodeURIComponent(data.title)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-semibold text-xs sm:text-sm transition-all"
              >
                <Calendar size={14} className="text-[#60A5FA]" />
                <span>Book 30-Min Call</span>
              </a>
            </motion.div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10">
              {data.statMetrics.map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0D1222]/80 border border-white/10">
                  <div className="text-xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#60A5FA]">
                    {stat.metric}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* EXECUTIVE OVERVIEW & ARCHITECTURAL HIGHLIGHTS             */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
                Executive Overview
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                Engineering Designed to Drive <span className="text-[#60A5FA]">Measurable Business ROI</span>
              </h2>
              {data.overviewText.map((p, idx) => (
                <p key={idx} className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {p}
                </p>
              ))}

              <div className="pt-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider block mb-2 sm:mb-3">
                  Core Keywords & Search Coverage
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#DB2777]/10 border border-[#DB2777]/30 text-[#DB2777] text-[11px] sm:text-xs font-bold">
                    #{data.primaryKeyword}
                  </span>
                  {data.secondaryKeywords.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] sm:text-xs font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                <h3 className="text-base sm:text-lg font-black text-white mb-4 sm:mb-5 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-400" />
                  <span>Architecture & Delivery Standards</span>
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {data.architectureHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} />
                      </div>
                      <span className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE CAPABILITIES & DELIVERABLES                          */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-20 bg-[#080B14] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
                Technical Capabilities
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                {data.featuresHeadline}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                Engineered with high modularity, automated testing, and comprehensive documentation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] font-bold">
                        {feature.tag || 'Module'}
                      </span>
                      <Zap size={14} className="text-zinc-500 group-hover:text-yellow-400 transition-colors" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white mb-1.5 sm:mb-2 group-hover:text-[#60A5FA] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-[11px] sm:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                    <span>Included in Architecture</span>
                    <CheckCircle2 size={13} className="ml-2 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* TECH STACK & ARCHITECTURE ECOSYSTEM                       */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
              Technology Stack
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Enterprise Tools & Proven Frameworks
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Zero obscure dependencies. We build exclusively on industry-standard technologies with massive talent pools and battle-tested longevity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {data.techStack.map((cat, idx) => (
              <div key={idx} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10">
                <div className="flex items-center gap-2 mb-3.5 sm:mb-4">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA]">
                    <Code2 size={14} />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.technologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#05070E] border border-white/10 text-[11px] sm:text-xs text-zinc-200 font-semibold hover:border-[#60A5FA]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SPRINT DELIVERY WORKFLOW                                  */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-20 bg-[#080B14] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
                Delivery Roadmap
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                From Specification to Production Launch
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                Agile two-week sprints with transparent staging environments, automated test reports, and daily async updates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.workflowSteps.map((step, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#DB2777] to-[#60A5FA]">
                      {step.step}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      <Clock size={10} />
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE FAQ ACCORDION (AEO / GEO OPTIMIZED)            */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-20 max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Direct technical answers to the most common questions regarding engineering, pricing, IP rights, and delivery.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3.5">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:text-[#60A5FA] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#60A5FA]' : ''}`}>
                      <ChevronDown size={15} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-2.5 font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CROSS-LINKING MATRIX (RELATED SOLUTIONS)                  */}
        {/* ========================================================= */}
        {data.relatedSlugs && data.relatedSlugs.length > 0 && (
          <section className="py-10 sm:py-14 bg-[#080B14] border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#DB2777]">
                    Explore Ecosystem
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black text-white uppercase">
                    Related Engineering Solutions
                  </h3>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] hover:text-white transition-colors"
                >
                  <span>View All Services</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {data.relatedSlugs.map((relSlug) => {
                  const rel = seoPagesData[relSlug];
                  if (!rel) return null;
                  return (
                    <Link
                      key={relSlug}
                      to={`/${rel.slug}`}
                      className="p-4 rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:bg-[#111A33] transition-all group"
                    >
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#DB2777] font-bold block mb-1">
                        {rel.type === 'service' ? 'Service' : 'Industry'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#60A5FA] transition-colors mb-1.5">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                        {rel.metaDescription}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* FAST ACTION CALL-TO-ACTION STRIP                          */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-[#050508] border-t border-white/10 text-center text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-3.5">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#DB2777] font-bold">
              Ready To Get Started?
            </span>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight">
              Launch Your {data.title} Project
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal max-w-xl mx-auto leading-relaxed">
              Consult directly with our engineering architects. We structure custom milestone proposals and technical specifications within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                Book a Free Consultation
              </Link>
              <a
                href={`https://wa.me/919528991434?text=Hi%20Pavion%20Technologies%2C%20I%20want%20to%20discuss%20a%20project%20for%20${encodeURIComponent(data.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default SEOLandingPage;
