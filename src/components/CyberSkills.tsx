import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles, Check, Copy, Code2, Server, Shield, Layers } from 'lucide-react';
import { SkillCategory, ThemeColor } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface CyberSkillsProps {
  skillCategories: SkillCategory[];
  themeColor: ThemeColor;
}

export const CyberSkills: React.FC<CyberSkillsProps> = ({ skillCategories, themeColor }) => {
  const [copied, setCopied] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getAccentColorClass = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-500 text-cyan-400 border-cyan-500/50';
      case 'green': return 'bg-emerald-500 text-emerald-400 border-emerald-500/50';
      case 'purple': return 'bg-purple-500 text-purple-400 border-purple-500/50';
      case 'amber': return 'bg-amber-500 text-amber-400 border-amber-500/50';
      case 'rose': return 'bg-rose-500 text-rose-400 border-rose-500/50';
    }
  };

  const handleCopyStack = () => {
    const allSkillsStr = skillCategories
      .flatMap((cat) => cat.skills.map((s) => `${s.name} (${s.level}%)`))
      .join(' • ');
    navigator.clipboard.writeText(allSkillsStr);
    setCopied(true);
    playCyberClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto" id="skills">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Cpu className="w-4 h-4" /> [TECHNICAL_MATRIX_v4]
          </div>
          <h2 className="text-3xl font-black font-mono text-white">
            Skill Stack & Capabilities
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Tested in production environments with high uptime requirements and zero bloat.
          </p>
        </div>

        <button
          onClick={handleCopyStack}
          className="self-start md:self-auto px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 font-mono text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">STACK COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>COPY TECH STACK SUMMARY</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, catIdx) => (
          <div
            key={catIdx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                {catIdx === 0 ? <Code2 className="w-5 h-5 text-cyan-400" /> : <Server className="w-5 h-5 text-purple-400" />}
                {category.name}
              </h3>
              <span className="font-mono text-xs text-slate-500">
                {category.skills.length} NODES
              </span>
            </div>

            <div className="space-y-5">
              {category.skills.map((skill, skillIdx) => (
                <div
                  key={skillIdx}
                  onClick={() => {
                    playCyberClick();
                    setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                  }}
                  className={`cursor-pointer p-3 rounded-lg border transition-all ${
                    selectedSkill === skill.name
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-bold text-slate-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {skill.name}
                    </span>
                    <span className="text-slate-400 font-bold">{skill.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        themeColor === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-teal-400' :
                        themeColor === 'green' ? 'bg-gradient-to-r from-emerald-500 to-green-400' :
                        themeColor === 'purple' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-400' :
                        themeColor === 'amber' ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                        'bg-gradient-to-r from-rose-500 to-pink-400'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {skill.highlight && (
                    <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{skill.highlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
