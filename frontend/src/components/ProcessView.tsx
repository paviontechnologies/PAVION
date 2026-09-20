// src/components/ProcessView.tsx
import React, { useEffect } from 'react';
import {
  Search,
  LayoutTemplate,
  Code2,
  ShieldCheck,
  Rocket,
  GitBranch,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ProcessView: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processes: ProcessStep[] = [
    {
      id: 1,
      title: 'Requirement Analysis',
      description: 'We begin by deep-diving into your business goals, user needs, and technical requirements to build a solid foundation.',
      icon: <Search size={24} />,
      color: 'text-[#1769FF]'
    },
    {
      id: 2,
      title: 'System Architecture Design',
      description: 'Architecting scalable, secure, and high-performance systems using modern patterns like Microservices or Serverless.',
      icon: <LayoutTemplate size={24} />,
      color: 'text-[#1769FF]'
    },
    {
      id: 3,
      title: 'Agile Development Iterations',
      description: 'Writing clean, maintainable code in 2-week sprints, ensuring rapid delivery and continuous feedback integration.',
      icon: <Code2 size={24} />,
      color: 'text-[#1769FF]'
    },
    {
      id: 4,
      title: 'Rigorous QA & Testing',
      description: 'Automated and manual testing protocols to ensure 99.9% crash-free sessions and robust security compliance.',
      icon: <ShieldCheck size={24} />,
      color: 'text-[#1769FF]'
    },
    {
      id: 5,
      title: 'Deployment & Support',
      description: 'Seamless CI/CD deployment to cloud infrastructure followed by 24/7 monitoring and optimization.',
      icon: <Rocket size={24} />,
      color: 'text-[#1769FF]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans py-36 px-6 sm:px-8 lg:px-12 overflow-hidden relative">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navigation Back Button */}
      {onBack && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-12"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-zinc-300 bg-white/5 hover:text-[#60A5FA] hover:bg-white/10 border border-white/10 transition-all duration-200 font-bold"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
        </motion.div>
      )}

      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest"
        >
          <GitBranch size={16} />
          Workflow
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tight"
        >
          Engineering <span className="text-[#60A5FA]">Excellence</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Our systematic approach transforms complex requirements into robust, scalable software solutions.
        </motion.p>
      </div>

      {/* --- Process Timeline --- */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Connecting Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-[#DB2777] via-[#F59E0B] to-[#60A5FA] -translate-x-1/2 shadow-[0_0_10px_rgba(219,39,119,0.5)]"
        />

        <div className="space-y-20 relative">
          {processes.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >

                <div className={`flex md:contents ${isEven ? '' : 'flex-row-reverse md:flex-row'}`}>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-[45%] group relative ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>

                    <div className="relative bg-[#0D1222] p-8 rounded-3xl border border-white/10 shadow-xl hover:border-[#60A5FA]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      {/* Step Number */}
                      <div className="absolute -top-4 right-8 text-6xl font-black text-white/5 select-none z-0">
                        0{step.id}
                      </div>

                      <div className="relative z-10 space-y-2">
                        <h3 className={`text-xl sm:text-2xl font-black text-white group-hover:text-[#60A5FA] transition-colors flex items-center gap-3 ${isEven ? 'md:justify-end' : ''} uppercase`}>
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed text-sm sm:text-base font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#0D1222] border border-white/15 shadow-xl z-10 flex items-center justify-center group hover:scale-110 transition-transform duration-300 hover:border-[#60A5FA]">
                      <div className="text-[#60A5FA]">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block md:w-[45%]" />

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
