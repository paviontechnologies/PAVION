// src/components/StatsSection.tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedCounter } from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Successfully completed for clients worldwide',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Building lasting partnerships',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    description: 'Client happiness guaranteed',
  },
];

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      // Parallax text effect
      gsap.to(text, {
        x: '-30%',
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-20 md:py-32 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
      {/* Large background text */}
      <div 
        ref={textRef}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
      >
        <span className="text-[20vw] font-black text-white/[0.02] tracking-[-0.05em]">
          PAVION TECHNOLOGIES • DIGITAL EXCELLENCE • 
        </span>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-14 md:mb-20">
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block mb-2 sm:mb-4">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-3 sm:mb-6 uppercase tracking-tight">
            Numbers That <br />
            <span className="text-[#60A5FA]">
              Speak Volumes
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="bg-[#0D1222] p-6 sm:p-10 md:p-14 group hover:bg-[#131a30] transition-all duration-500"
              data-cursor-hover
            >
              <div className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2 sm:mb-4 tracking-tight">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-1.5 sm:mb-3 group-hover:text-[#60A5FA] transition-colors">
                {stat.label}
              </h3>
              <p className="text-xs sm:text-base text-zinc-400 font-normal leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-16 md:mt-20 text-center">
          <p className="text-zinc-300 text-base sm:text-xl font-bold mb-4 sm:mb-6">
            Ready to be our next success story?
          </p>
          <Link 
            to="/contact"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-[#60A5FA] hover:text-[#DB2777] font-bold transition-colors group"
          >
            <span className="relative text-sm sm:text-base">
              Let's discuss your project
              <span className="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
