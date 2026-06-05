import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Achievements from '@/components/sections/Achievements';
import GithubSection from '@/components/sections/GithubSection';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex-grow flex flex-col">
      {/* Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <GithubSection />
      <Contact />

      {/* Modern Compact Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-zinc-500 text-xs bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-zinc-400">Thankyou for visiting my portfolio</p>
          <p className="font-normal text-zinc-500">
            © {new Date().getFullYear()} Dev Aryan Khare. All rights reserved.
          </p>
          
        </div>
      </footer>
    </main>
  );
}
