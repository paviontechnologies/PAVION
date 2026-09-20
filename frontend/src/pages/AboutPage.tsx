// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Compass, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import About from '../components/About';
import StatsSection from '../components/StatsSection';

const values = [
  {
    icon: Sparkles,
    title: 'Relentless Innovation',
    description: 'We continuously explore cutting-edge technologies to give our clients an unfair competitive advantage.'
  },
  {
    icon: Target,
    title: 'Outcome-Driven Engineering',
    description: 'Every line of code and interface decision is strictly aligned with tangible business growth and ROI.'
  },
  {
    icon: Compass,
    title: 'Radical Transparency',
    description: 'Open communication, real-time collaboration, and predictable sprint delivery without surprises.'
  },
  {
    icon: Award,
    title: 'Craftsmanship & Quality',
    description: 'We obsess over performance, code cleanliness, security audits, and ultra-fluid animations.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="About Us - Pavion Technologies | Creative Engineering Studio"
        description="Learn about Pavion Technologies, our leadership, core values, and our mission to build transformative digital experiences and scalable software."
        canonical="https://paviontechnologies.com/about"
        ogUrl="https://paviontechnologies.com/about"
      />

      {/* Page Header Hero */}
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
              Our Identity
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase max-w-5xl mx-auto">
              Architecting the Future of <br />
              <span className="text-[#60A5FA]">
                Digital Solutions
              </span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
              We are a team of visionary technologists, designers, and software engineers dedicated to transforming complex challenges into elegant solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Component (Includes Story, Highlights, and Team Section) */}
      <About />

      {/* Core Values Section */}
      <section className="relative py-28 bg-[#080B14] border-y border-white/10 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Our Core Values
            </h2>
            <p className="text-zinc-300 text-sm sm:text-lg font-normal">
              The foundational pillars that guide our work, culture, and client relationships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-8 rounded-2xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all group"
                  data-cursor-hover
                >
                  <div className="w-14 h-14 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA] mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* About CTA */}
      <section className="relative py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.06),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Want to collaborate with our team?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Whether you have a product in mind or need specialized technical consulting, we're ready to partner with you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 group shadow-lg shadow-pink-600/20"
            data-cursor-hover
          >
            <span>Let's Talk</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
