// src/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, X, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'pavion_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        // Delay slightly for smooth non-intrusive entrance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage access restricted in some private modes
    }
  }, []);

  useEffect(() => {
    // Listen for manual trigger from footer "Cookie Preferences" button
    const handleOpen = () => setIsVisible(true);
    window.addEventListener('pavion_open_cookie_consent', handleOpen);
    return () => window.removeEventListener('pavion_open_cookie_consent', handleOpen);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      window.dispatchEvent(new CustomEvent('pavion_consent_updated', { detail: { analytics: true } }));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
      window.dispatchEvent(new CustomEvent('pavion_consent_updated', { detail: { analytics: false } }));
    } catch (e) {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Cookie Consent Banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[99999] select-none"
        >
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090D1A]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80 text-white space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#DB2777]/15 border border-[#DB2777]/30 text-[#DB2777]">
                  <Cookie size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wide text-white">
                    Privacy & Cookie Choices
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Zero Ad-Trackers • GDPR & CCPA Compliant
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDecline}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close cookie banner and decline non-essential cookies"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              We use essential cookies to maintain system security and anonymized speed telemetry to deliver a lightning-fast experience. We never sell your data or train public AI models on client repositories.
            </p>

            {/* Privacy Link */}
            <div className="flex items-center gap-1.5 text-xs text-[#60A5FA]">
              <ShieldCheck size={14} className="text-[#60A5FA]" />
              <Link to="/privacy" className="hover:underline font-semibold flex items-center gap-1">
                <span>Read our Privacy Policy & NDA Guarantee</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#DB2777] to-[#60A5FA] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-pink-600/20 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Accept All</span>
              </button>

              <button
                type="button"
                onClick={handleDecline}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-bold text-xs transition-all active:scale-95"
              >
                Essential Only
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
