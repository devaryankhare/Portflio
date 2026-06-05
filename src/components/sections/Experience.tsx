'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, GitPullRequest, Star, CheckCircle2 } from 'lucide-react';

// Register ScrollTrigger helper plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  id: number;
  role: string;
  organization: string;
  period: string;
  icon: React.ReactNode;
  highlights: string[];
}

const experiences: TimelineItem[] = [
  {
    id: 1,
    role: 'Open Source Contributor',
    organization: 'GirlScript Summer of Code 2025',
    period: 'Summer 2025',
    icon: <Star className="h-5 w-5" />,
    highlights: [
      'Improved search performance by introducing optimized search algorithms.',
      'Enhanced core React components, boosting accessibility and UI rendering speed.',
      'Collaborated closely with maintainers and international contributors to review and merge pull requests.',
    ],
  },
  {
    id: 2,
    role: 'Supercontributor',
    organization: 'Hacktoberfest 2025',
    period: 'October 2025',
    icon: <GitPullRequest className="h-5 w-5" />,
    highlights: [
      'Successfully merged multiple high-impact pull requests in popular open-source repositories.',
      'Developed core features, focusing on modern state management and API integration.',
      'Contributed documentation improvements to assist onboarding for new contributors.',
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;

    if (!line || !container) return;

    // Use GSAP Context for safety and cleanups in React
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 25%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-purple/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-blue mb-2">
            My Journey
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work & Contribution Experience
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative min-h-[500px]">
          {/* Central Line Base Track */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-[1px]" />
          
          {/* Animated Line Progress Track (GSAP Controlled) */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent-blue to-accent-purple -translate-x-[1px] origin-top scale-y-0"
          />

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className="relative flex flex-col md:flex-row items-stretch"
                >
                  {/* Visual Node Dot */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-white/20 -translate-x-1/2 z-20 flex items-center justify-center text-zinc-400 shadow-md transition-all duration-300 hover:border-accent-blue hover:text-white">
                    {exp.icon}
                  </div>

                  {/* Even Index: Content on Left (Desktop), Odd Index: Content on Right (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 flex ${
                      isEven ? 'md:pr-12 md:justify-end' : 'md:order-2 md:pl-12 md:justify-start'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`glass-card p-6 sm:p-8 rounded-3xl w-full max-w-lg border-white/5 ${
                        isEven ? 'hover:border-accent-blue/25' : 'hover:border-accent-purple/25'
                      }`}
                    >
                      {/* Period */}
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue mb-3 bg-accent-blue/10 px-3 py-1 rounded-full">
                        <Calendar size={12} />
                        {exp.period}
                      </span>

                      {/* Header */}
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h4>
                      <h5 className="text-sm sm:text-base font-semibold text-zinc-400 mb-6">
                        {exp.organization}
                      </h5>

                      {/* Highlights */}
                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-400 leading-relaxed font-normal">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
