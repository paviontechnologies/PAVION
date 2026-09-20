// src/components/Features.tsx
import { Rocket, Shield, Headphones, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Rocket size={32} />,
      title: 'Innovative Solutions',
      description: 'Cutting-edge technology and creative approaches to solve complex problems',
      color: 'text-[#1769FF]',
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and robust error handling',
      color: 'text-[#1769FF]',
    },
    {
      icon: <Clock size={32} />,
      title: 'Timely Delivery',
      description: 'Consistent on-time project delivery with transparent communication',
      color: 'text-[#1769FF]',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description: 'Dedicated support and maintenance for all your projects',
      color: 'text-[#1769FF]',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Scalable Architecture',
      description: 'Future-proof solutions that grow with your business needs',
      color: 'text-[#1769FF]',
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality checks at every development stage',
      color: 'text-[#1769FF]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="relative py-28 bg-[#080B14] overflow-hidden text-white border-t border-white/10">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 bg-[#DB2777]/10 border border-[#DB2777]/20 rounded-full text-xs sm:text-sm font-extrabold text-[#DB2777] uppercase tracking-widest">
            Why Work With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Why Choose <span className="text-[#60A5FA]">Us</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-lg font-normal max-w-2xl mx-auto">
            Professional features that set our services apart from the competition
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-[#0D1222] rounded-3xl p-8 border border-white/10 hover:border-[#60A5FA]/40 hover:shadow-2xl transition-all duration-300 group shadow-xl"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 text-[#60A5FA] mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#60A5FA] transition-colors uppercase">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { value: '100%', label: 'Uptime' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Projects Completed' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-[#05070E] rounded-2xl p-8 text-center border border-white/10 shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-black text-[#F59E0B] mb-2">{stat.value}</div>
              <div className="text-zinc-400 font-extrabold tracking-wide uppercase text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
