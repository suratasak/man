import React from 'react';
import { Briefcase, Calendar, Code, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { ExperienceItem, ThemeColor } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface CyberExperienceProps {
  experiences?: ExperienceItem[];
  themeColor: ThemeColor;
  onOpenEditProfile: () => void;
}

export const CyberExperience: React.FC<CyberExperienceProps> = ({
  experiences = [],
  themeColor,
  onOpenEditProfile,
}) => {
  const getThemeTextClass = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return 'text-cyan-400';
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'amber': return 'text-amber-400';
      case 'rose': return 'text-rose-400';
    }
  };

  const getThemeBadgeClass = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/80';
      case 'green': return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80';
      case 'purple': return 'bg-purple-950/60 text-purple-300 border-purple-800/80';
      case 'amber': return 'bg-amber-950/60 text-amber-300 border-amber-800/80';
      case 'rose': return 'bg-rose-950/60 text-rose-300 border-rose-800/80';
    }
  };

  return (
    <section id="experience" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-800/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 tracking-widest uppercase mb-1">
            <Briefcase className={`w-4 h-4 ${getThemeTextClass(themeColor)}`} />
            <span>CAREER & EXPERIENCE TIMELINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100">
            ประวัติการทำงาน & ผลงาน (Work History)
          </h2>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center font-mono">
          <p className="text-slate-400 text-sm">
            ไม่มีรายการประวัติการทำงานในระบบ
          </p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-8 pl-6 md:pl-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-cyan-400 transition-colors flex items-center justify-center`}>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-lg font-mono">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>{exp.role}</span>
                    </h3>
                    <div className="text-xs text-cyan-400 font-medium flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{exp.companyOrProject}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-300 font-sans text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
                    <Code className="w-3.5 h-3.5 text-slate-500 mr-1" />
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md border font-mono ${getThemeBadgeClass(themeColor)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
