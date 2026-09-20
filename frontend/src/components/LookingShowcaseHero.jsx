// src/components/LookingShowcaseHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const LookingShowcaseHero = ({ onOpenModal }) => {
  const containerRef = useRef(null);
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);

  const [pupil1, setPupil1] = useState({ x: 0, y: 0 });
  const [pupil2, setPupil2] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Geometric cursor tracking for both eyeballs
  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      // Calculate gaze angle & distance for Eye 1
      if (eye1Ref.current) {
        const rect1 = eye1Ref.current.getBoundingClientRect();
        const cx1 = rect1.left + rect1.width / 2;
        const cy1 = rect1.top + rect1.height / 2;
        const dx1 = clientX - cx1;
        const dy1 = clientY - cy1;
        const angle1 = Math.atan2(dy1, dx1);
        const dist1 = Math.hypot(dx1, dy1);
        const maxRadius1 = rect1.width * 0.24;
        const travel1 = Math.min(maxRadius1, dist1 * 0.08);
        setPupil1({
          x: Math.cos(angle1) * travel1,
          y: Math.sin(angle1) * travel1,
        });
      }

      // Calculate gaze angle & distance for Eye 2
      if (eye2Ref.current) {
        const rect2 = eye2Ref.current.getBoundingClientRect();
        const cx2 = rect2.left + rect2.width / 2;
        const cy2 = rect2.top + rect2.height / 2;
        const dx2 = clientX - cx2;
        const dy2 = clientY - cy2;
        const angle2 = Math.atan2(dy2, dx2);
        const dist2 = Math.hypot(dx2, dy2);
        const maxRadius2 = rect2.width * 0.24;
        const travel2 = Math.min(maxRadius2, dist2 * 0.08);
        setPupil2({
          x: Math.cos(angle2) * travel2,
          y: Math.sin(angle2) * travel2,
        });
      }
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Natural periodic eye blink
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85vh] sm:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#090C15] text-white pt-16 sm:pt-24 pb-8 sm:pb-12 select-none"
    >
      {/* ================================================================= */}
      {/* 0. AMBIENT SCI-FI BACKGROUND & PURPLE LIGHTING                    */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Dramatic Purple/Indigo Ambient Spotlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] h-[550px] bg-gradient-to-b from-purple-600/20 via-indigo-600/15 to-transparent rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#60A5FA]/10 rounded-full blur-[140px]" />
        
        {/* Subtle Cyber Dust & Matrix Texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(rgba(147, 51, 234, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Vertical Domain Tag on Right Edge (Matching Reference) */}
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500 font-bold rotate-90 origin-center whitespace-nowrap">
            www.paviontechnologies.com
          </span>
        </div>
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 w-full relative z-10 my-auto">
        
        {/* ================================================================= */}
        {/* 1. MAIN HEADLINE WITH EYE TYPOGRAPHY                              */}
        {/* ================================================================= */}
        <div className="text-center max-w-5xl xl:max-w-6xl mx-auto space-y-3.5 sm:space-y-6">
          
          {/* Top-Level Semantic H1 for SEO Audit & Screen Readers */}
          <h1 className="sr-only">
            Pavion Technologies — Enterprise Custom Software, Web Design, ERP & AI Solutions
          </h1>

          {/* Modern Unified Subtitle: "ARE YOU" */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#60A5FA] drop-shadow-md"
          >
            Are You
          </motion.div>

          {/* Huge 3D Word: "LOOKING" with Interactive Eyeball Pupils */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-0.5 sm:gap-2 text-[12.5vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] font-black tracking-tighter sm:tracking-tight text-white leading-none uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] max-w-full"
          >
            <span>L</span>

            {/* EYE 1 */}
            <div 
              ref={eye1Ref}
              className="relative w-[0.8em] h-[0.9em] rounded-[48%] bg-white border-2 sm:border-4 border-zinc-200 shadow-inner flex items-center justify-center overflow-hidden mx-0.5 my-auto cursor-pointer"
              onClick={() => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 180);
              }}
              title="Click me to blink!"
            >
              {/* Eyelid Blink */}
              <motion.div 
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-x-0 top-0 h-full bg-[#090C15] z-20 origin-top pointer-events-none"
              />

              {/* Pupil Outer Iris */}
              <motion.div 
                animate={{ x: pupil1.x, y: pupil1.y }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-700 via-purple-500 to-indigo-400 flex items-center justify-center shadow-md relative"
              >
                {/* Black Pupil Core */}
                <div className="w-[55%] h-[55%] rounded-full bg-black flex items-start justify-end p-0.5">
                  {/* White Light Catch / Glint */}
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_4px_white]" />
                </div>
              </motion.div>
            </div>

            {/* EYE 2 */}
            <div 
              ref={eye2Ref}
              className="relative w-[0.8em] h-[0.9em] rounded-[48%] bg-white border-2 sm:border-4 border-zinc-200 shadow-inner flex items-center justify-center overflow-hidden mx-0.5 my-auto cursor-pointer"
              onClick={() => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 180);
              }}
              title="Click me to blink!"
            >
              {/* Eyelid Blink */}
              <motion.div 
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-x-0 top-0 h-full bg-[#090C15] z-20 origin-top pointer-events-none"
              />

              {/* Pupil Outer Iris */}
              <motion.div 
                animate={{ x: pupil2.x, y: pupil2.y }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-700 via-purple-500 to-indigo-400 flex items-center justify-center shadow-md relative"
              >
                {/* Black Pupil Core */}
                <div className="w-[55%] h-[55%] rounded-full bg-black flex items-start justify-end p-0.5">
                  {/* White Light Catch */}
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_4px_white]" />
                </div>
              </motion.div>
            </div>

            <span>K</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </motion.div>

          {/* Subtitle Question */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-xl md:text-2xl lg:text-[1.65rem] text-zinc-200 font-semibold tracking-wide max-w-3xl mx-auto leading-snug px-2"
          >
            For a Professional Web Design, Custom Software or AI Landing Page?
          </motion.h2>

          {/* CTA Button: "Contact us Today" */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-2 sm:pt-3 flex justify-center"
          >
            <button
              onClick={() => onOpenModal ? onOpenModal('Web Design Consultation') : null}
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xl font-bold text-xs sm:text-base shadow-xl shadow-purple-900/20 hover:shadow-purple-600/30 hover:scale-105 transition-all duration-300 group"
              data-cursor-hover
            >
              <span>Contact us Today</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#60A5FA]" />
            </button>
          </motion.div>

          {/* Executive Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-sm text-zinc-300 font-medium"
          >
            {/* 1. Client Rating */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
              <span className="text-[#F59E0B] text-[11px] sm:text-xs">★★★★★</span>
              <span className="text-white font-bold">4.9/5</span>
              <span className="text-zinc-400 text-[10px] sm:text-xs">Client Rating</span>
            </div>

            {/* 2. Products Delivered */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">50+</span>
              <span className="text-zinc-400 text-[10px] sm:text-xs">Products Delivered</span>
            </div>

            {/* 3. Gurugram HQ */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
              <MapPin size={11} className="text-[#60A5FA]" />
              <span className="text-white font-bold">Gurugram HQ</span>
              <span className="text-zinc-400 text-[10px] sm:text-xs">• Global Reach</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LookingShowcaseHero;
