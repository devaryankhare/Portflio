'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Heart, Activity, Globe, Play, RotateCcw, ArrowRightLeft } from 'lucide-react';

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
    
    // Normalize coordinates (-0.5 to 0.5) and multiply by strength
    const rX = (mouseY / height) * -15; // rotate X based on mouse Y
    const rY = (mouseX / width) * 15;   // rotate Y based on mouse X
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
          transform: `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.02, 1.02, 1.02)`,
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
  // Tic Tac Toe Game State
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMsg, setGameMsg] = useState('Your Turn (X)');
  const [showGame, setShowGame] = useState(false);

  // Currency Converter State
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [convertedResult, setConvertedResult] = useState<number>(8342.50);

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
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
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
    // Find empty spots
    const emptyIndices = squares
      .map((sq, idx) => (sq === '' ? idx : null))
      .filter((v) => v !== null) as number[];
    
    if (emptyIndices.length === 0) return;

    // Pick random empty cell
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

  const tiltSwaasth = useTilt();
  const tiltCurrency = useTilt();
  const tiltTicTacToe = useTilt();

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#0A0A0A] overflow-hidden px-4"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full filter blur-[150px] pointer-events-none z-0" />

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
        <div className="space-y-8">
          
          {/* FLAGSHIP PROJECT: Swaasth Setu */}
          <div
            style={tiltSwaasth.tiltStyles}
            onMouseMove={tiltSwaasth.handleMouseMove}
            onMouseEnter={tiltSwaasth.handleMouseEnter}
            onMouseLeave={tiltSwaasth.handleMouseLeave}
            className="group block relative w-full rounded-3xl overflow-hidden glass-card p-6 sm:p-8 md:p-10 border-white/5 hover:border-accent-blue/20"
          >
            {/* Spotlight Accent Gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/10 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-accent-blue/20 transition-all duration-300" />
            
            {/* Tagline / Trophy Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue mb-6 px-3 py-1 rounded-full bg-accent-blue/10">
              <Sparkles size={12} />
              SIH 2025 National Winner
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content */}
              <div className="lg:col-span-7">
                <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 flex items-center gap-3">
                  Swaasth Setu
                  <Activity className="h-6 w-6 text-accent-blue animate-pulse" />
                </h4>
                <p className="text-zinc-400 mb-6 text-base sm:text-lg leading-relaxed font-normal">
                  A national award-winning smart healthcare system built to address the critical gaps in the Indian healthcare ecosystem during the Smart India Hackathon 2025. It delivers modern telemetry, translation, and localized services.
                </p>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent-blue mt-2" />
                    <span className="text-sm text-zinc-300">Multilingual systems with Gemini & Whisper AI</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent-blue mt-2" />
                    <span className="text-sm text-zinc-300">Real-time localized disease heatmaps</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent-blue mt-2" />
                    <span className="text-sm text-zinc-300">Hands-free voice telemetry & navigation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent-blue mt-2" />
                    <span className="text-sm text-zinc-300">EHR management with secure blockchain standard</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'Node.js', 'MongoDB', 'Socket.io', 'Gemini AI', 'Whisper AI', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
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
              <div className="lg:col-span-5 h-64 lg:h-80 w-full rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/50 to-black/80 flex flex-col justify-center items-center relative overflow-hidden group-hover:border-accent-blue/10 transition-all p-6">
                {/* Heatmap Grid Mockup */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-6 opacity-25">
                  {Array(36).fill(0).map((_, i) => {
                    const intensities = ['bg-emerald-500/30', 'bg-blue-500/40', 'bg-purple-500/50', 'bg-red-500/60', 'bg-zinc-800/10'];
                    const intClass = intensities[i % intensities.length];
                    return <div key={i} className={`rounded-md ${intClass} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />;
                  })}
                </div>
                
                {/* Vector Health Ring */}
                <div className="relative z-10 w-28 h-28 rounded-full border-2 border-accent-blue/20 flex items-center justify-center animate-spin-slow">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-accent-purple/30 flex items-center justify-center animate-reverse-spin">
                    <Heart className="h-8 w-8 text-accent-blue fill-accent-blue/10" />
                  </div>
                </div>
                <div className="text-center mt-6 z-10">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Interactive Platform</span>
                  <span className="text-sm font-bold text-white mt-1">Telemetry Dashboard</span>
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID BELOW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* PROJECT 2: Currency Converter */}
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
                  <span className="text-xs font-semibold text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Functional App</span>
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                  Real-time converter checking global exchange rates. Includes input validation, instant swaps, and visual conversion meters.
                </p>

                {/* Functional Converter Form */}
                <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-3 mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Amount</label>
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
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">From</label>
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
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">To</label>
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
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Converted Value</span>
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

            {/* PROJECT 3: Tic Tac Toe */}
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
                  <span className="text-xs font-semibold text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Playable Game</span>
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
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{gameMsg}</span>
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
                            <span className={val === 'X' ? 'text-accent-blue' : val === 'O' ? 'text-accent-purple' : ''}>
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
        </div>
      </div>
    </section>
  );
}
