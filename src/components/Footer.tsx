import { ArrowUp, Camera, Sparkles, Heart } from 'lucide-react';
import { playDigicamBeep } from '../utils/audio';

export function Footer() {
  const scrollToTop = () => {
    playDigicamBeep(1300);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#801620]/60 bg-[#160406] py-12 px-4 sm:px-6 lg:px-8 text-[#ffd79e]/75 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Colophon */}
        <div className="flex flex-col items-center sm:items-start space-y-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider">
            <Camera className="w-4 h-4 text-[#d4af37]" />
            <span>MANSVI MALANI</span>
            <span className="text-[#ffd79e]/50">·</span>
            <span className="text-xs text-[#ffd79e]">CREATIVE ARCHIVE</span>
          </div>
          <p className="text-[11px] text-[#e0cfbb]/70">
            Web Developer · AI Creator · AI Automation Enthusiast · Digital Creator
          </p>
        </div>

        {/* Center Tagline */}
        <div className="text-center">
          <p className="font-handwriting text-lg text-[#ffd79e]">
            “photographed through a digicam · assembled in 3D”
          </p>
          <p className="text-[10px] text-[#ffd79e]/50 mt-0.5">
            MUMBAI, INDIA · VOL. 2026
          </p>
        </div>

        {/* Right: Scroll to top button */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#2a080d] hover:bg-[#400d14] text-[#ffd79e] rounded-xs border border-[#d4af37]/30 shadow active:scale-95 transition-all text-xs font-bold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Sprocket hole row decoration along bottom */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-[#801620]/30 flex justify-between items-center opacity-40 select-none">
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="w-2 h-3 bg-black border border-white/20 rounded-xs"></span>
          ))}
        </div>
        <span className="text-[9px] tracking-widest uppercase">
          KODAK SAFETY FILM · END OF ROLL
        </span>
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="w-2 h-3 bg-black border border-white/20 rounded-xs"></span>
          ))}
        </div>
      </div>
    </footer>
  );
}
