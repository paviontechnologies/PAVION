// src/components/GlobalGlobeHero.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Shield, Zap, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalGlobeHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move for subtle 3D depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#05050b] pt-28 pb-16"
    >
      {/* ================================================================= */}
      {/* REAL PHOTOREALISTIC EARTH FROM SPACE BACKGROUND (Image 1 & 4 Style)*/}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Real Earth Sphere with Atmospheric Horizon */}
        <div 
          ref={earthRef}
          className="absolute -top-16 sm:-top-28 md:-top-36 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] md:w-[1300px] lg:w-[1500px] aspect-square rounded-full transition-transform duration-700 ease-out"
        >
          {/* High-Resolution Real Earth Texture Image from Space */}
          <div 
            className="w-full h-full rounded-full bg-cover bg-center shadow-[0_0_120px_rgba(147,51,234,0.35)] relative overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=95')`,
              backgroundPosition: 'center 20%',
            }}
          >
            {/* Violet/Blue Cosmic Atmosphere Overlay (Reference Image 1 Tone) */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/35 via-indigo-900/40 to-[#05050b] mix-blend-color" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05050b]/40 to-[#05050b]" />

            {/* Glowing Atmospheric Limb Glow */}
            <div className="absolute inset-0 rounded-full border-[3px] border-purple-400/40 shadow-[inset_0_0_80px_rgba(168,85,247,0.5)]" />
          </div>

          {/* Outer Atmospheric Aura Glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-b from-purple-500/30 via-cyan-500/20 to-transparent blur-[80px] -z-10" />
        </div>

        {/* Deep Space Starfield & Cyber Matrix Floor Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Ambient Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050b] via-transparent to-[#05050b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05050b] via-transparent to-[#05050b]" />
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
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-cyan-500/20 border border-purple-400/40 backdrop-blur-2xl shadow-xl shadow-purple-500/20 mb-8"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-cyan-200 to-indigo-200">
            Global Digital Engineering & AI Innovation
          </span>
        </motion.div>

        {/* Main Hero Headline (Matching Reference Image 1 & 4) */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.08] tracking-tight max-w-5xl mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
        >
          Connectivity & Intelligence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-indigo-200">
            For Global Enterprises
          </span>
        </motion.h1>

        {/* Subtitle & Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-200 font-light max-w-3xl leading-relaxed mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
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
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold text-base shadow-2xl shadow-purple-600/50 hover:shadow-purple-500/80 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            data-cursor-hover
          >
            <span className="relative z-10">Discover More</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-[#121124]/90 border border-purple-400/40 text-white font-semibold text-base hover:bg-purple-950/40 hover:border-cyan-400 transition-all duration-300 backdrop-blur-2xl group shadow-lg"
            data-cursor-hover
          >
            <span>Start a Project</span>
            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform text-cyan-300" />
          </Link>
        </motion.div>

        {/* ===== LIVE TELEMETRY STRIP ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-3xl bg-black/60 border border-white/[0.12] backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/35 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Zap size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white">&lt; 25ms</div>
              <div className="text-[11px] text-gray-300">Global Edge Latency</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/35 flex items-center justify-center text-cyan-300 flex-shrink-0">
              <Shield size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white">99.99%</div>
              <div className="text-[11px] text-gray-300">High Availability SLA</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/35 flex items-center justify-center text-pink-400 flex-shrink-0">
              <Globe size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white">100+</div>
              <div className="text-[11px] text-gray-300">Global Deployments</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Activity size={20} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white">24/7</div>
              <div className="text-[11px] text-gray-300">Proactive Telemetry</div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default GlobalGlobeHero;
