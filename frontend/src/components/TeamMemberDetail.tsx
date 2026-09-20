// src/components/TeamMemberDetail.tsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react';
import { teamMembers } from '../data/teamData';

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const member = teamMembers.find((m) => m.id === id);

  function SocialIcon({ label }: { label: string }) {
    if (label === 'linkedin') return <Linkedin size={20} />;
    if (label === 'twitter') return <Twitter size={20} />;
    return <Facebook size={20} />;
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase text-white">Member Not Found</h2>
          <Link to="/about" className="inline-block px-6 py-2.5 bg-[#DB2777] text-white hover:bg-[#DB2777]/90 font-bold rounded-full transition-all shadow-lg shadow-pink-600/20">
            Return to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-[#050508] text-white min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <button
          type="button"
          onClick={() => navigate('/about')}
          className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors duration-200 group font-bold text-sm sm:text-base"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 mr-3 group-hover:bg-[#DB2777] group-hover:border-[#DB2777] group-hover:text-white transition-all shadow-sm">
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Back to Team</span>
        </button>

        <div className="border-y border-white/10 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[320px_1fr] md:gap-14 lg:gap-16 items-start">
            <div className="relative mx-auto w-full max-w-[280px] md:max-w-none">
              <div className="aspect-[4/5] overflow-hidden bg-black/40 border border-white/15 rounded-2xl shadow-2xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex justify-center md:justify-start gap-4 mt-8">
                {member.socials?.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-b border-white/15 pb-1 text-sm font-bold text-zinc-400 hover:text-[#60A5FA] hover:border-[#60A5FA] transition-colors duration-300"
                  >
                    <SocialIcon label={s.label} />
                    <span className="capitalize">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center md:text-left space-y-6">
              <span className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#DB2777] font-extrabold block">
                {member.role.replace(' ,', ',')}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase">{member.name}</h1>

              <div className="space-y-5 border-t border-white/10 pt-8">
                {member.fullBio.split('\n').filter(Boolean).map((paragraph) => (
                  <p key={paragraph} className="text-zinc-300 leading-relaxed text-sm sm:text-base md:text-lg font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>

              {member.skills && (
                <div className="pt-6">
                  <h3 className="text-xs sm:text-sm tracking-[0.28em] uppercase text-zinc-400 font-extrabold mb-5">Expertise</h3>
                  <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-xs sm:text-sm font-bold text-zinc-300 hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors rounded-xl shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMemberDetail;
