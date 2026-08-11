import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PortfolioData, TerminalLog, ThemeColor } from '../types';
import { playTerminalType, playCyberClick, playCyberBeep } from '../utils/soundEffects';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  setThemeColor: (color: ThemeColor) => void;
  onOpenDeployModal: () => void;
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({
  isOpen,
  onClose,
  data,
  setThemeColor,
  onOpenDeployModal,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (logs.length === 0) {
        setLogs([
          {
            id: 'init-1',
            type: 'system',
            content: `NEURAL_CLI v4.2 [ANONYMOUS INTROVERT TERMINAL]\nType 'help' for available commands or 'whoami' to inspect persona.`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playCyberClick();

    const timestamp = new Date().toLocaleTimeString();
    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Math.random().toString(), type: 'input', content: `$ ${inputVal}`, timestamp },
    ];

    let responseContent = '';
    let responseType: TerminalLog['type'] = 'output';

    switch (cmd) {
      case 'help':
        responseContent = `AVAILABLE COMMANDS:
  whoami      - Display digital persona & privacy specs
  skills      - List technical matrix & proficiency
  projects    - Show code projects & system artifacts
  privacy     - Run privacy & zero-PII security check
  contact     - Display PGP key & async communication protocol
  cloudflare  - Launch Cloudflare Pages export assistant
  theme [c]   - Change accent theme (cyan, green, purple, amber, rose)
  motto       - Print introvert developer manifesto
  clear       - Clear terminal output
  exit        - Close terminal shell`;
        break;

      case 'whoami':
        responseContent = `ALIAS: ${data.alias}
TITLE: ${data.title}
STATUS: ${data.statusMessage}
PRIVACY: ${data.privacyLevel} (100% Zero PII)
LOCATION: ${data.locationAlias}
BIO: ${data.bio}`;
        break;

      case 'skills':
        responseContent = data.skills
          .map((c) => `[${c.name.toUpperCase()}]\n` + c.skills.map((s) => `  • ${s.name}: ${s.level}% (${s.highlight || ''})`).join('\n'))
          .join('\n\n');
        break;

      case 'projects':
        responseContent = data.projects
          .map((p) => `[${p.title}]\n  Category: ${p.category} | Tags: ${p.tags.join(', ')}\n  Metric: ${p.metrics}`)
          .join('\n\n');
        break;

      case 'privacy':
        responseType = 'success';
        responseContent = `SECURITY DIAGNOSTIC RESULT:
  [✓] Real Name: Hidden
  [✓] Face Recognition: Disabled (Holographic Avatar active)
  [✓] Tracking Cookies: 0 Detected
  [✓] Analytics Telemetry: Stripped
  [✓] Privacy Rating: 100% (Maximum Stealth)`;
        break;

      case 'contact':
        responseContent = `ASYNC COMMUNICATIONS ONLY.
PGP KEY FINGERPRINT: 4A89 9C21 FF00 1024
Send encrypted transmissions via PGP block on portfolio footer.`;
        break;

      case 'cloudflare':
        responseContent = `Launching Cloudflare Pages Export Assistant...`;
        responseType = 'system';
        setTimeout(() => onOpenDeployModal(), 500);
        break;

      case 'motto':
        responseContent = `"I let my code speak, so I don't have to."
- Introvert Developer Mantra`;
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      case 'sudo':
        responseType = 'error';
        responseContent = `Sudo access denied: Introverts do not grant root access without prior pull-request approval in writing!`;
        playCyberBeep(400);
        break;

      default:
        if (cmd.startsWith('theme ')) {
          const colorArg = cmd.split(' ')[1] as ThemeColor;
          if (['cyan', 'green', 'purple', 'amber', 'rose'].includes(colorArg)) {
            setThemeColor(colorArg);
            responseContent = `Theme accent switched to [${colorArg.toUpperCase()}].`;
            responseType = 'success';
          } else {
            responseContent = `Invalid theme. Choose: cyan, green, purple, amber, rose`;
            responseType = 'error';
          }
        } else {
          responseType = 'error';
          responseContent = `Command not recognized: '${cmd}'. Type 'help' for command list.`;
          playCyberBeep(300);
        }
        break;
    }

    setLogs([...newLogs, { id: Math.random().toString(), type: responseType, content: responseContent, timestamp }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`w-full bg-slate-950 border border-slate-700 rounded-xl shadow-2xl flex flex-col font-mono text-xs overflow-hidden transition-all ${
          isMaximized ? 'h-full max-w-none' : 'max-w-4xl h-[80vh]'
        }`}
      >
        {/* Top Title Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">GHOST_TERMINAL_v4.2</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">[INTERACTIVE CLI]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playCyberClick();
                setIsMaximized(!isMaximized);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              className="p-1 rounded hover:bg-rose-950/80 hover:text-rose-400 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Log Window */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-slate-300 bg-slate-950/90 leading-relaxed">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.type === 'input' && (
                <div className="text-cyan-400 font-bold flex items-center gap-2">
                  <span>{log.content}</span>
                </div>
              )}
              {log.type === 'output' && (
                <pre className="text-slate-300 whitespace-pre-wrap font-mono pl-3 border-l border-slate-800">
                  {log.content}
                </pre>
              )}
              {log.type === 'system' && (
                <div className="text-amber-400 font-medium p-2 rounded bg-amber-950/30 border border-amber-900/40">
                  {log.content}
                </div>
              )}
              {log.type === 'success' && (
                <div className="text-emerald-400 font-medium p-2 rounded bg-emerald-950/30 border border-emerald-900/40 whitespace-pre-wrap">
                  {log.content}
                </div>
              )}
              {log.type === 'error' && (
                <div className="text-rose-400 font-medium p-2 rounded bg-rose-950/30 border border-rose-900/40">
                  {log.content}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              playTerminalType();
            }}
            placeholder="Type command ('help', 'whoami', 'skills', 'projects', 'cloudflare', 'clear')..."
            className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs placeholder-slate-600"
          />
          <button type="submit" className="text-slate-500 hover:text-cyan-400 p-1">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
