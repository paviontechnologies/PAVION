// src/components/VerticalSolutionsShowcase.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Layers, 
  Brain, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Check, 
  Sparkles,
  Server,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SolutionItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  color: string;
  image: string;
  description: string;
  features: string[];
  techTags: string[];
  link: string;
}

const solutions: SolutionItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Enterprise Software & Cloud Connectivity',
    shortTitle: 'Enterprise Cloud Systems',
    icon: Server,
    color: 'from-purple-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Modern enterprises require highly available, secure, and scalable cloud architectures. Pavion Technologies delivers tailored solutions with premium routing, lowest latencies, and zero downtime failover.',
    features: ['High-Availability Distributed Backend', 'Multi-Region Cloud Failovers', 'Docker & Kubernetes Orchestration'],
    techTags: ['Node.js', 'Go', 'AWS', 'PostgreSQL', 'Redis'],
    link: '/services',
  },
  {
    id: '02',
    number: '02',
    title: 'Autonomous AI & Neural Intelligence Pipelines',
    shortTitle: 'Autonomous AI Pipelines',
    icon: Brain,
    color: 'from-pink-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Empower your company with agentic AI tool-use pipelines, real-time vector RAG engines, automated structured document parsing, and continuous model optimization.',
    features: ['Multi-Agent Tool Orchestration', 'Custom LLM Fine-Tuning & RAG', 'Low-Latency Streaming API'],
    techTags: ['GPT-4o', 'Claude 3.5 Sonnet', 'LangChain', 'Python', 'Pinecone'],
    link: '/services',
  },
  {
    id: '03',
    number: '03',
    title: 'Next.js 15 & High-Scale Web Architecture',
    shortTitle: 'Modern Web Architecture',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-fast web platforms engineered with React 19, Turbopack, and edge server rendering. Built for sub-50ms TTFB, flawless SEO indexing, and fluid 60fps micro-animations.',
    features: ['Server-Side & Static Generation', 'Edge Caching & Global CDN', 'Lighthouse 99+ CWV Optimization'],
    techTags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
    link: '/services',
  },
  {
    id: '04',
    number: '04',
    title: 'Cross-Platform Mobile App Ecosystems',
    shortTitle: 'Mobile App Solutions',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Native-feel iOS and Android mobile experiences engineered with smooth offline sync, biometric security, real-time notifications, and high-converting checkout flows.',
    features: ['Single Codebase iOS & Android', 'Offline-First SQLite Architecture', 'Native Device API Integration'],
    techTags: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    link: '/services',
  },
  {
    id: '05',
    number: '05',
    title: 'Zero-Trust Governance & Security Operations',
    shortTitle: 'Zero-Trust Security',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive cybersecurity audits, automated compliance monitoring, SOC-2 readiness, and enterprise IAM identity governance to safeguard mission-critical data.',
    features: ['End-to-End Encryption & KMS', 'Automated Penetration Audits', 'Role-Based Access & OAuth2'],
    techTags: ['OAuth2', 'Vault', 'SOC-2', 'Cloudflare', 'TLS 1.3'],
    link: '/services',
  },
];

const VerticalSolutionsShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');

  return (
    <section className="relative py-24 md:py-36 bg-[#080811] overflow-hidden border-t border-white/[0.06]">
      
      {/* Background Cyber Ambient Matrix */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-purple-300 font-semibold">
                Interactive Solutions Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Enterprise Solutions & Technologies
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-purple-400 transition-all group self-start md:self-auto"
            data-cursor-hover
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-purple-400" />
          </Link>
        </div>

        {/* ===== INTERACTIVE VERTICAL ACCORDION DECK ===== */}
        <div className="hidden lg:flex w-full min-h-[600px] bg-[#0c0c16]/95 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          {solutions.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`relative flex cursor-pointer select-none overflow-hidden transition-[flex,width,background-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive 
                    ? 'flex-1 bg-[#141424] border-r border-purple-500/40 shadow-2xl z-10' 
                    : 'flex-none w-20 xl:w-24 bg-[#090912] hover:bg-[#10101d] border-r border-white/[0.06] z-0'
                }`}
              >
                {isActive ? (
                  /* ===== EXPANDED ACTIVE TAB CONTENT ===== */
                  <div className="p-8 xl:p-10 w-full flex flex-col justify-between h-full animate-fadeIn">
                    <div>
                      {/* Active Header with Icon & Big Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl shadow-purple-500/20 flex-shrink-0`}>
                            <Icon size={26} />
                          </div>
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">Solution {item.number}</span>
                            <h3 className="text-2xl xl:text-3xl font-bold text-white leading-tight">{item.title}</h3>
                          </div>
                        </div>
                        <span className="text-4xl xl:text-5xl font-black text-white/10 font-mono flex-shrink-0">{item.number}</span>
                      </div>

                      {/* Graphic & Description Grid */}
                      <div className="grid xl:grid-cols-12 gap-8 items-center my-6">
                        <div className="xl:col-span-6 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-black">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            loading="eager"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                            {item.techTags.map((tech, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-purple-200 border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="xl:col-span-6">
                          <p className="text-gray-300 text-sm xl:text-base font-light leading-relaxed mb-6">
                            {item.description}
                          </p>

                          <div className="space-y-2.5">
                            {item.features.map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs xl:text-sm text-gray-300">
                                <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                                  <Check size={10} />
                                </div>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                      <span className="text-xs text-gray-400 font-mono">Enterprise Ready • Low Latency SLA</span>
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                        data-cursor-hover
                      >
                        <span>Explore Architecture</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                          <ArrowUpRight size={14} />
                        </div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* ===== COLLAPSED VERTICAL TAB CONTENT ===== */
                  <div className="h-full flex flex-col items-center justify-between py-8 w-full">
                    {/* Top Icon in Circle */}
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-purple-500/20 transition-all flex-shrink-0">
                      <Icon size={18} />
                    </div>

                    {/* Center Vertically Rotated Title */}
                    <div className="my-auto py-6" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      <span className="text-xs font-bold tracking-widest text-gray-400 hover:text-white uppercase transition-colors whitespace-nowrap">
                        {item.shortTitle}
                      </span>
                    </div>

                    {/* Bottom Big Number */}
                    <span className="text-2xl font-black font-mono text-gray-600 flex-shrink-0">
                      {item.number}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== MOBILE CARDS (Visible on Mobile/Tablet) ===== */}
        <div className="grid md:grid-cols-2 lg:hidden gap-6">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-6 rounded-3xl bg-[#11111c] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-2xl font-black font-mono text-purple-400">{item.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{item.description}</p>
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 pt-3 border-t border-white/[0.06]"
                >
                  <span>Explore Solution</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default VerticalSolutionsShowcase;
