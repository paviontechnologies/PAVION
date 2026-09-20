// src/components/HeroNew.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Lightbulb, 
  Star, 
  FolderGit2, 
  Users, 
  Clock, 
  Rocket, 
  Check, 
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';

const HeroNew: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle 3D mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      stageRef.current.style.transform = `perspective(1200px) rotateY(${x * 0.2}deg) rotateX(${-y * 0.2}deg) translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[96vh] flex flex-col justify-center items-center overflow-hidden bg-[#06060c] text-white pt-24 sm:pt-28 pb-16 select-none"
    >
      {/* ================================================================= */}
      {/* COSMIC AMBIENT GLOWS, CONCENTRIC RINGS & TWINKLING SPARKLES       */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Atmospheric Radial Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] bg-emerald-500/[0.04] rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/[0.07] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/[0.07] rounded-full blur-[140px]" />

        {/* Center Concentric Rings (Matching Screenshot) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-emerald-500/[0.06] pointer-events-none" />

        {/* 4-Point Star Sparkles (✦) */}
        <div className="absolute top-[28%] left-[22%] text-white/40 text-sm animate-pulse">✦</div>
        <div className="absolute top-[35%] right-[24%] text-emerald-400/50 text-base animate-pulse">✦</div>
        <div className="absolute bottom-[28%] left-[26%] text-purple-300/40 text-xs animate-ping">✦</div>
        <div className="absolute bottom-[32%] right-[20%] text-cyan-300/50 text-sm animate-pulse">✦</div>
        <div className="absolute top-[18%] right-[38%] text-white/30 text-xs">✦</div>
      </div>

      {/* ================================================================= */}
      {/* TOP FLOATING SATISFACTION PILL BADGE                              */}
      {/* ================================================================= */}
      <div className="relative z-30 flex justify-center mb-6 sm:mb-8">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0c1a10]/95 border border-emerald-400/50 backdrop-blur-xl shadow-[0_0_30px_rgba(52,211,153,0.35)]"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/25 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
            <Check size={14} className="stroke-[3]" />
          </div>
          <div>
            <div className="text-sm font-black text-white leading-none">98%</div>
            <div className="text-[9px] text-emerald-300 font-medium">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* MAIN 3-DEVICE HERO SHOWCASE STAGE                                 */}
      {/* ================================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        
        <div 
          ref={stageRef}
          className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 py-2 transition-transform duration-300 ease-out"
        >
          
          {/* ============================================================= */}
          {/* HORIZONTAL LASER BEAM & GLOWING NODES (Connecting 3 Phones)   */}
          {/* ============================================================= */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 items-center justify-between pointer-events-none px-12 xl:px-24">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 via-emerald-500/30 to-transparent relative flex items-center justify-between">
              
              {/* Left-to-Center Nodes */}
              <div className="flex items-center gap-3 ml-[22%]">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-600 border-2 border-white shadow-[0_0_15px_#9333ea] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </div>

              {/* Center Ring Node */}
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_16px_#10b981] flex items-center justify-center animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              </div>

              {/* Center-to-Right Nodes */}
              <div className="flex items-center gap-3 mr-[22%]">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_16px_#10b981] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_white]" />
              </div>

            </div>
          </div>

          {/* ============================================================= */}
          {/* LEFT DEVICE: ANALYTICS PHONE                                  */}
          {/* ============================================================= */}
          <div className="relative z-20 w-full sm:w-[270px] lg:w-[290px]">
            
            {/* Floating Badge 1: AI Powered Solutions (Top-Left) */}
            <motion.div 
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-2 sm:-left-6 z-30 px-3.5 py-2 rounded-2xl bg-[#160c14]/95 border border-pink-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(236,72,153,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                <Lightbulb size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none">AI</div>
                <div className="text-[8px] text-pink-300 font-medium">Powered Solutions</div>
              </div>
            </motion.div>

            {/* Floating Badge 2: 5.0 Client Rating (Mid-Left) */}
            <motion.div 
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-12 z-30 px-3.5 py-2 rounded-2xl bg-[#0c1e3a]/95 border border-blue-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(37,99,235,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-[#1769FF]/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Star size={14} className="fill-blue-400" />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none flex items-center gap-1">
                  <span>5.0</span>
                  <span className="text-[9px] text-blue-400">★★★★★</span>
                </div>
                <div className="text-[8px] text-blue-300 font-medium">Client Rating</div>
              </div>
            </motion.div>

            {/* Floating Badge 3: 200+ Projects Done (Bottom-Left) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -bottom-8 -left-2 sm:-left-6 z-30 px-3.5 py-2 rounded-2xl bg-[#120c20]/95 border border-purple-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(168,85,247,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <FolderGit2 size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none">200+</div>
                <div className="text-[8px] text-purple-300 font-medium">Projects Done</div>
              </div>
            </motion.div>

            {/* Phone Chassis */}
            <div className="relative aspect-[9/18] bg-gradient-to-b from-[#131022] via-[#0c0a18] to-[#05040d] rounded-[2.8rem] border-2 border-purple-500/40 p-4 shadow-[0_20px_50px_rgba(147,51,234,0.3)] overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Island Notch */}
              <div className="mx-auto w-24 h-4 bg-black rounded-full border border-white/10 mb-3" />

              {/* Screen Content */}
              <div className="space-y-3.5">
                
                {/* Header */}
                <div className="text-xs font-semibold text-gray-400">Analytics</div>

                {/* Purple Bar Chart */}
                <div className="p-3.5 rounded-2xl bg-[#19132e]/90 border border-purple-500/30 shadow-inner">
                  <div className="flex items-end gap-1.5 h-16 w-full mb-2">
                    {[30, 50, 75, 100, 70, 85, 60].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-600 via-purple-400 to-pink-300"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-black text-white">+127%</div>
                  <div className="text-[9px] text-gray-400">Growth Rate</div>
                </div>

                {/* Metric Card 1: Users */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="text-[9px] text-gray-400">Users</div>
                  <div className="text-sm font-bold text-white">24.5K</div>
                </div>

                {/* Metric Card 2: Revenue */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="text-[9px] text-gray-400">Revenue</div>
                  <div className="text-sm font-bold text-white">$48K</div>
                </div>

              </div>

              {/* Bottom Home Indicator */}
              <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-2" />

            </div>

          </div>

          {/* ============================================================= */}
          {/* CENTER DEVICE: FLAGSHIP APP PROMO PHONE                       */}
          {/* ============================================================= */}
          <div className="relative z-30 w-full sm:w-[330px] lg:w-[380px] xl:w-[410px]">
            
            {/* Phone Chassis */}
            <div className="relative aspect-[9/18.5] bg-gradient-to-b from-[#0f1b12] via-[#08120a] to-[#040805] rounded-[3.2rem] border-[3.5px] border-emerald-500/60 p-6 shadow-[0_25px_80px_rgba(16,185,129,0.35)] overflow-hidden flex flex-col justify-between items-center text-center">
              
              {/* Top Status Bar & Notch */}
              <div className="w-full flex items-center justify-between text-white text-[11px] font-medium font-mono mb-2">
                <span>9:41</span>
                <div className="w-28 h-4 bg-black rounded-full border border-white/15" />
                <div className="flex items-center gap-1 text-[10px]">
                  <span>5G</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Center Content */}
              <div className="my-auto space-y-6 w-full">
                
                {/* Glowing Lime Green App Icon Tile */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#1d3d23] to-[#0f2615] border-2 border-emerald-400/60 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(132,204,22,0.45)]">
                  <Navigation size={38} className="text-[#a3e635] rotate-45 stroke-[2.5]" />
                </div>

                {/* Headline */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white leading-tight">
                    Bring Your Product <br />
                    <span className="text-[#a3e635]">To Millions</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-2 max-w-[270px] mx-auto leading-relaxed">
                    Scale your digital presence with enterprise solutions
                  </p>
                </div>

                {/* Primary CTA Button */}
                <Link
                  to="/contact"
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#a3e635] hover:bg-[#84cc16] text-black font-black text-sm sm:text-base shadow-[0_12px_35px_rgba(163,230,53,0.45)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  data-cursor-hover
                >
                  <span>Get Started</span>
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </Link>

              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-white/25 rounded-full mx-auto" />

            </div>

          </div>

          {/* ============================================================= */}
          {/* RIGHT DEVICE: PROJECTS PROGRESS PHONE                         */}
          {/* ============================================================= */}
          <div className="relative z-20 w-full sm:w-[270px] lg:w-[290px]">
            
            {/* Floating Badge 1: 50+ Happy Clients (Top-Right) */}
            <motion.div 
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-2 sm:-right-6 z-30 px-3.5 py-2 rounded-2xl bg-[#0a161e]/95 border border-cyan-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(6,182,212,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Users size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none">50+</div>
                <div className="text-[8px] text-cyan-300 font-medium">Happy Clients</div>
              </div>
            </motion.div>

            {/* Floating Badge 2: 24/7 Support Available (Mid-Right) */}
            <motion.div 
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-12 z-30 px-3.5 py-2 rounded-2xl bg-[#1a0e1c]/95 border border-pink-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(236,72,153,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                <Clock size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none">24/7</div>
                <div className="text-[8px] text-pink-300 font-medium">Support Available</div>
              </div>
            </motion.div>

            {/* Floating Badge 3: Fast Delivery Time (Bottom-Right) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -bottom-8 -right-2 sm:-right-6 z-30 px-3.5 py-2 rounded-2xl bg-[#0c1e3a]/95 border border-cyan-500/50 backdrop-blur-xl shadow-[0_0_28px_rgba(6,182,212,0.4)] flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Rocket size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white leading-none">Fast</div>
                <div className="text-[8px] text-cyan-300 font-medium">Delivery Time</div>
              </div>
            </motion.div>

            {/* Phone Chassis */}
            <div className="relative aspect-[9/18] bg-gradient-to-b from-[#0d141e] via-[#070c12] to-[#030609] rounded-[2.8rem] border-2 border-cyan-500/40 p-4 shadow-[0_20px_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Island Notch */}
              <div className="mx-auto w-24 h-4 bg-black rounded-full border border-white/10 mb-3" />

              {/* Screen Content */}
              <div className="space-y-3.5">
                
                {/* Header */}
                <div className="text-xs font-semibold text-gray-400">Projects</div>

                {/* Progress Item 1: UI Design */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] text-gray-400">In Progress</span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">UI Design</div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full" />
                  </div>
                </div>

                {/* Progress Item 2: Mobile App */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="text-[9px] text-gray-400">Review</span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">Mobile App</div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-[50%] h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  </div>
                </div>

                {/* Progress Item 3: Branding */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-[9px] text-gray-400">Complete</span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">Branding</div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-[100%] h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
                  </div>
                </div>

              </div>

              {/* Bottom Home Indicator */}
              <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-2" />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroNew;
