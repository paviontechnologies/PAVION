// src/components/TestimonialsNew.tsx
import React, { useRef } from 'react';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';

interface CaseStudy {
  id: number;
  domain: string;
  location: string;
  title: string;
  outcome: string;
  summary: string;
  techStack: string[];
  rating: number;
  badgeColor: string;
}

const caseStudiesRow1: CaseStudy[] = [
  {
    id: 1,
    domain: 'US Staffing & VMS',
    location: 'Austin, TX, USA',
    title: 'High-Volume ATS & Automated Candidate Match Engine',
    outcome: '65% Faster Turnaround • 200+ Recruiters',
    summary: 'Engineered an automated resume parsing and candidate ranking engine with vector embeddings, reducing screening turnaround from 4 days to 4 hours.',
    techStack: ['Next.js 15', 'Node.js', 'PostgreSQL', 'AWS ECS', 'pgvector'],
    rating: 5.0,
    badgeColor: 'text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/25',
  },
  {
    id: 2,
    domain: 'Healthcare & Telehealth',
    location: 'London, United Kingdom',
    title: 'HIPAA & GDPR Compliant Clinical Triage Platform',
    outcome: '50% Front-Desk Deflection • Zero-Trust HL7',
    summary: 'Engineered patient onboarding and intelligent clinical triage workflows with strict PII anonymization and FHIR/HL7 electronic records compliance.',
    techStack: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS Bedrock'],
    rating: 4.9,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  },
  {
    id: 3,
    domain: 'Commercial PropTech & ERP',
    location: 'Dubai, UAE',
    title: 'Multi-Tenant Commercial Property & Lease ERP',
    outcome: '4 Regional Hubs • Zero-Seat-Fee Architecture',
    summary: 'Replaced high-cost per-seat SaaS tools with a custom multi-branch property ERP, syncing 1,200+ lease agreements and real-time maintenance workflows.',
    techStack: ['TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    rating: 4.8,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
  },
  {
    id: 4,
    domain: 'FinTech & High-Frequency APIs',
    location: 'Toronto, Canada',
    title: 'Low-Latency Financial Ledger & Reconciliation Engine',
    outcome: '1.2M Daily Transactions • 99.99% Uptime SLA',
    summary: 'Architected high-throughput microservices for automated ledger balancing and multi-gateway payment processing with automated audit logs.',
    techStack: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes'],
    rating: 5.0,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  },
  {
    id: 5,
    domain: 'Logistics & Supply Chain',
    location: 'Singapore Global Logistics',
    title: 'Fleet Dispatch Telematics & Carrier WMS',
    outcome: '18% Fuel Overhead Drop • Live GPS Tracking',
    summary: 'Real-time vehicle telematics dashboard, warehouse inventory tracking, and dynamic carrier dispatch optimization engineered for 500+ commercial trucks.',
    techStack: ['React', 'Python', 'TimescaleDB', 'Docker', 'GCP'],
    rating: 4.9,
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
  },
  {
    id: 6,
    domain: 'Cloud Infrastructure & DevOps',
    location: 'Dublin, Ireland',
    title: 'Enterprise Kubernetes Migration & CI/CD Hardening',
    outcome: '8x Daily Deploy Frequency • Zero Downtime',
    summary: 'Migrated 40+ legacy services to Docker and Kubernetes on AWS with automated GitHub Actions pipelines and Terraform Infrastructure-as-Code.',
    techStack: ['Terraform', 'Kubernetes (EKS)', 'AWS', 'Docker', 'GitHub Actions'],
    rating: 4.8,
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
  },
];

const caseStudiesRow2: CaseStudy[] = [
  {
    id: 7,
    domain: 'Intelligent Document AI',
    location: 'San Francisco, CA, USA',
    title: 'Autonomous Contract & Invoice Extraction Engine',
    outcome: '99.2% OCR Precision • 6-Week Delivery',
    summary: 'Deployed private inference document AI pipeline parsing 10,000+ monthly vendor invoices with automated accounting ERP synchronization.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Claude 3.5 Sonnet', 'Docker'],
    rating: 5.0,
    badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/25',
  },
  {
    id: 8,
    domain: 'Hospitality & FoodTech',
    location: 'Sydney, Australia',
    title: 'Multi-Outlet Kitchen Display (KDS) & Cloud POS',
    outcome: '35 Outlets Synced • 30% Wait Time Drop',
    summary: 'Cloud POS and real-time kitchen dispatch system handling offline connectivity, instant recipe inventory depletion, and table reservation routing.',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS'],
    rating: 4.9,
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
  },
  {
    id: 9,
    domain: 'Automotive & Manufacturing',
    location: 'Bangalore, India',
    title: 'Assembly Telemetry & Quality Assurance Portal',
    outcome: 'Sub-Second Anomaly Detection • Full IP Rights',
    summary: 'Custom industrial IoT monitoring platform tracking component tolerance metrics across assembly lines with automated defect alerts.',
    techStack: ['React', 'FastAPI', 'InfluxDB', 'MQTT', 'Docker'],
    rating: 5.0,
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  },
  {
    id: 10,
    domain: 'Diagnostic Health Informatics',
    location: 'Munich, Germany',
    title: 'HL7 & FHIR Laboratory Integration Pipeline',
    outcome: 'Zero PII Leakage • Sub-200ms Processing',
    summary: 'Engineered high-security lab order intake pipelines connecting external clinics with automated test result distribution.',
    techStack: ['Python', 'PostgreSQL', 'Docker', 'AWS KMS', 'Redis'],
    rating: 4.8,
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/25',
  },
  {
    id: 11,
    domain: 'Staffing Agency Portals',
    location: 'New York, NY, USA',
    title: 'Blinded Candidate Submittal & VMS Portal',
    outcome: '2x Placement Velocity • 100% Anti-Poaching',
    summary: 'Turnkey staffing platform generating automated blinded PDF candidate packets with watermark protection and client approval workflows.',
    techStack: ['Next.js 15', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS S3'],
    rating: 5.0,
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
  },
  {
    id: 12,
    domain: 'Cross-Border Payments',
    location: 'Mumbai, India',
    title: 'Multi-Currency Merchant Settlement Gateway',
    outcome: 'Instant Webhook Dispatches • 99.98% Reliability',
    summary: 'Built high-throughput payment settlement microservices integrating bank APIs and automated ledger audit reporting.',
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'AWS ECS', 'TypeScript'],
    rating: 4.9,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  },
];

