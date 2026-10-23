'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Rocket, Award, Globe } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Winner – Smart India Hackathon (SIH) 2025',
    subtitle: 'National Winner • Healthcare Division',
    description: 'Awarded National Winner among 490+ teams across India for our project Swaasth Setu, engineering a 4-layer health and workforce monitoring ecosystem with real-time multilingual translation and disease surveillance heatmaps.',
    icon: <Trophy className="h-6 w-6 text-yellow-400" />,
    color: 'hover:border-yellow-500/30 hover:shadow-yellow-500/5',
    featured: true,
  },
  {
    id: 2,
    title: 'Top 160 in India – India-Singapore Hackathon',
    subtitle: 'International Bilateral Hackathon',
    description: 'Ranked among the Top 160 innovators nationwide in the prestigious international hackathon jointly organized by the governments of India and Singapore.',
    icon: <Globe className="h-6 w-6 text-cyan-400" />,
    color: 'hover:border-cyan-500/30 hover:shadow-cyan-500/5',
  },
  {
    id: 3,
    title: 'CodeChef 2-Star Coder (Peak Rating 1529)',
    subtitle: 'Algorithmic Problem Solving',
    description: 'Achieved a peak rating of 1529 as a 2-Star Coder on CodeChef, solving complex data structures and algorithmic challenges under tight constraints.',
    icon: <Star className="h-6 w-6 text-accent-blue" />,
    color: 'hover:border-accent-blue/30 hover:shadow-accent-blue/5',
  },
  {
    id: 4,
    title: 'Finalist – Hackatron 2K25',
    subtitle: 'IIIT Gwalior 36-Hour Sprint',
    description: 'Recognized as a grand finalist team in the 36-hour GitHub-powered innovation sprint hosted at the Indian Institute of Information Technology (IIIT) Gwalior.',
    icon: <Target className="h-6 w-6 text-accent-purple" />,
    color: 'hover:border-accent-purple/30 hover:shadow-accent-purple/5',
  },
  {
    id: 5,
    title: 'Finalist – Smackathon 2K25',
    subtitle: 'National-Level Hackathon (YCCE Nagpur)',
    description: 'Selected as a grand finalist at Smackathon 2K25, a national-level hackathon at YCCE Nagpur, presenting scalable software solutions.',
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
  hidden: { opacity: 0, y: 30 },
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
      <div className="absolute top-10 right-10 w-96 h-96 bg-accent-purple/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

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
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              variants={cardVariants}
              className={`glass-card p-6 sm:p-8 rounded-3xl border-white/5 flex gap-5 items-start transition-all duration-300 ${ach.color} ${
                ach.featured ? 'md:col-span-2 border-yellow-500/20 bg-gradient-to-r from-yellow-500/[0.03] via-transparent to-accent-blue/[0.03]' : ''
              }`}
            >
              {/* Icon Panel */}
              <div className="p-3.5 rounded-2xl bg-white/5 shrink-0 border border-white/5">
                {ach.icon}
              </div>

              {/* Text content */}
              <div className="flex-1">
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
            Consistently striving for excellence across national competitions, hackathons, and algorithms.
          </div>
        </div>
      </div>
    </section>
  );
}
