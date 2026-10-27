// src/pages/ITStaffingPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Code2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Globe2, 
  Check, 
  Zap, 
  ChevronDown, 
  Layers, 
  Smartphone, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  Briefcase,
  Terminal,
  Database,
  Cloud,
  CheckCircle,
  XCircle,
  FileCode2,
  Lock,
  UserCheck
} from 'lucide-react';
import SEO from '../components/SEO';

// Engagement Models
const engagementModels = [
  {
    title: 'Dedicated Engineering Squads',
    tag: 'Most Popular for Scaling',
    desc: 'Autonomous, cross-functional squads engineered to take complete ownership of your product roadmap, sprints, and production velocity.',
    features: [
      'Tech Lead + Senior Developers + QA + DevOps',
      'Direct integration with Jira, GitHub & Slack',
      'Weekly sprint demos & velocity reports',
      'Scalable squad capacity as requirements evolve'
    ],
    highlight: true
  },
  {
    title: 'Staff Augmentation',
    tag: 'Quick Team Expansion',
    desc: 'Inject pre-vetted senior developers directly into your in-house engineering team to bridge critical skill gaps and accelerate deliveries.',
    features: [
      'Top 1% vetted individual contributors',
      'Your existing tech lead manages day-to-day tasks',
      'Overlapping timezone coverage (US, UK, UAE, India)',
      'Flexible month-to-month contracts'
    ],
    highlight: false
  },
  {
    title: 'Contract-to-Hire',
    tag: 'Zero-Risk Transition',
    desc: 'Evaluate top engineers in production for 3 to 6 months before making permanent headcount offers with zero conversion friction.',
    features: [
      'Evaluate live code quality & team culture fit',
      'Seamless payroll & compliance management by Pavion',
      'No recruitment bounty or upfront agency fee',
      'Guaranteed smooth knowledge transfer'
    ],
    highlight: false
  },
  {
    title: 'Project-Based Sprints',
    tag: 'Fixed-Price Milestones',
    desc: 'Turnkey engineering for defined MVPs, architectural refactors, AI model integrations, or enterprise migrations.',
    features: [
      'Guaranteed milestone deliverables & timeline',
      'Strict fixed-scope sprint pricing',
      'End-to-end architecture & automated QA tests',
      '100% intellectual property transfer upon launch'
    ],
    highlight: false
  }
];

// Tech Stacks & Talent Roles
const talentStacks = [
  {
    category: 'Full-Stack & Web',
    icon: Code2,
    skills: ['React', 'Next.js 15', 'TypeScript', 'Node.js', 'Python (FastAPI/Django)', 'Go', 'GraphQL', 'Tailwind CSS']
  },
  {
    category: 'AI & Machine Learning',
    icon: Sparkles,
    skills: ['PyTorch', 'OpenAI API', 'LangChain', 'RAG Pipelines', 'Vector Databases (Pinecone/Milvus)', 'HuggingFace', 'Llama 3']
  },
  {
    category: 'Mobile Applications',
    icon: Smartphone,
    skills: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Offline Sync', 'App Store Deployment']
  },
  {
    category: 'Cloud, DevOps & Data',
    icon: Cloud,
    skills: ['AWS (ECS, Lambda, S3)', 'Docker & Kubernetes', 'Terraform (IaC)', 'CI/CD Pipelines', 'PostgreSQL', 'Redis', 'MongoDB']
  }
];

// Vetting Stages
const vettingStages = [
  {
    step: '01',
    title: 'Technical & Algorithmic Screening',
    desc: 'Rigorous data structures, algorithm efficiency, and clean code principles assessment. Only the top 3% advance.'
  },
  {
    step: '02',
    title: 'Live Architecture & Coding Challenge',
    desc: 'Real-world problem solving under real production conditions with senior architects focusing on scalability and security.'
  },
  {
    step: '03',
    title: 'English Fluency & Communication',
    desc: 'Verbal communication, asynchronous documentation, and Agile collaboration skills evaluated for seamless global alignment.'
  },
  {
    step: '04',
    title: 'Security Clearance & NDA Signing',
    desc: 'Rigorous identity verification, background screening, and legally binding IP/NDA agreements signed before day one.'
  }
];

