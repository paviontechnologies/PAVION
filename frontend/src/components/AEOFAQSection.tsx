// src/components/AEOFAQSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  directAnswer: string;
  details: string[];
  numberedSteps?: string[];
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How much does custom software development cost at Pavion Technologies?',
    directAnswer: 'Custom software projects at Pavion Technologies typically range between $3,500 to $15,000 for MVPs and targeted web/mobile applications, while comprehensive enterprise ERP, multi-branch CRM, and custom AI systems range from $15,000 to $50,000+. We deliver fixed-price milestone contracts within 24 hours so you never pay for unexpected hourly scope creep.',
    details: [
      'MVP Sprints (4 to 6 weeks): Best for founders and product launches requiring fast market validation.',
      'Custom ERP & CRM Systems: Multi-branch inventory, zero-trust billing, automated payroll, and accounting engines.',
      'Dedicated Engineering Retainers: Full-time senior developers billed on transparent monthly cycles with 48-hour onboarding.',
    ],
    category: 'Pricing & Contracts',
  },
  {
    question: 'How quickly can Pavion Technologies deploy a dedicated engineering squad?',
    directAnswer: 'Pavion Technologies deploys senior full-stack, AI, and mobile engineering squads within 48 to 72 hours of project scope confirmation. Every engineer is pre-vetted across modern stacks (Next.js 15, Python, Node.js, React Native, AWS) and integrates directly into your Slack, Jira, and GitHub repositories.',
    numberedSteps: [
      'Day 1: Technical discovery call and architecture requirements alignment.',
      'Day 2: Developer profile review and direct technical interview with your team.',
      'Day 3: Repository access granted, NDA signed, and first git commit pushed to staging.',
      'Weekly Cadence: Daily standups, production sprint demos, and automated CI/CD pipeline deployments.',
    ],
    details: [
      'Zero recruiter fees or lengthy hiring cycles.',
      'Seamless scaling: Expand or reduce team size with 14 days notice.',
      '100% intellectual property (IP) assigned to your organization on day one.',
    ],
    category: 'Engineering Teams',
  },
  {
    question: 'What is the difference between off-the-shelf SaaS and custom ERP/CRM software?',
    directAnswer: 'Off-the-shelf SaaS solutions charge steep per-seat monthly recurring subscription fees and force your company into rigid, generic workflows with zero proprietary data ownership. Custom ERP and CRM systems engineered by Pavion give you 100% source code ownership, zero recurring user fees, and custom business logic tailored precisely to your operational workflow.',
    details: [
      'Eliminate Subscription Bloat: Stop paying $50 to $200 per user every month to third-party vendors.',
      'Complete Data Sovereignty: Your records reside in your private PostgreSQL / AWS cloud database, never shared with third-party aggregators.',
      'Custom API Integrations: Direct syncing with your legacy inventory, banks, WhatsApp business APIs, and payment gateways.',
    ],
    category: 'ERP & CRM Architecture',
  },
  {
    question: 'How does Pavion Technologies ensure data privacy and security for custom AI implementations?',
    directAnswer: 'Pavion Technologies enforces zero-data-retention private LLM deployments, tenant-isolated vector databases, and AES-256 encrypted database pipelines so your confidential business records are never used to train public AI models. All architectures adhere to SOC-2, HIPAA, and GDPR compliance standards.',
    numberedSteps: [
      'Private Inference Endpoints: Dedicated self-hosted or private cloud endpoints (AWS Bedrock / Azure OpenAI) isolated from public training sets.',
      'Role-Based Access Control (RBAC): Strict cryptographic access controls preventing unauthorized internal data leakage.',
      'Audit Logging: Immutable query and ingestion logs verifying exactly which model accessed what data and when.',
    ],
    details: [
      'Enterprise-grade Retrieval-Augmented Generation (RAG) with milvus/pgvector embeddings.',
      'Automated document intelligence: PII sanitization before processing client invoices or contracts.',
    ],
    category: 'AI & Security',
  },
  {
    question: 'What technology stack does Pavion use for scalable web and mobile platforms?',
    directAnswer: 'Our core technology stack is built on modern, battle-tested technologies: Next.js 15, React, TypeScript, and Tailwind CSS for frontend performance; Python (FastAPI/Django) and Node.js (NestJS/Express) for backend microservices; PostgreSQL and Redis for low-latency persistence; and AWS, GCP, and Docker for automated cloud deployments.',
    details: [
      'Web Platforms: Sub-second Server-Side Rendered (SSR) Next.js web applications with 99+ Google Lighthouse performance scores.',
      'Mobile Applications: Cross-platform React Native apps with native iOS Swift and Android Kotlin performance and shared business logic.',
      'DevOps & Cloud: Terraform Infrastructure-as-Code, Kubernetes clusters, and automated GitHub Actions CI/CD pipelines.',
    ],
    category: 'Tech Stack',
  },
];

