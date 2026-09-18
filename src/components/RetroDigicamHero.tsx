import { useState, useRef, useEffect, MouseEvent } from 'react';
import { 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  Zap, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Video, 
  Cpu, 
  Workflow, 
  TrendingUp, 
  BarChart3, 
  Palette, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { playShutterSound, playDigicamBeep } from '../utils/audio';

const HERO_SHOTS = [
  {
    url: '/assets/mansvi-portrait.jpg',
    caption: 'MANSVI MALANI // FOUNDER & BUILDER',
    timestamp: 'MUMBAI · 2026'
  },
  {
    url: '/assets/mansvi-fabrics-poster.jpg',
    caption: 'MANSVI FABRICS // TAILORED TUNIC',
    timestamp: 'FEB 2025'
  },
  {
    url: '/assets/mansvi-raw-fibers.jpg',
    caption: 'RAW MULBERRY // SILK COCOONS',
    timestamp: 'FEB 2025'
  },
  {
    url: '/assets/mansvi-cotton-boll.jpg',
    caption: 'ORGANIC COTTON // FIBER HARVEST',
    timestamp: 'FEB 2025'
  },
  {
    url: '/assets/mansvi-pattern-cut.jpg',
    caption: 'BOTANICAL PRINT // PATTERN CUTS',
    timestamp: 'FEB 2025'
  }
];

interface SkillOffering {
  id: string;
  frameNum: string;
  category: string;
  badge: string;
  title: string;
  headline: string;
  howIHelp: string[];
  tools: string[];
  brandImpact: string;
  accentColor: string;
}

const SKILLS_SHOWCASE: SkillOffering[] = [
  {
    id: 'skill-video',
    frameNum: '01',
    category: 'Commercial Video Production',
    badge: 'High Conversion',
    title: 'Brand Video Reels & Visual Storytelling',
    headline: 'High-retention vertical video reels that stop the scroll, captivate audiences, and convert viewers into loyal clients.',
    howIHelp: [
      'Script-to-screen production of high-converting 9:16 vertical video reels',
      'Beat-matched kinetic editing, professional color grading, and dynamic typography',
      'Compelling commercial and factory documentary storytelling that establishes trust'
    ],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design'],
    brandImpact: '3x Higher Audience Retention & Direct Buyer Engagement',
    accentColor: '#c026d3'
  },
  {
    id: 'skill-web',
    frameNum: '02',
    category: 'Full-Stack Web Development',
    badge: 'Enterprise Grade',
    title: 'Modern Frontends & Interactive Digital Platforms',
    headline: 'High-performance, responsive web applications engineered for speed, clean UX, and seamless commercial conversions.',
    howIHelp: [
      'Sub-second loading landing pages with conversion-focused responsive layouts',
      'Scalable, type-safe architectures built with React, TypeScript, Next.js, and Tailwind CSS',
      'Tactile micro-interactions, fluid page animations, and intuitive user interfaces'
    ],
    tools: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Node.js'],
    brandImpact: 'Sub-Second Speed & Measurable Conversion Lift',
    accentColor: '#2563eb'
  },
  {
    id: 'skill-ai',
    frameNum: '03',
    category: 'Autonomous AI & Intelligent Systems',
    badge: 'AI Powered',
    title: 'Custom AI Copilots & Enterprise Workflows',
    headline: 'Intelligent AI assistants and domain-specific knowledge pipelines that automate repetitive operations 24/7.',
    howIHelp: [
      '24/7 customer assistance copilots trained on your brand catalog and documentation',
      'Retrieval-Augmented Generation (RAG) pipelines for accurate, grounded business responses',
      'Multimodal intelligence leveraging Gemini API for automated categorization and generation'
    ],
    tools: ['Gemini API', 'LLM Orchestration', 'LangChain', 'Vector Search', 'RAG Pipelines'],
    brandImpact: '70% Reduction in Repetitive Operational Overhead',
    accentColor: '#9333ea'
  },
  {
    id: 'skill-automation',
    frameNum: '04',
    category: 'Workflow Automation',
    badge: 'Zero-Touch',
    title: 'End-to-End Business Integration Pipelines',
    headline: 'Connecting your store, CRM, and communication channels to run lead routing and fulfillment on auto-pilot.',
    howIHelp: [
      'Instant real-time lead ingestion and intelligent routing to team communication channels',
      'Automated synchronization across Shopify, Stripe, Airtable, and CRM databases',
      'Resilient webhook pipelines that eliminate manual data entry and human error'
    ],
    tools: ['n8n', 'Make.com', 'Zapier', 'Webhooks', 'Python Automation', 'Cloud Run'],
    brandImpact: 'Saves 20+ Weekly Work Hours with Zero Data Entry Errors',
    accentColor: '#059669'
  },
  {
    id: 'skill-marketing',
    frameNum: '05',
    category: 'Digital Growth & Performance',
    badge: 'ROI Focused',
    title: 'Google Certified Growth & Search Funnels',
    headline: 'Certified Google Search, Performance Max campaigns, and technical SEO designed to drive high-intent commercial traffic.',
    howIHelp: [
      'Data-driven Google Ads campaigns structured to maximize return on ad spend (ROAS)',
      'Comprehensive on-page and semantic SEO to capture organic, high-intent buyer searches',
      'Funnel drop-off audits and conversion rate optimization across critical checkout paths'
    ],
    tools: ['Google Analytics 4', 'Search Ads', 'Performance Max', 'Technical SEO', 'Meta Ads'],
    brandImpact: 'Lower Customer Acquisition Costs (CAC) & Predictable Inbound Growth',
    accentColor: '#ea580c'
  },
  {
    id: 'skill-analytics',
    frameNum: '06',
    category: 'Business Intelligence & Data',
    badge: 'Data-Backed',
    title: 'Executive KPI Dashboards & Analytics',
    headline: 'Transforming scattered customer and transaction metrics into clear visual dashboards to guide confident executive decisions.',
    howIHelp: [
      'Consolidating sales, marketing ad spend, and website performance into unified dashboards',
      'Customer lifetime value (LTV), retention cohorts, and churn prevention modeling',
      'Replacing speculation with empirical statistical analysis to optimize resource allocation'
    ],
    tools: ['Python', 'Pandas', 'SQL Queries', 'Interactive Dashboards', 'Statistical Modeling'],
    brandImpact: 'Complete Revenue Visibility & Confident Strategic Planning',
    accentColor: '#0891b2'
  },
  {
    id: 'skill-creative',
    frameNum: '07',
    category: 'Creative Direction & Media',
    badge: 'Premium Identity',
    title: 'Brand Media Production & Creative Direction',
    headline: 'Distinctive visual aesthetics, high-production photography, and event coverage that command market authority.',
    howIHelp: [
      'Cohesive visual brand identities, typographic systems, and brand style guides',
      'Documentary event photo and video recap coverage for summits, launches, and exhibitions',
      'High-resolution multi-format asset suites optimized for modern social and digital channels'
    ],
    tools: ['Creative Direction', 'Brand Strategy', 'Lightroom', 'Media Packaging', 'Typography'],
    brandImpact: 'Authoritative Brand Positioning That Outshines Competitors',
    accentColor: '#db2777'
  }
];

interface Props {
  onFlashTrigger: () => void;
}

export function RetroDigicamHero({ onFlashTrigger }: Props) {
  const [mode, setMode] = useState<'skills' | 'photo'>('skills');
  const [skillIdx, setSkillIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [isSnapping, setIsSnapping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const cameraRef = useRef<HTMLDivElement>(null);
  const activeSkill = SKILLS_SHOWCASE[skillIdx] || SKILLS_SHOWCASE[0];
  const activeShot = HERO_SHOTS[currentIdx];

  // Auto-cycle through skills every 5 seconds as strictly requested by user
  useEffect(() => {
    if (mode !== 'skills' || !isAutoCycling) return;

    const timer = setInterval(() => {
      setSkillIdx((prev) => (prev + 1) % SKILLS_SHOWCASE.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mode, isAutoCycling]);

  // Subtle 3D tilt on mouse movement for tactile presence
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    const rect = cameraRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(y * 8),
      y: x * 10
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSnap = () => {
    setIsSnapping(true);
    playShutterSound();
    onFlashTrigger();
    setTimeout(() => {
      setIsSnapping(false);
      if (mode === 'skills') {
        setSkillIdx((prev) => (prev + 1) % SKILLS_SHOWCASE.length);
      } else {
        setCurrentIdx((prev) => (prev + 1) % HERO_SHOTS.length);
      }
    }, 280);
  };

  const handleNextSkill = () => {
    playDigicamBeep(1100);
    setSkillIdx((prev) => (prev + 1) % SKILLS_SHOWCASE.length);
  };

  const handlePrevSkill = () => {
    playDigicamBeep(980);
    setSkillIdx((prev) => (prev - 1 + SKILLS_SHOWCASE.length) % SKILLS_SHOWCASE.length);
  };

  const handleNextPhoto = () => {
    playDigicamBeep(1100);
    setCurrentIdx((prev) => (prev + 1) % HERO_SHOTS.length);
  };

  const handlePrevPhoto = () => {
    playDigicamBeep(980);
    setCurrentIdx((prev) => (prev - 1 + HERO_SHOTS.length) % HERO_SHOTS.length);
  };

  const handleZoom = (delta: number) => {
    playDigicamBeep(1200);
    setZoomLevel((prev) => Math.min(1.6, Math.max(1, +(prev + delta).toFixed(1))));
  };

  const toggleAutoCycle = () => {
    playDigicamBeep(isAutoCycling ? 900 : 1250);
    setIsAutoCycling(!isAutoCycling);
  };

  // Helper icon for formal category display
  const renderCategoryIcon = (cat: string) => {
    if (cat.includes('Video')) return <Video className="w-4 h-4" />;
    if (cat.includes('Web')) return <Code2 className="w-4 h-4" />;
    if (cat.includes('AI')) return <Cpu className="w-4 h-4" />;
    if (cat.includes('Workflow')) return <Workflow className="w-4 h-4" />;
    if (cat.includes('Digital') || cat.includes('Growth')) return <TrendingUp className="w-4 h-4" />;
    if (cat.includes('Intelligence') || cat.includes('Analytics')) return <BarChart3 className="w-4 h-4" />;
    return <Palette className="w-4 h-4" />;
  };

  return (
    <div 
      className="relative perspective-1000 w-full max-w-[640px] mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Formal Hardware Chassis Container */}
      <div
        ref={cameraRef}
        id="retro-digicam-body"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.18s ease-out',
        }}
        className="relative z-10 preserve-3d bg-[#1b1719] rounded-2xl p-4 sm:p-6 border border-[#423a3e] shadow-[0_24px_60px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.15)]"
      >
        {/* Top Shutter Control */}
        <div className="absolute -top-3.5 right-8 flex items-center gap-2">
          <button
            onClick={handleSnap}
            title="Advance Showcase"
            id="digicam-shutter-btn"
            className="group relative px-4 py-1.5 bg-[#d4af37] hover:bg-[#e0be4d] text-[#1f0508] font-sans font-bold text-xs rounded-t-md shadow-md border-t border-x border-[#f7e096] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 group-hover:animate-ping"></span>
            <span>NEXT SKILL</span>
          </button>
        </div>

        {/* Header Console Bar: Professional & Understandable */}
        <div className="flex items-center justify-between pb-3 border-b border-[#302a2d] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse"></div>
            <div>
              <h4 className="font-sans font-semibold text-xs tracking-wider uppercase text-neutral-200">
                Services & Capabilities
              </h4>
              <p className="font-sans text-[11px] text-neutral-400">
                How I Help Brands & Businesses Grow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            {/* Mode Switcher: Skills vs Stills */}
            <div className="flex items-center bg-[#100d0e] p-0.5 rounded-md border border-[#383135]">
              <button
                onClick={() => {
                  playDigicamBeep(1100);
                  setMode('skills');
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                  mode === 'skills' ? 'bg-[#801620] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Capabilities</span>
              </button>
              <button
                onClick={() => {
                  playDigicamBeep(980);
                  setMode('photo');
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                  mode === 'photo' ? 'bg-[#d4af37] text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Camera className="w-3 h-3" />
                <span>Gallery</span>
              </button>
            </div>

            <button
              onClick={() => {
                setFlashEnabled(!flashEnabled);
                playDigicamBeep(900);
              }}
              title="Camera Flash Simulation"
              className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium cursor-pointer transition-colors ${
                flashEnabled ? 'bg-[#d4af37]/15 border-[#d4af37]/60 text-[#ffd79e]' : 'border-neutral-800 text-neutral-500'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{flashEnabled ? 'Flash' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Main Display Screen: Spacious, High-Contrast & Legible */}
        <div 
          className="relative rounded-xl overflow-hidden border border-[#3b3438] bg-[#0d0a0c] shadow-[inset_0_2px_12px_rgba(0,0,0,0.95)] min-h-[380px] sm:min-h-[410px] w-full flex flex-col"
        >
          {mode === 'skills' ? (
            /* Formal Capabilities & Brand Value Card */
            <div 
              key={activeSkill.id}
              className="w-full h-full p-5 sm:p-6 flex flex-col justify-between relative bg-gradient-to-b from-[#161214] to-[#0c0a0c] text-neutral-100 transition-all duration-300"
            >
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-white shadow-sm border border-white/15"
                    style={{ backgroundColor: activeSkill.accentColor }}
                  >
                    {renderCategoryIcon(activeSkill.category)}
                    <span>{activeSkill.category}</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{activeSkill.badge}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 text-xs font-mono">
                    {activeSkill.frameNum} <span className="text-neutral-600">/</span> 07
                  </span>
                  <span className="text-xs text-amber-300/90 font-medium bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                    {isAutoCycling ? '5s auto' : 'paused'}
                  </span>
                </div>
              </div>

              {/* Core Content Body: Formal & Understandable */}
              <div className="py-4 space-y-3.5 flex-1 flex flex-col justify-center">
                {/* Title */}
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                  {activeSkill.title}
                </h3>

                {/* Clear Headline: The Exact Benefit to the Client */}
                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal bg-white/[0.03] p-3 rounded-lg border border-white/5">
                  {activeSkill.headline}
                </p>

                {/* Specific Solutions & Deliverables */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-sans uppercase font-bold tracking-wider text-neutral-400">
                    Direct Client Solutions & Deliverables:
                  </div>
                  <div className="space-y-2">
                    {activeSkill.howIHelp.map((solution, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer: Tools & Quantifiable Impact */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans">
                {/* Core Stack / Tools */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-neutral-400 text-[11px] font-medium mr-1">Stack:</span>
                  {activeSkill.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded text-neutral-300 border border-white/10 text-[11px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Quantifiable Commercial Outcome */}
                <div className="text-amber-300 font-semibold text-xs flex items-center gap-1">
                  <span className="text-neutral-400 font-normal">Impact:</span>
                  <span>{activeSkill.brandImpact}</span>
                </div>
              </div>

              {/* 5-Second Animated Progress Bar */}
              {isAutoCycling && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                  <div 
                    key={skillIdx} 
                    className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 animate-skill-progress"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Gallery Preview Mode */
            <div 
              className="w-full h-full overflow-hidden relative transition-transform duration-300 flex items-center justify-center bg-black min-h-[380px]"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={activeShot.url}
                alt={activeShot.caption}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  isSnapping ? 'opacity-20 filter brightness-200' : 'opacity-90'
                }`}
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{activeShot.caption}</div>
                  <div className="text-xs text-neutral-400">{activeShot.timestamp}</div>
                </div>
                <span className="text-xs font-mono text-amber-300">
                  {currentIdx + 1} / {HERO_SHOTS.length}
                </span>
              </div>
            </div>
          )}

          {/* Flash burst effect on snap */}
          {isSnapping && (
            <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-30"></div>
          )}
        </div>

        {/* Screen Console Bottom Bar: Intuitive Navigation & 5s Control */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#302a2d]">
          {mode === 'skills' ? (
            /* Formal Navigation Controls */
            <div className="flex items-center gap-2">
              {/* Play / Pause 5s cycle button */}
              <button
                onClick={toggleAutoCycle}
                id="digicam-skill-auto-toggle-btn"
                className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isAutoCycling 
                    ? 'bg-[#801620] hover:bg-[#961a26] text-white border-red-500/40' 
                    : 'bg-[#292326] hover:bg-[#383034] text-neutral-200 border-[#4a3f45]'
                }`}
                title={isAutoCycling ? 'Pause 5-second rotation' : 'Resume 5-second rotation'}
              >
                {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isAutoCycling ? '5s Auto' : 'Resume'}</span>
              </button>

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrevSkill}
                title="Previous capability"
                id="digicam-prev-skill-btn"
                className="px-2.5 py-1.5 bg-[#241f22] hover:bg-[#332c30] text-neutral-200 rounded-lg border border-[#42393e] text-xs font-sans font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={handleNextSkill}
                title="Next capability"
                id="digicam-next-skill-btn"
                className="px-2.5 py-1.5 bg-[#241f22] hover:bg-[#332c30] text-neutral-200 rounded-lg border border-[#42393e] text-xs font-sans font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Numbered 1-7 Direct Jump Pills */}
              <div className="flex items-center gap-1 pl-1">
                {SKILLS_SHOWCASE.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playDigicamBeep(1000 + idx * 40);
                      setSkillIdx(idx);
                    }}
                    title={s.category}
                    className={`w-6 h-6 rounded-md text-xs font-sans font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      skillIdx === idx 
                        ? 'bg-[#d4af37] text-neutral-950 shadow-md scale-105' 
                        : 'bg-[#201c1e] text-neutral-400 hover:text-white hover:bg-[#2e282b]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Photo Gallery Controls */
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPhoto}
                title="Previous photograph"
                id="digicam-prev-btn"
                className="px-3 py-1.5 bg-[#241f22] hover:bg-[#332c30] text-neutral-200 rounded-lg border border-[#42393e] text-xs font-sans font-medium flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Photo</span>
              </button>
              <button
                onClick={handleNextPhoto}
                title="Next photograph"
                id="digicam-next-btn"
                className="px-3 py-1.5 bg-[#241f22] hover:bg-[#332c30] text-neutral-200 rounded-lg border border-[#42393e] text-xs font-sans font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Next Photo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Right Controls: Zoom & Quick Advance */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#201c1e] rounded-lg border border-[#42393e] p-0.5">
              <button
                onClick={() => handleZoom(-0.2)}
                title="Zoom out"
                className="p-1 hover:bg-[#302a2d] text-neutral-300 rounded text-xs cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(0.2)}
                title="Zoom in"
                className="p-1 hover:bg-[#302a2d] text-neutral-300 rounded text-xs cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleSnap}
              id="digicam-shutter-sub-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#801620] hover:bg-[#9a1a27] text-white text-xs font-sans font-semibold rounded-lg border border-red-500/30 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#ffd79e]" />
              <span>Next</span>
            </button>
          </div>
        </div>

        {/* Chassis Brand Label */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-sans text-neutral-500">
          <span>Client Solutions & Strategic Capabilities</span>
          <span>Mansvi Malani · Portfolio 2026</span>
        </div>
      </div>
    </div>
  );
}
