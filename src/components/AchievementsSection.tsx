import { useState } from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Achievement } from '../types';
import { playPaperSound, playDigicamBeep } from '../utils/audio';
import { Award, CheckCircle2, Trophy, Star, Sparkles, ExternalLink } from 'lucide-react';

export function AchievementsSection() {
  const [selectedAch, setSelectedAch] = useState<Achievement | null>(null);

  const handleCardClick = (ach: Achievement) => {
    playPaperSound();
    playDigicamBeep(1150);
    setSelectedAch(ach);
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="washi-tape px-4 py-1.5 rotate-2 rounded-xs border border-[#d2c7b2] shadow-md">
              <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
                05 // HONORS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-[#fcf9f0] tracking-tight break-words">
              ACHIEVEMENTS
            </h2>
          </div>

          <span className="font-handwriting text-xl sm:text-2xl text-[#ffd79e] rotate-[-2deg]">
            “pinned certificates & distinctions ★”
          </span>
        </div>

        {/* Floating Scrapbook Cards Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ACHIEVEMENTS.map((ach, idx) => {
            return (
              <div
                key={ach.id}
                id={`achievement-card-${ach.id}`}
                onClick={() => handleCardClick(ach)}
                className="group relative bg-[#fdfaf2] text-[#2c080d] p-5 sm:p-6 rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.4)] border border-[#e2d6c1] hover:shadow-[0_22px_45px_rgba(0,0,0,0.6)] hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Washi tape pinning the card */}
                <div 
                  className={`absolute -top-3 left-6 sm:left-10 w-24 h-6 rounded-xs z-20 border border-black/10 flex items-center justify-center ${
                    idx % 2 === 0 ? 'washi-tape rotate-1' : 'washi-tape-red -rotate-2'
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold text-[#420a10] uppercase tracking-wider">
                    DISTINCTION #{idx + 1}
                  </span>
                </div>

                {/* Top: Wax seal / Gold medal stamp */}
                <div>
                  <div className="flex items-start justify-between pt-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f1cf68] to-[#997c1e] text-[#2c050a] flex items-center justify-center shadow-md border-2 border-[#fff3cc] group-hover:scale-110 transition-transform">
                      {ach.category === 'Athletics & Arts' ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : ach.category === 'Competition' ? (
                        <Trophy className="w-5 h-5 fill-current" />
                      ) : (
                        <Award className="w-5 h-5 fill-current" />
                      )}
                    </div>

                    <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-xs bg-[#24060b] text-[#ffd79e] tracking-wider uppercase shadow-inner">
                      {ach.badge}
                    </span>
                  </div>

                  {/* Title of Achievement */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1a0407] leading-snug group-hover:text-[#801620] transition-colors mb-1">
                    {ach.title}
                  </h3>

                  {/* Organization */}
                  <p className="font-mono text-xs text-[#801620] font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    <span>{ach.organization}</span>
                  </p>

                  {/* Description */}
                  <p className="font-sans-clean text-xs sm:text-sm text-[#461a1f] leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {/* Card Footer with Postmark stamp effect */}
                <div className="mt-5 pt-3 border-t border-[#e2d6c1] flex items-center justify-between text-xs font-mono text-[#78232c]">
                  <span className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    {ach.category}
                  </span>
                  <span className="font-mono-cam text-sm text-[#38090e] font-bold">
                    {ach.year}
                  </span>
                </div>

                {/* Decorative postal ink cancellation ring watermark */}
                <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full border-2 border-dashed border-[#801620]/20 pointer-events-none flex items-center justify-center rotate-12">
                  <span className="text-[8px] font-mono text-[#801620]/30 font-bold">VERIFIED</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal for Selected Achievement */}
      {selectedAch && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
          onClick={() => setSelectedAch(null)}
        >
          <div 
            className="relative bg-[#fcf9f0] text-[#24060b] max-w-lg w-full p-5 sm:p-7 rounded-sm shadow-2xl border border-[#ded5c0]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Washi tape header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape rounded-xs border border-black/10 flex items-center justify-center">
              <span className="font-mono text-[10px] font-bold text-[#5c0d16]">CERTIFICATE RECORD</span>
            </div>

            <div className="flex justify-between items-start mb-4 pt-2">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#d4af37]" />
                <span className="font-mono text-xs font-bold text-[#801620] uppercase tracking-wider">
                  {selectedAch.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedAch(null)}
                className="w-8 h-8 rounded-full bg-[#200508] text-[#ffd79e] font-mono text-sm flex items-center justify-center hover:bg-[#4a0d14] active:scale-95"
              >
                ✕
              </button>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1a0407] mb-1">
              {selectedAch.title}
            </h3>
            <p className="font-mono text-xs text-[#801620] font-bold uppercase mb-4">
              Issued by {selectedAch.organization} · {selectedAch.year}
            </p>

            <div className="p-3.5 sm:p-4 bg-[#f3ecdb] rounded-xs border border-[#e0d3bc] mb-5">
              <p className="font-sans-clean text-xs sm:text-sm text-[#381116] leading-relaxed">
                {selectedAch.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono text-[#801620]">
              <span className="flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                OFFICIAL RECORD VERIFIED
              </span>
              <button
                onClick={() => setSelectedAch(null)}
                className="px-4 py-2 bg-[#801620] text-[#ffd79e] font-mono text-xs font-bold rounded-xs shadow hover:bg-[#991c28] min-h-[40px]"
              >
                CLOSE FILE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
