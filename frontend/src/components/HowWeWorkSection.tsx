// src/components/HowWeWorkSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode2, 
  GitPullRequest, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Check
} from 'lucide-react';

interface HowWeWorkSectionProps {
  onOpenModal?: (topic: string) => void;
}

const steps = [
  {
    day: 'Day 01 – 02',
    stage: 'Stage 01',
    title: 'Discovery, System Audit & Architecture Alignment',
    summary: 'Direct consultation with our engineering leadership to freeze specifications, execute mutual NDAs, and define system architecture.',
    icon: FileCode2,
    badgeColor: 'text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/25',
    actionItem: 'Architecture Blueprint & Fixed Scope',
    details: [
      'Direct 60-min discovery session with our System Architect and Product Lead.',
      'Mutual Bilateral NDA executed before reviewing proprietary code or workflows.',
      'System Architecture Blueprint: Database ERDs, microservices topology, and API contracts.',
      'Fixed-milestone proposal with transparent delivery timelines and zero hidden fees.',
    ],
    deliverables: [
      'Executed Bilateral NDA',
      'System Architecture Diagram',
      'Sprint Roadmap & Milestones',
    ],
  },
  {
    day: 'Day 03 – 04',
    stage: 'Stage 02',
    title: 'Repository Provisioning & CI/CD Pipeline Setup',
    summary: 'Setting up private repositories, isolated staging environments, and direct integration with your existing workflow tools.',
    icon: GitPullRequest,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
    actionItem: 'Infrastructure & Sandboxing',
    details: [
      'Private GitHub/GitLab repository created with strict branch protection rules.',
      'Automated CI/CD pipelines configured on AWS or Cloudflare with PR preview URLs.',
      'Dockerized development environments to guarantee reproducibility across all machines.',
      'Shared Slack or Teams Connect channel plus Jira or Linear sprint board access.',
    ],
    deliverables: [
      'Private Git Repositories',
      'Automated Staging CI/CD',
      'Shared Slack & Jira Access',
    ],
  },
  {
    day: 'Day 05 – 07',
    stage: 'Stage 03',
    title: 'First Production Commit & Sprint Kickoff',
    summary: 'Our dedicated engineering squad begins execution, pushing the first reviewed code commit to your live staging environment.',
    icon: Rocket,
    badgeColor: 'text-[#DB2777] bg-[#DB2777]/10 border-[#DB2777]/25',
    actionItem: 'First Commit & Active Velocity',
    details: [
      'Sprint #1 backlog refinement with prioritized user stories and acceptance criteria.',
      'First functional feature developed, reviewed, and deployed to your live staging URL.',
      'Daily 15-minute asynchronous standups with transparent GitHub commit telemetry.',
      'Direct contact with assigned Tech Lead for real-time requirement clarifications.',
    ],
    deliverables: [
      'First Live Staging Commit',
      'Sprint #1 In-Flight',
      'Daily Async Standup Cadence',
    ],
  },
  {
    day: 'Ongoing',
    stage: 'Cadence',
    title: 'Bi-Weekly Demos, Automated Tests & 100% IP Transfer',
    summary: 'Predictable, production-ready iterations with live stakeholder demos every 14 days and continuous source code ownership.',
    icon: CheckCircle2,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    actionItem: 'Continuous Production Releases',
    details: [
      'Live working software demonstration every 14 days for your team and stakeholders.',
      'Automated unit, integration, and security regression testing on every pull request.',
      'Zero vendor lock-in: 100% source code and intellectual property assigned on every milestone.',
      'Comprehensive technical documentation and architectural runbooks maintained continuously.',
    ],
    deliverables: [
      'Bi-Weekly Staging Demos',
      'Automated QA Regression Suite',
      '100% Source Code Transfer',
    ],
  },
];

const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ onOpenModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-14 sm:py-20 md:py-28 bg-[#070A14] border-t border-white/10 text-white overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/25 text-[#60A5FA] text-xs font-mono uppercase tracking-wider font-semibold">
            <Clock size={13} />
            <span>Delivery Process & Roadmap</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            What Happens In Your <span className="text-[#60A5FA]">First 7 Days</span>
          </h2>

          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal">
            No black-box development or vague timelines. From day-one whiteboard architecture to daily CI/CD deployments, here is our transparent onboarding engine.
          </p>
        </div>

        {/* Step Navigation Pill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12 max-w-5xl mx-auto">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.day}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 sm:p-5 rounded-2xl text-left border transition-all duration-300 relative ${
                  isActive
                    ? 'bg-white/[0.08] border-[#60A5FA] shadow-lg shadow-blue-500/10'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                    isActive ? 'text-[#60A5FA]' : 'text-zinc-400'
                  }`}>
                    {s.stage}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                    {s.day}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {steps.map((current, idx) => {
              if (idx !== activeStep) return null;
              const Icon = current.icon;
              return (
                <motion.div
                  key={current.day}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 shadow-2xl relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Summary & Action items */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#60A5FA]">
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${current.badgeColor} font-bold`}>
                            {current.day} • {current.stage}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {current.summary}
                      </p>

                      {/* Detailed Bullet Points */}
                      <div className="space-y-2.5 pt-2">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                          Key Milestones in This Phase:
                        </span>
                        <ul className="space-y-2">
                          {current.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] mt-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Concrete Deliverables Card */}
                    <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0B0F1E] border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <ShieldCheck size={16} />
                        <span>Guaranteed Deliverables</span>
                      </div>

                      <div className="space-y-2.5">
                        {current.deliverables.map((item, itIdx) => (
                          <div 
                            key={itIdx}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white"
                          >
                            <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                              <Check size={12} />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <button
                          onClick={() => onOpenModal?.(`Inquire: ${current.title}`)}
                          className="w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <span>Discuss Your Project Timeline</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Engineering Integrity Assurance Strip */}
        <div className="mt-8 sm:mt-12 max-w-5xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2">
            <div className="text-base sm:text-lg font-black text-white">48–72h</div>
            <div className="text-[11px] text-zinc-400 font-mono">Squad Onboarding</div>
          </div>
          <div className="p-2">
            <div className="text-base sm:text-lg font-black text-white">100%</div>
            <div className="text-[11px] text-zinc-400 font-mono">Source Code IP Ownership</div>
          </div>
          <div className="p-2">
            <div className="text-base sm:text-lg font-black text-white">14 Days</div>
            <div className="text-[11px] text-zinc-400 font-mono">Risk-Free Evaluation</div>
          </div>
          <div className="p-2">
            <div className="text-base sm:text-lg font-black text-white">Zero</div>
            <div className="text-[11px] text-zinc-400 font-mono">Hidden Recruitment Fees</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;
