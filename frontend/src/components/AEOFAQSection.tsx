// src/components/AEOFAQSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

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
    directAnswer: 'Custom software engagements typically range from $3,500 to $15,000 for focused MVPs and web or mobile applications, while enterprise ERP, multi-branch CRM, and custom AI systems range between $15,000 and $50,000+. We provide fixed-price milestone contracts within 24 hours of discovery, eliminating unexpected hourly scope creep.',
    details: [
      'Early-stage MVP sprints run 4 to 6 weeks for founders needing fast validation in the hands of real users.',
      'Full ERP & CRM builds include inventory synchronization across branches, automated invoicing, and role-based permissions.',
      'Dedicated engineering retainers provide full-time senior developers billed monthly with 48-hour onboarding.',
    ],
    category: 'Pricing & Contracts',
  },
  {
    question: 'How quickly can Pavion Technologies deploy a dedicated engineering squad?',
    directAnswer: 'We deploy dedicated engineering squads within 48 to 72 hours of project scope confirmation. Every engineer is pre-vetted across modern stacks (Next.js, Python, Node.js, React Native, AWS) and integrates directly into your existing Slack, Jira, and GitHub workflows.',
    numberedSteps: [
      'Technical discovery and architecture requirements alignment with our engineering lead.',
      'Review developer profiles and conduct direct technical interviews with your team.',
      'Sign mutual NDA, grant repository access, and push the initial commit to staging.',
      'Establish daily standups, weekly demos, and automated CI/CD pipeline deployments.',
    ],
    details: [
      'Zero recruiter fees or lengthy hiring cycles.',
      'Scale team size up or down with straightforward 14-day notice.',
      'Full intellectual property and source code assigned to your company from day one.',
    ],
    category: 'Engineering Teams',
  },
  {
    question: 'What is the difference between off-the-shelf SaaS and custom ERP/CRM software?',
    directAnswer: 'Off-the-shelf software charges recurring monthly per-seat fees that escalate as you grow, while locking your data inside vendor-controlled systems. Custom software built by Pavion gives your company 100% source code ownership, zero recurring seat licenses, and workflows designed specifically for how your team operates.',
    details: [
      'Avoid escalating subscription fees ($50–$200/seat/month) that penalize business growth.',
      'Maintain full data sovereignty with all records stored in your private cloud or dedicated database.',
      'Integrate directly with your proprietary hardware, existing warehouse tools, banks, or WhatsApp APIs.',
    ],
    category: 'ERP & CRM Architecture',
  },
  {
    question: 'How does Pavion Technologies ensure data privacy and security for custom AI implementations?',
    directAnswer: 'We enforce zero-data-retention private LLM deployments, tenant-isolated vector databases, and AES-256 encrypted pipelines so your proprietary business records are never exposed to public training sets. All systems are architected following SOC-2, HIPAA, and GDPR data governance standards.',
    numberedSteps: [
      'Deploy dedicated private inference endpoints (AWS Bedrock or Azure OpenAI) strictly isolated from public datasets.',
      'Implement granular role-based access control (RBAC) to ensure employees only view authorized records.',
      'Maintain immutable audit logs tracking every query and document retrieval action.',
    ],
    details: [
      'Secure enterprise Retrieval-Augmented Generation (RAG) using pgvector and isolated embeddings.',
      'Automated PII scrubbing and token sanitization before processing sensitive customer invoices or contracts.',
    ],
    category: 'AI & Security',
  },
  {
    question: 'What technology stack does Pavion use for scalable web and mobile platforms?',
    directAnswer: 'We build on modern, production-hardened technologies: Next.js, React, TypeScript, and Tailwind CSS for frontend performance; Python (FastAPI/Django) and Node.js (NestJS/Express) for backend microservices; PostgreSQL and Redis for persistence; and AWS or GCP with Docker for automated deployments.',
    details: [
      'Fast, server-rendered web applications optimized for Core Web Vitals and search crawler indexing.',
      'Cross-platform mobile apps on React Native delivering 60fps performance on iOS and Android.',
      'Containerized infrastructure configured with Terraform and automated GitHub Actions CI/CD.',
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
                              Typical Deployment Timeline:
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
                              Key Highlights:
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
