// src/components/TestimonialsNew.tsx
import { useRef } from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  avatarColor: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: 1,
    quote: "Pavion engineered our high-volume ATS platform from scratch. Candidate parsing and automated talent matching cut our screening turnaround time by 65% across 200+ recruiters.",
    author: "David Miller",
    role: "CTO",
    company: "Apex Talent Group",
    location: "Austin, TX, USA",
    rating: 5.0,
    avatarColor: "from-purple-600 to-blue-500",
  },
  {
    id: 2,
    quote: "HIPAA and GDPR-compliant patient portal delivered with pinpoint precision. Their AI clinical triage workflow reduced front-desk patient query bottlenecks by over 50%.",
    author: "Sarah Jenkins",
    role: "Head of Digital",
    company: "MediPulse Health",
    location: "London, UK",
    rating: 4.9,
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    quote: "The multi-tenant CRM and property management ERP streamlined our broker network across 4 countries. Direct ROI visible within 4 weeks of production launch.",
    author: "Gaurav Shokanda",
    role: "Head of Engineering",
    company: "UrbanSpace Realty",
    location: "Dubai, UAE",
    rating: 4.8,
    avatarColor: "from-pink-600 to-purple-600",
  },
  {
    id: 4,
    quote: "Rock-solid cloud infrastructure and microservices architecture. Handled over 1.2M daily transactions during peak volatility with 99.99% uptime and zero latency spikes.",
    author: "Michael Chang",
    role: "VP of Technology",
    company: "NextWave FinTech",
    location: "Toronto, Canada",
    rating: 5.0,
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: 5,
    quote: "Real-time fleet dispatch optimization, carrier tracking, and telemetry dashboards built seamlessly. Our operational fuel and logistics overhead dropped by 18% in quarter one.",
    author: "Priya Nair",
    role: "VP Product",
    company: "Omnix Logistics",
    location: "Singapore",
    rating: 4.9,
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    id: 6,
    quote: "Pavion's DevOps squad migrated 40+ legacy microservices to Kubernetes and AWS with zero downtime. CI/CD deployment frequencies jumped from bi-weekly to 8 times daily.",
    author: "Liam O'Connor",
    role: "Director of Engineering",
    company: "CloudScale Europe",
    location: "Dublin, Ireland",
    rating: 4.8,
    avatarColor: "from-indigo-600 to-blue-500",
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: 7,
    quote: "Their dedicated AI squad delivered our intelligent document extraction engine in 6 weeks. 99.2% OCR precision completely eliminated our manual invoice entry workflow.",
    author: "Marcus Vance",
    role: "Founder & CEO",
    company: "StrataFlow Solutions",
    location: "San Francisco, CA, USA",
    rating: 5.0,
    avatarColor: "from-violet-600 to-pink-500",
  },
  {
    id: 8,
    quote: "Centralized inventory, multi-outlet POS synchronization, and automated table turnover analytics across 35 restaurant locations. Table wait times plunged by 30%.",
    author: "Emma Watson-Smith",
    role: "Operations Director",
    company: "Apex Hospitality",
    location: "Sydney, Australia",
    rating: 4.9,
    avatarColor: "from-rose-500 to-amber-500",
  },
  {
    id: 9,
    quote: "Enterprise-grade software delivered with true Silicon Valley rigor. Clean TypeScript architecture, 100% IP ownership, and zero critical production issues post-launch.",
    author: "Vikram Malhotra",
    role: "Managing Director",
    company: "Zenith AutoTech",
    location: "Bangalore, India",
    rating: 5.0,
    avatarColor: "from-blue-600 to-cyan-400",
  },
  {
    id: 10,
    quote: "Pavion's engineers built an intuitive diagnostic data pipeline integrating HL7 and FHIR standards without compromising patient privacy or speed. Outstanding technical execution.",
    author: "Dr. Julian Weber",
    role: "Chief Information Officer",
    company: "BioCore Diagnostics",
    location: "Munich, Germany",
    rating: 4.8,
    avatarColor: "from-teal-500 to-emerald-600",
  },
  {
    id: 11,
    quote: "The custom recruitment analytics and AI candidate match scoring gave our staffing firm a massive speed advantage. Client placement velocity doubled in 60 days.",
    author: "Chloe Bennett",
    role: "VP Talent Acquisition",
    company: "GlobalHire Partners",
    location: "New York, NY, USA",
    rating: 5.0,
    avatarColor: "from-fuchsia-600 to-purple-600",
  },
  {
    id: 12,
    quote: "From mobile app architecture to high-concurrency payment gateway integration, Pavion proved to be an invaluable technology partner. Exceptional code quality and responsiveness.",
    author: "Rohan Deshmukh",
    role: "Head of Product",
    company: "SwiftPay Global",
    location: "Mumbai, India",
    rating: 4.9,
    avatarColor: "from-cyan-500 to-indigo-600",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillPercent = Math.max(0, Math.min(100, Math.round((rating - (starIndex - 1)) * 100)));
        return (
          <div key={starIndex} className="relative w-4 h-4 flex items-center justify-center">
            {/* Base dim/empty star */}
            <Star size={15} className="text-zinc-700 fill-zinc-800/80" />
            {/* Filled star overlay */}
            {fillPercent > 0 && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star size={15} className="text-[#F59E0B] fill-[#F59E0B] flex-shrink-0" />
              </div>
            )}
          </div>
        );
      })}
    </div>
    <span className="text-xs font-black text-[#F59E0B] tracking-tight ml-0.5">
      {rating.toFixed(1)}
    </span>
  </div>
);

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="w-[275px] sm:w-[380px] md:w-[420px] flex-shrink-0 p-4 sm:p-7 rounded-2xl md:rounded-3xl bg-[#0D1222]/90 border border-white/10 hover:border-[#60A5FA]/40 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group">
    <div>
      {/* Top Bar: Rating Stars & Quote Icon */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <StarRating rating={item.rating} />
        <Quote size={20} className="text-[#60A5FA]/40 group-hover:text-[#60A5FA] transition-colors sm:w-[22px] sm:h-[22px]" />
      </div>

      {/* Quote Body */}
      <p className="text-xs sm:text-[15px] font-normal text-zinc-300 leading-relaxed mb-4 sm:mb-6">
        "{item.quote}"
      </p>
    </div>

    {/* Author Info */}
    <div className="flex items-center gap-3 sm:gap-3.5 pt-3 sm:pt-4 border-t border-white/10">
      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr ${item.avatarColor} flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md flex-shrink-0`}>
        {item.author.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h4 className="text-xs sm:text-base font-bold text-white truncate">
            {item.author}
          </h4>
          <CheckCircle2 size={13} className="text-blue-400 flex-shrink-0" />
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">
          {item.role}, <span className="text-zinc-300 font-semibold">{item.company}</span>
          {item.location && <span className="text-zinc-500 ml-1.5">• {item.location}</span>}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsNew: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Seamless infinite loop with 12 distinct cards
  const row1 = [...testimonialsRow1, ...testimonialsRow1];
  const row2 = [...testimonialsRow2, ...testimonialsRow2];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-24 md:py-32 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#DB2777]/10 via-[#60A5FA]/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-14 md:mb-16 relative z-10 text-center">
        <span className="text-[11px] sm:text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block mb-2 sm:mb-3">
          Client Testimonials
        </span>
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
          What Our Clients <span className="text-[#60A5FA]">Say About Us</span>
        </h2>
        <p className="text-zinc-300 text-xs sm:text-base max-w-xl mx-auto mt-2.5 sm:mt-4 font-normal">
          Real feedback from enterprise leaders, founders, and CTOs who build with Pavion Technologies.
        </p>
      </div>

      {/* Infinite Marquee Container with Left/Right Gradient Fades */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6">
        
        {/* Left Edge Mask Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 md:w-48 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
        
        {/* Right Edge Mask Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 md:w-48 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Moves Left (Both Mobile & Desktop) */}
        <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing w-max">
          {row1.map((item, idx) => (
            <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Row 2: Moves Right (Desktop / Tablet Only to prevent phone scroll fatigue) */}
        <div 
          className="hidden sm:flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing w-max"
          style={{ animationDirection: 'reverse' }}
        >
          {row2.map((item, idx) => (
            <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
          ))}
        </div>

      </div>

      {/* Bottom Trust Metric Bar */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-14 px-4 sm:px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-3.5 sm:py-5 px-4 sm:px-8 rounded-2xl bg-[#0D1222]/60 border border-white/10 text-center">
          <div>
            <div className="text-xl sm:text-3xl font-black text-white">4.9 / 5.0</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Average Client Rating</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="text-xl sm:text-3xl font-black text-[#60A5FA]">50+ Projects</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Delivered Globally</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="text-xl sm:text-3xl font-black text-emerald-400">98%</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">On-Time Sprint Completion</div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TestimonialsNew;
