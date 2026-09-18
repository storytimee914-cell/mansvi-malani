export interface Project {
  id: string;
  frameNumber: string;
  title: string;
  tagline: string;
  category: 'AI & Automation' | 'Web Development' | 'Creative Tech' | 'Analytics' | 'Video Production';
  year: string;
  rotation: number;
  image: string;
  videoUrl?: string;
  videoPoster?: string;
  isVideo?: boolean;
  videoAspect?: '9:16' | '16:9';
  stages?: { title: string; desc: string; time: string; image?: string }[];
  description: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  driveUrl?: string;
  colorAccent?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  category: 'Certification' | 'Competition' | 'Athletics & Arts';
  year: string;
  badge: string;
  description: string;
  rotation: number;
  highlightColor: string;
  verified: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
  stampLabel: string;
  tapeRotation: number;
  accentColor: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  medium: string;
  date: string;
  iso: string;
  shutter: string;
  aperture: string;
  resolution: string;
  image: string;
  description: string;
  tags: string[];
}

export interface WebsiteProject {
  id: string;
  title: string;
  role: string;
  category: string;
  url: string;
  displayUrl: string;
  desktopOnly?: boolean;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  colorAccent: string;
  badgeText?: string;
  year?: string;
}

export type DigicamFilter = 'normal' | 'vintage-grain' | 'cyber-sepia' | 'film-bw' | 'y2k-vivid';
