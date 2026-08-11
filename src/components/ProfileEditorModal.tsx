import React, { useState } from 'react';
import { Edit3, X, Save, RefreshCw, Sparkles, Check, Briefcase, User, Code, FileText, Plus, Trash2, Globe, Mail } from 'lucide-react';
import { PortfolioData, ThemeColor, ExperienceItem, ProjectItem } from '../types';
import { playCyberClick } from '../utils/soundEffects';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<PortfolioData>({
    ...data,
    experiences: data.experiences || [],
  });
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'projects' | 'paste'>('info');
  const [resumeText, setResumeText] = useState('');
  const [parsedStatus, setParsedStatus] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberClick();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  // Add new experience
  const handleAddExperience = () => {
    playCyberClick();
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Software Developer',
      companyOrProject: 'Tech Company / Freelance',
      period: '2023 - Present',
      description: 'พัฒนาและดูแลระบบเว็บแอปพลิเคชันด้วยเทคโนโลยีสมัยใหม่',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS']
    };
    setFormData({
      ...formData,
      experiences: [newExp, ...(formData.experiences || [])]
    });
  };

  // Delete experience
  const handleDeleteExperience = (id: string) => {
    playCyberClick();
    setFormData({
      ...formData,
      experiences: (formData.experiences || []).filter(e => e.id !== id)
    });
  };

  // Update experience field
  const handleUpdateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    setFormData({
      ...formData,
      experiences: (formData.experiences || []).map(exp => {
        if (exp.id === id) {
          if (field === 'technologies' && typeof value === 'string') {
            return { ...exp, technologies: value.split(',').map(s => s.trim()).filter(Boolean) };
          }
          return { ...exp, [field]: value };
        }
        return exp;
      })
    });
  };

  // Simple Bio / Resume Parser
  const handleParseResume = () => {
    playCyberClick();
    if (!resumeText.trim()) return;

    setParsedStatus('กำลังประมวลผลข้อมูล...');
    
    setTimeout(() => {
      const text = resumeText;
      let newAlias = formData.alias;
      let newRealName = formData.realNameOrDisplay || '';
      let newTitle = formData.title;
      let newEmail = formData.emailContact || '';
      let newBio = formData.bio;

      // Extract Name / Real name
      const nameMatch = text.match(/(?:ชื่อ|name|i'm|i am|iam)\s*[:=]?\s*([^\n\r,]+)/i);
      if (nameMatch) {
        newRealName = nameMatch[1].trim();
        if (!newAlias || newAlias.startsWith('GHOST_PROTOCOL')) {
          newAlias = nameMatch[1].trim().replace(/\s+/g, '_').toUpperCase();
        }
      }

      // Extract Role / Position
      const titleMatch = text.match(/(?:ตำแหน่ง|position|role|title|developer|engineer|designer|architect)\s*[:=]?\s*([^\n\r,]+)/i);
      if (titleMatch) {
        newTitle = titleMatch[1].trim();
      }

      // Extract Email
      const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) {
        newEmail = emailMatch[0].trim();
      }

      // Use entire text or summary as bio if comprehensive
      if (text.length > 30) {
        newBio = text.slice(0, 300).trim() + (text.length > 300 ? '...' : '');
      }

      setFormData(prev => ({
        ...prev,
        alias: newAlias,
        realNameOrDisplay: newRealName,
        title: newTitle,
        emailContact: newEmail,
        bio: newBio,
      }));

      setParsedStatus('✓ ดึงข้อมูลประวัติส่วนตัวลงแบบฟอร์มเรียบร้อยแล้ว!');
      setTimeout(() => {
        setActiveTab('info');
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2.5 text-slate-100">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">ระบุข้อมูลส่วนตัวของคุณ (SETUP PROFILE)</h3>
              <p className="text-[11px] text-slate-400 font-sans">กรอกข้อมูลประวัติส่วนตัว ทักษะ ผลงาน และช่องทางติดต่อเพื่อแสดงในเว็บไซต์</p>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto font-mono text-xs text-slate-300">
          <button
            type="button"
            onClick={() => { playCyberClick(); setActiveTab('info'); }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === 'info' ? 'border-cyan-400 text-cyan-400 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. ข้อมูลทั่วไป (Basic Info)</span>
          </button>

          <button
            type="button"
            onClick={() => { playCyberClick(); setActiveTab('experience'); }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === 'experience' ? 'border-cyan-400 text-cyan-400 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. ประวัติการทำงาน ({formData.experiences?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => { playCyberClick(); setActiveTab('projects'); }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === 'projects' ? 'border-cyan-400 text-cyan-400 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>3. โปรเจกต์ & Links ({formData.projects?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => { playCyberClick(); setActiveTab('paste'); }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === 'paste' ? 'border-purple-400 text-purple-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-purple-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-300 font-bold">4. วาง Resume / Bio (Auto Fill)</span>
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSaveSubmit} className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'info' && (
            <div className="space-y-5">
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/50 text-cyan-200 text-xs font-sans">
                💡 <strong>คำแนะนำ:</strong> กรอกชื่อและบทบาทของคุณ ข้อมูลเหล่านี้จะถูกนำไปแสดงเป็นหน้าหลัก (Hero Section) และ Header ในเว็บไซต์
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">ชื่อเต็ม / Display Name *</label>
                  <input
                    type="text"
                    placeholder="เช่น สุนทร สุขเจริญ (Sunthon)"
                    value={formData.realNameOrDisplay || ''}
                    onChange={(e) => setFormData({ ...formData, realNameOrDisplay: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-100 font-bold outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">นามแฝง / Handle / Alias *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น GHOST_DEV หรือ SUNTHON_X"
                    value={formData.alias}
                    onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-bold outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">ตำแหน่ง / สายงาน (Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น Senior Full-Stack Developer & Systems Architect"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">อีเมลติดต่อ (Email)</label>
                  <input
                    type="email"
                    placeholder="เช่น dev.mycontact@gmail.com"
                    value={formData.emailContact || ''}
                    onChange={(e) => setFormData({ ...formData, emailContact: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">สโลแกน / คติประจำใจ (Tagline)</label>
                <input
                  type="text"
                  placeholder="เช่น เขียนโค้ดคุณภาพสูง เน้นระบบรวดเร็ว ปลอดภัย และดูแลง่าย"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">แนะนำตัวเอง / Bio (About Yourself)</label>
                <textarea
                  rows={4}
                  placeholder="เขียนอธิบายประวัติส่วนตัว สไตล์การทำงาน หรือจุดเด่นของคุณที่นี่..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500 resize-none font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">ที่อยู่ / พิกัด (Location / Node)</label>
                  <input
                    type="text"
                    placeholder="เช่น Bangkok, Thailand // Node_UTC+7"
                    value={formData.locationAlias}
                    onChange={(e) => setFormData({ ...formData, locationAlias: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">สถานะปัจจุบัน (Status Message)</label>
                  <input
                    type="text"
                    placeholder="เช่น พร้อมรับงาน Freelance / Open for full-time opportunities"
                    value={formData.statusMessage}
                    onChange={(e) => setFormData({ ...formData, statusMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-emerald-400 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WORK EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">ประวัติการทำงานและการศึกษา (Work History & Education)</h4>
                  <p className="text-slate-400 font-sans text-xs">ระบุตำแหน่งงาน บริษัท/องค์กร ช่วงเวลา และรายละเอียดผลงานที่เคยทำ</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ เพิ่มตำแหน่งงาน</span>
                </button>
              </div>

              {(!formData.experiences || formData.experiences.length === 0) ? (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-slate-500 font-sans">
                  ยังไม่มีรายการประวัติการทำงาน กดปุ่ม "+ เพิ่มตำแหน่งงาน" ด้านบนเพื่อเริ่มบันทึก
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-cyan-400 font-bold">รายการที่ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">ตำแหน่งงาน (Role)</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">บริษัท / โครงการ (Company / Project)</label>
                          <input
                            type="text"
                            value={exp.companyOrProject}
                            onChange={(e) => handleUpdateExperience(exp.id, 'companyOrProject', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">ช่วงเวลา (Period)</label>
                          <input
                            type="text"
                            placeholder="เช่น 2022 - Present หรือ ม.ค. 2021 - ธ.ค. 2023"
                            value={exp.period}
                            onChange={(e) => handleUpdateExperience(exp.id, 'period', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">เทคโนโลยีที่ใช้ (เว้นด้วยเครื่องหมายจุลภาค ,)</label>
                          <input
                            type="text"
                            placeholder="เช่น React, Node.js, PostgreSQL"
                            value={exp.technologies?.join(', ') || ''}
                            onChange={(e) => handleUpdateExperience(exp.id, 'technologies', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">รายละเอียดงานและความสำเร็จ</label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-500 font-sans text-xs resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS & SOCIAL LINKS */}
          {activeTab === 'projects' && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-slate-200">ช่องทางติดต่อ & โซเชียล (Social & Links)</h4>
              
              <div className="space-y-3">
                {formData.socials.map((soc, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <label className="block text-slate-500 text-[10px]">PLATFORM</label>
                      <input
                        type="text"
                        value={soc.platform}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].platform = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px]">HANDLE / USERNAME</label>
                      <input
                        type="text"
                        value={soc.handle}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].handle = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px]">URL</label>
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].url = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PASTE RESUME / BIO AUTO FILL */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/60 text-purple-200 font-sans text-xs">
                ✨ <strong>ระบบช่วยดึงข้อมูลจากประวัติ (Resume Quick Parser):</strong> วางข้อความประวัติส่วนตัว CV หรือ Resume ของคุณลงในช่องด้านล่าง แล้วกดปุ่มประมวลผล ระบบจะพยายามดึง ชื่อ, ตำแหน่ง, อีเมล และเนื้อหามาลงในแบบฟอร์มให้อัตโนมัติ!
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ข้อความประวัติส่วนตัว / Resume Text:</label>
                <textarea
                  rows={8}
                  placeholder={`วางข้อความประวัติส่วนตัวของคุณที่นี่ เช่น:
ชื่อ: สมชาย ใจดี
ตำแหน่ง: Senior Full Stack Developer
อีเมล: somchai@gmail.com
เกี่ยวกับฉัน: เป็นนักพัฒนาซอฟต์แวร์ที่มีประสบการณ์ในการทำระบบ Web Application ด้วย React และ Node.js มากกว่า 4 ปี...`}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-purple-900/60 text-slate-200 font-sans text-xs outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleParseResume}
                  className="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors flex items-center gap-2 text-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ประมวลผลและดึงลงแบบฟอร์ม (Auto-Fill Form)</span>
                </button>

                {parsedStatus && (
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {parsedStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-5 mt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                playCyberClick();
                onReset();
                onClose();
              }}
              className="px-3 py-2 rounded bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>คืนค่าเริ่มต้น (Reset Default)</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                ยกเลิก (Cancel)
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 text-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> บันทึกข้อมูลแล้ว!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> บันทึกข้อมูลโปรไฟล์ (SAVE)
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
