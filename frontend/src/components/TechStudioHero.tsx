// src/components/TechStudioHero.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Code2, 
  Terminal, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Check, 
  Mail, 
  MessageSquare,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import workstationImage from '../Images/3d-workstation.png';

const TechStudioHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const workstationRef = useRef<HTMLDivElement>(null);
  const [typedCode, setTypedCode] = useState('');

  // Real-time typing code snippet on workstation screen
  useEffect(() => {
    const codeSnippet = `const pavion = new AIStudio({
  mode: "Enterprise_Autonomous",
  security: "Zero_Trust_NDA",
  scale: "10M_Requests_Sec",
  status: "Deploying_Next15_AI..."
});
await pavion.launch();`;

    let i = 0;
    const timer = setInterval(() => {
      if (i <= codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, i));
        i++;
      } else {
        setTimeout(() => {
          i = 0;
        }, 3000);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // 3D Parallax on Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!workstationRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      workstationRef.current.style.transform = `perspective(1000px) rotateY(${x * 0.4}deg) rotateX(${-y * 0.4}deg) translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#06060d] text-white pt-24 sm:pt-28 pb-12 select-none"
    >
      {/* ================================================================= */}
      {/* LAYER 0 (z-0): COSMIC AMBIENT GLOWS & CYBER MATRIX               */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[170px]" />
        <div className="absolute -bottom-24 -left-24 w-[550px] h-[550px] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute -top-24 -right-24 w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[150px]" />

        {/* Matrix Floor Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ================================================================= */}
      {/* LAYER 1 (z-10): GIANT BACKGROUND TYPOGRAPHY 'PAVION' (BEHIND PC) */}
      {/* ================================================================= */}
      <div className="absolute top-[28%] sm:top-[26%] left-0 right-0 z-10 flex justify-center items-center pointer-events-none select-none px-4">
        <span className="font-black text-[16vw] sm:text-[15vw] leading-none tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/15 via-white/[0.06] to-transparent whitespace-nowrap drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          PAVION
        </span>
      </div>

      {/* ================================================================= */}
      {/* LAYER 2 (z-20): 3D ISOMETRIC WORKSTATION (SEAMLESS COMPOSITION)  */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 my-auto flex items-center justify-center pointer-events-none">
        
        <div 
          ref={workstationRef}
          className="relative transition-transform duration-300 ease-out flex items-center justify-center"
        >
          {/* Radial Ambient Backlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-indigo-500/30 to-cyan-500/30 rounded-full blur-[90px] -z-10 scale-95" />

          {/* 3D Computer Workstation - Screen Blend Mode with Feathered Mask to Guarantee ZERO Box Corners */}
          <div className="relative w-[340px] sm:w-[500px] md:w-[620px] lg:w-[700px] aspect-square flex items-center justify-center">
            <img 
              src={workstationImage} 
              alt="Pavion 3D Interactive Workstation" 
              className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_25px_60px_rgba(147,51,234,0.45)] filter contrast-[1.15] saturate-[1.25]"
              style={{
                maskImage: 'radial-gradient(ellipse at 50% 55%, black 60%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 60%, transparent 92%)',
              }}
              loading="eager"
            />
          </div>

        </div>

      </div>

      {/* ================================================================= */}
      {/* LAYER 3 (z-25): GIANT LOWER TYPOGRAPHY 'TECHNOLOGIES'            */}
      {/* ================================================================= */}
      <div className="absolute bottom-[22%] sm:bottom-[18%] left-0 right-0 z-25 flex justify-center items-center pointer-events-none select-none px-4">
        <span className="font-black text-[8.5vw] sm:text-[9.2vw] leading-none tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/12 via-white/[0.04] to-transparent whitespace-nowrap drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          TECHNOLOGIES
        </span>
      </div>

      {/* ================================================================= */}
      {/* LAYER 4 (z-30): FLOATING 3D INTERACTIVE ACCENT ELEMENTS          */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-30 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Element 1: Winged Yellow/Amber Mail Notification (Top Left) */}
        <motion.div 
          animate={{ y: [0, -14, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[32%] left-[12%] sm:left-[18%] hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-bold text-xs shadow-2xl shadow-blue-500/40 border border-blue-200/50 backdrop-blur-md"
        >
          <Mail size={15} />
          <span>New Lead Inquiry</span>
        </motion.div>

        {/* Floating Element 2: Cyan Neon Torus Ring (Floating Mid-Left) */}
        <motion.div 
          animate={{ rotate: 360, y: [0, 10, 0] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[46%] left-[8%] sm:left-[14%] w-14 sm:w-16 h-7 sm:h-8 rounded-full border-[3.5px] border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.7)] blur-[0.5px]"
        />

        {/* Floating Element 3: AI Assistant Lightning Pill (Top Right) */}
        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute top-[34%] right-[12%] sm:right-[18%] hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#121124]/90 border border-purple-400/40 text-white font-mono text-xs shadow-2xl shadow-purple-500/50 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold">GPT-4o Ready</span>
        </motion.div>

        {/* Floating Element 4: Smiling Sphere Mouse Badge (Bottom Right) */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-[32%] right-[10%] sm:right-[16%] hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] text-gray-300 backdrop-blur-md"
        >
          <span>🖱️ Interactive 3D Model</span>
        </motion.div>

      </div>

      {/* ================================================================= */}
      {/* LAYER 5 (z-40): FLOATING RIGHT SOCIAL DOCK                        */}
      {/* ================================================================= */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
        <a 
          href="https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all"
          title="Instagram"
          data-cursor-hover
        >
          <Instagram size={18} />
        </a>
        <a 
          href="https://www.linkedin.com/company/pavion-technologies/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all"
          title="LinkedIn"
          data-cursor-hover
        >
          <Linkedin size={18} />
        </a>
        <a 
          href="https://github.com/paviontechnologies" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all"
          title="GitHub"
          data-cursor-hover
        >
          <Github size={18} />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/30 transition-all"
          title="Twitter / X"
          data-cursor-hover
        >
          <Twitter size={18} />
        </a>
      </div>

      {/* ================================================================= */}
      {/* LAYER 6 (z-40): FOREGROUND HEADLINE, METRICS, CTAs & FOOTER QUOTE */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-40">
        
        {/* Top Row: Headline & 148% Growth Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6">
          
          {/* Top Left: Headline */}
          <div className="md:col-span-8 lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-purple-300 px-2.5 py-0.5 rounded bg-purple-500/15 border border-purple-400/30 shadow-sm shadow-purple-500/20">
                [1/8]
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                Enterprise IT & Software Studio
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] text-white">
              BUILDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                DIGITAL
              </span> <br />
              EXPERIENCES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
                THAT SCALE
              </span>
            </h1>
          </div>

          {/* Top Right: Growth Metric Card */}
          <div className="md:col-span-4 lg:col-span-5 md:flex md:justify-end">
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0f0f1c]/90 border border-white/10 backdrop-blur-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-2.5 text-2xl sm:text-3xl font-black text-white mb-2">
                <span className="text-emerald-400 text-3xl font-black">↑</span>
                <span>148% GROWTH</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                Our enterprise clients see measurable business scale through bespoke software engineering, AI pipelines, and digital thinking.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Row: CTAs, Scroll Indicator & Philosophy Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8">
          
          {/* Bottom Left: Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-lg">
              We engineer custom software, scalable cloud systems, and intuitive AI platforms that drive client engagement, conversions, and exponential long-term growth.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-extrabold text-sm shadow-xl shadow-purple-600/40 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                data-cursor-hover
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-white font-semibold text-sm hover:bg-white/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-xl"
                data-cursor-hover
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Bottom Center: Scroll Indicator */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center my-4 lg:my-0">
            <div className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-1.5 rounded-full bg-cyan-400"
                />
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-purple-300">Scroll to explore</span>
            </div>
          </div>

          {/* Bottom Right: Philosophy Quote */}
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm ml-auto">
              "From the first spark of an architectural concept to worldwide enterprise scale — we partner with ambitious organizations to build the future."
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default TechStudioHero;
