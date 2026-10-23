'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Sparkles,
  Heart,
  Activity,
  Play,
  RotateCcw,
  ArrowRightLeft,
  Bot,
  ShieldCheck,
  Terminal,
  Cpu,
  Network,
  CheckCircle2,
  FileSearch,
  Layers,
  Sparkle,
  Workflow,
  Check,
  Zap,
} from 'lucide-react';

// Card 3D tilt effect utility hook
function useTilt() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = (mouseY / height) * -12;
    const rY = (mouseX / width) * 12;
    setCoords({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCoords({ x: 0, y: 0 });
  };

  return {
    tiltStyles: isHovering
      ? {
          transform: `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.01, 1.01, 1.01)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.2s ease',
        }
      : {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.5s ease, box-shadow 0.3s ease',
        },
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export default function Projects() {
  // Brand AI-Readiness Audit Interactive Inspector State
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditStep, setAuditStep] = useState(4);

  const runAuditSimulation = () => {
    setAuditRunning(true);
    setAuditStep(0);
    const intervals = [400, 900, 1400, 1900];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setAuditStep(idx + 1);
        if (idx === intervals.length - 1) {
          setAuditRunning(false);
        }
      }, delay);
    });
  };

  // Agentic AI Platform Interactive Supervisor State
  const [selectedAgent, setSelectedAgent] = useState<'planning' | 'scheduling' | 'priority' | 'review' | 'reminder'>('planning');

  const agentDetails = {
    planning: {
      name: 'Planning Agent',
      badge: 'Goal Decomposition',
      desc: 'Transforms high-level objectives into actionable multi-week milestones and adaptive execution roadmaps.',
      status: 'Active • 4 Subtasks Created',
    },
    scheduling: {
      name: 'Scheduling Agent',
      badge: 'Calendar Alignment',
      desc: 'Matches milestones against real-time availability with natural language conversational inputs.',
      status: 'Synchronized • Latency 210ms',
    },
    priority: {
      name: 'Priority Agent',
      badge: 'Adaptive Matrix',
      desc: 'Dynamically reweights task urgencies based on upcoming deadlines and historical productivity patterns.',
      status: 'Balanced • 3 Urgent Items',
    },
    review: {
      name: 'Review Agent',
      badge: 'Outcome Verification',
      desc: 'Audits milestone completion criteria and feeds progress metrics back to the LangGraph Supervisor.',
      status: 'Verified • 98.4% Accuracy',
    },
    reminder: {
      name: 'Reminder Agent',
      badge: 'Contextual Alerts',
      desc: 'Dispatches targeted prompts and proactive nudges via conversational chat and system webhooks.',
      status: 'Queued • Next alert at 09:00',
    },
  };

  // Tic Tac Toe Game State
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMsg, setGameMsg] = useState('Your Turn (X)');
  const [showGame, setShowGame] = useState(false);

  // Currency Converter State
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [convertedResult, setConvertedResult] = useState<number>(8342.5);

  const rates: { [key: string]: number } = {
    USD: 1.0,
    INR: 83.42,
    EUR: 0.92,
    GBP: 0.79,
  };

  const handleConvert = (amt: number, from: string, to: string) => {
    const inUSD = amt / rates[from];
    const converted = inUSD * rates[to];
    setConvertedResult(Number(converted.toFixed(2)));
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    handleConvert(amount, toCurrency, temp);
  };

  // Tic Tac Toe Win Calculator
  const checkWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes('') ? null : 'Draw';
  };

  const makeComputerMove = (squares: string[]) => {
    const emptyIndices = squares
      .map((sq, idx) => (sq === '' ? idx : null))
      .filter((v) => v !== null) as number[];

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...squares];
    newBoard[randomIndex] = 'O';

    setBoard(newBoard);
    setIsXNext(true);

    const win = checkWinner(newBoard);
    if (win === 'O') {
      setGameMsg('Computer (O) Wins!');
    } else if (win === 'Draw') {
      setGameMsg("It's a Draw!");
    } else {
      setGameMsg('Your Turn (X)');
    }
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] !== '' || checkWinner(board) || !isXNext) return;

    const newBoard = [...board];
    newBoard[idx] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const win = checkWinner(newBoard);
    if (win === 'X') {
      setGameMsg('You (X) Win! 🎉');
      return;
    } else if (win === 'Draw') {
      setGameMsg("It's a Draw!");
      return;
    }

    setGameMsg('Computer is thinking...');
    setTimeout(() => {
      makeComputerMove(newBoard);
    }, 600);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
    setGameMsg('Your Turn (X)');
  };

  const [showPlayground, setShowPlayground] = useState(false);

  const tiltSwaasth = useTilt();
  const tiltAudit = useTilt();
  const tiltAgentic = useTilt();
  const tiltCurrency = useTilt();
  const tiltTicTacToe = useTilt();

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full filter blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent-purple mb-2">
            My Portfolio
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* PROJECTS GRID */}
        <div className="space-y-10">
          {/* PROJECT 1: Swaasth Setu — Winner SIH 2025 */}
          <div
            style={tiltSwaasth.tiltStyles}
            onMouseMove={tiltSwaasth.handleMouseMove}
            onMouseEnter={tiltSwaasth.handleMouseEnter}
            onMouseLeave={tiltSwaasth.handleMouseLeave}
            className="group block relative w-full rounded-3xl overflow-hidden glass-card p-6 sm:p-8 md:p-10 border-white/5 hover:border-accent-blue/20"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/10 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-accent-blue/20 transition-all duration-300" />

            {/* Badge & Period */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                <Sparkles size={12} />
                Winner, Smart India Hackathon (SIH) 2025
              </div>
              <span className="text-xs font-medium text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                Aug 2025 – Nov 2025
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content */}
              <div className="lg:col-span-7">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 flex items-center gap-3">
                  Swaasth Setu
                  <Activity className="h-6 w-6 text-accent-blue animate-pulse" />
                </h4>

                <p className="text-zinc-400 mb-6 text-sm sm:text-base leading-relaxed font-normal">
                  A 4-layer national-winning health and workforce monitoring ecosystem bridging Government, Hospital, Employer, and Multilingual Worker platforms. Awarded National Winner among 490+ teams at SIH 2025.
                </p>

                {/* Bullets directly from resume */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Directed frontend strategy for Hospital and Admin portals, delivering responsive, low-delay interfaces presented at the national finale.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Delivered a 4-layer health and workforce monitoring ecosystem spanning Government, Hospital, Employer, and Multilingual Worker applications, awarded National Winner among 490+ teams.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Implemented geospatial disease heatmaps across 14+ Kerala districts with 5+ health surveillance markers for workforce risk evaluation.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Enabled live multilingual clinical consultation translation and voice-based navigation with under 2-second speech processing latency using Whisper Large V3 (Groq).
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {[
                    'React 19',
                    'Vite 7',
                    'Tailwind CSS 4',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'Socket.io',
                    'Gemini API',
                    'Whisper Large V3 (Groq)',
                    'JWT',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/devaryankhare/SIH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-blue hover:bg-accent-blue/80 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent-blue/20"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://github.com/devaryankhare/SIH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-white/5"
                  >
                    Codebase <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Graphical Visual Panel */}
              <div className="lg:col-span-5 h-72 sm:h-80 w-full rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/50 to-black/80 flex flex-col justify-center items-center relative overflow-hidden group-hover:border-accent-blue/20 transition-all p-6">
                {/* Heatmap Grid Mockup */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-6 opacity-25">
                  {Array(36)
                    .fill(0)
                    .map((_, i) => {
                      const intensities = [
                        'bg-emerald-500/30',
                        'bg-blue-500/40',
                        'bg-purple-500/50',
                        'bg-red-500/60',
                        'bg-zinc-800/10',
                      ];
                      const intClass = intensities[i % intensities.length];
                      return (
                        <div
                          key={i}
                          className={`rounded-md ${intClass} animate-pulse`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      );
                    })}
                </div>

                {/* Vector Health Ring */}
                <div className="relative z-10 w-28 h-28 rounded-full border-2 border-accent-blue/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-accent-purple/30 flex items-center justify-center animate-spin">
                    <Heart className="h-8 w-8 text-accent-blue fill-accent-blue/10" />
                  </div>
                </div>

                <div className="text-center mt-5 z-10 space-y-1">
                  <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest block">
                    14+ Kerala Districts Covered
                  </span>
                  <span className="text-sm font-bold text-white block">
                    Real-Time Telemetry & Heatmap
                  </span>
                  <span className="text-xs text-zinc-400 block font-mono">
                    &lt; 2s Whisper Speech Latency
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 2: Brand AI-Readiness Audit */}
          <div
            style={tiltAudit.tiltStyles}
            onMouseMove={tiltAudit.handleMouseMove}
            onMouseEnter={tiltAudit.handleMouseEnter}
            onMouseLeave={tiltAudit.handleMouseLeave}
            className="group block relative w-full rounded-3xl overflow-hidden glass-card p-6 sm:p-8 md:p-10 border-white/5 hover:border-accent-purple/20"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/10 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-accent-purple/20 transition-all duration-300" />

            {/* Badge & Period */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-purple px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                <Bot size={12} />
                agentskills.io v1 Specification
              </div>
              <span className="text-xs font-medium text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                Aug 2026 – Sept 2026
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content */}
              <div className="lg:col-span-7">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 flex items-center gap-3">
                  Brand AI-Readiness Audit
                  <ShieldCheck className="h-6 w-6 text-accent-purple" />
                </h4>

                <p className="text-zinc-400 mb-6 text-sm sm:text-base leading-relaxed font-normal">
                  An autonomous, read-only Agent Skill Marketplace compliant with the agentskills.io v1 specification, auditing brand discoverability and AI-readiness across conversational search systems.
                </p>

                {/* Bullets directly from resume */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Built an autonomous, read-only Agent Skill Marketplace compliant with the agentskills.io v1 specification, auditing brand discoverability and AI-readiness across conversational search systems.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Engineered modular audits for AI crawler/WAF accessibility, /llms.txt, DOM parity, JSON-LD/Schema.org entities, sameAs authority signals, content freshness, heading hierarchy, and deep-link anchors.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Implemented 240-second execution budgets, subprocess isolation, strict HTTP timeouts/response limits, severity-based defect deduplication, and JSON Schema validation, generating machine-readable JSON and Markdown audit reports.
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['Python', 'Agent Skills', 'BeautifulSoup', 'JSON Schema', 'HTTP', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/devaryankhare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-purple hover:bg-accent-purple/80 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent-purple/20"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://github.com/devaryankhare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-white/5"
                  >
                    Codebase <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Interactive Audit Inspector Terminal */}
              <div className="lg:col-span-5 w-full rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/60 to-black/90 p-5 flex flex-col justify-between relative overflow-hidden group-hover:border-accent-purple/20 transition-all">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 pl-2">audit-runner.py</span>
                  </div>

                  <button
                    onClick={runAuditSimulation}
                    disabled={auditRunning}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-purple/20 text-accent-purple text-[10px] font-bold uppercase hover:bg-accent-purple/30 transition-all disabled:opacity-50"
                  >
                    <Zap size={10} />
                    {auditRunning ? 'Auditing...' : 'Run Audit'}
                  </button>
                </div>

                {/* Audit Checklist Items */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-300">AI Crawler / WAF Access</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${auditStep >= 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {auditStep >= 1 ? 'PASS (200 OK)' : 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-300">/llms.txt Endpoint</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${auditStep >= 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {auditStep >= 2 ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-300">JSON-LD / Schema.org</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${auditStep >= 3 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {auditStep >= 3 ? '14 ENTITIES' : 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-300">Execution Budget</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${auditStep >= 4 ? 'bg-accent-blue/20 text-accent-blue' : 'bg-zinc-800 text-zinc-500'}`}>
                      {auditStep >= 4 ? '1.8s / 240s MAX' : 'PENDING'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Specification: agentskills.io v1</span>
                  <span className="text-emerald-400 font-semibold">Strict JSON Schema Validated</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 3: Agentic AI Productivity Platform */}
          <div
            style={tiltAgentic.tiltStyles}
            onMouseMove={tiltAgentic.handleMouseMove}
            onMouseEnter={tiltAgentic.handleMouseEnter}
            onMouseLeave={tiltAgentic.handleMouseLeave}
            className="group block relative w-full rounded-3xl overflow-hidden glass-card p-6 sm:p-8 md:p-10 border-white/5 hover:border-accent-pink/20"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-pink/10 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-accent-pink/20 transition-all duration-300" />

            {/* Badge & Period */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-pink px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/20">
                <Workflow size={12} />
                LangGraph Multi-Agent Architecture
              </div>
              <span className="text-xs font-medium text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                May 2026 – Present
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content */}
              <div className="lg:col-span-7">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 flex items-center gap-3">
                  Agentic AI Productivity Platform
                  <Network className="h-6 w-6 text-accent-pink" />
                </h4>

                <p className="text-zinc-400 mb-6 text-sm sm:text-base leading-relaxed font-normal">
                  A supervisor-driven multi-agent productivity ecosystem built with LangGraph, converting natural language requests and goals into adaptive execution plans, milestones, and task decomposition.
                </p>

                {/* Bullets directly from resume */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Designed a Supervisor-driven multi-agent architecture using LangGraph, orchestrating specialized Planning, Scheduling, Priority, Review, and Reminder agents.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Built an AI roadmap engine that converts goals, deadlines, and weekly availability into personalized milestones and adaptive execution plans.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Developed conversational task management supporting natural-language scheduling, task decomposition, intelligent reprioritization, and adaptive rescheduling, backed by JWT authentication and MongoDB persistence.
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {[
                    'Next.js',
                    'TypeScript',
                    'Express.js',
                    'MongoDB',
                    'PostgreSQL',
                    'LangGraph',
                    'LangChain',
                    'Docker',
                    'RAG',
                    'Embeddings',
                    'Vector Database',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/devaryankhare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink hover:opacity-90 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent-pink/20"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://github.com/devaryankhare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-white/5"
                  >
                    Codebase <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Interactive Multi-Agent Supervisor Visualizer */}
              <div className="lg:col-span-5 w-full rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/60 to-black/90 p-5 flex flex-col justify-between relative overflow-hidden group-hover:border-accent-pink/20 transition-all">
                {/* Supervisor Node Header */}
                <div className="text-center pb-4 border-b border-white/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/15 border border-accent-pink/30 text-accent-pink text-xs font-bold mb-1">
                    <Cpu size={14} /> LangGraph Supervisor
                  </div>
                  <p className="text-[11px] text-zinc-400">Click an agent to inspect its runtime orchestration:</p>
                </div>

                {/* Sub-Agents Switcher Buttons */}
                <div className="grid grid-cols-5 gap-1.5 my-4">
                  {(['planning', 'scheduling', 'priority', 'review', 'reminder'] as const).map((agentKey) => (
                    <button
                      key={agentKey}
                      onClick={() => setSelectedAgent(agentKey)}
                      className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedAgent === agentKey
                          ? 'bg-accent-pink text-white shadow-md shadow-accent-pink/30 scale-105'
                          : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Bot size={12} />
                      <span className="truncate w-full text-center">{agentKey}</span>
                    </button>
                  ))}
                </div>

                {/* Active Agent Info Card */}
                <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent-pink animate-ping" />
                      {agentDetails[selectedAgent].name}
                    </span>
                    <span className="text-[10px] font-semibold text-accent-pink bg-accent-pink/10 px-2 py-0.5 rounded-full border border-accent-pink/20">
                      {agentDetails[selectedAgent].badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {agentDetails[selectedAgent].desc}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>State:</span>
                    <span className="text-emerald-400 font-semibold">{agentDetails[selectedAgent].status}</span>
                  </div>
                </div>

                {/* Architecture Footnote */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-mono text-zinc-500">PostgreSQL + Vector RAG</span>
                  <span className="text-accent-pink font-semibold">JWT & MongoDB Persisted</span>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE PLAYGROUND TOGGLE */}
          <div className="pt-4 text-center">
            <button
              onClick={() => setShowPlayground(!showPlayground)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Play size={14} className="text-accent-blue" />
              {showPlayground ? 'Hide Interactive Mini-Lab Demos' : 'Explore Interactive Mini-Lab Demos (Playground)'}
            </button>
          </div>

          {/* TWO COLUMN INTERACTIVE LAB DEMOS (CURRENCY & TIC TAC TOE) */}
          <AnimatePresence>
            {showPlayground && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* PROJECT: Currency Converter */}
                  <div
                    style={tiltCurrency.tiltStyles}
                    onMouseMove={tiltCurrency.handleMouseMove}
                    onMouseEnter={tiltCurrency.handleMouseEnter}
                    onMouseLeave={tiltCurrency.handleMouseLeave}
                    className="group relative rounded-3xl overflow-hidden glass-card p-6 border-white/5 hover:border-accent-blue/20 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
                        Currency Converter
                        <span className="text-xs font-semibold text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Functional App
                        </span>
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                        Real-time converter checking global exchange rates. Includes input validation, instant swaps, and visual conversion meters.
                      </p>

                      {/* Functional Converter Form */}
                      <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-3 mb-6">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                              Amount
                            </label>
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setAmount(val);
                                handleConvert(val, fromCurrency, toCurrency);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:border-accent-blue"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                              From
                            </label>
                            <select
                              value={fromCurrency}
                              onChange={(e) => {
                                setFromCurrency(e.target.value);
                                handleConvert(amount, e.target.value, toCurrency);
                              }}
                              className="bg-zinc-900 border border-white/10 rounded-lg py-1.5 px-2 text-white text-sm focus:outline-none"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="INR">INR</option>
                            </select>
                          </div>
                          <div className="flex items-end pb-1.5">
                            <button
                              onClick={swapCurrencies}
                              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent-blue transition-colors text-zinc-300 hover:text-white"
                              title="Swap Currencies"
                            >
                              <ArrowRightLeft size={14} />
                            </button>
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                              To
                            </label>
                            <select
                              value={toCurrency}
                              onChange={(e) => {
                                setToCurrency(e.target.value);
                                handleConvert(amount, fromCurrency, e.target.value);
                              }}
                              className="bg-zinc-900 border border-white/10 rounded-lg py-1.5 px-2 text-white text-sm focus:outline-none"
                            >
                              <option value="INR">INR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                            Converted Value
                          </span>
                          <span className="text-sm font-bold text-accent-blue">
                            {convertedResult.toLocaleString('en-IN', {
                              style: 'currency',
                              currency: toCurrency,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {['React', 'TypeScript', 'Tailwind CSS', 'ExchangeRates API'].map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/devaryankhare/Currency-Convertor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white hover:text-accent-blue flex items-center gap-1 transition-colors"
                      >
                        Check live <ExternalLink size={12} />
                      </a>
                      <a
                        href="https://github.com/devaryankhare/Currency-Convertor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        GitHub <Github size={12} />
                      </a>
                    </div>
                  </div>

                  {/* PROJECT: Tic Tac Toe */}
                  <div
                    style={tiltTicTacToe.tiltStyles}
                    onMouseMove={tiltTicTacToe.handleMouseMove}
                    onMouseEnter={tiltTicTacToe.handleMouseEnter}
                    onMouseLeave={tiltTicTacToe.handleMouseLeave}
                    className="group relative rounded-3xl overflow-hidden glass-card p-6 border-white/5 hover:border-accent-purple/20 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
                        Tic Tac Toe
                        <span className="text-xs font-semibold text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Playable Game
                        </span>
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                        Interactive state-managed game. Play a quick match against the computer bot AI using modular grid boards.
                      </p>

                      {/* Game board preview or playable grid */}
                      <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center mb-6">
                        {!showGame ? (
                          <button
                            onClick={() => setShowGame(true)}
                            className="px-4 py-2 rounded-full bg-accent-purple text-white text-xs font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                          >
                            <Play size={12} /> Play Game
                          </button>
                        ) : (
                          <div className="w-full max-w-[180px] space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {gameMsg}
                              </span>
                              <button
                                onClick={resetGame}
                                className="text-zinc-400 hover:text-white transition-colors"
                                title="Reset Board"
                              >
                                <RotateCcw size={12} />
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-1.5 w-full aspect-square">
                              {board.map((val, bIdx) => (
                                <button
                                  key={bIdx}
                                  onClick={() => handleCellClick(bIdx)}
                                  className="bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-lg font-bold flex items-center justify-center text-white select-none transition-all duration-200 aspect-square"
                                >
                                  <span
                                    className={
                                      val === 'X'
                                        ? 'text-accent-blue'
                                        : val === 'O'
                                        ? 'text-accent-purple'
                                        : ''
                                    }
                                  >
                                    {val}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {['React', 'DOM State', 'Tailwind CSS', 'AI Algorithms'].map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/devaryankhare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white hover:text-accent-purple flex items-center gap-1 transition-colors"
                      >
                        Demo Link <ExternalLink size={12} />
                      </a>
                      <a
                        href="https://github.com/devaryankhare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        GitHub <Github size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
