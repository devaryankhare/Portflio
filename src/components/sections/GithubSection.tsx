'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, BookOpen, BarChart3, Activity } from 'lucide-react';

interface RepoHighlight {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  link: string;
}

const highlightedRepos: RepoHighlight[] = [
  {
    name: 'SIH',
    description: 'National-winning healthcare ecosystem for SIH 2025. Includes multilingual telemetry and disease mapping.',
    language: 'TypeScript',
    stars: 12,
    forks: 3,
    link: 'https://github.com/devaryankhare/SIH',
  },
  {
    name: 'Currency-Convertor',
    description: 'Real-time exchange rate converter in JavaScript. Includes input validations and instant currency swaps.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    link: 'https://github.com/devaryankhare/Currency-Convertor',
  },
  {
    name: 'build-on-coffee',
    description: 'An open-source platform for discovering developer tools and learning resources for core Computer Science.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    link: 'https://github.com/devaryankhare/build-on-coffee',
  },
];

// Generate mock contribution grid data (53 weeks * 7 days)
const totalDays = 53 * 7;
const contributionRates = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4]; // weights for rendering activity
const calendarData = Array.from({ length: totalDays }, (_, idx) => {
  // Add some patterns - e.g. weekends have slightly less activity, certain seasons have more
  const dayOfWeek = idx % 7;
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  let level = contributionRates[Math.floor(Math.random() * contributionRates.length)];
  if (isWeekend && Math.random() > 0.4) {
    level = Math.max(0, level - 1);
  }
  return { id: idx, level };
});

export default function GithubSection() {
  return (
    <section
      id="github"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full filter blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-blue mb-2">
            GitHub Activity
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Open Source Contributions
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Outer Matrix Glass Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-white/5 mb-8 hover:border-accent-blue/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent-blue animate-pulse" />
              <span className="text-sm font-semibold text-zinc-200">324 contributions in the last year</span>
            </div>
            {/* Color Legend */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded bg-zinc-900 border border-white/5" />
              <div className="w-2.5 h-2.5 rounded bg-blue-950 border border-blue-900" />
              <div className="w-2.5 h-2.5 rounded bg-blue-800" />
              <div className="w-2.5 h-2.5 rounded bg-blue-600" />
              <div className="w-2.5 h-2.5 rounded bg-accent-blue" />
              <span>More</span>
            </div>
          </div>

          {/* Activity Matrix Grid */}
          <div className="w-full overflow-x-auto no-scrollbar pb-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[620px]">
              {calendarData.map((day) => {
                const colorClasses = [
                  'bg-zinc-900 border border-white/5',
                  'bg-blue-950 border border-blue-900/50',
                  'bg-blue-800',
                  'bg-blue-600',
                  'bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.3)]',
                ];
                return (
                  <div
                    key={day.id}
                    className={`w-2 h-2 rounded-sm transition-all duration-300 hover:scale-125 ${
                      colorClasses[day.level]
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Stats Cards & Language Matrix */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-white">34</span>
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Repos</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-white">3</span>
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Stars</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-white">6</span>
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Followers</span>
              </div>
            </div>

            {/* Language Breakdown Card */}
            <div className="glass-card p-6 rounded-3xl border-white/5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <BarChart3 size={16} className="text-accent-blue" />
                Most Used Languages
              </h4>
              <div className="space-y-4">
                {/* TS */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-1.5">
                    <span>JavaScript / TypeScript</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-blue rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                {/* HTML/CSS */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-1.5">
                    <span>HTML / CSS</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-purple rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Repository Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-accent-purple" />
              Repository Highlights
            </h4>

            {highlightedRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.link}
                onClick={(e) => e.preventDefault()}
                className="group block glass-card p-5 sm:p-6 rounded-2xl border-white/5 hover:border-accent-purple/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-base font-bold text-white group-hover:text-accent-purple transition-colors">
                    {repo.name}
                  </h5>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {repo.language}
                  </span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-normal">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4 text-zinc-500 text-xs font-semibold">
                  <span className="flex items-center gap-1 hover:text-white transition-colors">
                    <Star size={14} />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-white transition-colors">
                    <GitFork size={14} />
                    {repo.forks}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-auto">
                    Public Repo
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