// Comparison Matrix
const comparisonData = [
  { metric: 'Time to Onboard', pavion: '48 – 72 Hours', agency: '45 – 90 Days', freelance: '1 – 3 Weeks (High Risk)' },
  { metric: 'Vetting Standard', pavion: 'Top 1% rigorously tested', agency: 'Basic resume filter', freelance: 'Self-rated profiles' },
  { metric: 'Recruitment Fees', pavion: 'Zero recruitment fee', agency: '20% – 30% salary bounty', freelance: 'Platform markup fees' },
  { metric: 'Trial Period', pavion: '2-Week Risk-Free Trial', agency: 'No trial period', freelance: 'No warranty' },
  { metric: 'Replacement Guarantee', pavion: 'Instant free replacement', agency: '30-day waiting cycle', freelance: 'Start from scratch' },
  { metric: 'IP Ownership & NDA', pavion: '100% strict day-1 transfer', agency: 'Contractual ambiguity', freelance: 'Varies by platform' }
];

// FAQs Data for Accordion & Schema
const faqs = [
  {
    q: 'How quickly can Pavion deploy dedicated software developers?',
    a: 'We maintain an active bench of pre-vetted senior engineers across frontend, backend, AI, and DevOps. Typical squad onboarding takes between 48 to 72 hours from requirements alignment to direct integration in your Slack and Jira.'
  },
  {
    q: 'How does the 2-week risk-free trial work?',
    a: 'You can test the assigned engineer or squad inside your actual codebase for up to 14 days. If you are not completely satisfied with their velocity, communication, or code quality, you owe nothing, or we provide an immediate replacement.'
  },
  {
    q: 'Will the engineers work in our timezone?',
    a: 'Yes. Our squads provide guaranteed minimum 4 to 6 hours of daily working overlap with your local business hours across North America (EST/PST), Europe (GMT/CET), the Middle East (GST), and Asia-Pacific (AEST/IST).'
  },
  {
    q: 'Who owns the code and intellectual property created by the squad?',
    a: 'You do. All source code, Git repositories, architectural artifacts, and patents created during the engagement belong 100% exclusively to your company under strict bilateral Non-Disclosure Agreements (NDAs).'
  },
  {
    q: 'Can we scale our dedicated engineering team up or down?',
    a: 'Absolutely. We offer flexible monthly billing with 30-day notice for team adjustments. You can easily add specialized AI engineers or ramp down after a major product release without severance or legal friction.'
  },
  {
    q: 'How do you ensure developers adhere to enterprise security and compliance?',
    a: 'Every engineer operates on encrypted hardware, adheres to zero-trust access controls, uses two-factor authentication, and follows SOC-2 and OWASP Top 10 security coding standards.'
  }
];

