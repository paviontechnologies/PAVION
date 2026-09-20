// src/components/AISection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Bot,
  Cpu,
  Network,
  Zap,
  MessageSquare,
  BarChart3,
  Shield,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Eye,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const AISection: React.FC = () => {
  const aiServices = [
    {
      icon: <Brain size={32} />,
      title: 'AI-Powered Solutions',
      description: 'Custom AI models trained on your business data to automate workflows and enhance decision-making.',
      color: 'text-blue-600',
    },
    {
      icon: <Bot size={32} />,
      title: 'Intelligent Chatbots',
      description: 'Deploy smart conversational AI agents that understand context and provide human-like interactions.',
      color: 'text-blue-600',
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Natural Language Processing',
      description: 'Extract insights from text, automate document processing, and enable semantic search capabilities.',
      color: 'text-blue-600',
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Predictive Analytics',
      description: 'Leverage machine learning to forecast trends, optimize operations, and make data-driven decisions.',
      color: 'text-blue-600',
    },
  ];

  const aiCapabilities = [
    { icon: <Cpu size={20} />, text: 'LLM Integration (GPT, Claude, Gemini)' },
    { icon: <Network size={20} />, text: 'RAG & Knowledge Bases' },
    { icon: <Workflow size={20} />, text: 'AI Workflow Automation' },
    { icon: <Shield size={20} />, text: 'Enterprise Security & Compliance' },
    { icon: <Eye size={20} />, text: 'Computer Vision & Image AI' },
    { icon: <Zap size={20} />, text: 'Real-time AI Processing' },
  ];

  return (
    <section id="ai" className="relative py-28 bg-[#080B14] overflow-hidden text-white border-b border-white/10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#DB2777]/10 border border-[#DB2777]/20 rounded-full text-[#DB2777] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            <Sparkles size={14} />
            Powered by Advanced AI
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight uppercase">
            Artificial Intelligence <br />
            <span className="text-[#60A5FA]">
              That Transforms Business
            </span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Harness the power of cutting-edge AI and Machine Learning to automate processes,
            gain insights, and create intelligent experiences that drive growth.
          </p>
        </motion.div>

        {/* AI Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {aiServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#0D1222] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all duration-300 group shadow-xl"
            >
              <div className="inline-flex p-4 rounded-xl bg-white/5 text-[#60A5FA] mb-6 group-hover:scale-110 transition-all border border-white/10">
                {service.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-colors uppercase leading-snug">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Capabilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D1222] rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[100px]" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left side - Content */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight uppercase">
                Enterprise-Ready AI <br />
                <span className="text-[#60A5FA]"> Capabilities</span>
              </h3>
              <p className="text-zinc-300 mb-8 leading-relaxed text-sm sm:text-lg font-normal">
                From proof-of-concept to production deployment, we build AI solutions that scale
                with your business needs while maintaining security and compliance standards.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {aiCapabilities.map((cap, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3.5 bg-[#05070E] rounded-xl border border-white/10 transition-all duration-200 cursor-default hover:border-[#60A5FA]/30"
                  >
                    <div className="text-[#60A5FA]">{cap.icon}</div>
                    <span className="text-zinc-200 text-sm sm:text-base font-bold">{cap.text}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 mt-10 px-8 py-4 bg-[#DB2777] hover:bg-[#DB2777]/90 text-white rounded-full transition-all duration-300 font-black text-sm sm:text-base shadow-lg shadow-pink-600/20 hover:scale-105"
              >
                <span>Start Your AI Journey</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Right side - Visual */}
            <div className="relative hidden lg:flex justify-center items-center">
              <div className="relative w-80 h-80">
                {/* Central brain pulse */}
                <div className="absolute inset-0 bg-[#DB2777]/20 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 bg-[#60A5FA]/20 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#05070E] p-10 rounded-3xl border border-white/15 shadow-2xl relative z-10">
                    <Brain size={80} className="text-[#60A5FA] drop-shadow-sm" />
                  </div>
                </div>

                {/* Satellite Nodes */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0D1222] p-3.5 rounded-xl border border-white/15 shadow-xl">
                    <Bot size={24} className="text-[#60A5FA]" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0D1222] p-3.5 rounded-xl border border-white/15 shadow-xl">
                    <Workflow size={24} className="text-[#60A5FA]" />
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-[#0D1222] p-3.5 rounded-xl border border-white/15 shadow-xl">
                    <Shield size={24} className="text-[#60A5FA]" />
                  </div>
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-[#0D1222] p-3.5 rounded-xl border border-white/15 shadow-xl">
                    <Zap size={24} className="text-[#60A5FA]" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <p className="text-center text-zinc-400 text-xs sm:text-sm mb-8 uppercase tracking-widest font-extrabold flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-white/10"></span>
            AI Applications We Build
            <span className="w-12 h-px bg-white/10"></span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Customer Service Bots',
              'Document Intelligence',
              'Recommendation Engines',
              'Fraud Detection',
              'Voice Assistants',
              'Content Generation',
              'Image Recognition',
              'Process Automation',
              'Sentiment Analysis',
              'Anomaly Detection',
            ].map((useCase, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4.5 py-3 bg-[#0D1222] border border-white/10 rounded-full text-zinc-300 text-sm font-bold shadow-sm hover:shadow-md hover:border-[#60A5FA] hover:text-white transition-all duration-200 cursor-default"
              >
                <CheckCircle2 size={14} className="text-[#60A5FA]" />
                {useCase}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;
