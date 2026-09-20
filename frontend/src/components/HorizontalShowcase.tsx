import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Palette, Smartphone, Cloud, Brain, Globe, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Software Development',
    description: 'Custom software solutions engineered for your unique challenges with clean, scalable architecture.',
    icon: Code2,
    color: 'from-blue-500 to-indigo-600',
    number: '01',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Web Applications',
    description: 'Lightning-fast, responsive web experiences built with cutting-edge technologies.',
    icon: Globe,
    color: 'from-cyan-500 to-blue-500',
    number: '02',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80',
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love and that drive engagement.',
    icon: Palette,
    color: 'from-pink-500 to-purple-600',
    number: '03',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80',
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications that deliver native-like performance.',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    number: '04',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions for modern businesses.',
    icon: Cloud,
    color: 'from-emerald-500 to-teal-500',
    number: '05',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Intelligent AI solutions powered by cutting-edge LLMs and ML models.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    number: '06',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
];

const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const progress = progressRef.current;
    const container = containerRef.current;
    if (!section || !trigger || !progress || !container) return;
    if (!isDesktop) {
      gsap.set(section, { clearProps: 'transform' });
      gsap.set(progress, { scaleX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Calculate scroll distance
      const scrollDistance = section.scrollWidth - window.innerWidth;

      // Create horizontal scroll animation
      const scrollTween = gsap.to(section, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(progress, {
              scaleX: self.progress,
              duration: 0.1,
            });
          },
        },
      });

      // Animate cards on scroll
      const cards = section.querySelectorAll('.service-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { 
            opacity: 0.5, 
            scale: 0.9,
            rotateY: 10,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 30%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050508] border-b border-white/10 overflow-hidden">
      <section id="services" ref={triggerRef} className="relative bg-[#050508] overflow-hidden py-24 lg:py-0">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 hidden lg:block">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA] origin-left scale-x-0"
        />
      </div>

      {/* Section Header - Fixed Top Center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/25 text-[#DB2777] text-sm font-extrabold tracking-[0.25em] uppercase shadow-lg shadow-pink-600/10 backdrop-blur-md">
          <Sparkles size={15} />
          <span>Services</span>
        </div>
      </div>

      <div className="lg:hidden max-w-7xl mx-auto px-6 mb-12 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase mb-6 shadow-sm">
          <Sparkles size={14} />
          <span>Services</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5 uppercase">
          What We <br />
          <span className="text-[#60A5FA]">
            Build
          </span>
        </h2>
        <p className="text-base text-zinc-300 font-normal max-w-xl mx-auto">
          We architect digital solutions that drive measurable results. Each service is tailored to your unique needs.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={sectionRef}
        className={`${isDesktop ? 'flex items-center h-screen' : 'flex flex-col gap-8 max-w-7xl mx-auto px-6'} lg:px-0`}
        style={isDesktop ? { width: `${(services.length + 2) * 100}vw` } : undefined}
      >
        {/* First panel - Title */}
        <div className="hidden lg:flex flex-shrink-0 w-screen h-full items-center justify-center px-8">
          <div className="max-w-4xl text-center flex flex-col items-center">
            <h2 className="text-[10vw] md:text-[8vw] font-black text-white leading-[0.9] tracking-[-0.04em] mb-8 uppercase text-center">
              <span className="block">What We</span>
              <span className="block text-[#60A5FA]">
                Build
              </span>
            </h2>
            <p className="text-xl text-zinc-300 font-normal max-w-xl text-center mx-auto">
              We architect digital solutions that drive measurable results. 
              Each service is tailored to your unique needs.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-400 font-semibold">
              <span className="text-sm">Scroll to explore</span>
              <svg className="w-4 h-4 animate-pulse text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div 
              key={i}
              className="service-card flex-shrink-0 w-full lg:w-screen lg:h-full flex items-center justify-center lg:px-8"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full max-w-4xl min-h-[420px] sm:min-h-[460px] lg:min-h-0 aspect-auto lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer bg-[#0D1222] border border-white/10 shadow-2xl"
                data-cursor-hover
                data-cursor-text="Explore"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-[#0D1222]/85 to-transparent" />
                </div>
                
                {/* Top gradient overlay for color accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 mix-blend-overlay`} />
                
                {/* Border overlay */}
                <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-[#60A5FA]/40 transition-colors" />
                
                {/* Content */}
                <div className="relative z-10 h-full p-6 md:p-16 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[80px] md:text-[180px] font-black text-white/[0.07] leading-none select-none">
                      {service.number}
                    </span>
                    <Link 
                      to="/contact"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#DB2777] group-hover:border-[#DB2777] transition-all duration-300 shadow-md"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  <div>
                    <div className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} mb-4 md:mb-6 shadow-lg shadow-blue-500/20`}>
                      <Icon size={24} className="text-white md:hidden" />
                      <Icon size={32} className="text-white hidden md:block" />
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 group-hover:text-[#60A5FA] transition-colors uppercase">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-lg text-zinc-300 max-w-lg leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10 rounded-tl-3xl" />
              </div>
            </div>
          );
        })}

        {/* Final CTA panel */}
        <div className="flex-shrink-0 w-full lg:w-screen lg:h-full flex items-center justify-center lg:px-8 pt-4 lg:pt-0">
          <div className="text-center bg-[#0D1222] p-8 sm:p-14 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase">
              Ready to Start?
            </h3>
            <p className="text-lg text-zinc-300 mb-10 max-w-md mx-auto font-normal">
              Let's transform your vision into reality with cutting-edge technology.
            </p>
            <Link 
              to="/contact"
              data-cursor-hover
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black shadow-lg shadow-pink-600/20 hover:scale-105 transition-all"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);
};

export default HorizontalShowcase;
