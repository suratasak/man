import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  alias: "MAN_PROFILE",
  realNameOrDisplay: "Man Profile (คุณแมน)",
  emailContact: "suratasak@gmail.com",
  title: "CEO FATATECH THAILAND",
  tagline: "I write for testing my personal website.",
  bio: "Experienced Passionate about building fast.",
  privacyLevel: "Selective Disclosure",
  locationAlias: "Bangkok, Thailand",
  statusMessage: "Available for new projects",
  avatarStyle: "cyber_mask",
  themeColor: "cyan",
  bgEffect: "matrix",
  experiences: [
    {
      id: "exp-1",
      role: "Co-founder and CEO",
      companyOrProject: "FATATECH THAILAND",
      period: "2018 - Present",
      description: "Local System Integrator in Thailand.",
      technologies: ["Networking", "Cloud Computing", "Cyber Security", "Cabling and Datacenter implementator", "Project management"]
    },
    {
      id: "exp-2",
      role: "Project Manager",
      companyOrProject: "NextStep",
      period: "2017 - 2018",
      description: "Developed and Managed PM team.",
      technologies: ["Computer Skill", "People Management", "Project Management"]
    }
  ],
  pgpKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://openpgpjs.org

mQENBF+1aX8BCACz8s9dYqX5zW+4uR0vK2M1O+9m2zX3sR8t1q2W4e5r...
[ANONYMOUS PGP KEY FOR SECURE ASYNC TRANSMISSION]
-----END PGP PUBLIC KEY BLOCK-----`,
    socials: [
    {
      platform: "GitHub",
      handle: "@ghost-dev-proto",
      url: "https://github.com",
      icon: "Github"
    },
    {
      platform: "Codeberg",
      handle: "ghost_dev",
      url: "https://codeberg.org",
      icon: "GitBranch"
    },
    {
      platform: "X / Twitter",
      handle: "@anon_synth",
      url: "https://x.com",
      icon: "Twitter"
    },
    {
      platform: "Discord",
      handle: "ghost#0001",
      url: "https://discord.com",
      icon: "MessageCircle"
    }
  ],
  skills: [
    {
      name: "Core Tech Stack",
      skills: [
        { name: "TypeScript / React / Vite", level: 95, highlight: "Full-stack & State architecture" },
        { name: "Node.js & Express / Hono", level: 92, highlight: "Async I/O & Microservices" },
        { name: "Go (Golang)", level: 88, highlight: "High concurrency backend" },
        { name: "Tailwind CSS & Motion", level: 96, highlight: "Cyberpunk & Futuristic UI design" },
        { name: "Cloudflare Workers & Pages", level: 90, highlight: "Edge serverless deployment" }
      ]
    },
    {
      name: "Security & Systems",
      skills: [
        { name: "Zero Trust Architecture", level: 88, highlight: "Auth & Cryptography" },
        { name: "Docker & Kubernetes", level: 85, highlight: "Container orchestration" },
        { name: "PostgreSQL & Redis", level: 90, highlight: "Data caching & relational models" },
        { name: "WebSockets & WebAudio", level: 87, highlight: "Real-time & synth UI sounds" }
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "CYBER_VAULT - Zero Knowledge Encrypted Notes",
      shortDesc: "End-to-end encrypted browser notes application running fully on Cloudflare Pages.",
      fullDesc: "A lightweight, privacy-first web application for storing sensitive snippets with client-side AES-256-GCM encryption. Built without tracking scripts or analytics cookies.",
      category: "Security",
      tags: ["TypeScript", "WebCrypto API", "React", "Cloudflare Pages"],
      metrics: "0 KB Server Memory • 100% Client Encrypted • <50ms Load",
      githubUrl: "https://github.com",
      demoUrl: "https://pages.dev",
      architectureNotes: "Uses WebCrypto subtle crypto module for key derivation (PBKDF2) and AES-GCM encryption before writing to localStorage/Cloudflare KV.",
      codeSnippet: `async function encryptPayload(text: string, secretKey: string) {
  const enc = new TextEncoder();
  const keyMat = await crypto.subtle.importKey('raw', enc.encode(secretKey), 'PBKDF2', false, ['deriveKey']);
  // AES-256-GCM encryption stream...
  return encryptedData;
}`,
      featured: true
    },
    {
      id: "proj-2",
      title: "NEURAL_TERMINAL - AI Code Interpreter HUD",
      shortDesc: "Futuristic command-line dashboard interface with offline AI model integrations.",
      fullDesc: "An interactive browser terminal built for developers who dislike cluttered GUIs. Features custom keyboard shortcuts, syntax highlight, and local AI agent execution.",
      category: "AI & ML",
      tags: ["React", "Gemini API", "Tailwind CSS", "Motion"],
      metrics: "60 FPS Animations • Keyboard First UI • 0 Server Storage",
      githubUrl: "https://github.com",
      demoUrl: "https://pages.dev",
      architectureNotes: "Streamed responses with Web Workers to keep rendering loop at 60 FPS while parsing AI tokens.",
      codeSnippet: `const terminalStream = await ai.models.generateContentStream({
  model: 'gemini-2.5-flash',
  contents: prompt,
});`,
      featured: true
    },
    {
      id: "proj-3",
      title: "STEALTH_EDGE - Cloudflare Free Tier Boilerplate",
      shortDesc: "Ultra-fast static web template designed for hosting free high-performance sites.",
      fullDesc: "Production-tested Cloudflare Pages starter kit with pre-configured Vite, Tailwind v4, PWA support, and automated GitHub Actions deployment workflow.",
      category: "Frontend",
      tags: ["Vite", "Cloudflare Pages", "TypeScript", "TailwindCSS"],
      metrics: "100/100 Lighthouse • 0$ Hosting Cost • Global Edge CDN",
      githubUrl: "https://github.com",
      demoUrl: "https://pages.dev",
      architectureNotes: "Optimized asset chunking with Vite to stay under Cloudflare Pages 25MB single asset limit.",
      featured: true
    },
    {
      id: "proj-4",
      title: "ASYNC_COMM_BEACON - Anonymous Contact Relay",
      shortDesc: "Decentralized form relay that forwards encrypted feedback to Discord/Telegram webhooks.",
      fullDesc: "Allows recruiters and peers to reach out anonymously without revealing personal email addresses or phone numbers. Zero database backend needed.",
      category: "Systems",
      tags: ["Cloudflare Workers", "Hono.js", "Webhooks", "PGP"],
      metrics: "100% Spam Filtered • Rate Limited • Rate limit: 5 msg/hr",
      githubUrl: "https://github.com",
      featured: false
    }
  ]
};
