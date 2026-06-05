'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Code2, Rocket, Star, GraduationCap } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  targetNumber: number;
  suffix?: string;
  title: string;
  duration?: number;
}

function StatCard({ icon, targetNumber, suffix = '', title, duration = 1500 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out quadratic
      const easePercentage = percentage * (2 - percentage);
      const currentVal = Math.floor(easePercentage * targetNumber);
      
      setCount(currentVal);

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, targetNumber, duration]);

  return (
    <div
      ref={ref}
      className="glass-card flex flex-col items-center justify-center p-6 rounded-2xl text-center border-white/5 hover:border-accent-purple/20 transition-all group"
    >
      <div className="text-accent-blue group-hover:text-accent-purple transition-colors duration-300 p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
        {title}
      </span>
    </div>
  );
}

export default function About() {
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-purple mb-2">
            About Me
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering the Future
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bio text Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -30 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-3xl border-white/5 flex flex-col justify-between h-full hover:border-accent-blue/20"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="text-accent-blue h-7 w-7" />
                  <span className="text-lg font-semibold text-zinc-200">Education & Background</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  B.Tech Computer Science Student
                </h4>
                <p className="text-zinc-400 leading-relaxed mb-4 text-base font-normal">
                  I am currently pursuing my B.Tech in Computer Science and Engineering at the{' '}
                  <span className="text-white font-semibold">Indian Institute of Information Technology (IIIT) Bhopal</span>. 
                  My academic journey has built a strong foundation in data structures, algorithms, and system design.
                </p>
                <p className="text-zinc-400 leading-relaxed text-base font-normal">
                  Passionate about Full Stack Development, Open Source contributions, and AI-powered applications. 
                  I focus on writing high-performance, maintainable code and solving real-world challenges through 
                  scalable engineering solutions.
                </p>
              </div>

              {/* Taglines */}
              <div className="border-t border-white/10 pt-6 mt-8 grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Based in</h5>
                  <p className="text-sm font-semibold text-zinc-300">Bhopal, India</p>
                </div>
                <div>
                  <h5 className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Interest</h5>
                  <p className="text-sm font-semibold text-zinc-300">Full Stack & AI Dev</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <StatCard
              icon={<Trophy className="h-6 w-6" />}
              targetNumber={1}
              suffix=""
              title="SIH 2025 Winner"
            />
            <StatCard
              icon={<Code2 className="h-6 w-6" />}
              targetNumber={324}
              suffix="+"
              title="GitHub Contributions"
            />
            <StatCard
              icon={<Rocket className="h-6 w-6" />}
              targetNumber={30}
              suffix="+"
              title="Repo "
            />
            <StatCard
              icon={<Star className="h-6 w-6" />}
              targetNumber={1470}
              suffix=""
              title="CodeChef Rating"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
