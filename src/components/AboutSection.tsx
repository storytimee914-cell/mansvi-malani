import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, MapPin, Coffee, Code2, Zap } from 'lucide-react';
import { playPaperSound } from '../utils/audio';

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Section Header with Scrapbook Title Badge */}
        <div className="flex items-center gap-3 mb-8">
          <div className="washi-tape px-4 py-1.5 -rotate-2 rounded-xs border border-[#d2c7b2] shadow-md">
            <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
              01 // DOSSIER
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#fcf9f0] tracking-tight">
            ABOUT
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
        </div>

        {/* Scrapbook Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Vintage Torn Notebook Paper Card with the 2-3 Line Introduction */}
          <div 
            onClick={() => playPaperSound()}
            className="md:col-span-8 relative bg-[#fcf8ee] text-[#2c090e] p-4.5 sm:p-9 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-[#e4d9c3] transform sm:-rotate-1 sm:hover:rotate-0 transition-transform cursor-default"
          >
            {/* Top washi tape */}
            <div className="absolute -top-3 left-6 sm:left-12 w-20 sm:w-28 h-5 sm:h-6 washi-tape rotate-1 rounded-xs border border-[#cfc3ad] z-20"></div>
            {/* Corner washi tape */}
            <div className="absolute -bottom-3 right-4 sm:right-8 w-16 sm:w-20 h-5 sm:h-6 washi-tape-red -rotate-3 rounded-xs border border-red-400/40 z-20"></div>

            {/* Notebook lined pattern background */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e1d3bc] pb-3">
                <span className="font-mono text-[11px] sm:text-xs text-[#801620] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  MANSVI MALANI // IDENTITY ARCHIVE
                </span>
                <span className="font-handwriting text-lg sm:text-xl text-[#7a1822] font-bold">
                  page 01
                </span>
              </div>

              {/* Introduction Copy */}
              <div className="pt-2 space-y-3">
                <p id="about-headline" className="font-serif-vintage text-xl sm:text-2xl text-[#1e070a] leading-snug font-semibold">
                  like turning “what if we built this?” into something you can actually click.
                </p>

                <p id="about-body" className="font-sans-clean text-sm sm:text-base text-[#4a181d] leading-relaxed">
                  I build websites, AI-powered workflows, and digital experiences that don’t just sit there looking pretty — they move, respond, automate, and solve real problems.
                </p>

                {/* Workflow Pipeline */}
                <div id="about-pipeline" className="pt-1 flex items-center flex-wrap gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm font-semibold">
                  <span className="px-2.5 py-1 bg-[#ede4ce] text-[#200508] rounded-xs border border-[#d8ccb0]">Web</span>
                  <span className="text-[#a13b28] font-bold">→</span>
                  <span className="px-2.5 py-1 bg-[#ede4ce] text-[#200508] rounded-xs border border-[#d8ccb0]">AI</span>
                  <span className="text-[#a13b28] font-bold">→</span>
                  <span className="px-2.5 py-1 bg-[#ede4ce] text-[#200508] rounded-xs border border-[#d8ccb0]">Automation</span>
                  <span className="text-[#a13b28] font-bold">→</span>
                  <span className="px-2.5 py-1 bg-[#ede4ce] text-[#200508] rounded-xs border border-[#d8ccb0]">Data</span>
                </div>
              </div>

              {/* Scrapbook Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#e1d3bc]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#200508] text-[#ffd79e] text-xs font-mono rounded-xs">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ede4ce] text-[#33080d] text-xs font-mono font-semibold rounded-xs border border-[#d8ccb0]">
                  <Code2 className="w-3 h-3 text-[#801620]" />
                  Full-Stack + AI
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ede4ce] text-[#33080d] text-xs font-mono font-semibold rounded-xs border border-[#d8ccb0]">
                  <Zap className="w-3 h-3 text-amber-600" />
                  Automation & Analytics
                </span>
              </div>
            </div>
          </div>

          {/* Right: Polaroid Portrait & Handwritten Sticky Note */}
          <div className="md:col-span-4 flex flex-col items-center space-y-4">
            {/* Polaroid Photo Frame */}
            <div className="relative bg-[#ffffff] p-3 pb-5 sm:pb-6 rounded-xs shadow-2xl border border-[#dcd2be] transform sm:rotate-3 sm:hover:rotate-1 hover:scale-105 transition-all duration-300 w-full max-w-[260px] sm:max-w-[280px]">
              {/* Pushpin at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-900 border-2 border-white shadow-md z-20"></div>

              {/* Photo Area */}
              <div className="w-full aspect-[4/4.5] bg-[#1a1215] overflow-hidden rounded-xs relative group">
                <img
                  src="/assets/mansvi-portrait.jpg"
                  alt="Mansvi Malani portrait"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* 35mm date stamp */}
                <span className="absolute bottom-2 right-2 font-mono-cam text-sm text-[#ffb86c] bg-black/70 px-1.5 py-0.5 rounded">
                  '26 03 14
                </span>
              </div>

              <div className="mt-2.5 sm:mt-3 text-center">
                <p className="font-handwriting text-xl text-[#3f0a10] font-bold leading-none">
                  Mansvi M.
                </p>
                <p className="font-mono text-[10px] text-[#705a5e] tracking-widest uppercase mt-1">
                  creator & builder
                </p>
              </div>
            </div>

            {/* Handwritten Sticky Note */}
            <div className="w-full max-w-[260px] sm:max-w-[280px] bg-[#fff9c4] p-3 rounded-xs shadow-md border border-[#eee29f] transform sm:-rotate-2">
              <p className="font-handwriting text-base sm:text-lg text-[#4a1217] font-bold leading-snug">
                “Building things that are fast to load, fun to touch, and impossible to forget.”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
