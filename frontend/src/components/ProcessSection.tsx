// src/components/ProcessSection.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, PencilRuler, Code2, Bug, Rocket, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'We dive deep into your goals, target audience, and market to craft the perfect strategy for your project.',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-600',
    details: ['Requirement Analysis', 'Market Research', 'User Personas', 'Technical Feasibility'],
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Crafting the Experience',
    description: 'Our designers create intuitive interfaces and engaging experiences that users love.',
    icon: PencilRuler,
    color: 'from-blue-600 to-cyan-500',
    details: ['Wireframing', 'UI/UX Design', 'Prototyping', 'Design System'],
  },
  {
    number: '03',
    title: 'Development',
    subtitle: 'Building with Precision',
    description: 'Using agile methodology, we transform designs into robust, scalable applications.',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    details: ['Frontend Development', 'Backend Architecture', 'API Integration', 'Database Design'],
  },
  {
    number: '04',
    title: 'Testing',
    subtitle: 'Ensuring Quality',
    description: 'Rigorous QA testing ensures your product is flawless before launch.',
    icon: Bug,
    color: 'from-blue-600 to-cyan-600',
    details: ['Unit Testing', 'Integration Tests', 'User Acceptance', 'Performance Audit'],
  },
  {
    number: '05',
    title: 'Launch',
    subtitle: 'Going Live',
    description: 'Smooth deployment with post-launch monitoring and continuous optimization.',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-600',
    details: ['Deployment', 'Monitoring', 'Documentation', 'Ongoing Support'],
  },
];

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setActiveStep] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo('.process-title',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Progress line animation on scroll
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Animate each step
      const steps = sectionRef.current?.querySelectorAll('.process-step') || [];
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              onEnter: () => setActiveStep(i),
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 bg-[#050508] overflow-hidden text-white border-t border-white/10">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="process-title text-center mb-24 space-y-4">
          <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight uppercase">
            From Concept <br />
            <span className="text-[#60A5FA]">
              to Launch
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto">
            Our proven 5-step process ensures every project is delivered with excellence, 
            on time, and exceeds expectations.
          </p>
        </div>

        {/* Process Timeline */}
        <div ref={stepsContainerRef} className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden lg:block">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#DB2777] via-[#F59E0B] to-[#60A5FA] origin-top scale-y-0"
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-32">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`process-step relative grid lg:grid-cols-2 gap-8 items-center ${
                    isLeft ? '' : 'lg:text-right'
                  }`}
                >
                  {/* Number indicator for mobile */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold`}>
                      {step.number}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  {/* Content - alternating sides */}
                  <div className={`${isLeft ? 'lg:pr-20' : 'lg:order-2 lg:pl-20'}`}>
                    {/* Step number */}
                    <span className={`text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r ${step.color} opacity-10 absolute -top-8 ${isLeft ? 'left-0' : 'right-0'} hidden lg:block`}>
                      {step.number}
                    </span>
                    
                    <div className="relative space-y-3">
                      <span className="text-xs sm:text-sm text-[#DB2777] uppercase tracking-wider font-extrabold">{step.subtitle}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4 uppercase">
                        {step.title}
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed mb-6">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <div className={`flex flex-wrap gap-2.5 ${!isLeft ? 'lg:justify-end' : ''}`}>
                        {step.details.map((detail, i) => (
                          <span 
                            key={i}
                            className="px-3.5 py-1.5 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full text-zinc-300 font-bold shadow-sm"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center node for desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl shadow-blue-500/20`}>
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Visual card - alternating sides */}
                  <div className={`${isLeft ? 'lg:order-2 lg:pl-20' : 'lg:pr-20'}`}>
                    <div className="relative p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl hover:border-[#60A5FA]/40 transition-all duration-500 group">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 lg:hidden`}>
                        <Icon size={24} className="text-white" />
                      </div>

                      {/* Step visualization */}
                      <div className="space-y-4">
                        {step.details.map((detail, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-3.5"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-[#60A5FA]">
                              {i + 1}
                            </div>
                            <span className="text-zinc-200 text-sm sm:text-base font-semibold">{detail}</span>
                            <ChevronRight size={16} className="text-zinc-500 ml-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="w-full sm:w-auto inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-8 p-6 sm:p-10 bg-[#0D1222] border border-white/10 rounded-3xl shadow-2xl">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">Ready to start your project?</h3>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">Let's discuss how we can help bring your vision to life.</p>
            </div>
            <Link
              to="/contact"
              data-cursor-hover
              className="w-full sm:w-auto px-8 py-4 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black hover:scale-105 transition-all duration-300 whitespace-nowrap text-center text-sm sm:text-base shadow-lg shadow-pink-600/20"
            >
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
