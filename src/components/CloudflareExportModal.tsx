import React, { useState } from 'react';
import { Cloud, X, Copy, Check, Download, ExternalLink, Terminal, Shield, Sparkles, FileCode } from 'lucide-react';
import { PortfolioData } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface CloudflareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const CloudflareExportModal: React.FC<CloudflareExportModalProps> = ({ isOpen, onClose, data }) => {
  const [copiedWrangler, setCopiedWrangler] = useState(false);
  const [copiedRoutes, setCopiedRoutes] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'wrangler' | 'export_data'>('guide');

  if (!isOpen) return null;

  const wranglerConfig = `# Cloudflare Pages Configuration (wrangler.toml)
name = "introvert-cyber-portfolio"
compatibility_date = "2026-08-01"
pages_build_output_dir = "dist"

[vars]
PORTFOLIO_ALIAS = "${data.alias}"
ANONYMITY_LEVEL = "MAXIMUM_STEALTH"
`;

  const routesConfig = `{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*"]
}`;

  const deployCommands = `# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Build Static Bundle
npm run build

# 3. Deploy to Cloudflare Pages (Free Tier)
npx wrangler pages deploy dist --project-name=introvert-portfolio`;

  const handleCopy = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    playCyberClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    playCyberClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_${data.alias.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 text-amber-400">
            <Cloud className="w-5 h-5 animate-bounce" />
            <h3 className="text-lg font-bold text-white">CLOUDFLARE PAGES FREE HOSTING GUIDE</h3>
          </div>
          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-5 font-mono text-xs">
          <button
            onClick={() => {
              playCyberClick();
              setActiveTab('guide');
            }}
            className={`py-3 px-4 border-b-2 font-bold transition-colors ${
              activeTab === 'guide' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            DEPLOYMENT STEPS
          </button>
          <button
            onClick={() => {
              playCyberClick();
              setActiveTab('wrangler');
            }}
            className={`py-3 px-4 border-b-2 font-bold transition-colors ${
              activeTab === 'wrangler' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            WRANGLER & CONFIG
          </button>
          <button
            onClick={() => {
              playCyberClick();
              setActiveTab('export_data');
            }}
            className={`py-3 px-4 border-b-2 font-bold transition-colors ${
              activeTab === 'export_data' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            EXPORT BACKUP JSON
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-sans text-xs text-slate-300">
          {activeTab === 'guide' && (
            <div className="space-y-4 font-mono">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-300 space-y-1">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> FREE STATIC HOSTING ADVANTAGES
                </div>
                <p className="text-[11px] text-amber-200/80 leading-relaxed font-sans">
                  Cloudflare Pages provides free unlimited requests, global edge CDN distribution, custom SSL domains, and fast builds. Perfect for a static privacy portfolio!
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold">METHOD A: DIRECT GITHUB CONNECT (RECOMMENDED)</div>
                  <ol className="list-decimal list-inside text-slate-300 space-y-1 text-[11px] font-sans">
                    <li>Push this project repository to your GitHub account.</li>
                    <li>Go to <strong>Cloudflare Dashboard → Workers & Pages → Create Application → Pages</strong>.</li>
                    <li>Connect your GitHub repository.</li>
                    <li>Set Build Command to: <code className="bg-slate-900 px-1 py-0.5 text-amber-300">npm run build</code></li>
                    <li>Set Build Output Directory to: <code className="bg-slate-900 px-1 py-0.5 text-amber-300">dist</code></li>
                    <li>Click <strong>Save and Deploy</strong>. Cloudflare will give you a free <code className="text-cyan-400">*.pages.dev</code> domain!</li>
                  </ol>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold">METHOD B: CLI DEPLOYMENT (WRANGLER)</span>
                    <button
                      onClick={() => handleCopy(deployCommands, setCopiedCommands)}
                      className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-[10px]"
                    >
                      {copiedCommands ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCommands ? "COPIED" : "COPY CLI SCRIPT"}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 bg-slate-900 rounded text-[11px] text-emerald-400 overflow-x-auto">
                    <code>{deployCommands}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wrangler' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-amber-400" /> wrangler.toml
                  </span>
                  <button
                    onClick={() => handleCopy(wranglerConfig, setCopiedWrangler)}
                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedWrangler ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWrangler ? "COPIED" : "COPY CONFIG"}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-amber-300 text-[11px] overflow-x-auto">
                  <code>{wranglerConfig}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-cyan-400" /> public/_routes.json
                  </span>
                  <button
                    onClick={() => handleCopy(routesConfig, setCopiedRoutes)}
                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedRoutes ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedRoutes ? "COPIED" : "COPY ROUTES"}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-cyan-300 text-[11px] overflow-x-auto">
                  <code>{routesConfig}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'export_data' && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-slate-300 font-sans text-xs">
                You can download a full backup JSON of your custom profile settings, traits, skills, and projects at any time.
              </p>

              <button
                onClick={handleDownloadJSON}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PORTFOLIO BACKUP (JSON)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between font-mono text-xs text-slate-500">
          <span>HOSTING COST: $0.00 / MONTH</span>
          <a
            href="https://pages.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>CLOUDFLARE PAGES DOCS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
