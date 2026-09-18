import { useState, MouseEvent } from 'react';
import { WEBSITE_PROJECTS } from '../data/portfolioData';
import { WebsiteProject } from '../types';
import { playPaperSound, playDigicamBeep } from '../utils/audio';
import { 
  ExternalLink, 
  Globe, 
  Monitor, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Code2, 
  ArrowUpRight,
  Info,
  Maximize2,
  X
} from 'lucide-react';

export function FeaturedWebsitesSection() {
  const [selectedSite, setSelectedSite] = useState<WebsiteProject | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleCopy = (e: MouseEvent, site: WebsiteProject) => {
    e.stopPropagation();
    playDigicamBeep(1200);
    navigator.clipboard.writeText(site.url);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCardClick = (site: WebsiteProject) => {
    playPaperSound();
    playDigicamBeep(1100);
    setSelectedSite(site);
  };

  const filteredProjects = activeFilter === 'all' 
    ? WEBSITE_PROJECTS 
    : WEBSITE_PROJECTS.filter(p => p.id === activeFilter);

  return (
    <section id="websites" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="washi-tape px-4 py-1.5 rotate-1 rounded-xs border border-[#d2c7b2] shadow-md">
              <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
                04 // PRODUCTION WEBSITES
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-[#fcf9f0] tracking-tight break-words">
              FEATURED WEBSITES
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#22070b] text-[#ffd79e] font-mono text-xs font-semibold rounded-xs border border-[#d4af37]/30 shadow-xs">
              4 LIVE CLIENT & CREATIVE SITES
            </span>
            <span className="hidden sm:inline-block font-handwriting text-lg sm:text-xl text-[#ffd79e] rotate-[-2deg]">
              “click to preview blueprint or launch live ↗”
            </span>
          </div>
        </div>

        {/* Filter / Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <button
            onClick={() => {
              playDigicamBeep(900);
              setActiveFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold whitespace-nowrap transition-all border ${
              activeFilter === 'all'
                ? 'bg-[#fcf9f0] text-[#420a10] border-[#d4af37] shadow-sm'
                : 'bg-[#25090e] text-[#f7eedc]/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            ALL WEBSITES (4)
          </button>
          {WEBSITE_PROJECTS.map((site) => (
            <button
              key={site.id}
              onClick={() => {
                playDigicamBeep(950);
                setActiveFilter(site.id);
              }}
              className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                activeFilter === site.id
                  ? 'bg-[#fcf9f0] text-[#420a10] border-[#d4af37] shadow-sm'
                  : 'bg-[#25090e] text-[#f7eedc]/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {site.desktopOnly && <Monitor className="w-3 h-3 text-amber-400" />}
              {site.badgeText}
            </button>
          ))}
        </div>

        {/* 2x2 Grid of Rich Website Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
          {filteredProjects.map((site, idx) => {
            const isDesktopOnly = site.desktopOnly;
            
            return (
              <div
                key={site.id}
                id={`website-card-${site.id}`}
                className="group relative bg-[#13070a] border-2 border-[#3b1c23] hover:border-[#d4af37]/70 rounded-lg overflow-hidden shadow-[0_14px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Washi Tape Pin on Top */}
                <div 
                  className={`absolute -top-3 ${
                    idx % 2 === 0 ? 'left-8 washi-tape rotate-[-2deg]' : 'right-8 washi-tape-red rotate-2'
                  } w-28 h-6 rounded-xs z-30 border border-black/20 shadow-xs pointer-events-none flex items-center justify-center`}
                >
                  <span className="font-mono text-[9px] font-bold text-[#35070c] tracking-widest uppercase">
                    DEPLOYMENT 0{idx + 1}
                  </span>
                </div>

                {/* Simulated Browser Chrome Header */}
                <div className="bg-[#20080d] border-b border-[#3b1c23] px-3.5 py-2.5 flex items-center justify-between gap-2 z-20">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20 inline-block"></span>
                  </div>

                  {/* Address Bar Simulation */}
                  <div className="flex-1 max-w-[280px] sm:max-w-sm mx-auto bg-[#13070a] border border-[#3b1c23] px-2.5 py-1 rounded text-[11px] font-mono text-[#f3e7d3]/80 flex items-center justify-between gap-1 truncate">
                    <div className="flex items-center gap-1.5 truncate">
                      <Globe className="w-3 h-3 text-[#d4af37] shrink-0" />
                      <span className="truncate">{site.displayUrl}</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, site)}
                      title="Copy URL"
                      className="text-[#eedcc4] hover:text-white shrink-0 p-0.5"
                    >
                      {copiedId === site.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* External Launch Icon */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1200)}
                    title="Launch website in new tab"
                    className="p-1 rounded bg-[#2e0e14] hover:bg-[#a02e3b] text-[#ffd79e] hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Website Visual Banner / Preview Frame */}
                <div 
                  onClick={() => handleCardClick(site)}
                  className="relative aspect-[16/10] overflow-hidden bg-[#0d0406] cursor-pointer group/img"
                >
                  <img
                    src={site.image}
                    alt={site.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter brightness-95 group-hover/img:scale-105 group-hover/img:brightness-105 transition-transform duration-700"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13070a] via-transparent to-black/30 pointer-events-none"></div>

                  {/* Badge Pills over Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-2 py-0.5 bg-[#120709]/90 backdrop-blur-xs text-[#ffd79e] text-[11px] font-mono font-bold rounded-xs border border-[#d4af37]/40 shadow">
                      {site.badgeText}
                    </span>

                    {isDesktopOnly && (
                      <span className="px-2 py-0.5 bg-amber-500/90 text-[#25090e] text-[11px] font-mono font-extrabold rounded-xs border border-white/30 shadow flex items-center gap-1 animate-pulse">
                        <Monitor className="w-3 h-3" />
                        ONLY FOR DESKTOP
                      </span>
                    )}
                  </div>

                  {/* Quick Expand Button Hover Prompt */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-xs text-xs font-mono flex items-center gap-1 border border-white/20">
                    <Maximize2 className="w-3 h-3 text-[#ffd79e]" />
                    <span>View Blueprint</span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#e5b882]">
                        {site.category}
                      </span>
                      <span className="text-xs font-mono text-[#eedcc4]/60">
                        {site.year}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#fcf9f0] tracking-tight group-hover:text-[#ffd79e] transition-colors leading-tight">
                      {site.title}
                    </h3>

                    <p className="font-sans-clean text-xs sm:text-sm text-[#e6d5c3]/90 leading-relaxed line-clamp-2">
                      {site.description}
                    </p>

                    {/* Notice for Desktop Only if applicable */}
                    {isDesktopOnly && (
                      <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xs flex items-start gap-2 text-amber-200 text-xs font-sans-clean">
                        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Desktop Recommended:</strong> This website features frame-by-frame 3D scroll animation engineered specifically for desktop viewports.
                        </span>
                      </div>
                    )}

                    {/* Key Highlights / Features */}
                    <div className="pt-2 space-y-1">
                      {site.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#eed8c5]/80 font-sans-clean">
                          <span className="text-[#ffd79e] font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips & Action Buttons */}
                  <div className="pt-5 mt-4 border-t border-[#3b1c23] flex flex-wrap items-center justify-between gap-3">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {site.techStack.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 bg-[#22070b] text-[#eedcc4] text-[10px] font-mono rounded-xs border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Direct Launch CTA Button */}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playDigicamBeep(1250);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#ebd074] text-[#25080c] font-sans-clean font-bold text-xs rounded-xs shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#fae29c]"
                    >
                      <span>LAUNCH SITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Scrapbook Note Footer */}
        <div className="mt-10 p-4 sm:p-5 bg-[#17080b] border border-[#d4af37]/30 rounded-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#2e0d13] border border-[#d4af37]/40 flex items-center justify-center text-[#ffd79e] shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm sm:text-base text-[#fcf9f0]">
                Looking to engineer a custom web platform or interactive experience?
              </p>
              <p className="font-sans-clean text-xs text-[#eed8c5]/80">
                From responsive corporate platforms and e-commerce wholesale portals to custom 3D web engines.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => playDigicamBeep(1100)}
            className="px-4 py-2 bg-[#fdfaf2] text-[#420a10] font-sans-clean font-bold text-xs rounded-xs hover:bg-[#ffd79e] transition-colors shadow border border-[#d2c7b2]"
          >
            DISCUSS A WEB PROJECT ↗
          </a>
        </div>
      </div>

      {/* Blueprint Detail Modal for Selected Website */}
      {selectedSite && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => {
            playPaperSound();
            setSelectedSite(null);
          }}
        >
          <div 
            className="relative bg-[#16080b] border-2 border-[#d4af37] text-[#f7eedc] w-full max-w-2xl rounded-xl shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape px-6 py-1 rounded-xs border border-black/20 shadow-sm">
              <span className="font-mono text-[10px] font-bold text-[#420a10] uppercase tracking-wider">
                PROJECT BLUEPRINT // {selectedSite.badgeText}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                playPaperSound();
                setSelectedSite(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2a0b10] text-[#ffd79e] hover:text-white border border-[#d4af37]/40 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#290a10] text-[#ffd79e] font-mono text-xs rounded-xs border border-[#d4af37]/30">
                  {selectedSite.category}
                </span>
                {selectedSite.desktopOnly && (
                  <span className="px-2.5 py-0.5 bg-amber-500 text-black font-mono text-xs font-bold rounded-xs">
                    🖥️ ONLY FOR DESKTOP
                  </span>
                )}
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {selectedSite.title}
              </h3>

              <p className="font-mono text-xs text-[#d4af37]">
                Live URL: <a href={selectedSite.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{selectedSite.url}</a>
              </p>

              {/* Preview Image */}
              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#3d1820]">
                <img
                  src={selectedSite.image}
                  alt={selectedSite.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-sans-clean text-sm text-[#eed8c5] leading-relaxed">
                {selectedSite.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 bg-[#20080d] p-4 rounded-lg border border-[#3b1c23]">
                <h4 className="font-mono text-xs font-bold text-[#ffd79e] uppercase tracking-wider">
                  Core Implementation Features:
                </h4>
                <ul className="space-y-1.5">
                  {selectedSite.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#eed8c5]/90">
                      <span className="text-[#d4af37] font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#ffd79e] uppercase tracking-wider mb-2">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSite.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-[#280a10] text-[#eedcc4] font-mono text-xs rounded border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#3b1c23] flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedSite(null)}
                  className="px-4 py-2 bg-[#22070b] text-[#eedcc4] text-xs font-mono rounded hover:bg-[#340b12] border border-white/10"
                >
                  Close Blueprint
                </button>

                <a
                  href={selectedSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#d4af37] hover:bg-[#ebd074] text-[#25080c] font-bold text-xs rounded shadow-lg border border-[#fae29c]"
                >
                  <span>LAUNCH LIVE WEBSITE</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
