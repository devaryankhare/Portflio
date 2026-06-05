'use client';

import React from 'react';
import { Mail, Github, Linkedin, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-purple mb-2">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact & Connect
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Centered Social Connection Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border-white/5 hover:border-accent-purple/20 transition-all text-center max-w-3xl mx-auto">
          <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Let's build something awesome!
          </h4>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10 font-normal">
            Whether you have an interesting project idea, open-source collaboration, internship opportunities, or just want to say hi, feel free to reach out. I'll get back to you as soon as possible.
          </p>

          {/* Direct Mail info */}
          <div className="inline-flex flex-col items-center gap-3 text-zinc-300 mb-12 group">
            <div className="p-3.5 rounded-full bg-white/5 border border-white/5 text-accent-blue group-hover:bg-accent-blue/15 group-hover:scale-110 transition-all duration-300">
              <Mail size={24} />
            </div>
            <div>
              <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                Direct Email
              </span>
              <a
                href="mailto:devaryankhare@gmail.com"
                className="text-lg sm:text-xl font-bold text-white hover:text-accent-blue transition-colors"
              >
                devaryankhare@gmail.com
              </a>
            </div>
          </div>

          {/* Social Channels grid */}
          <div className="border-t border-white/10 pt-10">
            <span className="block text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6">
              Connect Online
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/devaryankhare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-purple/20 text-zinc-300 hover:text-white transition-all text-sm font-semibold hover:-translate-y-0.5"
              >
                <Github size={18} className="text-zinc-400 group-hover:text-white" /> GitHub
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dev-aryan-khare-31jul2005/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-purple/20 text-zinc-300 hover:text-white transition-all text-sm font-semibold hover:-translate-y-0.5"
              >
                <Linkedin size={18} className="text-zinc-400 group-hover:text-white" /> LinkedIn
              </a>
              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/devaryankhare/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-purple/20 text-zinc-300 hover:text-white transition-all text-sm font-semibold hover:-translate-y-0.5"
              >
                <Terminal size={18} className="text-zinc-400 group-hover:text-white" /> LeetCode
              </a>
              {/* CodeChef */}
              <a
                href="https://www.codechef.com/users/devkhare31"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-purple/20 text-zinc-300 hover:text-white transition-all text-sm font-semibold hover:-translate-y-0.5"
              >
                <Terminal size={18} className="text-zinc-400 group-hover:text-white" /> CodeChef
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
