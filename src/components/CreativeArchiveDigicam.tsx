import { useState, useRef, MouseEvent } from 'react';
import { CREATIVE_ITEMS } from '../data/portfolioData';
import { CreativeItem, DigicamFilter } from '../types';
import { playShutterSound, playDigicamBeep, playPaperSound } from '../utils/audio';
import { Camera, ZoomIn, ZoomOut, Zap, Maximize2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onFlashTrigger: () => void;
}

export function CreativeArchiveDigicam({ onFlashTrigger }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState<DigicamFilter>('vintage-grain');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFlashing, setIsFlashing] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const cameraBodyRef = useRef<HTMLDivElement>(null);
  const currentItem = CREATIVE_ITEMS[selectedIdx];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cameraBodyRef.current) return;
    const rect = cameraBodyRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(y * 12),
      y: x * 14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleNext = () => {
    playDigicamBeep(1100);
    setSelectedIdx((prev) => (prev + 1) % CREATIVE_ITEMS.length);
  };

  const handlePrev = () => {
    playDigicamBeep(960);
    setSelectedIdx((prev) => (prev - 1 + CREATIVE_ITEMS.length) % CREATIVE_ITEMS.length);
  };

  const handleSnap = () => {
    setIsFlashing(true);
    playShutterSound();
    onFlashTrigger();
    setTimeout(() => {
      setIsFlashing(false);
    }, 280);
  };

  const handleZoom = (delta: number) => {
    playDigicamBeep(1200);
    setZoomLevel((prev) => Math.min(1.8, Math.max(1, +(prev + delta).toFixed(1))));
  };

  const getFilterStyle = (filter: DigicamFilter) => {
    switch (filter) {
      case 'vintage-grain':
        return 'contrast(120%) sepia(25%) saturate(110%)';
      case 'cyber-sepia':
        return 'sepia(80%) hue-rotate(-20deg) contrast(130%)';
      case 'film-bw':
        return 'grayscale(100%) contrast(140%) brightness(90%)';
      case 'y2k-vivid':
        return 'saturate(180%) contrast(125%) brightness(105%)';
      default:
        return 'none';
    }
  };

  return (
    <section id="archive" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="washi-tape px-4 py-1.5 -rotate-1 rounded-xs border border-[#d2c7b2] shadow-md">
              <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
                05 // GALLERY
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#fcf9f0] tracking-tight">
              CREATIVE ARCHIVE
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#ffd79e] bg-[#200508] px-3 py-1 rounded-xs border border-[#d4af37]/40">
              MODE: DIGICAM PLAYBACK [3.2MP]
            </span>
          </div>
        </div>

        {/* Main 3D Digicam & Curated Artwork Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Digicam Apparatus (7 cols on lg) */}
          <div 
            className="lg:col-span-8 perspective-1000 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cameraBodyRef}
              id="creative-digicam-chassis"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.12s ease-out'
              }}
              className="relative preserve-3d bg-gradient-to-b from-[#2b2529] via-[#1a1618] to-[#100d0f] rounded-2xl p-4 sm:p-6 border-2 border-[#524a50] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)]"
            >
              {/* Top Camera Status Bar & Shutter */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3c343a]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#f5efe6]">
                    CYBER-SHOT <span className="text-[#ffd79e]">DSC-P73</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Top Shutter Button */}
                  <button
                    onClick={handleSnap}
                    title="Flash Shutter"
                    id="creative-camera-shutter"
                    className="px-3.5 py-1 bg-gradient-to-b from-[#d4af37] to-[#997c1e] text-[#24060b] font-mono text-[11px] font-bold rounded shadow border border-[#f7e096] active:translate-y-0.5 transition-transform flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3 fill-current" />
                    FLASH SNAP
                  </button>

                  <span className="font-mono text-[10px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-700">
                    PLAYBACK 0{selectedIdx + 1}/0{CREATIVE_ITEMS.length}
                  </span>
                </div>
              </div>

              {/* LCD Screen Container */}
              <div className="relative rounded-lg overflow-hidden border-4 border-[#0c0a0b] bg-black shadow-inner aspect-[16/10] w-full">
                
                {/* Artwork Canvas Image */}
                <div 
                  className="w-full h-full overflow-hidden relative transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    style={{ filter: getFilterStyle(activeFilter) }}
                    className="w-full h-full object-cover transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                {/* CRT Screen Scanline Illusion */}
                <div className="absolute inset-0 bg-[radial-gradient(#00000000_50%,#000000bb_100%)] pointer-events-none"></div>

                {/* Camera OSD Overlays */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none font-mono-cam text-sm text-[#50fa7b] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <div className="flex flex-col">
                    <span className="text-[#ff79c6] font-bold tracking-wider">
                      [▶ MEMORY CARD]
                    </span>
                    <span className="text-xs text-[#f1fa8c]">
                      {currentItem.iso} · {currentItem.shutter} · {currentItem.aperture}
                    </span>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-emerald-400 font-bold">BAT [■■■■]</span>
                    <span className="text-xs text-[#8be9fd]">ZOOM {zoomLevel}X</span>
                  </div>
                </div>

                {/* Center Focus Box */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-16 h-16 border border-white/80 rounded-xs flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {/* Bottom OSD Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end pointer-events-none font-mono-cam text-sm text-[#ffd79e] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">{currentItem.title}</p>
                    <p className="text-xs text-[#ffb86c]">{currentItem.date} · {currentItem.resolution}</p>
                  </div>
                  <span className="text-xs bg-black/75 px-2 py-0.5 rounded text-[#50fa7b] border border-[#50fa7b]/30">
                    FILTER: {activeFilter.toUpperCase()}
                  </span>
                </div>

                {/* Camera Flash Burst Animation */}
                {isFlashing && (
                  <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-30"></div>
                )}
              </div>

              {/* Digicam Control Console */}
              <div className="mt-4 pt-3 border-t border-[#3c343a] flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* D-Pad Navigation Buttons */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                  <button
                    onClick={handlePrev}
                    title="Previous visual piece"
                    id="archive-prev-btn"
                    className="flex-1 sm:flex-initial px-4 py-2 bg-[#252023] hover:bg-[#3b3337] text-[#f7f3e8] rounded border border-[#544950] text-xs font-mono font-bold active:scale-95 transition-all flex items-center justify-center gap-1 min-h-[42px]"
                  >
                    <ChevronLeft className="w-4 h-4" /> PREV
                  </button>

                  <button
                    onClick={handleNext}
                    title="Next visual piece"
                    id="archive-next-btn"
                    className="flex-1 sm:flex-initial px-4 py-2 bg-[#252023] hover:bg-[#3b3337] text-[#f7f3e8] rounded border border-[#544950] text-xs font-mono font-bold active:scale-95 transition-all flex items-center justify-center gap-1 min-h-[42px]"
                  >
                    NEXT <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter Mode Switcher */}
                <div className="flex items-center gap-1 bg-[#120f11] p-1.5 rounded border border-[#3c343a] w-full sm:w-auto overflow-x-auto justify-start sm:justify-center no-scrollbar">
                  <span className="text-[10px] font-mono text-[#a89f91] px-1.5 hidden sm:inline flex-shrink-0">
                    FILTER:
                  </span>
                  {(['normal', 'vintage-grain', 'cyber-sepia', 'film-bw', 'y2k-vivid'] as DigicamFilter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setActiveFilter(f);
                        playDigicamBeep(1050);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors flex-shrink-0 min-h-[32px] ${
                        activeFilter === f
                          ? 'bg-[#d4af37] text-[#24060b] font-bold'
                          : 'text-[#8c8289] hover:text-white'
                      }`}
                    >
                      {f === 'vintage-grain' ? 'GRAIN' : f === 'cyber-sepia' ? 'SEPIA' : f === 'film-bw' ? 'B&W' : f === 'y2k-vivid' ? 'Y2K' : 'NORM'}
                    </button>
                  ))}
                </div>

                {/* Zoom Controls & Fullscreen */}
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleZoom(-0.2)}
                    title="Zoom Out"
                    className="p-2 bg-[#201c1e] hover:bg-[#342e31] text-[#ffd79e] rounded border border-[#4d4248] min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleZoom(0.2)}
                    title="Zoom In"
                    className="p-2 bg-[#201c1e] hover:bg-[#342e31] text-[#ffd79e] rounded border border-[#4d4248] min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      playPaperSound();
                      setFullscreenModal(true);
                    }}
                    title="Inspect High Resolution"
                    className="p-2 bg-[#801620] hover:bg-[#991c28] text-[#ffd79e] rounded border border-red-700 shadow min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Pinned Paper Card with Artwork Metadata (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            
            {/* Scrapbook Note Card */}
            <div className="relative bg-[#fdfaf2] text-[#250509] p-5 sm:p-6 rounded-sm shadow-xl border border-[#ded5bf] transform sm:rotate-1">
              {/* Tape holding top of card */}
              <div className="absolute -top-3 left-6 sm:left-8 w-20 sm:w-24 h-5 sm:h-6 washi-tape -rotate-2 rounded-xs border border-black/10"></div>

              <div className="flex items-center justify-between border-b border-[#e5d9c2] pb-2 mb-3">
                <span className="font-mono text-xs font-bold text-[#801620] uppercase tracking-wider">
                  EXHIBIT 0{selectedIdx + 1}
                </span>
                <span className="font-mono text-xs text-[#6e585d]">
                  {currentItem.date}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-[#1a0407] mb-1 leading-snug">
                {currentItem.title}
              </h3>

              <p className="font-mono text-xs text-[#801620] font-semibold mb-3">
                {currentItem.medium}
              </p>

              <p className="font-sans-clean text-xs sm:text-sm text-[#46191f] leading-relaxed mb-4">
                {currentItem.description}
              </p>

              {/* Tag Stickers */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#e5d9c2]">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#ede4cf] text-[#2e080d] text-[10px] font-mono rounded-xs border border-[#dacbb0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Handwritten note at bottom */}
              <div className="mt-4 pt-2 text-right">
                <span className="font-handwriting text-xl text-[#7a1823] font-bold">
                  “captured on digicam”
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setFullscreenModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#120f11] rounded-lg p-4 border border-neutral-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3 text-white">
              <span className="font-mono text-sm font-bold text-[#ffd79e]">
                {currentItem.title} · {currentItem.medium}
              </span>
              <button 
                onClick={() => setFullscreenModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-[70vh] overflow-hidden rounded flex items-center justify-center bg-black">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                style={{ filter: getFilterStyle(activeFilter) }}
                className="max-w-full max-h-[68vh] object-contain"
              />
            </div>

            <div className="mt-3 flex justify-between items-center text-xs font-mono text-neutral-400">
              <span>{currentItem.date} · {currentItem.resolution}</span>
              <span className="text-[#d4af37]">ACTIVE FILTER: {activeFilter.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
