// src/components/ClayStudioHero.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  Terminal as TerminalIcon
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ClayStudioHero = () => {
  const heroRef = useRef(null);
  const [typedCode, setTypedCode] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  // Mouse coordinate motion values for 3D physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const cameraEyeX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const cameraEyeY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  // Handle Mouse Move
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Real-time retro terminal typing
  useEffect(() => {
    const codeLines = [
      '10 PRINT "PAVION STUDIO"',
      '20 GOTO 10',
      '# AI_ENGINE: v4.2_ONLINE',
      '> READY._'
    ];
    let currentIdx = 0;
    let charIdx = 0;
    let output = '';

    const interval = setInterval(() => {
      if (currentIdx < codeLines.length) {
        const line = codeLines[currentIdx];
        if (charIdx < line.length) {
          output += line[charIdx];
          setTypedCode(output);
          charIdx++;
        } else {
          output += '\n';
          setTypedCode(output);
          charIdx = 0;
          currentIdx++;
        }
      } else {
        setTimeout(() => {
          output = '';
          currentIdx = 0;
          charIdx = 0;
        }, 4000);
      }
    }, 55);

    return () => clearInterval(interval);
  }, []);

  const keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '↵'],
    ['SPACE']
  ];

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#F8FAFC] text-[#1F2937] pt-24 sm:pt-28 pb-10 select-none"
    >
      {/* ================================================================= */}
      {/* STUDIO BACKGROUND CINEMATIC AURORA SPECTRUM VIDEO                 */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-35 mix-blend-multiply scale-105"
        >
          <source src="/aurora_spectrum.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#F8FAFC]" />
      </div>

      {/* ================================================================= */}
      {/* STUDIO BACKGROUND AMBIENT RADIAL LIGHTING                         */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] bg-white/70 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#60A5FA]/15 rounded-full blur-[170px]" />
      </div>

      {/* ================================================================= */}
      {/* NATIVE PIXELATED TYPOGRAPHY 'PIXEL' (TOP FLOOR LAYER)            */}
      {/* ================================================================= */}
      <div className="absolute top-[27%] sm:top-[25%] left-0 right-0 z-0 flex justify-center items-center pointer-events-none select-none px-4">
        <div className="flex gap-2 sm:gap-4 font-mono font-black text-[15vw] sm:text-[14vw] leading-none tracking-widest uppercase text-[#60A5FA]/10 drop-shadow-[0_6px_16px_rgba(0,0,0,0.02)] opacity-95">
          <span>P</span>
          <span>I</span>
          <span>X</span>
          <span>E</span>
          <span>L</span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* NATIVE PIXELATED TYPOGRAPHY 'RISE' (BOTTOM FLOOR LAYER)           */}
      {/* ================================================================= */}
      <div className="absolute bottom-[20%] sm:bottom-[17%] left-0 right-0 z-0 flex justify-center items-center pointer-events-none select-none px-4">
        <div className="flex gap-4 sm:gap-8 font-mono font-black text-[9vw] sm:text-[9.5vw] leading-none tracking-[0.22em] uppercase text-[#60A5FA]/10 drop-shadow-[0_6px_16px_rgba(0,0,0,0.02)] opacity-95">
          <span>R</span>
          <span>I</span>
          <span>S</span>
          <span>E</span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TOP ROW: HEADLINE & 132% GROWTH METRIC                            */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Top Left: Counter & Headline */}
          <div className="md:col-span-8 lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider text-[#1E3A8A] px-2.5 py-0.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 shadow-sm">
                [ 1/8 ]
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
                Enterprise IT & Software Studio
              </span>
            </div>
            
            <div className="relative">
              {/* Logo Soft Blue subtle gradient glow effect behind the text */}
              <div className="absolute -inset-x-10 -inset-y-6 bg-[#60A5FA]/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.02] text-[#1E3A8A]">
                Smart IT Solutions, <br />
                Engineered <br />
                for Tomorrow
              </h1>
            </div>
          </div>

          {/* Top Right: Growth Metric Card */}
          <div className="md:col-span-4 lg:col-span-5 md:flex md:justify-end">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/80 border border-black/[0.06] backdrop-blur-xl shadow-lg max-w-xs">
              <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#1E3A8A] mb-1.5">
                <span className="text-[#DB2777] text-3xl font-black">↑</span>
                <span>132% GROWTH</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                Our enterprise clients see measurable business scale through bespoke software engineering, AI pipelines, and digital thinking.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================= */}
      {/* CENTER: 100% NATIVE INTERACTIVE 3D CLAY COMPUTER WORKSTATION      */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-4 sm:my-6 flex items-center justify-center">
        
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative flex flex-col items-center justify-center p-4"
        >
          {/* Studio Soft Floor Drop Shadow */}
          <div className="absolute -bottom-6 w-[360px] sm:w-[480px] h-12 bg-black/15 rounded-full blur-[20px] -z-10" />

          {/* ------------------------------------------------------------- */}
          {/* FLOATING 3D ELEMENT 1: WINGED CLAY MAIL ENVELOPE (Top Right)  */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-8 sm:-right-20 z-30 flex items-center"
          >
            {/* Left Wing */}
            <motion.div 
              animate={{ rotate: [-10, 15, -10] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-8 bg-white rounded-full shadow-md -mr-2 origin-right transform -rotate-12 border border-zinc-200"
            />
            {/* Clay Yellow Envelope */}
            <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-[#ffd13b] to-[#f5a623] shadow-[0_12px_24px_rgba(245,166,35,0.4)] border-2 border-white/60 p-2 flex items-center justify-center relative">
              <div className="w-5 h-5 rounded-full bg-[#d0021b] border border-white shadow-inner flex items-center justify-center text-[9px] text-white font-bold">
                ✉️
              </div>
            </div>
            {/* Right Wing */}
            <motion.div 
              animate={{ rotate: [10, -15, 10] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-8 bg-white rounded-full shadow-md -ml-2 origin-left transform rotate-12 border border-zinc-200"
            />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* FLOATING 3D ELEMENT 2: CLAY STICKY NOTE (Right Side)          */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            animate={{ y: [0, 8, 0], rotate: [8, 12, 8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute top-16 -right-12 sm:-right-24 z-20 w-20 h-20 rounded-xl bg-gradient-to-br from-[#ffe57f] to-[#ffd54f] shadow-lg border border-yellow-200/80 p-2.5 flex flex-col justify-between transform rotate-12"
          >
            <div className="w-4 h-1.5 bg-yellow-600/30 rounded-full mx-auto" />
            <div className="text-[10px] font-black tracking-tight text-yellow-950 font-mono leading-tight">
              IDEA: <br />
              CODE <br />
              MORE!
            </div>
            <div className="w-full h-1 bg-yellow-500/20 rounded" />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* 3D CLAY COMPUTER MONITOR HOUSING                              */}
          {/* ------------------------------------------------------------- */}
          <div className="relative w-[280px] sm:w-[360px] md:w-[400px] rounded-[38px] bg-gradient-to-b from-[#60A5FA] via-[#1E3A8A] to-[#1E3A8A] p-4 sm:p-6 shadow-[0_25px_60px_rgba(30,58,138,0.35),inset_0_4px_12px_rgba(255,255,255,0.4)] border-b-8 border-[#1e3a8a]">
            
            {/* Top 3D Red Clay Camera Turret */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-14 h-11 rounded-2xl bg-gradient-to-b from-[#60A5FA] to-[#60A5FA] shadow-[0_8px_16px_rgba(96,165,250,0.35)] border-t-2 border-white/40 flex items-center justify-center">
              {/* Camera Lens with Interactive Eye Tracking */}
              <motion.div 
                style={{ x: cameraEyeX, y: cameraEyeY }}
                className="w-6 h-6 rounded-full bg-[#0b1329] border-2 border-cyan-300 shadow-inner flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan] animate-pulse" />
              </motion.div>
            </div>

            {/* CRT Screen Bezel */}
            <div className="rounded-[28px] bg-[#1a1c1e] p-4 shadow-[inset_0_8px_20px_rgba(0,0,0,0.8)] border-4 border-[#1e3a8a]/80">
              
              {/* CRT Curved Screen Display */}
              <div className="relative rounded-2xl bg-[#0d140e] p-3 sm:p-4 min-h-[140px] sm:min-h-[160px] shadow-[inset_0_4px_16px_rgba(0,255,100,0.15)] overflow-hidden border border-emerald-900/50">
                {/* CRT Scanline Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                    backgroundSize: '100% 4px',
                  }}
                />

                {/* Live Monospace Terminal Text */}
                <div className="font-mono text-xs sm:text-sm text-emerald-400 font-bold leading-relaxed whitespace-pre-wrap">
                  {typedCode}
                  <span className="inline-block w-2.5 h-4 bg-emerald-400 ml-1 animate-pulse" />
                </div>
              </div>

            </div>

            {/* Floppy Drive Slot Detail */}
            <div className="mt-3 flex items-center justify-between px-2">
              <div className="w-20 sm:w-28 h-2 rounded-full bg-[#1e3a8a] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#ffd13b] shadow-sm animate-pulse" />
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* 3D MECHANICAL CLAY KEYBOARD DECK                              */}
          {/* ------------------------------------------------------------- */}
          <div className="relative -mt-3 w-[260px] sm:w-[340px] md:w-[380px] rounded-3xl bg-gradient-to-b from-[#60A5FA] to-[#1E3A8A] p-3 sm:p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_3px_8px_rgba(255,255,255,0.4)] border-b-6 border-[#1e3a8a]">
            
            <div className="flex flex-col gap-1.5 bg-[#1e3a8a]/60 p-2.5 rounded-2xl shadow-inner">
              {keyboardKeys.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
                  {row.map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveKey(key);
                        setTimeout(() => setActiveKey(null), 200);
                      }}
                      className={`
                        ${key === 'SPACE' ? 'w-28 sm:w-36' : key === '↵' ? 'w-10' : 'w-5 sm:w-7'}
                        h-5 sm:h-7 rounded-lg font-mono font-bold text-[8px] sm:text-[10px]
                        transition-all duration-100 flex items-center justify-center
                        ${activeKey === key 
                          ? 'bg-[#00C2FF] text-white shadow-none translate-y-1' 
                          : 'bg-white text-[#1F2937] shadow-[0_3px_0_#d1d5db,0_4px_6px_rgba(0,0,0,0.15)] hover:bg-blue-50'}
                      `}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* CONNECTED SMILING CLAY MOUSE & WIRE                           */}
          {/* ------------------------------------------------------------- */}
          <div className="absolute -bottom-8 -right-6 sm:-right-16 flex items-center pointer-events-none">
            
            {/* Dynamic SVG Mouse Wire */}
            <svg className="w-16 sm:w-24 h-12 overflow-visible" viewBox="0 0 100 50">
              <path 
                d="M 0,20 Q 40,-15 70,30 T 100,25" 
                fill="none" 
                stroke="#2d2d2d" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </svg>

            {/* Smiling Clay Mouse Sphere */}
            <motion.div 
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-[#DB2777] to-[#DB2777] shadow-[0_12px_25px_rgba(219,39,119,0.45),inset_0_3px_6px_rgba(255,255,255,0.5)] border-2 border-white/80 flex items-center justify-center text-xl cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
              title="Interactive Clay Mouse"
            >
              <div className="text-sm font-black text-white select-none">
                🙂
              </div>
            </motion.div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* FLOATING 3D ELEMENT 3: CLAY ORANGE TORUS RING (Bottom Left)  */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            animate={{ rotate: 360, y: [0, 6, 0] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -bottom-6 -left-6 sm:-left-16 w-14 sm:w-16 h-8 rounded-full border-[7px] border-[#F59E0B] shadow-[0_10px_20px_rgba(245,158,11,0.35)]"
          />

        </motion.div>

      </div>

      {/* ================================================================= */}
      {/* FLOATING RIGHT SOCIAL DOCK                                        */}
      {/* ================================================================= */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 p-2 rounded-2xl bg-white/80 border border-black/[0.08] backdrop-blur-xl shadow-xl">
        <a 
          href="https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#DB2777] hover:bg-pink-50 transition-all"
          title="Instagram"
          data-cursor-hover
        >
          <Instagram size={18} />
        </a>
        <a 
          href="https://www.linkedin.com/company/pavion-technologies/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#DB2777] hover:bg-pink-50 transition-all"
          title="LinkedIn"
          data-cursor-hover
        >
          <Linkedin size={18} />
        </a>
        <a 
          href="https://github.com/paviontechnologies" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#DB2777] hover:bg-pink-50 transition-all"
          title="GitHub"
          data-cursor-hover
        >
          <Github size={18} />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#DB2777] hover:bg-pink-50 transition-all"
          title="Twitter / X"
          data-cursor-hover
        >
          <Twitter size={18} />
        </a>
      </div>

      {/* ================================================================= */}
      {/* BOTTOM ROW: CTAs, BRAND PARAGRAPH & PHILOSOPHY QUOTE              */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Bottom Left: Paragraph & Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm sm:text-base text-zinc-700 font-medium leading-relaxed max-w-lg">
              We engineer custom software, scalable cloud systems, and intuitive AI platforms that drive client engagement, conversions, and exponential long-term growth.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="px-8 py-3.5 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                data-cursor-hover
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-white/90 border border-[#1E3A8A]/20 text-[#1E3A8A] font-bold text-sm hover:bg-white hover:border-[#1E3A8A]/40 shadow-md transition-all duration-300 backdrop-blur-xl"
                data-cursor-hover
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Bottom Center: Studio Notch Scroll Indicator */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center my-4 lg:my-0">
            <div className="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-[#0B1F3A] transition-colors cursor-pointer">
              <div className="w-5 h-8 rounded-full border-2 border-zinc-400 flex items-start justify-center p-1">
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-1.5 rounded-full bg-[#1769FF]"
                />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-600">Scroll to explore</span>
            </div>
          </div>

          {/* Bottom Right: Philosophy Quote */}
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-sm ml-auto">
              "From the first spark of an architectural concept to worldwide enterprise scale — we partner with ambitious organizations to build the future."
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ClayStudioHero;
