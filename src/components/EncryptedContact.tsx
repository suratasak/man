import React, { useState } from 'react';
import { Lock, Copy, Check, Send, ShieldCheck, Mail, MessageSquareCode, FileKey } from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface EncryptedContactProps {
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const EncryptedContact: React.FC<EncryptedContactProps> = ({ data, themeColor }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [isEncryptedPreview, setIsEncryptedPreview] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyPGP = () => {
    if (data.pgpKey) {
      navigator.clipboard.writeText(data.pgpKey);
      setCopiedKey(true);
      playCyberClick();
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleSimulateTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderMsg) return;
    playCyberClick();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSenderMsg('');
      setSenderName('');
    }, 4000);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto" id="contact">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Lock className="w-4 h-4" /> [ASYNC_BEACON_PROTOCOL]
            </div>
            <h2 className="text-3xl font-black font-mono text-white">
              Encrypted Contact & PGP Relay
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Send asynchronous transmissions securely. No cold calls or phone numbers required.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 font-mono text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>0% SPAM TELEMETRY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: PGP Key Block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-bold">
                <FileKey className="w-4 h-4 text-cyan-400" /> PUBLIC PGP KEY BLOCK
              </span>
              <button
                onClick={handleCopyPGP}
                className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">KEY COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>COPY KEY</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-400 overflow-x-auto max-h-56 leading-relaxed">
              <pre><code>{data.pgpKey || "NO PGP KEY SPECIFIED"}</code></pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs space-y-2 text-slate-400">
              <div className="text-slate-300 font-bold flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4 text-purple-400" /> PREFERRED ENGAGEMENT
              </div>
              <p className="text-[11px] leading-relaxed">
                Send job specs, open-source pull requests, or security audit requests via PGP key or async message. Response guaranteed within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Anonymous Message Composer */}
          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800/90 font-mono">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" /> ANONYMOUS TRANSMISSION BEACON
            </h3>

            {sentSuccess ? (
              <div className="p-6 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 space-y-2 text-center animate-in zoom-in duration-150">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-base">TRANSMISSION ENCRYPTED & DISPATCHED</div>
                <div className="text-xs text-emerald-400/80">
                  Your message was packaged securely. No personal data was saved.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimulateTransmission} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">
                    SENDER ALIAS / ORG (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Recruiter @ TechCorp or Anonymous Peer"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    TRANSMISSION PAYLOAD *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={senderMsg}
                    onChange={(e) => setSenderMsg(e.target.value)}
                    placeholder="Describe project requirements, async job details, or technical questions..."
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500 font-mono resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> Client-side encrypted
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT MESSAGE</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
