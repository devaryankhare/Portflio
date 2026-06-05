'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Shield, Wrench, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  level: string; // e.g., Expert, Advanced, Intermediate
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string; // Tailwind class
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Languages',
    icon: <Code2 className="h-6 w-6 text-accent-blue" />,
    color: 'hover:border-accent-blue/30',
    skills: [
      { name: 'C', level: 'Expert' },
      { name: 'C++', level: 'Expert' },
      { name: 'JavaScript (ESM)', level: 'Expert' },
      { name: 'HTML & CSS', level: 'Expert' },
    ],
  },
  {
    title: 'Development & APIs',
    icon: <Monitor className="h-6 w-6 text-accent-purple" />,
    color: 'hover:border-accent-purple/30',
    skills: [
      { name: 'React 19', level: 'Expert' },
      { name: 'Vite 7', level: 'Expert' },
      { name: 'React Router DOM 7', level: 'Advanced' },
      { name: 'Tailwind CSS 4', level: 'Expert' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'MongoDB & Mongoose', level: 'Advanced' },
      { name: 'Socket.io', level: 'Advanced' },
      { name: 'Axios', level: 'Expert' },
      { name: 'gTTS & Google Trans', level: 'Advanced' },
    ],
  },
  {
    title: 'Security & Deploy',
    icon: <Shield className="h-6 w-6 text-accent-pink" />,
    color: 'hover:border-accent-pink/30',
    skills: [
      { name: 'JWT & bcrypt', level: 'Advanced' },
      { name: 'cors', level: 'Expert' },
      { name: 'multer', level: 'Advanced' },
      { name: 'Vercel', level: 'Advanced' },
    ],
  },
  {
    title: 'Toolchain & Design',
    icon: <Wrench className="h-6 w-6 text-emerald-400" />,
    color: 'hover:border-emerald-500/30',
    skills: [
      { name: 'Git & GitHub', level: 'Expert' },
      { name: 'JSON', level: 'Expert' },
      { name: 'VS Code & IntelliJ', level: 'Expert' },
      { name: 'Figma', level: 'Intermediate' },
      { name: 'Trello & Miro', level: 'Advanced' },
    ],
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent-pink/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-blue mb-2">
            My Tech Stack
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & Expertise
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`glass-card p-5 sm:p-6 rounded-3xl border-white/5 flex flex-col h-full transition-all duration-300 ${category.color}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="p-2.5 rounded-xl bg-white/5">
                  {category.icon}
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {category.title}
                </h4>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-col gap-3 flex-grow">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/badge relative flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    <span className="text-xs font-semibold text-zinc-200 group-hover/badge:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 group-hover/badge:text-accent-blue transition-colors flex items-center gap-1">
                      <Sparkles size={8} className="opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
