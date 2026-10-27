// src/pages/PrivacyPolicyPage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, CheckCircle2, Mail, Globe, Server } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const lastUpdated = 'October 14, 2026';

  const sections = [
    {
      id: 'collection',
      icon: Eye,
      title: '1. Information We Collect',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            At Pavion Technologies (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we collect minimal information necessary to deliver exceptional custom software engineering, AI automation systems, and enterprise development services.
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li><strong className="text-white">Direct Inquiries:</strong> Name, work email, phone number, company name, project requirements, and budget expectations submitted via our consultation and contact forms.</li>
            <li><strong className="text-white">Career Applications:</strong> Resumes/CVs, LinkedIn URLs, portfolio links, and contact details submitted via our Careers portal.</li>
            <li><strong className="text-white">Technical & Usage Data:</strong> Anonymized browser type, operating system, pages visited, time spent, and referral sources collected via privacy-conscious analytics (subject to your Cookie Consent).</li>
          </ul>
        </>
      ),
    },
    {
      id: 'usage',
      icon: Server,
      title: '2. How We Use Your Information',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Your data is strictly utilized for professional engineering engagements:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>Architecting customized software blueprints, cost estimates, and sprint delivery timelines.</li>
            <li>Responding to technical consultations and scheduling discovery calls.</li>
            <li>Processing job applications and recruitment communications.</li>
            <li>Maintaining the security, performance, and uptime of our digital infrastructure.</li>
            <li><strong className="text-emerald-400">Zero Public AI Training:</strong> We NEVER use client proprietary business data, code repositories, or documents to train public AI models.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'nda',
      icon: Lock,
      title: '3. Client Confidentiality & 100% IP Ownership',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Enterprise trust is our core foundation:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li><strong className="text-white">Strict Bilateral NDAs:</strong> All project discussions, codebases, architectural schemas, and trade secrets are protected under binding Non-Disclosure Agreements prior to sprint kickoffs.</li>
            <li><strong className="text-white">100% Code Ownership:</strong> Upon milestone completion and final settlement, all custom source code, documentation, deployment scripts, and intellectual property belong exclusively to the client.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'cookies',
      icon: Globe,
      title: '4. Cookies & Telemetry Policy',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            We use minimal cookies strictly categorized for transparency:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li><strong className="text-white">Essential Cookies:</strong> Required for site navigation, session persistence, and security authentication.</li>
            <li><strong className="text-white">Analytics Cookies:</strong> Anonymized telemetry to optimize page load speeds and user experience. Loaded strictly after you grant consent via our Cookie Consent banner.</li>
            <li><strong className="text-white">Your Control:</strong> You can accept or decline non-essential cookies anytime using our on-site cookie banner or by clicking &quot;Cookie Preferences&quot; in the footer.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'security',
      icon: Shield,
      title: '5. Data Protection & Security Standards',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            We implement enterprise-grade security controls:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li>Transport Layer Security (TLS 1.3 / HTTPS encryption) for all data in transit.</li>
            <li>Encrypted storage for submitted project documentation.</li>
            <li>Regular security audits and automated vulnerability scans.</li>
            <li>Restricted internal access governed by strict role-based access control (RBAC).</li>
          </ul>
        </>
      ),
    },
    {
      id: 'rights',
      icon: CheckCircle2,
      title: '6. Your Rights (GDPR & CCPA Compliant)',
      content: (
        <>
          <p className="mb-3 text-zinc-300 leading-relaxed">
            Regardless of your geography, we honor global privacy standards:
          </p>
          <ul className="space-y-2 text-zinc-300 list-disc pl-5">
            <li><strong className="text-white">Right to Access:</strong> Request a full copy of personal data we maintain.</li>
            <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate information.</li>
            <li><strong className="text-white">Right to Erasure (&quot;Be Forgotten&quot;):</strong> Request deletion of your data from our systems.</li>
            <li><strong className="text-white">Right to Withdraw Consent:</strong> Opt out of future communications at any time.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - Pavion Technologies | Enterprise Data Governance"
        description="Learn how Pavion Technologies protects your personal data, client confidentiality, proprietary code, and intellectual property with enterprise security."
        canonical="https://paviontechnologies.com/privacy"
      />

      <div className="min-h-screen bg-[#050508] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#60A5FA]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#60A5FA] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Shield size={14} />
              <span>Legal & Governance</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Our comprehensive commitment to protecting client confidentiality, intellectual property, personal data, and enterprise security.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span>Last Updated: <strong className="text-zinc-200">{lastUpdated}</strong></span>
              <span>•</span>
              <span>Entity: <strong className="text-zinc-200">Pavion Technologies LLP</strong></span>
            </div>
          </header>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#090D1A]/80 border border-white/10 shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#60A5FA]">
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

            {/* Direct Contact for Privacy Matters */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D1222] to-[#090D1A] border border-white/15 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DB2777]/20 border border-[#DB2777]/30 flex items-center justify-center text-[#DB2777]">
                  <Mail size={18} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  7. Data Protection Officer & Inquiries
                </h2>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                For questions regarding this policy, exercising your GDPR/CCPA data rights, or custom NDA verification, contact our legal counsel:
              </p>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 inline-block font-mono text-sm text-zinc-200">
                Email: <a href="mailto:Contact@paviontechnologies.com" className="text-[#60A5FA] hover:underline font-bold">Contact@paviontechnologies.com</a>
                <br />
                Address: 1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101
              </div>
            </motion.section>
          </div>

        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
