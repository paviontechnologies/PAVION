// src/components/PortfolioNew.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';
import { projectsData } from '../data/projectData';

gsap.registerPlugin(ScrollTrigger);

const PortfolioNew: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI & Machine Learning', 'Web Development', 'Software Development', 'Enterprise ERP'];
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll / filter change with safe initial opacity
      gsap.fromTo('.portfolio-card',
        { opacity: 0.2, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-28 bg-[#080B14] overflow-hidden text-white border-b border-white/10">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
            Proven Engineering & AI Works
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase">
            Selected <br />
            <span className="text-[#60A5FA]">Case Studies</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto">
            Click any project to explore its full technical architecture, languages used, user capabilities, and GitHub source code.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 border ${
                filter === cat
                  ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-lg shadow-pink-600/25 scale-105'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="portfolio-card group block relative rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl"
              data-cursor-hover
              data-cursor-text="Explore"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-white/10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Category Badge & Year */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3.5 py-1 text-xs rounded-full bg-black/85 border border-white/15 text-white font-extrabold">
                       {project.category}
                    </span>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-[#0D1222]/90 text-zinc-300 border border-white/15 font-mono font-bold shadow-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* GitHub indicator badge on image */}
                  <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#070A14] text-white border border-white/20 group-hover:bg-[#DB2777] group-hover:border-[#DB2777] transition-all shadow-lg">
                    <Github size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-colors leading-snug uppercase">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed line-clamp-3 mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Languages / Framework Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.languages.slice(0, 2).map((lang) => (
                      <span key={lang} className="text-xs px-3 py-0.5 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 font-bold">
                        {lang}
                      </span>
                    ))}
                    {project.frameworks.slice(0, 2).map((fw) => (
                      <span key={fw} className="text-xs px-3 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-bold">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-[#60A5FA] font-black group-hover:text-[#DB2777] transition-colors bg-white/[0.02]">
                <span>View Full Case Study & Code</span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center group-hover:bg-[#DB2777] group-hover:border-[#DB2777] group-hover:text-white transition-all">
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioNew;
