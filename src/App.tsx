import React, { useState, useEffect } from 'react';
import { PortfolioData, ThemeColor } from './types';
import { defaultPortfolioData } from './data/defaultPortfolio';
import { MatrixBackground } from './components/MatrixBackground';
import { CyberHeader } from './components/CyberHeader';
import { CyberHero } from './components/CyberHero';
import { PrivacyShieldBanner } from './components/PrivacyShieldBanner';
import { CyberSkills } from './components/CyberSkills';
import { CyberExperience } from './components/CyberExperience';
import { CyberProjects } from './components/CyberProjects';
import { EncryptedContact } from './components/EncryptedContact';
import { TerminalOverlay } from './components/TerminalOverlay';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { CloudflareExportModal } from './components/CloudflareExportModal';
import { CyberFooter } from './components/CyberFooter';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('introvert_portfolio_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return defaultPortfolioData;
  });

  const [themeColor, setThemeColor] = useState<ThemeColor>(portfolioData.themeColor || 'cyan');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Keyboard shortcut listener disabled


  const handleSaveData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    setThemeColor(newData.themeColor);
    try {
      localStorage.setItem('introvert_portfolio_data', JSON.stringify(newData));
    } catch {
      // Ignore
    }
  };

  const handleResetData = () => {
    setPortfolioData(defaultPortfolioData);
    setThemeColor(defaultPortfolioData.themeColor);
    try {
      localStorage.removeItem('introvert_portfolio_data');
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0e0e0] font-mono relative overflow-x-hidden selection:bg-[#33ffaa] selection:text-[#080808]">
      {/* Elegant Dark Radial Dot Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 elegant-radial-grid z-0" />
      
      {/* Elegant Dark CRT Scanline Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] elegant-scanlines z-0" />

      {/* Matrix / Particle Background Canvas */}
      <MatrixBackground effect={portfolioData.bgEffect} themeColor={themeColor} />

      {/* Main Cyber Header */}
      <CyberHeader
        alias={portfolioData.alias}
        realNameOrDisplay={portfolioData.realNameOrDisplay}
        privacyLevel={portfolioData.privacyLevel}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-8 pb-16">
        <CyberHero
          data={portfolioData}
          themeColor={themeColor}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onScrollToProjects={() => scrollToSection('projects')}
          onScrollToContact={() => scrollToSection('contact')}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <PrivacyShieldBanner
          traits={portfolioData.traits}
          themeColor={themeColor}
        />

        <CyberExperience
          experiences={portfolioData.experiences}
          themeColor={themeColor}
          onOpenEditProfile={() => setIsEditorOpen(true)}
        />

        <CyberSkills
          skillCategories={portfolioData.skills}
          themeColor={themeColor}
        />

        <CyberProjects
          projects={portfolioData.projects}
          themeColor={themeColor}
        />

        <EncryptedContact
          data={portfolioData}
          themeColor={themeColor}
        />
      </main>

      {/* Elegant Dark Marquee Ticker Bar */}
      <div className="h-10 border-t border-[#ffffff15] bg-[#080808a0] backdrop-blur-md flex items-center px-4 overflow-hidden relative z-20">
        <div className="flex items-center gap-12 animate-elegant-marquee whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#33ffaa]/60 font-mono">
          <span>[SYSTEM_STATUS: ONLINE]</span>
          <span>Security Level: Alpha Zero-Knowledge</span>
          <span>Static Deployment: Cloudflare Pages Ready</span>
          <span>Privacy Protocol: Maximum Stealth (Zero PII)</span>
          <span>Async Beacon Active</span>
          <span>Edge Node: Global CDN</span>
          <span>[SYSTEM_STATUS: ONLINE]</span>
          <span>Security Level: Alpha Zero-Knowledge</span>
          <span>Static Deployment: Cloudflare Pages Ready</span>
          <span>Privacy Protocol: Maximum Stealth (Zero PII)</span>
          <span>Async Beacon Active</span>
          <span>Edge Node: Global CDN</span>
        </div>
      </div>

      {/* Footer */}
      <CyberFooter
        alias={portfolioData.alias}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Modals & Terminal Shell */}
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        data={portfolioData}
        setThemeColor={setThemeColor}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      <ProfileEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={portfolioData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      <CloudflareExportModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        data={portfolioData}
      />
    </div>
  );
}
