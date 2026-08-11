import React, { useState } from 'react';
import { Code2, ExternalLink, Github, Terminal, Layers, Eye, ChevronRight, FileCode, Cpu, CheckCircle } from 'lucide-react';
import { ProjectItem, ThemeColor } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface CyberProjectsProps {
  projects: ProjectItem[];
  themeColor: ThemeColor;
}

export const CyberProjects: React.FC<CyberProjectsProps> = ({ projects, themeColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'code' | 'architecture'>('overview');

  const categories = ['All', 'Systems', 'AI & ML', 'Frontend', 'Security', 'Open Source'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto" id="projects">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Layers className="w-4 h-4" /> [PROJECT_SHOWCASE_v4]
          </div>
          <h2 className="text-3xl font-black font-mono text-white">
            Code Artifacts & Systems
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Real software built for performance, anonymity, and zero-maintenance static hosting.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700/90 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-medium">
                  {proj.category}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {proj.metrics}
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>

              <p className="text-slate-300 text-sm mt-2 leading-relaxed font-sans">
                {proj.shortDesc}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => {
                  playCyberClick();
                  setActiveProjectModal(proj);
                  setModalTab('overview');
                }}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-bold transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT SPECS & CODE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-slate-950 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1"
                    title="Live Demo on Cloudflare Pages"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Project Inspection Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  PROJECT SPECIFICATION INSPECTOR
                </span>
                <h3 className="text-xl font-bold font-mono text-white">
                  {activeProjectModal.title}
                </h3>
              </div>

              <button
                onClick={() => {
                  playCyberClick();
                  setActiveProjectModal(null);
                }}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 font-mono text-xs"
              >
                ✕ ESC
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950 px-5 font-mono text-xs">
              <button
                onClick={() => {
                  playCyberClick();
                  setModalTab('overview');
                }}
                className={`py-3 px-4 border-b-2 font-bold transition-colors ${
                  modalTab === 'overview'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                OVERVIEW
              </button>
              {activeProjectModal.codeSnippet && (
                <button
                  onClick={() => {
                    playCyberClick();
                    setModalTab('code');
                  }}
                  className={`py-3 px-4 border-b-2 font-bold transition-colors ${
                    modalTab === 'code'
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  CODE SNIPPET
                </button>
              )}
              {activeProjectModal.architectureNotes && (
                <button
                  onClick={() => {
                    playCyberClick();
                    setModalTab('architecture');
                  }}
                  className={`py-3 px-4 border-b-2 font-bold transition-colors ${
                    modalTab === 'architecture'
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ARCHITECTURE
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm text-slate-300">
              {modalTab === 'overview' && (
                <div className="space-y-4">
                  <p className="leading-relaxed text-slate-200">
                    {activeProjectModal.fullDesc}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="text-slate-500 font-bold">PERFORMANCE & METRICS</div>
                    <div className="text-emerald-400">{activeProjectModal.metrics}</div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-slate-400 uppercase font-bold mb-2">
                      TECH STACK USED:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProjectModal.tags.map((t) => (
                        <span key={t} className="px-3 py-1 bg-slate-800 rounded font-mono text-xs text-cyan-300 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'code' && activeProjectModal.codeSnippet && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre className="leading-relaxed">
                    <code>{activeProjectModal.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {modalTab === 'architecture' && activeProjectModal.architectureNotes && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> SYSTEM DESIGN NOTES
                  </div>
                  <p className="leading-relaxed text-slate-300 font-sans">
                    {activeProjectModal.architectureNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">
                CLOUDFLARE PAGES READY
              </span>
              <div className="flex gap-2">
                {activeProjectModal.demoUrl && (
                  <a
                    href={activeProjectModal.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
