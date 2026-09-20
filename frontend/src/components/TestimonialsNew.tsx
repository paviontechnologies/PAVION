// src/components/TestimonialsNew.tsx
import { useRef } from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarColor: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: 1,
    quote: "Pavion Technologies transformed our vision into reality. Their attention to detail, AI expertise, and rapid execution exceeded all expectations.",
    author: "Aakash Sharma",
    role: "Co-founder",
    company: "FinTech Startup",
    rating: 4.9,
    avatarColor: "from-purple-600 to-blue-500",
  },
  {
    id: 2,
    quote: "The custom CRM and ERP they engineered streamlined our entire sales operations. ROI was clearly visible within the first 30 days.",
    author: "Gaurav Shokanda",
    role: "Head of IT",
    company: "Real Estate Corp",
    rating: 4.7,
    avatarColor: "from-pink-600 to-purple-600",
  },
  {
    id: 3,
    quote: "Their AI solutions revolutionized how we handle 24/7 patient support. Average response times dropped by over 70% in two weeks.",
    author: "Sonia Rathi",
    role: "Operations Manager",
    company: "Healthcare Systems",
    rating: 5.0,
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: 4,
    quote: "Professional, innovative, and incredibly reliable. Pavion is our go-to engineering partner for all our mobile apps and cloud workloads.",
    author: "Aakash Singh",
    role: "Logistics Head",
    company: "E-Commerce Logistics",
    rating: 4.4,
    avatarColor: "from-emerald-500 to-teal-600",
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: 5,
    quote: "Flawless execution. The scalable cloud architecture handled 100k+ concurrent users during our global product launch without a single glitch.",
    author: "Pooja Verma",
    role: "Product Director",
    company: "EduTech Global",
    rating: 4.8,
    avatarColor: "from-amber-500 to-pink-500",
  },
  {
    id: 6,
    quote: "Their squad built our AI automation MVP in record time. Clean architecture, 100% IP ownership, and zero production bugs.",
    author: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "SaaS Platform",
    rating: 5.0,
    avatarColor: "from-indigo-600 to-pink-600",
  },
  {
    id: 7,
    quote: "From initial UI/UX designs to final AWS deployment, their engineers delivered world-class speed and quality. Highly recommended!",
    author: "Neha Kapoor",
    role: "VP of Engineering",
    company: "Retail Tech",
    rating: 4.9,
    avatarColor: "from-rose-500 to-purple-600",
  },
  {
    id: 8,
    quote: "Delivered our custom multi-tenant hospitality management software on time and within budget. Customer satisfaction skyrocketed by 40%.",
    author: "Rohan Mehra",
    role: "Managing Director",
    company: "Hospitality Group",
    rating: 4.5,
    avatarColor: "from-blue-600 to-cyan-400",
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
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsNew: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Duplicate arrays for seamless infinite loop
  const row1 = [...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1];
  const row2 = [...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2];

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
