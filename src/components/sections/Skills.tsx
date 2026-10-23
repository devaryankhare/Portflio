'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, Bot, Cloud, Shield, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  badgeColor?: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <Code2 className="h-5 w-5 text-accent-blue" />,
    color: 'hover:border-accent-blue/30',
    skills: [
      { name: 'C', level: 'Proficient' },
      { name: 'C++', level: 'Proficient' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Python', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'NoSQL', level: 'Advanced' },
    ],
  },
  {
    title: 'Frontend',
    icon: <Monitor className="h-5 w-5 text-accent-purple" />,
    color: 'hover:border-accent-purple/30',
    skills: [
      { name: 'React.js', level: 'Expert' },
      { name: 'Next.js', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Vite', level: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="h-5 w-5 text-emerald-400" />,
    color: 'hover:border-emerald-500/30',
    skills: [
      { name: 'Node.js', level: 'Expert' },
      { name: 'Express.js', level: 'Expert' },
      { name: 'REST APIs', level: 'Expert' },
      { name: 'Socket.io', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="h-5 w-5 text-amber-400" />,
    color: 'hover:border-amber-500/30',
    skills: [
      { name: 'MongoDB', level: 'Expert' },
      { name: 'Mongoose', level: 'Expert' },
      { name: 'MySQL', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Vector Databases', level: 'Advanced' },
    ],
  },
  {
    title: 'Generative AI & LLMs',
    icon: <Bot className="h-5 w-5 text-accent-pink" />,
    color: 'hover:border-accent-pink/30',
    skills: [
      { name: 'LangGraph & LangChain', level: 'Advanced' },
      { name: 'Multi-Agent Systems', level: 'Advanced' },
      { name: 'RAG & Embeddings', level: 'Advanced' },
      { name: 'Tool Calling & Prompting', level: 'Advanced' },
      { name: 'OpenAI API & Gemini API', level: 'Expert' },
      { name: 'LLM Orchestration', level: 'Advanced' },
    ],
  },
  {
    title: 'DevOps & Tooling',
    icon: <Cloud className="h-5 w-5 text-cyan-400" />,
    color: 'hover:border-cyan-500/30',
    skills: [
      { name: 'Docker', level: 'Advanced' },
      { name: 'CI/CD Pipelines', level: 'Advanced' },
      { name: 'Git & GitHub', level: 'Expert' },
      { name: 'Postman', level: 'Expert' },
      { name: 'Vercel & Deployment', level: 'Expert' },
    ],
  },
  {
    title: 'Security & Auth',
    icon: <Shield className="h-5 w-5 text-rose-400" />,
    color: 'hover:border-rose-500/30',
    skills: [
      { name: 'JWT (JSON Web Tokens)', level: 'Expert' },
      { name: 'RBAC (Role-Based Access)', level: 'Advanced' },
      { name: 'Session Security', level: 'Advanced' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent-pink/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-blue/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

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
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`glass-card p-5 sm:p-6 rounded-3xl border-white/5 flex flex-col h-full transition-all duration-300 ${category.color}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3.5">
                <div className="p-2.5 rounded-xl bg-white/5">
                  {category.icon}
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {category.title}
                </h4>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-col gap-2 flex-grow">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/badge relative flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default"
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
