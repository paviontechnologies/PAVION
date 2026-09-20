// src/pages/ProjectDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Github, 
  Globe, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Terminal, 
  Copy, 
  Check 
} from 'lucide-react';
import SEO from '../components/SEO';
import { projectsData, getProjectBySlug } from '../data/projectData';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = React.useState(false);

  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center bg-[#050508] text-white px-4 text-center">
        <SEO title="Project Not Found - Pavion Technologies" />
        <h1 className="text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tight text-white">Project Not Found</h1>
        <p className="text-zinc-400 mb-8 max-w-md">The project you are looking for does not exist or has been moved.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DB2777] text-white font-bold rounded-full hover:bg-[#DB2777]/90 transition-all shadow-lg shadow-pink-600/20"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  // Find next and previous projects for navigation
  const currentIndex = projectsData.findIndex(p => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${project.githubUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO 
        title={`${project.title} - Case Study | Pavion Technologies`}
        description={project.shortDescription}
        canonical={`https://paviontechnologies.com/portfolio/${project.slug}`}
        ogUrl={`https://paviontechnologies.com/portfolio/${project.slug}`}
      />

      {/* Main Container */}
      <article className="min-h-screen bg-[#050508] text-white pt-36 pb-24 relative overflow-hidden">
        {/* Dynamic Background Glows */}
        <div 
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-10"
          style={{ background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)` }}
        />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between py-4 mb-8 border-b border-white/10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors group"
              data-cursor-hover
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-semibold">
              <span>Portfolio</span>
              <span>/</span>
              <span className="text-[#60A5FA] font-bold truncate max-w-[200px]">{project.title}</span>
            </div>
          </div>

          {/* Project Title Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#DB2777]">
                {project.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs sm:text-sm font-bold text-zinc-300 border border-white/10 flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{project.year}</span>
              </span>
              {project.role && (
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs sm:text-sm font-bold text-zinc-300 border border-white/10 hidden sm:inline-flex">
                  {project.role}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight uppercase text-white">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-300 font-normal max-w-4xl leading-relaxed">
              {project.subtitle}
            </p>

            {/* Action Buttons: GitHub, Live Demo */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#DB2777] text-white font-black rounded-full hover:bg-[#DB2777]/90 transition-all duration-300 shadow-lg shadow-pink-600/20 group"
                data-cursor-hover
              >
                <Github size={18} />
                <span>View on GitHub</span>
                <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white font-bold bg-white/5 hover:bg-white/10 hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all group"
                  data-cursor-hover
                >
                  <Globe size={18} />
                  <span>Live Preview</span>
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </a>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] hover:text-white hover:bg-[#60A5FA] font-black text-sm sm:text-base transition-all"
                data-cursor-hover
              >
                <span>Hire Us for Similar Project</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group aspect-[16/9] md:aspect-[21/9] bg-black/40"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div className="p-5 rounded-2xl bg-[#0D1222]/90 backdrop-blur-md border border-white/10 max-w-xl shadow-xl">
                <span className="text-xs text-[#DB2777] font-extrabold uppercase tracking-wider block mb-1">Architecture Snapshot</span>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">{project.shortDescription}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Bar */}
          {project.stats && project.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 sm:p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-xl"
            >
              {project.stats.map((st, i) => (
                <div key={i} className="text-center p-4 border-r last:border-r-0 border-white/10">
                  <span className="text-3xl sm:text-4xl font-black text-[#60A5FA] block mb-1">{st.value}</span>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400 font-bold">{st.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* 2-Column Details: Overview & Tech Stack Breakdown */}
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            {/* Left Column: Full Description & Story */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <Sparkles className="text-[#DB2777]" size={26} />
                  <span>Project Overview</span>
                </h2>
                <p className="text-zinc-300 text-sm sm:text-lg font-normal leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* User Facing Features */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <CheckCircle2 className="text-[#60A5FA]" size={24} />
                  <span>Key Features & Capabilities</span>
                </h3>
                <div className="space-y-4">
                  {project.userFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#0D1222] border border-white/10 shadow-lg flex items-start gap-4 hover:border-[#60A5FA]/30 hover:shadow-xl transition-all"
                    >
                      <div className="p-2 rounded-xl bg-[#60A5FA]/10 text-[#60A5FA] flex-shrink-0 mt-0.5">
                        <Check size={18} />
                      </div>
                      <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Complete Tech Stack & GitHub Repository */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Tech Stack Specs Card */}
              <div className="p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl sticky top-28 space-y-8">
                <div>
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2.5 uppercase tracking-tight">
                    <Code2 className="text-[#60A5FA]" size={24} />
                    <span>Technology Stack</span>
                  </h3>

                  {/* Programming Languages */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold block mb-3">
                      Languages Used
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-3.5 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] font-bold text-xs sm:text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frameworks */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold block mb-3">
                      Frameworks & Libraries
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs sm:text-sm font-bold"
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cloud, Database & APIs */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold block mb-3">
                      Infrastructure, DB & Cloud
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.databasesAndCloud.map((db) => (
                        <span
                          key={db}
                          className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs sm:text-sm font-bold"
                        >
                          {db}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="pt-6 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold block mb-4">
                    Technical Highlights
                  </span>
                  <ul className="space-y-3">
                    {project.technicalFeatures.map((tf, i) => (
                      <li key={i} className="text-xs sm:text-sm text-zinc-300 font-medium flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#60A5FA] mt-2 flex-shrink-0" />
                        <span>{tf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clone Snippet Card */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold flex items-center gap-1.5">
                      <Terminal size={14} className="text-[#60A5FA]" />
                      <span>Clone Repository</span>
                    </span>
                    <button
                      onClick={handleCopyClone}
                      className="text-xs text-[#60A5FA] hover:text-[#DB2777] flex items-center gap-1 transition-colors font-bold"
                      data-cursor-hover
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-[#05070E] border border-white/10 font-mono text-xs text-zinc-300 break-all select-all flex items-center justify-between gap-2 shadow-inner">
                    <span>git clone {project.githubUrl}</span>
                  </div>
                </div>

                {/* Direct GitHub Link CTA */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#DB2777] text-white font-black rounded-2xl hover:bg-[#DB2777]/90 transition-all duration-300 shadow-lg shadow-pink-600/20 group"
                  data-cursor-hover
                >
                  <Github size={20} />
                  <span>Open GitHub Repository</span>
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

              </div>
            </div>
          </div>

          {/* Project Navigation (Previous / Next) */}
          <div className="pt-12 border-t border-white/10 mb-16">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Previous */}
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="p-6 rounded-2xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:bg-[#11172a] hover:shadow-xl transition-all group flex flex-col justify-between"
                data-cursor-hover
              >
                <span className="text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1 mb-2 font-bold">
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Project</span>
                </span>
                <span className="text-lg font-black text-white group-hover:text-[#60A5FA] transition-colors uppercase">
                  {prevProject.title}
                </span>
              </Link>

              {/* Next */}
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="p-6 rounded-2xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:bg-[#11172a] hover:shadow-xl transition-all group flex flex-col justify-between text-right sm:text-right"
                data-cursor-hover
              >
                <span className="text-xs text-zinc-400 uppercase tracking-wider flex items-center justify-end gap-1 mb-2 font-bold">
                  <span>Next Project</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <span className="text-lg font-black text-white group-hover:text-[#60A5FA] transition-colors uppercase">
                  {nextProject.title}
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <section className="p-8 sm:p-14 rounded-3xl bg-[#080B14] border border-white/10 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto relative z-10 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#DB2777] font-extrabold block">
                Have a similar vision?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Let's Engineer Your Next Product
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                From AI workflows to scalable enterprise platforms, our team is ready to partner with you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-[#DB2777] text-white font-black hover:bg-[#DB2777]/90 transition-all shadow-lg shadow-pink-600/20 hover:scale-105"
                  data-cursor-hover
                >
                  Start Your Project
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all hover:scale-105"
                  data-cursor-hover
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </section>

        </div>
      </article>
    </>
  );
};

export default ProjectDetailPage;
