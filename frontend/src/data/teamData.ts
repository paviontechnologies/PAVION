// src/data/teamData.ts
import rahulImg from '../Images/team/rahul1.jpg';
import priyanshuImg from '../Images/team/priyanshu2.jpg';

export interface Member {
  id: string;
  name: string;
  role: string;
  img: string;
  shortBio: string;
  fullBio: string;
  skills?: string[];
  socials?: { label: string; url: string }[];
}

export const teamMembers: Member[] = [
  {
    id: 'priyanshu-gupta',
    name: 'Priyanshu Gupta',
    role: 'Co-Founder, Pavion Technologies',
    img: priyanshuImg,
    shortBio: 'Driving Pavion Technologies with a vision to turn bold ideas into real-world innovation.',
    fullBio: `We didn’t begin as industry giants we began with a vision and the courage to build from nothing.
We walked through challenges, learned from every setback, and grew through every project that pushed our limits.
We’ve travelled a long way to shape Pavion Technologies into a place where innovation, discipline, and consistency define our work.
We believe in solving real problems with real technology whether it’s crafting seamless apps, engineering smart AI models, or designing end-to-end digital solutions.
We stay loyal to our clients, committed to our craft, and focused on delivering excellence without cutting corners.
We show up every single day with purpose, passion, and the promise to give 100% in everything we build.`,
    skills: ['Project Manager','Leadership', 'Product Strategy', 'Business Analytics', 'AI Implementation'],
    socials: [
      { label: 'linkedin', url: 'https://www.linkedin.com/in/priyanshu-gupta-engineer' }
    ],
  },

  {
    id: 'rahul-bajediyal',
    name: 'Rahul Bajediyal',
    role: 'Co-Founder , Pavion Technologies',
    img: rahulImg,
    shortBio: 'Success isn’t just about code it’s built on people, trust, and purposeful growth with startups and global clients alike.',
    fullBio: `We started this company with a vision and a team of just a few people, and today we stand strong with a family of 20+ dedicated professionals.
We grew step by step, learning from every project and every challenge that came our way.
We kept our focus simple deliver honest work, build smart solutions, and never compromise on quality.
We watched our team evolve with us, each member giving their best, becoming the backbone of what Pavion Technologies is today.
We built a culture where discipline, creativity, and commitment walk hand in hand.
We took risks, embraced failures, and turned them into learnings that shaped our journey forward.
We’ve grown not just in numbers, but in capability, confidence, and the belief that we can solve problems that truly matter.
And we continue moving ahead, ready for bigger challenges, stronger milestones, and a future driven by innovation.`,
    skills: ['Full Stack Development','Project Manager', 'System Architecture', 'Cloud Infrastructure', 'Team Management'],
    socials: [
      { label: 'linkedin', url: 'https://www.linkedin.com/in/rahul-bajediyal-3455a6237' }
    ],
  },
];
