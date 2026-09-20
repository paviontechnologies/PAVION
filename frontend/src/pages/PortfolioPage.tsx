// src/pages/PortfolioPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PortfolioNew from '../components/PortfolioNew';
import ImageShowcase from '../components/ImageShowcase';
import TestimonialsNew from '../components/TestimonialsNew';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Portfolio & Case Studies - Pavion Technologies"
        description="Explore our proven portfolio of custom software, enterprise platforms, mobile applications, and AI integrations built for high-growth businesses."
        canonical="https://paviontechnologies.com/portfolio"
        ogUrl="https://paviontechnologies.com/portfolio"
      />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#050508] border-b border-white/10 overflow-hidden text-white">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              Our Track Record
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase max-w-5xl mx-auto">
              Engineered with <br />
              <span className="text-[#60A5FA]">
                Precision & Impact
              </span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed mb-8">
              A showcase of enterprise platforms, full-stack software, mobile apps, and AI products we've architected from concept to global launch.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 group shadow-lg shadow-pink-600/20"
              data-cursor-hover
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Portfolio Component */}
      <PortfolioNew />

      {/* Visual Image Showcase */}
      <ImageShowcase />

      {/* Testimonials */}
      <TestimonialsNew />

      {/* Bottom CTA */}
      <section className="relative py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-center text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Ready to build your next success story?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can engineer a custom software or digital product for your company.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 group shadow-lg shadow-pink-600/20"
            data-cursor-hover
          >
            <span>Start a Project</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