const CaseStudyCard: React.FC<{ item: CaseStudy }> = ({ item }) => (
  <div className="w-[300px] sm:w-[390px] md:w-[430px] flex-shrink-0 p-5 sm:p-7 rounded-2xl md:rounded-3xl bg-[#0B0F1E] border border-white/10 hover:border-[#60A5FA]/40 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group">
    <div className="space-y-4">
      {/* Top Header: Domain Badge, Location & Rating */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeColor} font-bold`}>
          {item.domain}
        </span>
        <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold font-mono">
          <Star size={12} className="fill-[#F59E0B]" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Case Study Title */}
      <div>
        <h4 className="text-sm sm:text-base font-black text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
          {item.title}
        </h4>
        <span className="text-[11px] font-mono text-zinc-400 block mt-1">
          📍 {item.location}
        </span>
      </div>

      {/* High-Impact Measurable Result Banner */}
      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
          Verified Business Impact:
        </span>
        <p className="text-xs sm:text-sm font-bold text-white leading-tight">
          {item.outcome}
        </p>
      </div>

      {/* Summary Description */}
      <p className="text-xs sm:text-[13px] font-normal text-zinc-300 leading-relaxed">
        {item.summary}
      </p>
    </div>

    {/* Tech Stack Chips & Code Ownership Badge */}
    <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {item.techStack.map((tech) => (
          <span 
            key={tech}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <ShieldCheck size={12} />
          <span>100% IP Handover</span>
        </span>
        <span className="text-zinc-500">Milestone Contract</span>
      </div>
    </div>
  </div>
);

const TestimonialsNew: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1 = [...caseStudiesRow1, ...caseStudiesRow1];
  const row2 = [...caseStudiesRow2, ...caseStudiesRow2];

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-24 md:py-32 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#DB2777]/10 via-[#60A5FA]/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-14 md:mb-16 relative z-10 text-center">
        <span className="text-[11px] sm:text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block mb-2 sm:mb-3">
          Proven Engineering Track Record
        </span>
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
          Enterprise Case Studies & <span className="text-[#60A5FA]">Delivered Systems</span>
        </h2>
        <p className="text-zinc-300 text-xs sm:text-base max-w-2xl mx-auto mt-2.5 sm:mt-4 font-normal">
          Anonymized production architectures delivered for startups, high-growth scale-ups, and global enterprise operators with 100% intellectual property ownership.
        </p>
      </div>

      {/* Infinite Marquee Container with Left/Right Gradient Fades */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6">
        
        {/* Left Edge Mask Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 md:w-48 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
        
        {/* Right Edge Mask Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 md:w-48 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Moves Left */}
        <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing w-max">
          {row1.map((item, idx) => (
            <CaseStudyCard key={`row1-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div 
          className="hidden sm:flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing w-max"
          style={{ animationDirection: 'reverse' }}
        >
          {row2.map((item, idx) => (
            <CaseStudyCard key={`row2-${item.id}-${idx}`} item={item} />
          ))}
        </div>

      </div>

      {/* Bottom Trust & LinkedIn Verification Bar */}
      <div className="max-w-5xl mx-auto mt-8 sm:mt-14 px-4 sm:px-6 relative z-10 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 sm:py-5 px-4 sm:px-8 rounded-2xl bg-[#0D1222]/80 border border-white/10 text-center">
          <div>
            <div className="text-xl sm:text-3xl font-black text-white">50+ Systems</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Delivered to Production</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="text-xl sm:text-3xl font-black text-[#60A5FA]">99.99%</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Cloud Architecture Uptime</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="text-xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">IP & Source Code Handover</div>
          </div>
        </div>

        {/* Live LinkedIn Company Verification Link */}
        <div className="text-center pt-2">
          <a
            href="https://www.linkedin.com/company/pavion-technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#0A66C2] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Verify Pavion Technologies Engineering Network on LinkedIn</span>
            <ExternalLink size={13} className="text-[#0A66C2]" />
          </a>
        </div>
      </div>

    </section>
  );
};

export default TestimonialsNew;
