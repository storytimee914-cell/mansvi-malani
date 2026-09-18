import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playPaperSound, playDigicamBeep } from '../utils/audio';
import { Code, Bot, Cpu, Video, TrendingUp, BarChart3, Disc } from 'lucide-react';

const ICON_MAP = {
  'web-dev': Code,
  'ai-creator': Bot,
  'automation': Cpu,
  'video-editing': Video,
  'digital-marketing': TrendingUp,
  'data-analytics': BarChart3,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="washi-tape px-4 py-1.5 rotate-1 rounded-xs border border-[#d2c7b2] shadow-md">
              <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
                02 // CAPABILITIES
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#fcf9f0] tracking-tight">
              SKILLS
            </h2>
          </div>

          {/* Cassette Tape badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1b1416] text-[#ffd79e] px-3.5 py-1.5 rounded-xs border border-[#d4af37]/40 shadow-md">
            <Disc className="w-4 h-4 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-xs font-bold tracking-wider">
              SKILL MIXTAPE '26 // SIDE A
            </span>
          </div>
        </div>

        {/* Quick summary ribbon of the 6 core pillars */}
        <div className="mb-10 p-3 bg-[#1e0508] border border-[#d4af37]/30 rounded-xs shadow-inner flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-sans-clean font-bold text-[#fcefd7]">
          <span>Web Development</span>
          <span className="text-[#d4af37]">·</span>
          <span>AI</span>
          <span className="text-[#d4af37]">·</span>
          <span>Automation</span>
          <span className="text-[#d4af37]">·</span>
          <span>Video Editing</span>
          <span className="text-[#d4af37]">·</span>
          <span>Digital Marketing</span>
          <span className="text-[#d4af37]">·</span>
          <span>Data Analytics</span>
        </div>

        {/* 3D Scrapbook Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = ICON_MAP[category.id as keyof typeof ICON_MAP] || Code;
            return (
              <div
                key={category.id}
                id={`skill-card-${category.id}`}
                onClick={() => {
                  playPaperSound();
                  playDigicamBeep(900 + idx * 50);
                }}
                className="group relative bg-[#fcf8ee] text-[#2e090f] p-4.5 sm:p-6 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.35)] border border-[#e1d5be] hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Washi tape on top center */}
                <div 
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-xs z-20 border border-black/10 ${
                    idx % 2 === 0 ? 'washi-tape rotate-1' : 'washi-tape-red -rotate-2'
                  }`}
                ></div>

                {/* Stamp label at top right */}
                <div className="flex items-center justify-between mb-3 border-b border-[#e5d8c1] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xs bg-[#24060a] text-[#ffd79e] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#801620]">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs border border-amber-900/30 bg-[#f1e5cd] text-[#4a0d13] tracking-widest uppercase">
                    {category.stampLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-xl text-[#1a0407] mb-1.5 group-hover:text-[#801620] transition-colors">
                  {category.title}
                </h3>

                {/* Short scannable description */}
                <p className="font-sans-clean text-xs text-[#502328] leading-relaxed">
                  {category.description}
                </p>

                {/* Little decorative star stamp */}
                <div className="absolute bottom-2 right-2 opacity-30 font-serif-vintage text-xs text-[#801620]">
                  ★
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
