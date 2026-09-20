// src/components/ModernEnterpriseHero.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Cloud, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Lock, 
  Server,
  Play
} from 'lucide-react';

const ModernEnterpriseHero = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState('cloud');

  const capabilities = [
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, stat: '99.99% Uptime', desc: 'Auto-scaling AWS/GCP Kubernetes clusters with zero downtime.' },
    { id: 'ai', label: 'AI Automation', icon: Cpu, stat: '85% Cost Saved', desc: 'Autonomous LLM agents, document intelligence & workflow orchestration.' },
    { id: 'security', label: 'Zero-Trust Security', icon: Lock, stat: 'ISO & SOC-2', desc: 'End-to-end hardware encryption, compliance audits & penetration testing.' },
    { id: 'squads', label: 'Dedicated Squads', icon: Server, stat: '48h Deployment', desc: 'Pre-vetted senior full-stack engineers integrated directly with your sprints.' },
  ];

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden bg-[#F8FAFC] text-[#1F2937] pt-28 sm:pt-32 pb-20 select-none">
      
      {/* Background Decorative Tech Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Radial Ambient Color Blooms */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#60A5FA]/20 via-[#DB2777]/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#60A5FA]/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-[160px]" />

        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 58, 138, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 58, 138, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* ================================================================= */}
        {/* 1. TOP ANNOUNCEMENT BADGE                                         */}
        {/* ================================================================= */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 border border-[#60A5FA]/40 backdrop-blur-md shadow-md shadow-[#60A5FA]/10 hover:border-[#DB2777]/40 transition-all cursor-pointer group"
            onClick={() => onOpenModal ? onOpenModal('AI Automation') : null}
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DB2777] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DB2777]" />
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-[#1E3A8A] flex items-center gap-1.5">
              <span>Smart IT Solutions, Engineered for Tomorrow</span>
              <ArrowRight size={14} className="text-[#DB2777] group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* 2. MAIN EDITORIAL HEADLINE                                        */}
        {/* ================================================================= */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1E3A8A] uppercase leading-[1.05]"
          >
            Architecting Next-Gen <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E3A8A] via-[#DB2777] to-[#F59E0B]">
              Digital Evolution
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed"
          >
            We engineer high-performance cloud infrastructure, custom enterprise CRM/ERP systems, and AI automation pipelines that scale operations with zero downtime.
          </motion.p>

          {/* =============================================================== */}
          {/* 3. HERO ACTION BUTTONS & TRUST SIGNALS                          */}
          {/* =============================================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onOpenModal ? onOpenModal('Get Started') : null}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-base sm:text-lg rounded-full shadow-xl shadow-[#DB2777]/25 hover:shadow-2xl hover:shadow-[#DB2777]/40 hover:scale-105 transition-all duration-300 group"
              data-cursor-hover
            >
              <span>Get Started</span>
              <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-5 bg-white hover:bg-zinc-50 text-[#1E3A8A] border-2 border-[#60A5FA]/40 hover:border-[#1E3A8A] font-extrabold text-base sm:text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              data-cursor-hover
            >
              <span>Explore Services</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Trust Checkmarks */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm font-bold text-zinc-500"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F59E0B]" />
              <span>100% Code & IP Ownership</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F59E0B]" />
              <span>48-Hour Squad Deployment</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F59E0B]" />
              <span>99.99% High-Availability SLA</span>
            </span>
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* 4. HERO VISUAL SHOWCASE: FUTURISTIC GLASS COMMAND DECK            */}
        {/* ================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-14 sm:mt-18 relative max-w-5xl mx-auto"
        >
          {/* Neon Glow Rim */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#60A5FA] via-[#DB2777] to-[#F59E0B] rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 -z-10" />

          {/* Main Showcase Container */}
          <div className="relative rounded-[2rem] bg-[#0A1128] border-2 border-white/20 shadow-2xl overflow-hidden text-white">
            
            {/* Top Command Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline-block">pavion-system-core v3.2.0 • LIVE</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#60A5FA]">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <span>Zero-Trust Active</span>
              </div>
            </div>

            {/* Showcase Visual Content: Endless Digital Evolution Graphic */}
            <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden bg-[#050B14]">
              <img 
                src="/endless_evolution.gif" 
                alt="Pavion Endless Digital Evolution"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay Badge: Left */}
              <div className="hidden sm:flex absolute bottom-6 left-6 items-center gap-3 p-3.5 rounded-2xl bg-[#0A1128]/90 backdrop-blur-md border border-white/15 shadow-xl">
                <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold">
                  <Zap size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Telemetry</div>
                  <div className="text-white text-xs font-black">99.99% Operational Uptime</div>
                </div>
              </div>

              {/* Floating Overlay Badge: Right */}
              <div className="hidden sm:flex absolute bottom-6 right-6 items-center gap-3 p-3.5 rounded-2xl bg-[#0A1128]/90 backdrop-blur-md border border-white/15 shadow-xl">
                <div className="w-9 h-9 rounded-xl bg-[#60A5FA]/20 text-[#60A5FA] flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Security SLA</div>
                  <div className="text-white text-xs font-black">SOC-2 & ISO Compliant</div>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Capabilities Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 border-t border-white/10 bg-white/[0.02]">
              {capabilities.map((cap) => (
                <div 
                  key={cap.id}
                  onClick={() => onOpenModal ? onOpenModal(cap.label) : null}
                  className="p-4 sm:p-5 hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <cap.icon size={16} className="text-[#60A5FA] group-hover:text-[#DB2777] transition-colors" />
                    <span className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">{cap.label}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#F59E0B] font-semibold">{cap.stat}</div>
                  <div className="text-[11px] text-zinc-400 font-normal line-clamp-1 mt-1 hidden sm:block">{cap.desc}</div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ModernEnterpriseHero;
