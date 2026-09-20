// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Rocket, 
  Check, 
  MessageSquare,
  Cpu,
  Layers,
  Database,
  Building,
  Utensils,
  BookOpen,
  DollarSign,
  CheckCircle,
  UserCheck,
  Zap,
  Mail,
  X,
  Cloud,
  Lock,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import TestimonialsNew from '../components/TestimonialsNew';
import StatsSection from '../components/StatsSection';
import LookingShowcaseHero from '../components/LookingShowcaseHero';
import TeamSynergySection from '../components/TeamSynergySection';
import EnterprisePartnershipSection from '../components/EnterprisePartnershipSection';
import ArchitectureComparisonTable from '../components/ArchitectureComparisonTable';
import AEOFAQSection from '../components/AEOFAQSection';

// Product showroom category data for overlay
const showroomCategories = {
  'CRM': {
    title: 'CRM & Sales Management Solutions',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Kanban Deals & Lead tracking pipeline grids',
      'Automated Multi-Channel Email campaigns triggers',
      'Lead Intent Scoring algorithms (predict high value deals)',
      'Telemetry Charts detailing monthly revenue goals'
    ],
    techStack: ['React / Vite', 'Tailwind CSS', 'Node.js Express', 'PostgreSQL', 'Resend API']
  },
  'ERP': {
    title: 'ERP & Corporate Resource Planning',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Centralized asset tracking & inventory logistics',
      'Multi-branch real-time stock levels synchronization',
      'Automated purchase invoices & ledger logs matching',
      'Granular department access privileges control panels'
    ],
    techStack: ['Next.js 15', 'Prisma ORM', 'PostgreSQL DB', 'Docker', 'Amazon S3']
  },
  'AI Automation': {
    title: 'AI Workflows & LLM Automation',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Autonomous GPT-4o / Claude AI Chat assistants',
      'Document Intelligence: Invoice & Form PDF scanning',
      'Smart customer query ticket auto-response routing',
      'Data-driven business forecasting and anomaly audits'
    ],
    techStack: ['Langchain Python', 'FastAPI', 'OpenAI API', 'Vector Databases', 'Convex']
  },
  'Hotel Management': {
    title: 'Hotel Booking & Lodging Suite',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Visual Room Status & occupancy matrix grid',
      'Automated guest check-in & verification codes mailing',
      'Stripe Payment Gateway checkout integrations',
      'Housekeeping staff schedule board & logs manager'
    ],
    techStack: ['React Framework', 'Vite', 'Express', 'Tailwind CSS', 'Stripe checkout']
  },
  'Restaurant Management': {
    title: 'Restaurant POS & Kitchen Systems',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Touch-friendly billing counter POS window',
      'Kitchen Order Ticket (KOT) real-time display sync',
      'Ingredient count tracking & automatic low-stock warnings',
      'Menu item list customizer & QR-code dynamic menus'
    ],
    techStack: ['Vite TS', 'WebSocket Server', 'SQLite DB', 'Tailwind CSS']
  },
  'School Management': {
    title: 'School Portals & Admin Panels',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Pupils & Teachers attendance logging portal',
      'Termly fees payment schedule trackers & warnings',
      'Exam sheet scoring & mark card PDF output generators',
      'Library directory book borrow logs tracking'
    ],
    techStack: ['React TS', 'Node.js Express', 'MongoDB', 'PDFKit']
  },
  'Accounting': {
    title: 'Accounting & Cashflow Ledgers',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Double-entry ledgers detailing cash inflow/outflow',
      'Automatic bank statement import and reconciliation',
      'Salary payslip generators & tax VAT audit tools',
      'Interactive balance sheet progress visualizations'
    ],
    techStack: ['Next.js', 'Chart.js', 'PostgreSQL', 'Tailwind CSS']
  },
  'Audit Software': {
    title: 'Audit & Compliance Dashboard',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Enterprise asset auditing trackers and checklist logs',
      'Compliance timeline calendars (SOC2, ISO 27001)',
      'System vulnerability status charts integration',
      'Automated compliance report PDF creation tools'
    ],
    techStack: ['TypeScript', 'FastAPI', 'Convex DB', 'Tailwind CSS']
  },
  'Dedicated Engineers': {
    title: 'Dedicated Engineering Squads',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Flexible squads: Frontend, Backend, AI & DevOps engineers',
      'Assigned within 48 hours to accelerate target repository',
      'Agile reporting: Daily sprint trackers & weekly reviews',
      'Pre-vetted developers with strong technical communication'
    ],
    techStack: ['TypeScript', 'Python', 'AWS Cloud', 'Kubernetes', 'CI/CD']
  },
  'Website': {
    title: 'Websites & Scalable Web Apps',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Next.js 15 apps fully optimized for maximum SEO ranking',
      'Fluid micro-interactions & responsive layout structure',
      'Sub-second Largest Contentful Paint (LCP) performance',
      'Frictionless user conversion funnel dashboards'
    ],
    techStack: ['Next.js 15', 'Framer Motion', 'Tailwind CSS', 'Vercel Edge']
  },
  'Mobile App': {
    title: 'Native Mobile Applications',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Cross-platform React Native iOS & Android applications',
      'Smooth offline-first local database caching setup',
      'Real-time push notifications & geolocation syncs',
      'App Store & Play Store publishing prep checklist'
    ],
    techStack: ['React Native', 'Expo', 'SQLite Caching', 'FCM API']
  },
  'Custom Software': {
    title: 'Custom Enterprise Software Solutions',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'Tailored business automation built for custom datasets',
      'REST & GraphQL third-party API syncing layers',
      'Batch tasks scheduling triggers and logging tools',
      'Comprehensive code reviews and 100% intellectual handover'
    ],
    techStack: ['Node.js Express', 'Python script engines', 'PostgreSQL', 'Docker']
  },
  'Digital Marketing': {
    title: 'Digital Marketing & Growth Engine',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      'High-intent SEO keyword ranking & organic Google search visibility',
      'High-ROI Google Ads, Meta & LinkedIn paid performance marketing',
      'Targeted landing page CRO (Conversion Rate Optimization) funnels',
      'Multi-channel social media growth & brand authority campaigns'
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'GA4 Analytics', 'SEMrush', 'HubSpot']
  }
};

