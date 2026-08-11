import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, FileCode, Clock, MessageSquare, Lock, HeartHandshake } from 'lucide-react';
import { IntrovertTrait, ThemeColor } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface PrivacyShieldBannerProps {
  traits: IntrovertTrait[];
  themeColor: ThemeColor;
}

export const PrivacyShieldBanner: React.FC<PrivacyShieldBannerProps> = ({ traits, themeColor }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'comparison'>('philosophy');

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTROVERT MANIFESTO & PRIVACY POLICY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-white">
              Why an Anonymous / Low-Key Portfolio?
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
              Focusing 100% on software craft, system durability, and clean architecture without unnecessary social noise or personal disclosure.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 font-mono text-xs">
            <button
              onClick={() => {
                playCyberClick();
                setActiveTab('philosophy');
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'philosophy'
                  ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CORE TRAITS
            </button>
            <button
              onClick={() => {
                playCyberClick();
                setActiveTab('comparison');
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'comparison'
                  ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ASYNC VS MEETINGS
            </button>
          </div>
        </div>

        {activeTab === 'philosophy' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {traits.map((trait, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-2">
                    <span className="text-cyan-400 font-bold">0{idx + 1}</span>
                    <Lock className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="font-mono text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                    {trait.label}
                  </h3>
                  <div className="inline-block my-1.5 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-emerald-400">
                    {trait.value}
                  </div>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> WHAT YOU GET (HIGH OUTPUT)
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Deep focus engineering & clean, well-tested TypeScript codebase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Detailed written PRs, API specifications & architectural diagrams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Asynchronous efficiency (Slack, Discord, PGP, GitHub issues)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Zero-downtime deployment pipelines on Cloudflare Workers/Pages</span>
                </li>
              </ul>
            </div>

            {/* Omitted */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <XCircle className="w-4 h-4 text-slate-500" /> WHAT IS OMITTED (PRIVACY SHIELD)
              </div>
              <ul className="space-y-2 text-slate-500">
                <li className="flex items-start gap-2">
                  <span>✕</span>
                  <span>Unscheduled video calls or daily non-essential meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✕</span>
                  <span>Personal address, private family data, or social media life updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✕</span>
                  <span>Unnecessary camera feeds or superficial self-promotions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✕</span>
                  <span>Intrusive tracking cookies or third-party analytics telemetry</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
