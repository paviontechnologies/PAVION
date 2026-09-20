// src/pages/ServicesPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, Cloud, Palette, Smartphone, Sparkles, TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import HorizontalShowcase from '../components/HorizontalShowcase';
import AISection from '../components/AISection';
import ProcessSection from '../components/ProcessSection';
import Features from '../components/Features';

const serviceCategories = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'High-performance backends, microservices, and enterprise architectures designed for mission-critical reliability.',
    features: ['Microservices & APIs', 'Scalable Cloud Architecture', 'Database Optimization', 'Legacy Modernization']
  },
  {
    icon: Sparkles,
    title: 'AI & Machine Learning Solutions',
    desc: 'Automate high-friction operations and extract high-value insights with customized AI models and LLM agent pipelines.',
    features: ['Custom LLM Fine-Tuning', 'Agentic Workflows & RAG', 'Predictive Analytics', 'Computer Vision & OCR']
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & Growth',
    desc: 'Data-driven SEO, Google Ads, targeted Meta campaigns, and high-converting marketing funnels engineered to scale acquisition.',
    features: ['SEO & Organic Search Ranking', 'Performance PPC (Google & Meta)', 'Conversion Rate Optimization (CRO)', 'Social Media & Content Strategy']
  },
  {
    icon: Smartphone,
    title: 'Mobile App Engineering',
    desc: 'Native iOS & Android apps and performant cross-platform solutions that deliver 60fps fluid user experiences.',
    features: ['React Native & Flutter', 'iOS & Android Native', 'Offline First Architecture', 'Store Optimization']
  },
  {
    icon: Palette,
    title: 'Product Design & UI/UX',
    desc: 'Human-centric user research, intuitive design systems, and rapid interactive prototyping that convert visitors into loyal users.',
    features: ['Wireframing & Prototyping', 'Design Systems & Tokens', 'Conversion Optimization', 'Micro-Interactions']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps Engineering',
    desc: 'Robust CI/CD pipelines, automated deployments, multi-region failovers, and rigorous cloud cost optimization.',
    features: ['AWS, GCP & Azure', 'Docker & Kubernetes', 'Infrastructure as Code', '24/7 Uptime & Monitoring']
  },
  {
    icon: Cpu,
    title: 'Web Platforms & SaaS',
    desc: 'Modern web applications built on Next.js, React, and serverless compute engineered for speed and conversion.',
    features: ['Modern Next.js & React', 'Edge Compute & SSR', 'Payment & Billing Engines', 'SEO & Core Web Vitals']
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Compliance',
    desc: 'Zero-trust architecture, automated threat intelligence, rigorous penetration audits, and SOC-2 / GDPR compliance governance.',
    features: ['Zero-Trust Architecture', 'Penetration Testing & Audits', 'Data Encryption & KMS', 'Compliance (SOC-2 & GDPR)']
  }
];

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Our Services - Pavion Technologies | Software, AI & Web Development"
        description="Explore Pavion Technologies' full suite of technical services: custom software development, AI solutions, mobile applications, cloud architecture, and UI/UX design."
        canonical="https://paviontechnologies.com/services"
        ogUrl="https://paviontechnologies.com/services"
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#050508] border-b border-white/10 overflow-hidden text-white">
        <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              Engineering Capabilities
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase max-w-5xl mx-auto">
              Full-Spectrum <br />
              <span className="text-[#60A5FA]">
                Digital Services
              </span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed mb-8">
              From high-scale software engineering to cutting-edge generative AI, we craft digital products that empower industry leaders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 group shadow-lg shadow-pink-600/20"
                data-cursor-hover
              >
                <span>Request a Consultation</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-10 py-5 border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-[#60A5FA] font-bold rounded-full hover:scale-105 transition-all"
                data-cursor-hover
              >
                <span>View Our Works</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Overview */}
      <section className="relative py-28 bg-[#080B14] border-b border-white/10 overflow-hidden text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Tailored Engineering For Every Need
            </h2>
            <p className="text-zinc-300 text-sm sm:text-lg font-normal">
              We leverage modern technology stacks to deliver enterprise-grade performance and high usability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {serviceCategories.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="p-6 sm:p-7 xl:p-8 rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all flex flex-col justify-between group shadow-lg"
                  data-cursor-hover
                >
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA] mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-colors uppercase leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  <div>
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      {srv.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 font-medium">
                          <CheckCircle2 size={15} className="text-[#60A5FA] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal Interactive Showcase */}
      <HorizontalShowcase />

      {/* AI Solutions Deep Dive */}
      <AISection />

      {/* Process Section */}
      <ProcessSection />

      {/* Features / Why Choose Us */}
      <Features />

      {/* Conversion CTA */}
      <section className="relative py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.06),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Let's build your next digital advantage
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Reach out to our architects and engineers to discuss your project requirements and technical architecture.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 group shadow-lg shadow-pink-600/20"
            data-cursor-hover
          >
            <span>Start a Project</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
