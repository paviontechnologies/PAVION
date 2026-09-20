// src/components/FooterNew.tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import logoWhite from '../Images/logo-white.png';
import Marquee from './Marquee';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const FooterNew = () => {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate big text
      gsap.to(bigTextRef.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'AI Solutions',
    'Digital Marketing',
    'Cloud Services',
    'UI/UX Design',
    'DevOps',
  ];

  const socialLinks = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919528991434?text=Hi%20Pavion%20Technologies%2C%20I%20want%20to%20discuss%20a%20project.',
      colorClass: 'hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.01 11.758 1.01c-5.452 0-9.88 4.373-9.883 9.802-.001 1.73.473 3.41 1.37 4.915l-.994 3.634 3.73-.977zm11.587-5.45c-.299-.15-1.767-.872-2.04-.971-.272-.1-.47-.15-.667.15-.198.3-.767.971-.94 1.171-.173.2-.347.225-.646.075-.3-.15-1.266-.467-2.41-1.485-.89-.795-1.49-1.778-1.664-2.078-.173-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.667-1.609-.913-2.203-.24-.579-.485-.5-.667-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.767-.722 2.015-1.422.247-.699.247-1.3.173-1.422-.073-.125-.27-.199-.57-.349z" />
        </svg>
      )
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com',
      colorClass: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      colorClass: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ==',
      colorClass: 'hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/pavion-technologies/',
      colorClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    }
  ];

  return (
    <footer ref={footerRef} className="relative bg-[#050508] border-t border-white/10 overflow-hidden text-white/90">
      {/* Big scrolling text */}
      <div className="absolute top-1/3 left-0 w-full overflow-hidden pointer-events-none">
        <div 
          ref={bigTextRef}
          className="whitespace-nowrap text-[15vw] font-black text-white/[0.015] tracking-[-0.05em]"
        >
          PAVION TECHNOLOGIES • DIGITAL INNOVATION • BUILD THE FUTURE •
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-[#60A5FA] font-extrabold block mb-6">
                Let's Create Together
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 uppercase">
                Have a project in mind?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal">
                We'd love to hear about it. Get in touch and let's make something amazing.
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-6 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full text-base sm:text-lg font-black transition-all duration-500 group shadow-lg"
                data-cursor-hover
              >
                <span>Start a Project</span>
                <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="py-8 border-b border-white/10 bg-white/[0.02]">
        <Marquee 
          items={['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'AI/ML', 'Tailwind']}
          speed={30}
          className="text-sm font-bold text-zinc-300"
          separator={<span className="mx-6 text-[#60A5FA]/20">◆</span>}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-12">

          {/* Brand & Compact Vertical Logo */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4" data-cursor-hover>
              <img 
                src={logoWhite} 
                alt="Pavion Technologies" 
                className="h-7 sm:h-8 max-h-8 w-auto object-contain" 
                style={{ height: '30px', width: 'auto' }}
              />
            </Link>
            <p className="text-zinc-300 leading-relaxed mb-8 max-w-sm font-normal text-sm sm:text-base">
              Empowering businesses with innovative digital solutions that drive growth and create lasting impact.
            </p>
            <div className="space-y-4 min-w-0">
              <a href="mailto:Contact@paviontechnologies.com" className="flex items-center gap-3 text-zinc-300 hover:text-[#60A5FA] transition-colors group min-w-0 font-semibold" data-cursor-hover>
                <Mail size={18} className="text-[#60A5FA]" />
                <span className="text-sm sm:text-base break-all">Contact@paviontechnologies.com</span>
              </a>
              <a href="tel:+919528991434" className="flex items-center gap-3 text-zinc-300 hover:text-[#60A5FA] transition-colors font-semibold" data-cursor-hover>
                <Phone size={18} className="text-[#60A5FA]" />
                <span className="text-sm sm:text-base">+91 95289 91434</span>
              </a>
              <a href="tel:+917455975301" className="flex items-center gap-3 text-zinc-300 hover:text-[#60A5FA] transition-colors font-semibold" data-cursor-hover>
                <Phone size={18} className="text-[#60A5FA]" />
                <span className="text-sm sm:text-base">+91 74559 75301</span>
              </a>
              <a 
                href="https://maps.google.com/?q=Plus+Offices+Landmark+Cyberpark+Sector+67+Gurugram+Haryana+122101" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 text-zinc-300 hover:text-[#60A5FA] transition-colors group font-semibold"
                data-cursor-hover
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#60A5FA] transition-colors" />
                <span className="text-sm sm:text-base">1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#60A5FA] font-extrabold mb-6">
              Navigation
            </h3>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-sm sm:text-base font-bold underline-grow"
                    data-cursor-hover
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#60A5FA] font-extrabold mb-6">
              Services
            </h3>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="text-white/80 hover:text-white transition-colors text-sm sm:text-base font-bold"
                    data-cursor-hover
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter / Mail Box */}
          <div className="col-span-2">
            <h3 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#60A5FA] font-extrabold mb-6">
              Stay Connected
            </h3>
            
            {/* Interactive Newsletter / Mail Box */}
            <div className="mb-8 p-5 rounded-2xl bg-[#0D1222] border border-white/10 shadow-lg">
              <span className="text-xs font-mono uppercase tracking-wider text-[#DB2777] font-extrabold block mb-1.5 flex items-center gap-1.5">
                <Mail size={14} />
                <span>Newsletter Dispatch</span>
              </span>
              <p className="text-zinc-300 text-xs sm:text-sm mb-4 font-normal">
                Subscribe for tech insights, AI breakthroughs, and product updates.
              </p>

              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm py-2">
                  <CheckCircle2 size={16} />
                  <span>Subscribed! Check your inbox soon 🎉</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full min-w-0 flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-[#60A5FA] focus:outline-none text-white placeholder-zinc-500 text-xs sm:text-sm transition-all"
                    data-cursor-hover
                  />
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black transition-all text-xs sm:text-sm shadow-md shadow-pink-600/20 active:scale-95 flex-shrink-0"
                    data-cursor-hover
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Social Links (WhatsApp, Twitter/X, Facebook, Instagram, LinkedIn) */}
            <h4 className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-bold mb-3.5">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 transition-all duration-300 shadow-md ${social.colorClass}`}
                  aria-label={social.label}
                  title={social.label}
                  data-cursor-hover
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm sm:text-base text-zinc-400 text-center md:text-left font-semibold">
              <span>© {currentYear} Pavion Technologies</span>
              <span className="hidden md:block">•</span>
              <Link to="/contact" className="hover:text-white transition-colors" data-cursor-hover>Contact Us</Link>
              <span className="hidden md:block">•</span>
              <Link to="/careers" className="hover:text-white transition-colors" data-cursor-hover>Careers</Link>
            </div>

            <MagneticButton
              onClick={scrollToTop}
              className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group font-bold"
              strength={0.3}
            >
              <span className="text-sm sm:text-base">Back to top</span>
              <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#60A5FA] group-hover:shadow-md transition-all">
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
