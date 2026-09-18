import { playDigicamBeep, playPaperSound } from '../utils/audio';
import { Sparkles, Film } from 'lucide-react';

interface Props {
  onFlashTrigger: () => void;
}

export function Hero({ onFlashTrigger }: Props) {
  return (
    <section 
      id="top" 
      className="relative min-h-[85vh] sm:min-h-[90vh] pt-24 sm:pt-28 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Decorative Scrapbook Layer: Torn paper collage silhouettes */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20 z-0">
        <div className="absolute -top-10 left-10 w-72 h-80 bg-[#42080f] rounded-3xl -rotate-6 filter blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2a0409] rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-start space-y-5 sm:space-y-6 relative z-10">
          
          {/* Top Label & Status Tape */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Vintage Postcard Stamp */}
            <div className="washi-tape px-2.5 sm:px-3 py-1 -rotate-2 rounded-xs border border-[#cfc5b0] shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-mono text-[11px] sm:text-xs font-bold text-[#420a10] tracking-wider">
                PORTFOLIO // VOL. 2026
              </span>
            </div>

            {/* Red wax seal / label */}
            <div className="washi-tape-red px-2.5 py-0.5 rotate-1 text-[#fcf9f0] font-sans-clean font-bold text-[10px] sm:text-[11px] tracking-widest uppercase rounded-xs border border-red-400/40">
              MUMBAI, IN 📍
            </div>

            {/* Handwritten small marginal note */}
            <span className="font-handwriting text-lg sm:text-xl text-[#ffd79e] rotate-[-3deg] hidden xs:inline-block">
              (welcome to my corner)
            </span>
          </div>

          {/* Core Hero Heading */}
          <div className="space-y-2 relative w-full">
            <h1 className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#fcf9f0] leading-[0.98] sm:leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              MANSVI <br className="inline" />
              <span className="text-[#ffd79e] relative inline-block">
                MALANI
                {/* Vintage hand-drawn underline accent */}
                <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#d4af37]/70" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C50 3 150 11 198 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#f3e7d3] pt-1 sm:pt-2">
              I BUILD DIGITAL THINGS.
            </p>
          </div>

          {/* Standalone Tactile Polaroid Portrait */}
          <div 
            onClick={() => {
              playDigicamBeep(1200);
              onFlashTrigger();
            }}
            title="Click to take snap // Mansvi Malani"
            className="relative cursor-pointer select-none group pt-1 pb-1 self-center mx-auto"
          >
            {/* Washi Tape on corner */}
            <div className="absolute -top-2 left-3 w-14 sm:w-16 h-4 sm:h-5 washi-tape rotate-[-6deg] z-20 rounded-xs border border-amber-900/20 shadow-xs pointer-events-none"></div>

            {/* Polaroid Chassis */}
            <div className="bg-[#fcfaf4] p-2 sm:p-2.5 pb-3.5 sm:pb-4 rounded-sm shadow-2xl border border-[#ded5c2] rotate-[-2deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 w-32 xs:w-36 sm:w-44 mx-auto">
              {/* Polaroid Photo Frame */}
              <div className="w-full aspect-[3/4] bg-[#140e10] overflow-hidden rounded-xs relative">
                <img
                  src="/assets/mansvi-portrait.jpg?v=drive"
                  alt="Mansvi Malani"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105 transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle camera film date stamp */}
                <span className="absolute bottom-1.5 right-1.5 font-mono-cam text-[9px] sm:text-[10px] text-[#ffd79e] bg-black/75 px-1 py-0.5 rounded leading-none z-10 pointer-events-none">
                  '26 09 17
                </span>
              </div>
              {/* Polaroid Caption */}
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between px-0.5">
                <span className="font-handwriting text-xs sm:text-sm text-[#4a0d13] font-bold">
                  Mansvi M. ✨
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for projects"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#work"
              onClick={() => playDigicamBeep(1100)}
              id="hero-view-work-btn"
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#d4af37] hover:bg-[#ebd074] text-[#34080d] font-sans-clean font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xs shadow-lg transform sm:-rotate-1 sm:hover:rotate-0 hover:scale-[1.02] sm:hover:scale-105 transition-all flex items-center justify-center gap-2 border border-[#f7e096] min-h-[46px]"
            >
              <Film className="w-4 h-4 flex-shrink-0" />
              <span>EXPLORE FILM ROLL WORK</span>
            </a>

            <a
              href="#contact"
              onClick={() => playPaperSound()}
              id="hero-contact-btn"
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#fcf9f0] hover:bg-[#ffffff] text-[#34080d] font-sans-clean font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xs shadow-md transform sm:rotate-1 sm:hover:rotate-0 hover:scale-[1.02] sm:hover:scale-105 transition-all flex items-center justify-center gap-2 border border-[#d6cfbe] min-h-[46px]"
            >
              <Sparkles className="w-4 h-4 text-[#801620] flex-shrink-0" />
              <span>GET IN TOUCH</span>
            </a>
          </div>

        </div>
    </section>
  );
}
