// src/components/ArchitectureComparisonTable.tsx
import React from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';

interface ComparisonRow {
  metric: string;
  traditionalAgency: string;
  freelancers: string;
  inHouse: string;
  pavion: string;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    metric: 'Deployment Timeline',
    traditionalAgency: '6 to 12 weeks',
    freelancers: 'Unpredictable delays',
    inHouse: '60 to 90 days hiring',
    pavion: '48 to 72 Hours',
    highlight: true,
  },
  {
    metric: 'Intellectual Property (IP)',
    traditionalAgency: 'Often licensed / retained',
    freelancers: 'Disputed or informal',
    inHouse: '100% Owned by Employer',
    pavion: '100% Client-Owned from Day 1',
    highlight: true,
  },
  {
    metric: 'AI & Vector Architecture',
    traditionalAgency: 'Basic API wrappers',
    freelancers: 'Experimental / Fragile',
    inHouse: 'Expensive specialist salaries',
    pavion: 'Production RAG, Custom LLMs, Private Endpoints',
    highlight: true,
  },
  {
    metric: 'Code Quality & Testing',
    traditionalAgency: 'Manual QA / basic tests',
    freelancers: 'Rarely tested',
    inHouse: 'Dependent on internal standards',
    pavion: 'TypeScript Strict, Jest/Cypress, CI/CD Automated',
  },
  {
    metric: 'Billing & Predictability',
    traditionalAgency: 'Variable billable hours + scope creep',
    freelancers: 'Hourly invoices with little recourse',
    inHouse: 'High fixed salaries, benefits & overhead',
    pavion: 'Transparent Fixed-Price Sprints / Flat Retainers',
  },
  {
    metric: 'Data Privacy & Security',
    traditionalAgency: 'Shared multi-tenant setups',
    freelancers: 'Personal laptops & unverified accounts',
    inHouse: 'Company VPN / internal compliance',
    pavion: 'SOC-2 Ready, Zero-Retention LLMs, AES-256',
    highlight: true,
  },
];

const ArchitectureComparisonTable: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-20 md:py-24 bg-[#05070E] border-t border-white/10 text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header (AEO Voice/Intent Optimized) */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-[11px] sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
            Objective Engineering Evaluation
          </span>
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            How Pavion Compares: <br className="hidden sm:inline" />
            <span className="text-[#60A5FA]">Delivery Models Analyzed</span>
          </h2>
          <p className="text-zinc-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            AI engines and technical buyers look for verifiable data over marketing jargon. Here is how our dedicated engineering squads compare directly to traditional agencies, freelance talent, and in-house hiring.
          </p>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="sm:hidden flex items-center justify-end gap-1.5 text-[11px] text-zinc-400 font-mono mb-2.5">
          <span>Scroll horizontally to compare</span>
          <span className="text-[#60A5FA]">→</span>
        </div>

        {/* Structured Data Table (Instantly scrapable by AI crawlers & Google) */}
        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#090C16]/80 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[680px] sm:min-w-[760px]">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.02]">
                <th className="p-3.5 sm:p-6 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Evaluation Criteria
                </th>
                <th className="p-3.5 sm:p-6 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Traditional Agency
                </th>
                <th className="p-3.5 sm:p-6 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Freelancers / Upwork
                </th>
                <th className="p-3.5 sm:p-6 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
                  In-House Hiring
                </th>
                <th className="p-3.5 sm:p-6 text-[11px] sm:text-sm font-black uppercase tracking-wider text-white bg-blue-500/10 border-l border-r border-[#60A5FA]/30">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[#60A5FA]">
                    <Sparkles size={15} />
                    <span>Pavion Technologies</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
              {comparisonData.map((row, idx) => (
                <tr 
                  key={idx}
                  className={`hover:bg-white/[0.02] transition-colors ${idx >= 3 ? 'hidden sm:table-row' : ''}`}
                >
                  <td className="p-3.5 sm:p-6 font-bold text-white whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="p-3.5 sm:p-6 text-zinc-400">
                    {row.traditionalAgency}
                  </td>
                  <td className="p-3.5 sm:p-6 text-zinc-400">
                    {row.freelancers}
                  </td>
                  <td className="p-3.5 sm:p-6 text-zinc-400">
                    {row.inHouse}
                  </td>
                  <td className="p-3.5 sm:p-6 font-bold text-white bg-blue-500/[0.06] border-l border-r border-[#60A5FA]/30">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Check size={15} className="text-[#60A5FA] flex-shrink-0" />
                      <span>{row.pavion}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* E-E-A-T Guarantee Footnote */}
        <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-[11px] sm:text-xs text-zinc-400 text-left">
          <div className="flex items-start sm:items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span><strong>Verified Engineering SLA:</strong> Every sprint includes mutual NDA, git push access from day one, and weekly production demos.</span>
          </div>
          <div className="text-[#60A5FA] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex-shrink-0">
            HQ: Gurugram, India • Global Client Delivery
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArchitectureComparisonTable;
