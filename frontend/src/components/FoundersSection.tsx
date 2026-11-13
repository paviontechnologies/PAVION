// src/components/FoundersSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, MapPin, ShieldCheck, ArrowRight, Users } from 'lucide-react';
import priyanshuImg from '../Images/team/priyanshu2.jpg';
import rahulImg from '../Images/team/rahul1.jpg';

interface FoundersSectionProps {
  onOpenModal?: (topic: string) => void;
}

const founders = [
  {
    name: 'Priyanshu Gupta',
    role: 'Co-Founder & Product Lead',
    image: priyanshuImg,
    location: 'Gurugram HQ, India',
    linkedin: 'https://www.linkedin.com/in/priyanshu-gupta-engineer',
    quote:
      'We believe in solving real business problems with clean, scalable systems. Every project we commit to is built to enterprise standards with complete IP transparency from day one.',
    skills: ['Product Strategy', 'Enterprise ERP/CRM', 'AI Workflows', 'Client Delivery'],
  },
  {
    name: 'Rahul Bajediyal',
    role: 'Co-Founder & System Architect',
    image: rahulImg,
    location: 'Gurugram HQ, India',
    linkedin: 'https://www.linkedin.com/in/rahul-bajediyal-3455a6237',
    quote:
      'Software should be resilient, fast, and completely owned by you. We engineer systems with zero vendor lock-in, clean microservices, and dedicated engineering accountability.',
    skills: ['System Architecture', 'Cloud & DevOps', 'Full-Stack Performance', 'API Design'],
  },
];

const FoundersSection: React.FC<FoundersSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative py-14 sm:py-20 md:py-28 bg-[#060810] border-t border-white/10 text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/25 text-[#60A5FA] text-xs font-mono uppercase tracking-wider font-semibold">
            <Users size={14} />
            <span>Founded & Led by Engineers</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Leadership You Can <span className="text-[#60A5FA]">Directly Talk To</span>
          </h2>

          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal">
            No middle managers or outsourced runarounds. Pavion was founded by hands-on engineers who stay actively involved in architectural reviews, code quality, and delivery milestones.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={`${founder.name} - ${founder.role}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-white/15 shadow-lg group-hover:border-[#60A5FA]/50 transition-colors"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0A66C2] text-white shadow-md">
                      <Linkedin size={12} />
                    </div>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-white truncate">
                        {founder.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#60A5FA]">
                      {founder.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                      <MapPin size={12} className="text-emerald-400" />
                      <span>{founder.location}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Philosophy Quote */}
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed border-l-2 border-[#60A5FA]/40 pl-3.5 py-0.5">
                  "{founder.quote}"
                </p>

                {/* Core Expertise Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#60A5FA] transition-colors"
                >
                  <Linkedin size={14} className="text-[#0A66C2]" />
                  <span>Verify on LinkedIn</span>
                </a>

                <button
                  onClick={() => onOpenModal?.(`Consult with ${founder.name}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] hover:text-white transition-colors"
                >
                  <span>Schedule Call</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Office & Direct Trust Strip */}
        <div className="mt-8 sm:mt-12 max-w-5xl mx-auto p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Global Delivery from Gurugram, India • 20+ In-House Engineers
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-400">
                1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://maps.google.com/?q=Plus+Offices+Landmark+Cyberpark+Sector+67+Gurugram+Haryana+122101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-300 hover:text-white underline font-semibold transition-colors"
            >
              View on Map
            </a>
            <button
              onClick={() => onOpenModal?.('Architecture Consultation')}
              className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all shadow-md"
            >
              Book Tech Discovery
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FoundersSection;
