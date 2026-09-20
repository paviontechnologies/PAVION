// src/components/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamData';

// Using Unsplash for reliable image loading
const creativeImg = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

type Highlight = { number: string; title: string; description: string };

const About: React.FC = () => {
  const highlights: Highlight[] = [
    { number: '01', title: 'Strategy', description: 'We dive deep into your goals to create tailored digital strategies' },
    { number: '02', title: 'Design', description: 'Crafting intuitive interfaces that users love' },
    { number: '03', title: 'Development', description: 'Building robust, scalable solutions with cutting-edge tech' },
    { number: '04', title: 'Launch', description: 'Deploying with precision and providing ongoing support' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <>
      {/* --- ABOUT SECTION --- */}
      <section id="about" className="relative py-28 bg-[#050508] text-white overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold">
              About Us
            </span>
          </motion.div>

          {/* Main two-column content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-20 md:mb-32">
            {/* Left - Large Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-8 uppercase text-white">
                <span>We help brands create</span>
                <span className="block text-[#60A5FA] mt-2">
                  digital experiences
                </span>
                <span className="block text-zinc-400 text-3xl sm:text-4xl lg:text-5xl mt-4 font-normal lowercase">
                  that connect
                </span>
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="lg:pt-8 space-y-6"
            >
              <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal">
                Pavion Technologies is your technology & automation partner. We build the software, AI, automation and engineering teams businesses need to operate and scale.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Our commitment goes beyond trends—it's about crafting digital journeys 
                that resonate uniquely and leave a lasting impact.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'AI/ML'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-xs sm:text-sm text-zinc-300 font-bold bg-white/5 border border-white/10 rounded-full hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all duration-500"
                    data-cursor-hover
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/services"
                  data-cursor-hover
                  className="group inline-flex items-center gap-3 text-white hover:text-[#60A5FA] font-black transition-colors duration-300"
                >
                  <span className="relative text-sm sm:text-base">
                    Explore Services
                    <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-white/20 group-hover:bg-[#60A5FA] transition-colors duration-300" />
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image Section - Immersive */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative mb-20 md:mb-32 shadow-2xl rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <img
                src={creativeImg}
                alt="Creative Development"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] mb-4 block font-extrabold">Our Approach</span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight">
                    Creative Development
                    <span className="block text-zinc-300 text-sm sm:text-xl mt-3 font-normal">
                      Where technology meets artistry
                    </span>
                  </h3>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Process Steps - Visible Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#0D1222] p-8 sm:p-10 group hover:bg-[#11172a] transition-all duration-500"
                data-cursor-hover
              >
                <span className="text-5xl font-black text-[#60A5FA]/20 group-hover:text-[#60A5FA]/40 transition-colors duration-500 block mb-6">
                  {item.number}
                </span>
                <h4 className="text-xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-all duration-500">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section
        id="team"
        className="relative py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white"
      >
        {/* Gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block mb-4">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
                The People Behind <br />
                <span className="text-[#60A5FA]">The Magic</span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-zinc-400 max-w-md font-normal text-sm sm:text-base"
            >
              Passionate experts dedicated to bringing your vision to life with creativity and precision.
            </motion.p>
          </div>

          {/* Founder profiles */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {teamMembers.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link to={`/team/${m.id}`} className="group block" data-cursor-hover>
                  <article className="grid gap-6 py-10 sm:grid-cols-[160px_1fr_auto] sm:items-center md:grid-cols-[220px_1fr_auto] md:py-14">
                    <div className="mx-auto sm:mx-0 w-36 h-44 md:w-48 md:h-60 overflow-hidden bg-black/40 shadow-xl rounded-2xl border border-white/15">
                      <img
                        src={m.img}
                        alt={m.name}
                        className="h-full w-full object-cover object-center grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>

                    <div className="min-w-0 text-center sm:text-left">
                      <span className="text-xs tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block mb-3">
                        {m.role.replace(' ,', ',')}
                      </span>
                      <h3 className="text-3xl font-black text-white mb-4 group-hover:text-[#60A5FA] transition-colors duration-500">
                        {m.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
                        {m.shortBio}
                      </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-end gap-3 text-sm sm:text-base font-bold text-zinc-300 group-hover:text-[#60A5FA] transition-colors">
                      <span>Read profile</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <Link
              to="/contact"
              data-cursor-hover
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black hover:scale-105 transition-all duration-500 shadow-lg shadow-pink-600/20"
            >
              <span>Work with our team</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
