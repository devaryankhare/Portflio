'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown, Terminal, Database, Shield, Cpu } from 'lucide-react';

const words = ['Full Stack Developer', 'SIH 2025 Winner', 'Open Source Contributor'];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const targetWord = words[currentWordIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === targetWord) {
          // Pause at full word
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(300); // Pause before next word
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#0A0A0A] px-4"
    >
      {/* Aurora Background Effects */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blue" />
        <div className="aurora-blob aurora-purple" />
        <div className="aurora-blob aurora-pink" />
      </div>

      {/* Floating Tech Icons - Visual representation */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[15%] text-accent-blue/20"
        >
          <Terminal size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[15%] text-accent-purple/20"
        >
          <Database size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-[20%] text-accent-pink/20"
        >
          <Cpu size={40} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-1/3 right-[22%] text-accent-blue/15"
        >
          <Shield size={44} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-accent-blue tracking-wide uppercase mb-6 flex items-center gap-2 shadow-inner"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          Available for Opportunities
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 select-none"
        >
          <span className="text-white">DEV ARYAN </span>
          <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            KHARE
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-8 sm:h-10 mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-zinc-300"
        >
          <span className="typewriter-cursor text-accent-blue border-r-2 border-accent-blue pr-1">
            {currentText}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Building scalable products that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple font-semibold text-white flex items-center justify-center gap-2 w-full sm:w-auto transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40"
          >
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://drive.google.com/file/d/1tBmO7s2KXi6n5qi188l2GaX5UCwQjAL8/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-200 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto hover:bg-white/10 hover:text-white transition-all hover:border-white/20 active:scale-95"
          >
            Download Resume
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="group px-6 py-3 rounded-full border border-transparent text-zinc-400 hover:text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
          >
            Contact Me
            <Mail size={18} />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}
