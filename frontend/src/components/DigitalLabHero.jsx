// src/components/DigitalLabHero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Cpu, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  Database,
  Cloud,
  CheckCircle2,
  Code2,
  Zap
} from 'lucide-react';

const DigitalLabHero = ({ onOpenModal }) => {
  const [activeTier, setActiveTier] = useState(2); // 1, 2, or 3
  const [streamSpeed, setStreamSpeed] = useState(1);

  // Auto-cycle through lab tiers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTier((prev) => (prev % 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#070A14] text-white pt-24 sm:pt-28 pb-12 select-none">
      
      {/* ================================================================= */}
      {/* 0. AMBIENT SCI-FI BACKGROUND & LIGHT MIST                         */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Waterfall Ambient Cyan Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[900px] bg-gradient-to-b from-[#38BDF8]/20 via-[#60A5FA]/10 to-transparent blur-[120px]" />
        
        {/* Amber Energy Glow (Right Tower) */}
        <div className="absolute bottom-20 right-[15%] w-[450px] h-[450px] bg-[#F59E0B]/15 rounded-full blur-[160px]" />
        
        {/* Deep Violet Horizon Glow (Left) */}
        <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[170px]" />

        {/* Cyber floor matrix grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-[#070A14]/70" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[78vh]">
          
          {/* =============================================================== */}
          {/* 1. LEFT COLUMN: EDITORIAL "OUR MISSION" & ACTIONS (5 COLS)       */}
          {/* =============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7 z-20">
            
            {/* Top Lab Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl w-fit shadow-lg shadow-cyan-500/5 hover:border-cyan-400/40 transition-all cursor-pointer group"
              onClick={() => onOpenModal ? onOpenModal('Innovation Lab') : null}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
                Pavion Innovation Lab • v4.2
              </span>
            </motion.div>

            {/* Editorial "Our Mission" Headline */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]"
              >
                Our Mission
              </motion.h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#38BDF8] via-[#DB2777] to-[#F59E0B] rounded-full" />
            </div>

            {/* Mission Statement Paragraphs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-zinc-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg"
            >
              <p>
                At <span className="text-white font-bold">Pavion Technologies</span>, our purpose is to empower digital relationships through mobility, intelligent automation, and resilient architecture.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                By designing and developing custom enterprise applications, automated AI pipelines, and cloud systems, we act as a trusted guide — leading our clients through the process of building complex, high-velocity digital products.
              </p>
            </motion.div>

            {/* Action Buttons: "Let's Build!" */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => onOpenModal ? onOpenModal('Mission Project') : null}
                className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-white hover:bg-zinc-100 text-[#070A14] font-black text-base rounded-full shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:shadow-[0_0_45px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300 group"
                data-cursor-hover
              >
                <span>Let's Build!</span>
                <ArrowRight size={18} className="text-[#070A14] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 font-bold text-sm sm:text-base transition-all duration-300 group"
                data-cursor-hover
              >
                <span>Explore Lab Stack</span>
                <ArrowUpRight size={16} className="text-cyan-400 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>

            {/* Foreground Hologram HUD Card (Engineer Station) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>Telemetry HUD</span>
                </span>
                <span className="text-[#38BDF8] font-bold">LIVE TELEMETRY</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm sm:text-base font-black text-white">99.99%</div>
                  <div className="text-[10px] text-zinc-400 font-medium">Uptime SLA</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm sm:text-base font-black text-[#F59E0B]">48-Hour</div>
                  <div className="text-[10px] text-zinc-400 font-medium">Squad Match</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm sm:text-base font-black text-[#DB2777]">&lt; 20ms</div>
                  <div className="text-[10px] text-zinc-400 font-medium">Edge Sync</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* =============================================================== */}
          {/* 2. CENTER COLUMN: CASCADING LIGHT WATERFALL (2 COLS)             */}
          {/* =============================================================== */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center relative h-[78vh] overflow-hidden pointer-events-none">
            
            {/* Top Glowing Source Node */}
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_#38BDF8] mb-1">
              <span className="w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8]" />
            </div>

            {/* Glowing Waterfall Stream Column */}
            <div className="relative w-28 flex-1 flex justify-center overflow-hidden">
              
              {/* Primary Waterfall Beam */}
              <div className="w-16 h-full bg-gradient-to-b from-cyan-400/40 via-blue-500/25 to-cyan-300/30 blur-[6px]" />
              
              {/* Vertical Light Fibers (Waterfall strands) */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 bg-gradient-to-b from-transparent via-cyan-200 to-transparent"
                  style={{
                    left: `${20 + i * 12}%`,
                    height: '100%',
                    opacity: 0.6 + (i % 3) * 0.2,
                  }}
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5 + (i * 0.3),
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Falling Glowing Data Packets */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`packet-${i}`}
                  className="absolute w-2 h-6 rounded-full bg-white shadow-[0_0_12px_#38BDF8]"
                  style={{ left: `${35 + (i % 3) * 15}%` }}
                  animate={{
                    top: ['-10%', '110%'],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeIn',
                    delay: i * 0.6,
                  }}
                />
              ))}

              {/* Central Light Core */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-white/30 via-cyan-300/20 to-transparent blur-[3px]" />
            </div>

            {/* Bottom Mist & Pool Glow */}
            <div className="w-36 h-8 rounded-full bg-cyan-400/30 blur-xl mt-[-10px]" />
          </div>

          {/* =============================================================== */}
          {/* 3. RIGHT COLUMN: 3-TIER INNOVATION LAB TOWER (5 COLS)            */}
          {/* =============================================================== */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Tower Container with Glass & Neon Rim */}
            <div className="relative rounded-3xl bg-[#0B1020]/90 border border-white/20 shadow-2xl overflow-hidden backdrop-blur-2xl">
              
              {/* Top Header of Innovation Tower */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>RESEARCH TOWER • SECTOR A</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setActiveTier(tier)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all font-bold ${
                        activeTier === tier 
                          ? 'bg-[#38BDF8] text-[#070A14] shadow-md shadow-cyan-500/30' 
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      LVL {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOWER CHAMBERS (3 FLOORS STACKED) */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* ----------------------------------------------------------- */}
                {/* TIER 3 (TOP FLOOR): AI & DATA INTELLIGENCE CHAMBER          */}
                {/* ----------------------------------------------------------- */}
                <div 
                  onClick={() => setActiveTier(3)}
                  className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-500 border cursor-pointer ${
                    activeTier === 3 
                      ? 'bg-gradient-to-r from-blue-950/70 via-indigo-950/80 to-[#0B1020] border-cyan-400/60 shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
                      : 'bg-white/[0.02] border-white/10 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                        <Cpu size={16} />
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wide">
                        Tier 3: Autonomous AI & Data Lab
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      ACTIVE
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    Orchestrating agentic workflows, multi-modal LLM document processing, and predictive telemetry.
                  </p>

                  {/* Floating Hologram Mini Chips */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-200">
                      ◆ Vector Search
                    </span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-200">
                      ◆ Multi-Agent Swarms
                    </span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-200">
                      ◆ 85% Task Automation
                    </span>
                  </div>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* TIER 2 (MIDDLE FLOOR): AMBER ENERGY CLUSTER & CLOUD         */}
                {/* ----------------------------------------------------------- */}
                <div 
                  onClick={() => setActiveTier(2)}
                  className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-500 border cursor-pointer ${
                    activeTier === 2 
                      ? 'bg-gradient-to-r from-amber-950/60 via-[#1A1208] to-[#0B1020] border-[#F59E0B]/60 shadow-[0_0_30px_rgba(245,158,11,0.25)]' 
                      : 'bg-white/[0.02] border-white/10 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
                        <Cloud size={16} />
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wide">
                        Tier 2: High-Throughput Cloud Core
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F59E0B] bg-amber-950/60 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                      10M REQ/S
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    Liquid-cooled Kubernetes microservices, multi-region distributed databases, and zero-latency caches.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-amber-200">
                      ◆ AWS / GCP Multi-Cloud
                    </span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-amber-200">
                      ◆ 99.99% High Availability
                    </span>
                  </div>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* TIER 1 (BOTTOM FLOOR): ZERO-TRUST SECURITY & MOBILE APPS    */}
                {/* ----------------------------------------------------------- */}
                <div 
                  onClick={() => setActiveTier(1)}
                  className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-500 border cursor-pointer ${
                    activeTier === 1 
                      ? 'bg-gradient-to-r from-pink-950/60 via-purple-950/70 to-[#0B1020] border-[#DB2777]/60 shadow-[0_0_30px_rgba(219,39,119,0.25)]' 
                      : 'bg-white/[0.02] border-white/10 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#DB2777]/20 border border-[#DB2777]/40 flex items-center justify-center text-[#DB2777]">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wide">
                        Tier 1: Enterprise Web & Mobile Apps
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#DB2777] bg-pink-950/60 px-2 py-0.5 rounded border border-[#DB2777]/30">
                      SOC-2 COMPLIANT
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    React Native, iOS, Android, and scalable Next.js web applications with enterprise-grade data encryption.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-pink-200">
                      ◆ React Native / iOS / Android
                    </span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-pink-200">
                      ◆ End-to-End Encryption
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Catwalk Status Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/[0.02] text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Activity size={14} className="text-emerald-400" />
                  <span>All 3 Innovation Tiers Operational</span>
                </span>
                <span className="text-cyan-400 font-bold">48h Squad Match</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default DigitalLabHero;
