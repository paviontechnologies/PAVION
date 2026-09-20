import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../Images/logo-white.png';

const MotionLink = motion(Link);

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050508]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
          : 'bg-[#050508]/80 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-3 py-1" data-cursor-hover>
              <img
                className="h-8 sm:h-9 max-h-9 w-auto object-contain"
                style={{ height: '34px', width: 'auto' }}
                src={logoImage}
                alt="Pavion Technologies"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
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
              className="ml-6 px-6 py-2.5 text-[15px] font-extrabold rounded-full bg-[#DB2777] text-white hover:bg-[#DB2777]/90 transition-all duration-300 shadow-md shadow-[#DB2777]/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[120] p-2 text-white"
            data-cursor-hover
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 5rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute top-full left-0 right-0 z-[100] overflow-y-auto bg-[#070A14]/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl"
          >
            <div className="flex min-h-full flex-col justify-between px-6 py-8">
              <div className="flex flex-col items-center justify-center gap-1 pt-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`w-full max-w-xs text-center py-3.5 px-4 rounded-2xl text-xl font-bold transition-all duration-200 ${
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
                  className="mt-6 inline-flex w-full max-w-xs items-center justify-center px-8 py-4 text-base font-black text-white bg-[#DB2777] hover:bg-[#DB2777]/90 rounded-full shadow-lg shadow-pink-600/20"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;