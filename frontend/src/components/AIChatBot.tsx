// src/components/AIChatBot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Layers,
  Minimize2,
  ExternalLink,
  Check,
  CalendarCheck,
  Building,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Globe,
  Github,
  ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { projectsData, ProjectDetail } from '../data/projectData';

interface MeetingDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  topic: string;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  type?: 'text' | 'meeting_form' | 'meeting_confirmation' | 'portfolio_list' | 'project_detail';
  meetingData?: MeetingDetails;
  projectData?: ProjectDetail;
  options?: string[];
  link?: {
    text: string;
    url: string;
    isExternal?: boolean;
  };
}

const initialSuggestedPrompts = [
  '🏢 Office Address & Map',
  '💼 Explore Services',
  '🚀 View Portfolio & Demos',
  '📅 Book a Meeting',
];

const formatChatText = (text: string) => {
  return text.split('\n').map((line, lIdx) => {
    if (!line.trim()) {
      return <div key={lIdx} className="h-1.5" />;
    }

    const parts: React.ReactNode[] = [];
    const regex = /(\*\*(.*?)\*\*|`([^`]+)`|\[(.*?)\]\((.*?)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index).replace(/\*/g, ''));
      }

      if (match[1].startsWith('**')) {
        parts.push(
          <strong key={`${lIdx}-${match.index}`} className="font-semibold text-white">
            {match[2]}
          </strong>
        );
      } else if (match[1].startsWith('`')) {
        parts.push(
          <span key={`${lIdx}-${match.index}`} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-[#60A5FA]">
            {match[3]}
          </span>
        );
      } else if (match[1].startsWith('[')) {
        const linkText = match[4];
        const url = match[5];
        parts.push(
          <a
            key={`${lIdx}-${match.index}`}
            href={url}
            target={url.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-[#60A5FA] hover:text-[#DB2777] font-semibold underline underline-offset-2 transition-colors"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex).replace(/\*/g, ''));
    }

    const isBullet = line.trim().startsWith('•') || /^\d+\./.test(line.trim());

    return (
      <div key={lIdx} className={`leading-relaxed ${isBullet ? 'pl-2 py-0.5 text-zinc-200' : 'text-zinc-200'}`}>
        {parts}
      </div>
    );
  });
};

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

const RIVA_SYSTEM_PROMPT = `You are Riva, the friendly, sharp, and natural AI Assistant and Technical Guide at Pavion Technologies (https://paviontechnologies.com).
Your tone is natural, human-like, warm, and conversational — NEVER robotic, corporate-stiff, or overly promotional.

CRITICAL CONVERSATIONAL RULES (MUST FOLLOW):
1. Default Language: Always converse in natural, friendly, and polished English by default. (Only switch to Hinglish/Hindi if the user explicitly writes in Hindi or Hinglish).
2. User greetings (e.g. "Hi", "Hello", "Hii", "Hey"):
   - Reply warmly: "Hi! 👋 How are you doing today? How can I help you?"
3. User answers how they are (e.g. "I'm good", "Doing well", "Fine", "Good"):
   - Acknowledge their response warmly: "Glad to hear that! 😊 What can I help you with today?"
4. User mentions a project/task:
   - For website ("I want to build a website" / "Need a website"): "Absolutely! I can help you plan your website. What type of website are you looking to build—such as business/corporate, e-commerce, SaaS, or a custom idea?"
   - For app ("I want to build an app" / "Need an app"): "Sure! What type of app are you looking to build—business, e-commerce, booking, or a custom idea?"
   - Directly offer help first, then ask 1 simple clarifying question.
5. Message length & style:
   - Keep responses short and conversational (2-4 sentences max).
   - Never output walls of text or dump full marketing scripts unless specifically asked.
   - Do not ask multiple overwhelming questions; keep it one natural step at a time.
   - Be genuinely helpful like a knowledgeable senior tech partner.

About Pavion Technologies:
- Company: Pavion Technologies is a premier AI and Digital Systems Engineering Agency.
- Global HQ: 1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101, India.
- Founders: Rahul Bajediyal (CEO & System Architect) and Priyanshu Gupta (Co-Founder & Product Lead). Team of 20+ specialized engineers.
- Direct Contact: Phone & WhatsApp: +91 95289-91434 / +91 74559-75301. Email: Contact@paviontechnologies.com.
- Office Hours: Monday to Saturday, 9:30 AM to 7:00 PM IST.

Core Capabilities:
1. Custom Software & Enterprise ERP/CRM: Multi-branch inventory, zero recurring per-seat fees, 100% source code & IP ownership from day one.
2. AI & Autonomous Agents: Claude 3.5 Sonnet tool-use agents, OpenAI GPT-4o integrations, Enterprise RAG (pgvector, Pinecone, Milvus), document intelligence/PDF parsing.
3. Modern Web Platforms & SaaS: Sub-second Server-Side Rendered (SSR) Next.js 15 apps with 95+ Core Web Vitals scores.
4. Mobile App Engineering: Cross-platform React Native for iOS & Android with 60fps native performance.
5. Digital Marketing & SEO/AEO/GEO: Generative Engine Optimization for ChatGPT, Perplexity & Gemini.

Pricing & Timelines:
- Fixed-Scope MVP Sprints: $3,500 to $15,000 delivered in 4 to 6 weeks.
- Enterprise ERP & Custom AI Systems: $15,000 to $50,000+ (8 to 16 weeks in milestone sprints).
- Dedicated Engineering Squads: Ready to deploy in 48 to 72 hours.
- Fixed-price proposal within 24 hours of discovery call. Mutual NDA signed before kickoff.`;

const findMatchingProject = (cleanQ: string): ProjectDetail | undefined => {
  if (
    cleanQ === '🚀 view portfolio & demos' || 
    cleanQ === 'view portfolio & demos' || 
    cleanQ === 'portfolio' || 
    cleanQ === 'projects' ||
    cleanQ === 'demos'
  ) {
    return undefined;
  }

  return projectsData.find((p) => {
    const slug = p.slug.toLowerCase();
    const title = p.title.toLowerCase();
    
    if (cleanQ.includes(slug) || cleanQ.includes(title)) return true;

    if (slug === 'ai-seo-auditor' && (cleanQ.includes('seo') || cleanQ.includes('auditor'))) return true;
    if (slug === 'jewellery-shop' && (cleanQ.includes('jewel') || cleanQ.includes('jwellery'))) return true;
    if (slug === 'bookmytrip' && (cleanQ.includes('bookmytrip') || cleanQ.includes('travel booking'))) return true;
    if (slug === 'crm-ai' && (cleanQ.includes('crm-ai') || cleanQ.includes('sales crm') || cleanQ.includes('crm ai'))) return true;
    if (slug === 'pilot-ai' && (cleanQ.includes('pilot') || cleanQ.includes('aviation'))) return true;
    if (slug === 'restaurant-management' && (cleanQ.includes('restaurant') || cleanQ.includes('pos'))) return true;
    if (slug === 'cctv-care-hub' && (cleanQ.includes('cctv') || cleanQ.includes('surveillance'))) return true;
    if (slug === 'erp-task-management' && (cleanQ.includes('task management') || cleanQ.includes('erp task'))) return true;
    if (slug === 'ai-chatbot-platform' && (cleanQ.includes('telegram') || cleanQ.includes('bot platform'))) return true;

    return false;
  });
};

interface PortfolioListCardProps {
  onSelectProject: (project: ProjectDetail) => void;
  onViewAllProjects: () => void;
}

const PortfolioListCard: React.FC<PortfolioListCardProps> = ({ onSelectProject, onViewAllProjects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const categories = ['All', 'AI & ML', 'Web Dev', 'ERP & Software'];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'AI & ML') return p.category === 'AI & Machine Learning';
    if (selectedCategory === 'Web Dev') return p.category === 'Web Development';
    if (selectedCategory === 'ERP & Software') {
      return p.category === 'Enterprise ERP' || p.category === 'Software Development';
    }
    return true;
  });

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <div className="mt-3 space-y-2.5 w-full">
      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(cat);
            }}
            className={`px-2.5 py-1 rounded-full font-mono font-bold whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#60A5FA] text-[#070A14] border-[#60A5FA] shadow-sm'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat} {cat === 'All' ? `(${projectsData.length})` : ''}
          </button>
        ))}
      </div>

      {/* Projects List Container */}
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className={`space-y-2 overflow-y-auto pr-1 chat-scrollbar transition-all ${
          showAllProjects ? 'max-h-[460px]' : 'max-h-[300px]'
        }`}
      >
        {visibleProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject(p)}
            className="p-2.5 rounded-xl bg-[#0D1222] border border-white/10 hover:border-[#60A5FA]/60 hover:bg-[#12182c] transition-all cursor-pointer flex items-center gap-2.5 group shadow-sm active:scale-[0.99]"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#60A5FA] truncate">
                  {p.category}
                </span>
                <span className="text-[9px] text-zinc-400 font-mono flex-shrink-0">{p.year}</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#60A5FA] transition-colors">
                {p.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                {p.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#60A5FA] group-hover:text-[#DB2777] flex-shrink-0 pl-1">
              <span className="hidden sm:inline text-[10px]">Details</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}

        {filteredProjects.length > 3 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowAllProjects(!showAllProjects);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600/15 via-pink-600/15 to-blue-600/15 hover:from-blue-600/25 hover:via-pink-600/25 hover:to-blue-600/25 border border-white/15 hover:border-[#60A5FA]/40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.99] group cursor-pointer"
          >
            {showAllProjects ? (
              <>
                <ChevronUp size={14} className="text-[#DB2777] group-hover:-translate-y-0.5 transition-transform" />
                <span>Show Less (Top 3)</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} className="text-[#60A5FA] group-hover:translate-y-0.5 transition-transform" />
                <span>View All {filteredProjects.length} Projects in Chat</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Footer hint & View on Portfolio page */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
        <span className="text-zinc-400 text-[10px]">
          {showAllProjects ? `Showing all ${filteredProjects.length} projects` : `Showing ${visibleProjects.length} of ${filteredProjects.length}`}
        </span>
        <div className="flex items-center gap-2.5">
          {!showAllProjects && filteredProjects.length > 3 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAllProjects(true);
              }}
              className="text-[#60A5FA] hover:text-white font-bold flex items-center gap-1 transition-colors text-[11px] underline underline-offset-2 cursor-pointer"
            >
              <span>View All ({filteredProjects.length})</span>
            </button>
          )}
          <button
            type="button"
            onClick={onViewAllProjects}
            className="text-zinc-400 hover:text-[#DB2777] font-medium flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
            title="Open full portfolio page on website"
          >
            <span>Portfolio Page</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailCardProps {
  project: ProjectDetail;
  onBookMeeting: (projectName: string) => void;
  onBackToProjects: () => void;
  onCloseChat: () => void;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  project,
  onBookMeeting,
  onBackToProjects,
  onCloseChat
}) => {
  return (
    <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-[#0D1222] border border-white/15 space-y-3 shadow-inner w-full">
      {/* Visual Header Image Banner */}
      <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 bg-black/40 shadow-sm">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#60A5FA] text-[10px] font-mono font-bold uppercase">
            {project.category}
          </span>
          {project.year && (
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-300 text-[10px] font-mono">
              {project.year}
            </span>
          )}
        </div>

        {/* Bottom Title in Overlay */}
        <div className="absolute bottom-2 left-2.5 right-2.5">
          <h3 className="text-white font-black text-sm sm:text-base leading-snug drop-shadow-md">
            {project.title}
          </h3>
          {project.client && (
            <span className="text-[10px] text-zinc-300 font-mono block">
              Client: {project.client}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle & Short Description */}
      <div>
        <p className="text-[11px] text-[#60A5FA] font-semibold mb-1 leading-snug">
          {project.subtitle}
        </p>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Key Stats (if present) */}
      {project.stats && project.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5 py-1">
          {project.stats.slice(0, 4).map((stat, sIdx) => (
            <div key={sIdx} className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-[9px] text-zinc-400 block font-mono">{stat.label}</span>
              <span className="text-xs font-black text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
          Core Technologies:
        </span>
        <div className="flex flex-wrap gap-1">
          {[...(project.frameworks || []), ...(project.languages || [])].slice(0, 6).map((tech, tIdx) => (
            <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Key Highlights */}
      {project.userFeatures && project.userFeatures.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
            Highlights:
          </span>
          <div className="space-y-1">
            {project.userFeatures.slice(0, 3).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-300 leading-snug">
                <CheckCircle2 size={12} className="text-[#60A5FA] flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Links & Case Study */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all text-center"
            >
              <Globe size={13} />
              <span>Live Demo</span>
              <ExternalLink size={10} />
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <Github size={13} />
              <span>GitHub</span>
              <ExternalLink size={10} />
            </a>
          ) : null}

          <Link
            to={`/portfolio/${project.slug}`}
            onClick={onCloseChat}
            className={`py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center ${
              !project.liveUrl && !project.githubUrl ? 'col-span-2' : ''
            }`}
          >
            <span>Full Case Study</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Action Row: Book Meeting & Back */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onBookMeeting(project.title)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/20 transition-all active:scale-95"
          >
            <Calendar size={13} />
            <span>Book Similar Project</span>
          </button>
          
          <button
            type="button"
            onClick={onBackToProjects}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
            title="Back to projects list"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AIChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Meeting Form Local State for inline interaction
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: 'Tomorrow',
    timeSlot: '11:00 AM - 11:30 AM',
    topic: 'AI Automation & Custom Software'
  });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      type: 'text',
      text: "Hi there! 👋 Welcome to Pavion Technologies.\n\nI'm **Riva**, your technical guide here. How can we help your business today? Feel free to choose a quick option below or tell me about your project!",
      timestamp: getFormattedTime(),
      options: [
        '🏢 Office Address & Map',
        '💼 Explore Services',
        '🚀 View Portfolio & Demos',
        '📅 Book a Meeting'
      ]
    }
  ]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const scrollTimer = setTimeout(() => {
        scrollToBottom();
      }, 60);
      setHasUnread(false);
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(focusTimer);
      };
    }
  }, [isOpen, messages, isTyping]);

  const triggerMeetingBookingFlow = (customTopic?: string) => {
    if (customTopic) {
      setBookingFormData(prev => ({ ...prev, topic: customTopic }));
    }
    const time = getFormattedTime();
    return {
      id: Date.now().toString(),
      sender: 'bot' as const,
      type: 'meeting_form' as const,
      text: `📅 **Schedule a 1-on-1 Technical Consultation${customTopic ? ` for ${customTopic}` : ''}:**\n\nPlease enter your contact details and select your preferred slot below. We will set up your calendar invite and connect you directly with our senior engineering team.`,
      timestamp: time,
      options: []
    };
  };

  const handleSelectProject = (project: ProjectDetail) => {
    const time = getFormattedTime();
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      text: `Tell me about ${project.title}`,
      timestamp: time
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        type: 'project_detail',
        projectData: project,
        text: `🔍 **${project.title}** Details & Architecture:\n\nHere are the technical specifications, verified metrics, and live demo access for this project:`,
        timestamp: getFormattedTime(),
        options: [
          '🚀 View Portfolio & Demos',
          `📅 Book a Meeting`,
          '💼 Explore Services'
        ]
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 400);
  };

  const getSmartOptionsForQuery = (query: string): string[] => {
    const q = query.toLowerCase();
    const isHindi = q.includes('banwani') || q.includes('banani') || q.includes('chahiye') || q.includes('kare');
    if (q.includes('website') || q.includes('site') || q.includes('web')) {
      return isHindi
        ? ['🛒 E-Commerce Online Store', '🏢 Business / Corporate Website', '⚡ SaaS Web Platform', '📅 Book Discovery Call']
        : ['🛒 E-Commerce Store', '🏢 Business / Corporate', '⚡ SaaS Web Platform', '📅 Book Discovery Call'];
    }
    if (q.includes('app') || q.includes('mobile') || q.includes('ios') || q.includes('android')) {
      return isHindi
        ? ['🛍️ E-Commerce App', '📅 Booking / Service App', '🚀 Custom Startup App', '📅 Book a Call']
        : ['🛍️ E-Commerce App', '📅 Booking / Service App', '🚀 Custom Startup App', '📅 Book a Consultation'];
    }
    if (/^(h+i+|h+e+y+|h+e+l+o+|namaste)/i.test(q) || q.includes('theek') || q.includes('good') || q.includes('fine')) {
      return isHindi
        ? ['🌐 Mujhe ek website banwani hai', '📱 Mujhe ek app banwani hai', '🤖 AI & Automation Bot', '📅 Book a Meeting']
        : ['🌐 I need a website', '📱 I need a mobile app', '🤖 Custom AI Solution', '📅 Book a Meeting'];
    }
    if (q.includes('price') || q.includes('cost') || q.includes('kharcha') || q.includes('rate')) {
      return ['📅 Book a Meeting for Quote', '🚀 View Portfolio & Demos', '💼 Explore Services'];
    }
    return ['🚀 View Portfolio & Demos', '📅 Book a Meeting', '💼 Explore Services', '🏢 Office Address & Map'];
  };

  const generateBotResponse = (userQuery: string, history: Message[] = messages): Message => {
    const time = getFormattedTime();
    const rawQ = userQuery.trim();
    const q = rawQ.toLowerCase();
    const cleanQ = q.replace(/[?!.,'"`~@#$%^&*()_+=\-[\]{};:<>|\\]/g, ' ').replace(/\s+/g, ' ').trim();

    const isHindiUser = 
      cleanQ.includes('banwani') || 
      cleanQ.includes('banani') || 
      cleanQ.includes('banana') || 
      cleanQ.includes('chahiye') || 
      cleanQ.includes('karein') || 
      cleanQ.includes('kare') || 
      cleanQ.includes('kaise') || 
      cleanQ.includes('kese') || 
      cleanQ.includes('theek') || 
      cleanQ.includes('thik') || 
      cleanQ.includes('badhiya') || 
      cleanQ.includes('mast') || 
      cleanQ.includes('namaste') || 
      cleanQ.includes('pranam') || 
      cleanQ.includes('kharcha') || 
      cleanQ.includes('kitna') || 
      cleanQ.includes('kaha') ||
      cleanQ.includes('dhanyawad') ||
      cleanQ.includes('shukriya');

    // Check last messages for context
    const previousBotMessage = [...history].reverse().find((m) => m.sender === 'bot');
    const prevBotText = previousBotMessage?.text?.toLowerCase() || '';

    // 1. Direct Specific Project Match (e.g. user typed "AI SEO Auditor", "jewellery", "cctv", etc.)
    const matchedProject = findMatchingProject(cleanQ);
    if (matchedProject && !cleanQ.includes('view portfolio') && !cleanQ.includes('all projects')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'project_detail',
        projectData: matchedProject,
        text: `🔍 **${matchedProject.title}** Details & Architecture:\n\nHere are the technical specifications, verified metrics, and live demo access for this project:`,
        timestamp: time,
        options: [
          '🚀 View Portfolio & Demos',
          `📅 Book a Meeting`,
          '💼 Explore Services'
        ]
      };
    }

    // 2. Greetings & Hellos (e.g., "hi", "hii", "hiii", "hello", "hey", "heyy")
    const isGreeting = 
      /^(h+i+|h+e+y+|h+e+l+o+|namaste|namaskar|pranam|hola|yo|sup|good\s*(morning|afternoon|evening))\b/i.test(cleanQ) ||
      cleanQ === 'hi' || cleanQ === 'hii' || cleanQ === 'hiii' || cleanQ === 'hello' || cleanQ === 'hey' || cleanQ === 'heyy' || cleanQ === 'hlo';

    if (isGreeting) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Hi! 👋 Kaise hain aap? Main aapki kis tarah help kar sakta hoon?",
          timestamp: time,
          options: [
            '🌐 Mujhe ek website banwani hai',
            '📱 Mujhe ek app banwani hai',
            '🤖 AI & Automation Bot',
            '📅 Book a Meeting'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Hi! 👋 How are you doing today? How can I help you?",
        timestamp: time,
        options: [
          '🌐 I need a website',
          '📱 I need a mobile app',
          '🤖 Custom AI Solution',
          '📅 Book a Meeting'
        ]
      };
    }

    // 3. User answers how they are / Well-being acknowledgement
    const isWellBeingResponse = 
      /^(main\s+)?(theek|thik|badhiya|mast|sahi|accha|achha|fine|good|great|all\s+good|doing\s+(well|good)|im\s+(fine|good)|i\s+am\s+(fine|good))\b/i.test(cleanQ) ||
      cleanQ === 'theek' || cleanQ === 'thik' || cleanQ === 'mast' || cleanQ === 'badhiya' || cleanQ === 'good' || cleanQ === 'fine' || cleanQ === 'all good' || 
      cleanQ === 'main theek hoon' || cleanQ === 'mai theek hu' || cleanQ === 'theek hu' || cleanQ === 'theek hoon' || cleanQ === 'thik hu' || cleanQ === 'badhiya hu' || cleanQ === 'mast hu' ||
      cleanQ === 'im good' || cleanQ === "i'm good" || cleanQ === 'i am good' || cleanQ === 'doing well' || cleanQ === 'doing good';

    if (isWellBeingResponse) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Yeh sunkar achha laga 😊 Aaj aap kis cheez mein meri help chahte hain?",
          timestamp: time,
          options: [
            '🌐 Mujhe ek website banwani hai',
            '📱 Mujhe ek app banwani hai',
            '🤖 AI & Automation System',
            '📅 Book a Meeting'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Glad to hear that! 😊 What can I help you with today?",
        timestamp: time,
        options: [
          '🌐 Build a Website',
          '📱 Build a Mobile App',
          '🤖 Custom AI Solution',
          '📅 Book a Meeting'
        ]
      };
    }

    // 4. User asks bot how it is
    const isAskingBot = 
      /^(aap\s+)?(kaise|kese)\s*(ho|hain|hn)|how\s+are\s+you|how\s+r\s+u|kya\s+haal\s*(hai)?/i.test(cleanQ) ||
      cleanQ === 'kaise ho' || cleanQ === 'kese ho' || cleanQ === 'kaise hain aap' || cleanQ === 'how are you' || cleanQ === 'how are you doing';

    if (isAskingBot) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Main bilkul theek aur badhiya hoon! 😊 Shukriya puchne ke liye.\n\nAap batayein, aaj main aapki kis cheez mein help kar sakta hoon?",
          timestamp: time,
          options: [
            '🌐 Mujhe ek website banwani hai',
            '📱 Mujhe ek app banwani hai',
            '🤖 AI & Automation System',
            '📅 Book a Meeting'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "I'm doing great, thank you for asking! 😊 How can I assist you with your project today?",
        timestamp: time,
        options: [
          '🌐 Build a Website',
          '📱 Build a Mobile App',
          '🤖 Custom AI Solution',
          '📅 Book a Meeting'
        ]
      };
    }

    // 5. User wants a Website
    const isWebsiteInquiry = 
      ((cleanQ.includes('website') || cleanQ.includes('site') || cleanQ.includes('web page') || cleanQ.includes('web app')) &&
      (cleanQ.includes('banwani') || cleanQ.includes('banani') || cleanQ.includes('banana') || cleanQ.includes('chahiye') || cleanQ.includes('need') || cleanQ.includes('want') || cleanQ.includes('develop') || cleanQ.includes('create') || cleanQ.includes('build') || cleanQ.includes('karni hai'))) ||
      cleanQ === 'mujhe ek website banwani hai' || cleanQ === 'website banwani hai' || cleanQ === 'website development' ||
      cleanQ === 'i want to build a website' || cleanQ === 'i need a website' || cleanQ === 'need a website' || cleanQ === 'build a website';

    if (isWebsiteInquiry) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Bilkul! Main aapki website planning mein help kar sakta hoon. Aap kis type ki website banana chahte hain—jaise business, e-commerce, SaaS, ya koi custom idea?",
          timestamp: time,
          options: [
            '🛒 E-Commerce Online Store',
            '🏢 Business / Corporate Website',
            '⚡ SaaS Web Platform',
            '📅 Book Discovery Call'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Absolutely! I can help you plan your website. What type of website are you looking to build—business, e-commerce, SaaS, or a custom idea?",
        timestamp: time,
        options: [
          '🛒 E-Commerce Store',
          '🏢 Business / Corporate',
          '⚡ SaaS Web Platform',
          '📅 Book Discovery Call'
        ]
      };
    }

    // 6. User wants a Mobile App
    const isAppInquiry = 
      ((cleanQ.includes('app') || cleanQ.includes('application') || cleanQ.includes('mobile')) &&
      (cleanQ.includes('banwani') || cleanQ.includes('banani') || cleanQ.includes('banana') || cleanQ.includes('chahiye') || cleanQ.includes('need') || cleanQ.includes('want') || cleanQ.includes('develop') || cleanQ.includes('create') || cleanQ.includes('build') || cleanQ.includes('karni hai'))) ||
      cleanQ === 'mujhe ek app banwani hai' || cleanQ === 'app banwani hai' || cleanQ === 'app development' ||
      cleanQ === 'i want to build an app' || cleanQ === 'i need an app' || cleanQ === 'need an app' || cleanQ === 'build an app';

    if (isAppInquiry) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Zaroor! Aap kis type ki app banwana chahte hain—business, e-commerce, booking, ya koi custom idea?",
          timestamp: time,
          options: [
            '🛍️ E-Commerce App',
            '📅 Booking / Service App',
            '🚀 Custom Startup App',
            '📅 Book a Call'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Sure! What type of app are you looking to build—business, e-commerce, booking, or a custom idea?",
        timestamp: time,
        options: [
          '🛍️ E-Commerce App',
          '📅 Booking / Service App',
          '🚀 Custom Startup App',
          '📅 Book a Consultation'
        ]
      };
    }

    // 7. Contextual Subtypes for Websites & Apps
    if (cleanQ.includes('e-commerce') || cleanQ.includes('ecommerce') || cleanQ.includes('online store') || cleanQ.includes('shopping') || cleanQ.includes('dukaan')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Awesome! We build modern e-commerce platforms using Next.js 15, PostgreSQL, and Stripe (like our Luxury Jewellery Shop project) with lightning-fast load speed and seamless checkout.\n\nRoughly how many products will you have, and do you need any specific features like multi-currency or automated inventory sync?",
        timestamp: time,
        options: [
          '🚀 View Portfolio & Demos',
          '📅 Book a Meeting',
          '💼 Explore Services'
        ]
      };
    }

    if (cleanQ.includes('business website') || cleanQ.includes('corporate website') || (cleanQ.includes('business') && prevBotText.includes('website'))) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Great choice! For business websites, we engineer ultra-fast, SEO-optimized Next.js 15 platforms built for conversion and top rankings on Google and AI answer engines (AEO/GEO).\n\nWould you like to explore our live case studies or schedule a quick discovery call?",
        timestamp: time,
        options: [
          '🚀 View Portfolio & Demos',
          '📅 Book a Meeting',
          '💼 Explore Services'
        ]
      };
    }

    if (cleanQ.includes('booking') || cleanQ.includes('service app') || cleanQ.includes('appointment app')) {
      setBookingFormData(prev => ({ ...prev, topic: 'Booking & Service Platform - 30-Min Discovery Call' }));
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'meeting_form',
        text: "📅 **Schedule Your Booking & Service Architecture Call:**\n\nPerfect! For booking and service apps, we engineer real-time scheduling slots, calendar sync, automated SMS/WhatsApp alerts, and instant payment gateways (like our BookMyTrip and CCTV Care Hub systems).\n\nSelect your preferred slot and enter your details below to reserve your 30-minute discovery call directly with our team:",
        timestamp: time,
        options: [
          '🚀 View Portfolio & Demos',
          '💼 Explore Services',
          '🏢 Office Address & Map'
        ]
      };
    }

    if (cleanQ.includes('saas') || cleanQ.includes('custom idea') || cleanQ.includes('startup') || (cleanQ.includes('custom') && (prevBotText.includes('app') || prevBotText.includes('website')))) {
      setBookingFormData(prev => ({ ...prev, topic: 'Custom Startup MVP - 30-Min Discovery Call' }));
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'meeting_form',
        text: "🚀 **Schedule Your 30-Minute Architecture Discovery Call:**\n\nFantastic! For custom startup apps and SaaS products, we run **4 to 6-week rapid MVP sprints** where you get 100% source code ownership and a production-ready product.\n\nSelect your preferred slot and details below to reserve your 30-minute discovery call directly with our senior engineering architects:",
        timestamp: time,
        options: [
          '🚀 View Portfolio & Demos',
          '💼 Explore Services',
          '🏢 Office Address & Map'
        ]
      };
    }

    // 8. Custom Software, ERP & CRM
    if (
      cleanQ.includes('erp') || 
      cleanQ.includes('crm') || 
      cleanQ.includes('software banwana') || 
      cleanQ.includes('software banani') || 
      cleanQ.includes('inventory') || 
      cleanQ.includes('billing software') || 
      cleanQ.includes('custom software') ||
      cleanQ.includes('pos')
    ) {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Bilkul! Pavion mein hum enterprise-grade Custom Software, ERP aur CRM platforms banate hain jo bina kisi recurring per-seat fees ke aate hain aur 100% source code ownership aapka rehta hai.\n\nAapka business kis industry ka hai aur kaunse key modules chahiye (jaise Inventory, GST Billing, Multi-branch, ya Sales CRM)?",
          timestamp: time,
          options: [
            '💼 Enterprise ERP & Inventory',
            '👥 AI-Powered CRM',
            '🚀 View Portfolio & Demos',
            '📅 Book a Meeting'
          ]
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "We engineer enterprise-grade Custom Software, ERP, and CRM platforms with zero recurring per-user fees and 100% source code ownership.\n\nWhat industry is your business in, and what core modules do you need (e.g., Inventory, Invoicing, Sales CRM, HR)?",
        timestamp: time,
        options: [
          '💼 Enterprise ERP & Inventory',
          '👥 AI-Powered CRM',
          '🚀 View Portfolio & Demos',
          '📅 Book a Meeting'
        ]
      };
    }

    // 9. AI Solutions, LLMs, Agents & RAG
    if (
      cleanQ.includes('ai agent') || 
      cleanQ.includes('artificial intelligence') || 
      cleanQ.includes('rag') || 
      cleanQ.includes('llm') || 
      cleanQ.includes('gpt') || 
      cleanQ.includes('claude') || 
      cleanQ.includes('vector') || 
      cleanQ.includes('chatbot banwana') || 
      cleanQ.includes('ai bot') || 
      cleanQ.includes('ai integration') || 
      cleanQ.includes('ai automation')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "We build production-ready AI systems, including Claude 3.5 tool-use autonomous agents, OpenAI GPT-4o automations, and private enterprise RAG (vector database) systems.\n\nWhat kind of AI workflow or bot are you looking to build?",
        timestamp: time,
        options: [
          '🤖 Customer Support AI Bot',
          '📄 Document Intelligence',
          '⚡ Workflow Automation',
          '📅 Book an AI Consultation'
        ]
      };
    }

    // 10. Portfolio & Case Studies Intent
    if (
      cleanQ.includes('portfolio') || 
      cleanQ.includes('projects') || 
      cleanQ.includes('case study') || 
      cleanQ.includes('case studies') || 
      cleanQ.includes('demos') || 
      cleanQ.includes('github') ||
      cleanQ.includes('kaam dikhao') ||
      cleanQ.includes('previous work') ||
      cleanQ.includes('view all') ||
      cleanQ.includes('show all') ||
      cleanQ.includes('all project') ||
      cleanQ.includes('sab dikhao') ||
      cleanQ.includes('sab show') ||
      cleanQ.includes('saare project') ||
      (cleanQ.includes('demo') && !cleanQ.includes('book') && !cleanQ.includes('schedule') && !cleanQ.includes('call'))
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'portfolio_list',
        text: "🚀 **Pavion Portfolio & Live Demos:**\n\nWe have engineered and shipped 50+ enterprise and AI products with a 98% client satisfaction rate. **Click on any project below** to inspect its full architecture, tech stack, and live demos right here in the chat!",
        timestamp: time,
        options: ['📅 Book a Meeting', '💼 Explore Services', '🏢 Office Address & Map']
      };
    }

    // 11. Meeting Booking Intent
    if (
      cleanQ.includes('meeting') || 
      cleanQ.includes('book') || 
      cleanQ.includes('schedule') || 
      cleanQ.includes('appointment') || 
      cleanQ.includes('consultation') || 
      cleanQ.includes('call book') ||
      cleanQ.includes('baat karni') ||
      cleanQ.includes('slot') ||
      cleanQ.includes('calendar')
    ) {
      const projectForMeeting = projectsData.find(p => cleanQ.includes(p.title.toLowerCase()) || cleanQ.includes(p.slug.toLowerCase()));
      return triggerMeetingBookingFlow(projectForMeeting ? projectForMeeting.title : undefined);
    }

    // 12. Pricing, Cost & Estimates
    if (
      cleanQ.includes('cost') || 
      cleanQ.includes('price') || 
      cleanQ.includes('pricing') || 
      cleanQ.includes('budget') || 
      cleanQ.includes('how much') || 
      cleanQ.includes('rate') || 
      cleanQ.includes('quote') ||
      cleanQ.includes('charges') ||
      cleanQ.includes('fees') ||
      cleanQ.includes('kharcha') ||
      cleanQ.includes('kitna lagega') ||
      cleanQ.includes('kitna paisa') ||
      cleanQ.includes('kitne paise')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "💰 **Pavion Transparent Pricing Models:**\n\n• **Fixed-Price MVP Sprint ($3,500 – $15,000)**: Full-featured product launched in 4 to 6 weeks. Fixed cost with zero hourly scope creep.\n• **Enterprise ERP & Custom AI ($15,000 – $50,000+)**: Comprehensive enterprise systems.\n• **Dedicated Engineering Squads**: Monthly retainers with onboarding in 48 to 72 hours.\n\n📋 *We provide an itemized architecture blueprint and fixed quotation within 24 hours of your discovery call.*\n\nWould you like to schedule a call for an exact quote?",
        timestamp: time,
        options: ['📅 Book a Meeting for Quote', '🚀 View Portfolio & Demos', '💼 Explore Services']
      };
    }

    // 13. Timeline & Delivery Duration
    if (
      cleanQ.includes('how long') || 
      cleanQ.includes('timeline') || 
      cleanQ.includes('time take') || 
      cleanQ.includes('delivery time') || 
      cleanQ.includes('how much time') || 
      cleanQ.includes('duration') || 
      cleanQ.includes('turnaround') || 
      cleanQ.includes('kitna time') || 
      cleanQ.includes('kitne din') ||
      cleanQ.includes('kab tak') ||
      cleanQ.includes('speed')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "⚡ **Delivery Timelines & Speed:**\n\n• **MVP Sprints**: 4 to 6 weeks from initial scope to live deployment.\n• **Enterprise ERP & AI**: 8 to 16 weeks broken into bi-weekly milestone deliverables.\n• **Dedicated Squad Onboarding**: 48 to 72 hours.\n\nEvery project includes daily Slack standups, weekly live staging demos, and a 100% on-time milestone delivery track record.\n\nWhen are you looking to launch your project?",
        timestamp: time,
        options: ['📅 Book a Meeting', '🚀 View Portfolio & Demos', '💼 Explore Services']
      };
    }

    // 14. Office Address, Location, Phone & Contact Info
    if (
      cleanQ.includes('address') || 
      cleanQ.includes('location') || 
      cleanQ.includes('where') || 
      cleanQ.includes('office') || 
      cleanQ.includes('gurugram') || 
      cleanQ.includes('gurgaon') || 
      cleanQ.includes('landmark') || 
      cleanQ.includes('map') ||
      cleanQ.includes('phone') ||
      cleanQ.includes('email') ||
      cleanQ.includes('contact') ||
      cleanQ.includes('call') ||
      cleanQ.includes('number') ||
      cleanQ.includes('timing') ||
      cleanQ.includes('kaha par') ||
      cleanQ.includes('kaha ho')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "📍 **Pavion Technologies Global HQ & Contact:**\n\n🏢 **Address**: 1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101, India\n\n⏰ **Office Hours**: Monday – Saturday, 9:30 AM to 7:00 PM IST\n📞 **Phone & WhatsApp**: [+91 95289-91434](tel:+919528991434) / [+91 74559-75301](tel:+917455975301)\n✉️ **Email**: [Contact@paviontechnologies.com](mailto:Contact@paviontechnologies.com)\n\nYou are welcome to visit our offices in Gurugram or schedule an online video consultation!",
        timestamp: time,
        link: { 
          text: 'Open Landmark Cyberpark on Google Maps', 
          url: 'https://maps.google.com/?q=Plus+Offices+Landmark+Cyberpark+Sector+67+Gurugram+Haryana+122101', 
          isExternal: true 
        },
        options: ['📅 Book a Meeting', '💼 Explore Services', '🚀 View Portfolio & Demos']
      };
    }

    // 15. Team & Founders (Rahul Bajediyal & Priyanshu Gupta)
    if (
      cleanQ.includes('founder') || 
      cleanQ.includes('founders') || 
      cleanQ.includes('owner') || 
      cleanQ.includes('rahul') || 
      cleanQ.includes('priyanshu') || 
      cleanQ.includes('leadership') || 
      cleanQ.includes('team') ||
      cleanQ.includes('who runs')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "👥 **About Pavion Technologies Leadership:**\n\n• **Rahul Bajediyal**: Co-Founder & System Architect (Full-stack architecture, high-performance distributed backends)\n• **Priyanshu Gupta**: Co-Founder & Product Lead (AI integrations, product strategy, client delivery)\n• **Team**: 20+ specialized senior software engineers, AI architects, UI/UX designers, and DevOps specialists.\n• **Global HQ**: 1st Floor, Landmark Cyberpark, Sector 67, Gurugram.",
        timestamp: time,
        link: { text: 'Meet Our Team & Leadership', url: '/about' },
        options: ['🚀 View Portfolio & Demos', '🏢 Office Address & Map', '📅 Book a Meeting']
      };
    }

    // 16. Positive acknowledgements & Thanks
    if (cleanQ === 'ok' || cleanQ === 'okay' || cleanQ === 'great' || cleanQ === 'cool' || cleanQ === 'got it' || cleanQ === 'done' || cleanQ === 'theek hai' || cleanQ === 'thik hai' || cleanQ === 'achha' || cleanQ === 'accha') {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Bahut badhiya! 😊 Agar aapko kisi specific project par baat karni ho, live demo dekhna ho ya consultation call schedule karni ho, to batayein. Main yahin hoon!",
          timestamp: time,
          options: ['🚀 View Portfolio & Demos', '💼 Explore Services', '📅 Book a Meeting']
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Awesome! 😊 Let me know if you'd like to explore our live demos, discuss a specific idea, or schedule a consultation call. I'm right here!",
        timestamp: time,
        options: ['🚀 View Portfolio & Demos', '💼 Explore Services', '📅 Book a Meeting']
      };
    }

    if (cleanQ.includes('thank') || cleanQ.includes('thanks') || cleanQ.includes('dhanyawad') || cleanQ.includes('shukriya') || cleanQ === 'thx') {
      if (isHindiUser) {
        return {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: "Aapka bahut-bahut swagat hai! 😊 Agar koi aur sawaal ho ya project discuss karna ho, to aap kabhi bhi bata sakte hain.",
          timestamp: time,
          options: ['🚀 View Portfolio & Demos', '📅 Book a Meeting', '💼 Explore Services']
        };
      }

      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "You're very welcome! 😊 Feel free to ask anytime if you need more details about your project.",
        timestamp: time,
        options: ['🚀 View Portfolio & Demos', '📅 Book a Meeting', '💼 Explore Services']
      };
    }

    // 17. Default Polite, Natural Human-Like Clarification (NO ROBOTIC FALLBACK!)
    if (isHindiUser) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Samajh gaya! 😊 Kya aap thoda aur detail me bata sakte hain ki aapki requirement kya hai, taaki main aapko exact solution aur timeline suggest kar sakun?\n\nYa aap niche diye gaye options me se choose kar sakte hain:",
        timestamp: time,
        options: [
          '🌐 Mujhe ek website banwani hai',
          '📱 Mujhe ek app banwani hai',
          '🤖 AI & Automation System',
          '📅 Book a Meeting'
        ]
      };
    }

    return {
      id: Date.now().toString(),
      sender: 'bot',
      type: 'text',
      text: "Got it! 😊 Could you share a few more details about your project or requirement so I can suggest the exact architecture and timeline?\n\nOr feel free to pick one of the options below:",
      timestamp: time,
      options: [
        '🌐 I need a website',
        '📱 I need a mobile app',
        '🤖 Custom AI Solution',
        '📅 Book a Meeting'
      ]
    };
  };

  const fetchOpenAIResponse = async (userPrompt: string, history: Message[]): Promise<string> => {
    const conversationMessages = history
      .filter((m) => m.type !== 'meeting_form' && m.type !== 'portfolio_list')
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.text
      }));

    conversationMessages.push({
      role: 'user' as const,
      content: userPrompt
    });

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: RIVA_SYSTEM_PROMPT },
          ...conversationMessages
        ],
        temperature: 0.7,
        max_tokens: 450
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`OpenAI API error ${res.status}: ${JSON.stringify(errData)}`);
    }

    const data = await res.json();
    const replyText = data?.choices?.[0]?.message?.content?.trim();
    if (!replyText) {
      throw new Error('Empty response from OpenAI');
    }
    return replyText;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      text: messageText,
      timestamp: getFormattedTime()
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputMessage('');
    setIsTyping(true);

    const q = messageText.toLowerCase().trim();
    const previousBotMessage = [...messages].reverse().find((m) => m.sender === 'bot');
    const prevBotText = previousBotMessage?.text?.toLowerCase() || '';

    // 1. Direct Specific Project Match (Instant interactive UI card)
    const matchedProject = findMatchingProject(q);
    if (matchedProject && !q.includes('view portfolio') && !q.includes('all projects')) {
      setTimeout(() => {
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'project_detail',
          projectData: matchedProject,
          text: `🔍 **${matchedProject.title}** Details & Architecture:\n\nHere are the technical specifications, verified metrics, and live demo access for this project:`,
          timestamp: getFormattedTime(),
          options: [
            '🚀 View Portfolio & Demos',
            `📅 Book a Meeting`,
            '💼 Explore Services'
          ]
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 350);
      return;
    }

    // 2. Portfolio & Case Studies Intent (Instant interactive showcase UI)
    if (
      q === '🚀 view portfolio & demos' ||
      q === 'view portfolio & demos' ||
      q === 'portfolio' ||
      q === 'projects' ||
      q === 'demos' ||
      q === 'view all' ||
      q === 'show all' ||
      q === 'all projects' ||
      q.includes('view all') ||
      q.includes('show all') ||
      q.includes('all project') ||
      q.includes('sab dikhao') ||
      q.includes('sab show') ||
      q.includes('saare project')
    ) {
      setTimeout(() => {
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'portfolio_list',
          text: "🚀 **Pavion Portfolio & Live Demos:**\n\nWe have engineered and shipped 50+ enterprise and AI products with a 98% client satisfaction rate. **Click on any project below** to inspect its full architecture, tech stack, and live demos right here in the chat!",
          timestamp: getFormattedTime(),
          options: ['📅 Book a Meeting', '💼 Explore Services', '🏢 Office Address & Map']
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 350);
      return;
    }

    // 3. Meeting Booking Intent (Instant booking form)
    const isMeetingIntent = 
      q.includes('meeting') ||
      q.includes('book') ||
      q.includes('schedule') ||
      q.includes('appointment') ||
      q.includes('consultation') ||
      q.includes('discovery call') ||
      q.includes('30-min') ||
      q.includes('30 min') ||
      q.includes('baat karni') ||
      q.includes('slot') ||
      q.includes('calendar') ||
      ((q === 'yes' || q === 'sure' || q === 'ha' || q === 'yeah' || q === 'yep' || q === 'ok' || q === 'okay' || q === 'bilkul' || q === 'done' || q === 'book call') &&
        (prevBotText.includes('call') || prevBotText.includes('schedule') || prevBotText.includes('meeting') || prevBotText.includes('discovery')));

    if (isMeetingIntent && !q.includes('portfolio') && !q.includes('case study') && !q.includes('demo')) {
      setTimeout(() => {
        const botReply = triggerMeetingBookingFlow('30-Minute Technical Discovery Call');
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // 4. For all other questions, query live OpenAI GPT-4o-mini!
    try {
      const aiReplyText = await fetchOpenAIResponse(messageText, updatedHistory);
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        type: 'text',
        text: aiReplyText,
        timestamp: getFormattedTime(),
        options: getSmartOptionsForQuery(messageText)
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.warn('OpenAI API call notice, using local knowledge engine fallback:', error);
      const fallbackReply = generateBotResponse(messageText, updatedHistory);
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.phone) return;

    setIsBookingSubmitting(true);

    const meetingId = `PAV-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = getFormattedTime();

    const meetingObj: MeetingDetails = {
      id: meetingId,
      name: bookingFormData.name,
      email: bookingFormData.email,
      phone: bookingFormData.phone,
      date: bookingFormData.date,
      timeSlot: bookingFormData.timeSlot,
      topic: bookingFormData.topic
    };

    // Real Live HTTP Email Dispatch to Contact@paviontechnologies.com
    try {
      await fetch('https://formsubmit.co/ajax/Contact@paviontechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Meeting_ID: meetingId,
          Client_Name: meetingObj.name,
          Client_Email: meetingObj.email,
          Client_Phone: meetingObj.phone,
          Preferred_Date: meetingObj.date,
          Time_Slot: meetingObj.timeSlot,
          Discussion_Topic: meetingObj.topic,
          Lead_Source: 'Riva AI Chat Assistant',
          _subject: `📅 [Riva AI Meeting Booking] ${meetingObj.name} (#${meetingId})`,
          _replyto: meetingObj.email,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('Riva meeting email dispatch notice:', err);
    } finally {
      setIsBookingSubmitting(false);

      const confirmationMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'meeting_confirmation',
        text: `🎉 **Consultation Successfully Scheduled!**\n\nMeeting Reference: **#${meetingId}**\n\n• **Client**: ${meetingObj.name}\n• **Scheduled Slot**: ${meetingObj.date} at ${meetingObj.timeSlot}\n• **Discussion**: ${meetingObj.topic}\n\n📧 **Email Confirmation**: \`${meetingObj.email}\`\n📱 **WhatsApp / SMS**: \`${meetingObj.phone}\`\n\nOur engineering director has received your booking details at \`Contact@paviontechnologies.com\`. We look forward to meeting you!`,
        timestamp: time,
        meetingData: meetingObj,
        options: [
          '🏢 Office Address & Map',
          '💼 Explore Services',
          '🚀 View Portfolio & Demos'
        ]
      };

      setMessages((prev) => [...prev, confirmationMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: "Conversation refreshed! 🔄 How can I help your business today?",
        timestamp: getFormattedTime(),
        options: initialSuggestedPrompts
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`relative flex items-center gap-2.5 px-4.5 py-3 sm:px-5 sm:py-3.5 rounded-full font-black text-sm shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-[#0D1222] text-white border border-white/20 shadow-black/50' 
              : 'bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA] text-white shadow-pink-600/30 hover:shadow-pink-600/50'
          }`}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open Riva AI Assistant'}
        >
          {isOpen ? (
            <>
              <X size={20} className="text-zinc-300" />
              <span className="hidden sm:inline font-bold">Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Bot size={22} className="text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#050508] rounded-full animate-pulse" />
              </div>
              <span className="font-extrabold tracking-wide">Ask Riva</span>
              
              {/* Unread Ping */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#60A5FA]"></span>
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Main Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : undefined
            }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            data-lenis-prevent
            className={`fixed z-50 overflow-hidden bg-[#0D1222] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col ${
              // Responsive Viewport Sizing
              'bottom-20 left-4 right-4 sm:right-auto sm:left-6 sm:w-[430px] rounded-3xl'
            } ${
              isMinimized ? 'h-auto max-w-sm' : 'h-[580px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#070A14] border-b border-white/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DB2777] to-[#60A5FA] flex items-center justify-center text-white shadow-md">
                    <Bot size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#070A14] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-black text-sm sm:text-base leading-tight">Riva AI</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] text-[10px] font-mono font-bold border border-[#60A5FA]/20">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-normal">Technical Architect & Booking Agent</p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Restart chat"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Toggle minimize"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* If Not Minimized, Render Messages & Input */}
            {!isMinimized && (
              <>
                {/* Messages Feed */}
                <div 
                  ref={messagesContainerRef}
                  data-lenis-prevent
                  onWheel={(e) => e.stopPropagation()}
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-5 space-y-4 font-sans chat-scrollbar"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-start gap-2.5 max-w-[92%]">
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#60A5FA] flex-shrink-0 mt-1 border border-white/10">
                            <Sparkles size={14} />
                          </div>
                        )}
                        
                        <div
                          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md w-full ${
                            msg.sender === 'user'
                              ? 'bg-[#DB2777] text-white rounded-tr-none font-medium'
                              : 'bg-[#05070E] text-zinc-200 border border-white/10 rounded-tl-none font-normal'
                          }`}
                        >
                          {/* Formatted Text Rendering (Renders bold and links without asterisks) */}
                          <div className="space-y-1 text-xs sm:text-sm">
                            {formatChatText(msg.text)}
                          </div>

                          {/* ACTION 1: Inline Meeting Booking Form Card */}
                          {msg.type === 'meeting_form' && (
                            <form onSubmit={handleBookingSubmit} className="mt-4 p-4 rounded-2xl bg-[#0D1222] border border-white/15 space-y-3 shadow-inner">
                              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white font-bold text-xs uppercase tracking-wider">
                                <Calendar size={14} className="text-[#DB2777]" />
                                <span>Reserve Your Meeting Slot</span>
                              </div>

                              <div>
                                <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Your Full Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="John Doe"
                                  value={bookingFormData.name}
                                  onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA]"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Work Email</label>
                                  <input
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    value={bookingFormData.email}
                                    onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Phone / WhatsApp</label>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="+91 ..."
                                    value={bookingFormData.phone}
                                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#60A5FA]"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Preferred Day</label>
                                  <select
                                    value={bookingFormData.date}
                                    onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-white/10 text-white text-xs focus:outline-none focus:border-[#60A5FA]"
                                  >
                                    <option value="Today">Today (Urgent)</option>
                                    <option value="Tomorrow">Tomorrow</option>
                                    <option value="Day After Tomorrow">Day After Tomorrow</option>
                                    <option value="This Friday">This Friday</option>
                                    <option value="Next Monday">Next Monday</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Time Slot</label>
                                  <select
                                    value={bookingFormData.timeSlot}
                                    onChange={(e) => setBookingFormData({ ...bookingFormData, timeSlot: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-white/10 text-white text-xs focus:outline-none focus:border-[#60A5FA]"
                                  >
                                    <option value="11:00 AM - 11:30 AM">11:00 AM</option>
                                    <option value="02:00 PM - 02:30 PM">02:00 PM</option>
                                    <option value="04:30 PM - 05:00 PM">04:30 PM</option>
                                    <option value="07:00 PM - 07:30 PM">07:00 PM</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Project Category</label>
                                <select
                                  value={bookingFormData.topic}
                                  onChange={(e) => setBookingFormData({ ...bookingFormData, topic: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-white/10 text-white text-xs focus:outline-none focus:border-[#60A5FA]"
                                >
                                  <option value="AI Automation & Agents">AI Automation & Autonomous Agents</option>
                                  <option value="Custom Enterprise ERP / CRM">Custom Enterprise ERP / CRM</option>
                                  <option value="Digital Marketing & SEO">Digital Marketing & SEO Growth</option>
                                  <option value="Mobile App Development">Mobile App (iOS / Android)</option>
                                  <option value="Dedicated Engineering Squad">Dedicated Engineering Squad</option>
                                  <option value="General Architecture Consultation">General Architecture Consultation</option>
                                </select>
                              </div>

                              <button
                                type="submit"
                                disabled={isBookingSubmitting}
                                className="w-full mt-2 py-3 rounded-xl bg-[#DB2777] hover:bg-[#DB2777]/90 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 active:scale-95"
                              >
                                {isBookingSubmitting ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Dispatching Booking...</span>
                                  </>
                                ) : (
                                  <>
                                    <CalendarCheck size={16} />
                                    <span>Confirm & Book My Meeting</span>
                                  </>
                                )}
                              </button>
                            </form>
                          )}

                          {/* ACTION 2: Confirmed Meeting Card with Calendar & WhatsApp links */}
                          {msg.type === 'meeting_confirmation' && msg.meetingData && (
                            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#0D1222] to-blue-950/30 border border-emerald-500/30 space-y-3">
                              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                                  <CheckCircle2 size={13} />
                                  <span>Meeting Confirmed</span>
                                </span>
                                <span className="text-[10px] font-mono text-zinc-400">
                                  ID: #{msg.meetingData.id}
                                </span>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between text-zinc-300">
                                  <span className="text-zinc-400">Date:</span>
                                  <span className="text-white font-bold">{msg.meetingData.date}</span>
                                </div>
                                <div className="flex justify-between text-zinc-300">
                                  <span className="text-zinc-400">Time Slot:</span>
                                  <span className="text-[#60A5FA] font-bold">{msg.meetingData.timeSlot}</span>
                                </div>
                                <div className="flex justify-between text-zinc-300">
                                  <span className="text-zinc-400">Topic:</span>
                                  <span className="text-zinc-200 truncate max-w-[180px]">{msg.meetingData.topic}</span>
                                </div>
                              </div>

                              {/* Action Buttons: Add to Google Calendar & WhatsApp Drip */}
                              <div className="pt-2 flex flex-col gap-2">
                                <a
                                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pavion Technologies Architecture Meeting (#${msg.meetingData.id})`)}&details=${encodeURIComponent(`1-on-1 Consultation with Pavion Technologies for ${msg.meetingData.topic}. Client: ${msg.meetingData.name} (${msg.meetingData.email}, ${msg.meetingData.phone}). Office: 1st Floor, Landmark Cyberpark, Sector 67, Gurugram.`)}&location=${encodeURIComponent('Google Meet / Landmark Cyberpark, Sector 67, Gurugram')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all text-center"
                                >
                                  <Calendar size={14} />
                                  <span>Add to Google Calendar</span>
                                </a>

                                <a
                                  href={`https://wa.me/919528991434?text=${encodeURIComponent(`Hi Pavion Technologies, I booked meeting #${msg.meetingData.id} for ${msg.meetingData.topic} on ${msg.meetingData.date} (${msg.meetingData.timeSlot}). My name is ${msg.meetingData.name}.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2.5 px-3 rounded-xl bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] border border-[#25d366]/30 font-bold text-xs flex items-center justify-center gap-2 transition-all text-center"
                                >
                                  <span>💬 Confirm on WhatsApp (+91 95289-91434)</span>
                                </a>
                              </div>
                            </div>
                          )}

                          {/* ACTION 3: Interactive Portfolio Projects Showcase */}
                          {msg.type === 'portfolio_list' && (
                            <PortfolioListCard
                              onSelectProject={handleSelectProject}
                              onViewAllProjects={() => {
                                navigate('/portfolio#portfolio');
                                setIsMinimized(true);
                                setTimeout(() => {
                                  const el = document.getElementById('portfolio');
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }, 300);
                              }}
                            />
                          )}

                          {/* ACTION 4: Deep Project Details Card */}
                          {msg.type === 'project_detail' && msg.projectData && (
                            <ProjectDetailCard
                              project={msg.projectData}
                              onBookMeeting={(projectName) => {
                                handleSendMessage(`Book a consultation for ${projectName}`);
                              }}
                              onBackToProjects={() => {
                                handleSendMessage('🚀 View Portfolio & Demos');
                              }}
                              onCloseChat={() => setIsOpen(false)}
                            />
                          )}

                          {/* Action Button Link (if provided) */}
                          {msg.link && (
                            <div className="mt-3 pt-2.5 border-t border-white/10">
                              {msg.link.isExternal ? (
                                <a
                                  href={msg.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] hover:text-[#DB2777] transition-colors"
                                >
                                  <span>{msg.link.text}</span>
                                  <ExternalLink size={12} />
                                </a>
                              ) : (
                                <Link
                                  to={msg.link.url}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] hover:text-[#DB2777] transition-colors"
                                >
                                  <span>{msg.link.text}</span>
                                  <ArrowUpRight size={14} />
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] text-zinc-500 font-mono mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Bot Suggested Quick Action Options */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                          {msg.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleSendMessage(opt)}
                              className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#60A5FA]/15 text-zinc-300 hover:text-[#60A5FA] border border-white/10 hover:border-[#60A5FA]/40 transition-all font-semibold text-left shadow-sm active:scale-95 flex items-center gap-1.5"
                            >
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-zinc-400 text-xs py-1">
                      <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#60A5FA] flex-shrink-0 border border-white/10">
                        <Sparkles size={14} className="animate-spin" />
                      </div>
                      <div className="p-3 rounded-2xl bg-[#05070E] border border-white/10 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Field */}
                <div className="p-3 sm:p-4 bg-[#070A14] border-t border-white/10 flex-shrink-0">
                  <div className="relative flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Riva or say 'Book a meeting'..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#60A5FA] transition-all placeholder-zinc-500 font-sans"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      className={`p-3 rounded-2xl transition-all flex items-center justify-center flex-shrink-0 ${
                        inputMessage.trim()
                          ? 'bg-[#DB2777] text-white hover:bg-[#DB2777]/90 shadow-md shadow-pink-600/20 active:scale-95'
                          : 'bg-white/5 text-zinc-500 cursor-not-allowed border border-white/5'
                      }`}
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2 px-1 font-mono">
                    <span>Riva AI Engine • Instant 24/7</span>
                    <a href="tel:+919528991434" className="hover:text-[#60A5FA] transition-colors">
                      📞 +91 95289-91434
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
