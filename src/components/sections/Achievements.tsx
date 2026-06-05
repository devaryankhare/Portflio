'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Rocket, Award } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Tailwind glow classes
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Smart India Hackathon 2025 Winner',
    subtitle: 'National Champion',
    description: 'Secured the 1st Place National Trophy in the Healthcare division at SIH 2025, beating out thousands of teams nationwide for our project Swaasth Setu.',
    icon: <Trophy className="h-6 w-6 text-yellow-400" />,
    color: 'hover:border-yellow-500/30 hover:shadow-yellow-500/5',
  },
  {
    id: 2,
    title: 'CodeChef Rating 1470',
    subtitle: 'Competitive Programming',
    description: 'Achieved a rating of 1470 (3-Star Coder) on CodeChef. Solved numerous complex algorithmic problems in runtime-constrained environments.',
    icon: <Star className="h-6 w-6 text-accent-blue" />,
    color: 'hover:border-accent-blue/30 hover:shadow-accent-blue/5',
  },
  {
    id: 3,
    title: 'Hackatron 2K25 Finalist',
    subtitle: 'Top 10 Finalist Team',
    description: 'Ranked in the top 10 finalists globally for developing a decentralized local-first resource coordination platform under intense 36-hour hackathon limits.',
    icon: <Target className="h-6 w-6 text-accent-purple" />,
    color: 'hover:border-accent-purple/30 hover:shadow-accent-purple/5',
  },
  {
    id: 4,
    title: 'Smackathon 2K25 Finalist',
    subtitle: 'Innovation Shortlist',
    description: 'Recognized as a grand finalist for pitching and programming an AI-assisted developer workspace optimizer, competing against 500+ participants.',
    icon: <Rocket className="h-6 w-6 text-accent-pink" />,
    color: 'hover:border-accent-pink/30 hover:shadow-accent-pink/5',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-purple mb-2">
            Achievements
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Accomplishments
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              variants={cardVariants}
              className={`glass-card p-6 sm:p-8 rounded-3xl border-white/5 flex gap-5 items-start transition-all duration-300 ${ach.color}`}
            >
              {/* Icon Panel */}
              <div className="p-3 rounded-2xl bg-white/5 shrink-0 border border-white/5">
                {ach.icon}
              </div>

              {/* Text content */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 block">
                  {ach.subtitle}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                  {ach.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Trophy Callout footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-zinc-300 text-xs font-medium">
            <Award className="h-4 w-4 text-accent-blue animate-pulse" />
            Consistently striving for excellence in software development.
          </div>
        </div>
      </div>
    </section>
  );
}
