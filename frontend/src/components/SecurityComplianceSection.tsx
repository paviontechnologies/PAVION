// src/components/SecurityComplianceSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileCheck2, 
  Lock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound,
  FileCode2
} from 'lucide-react';

interface SecurityComplianceSectionProps {
  onOpenModal?: (topic: string) => void;
}

const securityPillars = [
  {
    title: '100% Source Code & IP Handover',
    subtitle: 'Day-One Intellectual Property Ownership',
    desc: 'You maintain absolute ownership of all software repositories, architecture documentation, database schemas, and digital assets. Zero hidden licensing fees or vendor lock-in.',
    icon: FileCode2,
    badge: '100% Client IP',
    points: [
      'Unrestricted repository and deployment rights from day one',
      'Clean documentation and architectural runbooks included',
      'Zero proprietary framework dependencies or lock-ins',
    ],
  },
  {
    title: 'Strict Bilateral Non-Disclosure Agreements',
    subtitle: 'Pre-Discovery Legal Protection',
    desc: 'We execute legally binding bilateral NDAs before discussing any proprietary technical specifications, business logic, or customer workflows.',
    icon: FileCheck2,
    badge: 'Signed Before Kickoff',
    points: [
      'Bilateral confidentiality binding our entire engineering staff',
      'Stringent non-compete and non-solicitation protections',
      'Instant NDA dispatch and digital execution within 15 minutes',
    ],
  },
  {
    title: 'Zero-Trust Cloud & Encrypted Pipelines',
    subtitle: 'AES-256 & Isolated Environments',
    desc: 'All development and testing occurs inside isolated sandbox environments with encrypted hardware, role-based IAM privileges, and encrypted communication channels.',
    icon: Lock,
    badge: 'Zero-Trust Security',
    points: [
      'Hardware-encrypted devices with mandatory multi-factor auth',
      'Dedicated private cloud VPCs and isolated test databases',
      'Private AI inference endpoints with zero data retention',
    ],
  },
  {
    title: 'Regulatory & Governance Readiness',
    subtitle: 'SOC-2, ISO 27001 & HIPAA Aligned',
    desc: 'Architectures engineered strictly following SOC-2, ISO 27001, and HIPAA data compliance benchmarks, including automated OWASP Top 10 security scans.',
    icon: ShieldCheck,
    badge: 'Enterprise Compliance',
    points: [
      'Automated dependency and container vulnerability scanning',
      'Immutable audit logging for sensitive database interactions',
      'Automated PII scrubbing before any data ingestion',
    ],
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    focus: 'Scalable Cloud Architecture & Serverless Microservices',
  },
  {
    name: 'Cisco CCNA (Switching & Routing)',
    issuer: 'Cisco Systems',
    focus: 'Enterprise Networking, VPC Peering & Firewall Security',
  },
  {
    name: 'Google Cloud Professional DevOps',
    issuer: 'Google Cloud',
    focus: 'Automated CI/CD Pipelines & Kubernetes Orchestration',
  },
  {
    name: 'HIPAA & SOC-2 Compliant Architecture',
    issuer: 'Security Standard',
    focus: 'AES-256 Encryption & Zero-Data-Retention AI Inference',
  },
];

const SecurityComplianceSection: React.FC<SecurityComplianceSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative py-14 sm:py-20 md:py-28 bg-[#060810] border-t border-white/10 text-white overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <KeyRound size={13} />
            <span>Security, IP & Legal Safeguards</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Your Code, Your Cloud, <br />
            <span className="text-emerald-400">Your Intellectual Property</span>
          </h2>

          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal">
            We engineer mission-critical systems under rigorous legal and security guardrails. Every repository, credential, and architectural document belongs 100% exclusively to your company.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-bold uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Certifications & Standards Banner */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B0F1E] border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/25 text-[#60A5FA]">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                  Verified Engineering Certifications
                </h4>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">
                  Engineered and overseen by accredited cloud & system architects
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenModal?.('Security & NDA Consultation')}
              className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md flex-shrink-0"
            >
              <span>Request NDA Execution</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div 
                key={cert.name}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-1.5"
              >
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  {cert.issuer}
                </span>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {cert.name}
                </div>
                <p className="text-[11px] text-zinc-400 font-normal leading-normal">
                  {cert.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecurityComplianceSection;
