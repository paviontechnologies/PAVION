import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../Images/logo-white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-colors duration-300 ${
          scrolled
            ? 'bg-[#050508]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
            : 'bg-[#050508]/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 py-1 flex-shrink-0" data-cursor-hover>
                <img
                  className="h-7 sm:h-8 lg:h-8 xl:h-9 max-h-9 w-auto object-contain flex-shrink-0"
                  src={logoImage}
                  alt="Pavion Technologies"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 flex-shrink-0">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold transition-colors duration-300 group whitespace-nowrap flex-shrink-0 ${
                      active ? 'text-[#DB2777]' : 'text-zinc-300 hover:text-white'
                    }`}
                    data-cursor-hover
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span 
                      className={`absolute bottom-1.5 left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 h-[2px] bg-[#DB2777] transition-transform duration-300 origin-left ${
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
                className="ml-2.5 xl:ml-5 2xl:ml-6 px-4 xl:px-6 py-2 xl:py-2.5 text-xs xl:text-sm 2xl:text-[15px] font-extrabold rounded-full bg-[#DB2777] text-white hover:bg-[#DB2777]/90 transition-all duration-300 shadow-md shadow-[#DB2777]/20 whitespace-nowrap flex-shrink-0"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button - High z-index, native touch-optimized */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden relative z-[60] p-2.5 rounded-xl text-white bg-white/5 border border-white/10 active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none select-none cursor-pointer"
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
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-[95] bg-[#070A14] border-t border-white/10 overflow-y-auto overscroll-contain flex flex-col justify-between px-6 py-8 shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center gap-1.5 pt-2 w-full max-w-sm mx-auto">
              {navLinks.map((link) => {
                const active = isActive(link.href);
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