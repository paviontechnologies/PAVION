// src/pages/NotFoundPage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Layers, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Compass
} from 'lucide-react';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const suggestedLinks = [
    { name: 'Core Services', href: '/services', desc: 'Custom Software, AI & Mobile Apps', icon: Layers, color: 'text-[#60A5FA]' },
    { name: 'Selected Works', href: '/portfolio', desc: 'Case Studies, Demos & Repositories', icon: Briefcase, color: 'text-[#DB2777]' },
    { name: 'Career Openings', href: '/careers', desc: 'Explore Engineering Squad Roles', icon: Sparkles, color: 'text-[#F59E0B]' },
    { name: 'Contact Architects', href: '/contact', desc: 'Request a Fixed-Price Sprint Quote', icon: Mail, color: 'text-emerald-400' },
  ];

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Pavion Technologies"
        description="The requested page could not be located on the Pavion Technologies network. Return to homepage or browse our custom software and AI services."
        canonical="https://paviontechnologies.com/404"
      />

      <div className="min-h-screen bg-[#050508] text-white pt-36 pb-24 relative overflow-hidden flex items-center justify-center">
        {/* Subtle Cyber Glowing Spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-purple-600/15 via-blue-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Matrix grid background */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
          
          {/* Animated 404 Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>HTTP Status: 404 • Resource Disconnected</span>
            </div>

            <div className="relative inline-block">
              <h1 className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 select-none">
                404
              </h1>
              <span className="absolute -top-3 -right-6 px-3 py-1 rounded-full bg-[#DB2777] text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-lg">
                Signal Lost
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight max-w-xl mx-auto">
              This Page Does Not Exist in Our Grid
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-normal leading-relaxed">
              The route you requested might have been moved, renamed, or temporarily decommissioned. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-pink-600/25 hover:scale-105 active:scale-95"
            >
              <Home size={17} />
              <span>Return to Homepage</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm transition-all hover:scale-105"
            >
              <Mail size={17} className="text-[#60A5FA]" />
              <span>Contact Us</span>
            </Link>
          </motion.div>

          {/* Suggested Destinations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-left"
          >
            <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
              <Compass size={18} className="text-[#60A5FA]" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Suggested System Routes
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {suggestedLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.href}
                    className="p-5 rounded-2xl bg-[#090D1A]/70 hover:bg-[#090D1A] border border-white/10 hover:border-[#60A5FA]/40 transition-all group flex items-start justify-between shadow-lg"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={18} className={item.color} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-sm group-hover:text-[#60A5FA] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
