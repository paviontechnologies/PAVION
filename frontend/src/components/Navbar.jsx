import { Menu, X, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../Images/logo-white.png';

const serviceDropdownLinks = [
  { name: 'AI Development', href: '/ai-development-company', desc: 'Custom LLMs, Agents & Automation' },
  { name: 'Custom Software', href: '/custom-software-development', desc: 'Enterprise Cloud & Web Systems' },
  { name: 'Web Development', href: '/web-development-company', desc: 'High-Performance Web Platforms' },
  { name: 'CRM Development', href: '/crm-development', desc: 'Sales Pipelines & Lead Automation' },
  { name: 'ATS Software', href: '/ats-software-development', desc: 'Applicant Tracking & AI Parsing' },
  { name: 'ERP Software', href: '/erp-software-development', desc: 'Operations, Inventory & Finance' },
  { name: 'DevOps & Cloud', href: '/devops-cloud-services', desc: 'Kubernetes, AWS & CI/CD' },
  { name: 'IT Staffing Squads', href: '/it-staffing', desc: 'Top 1% Engineers in 48 Hours' },
];

const industryDropdownLinks = [
  { name: 'Healthcare & EHR', href: '/healthcare-software-development', desc: 'HIPAA & Telemedicine' },
  { name: 'Real Estate & PropTech', href: '/real-estate-software', desc: 'MLS/IDX Portals & CRM' },
  { name: 'Logistics & Fleet', href: '/logistics-software', desc: 'TMS, WMS & Fleet GPS' },
  { name: 'Startup MVP', href: '/startup-mvp-development', desc: 'Launch in 6 to 8 Weeks' },
  { name: 'US Staffing Tech', href: '/us-staffing-software', desc: 'VMS & Blinded Packets' },
  { name: 'Restaurant & POS', href: '/restaurant-management-software', desc: 'Cloud POS & Kitchen ERP' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'IT Staffing', href: '/it-staffing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#050508]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
            : 'bg-[#050508]/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 py-1" data-cursor-hover>
                <img
                  className="h-8 sm:h-9 max-h-9 w-auto object-contain"
                  style={{ height: '34px', width: 'auto' }}
                  src={logoImage}
                  alt="Pavion Technologies"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.name === 'Services') {
                  return (
                    <div 
                      key={link.name} 
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        to={link.href}
                        className={`relative px-3.5 py-2.5 text-[15px] font-bold transition-colors duration-300 group inline-flex items-center gap-1.5 ${
                          active ? 'text-[#DB2777]' : 'text-zinc-300 hover:text-white'
                        }`}
                        data-cursor-hover
                      >
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-200 text-zinc-400 group-hover:text-white ${
                            servicesDropdownOpen ? 'rotate-180 text-[#60A5FA]' : ''
                          }`} 
                        />
                        <span 
                          className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#DB2777] transition-transform duration-300 origin-left ${
                            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`} 
                        />
                      </Link>

                      {/* Desktop Mega Dropdown Panel */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full -left-28 w-[640px] p-6 rounded-3xl bg-[#0D1222]/98 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-6">
                              {/* Core Engineering Services */}
                              <div>
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DB2777] font-black">
                                    Core Services
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {serviceDropdownLinks.map((item) => (
                                    <Link
                                      key={item.href}
                                      to={item.href}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="block p-2 rounded-xl hover:bg-white/5 transition-all group/item"
                                    >
                                      <div className="text-xs font-bold text-white group-hover/item:text-[#60A5FA] transition-colors flex items-center justify-between">
                                        <span>{item.name}</span>
                                        <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#60A5FA]" />
                                      </div>
                                      <div className="text-[10px] text-zinc-400 truncate font-normal mt-0.5">
                                        {item.desc}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Industry Solutions */}
                              <div>
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#60A5FA] font-black">
                                    Industry Solutions
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {industryDropdownLinks.map((item) => (
                                    <Link
                                      key={item.href}
                                      to={item.href}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="block p-2 rounded-xl hover:bg-white/5 transition-all group/item"
                                    >
                                      <div className="text-xs font-bold text-white group-hover/item:text-[#DB2777] transition-colors flex items-center justify-between">
                                        <span>{item.name}</span>
                                        <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#DB2777]" />
                                      </div>
                                      <div className="text-[10px] text-zinc-400 truncate font-normal mt-0.5">
                                        {item.desc}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Mega Menu Footer Banner */}
                            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                              <Link
                                to="/services"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="font-bold text-[#60A5FA] hover:text-white transition-colors inline-flex items-center gap-1.5"
                              >
                                <span>Explore All Capabilities</span>
                                <ArrowRight size={13} />
                              </Link>
                              <span className="text-[11px] text-zinc-400 font-medium">Enterprise Pods • 100% IP Transfer</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-4 py-2.5 text-[15px] font-bold transition-colors duration-300 group ${
                      active ? 'text-[#DB2777]' : 'text-zinc-300 hover:text-white'
                    }`}
                    data-cursor-hover
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span 
                      className={`absolute bottom-1.5 left-4 right-4 h-[2px] bg-[#DB2777] transition-transform duration-300 origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                  </Link>
                );
              })}

              {/* CTA */}
              <Link
                to="/contact"
                data-cursor-hover
                className="ml-4 lg:ml-6 px-6 py-2.5 text-[15px] font-extrabold rounded-full bg-[#DB2777] text-white hover:bg-[#DB2777]/90 transition-all duration-300 shadow-md shadow-[#DB2777]/20"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button - High z-index, native touch-optimized */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden relative z-[60] p-2.5 rounded-xl text-white bg-white/5 border border-white/10 active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none select-none cursor-pointer"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer - Sibling to nav to ensure 100% viewport coordinates on iOS Safari */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-[#070A14] border-t border-white/10 overflow-y-auto overscroll-contain flex flex-col justify-between px-6 py-8 shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center gap-1.5 pt-2 w-full max-w-sm mx-auto">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.name === 'Services') {
                  return (
                    <div key={link.name} className="w-full">
                      <div className="flex items-center gap-1">
                        <Link
                          to={link.href}
                          className={`flex-1 text-center py-3 px-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                            active 
                              ? 'text-white bg-[#DB2777]/20 border border-[#DB2777]/30 shadow-md' 
                              : 'text-zinc-300 hover:text-white hover:bg-white/5'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white active:bg-white/10"
                          aria-label="Toggle services list"
                        >
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-200 ${mobileServicesExpanded ? 'rotate-180 text-[#DB2777]' : ''}`} 
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion */}
                      {mobileServicesExpanded && (
                        <div className="mt-2 p-3 rounded-2xl bg-[#0D1222] border border-white/10 space-y-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#DB2777] font-bold block mb-1.5 px-2">
                              Core Services
                            </span>
                            <div className="grid grid-cols-1 gap-1">
                              {serviceDropdownLinks.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 block"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#60A5FA] font-bold block mb-1.5 px-2">
                              Industry Solutions
                            </span>
                            <div className="grid grid-cols-1 gap-1">
                              {industryDropdownLinks.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 block"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`w-full text-center py-3 px-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                      active 
                        ? 'text-white bg-[#DB2777]/20 border border-[#DB2777]/30 shadow-md' 
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <Link
                to="/contact"
                className="mt-5 inline-flex w-full items-center justify-center px-8 py-3.5 text-base font-black text-white bg-[#DB2777] hover:bg-[#DB2777]/90 rounded-full shadow-lg shadow-pink-600/20"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Drawer Bottom Quick Contacts */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                Quick Support & Inquiries
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-zinc-300">
                <a href="tel:+919528991434" className="hover:text-[#60A5FA] transition-colors">
                  📞 +91 95289 91434
                </a>
                <span className="text-zinc-600">•</span>
                <a href="tel:+917455975301" className="hover:text-[#60A5FA] transition-colors">
                  📞 +91 74559 75301
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;