interface AEOFAQSectionProps {
  onOpenModal?: (topic: string) => void;
}

const AEOFAQSection: React.FC<AEOFAQSectionProps> = ({ onOpenModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="relative py-12 sm:py-20 md:py-28 bg-[#080B14] border-t border-white/10 text-white overflow-hidden"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* AEO/GEO Optimized Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#60A5FA] text-[11px] sm:text-sm font-mono uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>Direct Technical Answers • AEO Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            Frequently Asked Questions: <br />
            <span className="text-[#60A5FA]">Direct Answers for Technical Leaders</span>
          </h2>
          <p className="text-zinc-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Clear, authoritative answers to the most common questions CTOs, founders, and business leaders ask about our software engineering, AI deployment, and pricing models.
          </p>
        </div>

        {/* FAQ Accordion List (Structured for Semantic Scraping) */}
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  idx >= 3 ? 'hidden sm:block ' : ''
                }${
                  isOpen 
                    ? 'bg-[#0D1222] border-[#60A5FA]/40 shadow-xl shadow-blue-900/10' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Question Header (H3 for exact search intent) */}
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full p-3.5 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#DB2777] font-bold">
                      {faq.category}
                    </span>
                    <h3 
                      itemProp="name" 
                      className="text-sm sm:text-lg font-bold text-white leading-snug group-hover:text-[#60A5FA] transition-colors"
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/30' : 'bg-white/5'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Answer Container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div 
                        itemProp="text"
                        className="px-3.5 sm:px-6 pb-5 sm:pb-6 pt-1 sm:pt-2 border-t border-white/10 space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        {/* 1. Direct Answer Snippet (2-3 sentences bolded for AI Engines) */}
                        <p className="font-semibold text-white bg-white/[0.03] p-3 sm:p-4 rounded-xl border border-white/10 leading-relaxed text-xs sm:text-base">
                          {faq.directAnswer}
                        </p>

                        {/* 2. Sequential Numbered Steps (if applicable) */}
                        {faq.numberedSteps && (
                          <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                            <span className="font-bold text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#60A5FA] block">
                              Execution Roadmap:
                            </span>
                            <ol className="space-y-1.5 sm:space-y-2 pl-4 list-decimal marker:text-[#60A5FA] marker:font-bold">
                              {faq.numberedSteps.map((step, sIdx) => (
                                <li key={sIdx} className="text-zinc-200">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* 3. Deep Dive Bullet Points */}
                        {faq.details && (
                          <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                            <span className="font-bold text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                              Key Specifications:
                            </span>
                            <ul className="space-y-1 sm:space-y-1.5">
                              {faq.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2 sm:gap-2.5">
                                  <span className="text-[#60A5FA] mt-1 text-xs">◆</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA Hook */}
                        <div className="pt-2 sm:pt-3 flex justify-start sm:justify-end">
                          <button
                            onClick={() => onOpenModal ? onOpenModal(faq.category) : null}
                            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#60A5FA] hover:text-[#DB2777] transition-colors text-left sm:text-right"
                          >
                            <span>Have a specific question about {faq.category}? Consult Our Engineers</span>
                            <ArrowRight size={13} className="flex-shrink-0" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footnote / Trust Anchor */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs text-zinc-400">
            Have an architectural requirement not listed here?{' '}
            <button
              onClick={() => onOpenModal ? onOpenModal('Custom Architecture') : null}
              className="text-[#60A5FA] font-bold underline hover:text-[#DB2777] transition-colors"
            >
              Request a free 30-minute system architecture roadmap
            </button>{' '}
            with our engineering leads.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AEOFAQSection;
