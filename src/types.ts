export type ThemeColor = 'cyan' | 'green' | 'purple' | 'amber' | 'rose';

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Systems' | 'AI & ML' | 'Frontend' | 'Security' | 'Open Source';
  tags: string[];
  metrics: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureNotes?: string;
  codeSnippet?: string;
  featured: boolean;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; highlight?: string }[];
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: string;
}

export interface IntrovertTrait {
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  companyOrProject: string;
  period: string; // e.g. "2023 - Present"
  description: string;
  technologies: string[];
}

export interface PortfolioData {
  alias: string;
  realNameOrDisplay?: string;
  title: string;
  tagline: string;
  bio: string;
  privacyLevel: 'Maximum Stealth' | 'High Security' | 'Selective Disclosure';
  locationAlias: string; // e.g., "127.0.0.1 // Deep Web" or "Node_8080 (UTC+7)"
  statusMessage: string;
  avatarStyle: 'cyber_mask' | 'hologram_core' | 'ghost_matrix' | 'neon_owl';
  traits: IntrovertTrait[];
  socials: SocialLink[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  experiences?: ExperienceItem[];
  emailContact?: string;
  pgpKey?: string;
  themeColor: ThemeColor;
  bgEffect: 'matrix' | 'particles' | 'grid_nodes' | 'cyber_scan';
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success';
  content: string;
  timestamp: string;
}
