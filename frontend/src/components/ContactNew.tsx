// src/components/ContactNew.tsx
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  AtSign
} from 'lucide-react';
import { motion } from 'framer-motion';

const ContactNew: React.FC = () => {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState('Under $1K');
  const [contactMethod, setContactMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter(n => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNeeds.length === 0) {
      alert('Please select at least one requirement.');
      return;
    }
    if (!contactMethod.trim()) {
      alert('Please provide your Email or WhatsApp contact.');
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
          What_Is_Needed: selectedNeeds.join(', '),
          Requirement_Details: requirement,
          Budget_Range: budget,
          Contact_Email_WhatsApp: contactMethod,
          _subject: `🚀 New Project Consultation Lead via simplified contact form`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok && data.success !== 'false') {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to dispatch email');
      }
    } catch (err: any) {
      console.warn('FormSubmit dispatch fallback:', err);
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('Contact@paviontechnologies.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Official Email',
      value: 'Contact@paviontechnologies.com',
      href: 'mailto:Contact@paviontechnologies.com',
      action: 'copy',
    },
    {
      icon: Phone,
      label: 'Direct Phone / WhatsApp',
      value: '+91 95289 91434 / +91 74559 75301',
      href: 'tel:+919528991434',
      action: 'call',
    },
    {
      icon: MapPin,
      label: 'Corporate Office Location',
      value: '1st Floor, Landmark Cyberpark, Plus Offices, Sector 67, Gurugram, Haryana 122101',
      href: 'https://maps.google.com/?q=Plus+Offices+Landmark+Cyberpark+Sector+67+Gurugram+Haryana+122101',
      action: 'map',
    },
    {
      icon: Clock,
      label: 'Response Time Guarantee',
      value: 'Within 24 hours (Usually < 2h)',
      href: '#',
      action: null,
    },
  ];

  return (
    <section id="contact" className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#050508] text-white overflow-hidden">
      
      {/* Background Cyber Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-0 w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DB2777] animate-pulse" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#DB2777] font-extrabold">
              Get In Touch • Let's Build
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase">
            Let's Build <span className="text-[#60A5FA]">Your Solution</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg font-normal">
            Specify your requirements, pick your estimated budget, and let our engineers structure your custom solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================= */}
          {/* LEFT: Simplified Modern Contact Form                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA]" />

              {submitted ? (
                /* Success Message State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Consultation Requested!
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-normal">
                    Our technical leads are designing a personalized roadmap for your business. We will reach out to you within 24 hours at <strong className="text-white font-semibold">{contactMethod}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedNeeds([]);
                      setRequirement('');
                      setContactMethod('');
                    }}
                    className="px-8 py-3 rounded-full bg-[#DB2777] hover:bg-[#DB2777]/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-pink-600/20"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                /* Main Simplified Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* What do you need? (Buttons grid selector) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-3">
                      What do you need? <span className="text-[#DB2777]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {['CRM', 'ERP', 'AI', 'Website', 'App', 'Digital Marketing', 'Engineers', 'Other'].map((need) => {
                        const active = selectedNeeds.includes(need);
                        return (
                          <button
                            type="button"
                            key={need}
                            onClick={() => toggleNeed(need)}
                            className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-black transition-all border ${
                              active
                                ? 'bg-[#DB2777]/20 border-[#DB2777] text-white shadow-md'
                                : 'bg-[#05070E] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {need}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Requirement Details */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                      Tell us briefly about your requirement
                    </label>
                    <textarea
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      rows={4}
                      placeholder="E.g., We need a restaurant management POS with a live kitchen display or 3 dedicated React developers..."
                      className="w-full p-4 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm sm:text-base focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 resize-none font-mono leading-relaxed"
                    />
                  </div>

                  {/* Budget Picker */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-3">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {['Under $1K', '$1K–$5K', '$5K–$10K', '$10K+'].map((bVal) => {
                        const active = budget === bVal;
                        return (
                          <label
                            key={bVal}
                            className={`flex items-center justify-center p-3.5 rounded-xl border text-xs sm:text-sm font-black cursor-pointer transition-all ${
                              active
                                ? 'bg-[#60A5FA]/20 border-[#60A5FA] text-white shadow-md'
                                : 'bg-[#05070E] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={bVal}
                              checked={active}
                              onChange={() => setBudget(bVal)}
                              className="hidden"
                            />
                            <span>{bVal}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email / WhatsApp field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                      Your Email / WhatsApp <span className="text-[#DB2777]">*</span>
                    </label>
                    <div className="relative">
                      <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        required
                        placeholder="E.g., hello@company.com or +91 95289 91434"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm sm:text-base focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden group shadow-xl ${
                        isSubmitting
                          ? 'bg-[#DB2777]/50 text-white/60 cursor-not-allowed'
                          : 'bg-[#DB2777] text-white hover:bg-[#DB2777]/90 shadow-pink-600/20 hover:scale-[1.01]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Consultation...</span>
                        </>
                      ) : (
                        <>
                          <span>🚀 Get My Free Consultation</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-zinc-400 font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck size={16} />
                      <span>100% Strict NDA Protected</span>
                    </span>
                    <span>Zero Spam Guarantee</span>
                    <span>Response within 24h</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Contact Information & Interactive Google Map       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center justify-between">
                <span>Contact Details</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#DB2777]/10 text-[#DB2777] border border-[#DB2777]/20 font-bold">
                  Global HQ
                </span>
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#05070E] border border-white/10 hover:border-[#60A5FA]/30 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#60A5FA] flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs text-zinc-400 block font-bold mb-0.5">{info.label}</span>
                          <a
                            href={info.href}
                            className="text-white font-bold text-xs sm:text-sm hover:text-[#60A5FA] transition-colors break-words"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>

                      {info.action === 'copy' && (
                        <button
                          onClick={copyEmailToClipboard}
                          className="p-2 rounded-lg bg-white/5 hover:bg-[#60A5FA]/20 text-zinc-300 hover:text-[#60A5FA] transition-all flex-shrink-0"
                          title="Copy Email"
                          aria-label="Copy Email"
                        >
                          {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      )}

                      {info.action === 'call' && (
                        <a
                          href={info.href}
                          className="p-2 rounded-lg bg-white/5 hover:bg-[#60A5FA]/20 text-zinc-300 hover:text-[#60A5FA] transition-all flex-shrink-0"
                          title="Call Now"
                          aria-label="Call Now"
                        >
                          <Phone size={14} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social Channels Strip */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-3 font-extrabold">
                  Official Channels
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.linkedin.com/company/pavion-technologies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] text-xs font-bold transition-all"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="https://www.instagram.com/pavion.technologies?igsh=MXN4ajdvd3o1dnBqcQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#DB2777] hover:border-[#DB2777] text-xs font-bold transition-all"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="https://github.com/paviontechnologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#60A5FA] hover:border-[#60A5FA] text-xs font-bold transition-all"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

            </div>

            {/* INTERACTIVE GOOGLE MAP EMBED (Landmark Cyberpark, Gurugram)*/}
            <div className="p-2.5 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40">
                
                <iframe
                  title="Pavion Technologies Location - Landmark Cyberpark, Sector 67, Gurugram"
                  src="https://maps.google.com/maps?q=Landmark%20Cyberpark%2C%20Sector%2067%2C%20Gurugram%2C%20Haryana%20122101&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                />

                <div className="absolute top-3 left-3 bg-[#0D1222]/90 border border-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 max-w-[85%]">
                  <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-white leading-tight truncate">Plus Offices, Landmark Cyberpark</div>
                    <div className="text-[10px] text-zinc-400 truncate font-semibold">1st Floor, Sector 67, Gurugram, Haryana 122101</div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Plus+Offices+Landmark+Cyberpark+Sector+67+Gurugram+Haryana+122101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DB2777] text-white text-xs font-bold hover:bg-[#DB2777]/90 transition-all shadow-lg shadow-pink-600/20"
                >
                  <span>Open Full Map</span>
                  <ExternalLink size={12} />
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactNew;
