import React from 'react';
import { ShieldCheck, Terminal, Heart, Cloud, Code2 } from 'lucide-react';
import { playCyberClick } from '../utils/soundEffects';

interface CyberFooterProps {
  alias: string;
  onOpenTerminal: () => void;
  onOpenDeployModal: () => void;
}

export const CyberFooter: React.FC<CyberFooterProps> = ({ alias, onOpenTerminal, onOpenDeployModal }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 font-mono text-xs text-slate-500 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-cyan-400">{alias}</strong>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">100% Privacy Preserved (Zero PII)</span>
        </div>

        {/* Center shortcuts */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playCyberClick();
              onOpenTerminal();
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors flex items-center gap-1.5 text-[11px]"
          >
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>TERMINAL (~)</span>
          </button>

          <button
            onClick={() => {
              playCyberClick();
              onOpenDeployModal();
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 hover:border-slate-700 transition-colors flex items-center gap-1.5 text-[11px]"
          >
            <Cloud className="w-3 h-3" />
            <span>CLOUDFLARE PAGES READY</span>
          </button>
        </div>

        {/* Right copyright */}
        <div className="text-[11px] text-slate-600 flex items-center gap-1">
          <span>STATIC PORTFOLIO ENGINE v4.2 • MIT LICENSE</span>
        </div>
      </div>
    </footer>
  );
};