const HomePage = () => {
  // Modal Popup states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('showroom');
  const [selectedProjectType, setSelectedProjectType] = useState('CRM');
  const [formData, setFormData] = useState({
    projectType: 'CRM',
    name: '',
    email: '',
    phone: '',
    companyName: '',
    extraDetails: '',
    budget: 'Under $1K'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Describe problem section states
  const [businessProblem, setBusinessProblem] = useState('');
  const [problemSolution, setProblemSolution] = useState(null);

  // Automation Calculator states
  const [employees, setEmployees] = useState(5);
  const [hoursSpent, setHoursSpent] = useState(4);
  const [workingDays, setWorkingDays] = useState(26);

  // Dedicated Engineers States
  const [selectedTeamSize, setSelectedTeamSize] = useState('1 Engineer');

  // Industry Solutions Tabs
  const [activeIndustry, setActiveIndustry] = useState('Enterprises');

  // Trigger modal with prefilled project type
  const openEnquiryModal = (type) => {
    setSelectedProjectType(type);
    setFormData(prev => ({ ...prev, projectType: type }));
    setSubmitSuccess(false);
    
    // Check if category has a detailed showroom list
    const hasShowroom = Object.keys(showroomCategories).includes(type);
    setModalStep(hasShowroom ? 'showroom' : 'form');
    setIsModalOpen(true);
  };

  // Submit enquiry
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/Contact@paviontechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Enquiry_Type: formData.projectType,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Company: formData.companyName,
          Budget: formData.budget || 'Not Selected',
          Project_Requirement: formData.extraDetails || 'Prefilled Lead Request',
          _subject: `🚀 New Lead: ${formData.projectType} Inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();
      if (response.ok && data.success !== 'false') {
        setSubmitSuccess(true);
      } else {
        throw new Error('Fallback to static submit');
      }
    } catch (err) {
      console.warn('FormSubmit redirecting fallback:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Problem solver matcher
  const solveProblem = () => {
    if (!businessProblem.trim()) return;
    
    const problemLower = businessProblem.toLowerCase();
    let solution = '';

    if (problemLower.includes('excel') || problemLower.includes('inventory') || problemLower.includes('manual')) {
      solution = "We'll build a custom Cloud ERP & Inventory automation system tailored for your specific warehouse/retail flow, syncing sales directly with your ledger.";
    } else if (problemLower.includes('developer') || problemLower.includes('engineer') || problemLower.includes('team')) {
      solution = "We'll allocate dedicated, pre-vetted engineers (Full Stack, AI, or DevOps) within 48 hours to extend your team with zero hiring overhead.";
    } else if (problemLower.includes('lead') || problemLower.includes('sales') || problemLower.includes('client')) {
      solution = "We'll engineer an automated CRM with lead scoring, predictive sales analytics, and multi-channel drip pipelines to skyrocket conversions.";
    } else {
      solution = "We'll map out a custom software architecture + AI workflow automation pipeline to convert your manual roadblocks into a 60fps automated system.";
    }

    setProblemSolution(solution);
  };

  return (
    <>
      <SEO 
        title="Pavion Technologies - Your Technology & Automation Partner"
        description="We build the software, AI automation, custom CRM/ERP systems, and dedicated engineering teams businesses need to operate and scale."
        canonical="https://paviontechnologies.com/"
        ogUrl="https://paviontechnologies.com/"
      />

      {/* ================================================================= */}
      {/* 1. HERO SECTION: "ARE YOU LOOKING" 3D SHOWCASE HERO               */}
      {/* ================================================================= */}
      <LookingShowcaseHero onOpenModal={openEnquiryModal} />

      {/* ================================================================= */}
      {/* 2. "WHAT CAN WE BUILD FOR YOU?" - 12 BUSINESS SYSTEM CARDS        */}
      {/* ================================================================= */}
      {/* ================================================================= */}
      {/* 2. "WHAT CAN WE BUILD FOR YOU?" - 12 BUSINESS SYSTEM CARDS        */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 md:mb-20 space-y-3 sm:space-y-5">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              Core digital capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              One Technology Partner. <br />
              <span className="text-[#60A5FA]">
                Every Business Need.
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            
            {/* Card Items */}
            {[
              { 
                title: 'Cloud Infrastructure & DevOps', 
                icon: Cloud, 
                desc: 'Zero-downtime AWS and GCP cloud architectures, containerized Docker deployments, and cost-optimized Kubernetes clusters built for high-scale enterprise workloads.', 
                tag: 'Cloud Solutions' 
              },
              { 
                title: 'Zero-Trust Data Security', 
                icon: Lock, 
                desc: 'SOC-2 and HIPAA audit-ready access controls, AES-256 encrypted database pipelines, and role-based permissions that safeguard your proprietary customer data.', 
                tag: 'Security Audit' 
              },
              { 
                title: 'Custom ERP & CRM Platforms', 
                icon: Server, 
                desc: 'Bespoke multi-branch inventory management, automated payment reconciliation, and custom business pipelines engineered around your exact operational workflows.', 
                tag: 'Custom Systems' 
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform duration-300 mb-4 sm:mb-6">
                    <card.icon size={26} />
                  </div>
                  <h3 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-[#DB2777] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-400 font-normal leading-relaxed mb-4 sm:mb-6">
                    {card.desc}
                  </p>
                </div>

                <button
                  onClick={() => openEnquiryModal(card.tag)}
                  className="text-xs sm:text-sm font-bold text-zinc-300 flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/10 w-full text-left group-hover:text-[#DB2777] transition-colors"
                >
                  <span>Explore Solution Architecture</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 2.5 AGILE SQUAD & TEAM COLLABORATION SECTION                      */}
      {/* ================================================================= */}
      <TeamSynergySection onOpenModal={openEnquiryModal} />

      {/* ================================================================= */}
      {/* 3. DESCRIBE YOUR PROBLEM SECTION                                 */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="text-center mb-8 sm:mb-16 space-y-2 sm:space-y-4">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              Architectural Scoping
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Have a Workflow Challenge to Solve?
            </h2>
            <p className="text-zinc-300 text-xs sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Tell us the operational bottleneck, spreadsheet dependency, or integration hurdle your business faces. Our senior architects will outline the recommended tech stack and solution architecture.
            </p>
          </div>

          {/* Interactive problem box */}
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl">
            <label className="block text-[11px] sm:text-sm font-mono uppercase text-zinc-400 tracking-wider mb-2 sm:mb-3">
              💡 Outline Your Requirement (e.g. "We need real-time multi-branch stock sync with zero manual entry")
            </label>
            <textarea
              value={businessProblem}
              onChange={(e) => setBusinessProblem(e.target.value)}
              placeholder="Describe what your team spends manual hours on, your current database/ERP bottlenecks, or developer resource shortages..."
              className="w-full h-28 sm:h-40 rounded-xl sm:rounded-2xl bg-[#05070E] border border-white/10 p-3.5 sm:p-5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA] text-xs sm:text-base font-mono leading-relaxed"
            />

            <div className="flex justify-end mt-3 sm:mt-4">
              <button
                onClick={solveProblem}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-base shadow-lg shadow-pink-600/20 transition-all"
              >
                Map My Solution →
              </button>
            </div>

            {/* Simulated AI mapping output */}
            <AnimatePresence>
              {problemSolution && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mt-6 p-6 rounded-2xl bg-blue-500/10 border border-[#60A5FA]/30 text-sm sm:text-base text-zinc-200 leading-relaxed font-normal flex items-start gap-4"
                >
                  <Sparkles size={24} className="text-[#60A5FA] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-black block mb-1">Recommended Solution:</strong>
                    {problemSolution}
                    <button
                      onClick={() => openEnquiryModal('Custom Solution')}
                      className="mt-3 block text-xs sm:text-sm font-bold text-[#60A5FA] underline hover:text-[#DB2777]"
                    >
                      🚀 Connect Me With an Expert to build this
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. BUSINESS AUTOMATION BEFORE vs AFTER GRID                       */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 md:mb-20 space-y-2 sm:space-y-4">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              Before vs After
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Stop Doing Manually. <br />
              <span className="text-[#60A5FA]">
                Start Automating.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-10 items-stretch">
            
            {/* Before Card */}
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-red-500/10 border border-red-500/20 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-red-400 mb-4 sm:mb-6 flex items-center gap-2">
                  <span>Before Pavion</span>
                </h3>
                <ul className="space-y-2.5 sm:space-y-4 text-zinc-300 font-normal text-xs sm:text-base">
                  {['Excel spreadsheets and sync mismatch', 'Manual reports compile taking hours', 'Chaotic WhatsApp coordination gaps', 'Repetitive keyboard copy-paste work', 'Manual client follow-up leaks', 'Disconnected legacy databases'].map((txt, i) => (
                    <li key={i} className={`items-start gap-2.5 sm:gap-3.5 ${i >= 3 ? 'hidden sm:flex' : 'flex'}`}>
                      <span className="text-red-400 text-sm sm:text-lg flex-shrink-0 mt-0.5">❌</span>
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-red-500/20 rounded-full mt-6 sm:mt-8 overflow-hidden">
                <div className="w-[15%] h-full bg-red-500 rounded-full" />
              </div>
            </div>

            {/* After Card */}
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-blue-500/10 border border-[#60A5FA]/25 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-[#60A5FA] mb-4 sm:mb-6 flex items-center gap-2">
                  <span>After Pavion</span>
                </h3>
                <ul className="space-y-2.5 sm:space-y-4 text-zinc-300 font-normal text-xs sm:text-base">
                  {['100% automated workflows', 'Real-time telemetry dashboards', 'Context-aware custom AI agents', 'Centralized zero-trust databases', 'Automated email/SMS drip updates', 'Seamless CRM/ERP/POS connections'].map((txt, i) => (
                    <li key={i} className={`items-start gap-2.5 sm:gap-3.5 ${i >= 3 ? 'hidden sm:flex' : 'flex'}`}>
                      <span className="text-[#60A5FA] text-sm sm:text-lg flex-shrink-0 mt-0.5">✅</span>
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-1.5 sm:h-2.5 w-full bg-blue-500/20 rounded-full mt-6 sm:mt-8 overflow-hidden">
                <div className="w-full h-full bg-[#60A5FA] rounded-full" />
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-8 sm:mt-14">
            <button
              onClick={() => openEnquiryModal('Automation Audit')}
              className="px-6 sm:px-10 py-3 sm:py-4.5 rounded-full border border-white/20 hover:border-[#60A5FA] text-white hover:text-[#60A5FA] font-bold text-xs sm:text-base shadow-lg transition-all bg-white/5 hover:bg-white/10"
            >
              See What We Can Automate →
            </button>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. INTERACTIVE AUTOMATION SAVINGS CALCULATOR                      */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="text-center mb-8 sm:mb-16 space-y-2 sm:space-y-4">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              ROI Calculator
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              How Much Can You Save?
            </h2>
            <p className="text-zinc-300 text-xs sm:text-base font-normal">
              Recover precious hours wasted on repetitive manual business tasks.
            </p>
          </div>

          <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl grid md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Input Controls */}
            <div className="md:col-span-7 space-y-4 sm:space-y-8">
              
              {/* Employee Count */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-1.5 sm:mb-2.5">
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
                <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-1.5 sm:mb-2.5">
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
                <div className="flex justify-between text-xs sm:text-sm font-mono uppercase text-zinc-400 mb-1.5 sm:mb-2.5">
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
            <div className="md:col-span-5 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-center space-y-4 sm:space-y-6">
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

              <button
                onClick={() => openEnquiryModal('Automation Audit')}
                className="w-full py-3 sm:py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-sm hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/20"
              >
                <span>Talk to an Automation Expert</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. DEDICATED ENGINEERS ON-DEMAND SERVICE (DESKTOP ONLY)           */}
      {/* ================================================================= */}
      <section className="hidden md:block relative py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
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

          <div className="p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl grid md:grid-cols-12 gap-8 items-stretch">
            
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
                      onClick={() => setSelectedTeamSize(opt.size)}
                      className={`p-4 sm:p-5 rounded-2xl border text-center transition-all ${
                        selectedTeamSize === opt.size 
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
            <div className="md:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-950/20 to-transparent border border-white/10 flex flex-col justify-between text-center">
              <div>
                <span className="w-12 h-12 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA] mx-auto mb-4">
                  <UserCheck size={24} />
                </span>
                <h4 className="text-xl font-bold text-white mb-3">Dedicated Engineers On Demand</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Skip the recruitment hurdles. Extend your repository scope instantly with zero setup delays.
                </p>
              </div>

              <button
                onClick={() => openEnquiryModal(`Dedicated Engineers: ${selectedTeamSize}`)}
                className="w-full mt-8 py-4 rounded-xl bg-[#DB2777] text-white font-black text-sm hover:scale-105 transition-all shadow-lg shadow-pink-600/20"
              >
                ⚡ Get Engineers for My Project
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. "WE BUILD FOR YOUR INDUSTRY" SECTION                          */}
      {/* ================================================================= */}
      {/* ================================================================= */}
      {/* 7. "WE BUILD FOR YOUR INDUSTRY" SECTION                          */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
        {/* Background glow accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/10 via-pink-600/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-4">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              Industry Verticals
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Technology Built Around <br />
              <span className="text-[#60A5FA]">Your Business</span>
            </h2>
            <p className="text-zinc-300 text-xs sm:text-base font-normal max-w-2xl mx-auto">
              Custom-tailored software systems, enterprise ERPs, and AI automation architectures engineered specifically for your domain.
            </p>
          </div>

          {/* Top Horizontal Category Tabs / Switcher Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2.5 mb-6 sm:mb-8">
            {[
              { key: 'Enterprises', icon: '🏢', label: 'Enterprises' },
              { key: 'Restaurants', icon: '🍽️', label: 'Restaurants' },
              { key: 'Hotels', icon: '🏨', label: 'Hotels' },
              { key: 'Education', icon: '🎓', label: 'Education' },
              { key: 'Healthcare', icon: '🏥', label: 'Healthcare' },
              { key: 'Finance', icon: '💳', label: 'Finance' },
              { key: 'Retail', icon: '🛍️', label: 'Retail' },
              { key: 'Startups', icon: '🚀', label: 'Startups' }
            ].map((ind) => {
              const isSelected = activeIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  onClick={() => setActiveIndustry(ind.key)}
                  className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 border text-center ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#DB2777]/30 to-[#0D1222] border-[#DB2777] text-white font-black shadow-lg shadow-pink-600/20 scale-[1.02]'
                      : 'bg-[#0D1222]/80 hover:bg-[#0D1222] border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <span className="text-lg sm:text-2xl">{ind.icon}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-tight truncate w-full">{ind.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Symmetrical Showcase Dashboard */}
          {(() => {
            const industryMap = {
              Enterprises: {
                icon: '🏢',
                badge: 'Enterprise Architecture',
                title: 'Enterprise ERP & Multi-System Workflow Sync',
                desc: 'We engineer high-availability ERP and CRM ecosystems, centralized executive dashboards, and zero-trust microservice databases to replace clunky legacy workflows.',
                features: [
                  'Cross-Database Real-Time Synchronization',
                  'Role-Based Zero-Trust Security Access',
                  'Automated Multi-Branch Financial Audit Logs',
                  'High-Throughput Telemetry & Analytics'
                ],
                metricValue: '99.99%',
                metricLabel: 'System Availability & Uptime',
                highlight: 'Zero-Trust Encrypted Architecture',
                techStack: ['PostgreSQL', 'Next.js 15', 'FastAPI', 'Docker / K8s', 'Kafka']
              },
              Restaurants: {
                icon: '🍽️',
                badge: 'Hospitality & Food-Tech',
                title: 'Smart Cloud POS & Kitchen Order Routing',
                desc: 'Integrated checkout terminals, sub-second Kitchen Order Display (KOT) synchronization, dynamic table reservation matrices, and predictive low-stock vendor reorders.',
                features: [
                  'Live Kitchen Display (KOT) Instant Sync',
                  'Dynamic Table Booking & Floor Matrix',
                  'Multi-Payment Gateway & QR Billing Integration',
                  'Automated Low-Stock Supplier Alerts'
                ],
                metricValue: '0 Lag',
                metricLabel: 'Real-Time Kitchen Sync',
                highlight: 'Instant QR & Counter Checkout',
                techStack: ['React POS', 'Node.js WebSockets', 'PostgreSQL', 'Stripe / Razorpay']
              },
              Hotels: {
                icon: '🏨',
                badge: 'Hotel Management System',
                title: 'Automated Guest Experience & Booking Engines',
                desc: 'Automate guest check-in/out pipelines, staff assignment schedules, multi-channel OTA booking syncs, and centralized corporate invoice ledgers.',
                features: [
                  'Multi-Channel OTA & Third-Party API Sync',
                  'Automated Digital Check-In & Room Matrix',
                  'Housekeeping & Staff Shift Management',
                  'Corporate Ledger & Automated Invoice Runs'
                ],
                metricValue: '100%',
                metricLabel: 'OTA Channel Synchronization',
                highlight: 'Multi-Branch Reservation Engine',
                techStack: ['Next.js', 'GraphQL', 'AWS Serverless', 'PostgreSQL']
              },
              Education: {
                icon: '🎓',
                badge: 'EdTech & University Portals',
                title: 'Next-Gen Academic & Student Management',
                desc: 'Comprehensive management portals for student admissions, fee collection ledgers, automated GPA calculations, attendance biometrics, and secure examination engines.',
                features: [
                  'Automated GPA & Dynamic Marksheet Engine',
                  'Biometric & RFID Attendance Tracking',
                  'Automated Fee Reminder SMS & Drip Alerts',
                  'Secure Online Examination & Proctoring'
                ],
                metricValue: '95%+',
                metricLabel: 'On-Time Fee Collections',
                highlight: 'Automated Ledger & Grade Engine',
                techStack: ['Django / Python', 'React', 'PostgreSQL', 'Redis']
              },
              Healthcare: {
                icon: '🏥',
                badge: 'HealthTech & Clinical Systems',
                title: 'HIPAA-Aligned Clinical & Patient Portals',
                desc: 'Secure patient electronic health records (EHR), automated appointment reservation calendars, doctor shift scheduling, and integrated clinical billing.',
                features: [
                  'HIPAA-Aligned Encrypted Patient Records (EHR)',
                  'Smart Doctor Duty & Appointment Scheduling',
                  'Automated Patient SMS Appointment Alerts',
                  'Integrated Pharmacy & Diagnostic Lab Billing'
                ],
                metricValue: '100%',
                metricLabel: 'End-to-End HIPAA Encryption',
                highlight: 'Zero-Leak Patient Telemetry',
                techStack: ['FastAPI', 'PostgreSQL', 'AWS HealthLake', 'React Native']
              },
              Finance: {
                icon: '💳',
                badge: 'FinTech & Wealth Management',
                title: 'Automated Ledgers & Regulatory Compliance',
                desc: 'Custom financial engines, double-entry automated ledger matching, GST/tax calculation modules, real-time audit outputs, and cashflow predictive models.',
                features: [
                  'Automated Double-Entry Ledger Matching',
                  'Real-Time Cashflow & Runway Predictions',
                  'Automated Tax, GST & Multi-Currency Billing',
                  'Audit-Ready Regulatory Compliance Export'
                ],
                metricValue: '100%',
                metricLabel: 'Audit Ledger Precision',
                highlight: 'Bank-Grade 256-bit Security',
                techStack: ['Python', 'PostgreSQL', 'Kafka', 'Apache Airflow']
              },
              Retail: {
                icon: '🛍️',
                badge: 'Retail & Omnichannel E-Commerce',
                title: 'Multi-Store Inventory & Omnichannel POS',
                desc: 'Synchronize warehouse inventory across multiple physical outlets and online e-commerce storefronts with automated supplier replenishment triggers.',
                features: [
                  'Real-Time Multi-Warehouse Inventory Sync',
                  'Barcode & Instant POS Checkout Engine',
                  'Customer Loyalty Points & Promotion Rules',
                  'Automated Supplier Low-Stock Alerts'
                ],
                metricValue: '3.2x',
                metricLabel: 'Faster Inventory Turnover',
                highlight: 'Omnichannel Catalog Sync',
                techStack: ['Next.js 15', 'Supabase', 'Stripe', 'Redis']
              },
              Startups: {
                icon: '🚀',
                badge: 'SaaS & Venture MVPs',
                title: 'Rapid MVP Architecture & Scalable AI Platforms',
                desc: 'Production-ready SaaS products built for hyper-growth with pre-integrated authentication, Stripe recurring subscriptions, sub-second edge rendering, and GPT-4o pipelines.',
                features: [
                  'Sub-Second Edge Next.js Architecture',
                  'Stripe Recurring Subscriptions & Invoicing',
                  'Custom LLM & Autonomous Agent Integrations',
                  'Serverless Scalability for 100K+ Users'
                ],
                metricValue: '3-4 Wks',
                metricLabel: 'Rapid Concept-to-Launch MVP',
                highlight: 'Venture-Ready Scalable Code',
                techStack: ['Next.js', 'LangChain', 'OpenAI / Claude', 'Tailwind']
              }
            };

            const data = industryMap[activeIndustry] || industryMap['Enterprises'];

            return (
              <div className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/15 shadow-2xl relative overflow-hidden">
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA]" />

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  
                  {/* Left Details Column */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#DB2777]/15 border border-[#DB2777]/30 text-[10px] sm:text-xs font-mono font-bold text-[#DB2777] uppercase tracking-wider">
                        {data.badge}
                      </span>
                      <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300">
                        {data.highlight}
                      </span>
                      {/* Mobile inline metric callout */}
                      <span className="sm:hidden px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-[#60A5FA]/30 text-[10px] font-mono font-bold text-[#60A5FA]">
                        ⚡ {data.metricValue} {data.metricLabel}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                      {data.title}
                    </h3>

                    <p className="text-zinc-300 text-xs sm:text-base font-normal leading-relaxed">
                      {data.desc}
                    </p>

                    {/* Features Checklist (Top 2 on mobile, all 4 on desktop) */}
                    <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                      {data.features.map((feat, fIdx) => (
                        <div key={fIdx} className={`items-start gap-2 text-xs sm:text-sm text-zinc-300 font-medium ${fIdx >= 2 ? 'hidden sm:flex' : 'flex'}`}>
                          <CheckCircle size={15} className="text-[#60A5FA] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                      <button
                        onClick={() => openEnquiryModal(`${activeIndustry} Solution Blueprint`)}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-pink-600/20 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>⚡ Get {activeIndustry} Blueprint</span>
                        <ArrowRight size={15} />
                      </button>

                      <Link
                        to="/contact"
                        className="text-xs sm:text-sm font-bold text-[#60A5FA] hover:text-[#DB2777] transition-colors flex items-center gap-1.5 mx-auto sm:mx-0"
                      >
                        <span>Talk to an Architect</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Telemetry & Architecture Spec Card (Desktop & Tablet only) */}
                  <div className="hidden sm:flex lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#05070E] border border-white/10 shadow-xl space-y-6 flex-col justify-between">
                    
                    {/* Live System Spec Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase text-zinc-300 font-bold">Architecture Pipeline</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#60A5FA] bg-blue-500/10 px-2 py-0.5 rounded border border-[#60A5FA]/20 font-bold">
                        Production Ready
                      </span>
                    </div>

                    {/* Big Key Metric Callout */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/30 to-purple-950/20 border border-white/10 text-center space-y-1">
                      <span className="text-4xl sm:text-5xl font-black text-[#60A5FA] block tracking-tight">
                        {data.metricValue}
                      </span>
                      <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
                        {data.metricLabel}
                      </span>
                    </div>

                    {/* Integrated Tech Stacks */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold block">
                        Deployed Tech Stacks:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Security Guarantee Note */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400 flex items-center gap-2.5">
                      <Lock size={16} className="text-[#60A5FA] flex-shrink-0" />
                      <span>100% IP Ownership & Enterprise Zero-Trust Database SLAs.</span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. AI AUTOMATION: "WHAT CAN AI AUTOMATE IN YOUR BUSINESS?"       */}
      {/* ================================================================= */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-[#050508] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 md:mb-20 space-y-2 sm:space-y-4">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              AI Automations
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              What Can AI Automate <br />
              <span className="text-[#60A5FA]">
                In Your Business?
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            
            {[
              { title: '📄 Documents', desc: 'Read invoices, tax receipts, forms & pdf reports automatically, extracting parameters into structured JSON databases.' },
              { title: '🤝 Customer Support', desc: 'Deploy custom context-aware AI assistants that answer repetitive customer queries 24/7 with zero human delays.' },
              { title: '💰 Finance', desc: 'Automate accounting entries, verify invoices against bank statements, and trigger vendor payouts.' },
              { title: '📊 Reporting', desc: 'Automatically generate daily, weekly, or audit reports pulling metrics from various legacy endpoints.' },
              { title: '👨‍💼 Sales', desc: 'Qualify sales leads, write automated follow-up emails, and map out potential client pipelines.' },
              { title: '⚙️ Operations', desc: 'Connect all your disparate web tools (APIs, sheets, emails) and automate repeating manual processes.' }
            ].map((ai, idx) => (
              <div 
                key={idx}
                className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/50 hover:bg-[#12182c] transition-all duration-300 flex-col justify-between group shadow-lg ${
                  idx >= 3 ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div>
                  <h3 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-[#60A5FA] transition-colors">
                    {ai.title}
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-400 font-normal leading-relaxed">
                    {ai.desc}
                  </p>
                </div>

                <button
                  onClick={() => openEnquiryModal('AI Automation')}
                  className="mt-4 sm:mt-6 text-xs sm:text-sm font-bold text-[#60A5FA] flex items-center gap-2 hover:text-[#DB2777]"
                >
                  <span>Show Me What AI Can Automate</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}

          </div>

          {/* Lead Magnet: AI Business Audit */}
          <div className="mt-8 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0D1222] border border-white/15 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-2xl text-center md:text-left">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-1.5">Find Out What Your Business Can Automate</h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                Get a Free 15-Minute Automation Audit to identify bottlenecks and ROI gains.
              </p>
            </div>
            
            <button
              onClick={() => openEnquiryModal('Automation Audit')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs sm:text-base shadow-lg shadow-pink-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>🔍 Get My Free Automation Audit</span>
            </button>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. METRIC CASE STUDY: TRUST BY NUMBERS (DESKTOP ONLY)             */}
      {/* ================================================================= */}
      <section className="hidden md:block relative py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm tracking-[0.25em] uppercase text-[#DB2777] font-extrabold block">
              Case Study Summary
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Real-World Impact & Results
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-[#60A5FA] tracking-wider block mb-1 font-bold">Impact Study</span>
                <h4 className="text-xl sm:text-2xl font-black text-white">How We Helped a Business Save 400+ Hours/Month</h4>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 text-xs sm:text-sm font-black">
                Saved 400+ Hours
              </div>
            </div>

            {/* Case Study Progress Map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                <span className="text-xs font-mono text-red-400 font-bold block mb-1.5">1. Problem</span>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                  Manual CRM data updates, Excel inventory mismatches, and delayed vendor invoices.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1.5">2. Solution</span>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                  Engineered custom integrated ERP & sales dashboard with automated invoice triggers.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1.5">3. Automation</span>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                  AI document parser automatically reads client PDFs and logs entries directly.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-[#60A5FA]/30 shadow-md">
                <span className="text-xs font-mono text-[#60A5FA] font-bold block mb-1.5">4. Result</span>
                <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
                  Wasted labor hours reduced by 85%, cashflows balances updated in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9.5 STRATEGIC ENTERPRISE PARTNERSHIP SECTION                      */}
      {/* ================================================================= */}
      <EnterprisePartnershipSection onOpenModal={openEnquiryModal} />

      {/* Stats and Testimonials */}
      <StatsSection />
      <TestimonialsNew />

      {/* ================================================================= */}
      {/* 10. AEO & GEO OBJECTIVE COMPARISON DATA TABLE                     */}
      {/* ================================================================= */}
      <ArchitectureComparisonTable />

      {/* ================================================================= */}
      {/* 10.5 AEO & GEO DIRECT Q&A KNOWLEDGE BASE (FAQPAGEMARKUP)          */}
      {/* ================================================================= */}
      <AEOFAQSection onOpenModal={openEnquiryModal} />

      {/* ================================================================= */}
      {/* 11. DYNAMIC ENQUIRY POPUP MODAL (ONE-CLICK CONVERSION SYSTEM)     */}
      {/* ================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0D1222] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-white"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>

              {!submitSuccess ? (
                modalStep === 'showroom' && showroomCategories[selectedProjectType] ? (
                  /* Step 1: Detailed Product Showroom / Project Notification */
                  <div className="space-y-5">
                    
                    {/* Header */}
                    <div className="text-center">
                      <span className="text-xs font-mono uppercase text-[#60A5FA] tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-[#60A5FA]/20 font-bold">
                        ⚡ Product Blueprint
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-3 leading-tight uppercase">
                        {showroomCategories[selectedProjectType].title}
                      </h3>
                    </div>

                    {/* Screenshot Mockup */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-md bg-black/40">
                      <img 
                        src={showroomCategories[selectedProjectType].image} 
                        alt={selectedProjectType} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs text-white font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping" />
                        <span>Interactive Prototype Ready</span>
                      </div>
                    </div>

                    {/* Key Specifications Checklist */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-bold">What's Included:</span>
                      <div className="space-y-2">
                        {showroomCategories[selectedProjectType].specs.map((spec, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-300 font-medium">
                            <span className="text-[#60A5FA] font-bold mt-0.5">✓</span>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block font-bold">Technologies:</span>
                      <div className="flex flex-wrap gap-2">
                        {showroomCategories[selectedProjectType].techStack.map((tech) => (
                          <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                      <button
                        onClick={() => setModalStep('form')}
                        className="flex-1 py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/20"
                      >
                        <span>🚀 Get My Custom Blueprint</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  /* Step 2: Simplified Contact Details lead capture */
                  <form onSubmit={handleEnquirySubmit} className="space-y-5">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">Request Details</h3>
                      <p className="text-sm text-zinc-400 mt-1">Enter your details to configure your customized {selectedProjectType} stack.</p>
                    </div>

                    {/* Core contact details */}
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA] text-sm font-mono"
                      />

                      <input 
                        type="email" 
                        placeholder="Business Email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA] text-sm font-mono"
                      />

                      <input 
                        type="text" 
                        placeholder="WhatsApp / Phone Number" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA] text-sm font-mono"
                      />

                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA] text-sm font-mono"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      {Object.keys(showroomCategories).includes(selectedProjectType) && (
                        <button
                          type="button"
                          onClick={() => setModalStep('showroom')}
                          className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10"
                        >
                          ← Back
                        </button>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/20"
                      >
                        {isSubmitting ? 'Sending Request...' : '🚀 Connect Me With an Expert'}
                      </button>
                    </div>

                  </form>
                )
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto text-2xl animate-bounce">
                    ✓
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Enquiry Received!</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    We have dispatched your requirements to our engineering team. An expert will reach out to you via your business email or WhatsApp within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-all"
                  >
                    Dismiss
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================= */}
      {/* 12. INSTANT FLOATING ACTION DOCK (FACEBOOK, TWITTER, LINKEDIN, INSTAGRAM) */}
      {/* ================================================================= */}
      <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-5 z-50 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none">
        
        {/* Facebook Link */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] shadow-[0_3px_12px_rgba(24,119,242,0.35)] flex items-center justify-center text-white hover:scale-115 active:scale-95 transition-all duration-300 group relative"
          title="Facebook"
          aria-label="Facebook"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="hidden sm:group-hover:block absolute right-full mr-2 px-2 py-0.5 rounded-md bg-[#070A14] border border-white/15 text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            Facebook
          </span>
        </a>

        {/* Twitter / X Link */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#000000] border border-white/20 shadow-[0_3px_12px_rgba(0,0,0,0.5)] flex items-center justify-center text-white hover:scale-115 active:scale-95 transition-all duration-300 group relative"
          title="Twitter / X"
          aria-label="Twitter / X"
        >
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:group-hover:block absolute right-full mr-2 px-2 py-0.5 rounded-md bg-[#070A14] border border-white/15 text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            Twitter / X
          </span>
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/company/pavion-technologies/"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0A66C2] shadow-[0_3px_12px_rgba(10,102,194,0.35)] flex items-center justify-center text-white hover:scale-115 active:scale-95 transition-all duration-300 group relative"
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="hidden sm:group-hover:block absolute right-full mr-2 px-2 py-0.5 rounded-md bg-[#070A14] border border-white/15 text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            LinkedIn
          </span>
        </a>

        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_3px_12px_rgba(225,48,108,0.35)] flex items-center justify-center text-white hover:scale-115 active:scale-95 transition-all duration-300 group relative"
          title="Instagram"
          aria-label="Instagram"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="hidden sm:group-hover:block absolute right-full mr-2 px-2 py-0.5 rounded-md bg-[#070A14] border border-white/15 text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            Instagram
          </span>
        </a>

      </div>
    </>
  );
};

export default HomePage;
