'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll event to change style on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer to update active section based on viewport
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // check elements around center/top viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Update hash or state manually if needed
      setActiveSection(href.substring(1));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center py-4 px-4 sm:px-6`}
    >
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'glass-card bg-black/60 shadow-lg border-white/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="text-lg font-bold tracking-tight bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent transition-all duration-300 hover:scale-105"
        >
          DAK.dev
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-white ${
                  isActive ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-x-4 top-20 rounded-2xl glass-card border-white/10 p-6 flex flex-col gap-4 shadow-2xl transition-all duration-300 origin-top ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-base font-medium py-2 transition-all duration-300 ${
                isActive
                  ? 'text-accent-blue font-semibold border-l-2 border-accent-blue pl-3'
                  : 'text-zinc-400 pl-3 border-l-2 border-transparent'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
