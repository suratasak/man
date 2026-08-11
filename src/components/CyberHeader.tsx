import React, { useState, useEffect } from 'react';
import { ShieldCheck, Volume2, VolumeX, Terminal, Edit3, Cloud, Palette, Sparkles } from 'lucide-react';
import { ThemeColor } from '../types';
import { playCyberClick, toggleSound, isSoundEnabled } from '../utils/soundEffects';

interface CyberHeaderProps {
  alias: string;
  privacyLevel: string;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  onOpenTerminal: () => void;
  onOpenEditor: () => void;
  onOpenDeployModal: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps & { realNameOrDisplay?: string }> = ({
  alias,
  realNameOrDisplay,
  privacyLevel,
  themeColor,
  setThemeColor,
  onOpenTerminal,
  onOpenEditor,
  onOpenDeployModal,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playCyberClick();
  };

  const themeColors: { id: ThemeColor; name: string; bgClass: string; borderClass: string }[] = [
    { id: 'cyan', name: 'Cyber Cyan', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-400' },
    { id: 'green', name: 'Matrix Green', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-400' },
    { id: 'purple', name: 'Neon Violet', bgClass: 'bg-purple-500', borderClass: 'border-purple-400' },
    { id: 'amber', name: 'Retro Amber', bgClass: 'bg-amber-500', borderClass: 'border-amber-400' },
    { id: 'rose', name: 'Synth Rose', bgClass: 'bg-rose-500', borderClass: 'border-rose-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left: Brand / Alias */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/60 font-mono text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-bold tracking-wider text-cyan-400">
              {realNameOrDisplay ? realNameOrDisplay : alias}
            </span>
            {realNameOrDisplay && (
              <span className="text-[10px] text-slate-400 hidden md:inline font-mono">({alias})</span>
            )}
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" /> {privacyLevel}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-500 font-mono text-[11px]">
            <span>SYS_TIME: <strong className="text-slate-300">{timeStr}</strong></span>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Sound Synth Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? "Mute Cyber Audio FX" : "Enable Cyber Audio FX (Web Audio)"}
            className={`p-2 rounded border transition-all flex items-center gap-1.5 font-mono ${
              soundOn 
                ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline text-[11px]">{soundOn ? "AUDIO ON" : "AUDIO OFF"}</span>
          </button>

          {/* Theme Color Picker */}
          <div className="relative">
            <button
              onClick={() => {
                playCyberClick();
                setShowThemePicker(!showThemePicker);
              }}
              className="p-2 rounded bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 font-mono"
              title="Change Futuristic Theme Color"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline text-[11px]">THEME</span>
            </button>

            {showThemePicker && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-slate-700 rounded-lg shadow-xl backdrop-blur-lg p-2.5 z-50 animate-in fade-in zoom-in duration-150">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 px-1 flex items-center justify-between">
                  <span>Accent Color</span>
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  {themeColors.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setThemeColor(t.id);
                        setShowThemePicker(false);
                        playCyberClick();
                      }}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left font-mono transition-colors text-xs ${
                        themeColor === t.id
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${t.bgClass} ${themeColor === t.id ? t.borderClass + ' ring-2 ring-offset-1 ring-offset-slate-900' : ''}`} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenTerminal();
            }}
            className="p-2 rounded bg-slate-900/80 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-950/60 transition-all flex items-center gap-1.5 font-mono group"
            title="Open Interactive Terminal (~)"
          >
            <Terminal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-[11px]">TERMINAL</span>
            <span className="hidden lg:inline text-[9px] px-1 bg-slate-800 rounded text-slate-400 border border-slate-700">~</span>
          </button>

          {/* Customizer Modal Button */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenEditor();
            }}
            className="px-3 py-1.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/50 hover:bg-purple-900/80 transition-all flex items-center gap-1.5 font-mono shadow-[0_0_10px_rgba(168,85,247,0.2)]"
            title="ระบุหรือแก้ไขข้อมูลส่วนตัวของคุณ"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-bold">ใส่ข้อมูลส่วนตัว (PROFILE)</span>
          </button>

          {/* Cloudflare Pages Deploy Guide Button */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenDeployModal();
            }}
            className="px-3 py-1.5 rounded bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/40 hover:border-amber-400/80 transition-all flex items-center gap-1.5 font-mono font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]"
          >
            <Cloud className="w-3.5 h-3.5 animate-bounce" />
            <span>HOST ON CLOUDFLARE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
