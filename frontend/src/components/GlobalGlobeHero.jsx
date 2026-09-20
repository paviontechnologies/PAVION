// src/components/GlobalGlobeHero.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Shield, Zap, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalGlobeHero = ({ onOpenModal }) => {
  const heroRef = useRef(null);
  const earthRef = useRef(null);

  // Parallax on mouse move for subtle 3D depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!earthRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      earthRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden bg-[#050B14] text-white pt-28 sm:pt-32 pb-20 select-none"
    >
      {/* ================================================================= */}
      {/* REAL PHOTOREALISTIC EARTH FROM SPACE BACKGROUND                   */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Real Earth Sphere with Atmospheric Horizon */}
        <div 
          ref={earthRef}
          className="absolute -top-16 sm:-top-28 md:-top-36 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] md:w-[1300px] lg:w-[1550px] aspect-square rounded-full transition-transform duration-700 ease-out"
        >
          {/* High-Resolution Real Earth Texture Image from Space */}
          <div 
            className="w-full h-full rounded-full bg-cover bg-center shadow-[0_0_140px_rgba(96,165,250,0.35)] relative overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=95')`,
              backgroundPosition: 'center 20%',
            }}
          >
            {/* Deep Navy / Soft Blue Cosmic Atmosphere Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/40 via-[#0B1F3A]/60 to-[#050B14] mix-blend-color" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050B14]/40 to-[#050B14]" />

            {/* Glowing Atmospheric Limb Glow */}
            <div className="absolute inset-0 rounded-full border-[3px] border-[#60A5FA]/40 shadow-[inset_0_0_90px_rgba(96,165,250,0.5)]" />
          </div>

          {/* Outer Atmospheric Aura Glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-b from-[#60A5FA]/30 via-[#DB2777]/15 to-transparent blur-[90px] -z-10" />
        </div>

        {/* Deep Space Cyber Matrix Floor Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96, 165, 250, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Ambient Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-transparent to-[#050B14]" />
      </div>

      {/* ================================================================= */}
      {/* FOREGROUND HERO CONTENT                                           */}
      {/* ================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center flex flex-col items-center">
        
        {/* Top Live Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0B1F3A]/90 border border-[#60A5FA]/40 backdrop-blur-2xl shadow-xl shadow-[#60A5FA]/10 mb-8 cursor-pointer hover:border-[#DB2777] transition-all group"
          onClick={() => onOpenModal ? onOpenModal('AI Automation') : null}
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#60A5FA]"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-white to-[#F59E0B] flex items-center gap-2">
            <span>Global Digital Engineering & AI Innovation</span>
            <ArrowRight size={14} className="text-[#DB2777] group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.06] tracking-tight max-w-5xl mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] uppercase"
        >
          Connectivity & Intelligence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#DB2777] to-[#F59E0B]">
            For Global Enterprises
          </span>
        </motion.h1>

        {/* Subtitle & Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-300 font-normal max-w-3xl leading-relaxed mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          Empowering forward-thinking businesses with autonomous AI systems, high-throughput cloud platforms, and immersive digital products engineered for multi-million user scale.
        </motion.p>

        {/* High-Converting Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <button
            onClick={() => onOpenModal ? onOpenModal('Get Started') : null}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-base sm:text-lg shadow-2xl shadow-[#DB2777]/40 hover:shadow-[#DB2777]/60 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            data-cursor-hover
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowUpRight size={22} className="relative z-10 group-hover:rotate-45 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-5 rounded-full bg-[#0B1F3A]/90 border border-[#60A5FA]/40 text-white font-bold text-base sm:text-lg hover:bg-[#1E3A8A]/60 hover:border-[#60A5FA] transition-all duration-300 backdrop-blur-2xl group shadow-lg"
            data-cursor-hover
          >
            <span>Explore Services</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform text-[#60A5FA]" />
          </Link>
        </motion.div>

        {/* ===== LIVE TELEMETRY STRIP ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-3xl bg-[#0B1F3A]/80 border border-white/[0.12] backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/20 border border-[#60A5FA]/35 flex items-center justify-center text-[#60A5FA] flex-shrink-0">
              <Zap size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-white">&lt; 25ms</div>
              <div className="text-[11px] text-zinc-300 font-medium">Global Edge Latency</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/35 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
              <Shield size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-white">99.99%</div>
              <div className="text-[11px] text-zinc-300 font-medium">High Availability SLA</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#DB2777]/20 border border-[#DB2777]/35 flex items-center justify-center text-[#DB2777] flex-shrink-0">
              <Globe size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-white">100+</div>
              <div className="text-[11px] text-zinc-300 font-medium">Global Deployments</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Activity size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-white">24/7</div>
              <div className="text-[11px] text-zinc-300 font-medium">Proactive Telemetry</div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default GlobalGlobeHero;
