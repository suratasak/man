import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Code2, Lock, EyeOff, Radio, Cpu, BatteryCharging, Zap, ArrowDown } from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { playCyberClick, playGlitchSound } from '../utils/soundEffects';

interface CyberHeroProps {
  data: PortfolioData;
  themeColor: ThemeColor;
  onOpenTerminal: () => void;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenEditor: () => void;
}

export const CyberHero: React.FC<CyberHeroProps> = ({
  data,
  themeColor,
  onOpenTerminal,
  onScrollToProjects,
  onScrollToContact,
  onOpenEditor,
}) => {
  const [displayText, setDisplayText] = useState<string>(data.alias);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);

  // Decryption glitch effect on mount or alias update
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$%&*';
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        data.alias
          .split('')
          .map((char, index) => {
            if (index < iterations) return data.alias[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iterations >= data.alias.length) {
        clearInterval(interval);
      }
      iterations += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [data.alias]);

  const getAccentGlowClass = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return 'shadow-[0_0_30px_rgba(6,182,212,0.25)] border-cyan-500/50 text-cyan-400';
      case 'green': return 'shadow-[0_0_30px_rgba(34,197,94,0.25)] border-emerald-500/50 text-emerald-400';
      case 'purple': return 'shadow-[0_0_30px_rgba(168,85,247,0.25)] border-purple-500/50 text-purple-400';
      case 'amber': return 'shadow-[0_0_30px_rgba(245,158,11,0.25)] border-amber-500/50 text-amber-400';
      case 'rose': return 'shadow-[0_0_30px_rgba(244,63,94,0.25)] border-rose-500/50 text-rose-400';
    }
  };

  const getAccentBgClass = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'green': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'amber': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'rose': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* HUD Corner Decorators */}
      <div className="absolute top-4 left-4 text-slate-700 font-mono text-[10px] hidden sm:block">
        [SYS_NODE: {data.locationAlias}]
      </div>
      <div className="absolute top-4 right-4 text-slate-700 font-mono text-[10px] hidden sm:block">
        [PROTOCOL: ZERO_PII_STATIC]
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Bio & Decrypted Title */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">STATUS:</span>
            <span className="text-emerald-400 font-medium">{data.statusMessage}</span>
          </div>

          {/* Glitch Title & Alias */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-cyan-400" /> DIGITAL PROFILE & RESUME
            </h2>
            
            {data.realNameOrDisplay && (
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-200 font-sans tracking-tight">
                {data.realNameOrDisplay}
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white leading-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                themeColor === 'cyan' ? 'from-cyan-400 via-teal-300 to-blue-500' :
                themeColor === 'green' ? 'from-emerald-400 via-green-300 to-teal-500' :
                themeColor === 'purple' ? 'from-purple-400 via-fuchsia-300 to-indigo-500' :
                themeColor === 'amber' ? 'from-amber-400 via-yellow-300 to-orange-500' :
                'from-rose-400 via-pink-300 to-red-500'
              }`}>
                {displayText}
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-mono text-slate-300 font-medium">
              {data.title}
            </p>
          </div>

          {/* Short Tagline / Manifesto */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            "{data.tagline}"
          </p>

          {/* Introvert HUD Metric Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-xs">
              <div className="text-slate-500 flex items-center gap-1.5 mb-1 text-[11px]">
                <Shield className="w-3.5 h-3.5 text-cyan-400" /> ANONYMITY INDEX
              </div>
              <div className="text-base font-bold text-slate-100 flex items-center justify-between">
                <span>100% SECURE</span>
                <span className="text-[10px] text-emerald-400 font-normal">Level 5</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full w-full rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-xs">
              <div className="text-slate-500 flex items-center gap-1.5 mb-1 text-[11px]">
                <BatteryCharging className="w-3.5 h-3.5 text-amber-400" /> SOCIAL BATTERY
              </div>
              <div className="text-base font-bold text-slate-100 flex items-center justify-between">
                <span>15% (ASYNC)</span>
                <span className="text-[10px] text-amber-400 font-normal">Solo Mode</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-amber-400 h-full w-[15%] rounded-full"></div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-xs">
              <div className="text-slate-500 flex items-center gap-1.5 mb-1 text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> DEEP FOCUS
              </div>
              <div className="text-base font-bold text-slate-100 flex items-center justify-between">
                <span>99.8% OUTPUT</span>
                <span className="text-[10px] text-purple-400 font-normal">Flow State</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-purple-400 h-full w-[99%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => {
                playCyberClick();
                onScrollToProjects();
              }}
              className={`px-6 py-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 border ${getAccentGlowClass(themeColor)} hover:scale-[1.02] shadow-lg`}
            >
              <Code2 className="w-4 h-4" />
              <span>VIEW PROJECTS & WORK</span>
            </button>

            <button
              onClick={() => {
                playCyberClick();
                onScrollToContact();
              }}
              className="px-5 py-3 rounded-lg font-mono text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>CONTACT & LINKS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Holographic Cyber Avatar Box */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onMouseEnter={() => {
              setIsHoveredAvatar(true);
              playGlitchSound();
            }}
            onMouseLeave={() => setIsHoveredAvatar(false)}
            className={`relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl bg-slate-950/90 border p-6 flex flex-col justify-between transition-all duration-500 group ${getAccentGlowClass(themeColor)}`}
          >
            {/* Top Hologram Lines */}
            <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 border-b border-slate-800/80 pb-3">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" /> HOLO_IDENTITY
              </span>
              <span>ID: #0x8F92</span>
            </div>

            {/* Futuristic Vector Cyber Mask Visual */}
            <div className="my-auto relative flex flex-col items-center justify-center">
              {/* Outer Glowing Ring */}
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed p-2 flex items-center justify-center transition-transform duration-700 ${isHoveredAvatar ? 'rotate-90 scale-105' : 'rotate-0'} ${
                themeColor === 'cyan' ? 'border-cyan-500/40' :
                themeColor === 'green' ? 'border-emerald-500/40' :
                themeColor === 'purple' ? 'border-purple-500/40' :
                themeColor === 'amber' ? 'border-amber-500/40' : 'border-rose-500/40'
              }`}>
                {/* Cyber Avatar SVG Mask */}
                <div className="w-full h-full rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center relative overflow-hidden group-hover:shadow-inner">
                  <svg className="w-24 h-24 sm:w-28 sm:h-28 text-slate-200" viewBox="0 0 100 100" fill="none">
                    {/* Futuristic Helmet / Visor Cyberpunk Mask */}
                    <path d="M50 15 L80 30 L80 65 L50 90 L20 65 L20 30 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
                    {/* Glowing Neon Visor */}
                    <rect x="30" y="42" width="40" height="12" rx="3" fill={
                      themeColor === 'cyan' ? '#06b6d4' :
                      themeColor === 'green' ? '#10b981' :
                      themeColor === 'purple' ? '#a855f7' :
                      themeColor === 'amber' ? '#f59e0b' : '#f43f5e'
                    } className="animate-pulse" />
                    {/* Circuit lines */}
                    <path d="M50 15 L50 35 M20 48 L30 48 M70 48 L80 48 M35 65 L50 78 L65 65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>

                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanlines pointer-events-none"></div>
                </div>
              </div>

              {/* Holographic Text label */}
              <div className="mt-4 text-center font-mono">
                <div className="text-xs font-bold text-slate-200 tracking-wider">
                  {isHoveredAvatar ? "DECRYPTING..." : "ANONYMOUS_PERSONA"}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  NO FACE RECOGNITION REQUIRED
                </div>
              </div>
            </div>

            {/* Bottom Stealth Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ZERO_PII
              </span>
              <span className="text-slate-500">CLOUDFLARE_READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
