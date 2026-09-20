// src/components/TeamSynergySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight, Users, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamImg from '../Images/team-collaboration.jpg';

const TeamSynergySection = ({ onOpenModal }) => {
  const highlights = [
    {
      title: 'Pre-Vetted Senior Engineers',
      desc: 'Top 3% full-stack, AI, and DevOps specialists ready to deploy in 48 hours.'
    },
    {
      title: 'Seamless Workflow Integration',
      desc: 'Direct synchronization with your Slack, Jira, GitHub, and agile sprint rituals.'
    },
    {
      title: '100% Intellectual Property Handover',
      desc: 'Total code ownership and zero lock-in with rigorous clean-code documentation.'
    }
  ];

  return (
    <section className="relative py-12 sm:py-20 md:py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#60A5FA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            className="lg:col-span-6 space-y-5 sm:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-xs sm:text-sm font-extrabold text-[#DB2777]">
              <Users size={15} />
              <span>Agile Engineering Squads</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Build High-Velocity Squads That Integrate <span className="text-[#DB2777]">Seamlessly</span>
              </h2>
              <p className="text-xs sm:text-base text-zinc-300 font-normal leading-relaxed">
                Empower your technology roadmap with dedicated engineering squads, UI/UX innovators, and cloud architects who operate as a natural extension of your team.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 sm:space-y-4 pt-1 sm:pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 shadow-sm hover:border-white/20 transition-all">
                  <div className="mt-0.5 text-[#F59E0B] p-1 sm:p-1.5 rounded-lg bg-[#F59E0B]/10 flex-shrink-0">
                    <CheckCircle size={17} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={() => onOpenModal ? onOpenModal('Dedicated Engineers') : null}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black text-xs sm:text-base transition-all shadow-lg shadow-[#DB2777]/25 group"
                data-cursor-hover
              >
                <span>Hire a Dedicated Squad</span>
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
              </button>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-full font-bold text-xs sm:text-base transition-all shadow-sm"
                data-cursor-hover
              >
                Explore Engagement Models
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div 
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#DB2777]/15 to-[#60A5FA]/20 rounded-3xl blur-2xl -z-10" />

            {/* Main Image Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0D1222] group">
              <img 
                src={teamImg} 
                alt="Agile Team Collaboration"
                loading="lazy"
                decoding="async"
                width="800"
                height="533"
                className="w-full h-[240px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90" 
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-[#0D1222]/30 to-transparent" />

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0D1222]/95 backdrop-blur-md border border-white/15 shadow-2xl">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-bold flex-shrink-0">
                      <Zap size={17} />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Squad Output</div>
                      <div className="text-white font-black text-xs sm:text-base">99.4% Sprint Velocity</div>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-xs font-extrabold text-[#DB2777] bg-[#DB2777]/15 border border-[#DB2777]/25 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                    Active Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge Top Left */}
            <motion.div 
              className="hidden sm:flex absolute -top-4 -left-4 p-3.5 rounded-2xl bg-[#0D1222]/95 backdrop-blur-md border border-white/15 shadow-2xl items-center gap-3 z-20"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#60A5FA]/15 text-[#60A5FA] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">48-Hour Matching</div>
                <div className="text-[10px] text-zinc-400 font-normal">Pre-screened tech talent</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TeamSynergySection;
