// src/pages/TermsPage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, CheckCircle, Scale, ShieldAlert, Cpu, Clock, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';

const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const lastUpdated = 'October 14, 2026';

  const termsSections = [
    {
      icon: Cpu,
      title: '1. Services & Sprint Execution',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Pavion Technologies provides enterprise custom software development, mobile application engineering, AI automation integrations, cloud infrastructure setup, and dedicated technical squad retainers.
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>Engagements are executed in transparent agile sprint cycles (typically 2-week iterations) governed by defined Statement of Work (SOW) documents.</li>
            <li>Deliverables, sprint milestones, acceptance criteria, and tech stacks are agreed upon mutually prior to sprint initiation.</li>
          </ul>
        </>
      ),
    },
    {
      icon: CheckCircle,
      title: '2. 100% Intellectual Property & Code Ownership Transfer',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed font-semibold text-emerald-400">
            You own your product completely. We never lock you in.
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>Upon full settlement of agreed milestone invoices, 100% of all custom-developed source code, database architectures, designs, workflows, and documentation belong exclusively to the client.</li>
            <li>Pavion Technologies assigns all worldwide copyrights, patents, and intellectual property rights associated with client-specific deliverables to the client.</li>
            <li>Pre-existing open-source libraries or third-party frameworks remain subject to their respective open-source licenses (e.g. MIT, Apache 2.0).</li>
          </ul>
        </>
      ),
    },
    {
      icon: DollarSign,
      title: '3. Payments, Invoicing & Milestones',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Transparent and predictable commercial terms:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>Fixed-scope projects operate on milestone schedules (e.g., initial deposit upon sprint kickoff, staging milestone review, and final production deployment).</li>
            <li>Dedicated monthly team retainers are invoiced on a recurring monthly sprint basis.</li>
            <li>All invoices are due within the payment terms specified in your Master Services Agreement (MSA).</li>
          </ul>
        </>
      ),
    },
    {
      icon: Clock,
      title: '4. Warranty & Post-Launch Bug Fixing',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Quality assurance and engineering stability guarantee:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>All custom software deliverables include a complimentary 30-day post-launch warranty period for resolving critical bugs or defects directly related to the agreed sprint scope.</li>
            <li>Ongoing maintenance, feature enhancements, and 24/7 SLA monitoring are supported under our dedicated maintenance agreements.</li>
          </ul>
        </>
      ),
    },
    {
      icon: ShieldAlert,
      title: '5. Limitation of Liability',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            In no event shall Pavion Technologies be liable for indirect, incidental, special, consequential, or punitive damages resulting from third-party API outages (e.g., cloud host downtime, payment gateway API deprecation), unauthorized external cyberattacks, or client-directed scope modifications.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Our aggregate liability under any agreement shall not exceed the total fees paid by the client during the three (3) months preceding the claim.
          </p>
        </>
      ),
    },
    {
      icon: Scale,
      title: '6. Governing Law & Dispute Resolution',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            These Terms shall be construed and governed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in Gurugram, Haryana, India.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO 
        title="Terms & Conditions - Pavion Technologies | Master Services Agreement"
        description="Review Pavion Technologies client terms, MSA terms, 100% intellectual property ownership transfer, and warranty policies."
        canonical="https://paviontechnologies.com/terms"
      />

      <div className="min-h-screen bg-[#050508] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#DB2777]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          
          {/* Breadcrumb Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors mb-8 group"
            data-cursor-hover
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#60A5FA]" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <header className="mb-14 border-b border-white/10 pb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[#DB2777] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <FileText size={14} />
              <span>Master Services Agreement</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Terms & Conditions
            </h1>
            
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Clear, transparent commercial guidelines covering client code ownership, sprint milestones, warranties, and enterprise partnership standards.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span>Last Updated: <strong className="text-zinc-200">{lastUpdated}</strong></span>
              <span>•</span>
              <span>Entity: <strong className="text-zinc-200">Pavion Technologies LLP</strong></span>
            </div>
          </header>

          {/* Sections */}
          <div className="space-y-12">
            {termsSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#090D1A]/80 border border-white/10 shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#DB2777]">
                      <Icon size={18} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="text-sm sm:text-base font-normal leading-relaxed text-zinc-300">
                    {section.content}
                  </div>
                </motion.section>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default TermsPage;
