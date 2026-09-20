import { Twitter, Linkedin, Instagram, Facebook, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const siteMapLinks = [
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'AI', href: '#ai', isRoute: false },
    { name: 'Portfolio', href: '#portfolio', isRoute: false },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
  ];

  const serviceLinks = [
    { name: 'Web Development', href: '#services' },
    { name: 'Mobile Apps', href: '#services' },
    { name: 'AI Solutions', href: '#ai' },
    { name: 'Cloud Services', href: '#services' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Services', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/company/pavion-technologies/', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ==', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-[#FFFFFF] text-white relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />

      {/* Newsletter Section - Minimal */}
      <div className="border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-indigo-400 font-medium block mb-3">Newsletter</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay in the loop</h3>
              <p className="text-gray-400 font-light">Get updates on our latest work and insights.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.1] focus:border-indigo-400/50 focus:outline-none text-white placeholder-gray-500 transition-all duration-500 text-sm"
              />
              <button 
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-500 whitespace-nowrap text-sm"
                data-cursor-hover
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Minimal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <img src={logo} alt="Pavion Technologies" className="w-36 object-contain mb-6" />
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm font-light text-sm">
              Empowering businesses with innovative digital solutions that drive growth and create lasting impact.
            </p>
            <div className="space-y-4">
              <a href="mailto:Contact@paviontechnologies.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                <Mail size={14} className="text-indigo-400" />
                <span>Contact@paviontechnologies.com</span>
              </a>
              <a href="tel:+917455975301" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                <Phone size={14} className="text-indigo-400" />
                <span>+91 7455975301</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" />
                <span>Landmark Cyber Park, Sector 67, Gurugram, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-purple-400 font-medium mb-6">Navigation</h3>
            <ul className="space-y-3">
              {siteMapLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-purple-400 font-medium mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-purple-400 font-medium mb-6">Legal</h3>
            <ul className="space-y-3 mb-10">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-500 text-sm" data-cursor-hover>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-purple-400 font-medium mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-2.5 rounded-full border border-white/[0.1] text-gray-400 hover:text-white hover:border-indigo-400/50 transition-all duration-500"
                  aria-label={link.label}
                  data-cursor-hover
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Minimal */}
      <div className="border-t border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left font-light">
              © {currentYear} Pavion Technologies
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-500 group"
              data-cursor-hover
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
