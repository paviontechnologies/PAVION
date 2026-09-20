// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import ContactNew from '../components/ContactNew';

const faqs = [
  {
    q: 'What is the typical timeframe for a project?',
    a: 'Timelines vary based on scope: MVP web applications typically take 4-8 weeks, while complex enterprise systems or custom AI integrations may take 3-6 months. We work in 2-week agile sprints with continuous deployments.'
  },
  {
    q: 'How do you handle project confidentiality and IP?',
    a: 'We sign strict Non-Disclosure Agreements (NDAs) prior to discussing any proprietary ideas. Upon project completion and final milestone, 100% of the Intellectual Property and code repository ownership is transferred to you.'
  },
  {
    q: 'Can you work with our existing development team?',
    a: 'Absolutely. We frequently integrate with client engineering teams as specialized technical leads, full-stack squads, or dedicated AI architecture specialists.'
  },
  {
    q: 'What engagement models do you offer?',
    a: 'We offer fixed-scope milestone delivery for defined products, time & material for evolving projects, and dedicated team retainers for ongoing enterprise development.'
  }
];

const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEO 
        title="Contact Us - Pavion Technologies | Hire Top Developers & AI Experts"
        description="Get in touch with Pavion Technologies. Request a free project estimate, schedule a technical consultation, or discuss your software, app, or AI project."
        canonical="https://paviontechnologies.com/contact"
        ogUrl="https://paviontechnologies.com/contact"
      />

      {/* Main Interactive Contact Component (Form + Info + Map) */}
      <ContactNew />

      {/* FAQs Section */}
      <section className="relative py-28 bg-[#080B14] border-t border-white/10 overflow-hidden text-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] font-extrabold block">
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-300 text-sm sm:text-lg font-normal">
              Everything you need to know about starting a project with Pavion Technologies.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#0D1222] border border-white/10 overflow-hidden shadow-xl transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-white font-black text-base sm:text-lg hover:text-[#60A5FA] transition-colors"
                    data-cursor-hover
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-zinc-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#60A5FA]' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 text-zinc-300 text-sm sm:text-base font-normal leading-relaxed border-t border-white/10 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
