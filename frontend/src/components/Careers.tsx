// src/components/Careers.tsx
import React, { useState } from 'react';
import {
  Briefcase,
  Send,
  CheckCircle,
  XCircle,
  Upload,
  User,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SubmitStatus = 'loading' | 'success' | 'error' | null;

interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  coverLetter: string;
  resume: File | null;
}

const FRONTEND_API_KEY = 'my-secret-key-123';
const API_BASE_URL = 'https://pavilon-technologies-tqaq.onrender.com';

const Careers: React.FC = () => {
  const [formData, setFormData] = useState<CareerFormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    coverLetter: '',
    resume: null,
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('linkedinUrl', formData.linkedinUrl);
      formDataToSend.append('coverLetter', formData.coverLetter);

      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch(`${API_BASE_URL}/api/careers`, {
        method: 'POST',
        headers: {
          'x-api-key': FRONTEND_API_KEY,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedinUrl: '',
          coverLetter: '',
          resume: null,
        });
        setResumeFileName('');
      } else {
        console.error('Career API error:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Fetch error during career form submission:', error);
      setSubmitStatus('error');
    }

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        resume: file,
      });
      setResumeFileName(file.name);
    }
  };

  return (
    <div className="py-28 bg-[#050508] relative overflow-hidden min-h-screen text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.05),transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            <Briefcase size={16} />
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight uppercase">
            Build Your Career <span className="text-[#60A5FA]">With Us</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about technology and innovation.
            Submit your application and let's create the future together.
          </p>
        </motion.div>

        {/* Submission Status Message */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 rounded-xl font-bold flex items-center gap-3 border ${submitStatus === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
            >
              {submitStatus === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
              {submitStatus === 'success' ? 'Thank you for your application! We will be in touch soon.' : 'Oops! Something went wrong. Please try again.'}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0D1222] p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

          <div className="mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase">Application Form</h2>
            <p className="text-zinc-300 leading-relaxed max-w-2xl font-normal text-sm sm:text-base">
              Fill out the form below to submit your application. We're excited to learn more about you
              and explore how you can contribute to our innovative team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <label htmlFor="fullName" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                  <User size={16} className="text-[#60A5FA]" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all font-mono"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                  <Mail size={16} className="text-[#60A5FA]" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all font-mono"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                  <Phone size={16} className="text-[#60A5FA]" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all font-mono"
                  placeholder="+91 95289-91434"
                />
              </div>

              <div>
                <label htmlFor="location" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                  <MapPin size={16} className="text-[#60A5FA]" />
                  Current Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all font-mono"
                  placeholder="Gurugram, India"
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="linkedinUrl" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                <Linkedin size={16} className="text-[#60A5FA]" />
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all font-mono"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="resume" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                <Upload size={16} className="text-[#60A5FA]" />
                Upload Resume/CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-5 py-8 rounded-xl bg-[#05070E] border-2 border-dashed border-white/15 hover:border-[#60A5FA] hover:bg-white/5 transition-all text-zinc-400 cursor-pointer group text-center sm:text-left"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#60A5FA] transition-colors">
                    <FileText size={24} className="group-hover:text-[#60A5FA] transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-white font-bold mb-1">{resumeFileName || 'Click to upload your resume'}</span>
                    <span className="block text-xs text-zinc-500 font-semibold">PDF, DOC, DOCX (Max 5MB)</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="coverLetter" className="flex items-center gap-2 text-zinc-300 font-extrabold mb-3 text-xs sm:text-sm uppercase">
                <MessageSquare size={16} className="text-[#60A5FA]" />
                Cover Letter / Why Join Us? *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-5 py-4 rounded-xl bg-[#05070E] border border-white/10 text-white placeholder-zinc-500 focus:border-[#60A5FA] focus:outline-none text-sm sm:text-base transition-all resize-none font-mono"
                placeholder="Tell us about yourself, your experience, skills, and why you'd like to join Pavion Technologies..."
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full font-black text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-600/20"
            >
              {submitStatus === 'loading' ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send size={20} />
              )}
              {submitStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#0D1222] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-10 uppercase tracking-tight">What Happens Next?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle size={28} />
                </div>
                <h4 className="font-extrabold text-white mb-2 uppercase text-sm sm:text-base">Review</h4>
                <p className="text-zinc-400 text-xs sm:text-sm font-normal">We'll carefully review your application</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <h4 className="font-extrabold text-white mb-2 uppercase text-sm sm:text-base">Contact</h4>
                <p className="text-zinc-400 text-xs sm:text-sm font-normal">Shortlisted candidates will be contacted</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase size={28} />
                </div>
                <h4 className="font-extrabold text-white mb-2 uppercase text-sm sm:text-base">Interview</h4>
                <p className="text-zinc-400 text-xs sm:text-sm font-normal">We'll schedule interviews with selected candidates</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
