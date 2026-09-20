// src/data/projectData.ts

export interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: 'AI & Machine Learning' | 'Web Development' | 'Software Development' | 'Mobile & Cloud' | 'Enterprise ERP';
  shortDescription: string;
  fullDescription: string;
  githubUrl: string;
  liveUrl?: string;
  year: string;
  client?: string;
  role?: string;
  image: string;
  gradient: string;
  accentColor: string;
  languages: string[];
  frameworks: string[];
  databasesAndCloud: string[];
  userFeatures: string[];
  technicalFeatures: string[];
  aiAndDataFeatures?: string[];
  stats?: { label: string; value: string }[];
}

export const projectsData: ProjectDetail[] = [
  {
    id: 1,
    slug: 'ai-seo-auditor',
    title: 'AI SEO Auditor',
    subtitle: 'Autonomous AI-Powered SEO Analysis & Structured Intelligence Platform',
    category: 'AI & Machine Learning',
    shortDescription: 'Instant AI SEO audit generator with entity analysis, OpenAI GPT-4o chat, SERP scraping, and Convex real-time processing.',
    fullDescription: 'AI SEO Auditor is an enterprise-grade web intelligence platform designed to generate comprehensive, data-driven SEO audits in seconds. Powered by OpenAI GPT-4o, Bright Data Perplexity scrapers, and Convex serverless architecture, it empowers businesses to discover keyword gaps, competitor backlinks, entity schema, and actionable growth opportunities with evidence-backed source attribution.',
    githubUrl: 'https://github.com/paviontechnologies/ai-seo-auditor',
    liveUrl: 'https://ai-seo-auditor.paviontechnologies.com',
    year: '2025',
    client: 'Pavion Labs / SaaS Product',
    role: 'Full-Stack & AI Systems Engineering',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    accentColor: '#6366f1',
    languages: ['TypeScript', 'JavaScript', 'SQL', 'CSS3 / Tailwind'],
    frameworks: ['Next.js 15 (App Router)', 'React 19', 'Turbopack', 'Tailwind CSS v4', 'shadcn/ui', 'Radix UI', 'Zod'],
    databasesAndCloud: ['Convex Serverless DB', 'Clerk Auth & Billing', 'Stripe Payments', 'Bright Data SERP Scraper', 'OpenAI GPT-4o API'],
    stats: [
      { label: 'Audit Speed', value: '< 15s' },
      { label: 'Data Accuracy', value: '99.4%' },
      { label: 'Framework', value: 'Next.js 15' },
      { label: 'AI Model', value: 'GPT-4o' },
    ],
    userFeatures: [
      'Instant SEO Reports: Generate complete SEO technical & content audits in seconds using generative AI.',
      'Entity Analysis: Analyze companies, personal brands, e-commerce products, courses, or full domain ecosystems.',
      'AI Chat Integration: Conversational assistant powered by OpenAI GPT-4o to ask deep questions directly about audit reports.',
      'Comprehensive Data Intelligence: Source inventory, live competitor benchmarking, keyword clustering, and backlink topology.',
      'Real-Time Live Progress: Live status streaming while AI scrapes and parses thousands of data points.',
      'Beautiful Visual Dashboard: Responsive, dark-mode first UI featuring interactive scorecards and charts.'
    ],
    technicalFeatures: [
      'Next.js 15 App Router with React 19 concurrent features and Turbopack compiler acceleration.',
      'Clerk for seamless authentication and Clerk Billing for Stripe subscription tiers and feature gating (Starter vs Pro).',
      'Convex serverless backend providing reactive real-time database subscriptions and automated background mutation jobs.',
      'Bright Data SERP & Perplexity Scraper integration for comprehensive live web data harvesting.',
      'End-to-end type safety using TypeScript and strict Zod runtime schema validations.'
    ],
    aiAndDataFeatures: [
      'Smart Web Scraping using Bright Data Perplexity integration for anti-bot resilient research.',
      'Structured AI JSON output parsing with Zod schema validation ensuring zero hallucinations in critical metrics.',
      'Background Task Queue with Convex schedulers for long-running multi-page audits.',
      'Smart Retry Logic with exponential backoff for failed upstream provider requests without re-scraping.',
      'Evidence-Based Reports with direct source attribution, citation anchors, and quotes.'
    ]
  },
  {
    id: 2,
    slug: 'jewellery-shop',
    title: 'Jewellery Shop Luxury E-Commerce',
    subtitle: 'Ultra-Premium Luxury Jewellery Storefront & Custom Catalog Management',
    category: 'Web Development',
    shortDescription: 'High-end luxury e-commerce web platform for bespoke jewellery, interactive 360 preview, custom cart, and secure payment checkout.',
    fullDescription: 'A bespoke luxury digital storefront crafted for high-end jewellery retail. Features immersive product visualization, high-resolution gemstone galleries, ring customizer, real-time gold/diamond rate calculation, wishlist management, and secure multi-currency checkout.',
    githubUrl: 'https://github.com/paviontechnologies/Jwellery-shop',
    year: '2025',
    client: 'Fine Jewellery Retailer',
    role: 'Full-Stack Web Design & Development',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-amber-500 via-rose-500 to-amber-700',
    accentColor: '#f59e0b',
    languages: ['TypeScript', 'JavaScript', 'HTML5', 'Tailwind CSS'],
    frameworks: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Lucide React'],
    databasesAndCloud: ['PostgreSQL / Supabase', 'Stripe & Razorpay', 'AWS S3 (Image CDN)', 'Vercel Edge'],
    stats: [
      { label: 'Page Load', value: '0.8s' },
      { label: 'Mobile Optimized', value: '100%' },
      { label: 'Checkout Conversion', value: '+42%' },
      { label: 'Design Tier', value: 'Ultra Luxury' }
    ],
    userFeatures: [
      'Interactive Luxury Catalog with category filtering (Rings, Necklaces, Diamonds, Gold, Custom sets).',
      'High-Resolution Zoom & 360 Product Media Gallery with dynamic gemstone reflection effects.',
      'Real-Time Price Adjustments based on current bullion market rates and carat customizations.',
      'Cart & Secure Checkout with instant OTP login, address autosuggest, and multi-gateway payments.',
      'Customer Wishlist, Order History Tracking, and automated WhatsApp invoice notifications.'
    ],
    technicalFeatures: [
      'Server-side rendered (SSR) product pages for lightning-fast Core Web Vitals and top SEO ranking.',
      'Optimized image delivery pipeline with WebP formats and progressive lazy-loading.',
      'State management for persistent shopping carts across guest and logged-in user sessions.',
      'Role-based merchant admin dashboard for inventory tracking, price updates, and order status handling.'
    ]
  },
  {
    id: 3,
    slug: 'bookmytrip',
    title: 'BookMyTrip Travel & Booking Platform',
    subtitle: 'Unified Multi-Modal Travel & Hospitality Reservation Engine',
    category: 'Web Development',
    shortDescription: 'All-in-one travel booking application for hotels, buses, trains, and curated vacation packages with real-time seat selection.',
    fullDescription: 'BookMyTrip is a modern travel booking engine that unifies hotel reservations, bus ticket booking, train journeys, and holiday packages into a single cohesive interface. Built for high search volume and friction-free mobile booking with interactive seat selection and route optimization.',
    githubUrl: 'https://github.com/paviontechnologies/Bookmytrip',
    year: '2025',
    client: 'Travel & Tourism Operator',
    role: 'Full-Stack Engineering & UX Architecture',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-cyan-600 via-teal-600 to-blue-600',
    accentColor: '#00C2FF',
    languages: ['JavaScript', 'TypeScript', 'Node.js', 'CSS3'],
    frameworks: ['React', 'Express.js', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion'],
    databasesAndCloud: ['MongoDB Atlas', 'Redis Caching', 'Cloudinary CDN', 'Google Maps API'],
    stats: [
      { label: 'Booking Speed', value: '3 Clicks' },
      { label: 'Transport Modes', value: 'Hotel, Bus, Train' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'API Latency', value: '< 120ms' }
    ],
    userFeatures: [
      'Unified Search Bar for Hotels, Buses, Trains, and complete Holiday packages.',
      'Interactive Seat Layouts with real-time berth and seat selection for buses and trains.',
      'Smart Hotel Filters: Price slider, star ratings, amenities, free cancellation, and proximity maps.',
      'Instant E-Ticket Generation with printable PDF voucher and QR code scanner check-in.',
      'Multi-currency checkout and transparent fare breakdowns with promo code validation.'
    ],
    technicalFeatures: [
      'High-throughput search engine with Redis caching layer to handle high query surges.',
      'Integration with map APIs for route plotting, distance calculation, and landmark proximity.',
      'Secure payment processing with webhook verification to prevent duplicate bookings.',
      'Automated email & SMS confirmation pipelines with itinerary attachments.'
    ]
  },
  {
    id: 4,
    slug: 'crm-ai',
    title: 'CRM-AI Intelligent Sales CRM',
    subtitle: 'Agentic AI-Powered Enterprise Customer Relationship Management & Outreach Engine',
    category: 'AI & Machine Learning',
    shortDescription: 'Autonomous CRM with Claude tool-use AI assistant, lead intelligence, intent scoring, Kanban deals, and automated multi-channel outreach.',
    fullDescription: 'CRM-AI is a next-generation enterprise CRM designed from the ground up around Autonomous AI Agents. Featuring a floating assistant on every page powered by Anthropic Claude tool-use, CRM-AI takes actions on behalf of the sales rep: scoring leads, scheduling tasks, drafting outreach, and updating deals automatically in natural language.',
    githubUrl: 'https://github.com/paviontechnologies/CRM-AI',
    year: '2025',
    client: 'Enterprise Sales Teams / B2B SaaS',
    role: 'Autonomous AI Architecture & Lead Engine',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-purple-600 via-indigo-700 to-pink-600',
    accentColor: '#a855f7',
    languages: ['TypeScript', 'Python', 'SQL', 'Bash'],
    frameworks: ['Next.js 14/15', 'React', 'Tailwind CSS', 'Anthropic Claude 3.5 Sonnet API', 'Zod', 'Prisma ORM'],
    databasesAndCloud: ['PostgreSQL', 'Redis Queue', 'SMTP / SendGrid', 'Stripe Multi-tier Subscriptions'],
    stats: [
      { label: 'Rep Time Saved', value: '4.5 hrs/day' },
      { label: 'Lead Scoring', value: 'Instant AI' },
      { label: 'Outreach Channels', value: 'Email, WhatsApp, LinkedIn' },
      { label: 'RBAC Roles', value: '4 Levels' }
    ],
    userFeatures: [
      'Agentic Floating Assistant: Takes real actions via Claude tool-use (search leads, score deals, create tasks, move pipelines).',
      'AI Lead Generation & Intent Scoring: Generates targeted leads by industry/city and calculates ICP match, urgency, and budget.',
      'Drag-and-Drop Kanban Deal Pipelines: Visual deal stages with optimistic UI updates and custom revenue forecasts.',
      'Multi-Step Automated Outreach: Email, WhatsApp, and LinkedIn sequences with custom step delays and 1x1 pixel open tracking.',
      'Complete Lead Timeline: Comprehensive activity logs, voice notes, tasks, messages, and document attachments.',
      'Enterprise Team Collaboration: Role-based permissions (SUPERADMIN, ADMIN, AGENT, VIEWER) and in-app notification bell.'
    ],
    technicalFeatures: [
      'Autonomous Claude 3.5 Tool-Use Engine with organization-level scoping and security authorization.',
      'Background campaign scheduler sending multi-step outreach batches over SMTP with smart throttling.',
      'Dynamic AI qualification prompts injected into scoring prompts for tailored business criteria.',
      'Stripe subscription metering with plan tiers, seats management, and superadmin tenant monitoring.'
    ]
  },
  {
    id: 5,
    slug: 'pilot-ai',
    title: 'Pilot-AI Aviation Training Simulator',
    subtitle: 'Specialized Generative AI Copilot & Exam Preparation for Aviation Students',
    category: 'AI & Machine Learning',
    shortDescription: 'Refined AI aviation training copilot and exam prep platform for student pilots with subscription-based scenario simulations.',
    fullDescription: 'Pilot-AI is an intelligent aviation training platform engineered specifically for aspiring commercial and private pilots. By fine-tuning large language models on aviation regulations, FAA/DGCA syllabus, cockpit procedures, and METAR/TAF weather briefings, it provides student pilots with a 24/7 personal flight instructor copilot.',
    githubUrl: 'https://github.com/paviontechnologies/pilot_ai',
    year: '2025',
    client: 'Aviation Cadets & Flight Schools',
    role: 'Aviation Domain AI Modeling & Platform Dev',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2094&q=80',
    gradient: 'from-sky-500 via-blue-600 to-indigo-800',
    accentColor: '#0284c7',
    languages: ['Python', 'TypeScript', 'JavaScript'],
    frameworks: ['React', 'FastAPI', 'PyTorch', 'LangChain', 'Tailwind CSS'],
    databasesAndCloud: ['PostgreSQL', 'Pinecone Vector DB', 'AWS ECS', 'Stripe Billing'],
    stats: [
      { label: 'Exam Accuracy', value: '98.6%' },
      { label: 'Domain Questions', value: '50k+' },
      { label: 'Model Tuning', value: 'Aviation Specific' },
      { label: 'Access', value: 'Subscription' }
    ],
    userFeatures: [
      'Interactive ATC Radio Simulator: Practice voice and text communications with realistic Air Traffic Control agents.',
      'FAA / DGCA Exam Readiness: Mock tests with instant step-by-step mathematical calculations and navigation formulas.',
      'Aviation Weather Decryption: Real-time METAR, TAF, and NOTAM analysis explained in plain language.',
      'Emergency Checklist Drills: Interactive procedural drills for in-flight anomalies, engine failures, and weather diversions.',
      'Subscription Tier Management: Tiered student plans with unlimited AI flight instructor chats.'
    ],
    technicalFeatures: [
      'Domain-adapted RAG pipeline indexing standard flight manuals (POH), aeronautical charts, and navigation manuals.',
      'Vector similarity search powered by Pinecone for fast context retrieval during student inquiries.',
      'FastAPI asynchronous microservice backend with streaming token responses.',
      'Role-based student progress analytics with weak-area identification heatmaps.'
    ]
  },
  {
    id: 6,
    slug: 'restaurant-management',
    title: 'Restaurant2 Enterprise ERP & POS',
    subtitle: 'All-In-One Restaurant Management, Live Ordering, POS & Accounting Solution',
    category: 'Enterprise ERP',
    shortDescription: 'Full-suite restaurant operational system covering live food ordering, table reservations, digital POS billing, inventory, and accounting.',
    fullDescription: 'Restaurant2 is a comprehensive restaurant operations platform built to manage modern dining establishments. From QR code table ordering and Kitchen Display Systems (KDS) to live billing, inventory stock deductions, and financial accounting reports, it streamlines entire restaurant workflows.',
    githubUrl: 'https://github.com/paviontechnologies/Restaurant2',
    year: '2025',
    client: 'Restaurant Chains & Hospitality',
    role: 'Full-Stack ERP & POS Architect',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-blue-500 via-[#1769FF] to-cyan-500',
    accentColor: '#1769FF',
    languages: ['TypeScript', 'JavaScript', 'Node.js', 'SQL'],
    frameworks: ['React', 'Express.js', 'Tailwind CSS', 'Socket.io', 'Chart.js'],
    databasesAndCloud: ['PostgreSQL / MySQL', 'Redis', 'Thermal Printer Bridge', 'AWS EC2'],
    stats: [
      { label: 'Order Processing', value: '< 2 sec' },
      { label: 'Table Turnaround', value: '+30%' },
      { label: 'Modules', value: 'POS, KDS, Accounting' },
      { label: 'Billing Support', value: 'GST & Thermal' }
    ],
    userFeatures: [
      'Digital QR Table Ordering: Customers scan to view dynamic menus with allergen badges and place orders directly.',
      'Real-Time Kitchen Display System (KDS): Live synchronized orders appearing instantly in kitchen stations.',
      'POS Billing & Split Invoices: Quick thermal printing, split bills, tips, and GST/Tax calculation.',
      'Table Reservation Management: Real-time floor plan layout with vacancy and reservation statuses.',
      'Automated Accounting & Ledger: Daily P&L, raw ingredient depletion tracking, employee payroll, and tax filings.'
    ],
    technicalFeatures: [
      'WebSocket architecture (Socket.io) ensuring zero-delay bi-directional updates between floor, POS, and kitchen.',
      'Thermal receipt printing integration via local hardware driver bridges.',
      'Multi-currency and dynamic tax engine configurable per regional regulatory standards.',
      'Comprehensive analytical reports on best-selling menu items, peak hours, and staff performance.'
    ]
  },
  {
    id: 7,
    slug: 'cctv-care-hub',
    title: 'CCTV Care Hub Security Management',
    subtitle: 'Enterprise Camera Infrastructure Monitoring, AI Motion Alerts & Maintenance Hub',
    category: 'Software Development',
    shortDescription: 'Camera surveillance & security management software for device health monitoring, automated maintenance tickets, and AI alerts.',
    fullDescription: 'CCTV Care Hub is a centralized security infrastructure management application built for commercial properties, smart campuses, and surveillance contractors. It provides live uptime monitoring for hundreds of IP cameras, automated fault diagnosis, AMC maintenance schedules, and AI threat detection alerts.',
    githubUrl: 'https://github.com/rahulbajediyal1/cctv-care-hub.git',
    year: '2025',
    client: 'Surveillance & Security Providers',
    role: 'IoT & Security Systems Engineering',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    accentColor: '#10b981',
    languages: ['TypeScript', 'JavaScript', 'Node.js', 'Python'],
    frameworks: ['React', 'Node.js', 'Tailwind CSS', 'OpenCV / AI Vision APIs', 'Framer Motion'],
    databasesAndCloud: ['MongoDB', 'MQTT Broker', 'WebRTC Video Gateway', 'Docker'],
    stats: [
      { label: 'Camera Uptime', value: '99.98%' },
      { label: 'Alert Latency', value: '< 500ms' },
      { label: 'Device Support', value: 'ONVIF & RTSP' },
      { label: 'Maintenance', value: 'Automated' }
    ],
    userFeatures: [
      'Centralized Camera Health Dashboard: Instant visual status of online/offline streams, bandwidth, and storage capacity.',
      'Automated Fault Detection: Auto-detects blind angles, video loss, network drops, and storage errors.',
      'AMC & Maintenance Ticketing: Automated work orders for field technicians with GPS check-ins and service logs.',
      'Real-Time Security Alerts: Push notifications for motion anomalies, perimeter breaches, and offline triggers.',
      'Customer Portal: Client view for surveillance health reports, SLA compliance scores, and service invoices.'
    ],
    technicalFeatures: [
      'RTSP and ONVIF stream health diagnostics over lightweight MQTT protocol pings.',
      'Background daemon processes regularly auditing storage arrays and NVR disk health.',
      'Role-based access control protecting video endpoints and sensitive camera location maps.'
    ]
  },
  {
    id: 8,
    slug: 'erp-task-management',
    title: 'Enterprise ERP & Task Management',
    subtitle: 'Unified Corporate Workflow, Task Collaboration, Attendance & Resource Allocation System',
    category: 'Enterprise ERP',
    shortDescription: 'Enterprise ERP platform unifying multi-department tasks, milestone tracking, employee attendance, and resource scheduling.',
    fullDescription: 'A modular Enterprise Resource Planning and Task Management platform designed for growing tech agencies and enterprises. Unifies task delegation, sprint tracking, employee biometric attendance, timesheet logging, client deliverables, and departmental budget tracking in one cohesive ecosystem.',
    githubUrl: 'https://github.com/rahulbajediyal1/ERP.git',
    year: '2025',
    client: 'Corporate Enterprises & Tech Teams',
    role: 'Enterprise Architecture & Full-Stack Dev',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-slate-700 via-indigo-900 to-slate-900',
    accentColor: '#4f46e5',
    languages: ['TypeScript', 'JavaScript', 'SQL'],
    frameworks: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'Prisma'],
    databasesAndCloud: ['PostgreSQL', 'Redis', 'AWS CloudWatch', 'Docker'],
    stats: [
      { label: 'Sprint Productivity', value: '+35%' },
      { label: 'Resource Visibility', value: 'Real-Time' },
      { label: 'Integrations', value: 'Slack, Email, HR' },
      { label: 'Architecture', value: 'Microservices' }
    ],
    userFeatures: [
      'Cross-Departmental Task Kanban & Gantt: Visualize sprint timelines, critical paths, and project bottlenecks.',
      'Employee Attendance & Timesheets: Daily clock-in/out logging, overtime calculation, and leave approval workflows.',
      'Resource & Workload Heatmap: Prevents employee burnout by balancing task allocations across engineering squads.',
      'Milestone & Budget Tracking: Live project burn rate, billing invoices, and deliverable status updates.',
      'Role-Based Executive Dashboards: Real-time high-level visibility for CXOs, Department Heads, and Project Managers.'
    ],
    technicalFeatures: [
      'Relational schema design with PostgreSQL ensuring strict audit trails on every task modification.',
      'Fast search indexing across thousands of corporate documents, tasks, and discussions.',
      'Automated email digests and webhook notifications for overdue tasks and approaching sprint deadlines.'
    ]
  },
  {
    id: 9,
    slug: 'ai-chatbot-platform',
    title: 'AI Telegram Automation Bot Platform',
    subtitle: 'Autonomous AI-Powered Telegram Bot Suite for Workflows, Trading Signals & Monetization',
    category: 'AI & Machine Learning',
    shortDescription: 'Scalable AI automated Telegram bot system with natural language commands, subscription paywalls, and workflow integrations.',
    fullDescription: 'An intelligent AI Telegram automation suite built for businesses, content creators, and crypto communities. Leverages LLMs to answer complex user questions, execute automated actions, broadcast segmented announcements, and gate premium features behind Telegram Stars and crypto payment gateways.',
    githubUrl: 'https://github.com/paviontechnologies/telegram-money-making-bot',
    year: '2025',
    client: 'Digital Communities & Fintech',
    role: 'Bot Architecture & AI Integration',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80',
    gradient: 'from-blue-500 via-sky-500 to-indigo-600',
    accentColor: '#38bdf8',
    languages: ['Python', 'TypeScript', 'Node.js'],
    frameworks: ['Python-Telegram-Bot', 'FastAPI', 'OpenAI API', 'LangChain', 'Tailwind CSS Dashboard'],
    databasesAndCloud: ['PostgreSQL', 'Redis', 'Telegram Stars API', 'Docker'],
    stats: [
      { label: 'Response Time', value: '< 400ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Concurrent Users', value: '10k+' },
      { label: 'Monetization', value: 'Automated' }
    ],
    userFeatures: [
      'Intelligent Natural Language Chat: Responds to complex user queries, commands, and customer support inquiries.',
      'Subscription Paywalls & Gated Channels: Automated payment verification with instant invite link generation.',
      'Automated Broadcast Sequences: Send targeted broadcast messages with rich interactive buttons and analytics.',
      'Interactive Inline Keyboards & Mini-Apps: WebApp integrations directly inside the Telegram chat window.',
      'Admin Monitoring Dashboard: Web-based control center to view active subscribers, revenue, and usage logs.'
    ],
    technicalFeatures: [
      'Asynchronous event loop handling thousands of concurrent Telegram webhook updates.',
      'Redis queue architecture preventing rate limits and ensuring guaranteed message delivery.',
      'Integration with OpenAI function calling to trigger external APIs, database lookups, and webhook alerts.'
    ]
  }
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
  return projectsData.find((p) => p.slug === slug || String(p.id) === slug);
};
