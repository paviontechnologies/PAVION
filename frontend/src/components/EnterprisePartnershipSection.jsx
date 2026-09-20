// src/components/EnterprisePartnershipSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Award, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import partnershipImg from '../Images/enterprise-partnership.jpg';

const EnterprisePartnershipSection = ({ onOpenModal }) => {
  const enterpriseMetrics = [
    {
      icon: Shield,
      value: '99.99%',
      label: 'Uptime SLA Guarantee',
      desc: 'Enterprise-grade fault tolerance and automated failovers.'
    },
    {
      icon: Globe,
      value: '100%',
      label: 'Global Compliance',
      desc: 'SOC-2, ISO 27001, and Zero-Trust cloud architectures.'
    },
    {
      icon: Award,
      value: '10+ Yrs',
      label: 'Engineering Pedigree',
      desc: 'Proven track record scaling corporate digital operations.'
    }
  ];

  return (
    <section className="relative py-12 sm:py-20 md:py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      
      {/* Ambient Blue Radial Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#60A5FA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Visual Column */}
          <motion.div 
            className="lg:col-span-6 relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Soft Ambient Shadow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#60A5FA]/15 to-[#F59E0B]/10 rounded-3xl blur-2xl -z-10" />

            {/* Image Card Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0D1222] group">
              <img 
                src={partnershipImg} 
                alt="Strategic Enterprise Partnership"
                loading="lazy"
                decoding="async"
                width="800"
                height="533"
                className="w-full h-[220px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-95" 
              />
              
              {/* Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1222] via-[#0D1222]/30 to-transparent" />

              {/* Bottom Caption Box */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0D1222]/95 backdrop-blur-md border border-white/15 shadow-2xl">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold flex-shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Alliance Tier</div>
                      <div className="text-white font-black text-xs sm:text-base">Strategic Enterprise Partner</div>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-xs font-extrabold text-white bg-[#DB2777] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge Top Right */}
            <motion.div 
              className="hidden sm:flex absolute -top-4 -right-4 p-3.5 rounded-2xl bg-[#0D1222]/95 backdrop-blur-md border border-white/15 shadow-2xl items-center gap-3 z-20"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Full IP Handover</div>
                <div className="text-[10px] text-zinc-400 font-normal">Zero vendor lock-in</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Content Column */}
          <motion.div 
            className="lg:col-span-6 space-y-5 sm:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-xs sm:text-sm font-extrabold text-[#F59E0B]">
              <Shield size={15} />
              <span>Strategic Enterprise Alliances</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Engineering Trust For <span className="text-[#F59E0B]">Global Leaders</span> & Enterprises
              </h2>
              <p className="text-xs sm:text-base text-zinc-300 font-normal leading-relaxed">
                From institutional-grade security compliance to mission-critical infrastructure, we establish long-term strategic alliances that transform complex business bottlenecks into high-margin digital assets.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
              {enterpriseMetrics.map((metric, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0D1222] border border-white/10 shadow-lg space-y-1 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-black text-[#F59E0B]">
                    {metric.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
                    {metric.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-400 leading-normal">
                    {metric.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={() => onOpenModal ? onOpenModal('Enterprise Partnership') : null}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black text-xs sm:text-base transition-all shadow-lg shadow-[#DB2777]/30 group"
                data-cursor-hover
              >
                <span>Initiate Strategic Partnership</span>
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
              </button>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-full font-bold text-xs sm:text-base transition-all"
                data-cursor-hover
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EnterprisePartnershipSection;
