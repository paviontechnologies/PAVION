// src/components/InteractiveTeamShowcase.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import priyanshuImg from '../Images/team/priyanshu2.jpg';
import rahulImg from '../Images/team/rahul1.jpg';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
}

const team: TeamMember[] = [
  {
    id: 'priyanshu-gupta',
    name: 'Priyanshu Gupta',
    role: 'Co-Founder & Product Strategist',
    bio: 'Driving bold digital visions, product management, and enterprise AI transformation for global clients.',
    image: priyanshuImg,
    linkedin: 'https://www.linkedin.com/in/priyanshu-gupta-engineer',
    github: 'https://github.com/paviontechnologies',
    twitter: 'https://twitter.com/',
  },
  {
    id: 'rahul-bajediyal',
    name: 'Rahul Bajediyal',
    role: 'Co-Founder & Chief Architect',
    bio: 'Architecting ultra-scalable cloud architectures, full-stack microservices, and high-performance engineering teams.',
    image: rahulImg,
    linkedin: 'https://www.linkedin.com/in/rahul-bajediyal-3455a6237',
    github: 'https://github.com/rahulbajediyal1',
    twitter: 'https://twitter.com/',
  },
  {
    id: 'alex-morgan',
    name: 'Alex Vance',
    role: 'Principal AI & Machine Learning Lead',
    bio: 'Leading multi-agent AI research, LLM tool-calling orchestration, and predictive neural network pipelines.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Head of Cloud & Zero-Trust Security',
    bio: 'Specializing in Kubernetes cloud infrastructure, edge computing failovers, and enterprise SOC-2 compliance.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
  },
];

const InteractiveTeamShowcase: React.FC = () => {
  // Default to first member active, or on hover
  const [activeMemberId, setActiveMemberId] = useState<string>('priyanshu-gupta');

  return (
    <section className="relative py-24 md:py-36 bg-[#06060c] overflow-hidden border-t border-white/[0.06]">
      
      {/* Background Holographic Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Reference Image 3 Style) */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400 block mb-3">
              OUR TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Our Awesome Creative Best Team
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
              Our exceptional and creative team consistently delivers outstanding results, showcasing a synergy of talent, innovation, and collaboration.
            </p>
          </div>
        </div>

        {/* ===== TEAM LINE-UP WITH SPEECH-BUBBLE PROFILE (Reference Image 3 Style) ===== */}
        <div className="relative pt-24 pb-8">
          
          {/* Active Member Speech-Bubble Card Overlay */}
          <div className="w-full flex justify-center mb-8">
            <AnimatePresence mode="wait">
              {team.map((member) => {
                if (member.id !== activeMemberId) return null;

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-20 max-w-sm w-full"
                  >
                    {/* Purple Speech Bubble */}
                    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-3xl shadow-2xl shadow-purple-600/30 border border-purple-400/40">
                      
                      {/* Tail Pointer */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 rotate-45 border-r border-b border-purple-400/40" />

                      <div className="relative z-10 text-center">
                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                        <div className="text-xs text-purple-200 font-medium mb-3">{member.role}</div>
                        <p className="text-xs text-purple-100/90 leading-relaxed font-light mb-4">
                          {member.bio}
                        </p>

                        {/* Social Buttons */}
                        <div className="flex items-center justify-center gap-2.5">
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-purple-700 flex items-center justify-center transition-all shadow-md"
                            aria-label="LinkedIn"
                          >
                            <Linkedin size={14} />
                          </a>
                          <a 
                            href={member.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-purple-700 flex items-center justify-center transition-all shadow-md"
                            aria-label="GitHub"
                          >
                            <Github size={14} />
                          </a>
                          <a 
                            href={member.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-purple-700 flex items-center justify-center transition-all shadow-md"
                            aria-label="Twitter"
                          >
                            <Twitter size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Members Portraits Line-Up Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
            {team.map((member) => {
              const isActive = member.id === activeMemberId;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setActiveMemberId(member.id)}
                  onClick={() => setActiveMemberId(member.id)}
                  className={`cursor-pointer group relative rounded-3xl overflow-hidden transition-all duration-500 border-2 ${
                    isActive 
                      ? 'border-purple-500 shadow-2xl shadow-purple-600/30 scale-105 -translate-y-2' 
                      : 'border-white/[0.08] hover:border-purple-500/50 hover:scale-102 opacity-80 hover:opacity-100'
                  }`}
                  data-cursor-hover
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-t from-black via-black/40 to-transparent overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent" />
                    
                    {/* Bottom Name Label on Card */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md">
                        {member.name}
                      </div>
                      <div className="text-purple-300 text-[10px] sm:text-xs font-light drop-shadow-md truncate">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};

export default InteractiveTeamShowcase;
