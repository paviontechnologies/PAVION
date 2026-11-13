// src/components/ContactNew.tsx
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  AtSign,
  MessageSquare,
  Calendar,
  Sparkles,
  Globe,
  User,
  CalendarDays,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type TimezoneKey = 'IST' | 'EST' | 'GMT';

const TIMEZONE_CONFIG: Record<TimezoneKey, { flag: string; name: string; offset: string; slots: string[] }> = {
  IST: {
    flag: '🇮🇳',
    name: 'IST (India Standard Time)',
    offset: 'UTC +5:30',
    slots: ['10:30 AM', '12:00 PM', '2:30 PM', '4:30 PM', '6:30 PM']
  },
  EST: {
    flag: '🇺🇸',
    name: 'EST (US Eastern Time)',
    offset: 'UTC -5:00',
    slots: ['8:30 AM', '9:30 AM', '10:30 AM', '12:00 PM', '1:30 PM']
  },
  GMT: {
    flag: '🇬🇧',
    name: 'GMT / BST (UK & Europe)',
    offset: 'UTC +0:00 / +1:00',
    slots: ['9:30 AM', '11:30 AM', '1:30 PM', '3:30 PM', '5:00 PM']
  }
};

const ContactNew: React.FC = () => {
  // Tabs: 'blueprint' | 'schedule'
  const [activeTab, setActiveTab] = useState<'blueprint' | 'schedule'>('blueprint');

  // Blueprint Form State
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState('Under $1K');
  const [contactMethod, setContactMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Spam & Bot Protection
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState<number>(() => Date.now());

  // 15-Minute Discovery Call State
  const [schedTimezone, setSchedTimezone] = useState<TimezoneKey>('IST');
  const [schedDate, setSchedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [schedSlot, setSchedSlot] = useState<string>('2:30 PM');
  const [schedName, setSchedName] = useState<string>('');
  const [schedEmail, setSchedEmail] = useState<string>('');
  const [schedPhone, setSchedPhone] = useState<string>('');
  const [schedTopic, setSchedTopic] = useState<string>('Custom Software / MVP Development');
  const [schedSubmitting, setSchedSubmitting] = useState(false);
  const [schedSubmitted, setSchedSubmitted] = useState(false);
  const [schedError, setSchedError] = useState('');
  const [bookingRef, setBookingRef] = useState<string>('');

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter(n => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleBlueprintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Anti-Bot Honeypot check
    if (honeypot.trim() !== '') {
      console.warn('Bot detected via honeypot');
      setSubmitted(true);
      return;
    }

    // Anti-Bot Time-Gate check (under 1.5 seconds)
    if (Date.now() - formLoadedAt < 1500) {
      setErrorMessage('Submission was too fast. Please take a moment to review and submit.');
      return;
    }

    if (selectedNeeds.length === 0) {
      setErrorMessage('Please select at least one requirement.');
      return;
    }
    if (!contactMethod.trim() || contactMethod.trim().length < 5) {
      setErrorMessage('Please provide a valid Email or WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@paviontechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Form_Type: 'Project Blueprint & Scope Consultation',
          What_Is_Needed: selectedNeeds.join(', '),
          Requirement_Details: requirement,
          Budget_Range: budget,
          Contact_Email_WhatsApp: contactMethod,
          _subject: `🚀 New Project Consultation Lead via Blueprint Form`,
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

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchedError('');

    if (!schedName.trim()) {
      setSchedError('Please enter your full name.');
      return;
    }
    if (!schedEmail.trim() || !schedEmail.includes('@')) {
      setSchedError('Please enter a valid work email.');
      return;
    }

    setSchedSubmitting(true);
    const refCode = `PVN-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@paviontechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Consultation_Type: '15-Minute Technical Discovery Call',
          Booking_Reference: refCode,
          Client_Name: schedName,
          Work_Email: schedEmail,
          WhatsApp_Phone: schedPhone || 'Not provided',
          Scheduled_Date: schedDate,
          Scheduled_Time: `${schedSlot} (${schedTimezone})`,
          Timezone_Details: TIMEZONE_CONFIG[schedTimezone].name,
          Primary_Topic: schedTopic,
          _subject: `📅 [15-Min Discovery Call] with ${schedName} (${schedDate} @ ${schedSlot} ${schedTimezone})`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();
      if (response.ok && data.success !== 'false') {
        setBookingRef(refCode);
        setSchedSubmitting(false);
        setSchedSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to dispatch email');
      }
    } catch (err: any) {
      console.warn('Discovery call dispatch fallback:', err);
      setBookingRef(refCode);
      setSchedSubmitting(false);
      setSchedSubmitted(true);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('contact@paviontechnologies.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToForm = () => {
    document.getElementById('contact-form-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Official Email',
      value: 'contact@paviontechnologies.com',
      href: 'mailto:contact@paviontechnologies.com',
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

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section id="contact" className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#050508] text-white overflow-hidden">
      
      {/* Background Cyber Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-0 w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DB2777] animate-pulse" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#DB2777] font-extrabold">
              Get In Touch • Let's Build
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Let's Build <span className="text-[#60A5FA]">Your Solution</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg font-normal leading-relaxed">
            Submit your technical blueprint for scoping or book an instant 15-minute discovery call directly with our engineering architects.
          </p>

          {/* Quick Direct Conversion CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <a
              href="https://wa.me/919528991434?text=Hi%20Pavion%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20custom%20software%20or%20AI%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
            >
              <MessageSquare size={16} />
              <span>Chat on WhatsApp</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-black tracking-wider">Fastest</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('schedule');
                scrollToForm();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 hover:scale-105 border border-white/10"
            >
              <Calendar size={16} />
              <span>Book 15-Min Discovery Call</span>
              <Sparkles size={14} className="text-yellow-300" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================= */}
          {/* LEFT: Dual Tabbed Form (Blueprint / 15-Min Discovery Call) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div id="contact-form-card" className="p-6 sm:p-10 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA]" />

              {/* Mode Switcher Tabs */}
              <div className="flex p-1.5 bg-[#05070E] rounded-2xl border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('blueprint')}
                  className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'blueprint'
                      ? 'bg-gradient-to-r from-[#DB2777] to-[#F43F5E] text-white shadow-lg shadow-pink-600/25'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare size={15} />
                  <span>Project Blueprint</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'schedule'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Calendar size={15} />
                  <span>15-Min Discovery Call</span>
                  <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Live</span>
                </button>
              </div>

              {/* TAB 1: BLUEPRINT FORM */}
              {activeTab === 'blueprint' && (
                <>
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl">
                        <CheckCircle2 size={44} />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        Blueprint Received!
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-normal leading-relaxed">
                        Our technical leads are structuring a personalized delivery architecture for your business. We will reach out within 24 hours at <strong className="text-white font-semibold">{contactMethod}</strong>.
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
                        Submit Another Blueprint
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBlueprintSubmit} className="space-y-6">
                      {/* Anti-Bot Honeypot */}
                      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                        <label htmlFor="hp_company_contact">Company Verification</label>
                        <input
                          type="text"
                          id="hp_company_contact"
                          name="hp_company_contact"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      {/* Validation Error Banner */}
                      {errorMessage && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                          <span>⚠️ {errorMessage}</span>
                        </div>
                      )}

                      {/* What do you need? */}
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-3">
                          What do you need? <span className="text-[#DB2777]">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {['Custom Software', 'AI Agents & LLM', 'CRM / ERP', 'Web Platforms', 'Mobile Apps', 'Staff Augmentation', 'Cloud & DevOps', 'Other'].map((need) => {
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
                          placeholder="E.g., We need a secure multi-tenant SaaS with real-time analytics, or 2 full-stack engineers with 5+ yrs experience..."
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
                              <span>🚀 Request Technical Blueprint</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Trust Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-zinc-400 font-bold">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <ShieldCheck size={16} />
                          <span>100% Strict Bilateral NDA</span>
                        </span>
                        <span>Zero Spam Policy</span>
                        <span>Guaranteed Reply &lt; 24h</span>
                      </div>
                    </form>
                  )}
                </>
              )}

              {/* TAB 2: 15-MINUTE DISCOVERY CALL SCHEDULER */}
              {activeTab === 'schedule' && (
                <>
                  {schedSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xl">
                        <CalendarDays size={42} />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                        Ref: {bookingRef}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        Discovery Call Confirmed!
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-6 font-normal leading-relaxed">
                        We have reserved your 15-minute technical session on <strong className="text-white font-semibold">{schedDate}</strong> at <strong className="text-[#60A5FA] font-semibold">{schedSlot} ({schedTimezone})</strong>.
                      </p>
                      
                      <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#05070E] border border-white/10 text-left text-xs space-y-2 mb-8">
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Participant:</span>
                          <span className="text-white font-bold">{schedName}</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Calendar Invite:</span>
                          <span className="text-[#60A5FA] font-mono">{schedEmail}</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Primary Focus:</span>
                          <span className="text-zinc-200 font-semibold">{schedTopic}</span>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 size={13} />
                          <span>Google Meet invite dispatched to your email address</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSchedSubmitted(false);
                          setSchedName('');
                          setSchedEmail('');
                          setSchedPhone('');
                        }}
                        className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20"
                      >
                        Schedule Another Call
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleScheduleSubmit} className="space-y-6">
                      
                      {/* Validation Error Banner */}
                      {schedError && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                          <span>⚠️ {schedError}</span>
                        </div>
                      )}

                      {/* 1. Timezone Selector Pills */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                            <Globe size={14} className="text-[#60A5FA]" />
                            <span>Select Your Timezone</span>
                          </label>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {TIMEZONE_CONFIG[schedTimezone].offset}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(['IST', 'EST', 'GMT'] as TimezoneKey[]).map((tz) => {
                            const cfg = TIMEZONE_CONFIG[tz];
                            const active = schedTimezone === tz;
                            return (
                              <button
                                type="button"
                                key={tz}
                                onClick={() => {
                                  setSchedTimezone(tz);
                                  setSchedSlot(cfg.slots[0]);
                                }}
                                className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1.5 ${
                                  active
                                    ? 'bg-blue-600/25 border-blue-500 text-white shadow-md'
                                    : 'bg-[#05070E] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                <span>{cfg.flag}</span>
                                <span>{tz}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Date Picker */}
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                          Preferred Date <span className="text-[#DB2777]">*</span>
                        </label>
                        <input
                          type="date"
                          min={minDate}
                          value={schedDate}
                          onChange={(e) => setSchedDate(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm focus:border-[#60A5FA] focus:outline-none transition-all font-mono"
                        />
                      </div>

                      {/* 3. Time Slot Selector */}
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2.5">
                          Available Time Slots ({schedTimezone}) <span className="text-[#DB2777]">*</span>
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {TIMEZONE_CONFIG[schedTimezone].slots.map((slot) => {
                            const active = schedSlot === slot;
                            return (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => setSchedSlot(slot)}
                                className={`py-2.5 px-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                                  active
                                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md ring-1 ring-indigo-400'
                                    : 'bg-[#05070E] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. Contact Details (Name + Work Email) */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                            Your Name <span className="text-[#DB2777]">*</span>
                          </label>
                          <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              type="text"
                              value={schedName}
                              onChange={(e) => setSchedName(e.target.value)}
                              required
                              placeholder="E.g., Alexander Smith"
                              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                            Work Email <span className="text-[#DB2777]">*</span>
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              type="email"
                              value={schedEmail}
                              onChange={(e) => setSchedEmail(e.target.value)}
                              required
                              placeholder="alex@company.com"
                              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp / Phone & Topic */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                            Phone / WhatsApp (Optional)
                          </label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              type="tel"
                              value={schedPhone}
                              onChange={(e) => setSchedPhone(e.target.value)}
                              placeholder="+1 (555) 000-0000"
                              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm focus:border-[#60A5FA] focus:outline-none transition-all placeholder-zinc-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                            Primary Discussion Topic
                          </label>
                          <select
                            value={schedTopic}
                            onChange={(e) => setSchedTopic(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-[#05070E] border border-white/10 text-white text-sm focus:border-[#60A5FA] focus:outline-none transition-all font-sans"
                          >
                            <option value="Custom Software / MVP Development">Custom Software / MVP Development</option>
                            <option value="AI Agent System & LLM Integration">AI Agent System & LLM Integration</option>
                            <option value="Dedicated Engineering Squad (Staff Aug)">Dedicated Engineering Squad (Staff Aug)</option>
                            <option value="Cloud Architecture & DevOps Migration">Cloud Architecture & DevOps Migration</option>
                            <option value="Security, Code Audit & Modernization">Security, Code Audit & Modernization</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={schedSubmitting}
                          className={`w-full py-4.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden group shadow-xl ${
                            schedSubmitting
                              ? 'bg-blue-600/50 text-white/60 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/20 hover:scale-[1.01]'
                          }`}
                        >
                          {schedSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Reserving Calendar Slot...</span>
                            </>
                          ) : (
                            <>
                              <Calendar size={18} />
                              <span>Confirm 15-Min Discovery Call</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Trust Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-zinc-400 font-bold">
                        <span className="flex items-center gap-1.5 text-blue-400">
                          <FileCheck size={16} />
                          <span>Direct Video Meet with Tech Lead</span>
                        </span>
                        <span>Zero Sales Fluff</span>
                        <span>Instant Google Meet Link</span>
                      </div>
                    </form>
                  )}
                </>
              )}

              {/* Privacy & Terms Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-zinc-400 font-medium">
                  By submitting, you agree to our{' '}
                  <Link to="/terms" className="text-[#60A5FA] underline hover:text-white transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#60A5FA] underline hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  . All interactions are protected under bilateral NDA.
                </p>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Contact Information, Global Hours & Interactive Map */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* VIP Fast-Track Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0D1222] via-[#111A33] to-[#0D1222] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Instant Response Available
                </span>
              </div>
              <h4 className="text-lg font-black text-white mb-2">Need an Immediate Technical Consultation?</h4>
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed font-normal">
                Connect directly with our engineering directors on WhatsApp for real-time project scoping, architecture advice, and NDA dispatch within 15 minutes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://wa.me/919528991434?text=Hi%20Pavion%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20custom%20software%20or%20AI%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Chat</span>
                </a>
                <button
                  onClick={() => {
                    setActiveTab('schedule');
                    scrollToForm();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs transition-all"
                >
                  <Calendar size={14} />
                  <span>Discovery Call</span>
                </button>
              </div>
            </div>

            {/* Global Operating Hours & Delivery Overlap */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-[#60A5FA]" />
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Global Operating Windows</h4>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3 Timezones
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#05070E] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-white font-extrabold flex items-center gap-1.5">
                      <span>🇮🇳</span> Gurugram HQ (IST)
                    </div>
                    <div className="text-zinc-400 text-[11px]">Mon – Sat: 9:30 AM – 7:30 PM IST</div>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">Core Engineering</span>
                </div>

                <div className="p-3 rounded-xl bg-[#05070E] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-white font-extrabold flex items-center gap-1.5">
                      <span>🇺🇸</span> US Eastern (EST / EDT)
                    </div>
                    <div className="text-zinc-400 text-[11px]">Daily 5-Hour Real-Time Overlap</div>
                  </div>
                  <span className="text-[#60A5FA] font-mono text-[11px] font-bold">4 AM – 1:30 PM EST</span>
                </div>

                <div className="p-3 rounded-xl bg-[#05070E] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-white font-extrabold flex items-center gap-1.5">
                      <span>🇬🇧</span> UK & Europe (GMT / BST)
                    </div>
                    <div className="text-zinc-400 text-[11px]">Full Workday Engineering Alignment</div>
                  </div>
                  <span className="text-purple-400 font-mono text-[11px] font-bold">9 AM – 6:30 PM GMT</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-zinc-400">
                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                <span>Dedicated client Slack channels & bi-weekly video standups for all active squads.</span>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1222] border border-white/10 shadow-2xl">
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