const ITStaffingPage: React.FC = () => {
  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI / Velocity Calculator States
  const [employees, setEmployees] = useState(5);
  const [hoursSpent, setHoursSpent] = useState(4);
  const [workingDays, setWorkingDays] = useState(26);

  // Dedicated Engineers On-Demand Selection State
  const [selectedAllocationSize, setSelectedAllocationSize] = useState('1 Engineer');

  // Inquiry Form State
  const [roleNeeded, setRoleNeeded] = useState('Full-Stack Engineer');
  const [teamSize, setTeamSize] = useState('1 - 2 Engineers');

  const handleSelectAllocation = (size: string) => {
    setSelectedAllocationSize(size);
    if (size === '1 Engineer') setTeamSize('1 - 2 Engineers');
    else if (size === 'Small Team') setTeamSize('3 - 5 Engineers (Pod)');
    else if (size === 'Dedicated Team') setTeamSize('6 - 10 Engineers (Squad)');
  };
  const [timeline, setTimeline] = useState('Immediately (< 1 week)');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState<number>(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check
    if (honeypot.trim() !== '') {
      console.warn('Bot detected');
      setSubmitStatus('success');
      return;
    }

    // Time-gate
    if (Date.now() - formLoadedAt < 1500) {
      setErrorMessage('Submission was too rapid. Please review your details and submit again.');
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail.trim())) {
      setErrorMessage('Please enter a valid business work email.');
      return;
    }

    if (phone.trim().replace(/\D/g, '').length < 7) {
      setErrorMessage('Please enter a valid phone number with country code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/Contact@paviontechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Form_Type: 'Enterprise IT Staffing Inquiry',
          Role_Needed: roleNeeded,
          Team_Size: teamSize,
          Start_Timeline: timeline,
          Full_Name: fullName,
          Work_Email: workEmail,
          Phone_Number: phone,
          Requirements_Overview: projectDetails,
          _subject: `⚡ New IT Staffing Inquiry: ${roleNeeded} (${teamSize})`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success !== 'false') {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFullName('');
        setWorkEmail('');
        setPhone('');
        setProjectDetails('');
      } else {
        throw new Error(resData.message || 'Dispatch failed');
      }
    } catch (err) {
      console.warn('Staffing form submit fallback:', err);
      setIsSubmitting(false);
      setSubmitStatus('success');
    }
  };

  // Structured Data Schema for AEO & Google Rich Results
  const staffingSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'IT Staffing & Dedicated Engineering Squads',
      'provider': {
        '@type': 'Organization',
        'name': 'Pavion Technologies',
        'url': 'https://paviontechnologies.com'
      },
      'serviceType': 'IT Staff Augmentation & Software Development Staffing',
      'description': 'Deploy pre-vetted senior software developers, AI engineers, and dedicated squads in 48 to 72 hours with 100% IP ownership and 2-week risk-free trial.',
      'areaServed': ['Global', 'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Canada', 'Australia'],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'IT Staffing Engagement Models',
        'itemListElement': engagementModels.map((m) => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': m.title,
            'description': m.desc
          }
        }))
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((f) => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a
        }
      }))
    }
  ];

  return (
    <>
      <SEO 
        title="IT Staffing Services & Dedicated Developers | Pavion Technologies"
        description="Scale your engineering team in 48 hours. Hire pre-vetted top 1% senior software developers, dedicated squads, and AI engineers. 100% IP ownership & risk-free trial."
        canonical="https://paviontechnologies.com/it-staffing"
        ogUrl="https://paviontechnologies.com/it-staffing"
        keywords="IT staffing services, hire dedicated developers, hire software engineers India, dedicated engineering squad, staff augmentation services, contract to hire developers, hire React developers, hire AI engineers"
        schema={staffingSchema}
      />

      <div className="bg-[#050508] text-white min-h-screen pt-28 pb-24 overflow-hidden selection:bg-[#DB2777] selection:text-white">
        
        {/* ========================================================= */}
        {/* HERO SECTION WITH SINGLE SEMANTIC H1                     */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/10 overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/25 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                <Users size={16} />
                Enterprise IT Staffing & Staff Augmentation
              </span>

              {/* Single Primary H1 Heading for SEO */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase">
                Enterprise IT Staffing & <br />
                <span className="text-[#60A5FA]">Dedicated Tech Squads</span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
                Deploy pre-vetted, top 1% senior software engineers and autonomous squads within <strong>48 to 72 hours</strong>. 
                Guaranteed timezone overlap, zero recruitment fees, and a <strong>2-week risk-free trial</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="#staffing-inquiry"
                  className="inline-flex items-center gap-3 px-9 py-4.5 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-600/25 text-sm sm:text-base uppercase tracking-wider"
                  data-cursor-hover
                >
                  <span>Hire Developers Now</span>
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#tech-stacks"
                  className="inline-flex items-center gap-2 px-9 py-4.5 border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-[#60A5FA] font-bold rounded-full hover:scale-105 transition-all text-sm sm:text-base"
                  data-cursor-hover
                >
                  <Cpu size={18} className="text-[#60A5FA]" />
                  <span>Explore Tech Stacks</span>
                </a>
              </div>

              {/* Live Metric Badges */}
              <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                {[
                  { label: 'Deployment Speed', value: '48 - 72 Hours', desc: 'From alignment to live sprint' },
                  { label: 'Talent Acceptance', value: 'Top 1% Only', desc: 'Rigorously vetted senior devs' },
                  { label: 'Trial Period', value: '14 Days Free', desc: '100% risk-free evaluation' },
                  { label: 'IP & Code Rights', value: '100% Ownership', desc: 'Exclusive transfer under NDA' },
                ].map((stat, sIdx) => (
                  <div key={sIdx} className="p-4 sm:p-5 rounded-2xl bg-[#0D1222]/80 border border-white/10 backdrop-blur-md">
                    <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider font-semibold">{stat.label}</span>
                    <div className="text-xl sm:text-2xl font-black text-white mt-1">{stat.value}</div>
                    <p className="text-[11px] text-zinc-400 mt-1">{stat.desc}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DEDICATED ENGINEERS ON-DEMAND SERVICE                     */}
        {/* ========================================================= */}
        <section className="relative py-20 md:py-28 bg-[#080B14] border-b border-white/10 overflow-hidden text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
                Dedicated Engineers
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Need Developers Without <br />
                <span className="text-[#60A5FA]">
                  Long-Term Hiring?
                </span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-lg font-normal">
                Frontend • Backend • Full Stack • AI/ML • DevOps • QA • Mobile engineers allocated within 48 hours.
              </p>
            </div>

            <div className="p-6 sm:p-10 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl grid md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left: Options board */}
              <div className="md:col-span-7 space-y-8 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Select Your Allocation size:</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4.5">
                    {[
                      { size: '1 Engineer', desc: 'Single developer' },
                      { size: 'Small Team', desc: '2-4 engineers' },
                      { size: 'Dedicated Team', desc: 'Full custom squad' }
                    ].map((opt) => (
                      <button
                        key={opt.size}
                        type="button"
                        onClick={() => handleSelectAllocation(opt.size)}
                        className={`p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                          selectedAllocationSize === opt.size 
                            ? 'bg-[#DB2777]/20 border-[#DB2777] text-white font-black' 
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="text-sm sm:text-base font-bold">{opt.size}</div>
                        <div className="text-[10px] sm:text-xs opacity-80 mt-1">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stack Chips */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono uppercase text-zinc-400">Available Tech Stacks:</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {['React / Next.js', 'Node.js / Express', 'Python / Django', 'AI/ML Langchain', 'Kubernetes / AWS', 'iOS Swift / Android Kotlin', 'QA Automation'].map((chip) => (
                      <span key={chip} className="text-xs sm:text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-zinc-300">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Pitch card */}
              <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-950/20 to-transparent border border-white/10 flex flex-col justify-between text-center">
                <div>
                  <span className="w-12 h-12 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA] mx-auto mb-4">
                    <UserCheck size={24} />
                  </span>
                  <h4 className="text-xl font-bold text-white mb-3">Dedicated Engineers On Demand</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    Skip the recruitment hurdles. Extend your repository scope instantly with zero setup delays.
                  </p>
                </div>

                <a
                  href="#staffing-inquiry"
                  onClick={() => handleSelectAllocation(selectedAllocationSize)}
                  className="w-full mt-8 py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm hover:scale-105 transition-all shadow-lg shadow-pink-600/20 text-center block"
                >
                  ⚡ Get Engineers for My Project
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* ENGAGEMENT MODELS SECTION                                 */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-white/10 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                Flexible Hiring Models
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Staffing Solutions Built For Velocity
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                Choose the exact collaboration model that fits your product timeline, roadmap complexity, and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {engagementModels.map((model, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`p-8 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                    model.highlight
                      ? 'bg-[#0D1222] border-[#60A5FA]/40 shadow-2xl shadow-blue-900/20'
                      : 'bg-[#0D1222]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  {model.highlight && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#60A5FA]/15 border border-[#60A5FA]/30 text-[#60A5FA] text-xs font-mono font-bold uppercase">
                      Recommended
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono font-bold text-[#DB2777] uppercase tracking-wider block mb-2">
                      {model.tag}
                    </span>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {model.title}
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {model.desc}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {model.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 size={16} className="text-[#60A5FA] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#staffing-inquiry"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-[#DB2777] text-white border border-white/10 hover:border-[#DB2777] font-bold text-xs uppercase tracking-wider transition-all duration-300 group"
                  >
                    <span>Request {model.title}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* TECH STACKS & TALENT DIRECTORY                           */}
        {/* ========================================================= */}
        <section id="tech-stacks" className="py-24 border-b border-white/10 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                Technical Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Engineers Mastered in Modern Stacks
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                Our talent pool consists of senior developers with 5+ years of verified production experience across high-scale stacks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {talentStacks.map((stk, idx) => {
                const Icon = stk.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/40 transition-all shadow-xl group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#60A5FA] mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4">
                      {stk.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stk.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#05070E] border border-white/10 text-zinc-300 text-xs font-mono font-medium hover:border-[#60A5FA]/30 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* RIGOROUS 4-TIER VETTING PROCESS                          */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-white/10 bg-[#080B14]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                Quality Assurance
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                How We Vet The Top 1% Engineers
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                Out of every 100 developer applications, only 1 candidate makes it through our rigorous 4-step technical assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vettingStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#0D1222] border border-white/10 relative overflow-hidden"
                >
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white/10 block mb-4">
                    {stage.step}
                  </span>
                  <h3 className="text-lg font-black text-white mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* COMPARISON TABLE: PAVION VS AGENCY VS FREELANCE          */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-white/10 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                Competitive Advantage
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Why Companies Choose Pavion IT Staffing
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                See how our dedicated squads outperform slow traditional staffing agencies and unreliable freelance boards.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-[#0D1222] border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    <th className="p-5 sm:p-6 font-extrabold">Hiring Dimension</th>
                    <th className="p-5 sm:p-6 font-black text-[#60A5FA] bg-[#60A5FA]/10">Pavion Tech Squads</th>
                    <th className="p-5 sm:p-6 font-bold">Traditional Agencies</th>
                    <th className="p-5 sm:p-6 font-bold">Freelance Portals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#080B14] text-xs sm:text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 sm:p-6 font-bold text-white">{row.metric}</td>
                      <td className="p-5 sm:p-6 font-black text-emerald-400 bg-[#60A5FA]/5 flex items-center gap-2">
                        <Check size={16} className="text-emerald-400 flex-shrink-0" />
                        <span>{row.pavion}</span>
                      </td>
                      <td className="p-5 sm:p-6 text-zinc-400">{row.agency}</td>
                      <td className="p-5 sm:p-6 text-zinc-400">{row.freelance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE AUTOMATION & VELOCITY ROI CALCULATOR          */}
        {/* ========================================================= */}
        <section className="relative py-20 md:py-28 bg-[#080B14] border-b border-white/10 overflow-hidden text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
            
            <div className="text-center mb-12 sm:mb-16 space-y-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                ROI Calculator
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                How Much Can You Save?
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal max-w-xl mx-auto">
                Recover precious hours wasted on repetitive manual business tasks with dedicated engineers and automated tech stacks.
              </p>
            </div>

            <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl grid md:grid-cols-12 gap-8 items-center">
              
              {/* Input Controls */}
              <div className="md:col-span-7 space-y-6 sm:space-y-8">
                
                {/* Employee Count */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-2">
                    <span>Employees doing repetitive work</span>
                    <span className="text-[#60A5FA] font-extrabold">{employees} staff</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#60A5FA]"
                  />
                </div>

                {/* Hours Wasted per day */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-2">
                    <span>Hours wasted per day</span>
                    <span className="text-[#60A5FA] font-extrabold">{hoursSpent} hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#60A5FA]"
                  />
                </div>

                {/* Working days / month */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-2">
                    <span>Working days / month</span>
                    <span className="text-[#60A5FA] font-extrabold">{workingDays} days</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="31"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#60A5FA]"
                  />
                </div>

              </div>

              {/* Math Output Panel */}
              <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Estimated Time Saved</span>
                  <span className="text-3xl sm:text-4xl font-black text-[#60A5FA] block">
                    {employees * hoursSpent * workingDays} hrs/mo
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Potential Productivity Gain</span>
                  <span className="text-sm sm:text-lg font-bold text-white block leading-tight">
                    Significant (Equivalent to ~{Math.round((employees * hoursSpent * workingDays) / 160)} Full-time Staff!)
                  </span>
                </div>

                <a
                  href="#staffing-inquiry"
                  className="w-full py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-sm hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/20 text-center block"
                >
                  <span>Talk to an Automation Expert</span>
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE FAQ ACCORDION                                */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-white/10 bg-[#050508]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
                Frequently Answered Questions
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Staffing & Engagement FAQs
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-normal">
                Everything you need to know about our staffing models, trial terms, and intellectual property protection.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0D1222] border border-white/10 overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-zinc-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* DIRECT STAFFING INQUIRY FORM                              */}
        {/* ========================================================= */}
        <section id="staffing-inquiry" className="py-24 bg-[#050508] relative">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            
            <div className="bg-[#0D1222] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-[#DB2777]/10 text-[#DB2777] border border-[#DB2777]/25 text-xs font-mono font-bold uppercase tracking-wider inline-block">
                  Fast 48-Hour Matching
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Request Your Dedicated Squad
                </h2>
                <p className="text-zinc-300 text-xs sm:text-sm font-normal">
                  Fill in your technical requirements below. Our engineering leads will assemble your candidate profiles within 24 hours.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <CheckCircle size={48} className="text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto">
                    Thank you. Our technical staffing directors are reviewing your requirements and will reach out with pre-vetted developer profiles within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-2.5 rounded-full bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#DB2777]/90 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                  
                  {/* Anti-Bot Honeypot */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="hp_staffing_field">Leave this empty</label>
                    <input
                      type="text"
                      id="hp_staffing_field"
                      name="hp_staffing_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Validation Error Alert */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <XCircle size={18} className="flex-shrink-0 text-amber-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Role Needed Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                      Primary Role Needed *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {['Full-Stack Engineer', 'Frontend (React/Next)', 'Backend & Cloud', 'AI / ML Engineer', 'Mobile Developer', 'DevOps / Platform', 'QA Automation', 'Complete Squad'].map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setRoleNeeded(r)}
                          className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                            roleNeeded === r
                              ? 'bg-[#DB2777]/20 border-[#DB2777] text-white shadow-md'
                              : 'bg-[#05070E] border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Size & Timeline Grids */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                        Team Size
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none"
                      >
                        <option value="1 - 2 Engineers">1 - 2 Engineers</option>
                        <option value="3 - 5 Engineers (Pod)">3 - 5 Engineers (Pod)</option>
                        <option value="6 - 10 Engineers (Squad)">6 - 10 Engineers (Squad)</option>
                        <option value="10+ Engineers">10+ Engineers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                        Desired Start Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none"
                      >
                        <option value="Immediately (< 1 week)">Immediately (&lt; 1 week)</option>
                        <option value="Within 2 to 4 weeks">Within 2 to 4 weeks</option>
                        <option value="Planning / Exploring budget">Planning / Exploring budget</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal / Company Details */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none placeholder-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                        Business Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none placeholder-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                      Phone Number / WhatsApp (With Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 95289-91434"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none placeholder-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                      Project Overview or Specific Tech Stack Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Briefly describe your product goals, tech stack preferences, or any specific architectural challenges..."
                      className="w-full p-4 rounded-xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-[#60A5FA] focus:outline-none placeholder-zinc-500 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-pink-600/25 flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Matching Developers...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Request Candidate Profiles (48h Turnaround)</span>
                      </>
                    )}
                  </button>

                  {/* Privacy & Legal Assurance */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <ShieldCheck size={16} />
                      <span>100% Strict NDA & Data Confidentiality</span>
                    </span>
                    <p className="text-center sm:text-right">
                      By submitting, you agree to our{' '}
                      <Link to="/terms" className="text-[#60A5FA] underline hover:text-white transition-colors">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-[#60A5FA] underline hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>

                </form>
              )}

            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default ITStaffingPage;
