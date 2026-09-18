import { useState, useRef, useEffect, TouchEvent } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { playShutterSound, playDigicamBeep } from '../utils/audio';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Film, 
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface Props {
  onSelectProject: (project: Project) => void;
}

export function WorkFilmRoll({ onSelectProject }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentProject = PROJECTS[activeIdx] || PROJECTS[0];

  // When activeIdx changes, load and play the new video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy fallback: mute and retry
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [activeIdx]);

  const handleNext = () => {
    playDigicamBeep(1100);
    setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    playDigicamBeep(960);
    setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playDigicamBeep(1000);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    playDigicamBeep(1150);
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const restartCurrent = () => {
    if (!videoRef.current) return;
    playDigicamBeep(900);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Video completion callback: auto-start next reel!
  const handleVideoEnded = () => {
    if (autoAdvance) {
      playDigicamBeep(1200);
      setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
    }
  };

  // Touch handlers for mobile swiping (supports horizontal swipe and vertical TikTok-style swipe)
  const minSwipeDistance = 45;

  const onTouchStartHandler = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMoveHandler = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > minSwipeDistance) {
        // Swiped Left -> Next
        handleNext();
      } else if (distanceX < -minSwipeDistance) {
        // Swiped Right -> Prev
        handlePrev();
      }
    } else {
      if (distanceY > minSwipeDistance) {
        // Swiped Up -> Next (like Reels)
        handleNext();
      } else if (distanceY < -minSwipeDistance) {
        // Swiped Down -> Prev
        handlePrev();
      }
    }
  };

  const handleOpenFullProject = (proj: Project) => {
    playShutterSound();
    onSelectProject(proj);
  };

  return (
    <section id="work" className="py-16 sm:py-20 px-3 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="washi-tape px-4 py-1.5 -rotate-2 rounded-xs border border-[#d2c7b2] shadow-md">
              <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
                03 // WORK ARCHIVE
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-[#fcf9f0] tracking-tight break-words">
              COMMERCIAL VIDEOS
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-red-700/90 text-white font-mono text-[11px] font-bold rounded-xs flex items-center gap-1.5 border border-white/20 shadow animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              {PROJECTS.length} REELS · SWIPABLE
            </span>
            <span className="hidden sm:inline-block font-handwriting text-lg sm:text-xl text-[#ffd79e] rotate-[-2deg]">
              “Continuous reels theater — auto-advances on video end”
            </span>
          </div>
        </div>

        {/* SWIPABLE REELS THEATER (Interactive Featured Stage) */}
        <div className="bg-[#120709] border-2 border-[#3d272d] hover:border-[#d4af37]/60 rounded-xl p-4 sm:p-7 shadow-2xl transition-colors relative">
          
          {/* Decorative Corner Washi Tape */}
          <div className="absolute -top-3 left-8 w-24 h-6 washi-tape rotate-[-2deg] z-20 rounded-xs border border-amber-900/20 shadow-xs pointer-events-none"></div>
          <div className="absolute -top-3 right-8 w-24 h-6 washi-tape-red rotate-2 z-20 rounded-xs border border-white/20 shadow-xs pointer-events-none"></div>

          {/* Theater Top Bar: Reel Navigator Tabs & Auto-Advance Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#2d1b20] mb-6">
            {/* Direct Reel Selection Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[11px] text-[#ffd79e]/70 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Film className="w-3.5 h-3.5 text-[#d4af37]" />
                REEL DECK:
              </span>
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playDigicamBeep(1000 + idx * 50);
                    setActiveIdx(idx);
                  }}
                  className={`px-3 py-1.5 font-mono text-xs font-bold rounded-xs transition-all flex items-center gap-1.5 min-h-[34px] ${
                    activeIdx === idx
                      ? 'bg-[#801620] text-[#ffd79e] shadow-md border border-[#ffd79e]/40 ring-1 ring-[#ffd79e]/30 scale-105'
                      : 'bg-[#231216] text-[#b8a29b] hover:bg-[#331a20] hover:text-[#ffd79e] border border-[#3a2026]'
                  }`}
                >
                  <span>{p.frameNumber}</span>
                  <span className="hidden md:inline font-sans text-[11px] font-normal opacity-90 truncate max-w-[130px]">
                    {p.title.split('·')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Auto-Advance & Swipe Badge Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  playDigicamBeep(autoAdvance ? 850 : 1150);
                  setAutoAdvance(!autoAdvance);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-xs border flex items-center gap-1.5 transition-colors ${
                  autoAdvance
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-xs'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                }`}
                title="When active, the next video begins playing automatically when the current video finishes"
              >
                <span className={`w-2 h-2 rounded-full ${autoAdvance ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'}`}></span>
                <span>AUTO-ADVANCE NEXT: {autoAdvance ? 'ON' : 'OFF'}</span>
              </button>

              <div className="hidden xs:flex items-center gap-1 text-[10px] font-mono text-[#ffd79e]/60 bg-black/40 px-2 py-1 rounded border border-white/5">
                <Smartphone className="w-3 h-3 text-[#ffd79e]" />
                <span>SWIPABLE (←/→)</span>
              </div>
            </div>
          </div>

          {/* Main Stage: Centered 9:16 Video Player */}
          <div className="flex justify-center items-center py-4">
            
            {/* 9:16 Swipable Vertical Video Frame */}
            <div className="flex flex-col items-center">
              <div 
                className="relative w-full max-w-[340px] bg-[#1a080c] p-3.5 rounded-md border-2 border-[#472d34] shadow-[0_15px_40px_rgba(0,0,0,0.8)] group select-none"
                onTouchStart={onTouchStartHandler}
                onTouchMove={onTouchMoveHandler}
                onTouchEnd={onTouchEndHandler}
              >
                {/* 35mm Film Sprocket Bars on Top & Bottom */}
                <div className="flex items-center justify-between px-2 py-1 bg-black rounded-xs mb-2 overflow-hidden opacity-60">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3.5 h-2 bg-[#2d1b20] rounded-xs border border-[#442830]"></div>
                  ))}
                </div>

                {/* 9:16 Video Monitor Screen */}
                <div className="relative aspect-[9/16] bg-black rounded-xs overflow-hidden border border-[#3d272d] shadow-inner">
                  <video
                    ref={videoRef}
                    key={currentProject.videoUrl}
                    src={currentProject.videoUrl}
                    poster={currentProject.videoPoster || currentProject.image}
                    autoPlay
                    playsInline
                    muted={isMuted}
                    onEnded={handleVideoEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                  />

                  {/* Digicam OSD Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded font-mono text-[10px] text-emerald-400 border border-emerald-500/20 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span>{isPlaying ? 'PLAY' : 'PAUSE'}</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded font-mono text-[10px] text-[#ffd79e] border border-white/10 pointer-events-none">
                    {activeIdx + 1} / {PROJECTS.length} REEL
                  </div>

                  {/* Swipe Guidance Overlay (Fades out when playing) */}
                  <div className="absolute inset-x-0 bottom-12 flex items-center justify-between px-3 pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 hover:bg-[#801620] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow"
                      title="Previous Reel (Swipe Right)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[10px] text-white/90 bg-black/80 px-2 py-0.5 rounded-full border border-white/20">
                      SWIPE ← / →
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 hover:bg-[#801620] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow"
                      title="Next Reel (Swipe Left)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Big Click-to-Play/Pause Center Overlay */}
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
                  >
                    {!isPlaying && (
                      <div className="w-16 h-16 rounded-full bg-[#801620]/90 text-[#ffd79e] border-2 border-[#ffd79e] flex items-center justify-center pl-1 shadow-2xl transform scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Unmute Floating Banner if currently muted */}
                  {isMuted && isPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="absolute bottom-2.5 inset-x-3 py-1 px-2.5 bg-black/80 hover:bg-[#801620] text-[#ffd79e] font-mono text-[10px] font-bold rounded flex items-center justify-center gap-1.5 border border-[#d4af37]/40 backdrop-blur-xs transition-colors animate-pulse"
                    >
                      <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                      <span>TAP TO UNMUTE AUDIO</span>
                    </button>
                  )}
                </div>

                {/* Bottom Film Sprockets */}
                <div className="flex items-center justify-between px-2 py-1 bg-black rounded-xs mt-2 overflow-hidden opacity-60">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3.5 h-2 bg-[#2d1b20] rounded-xs border border-[#442830]"></div>
                  ))}
                </div>

                {/* Tactical Control Console */}
                <div className="mt-3 pt-2.5 border-t border-[#3d272d] flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={togglePlay}
                      className="p-2 bg-[#801620] hover:bg-[#a61c2b] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center shadow-xs"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={restartCurrent}
                      className="p-2 bg-[#2a1317] hover:bg-[#3d1d23] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-[#4a242c]"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 bg-[#2a1317] hover:bg-[#3d1d23] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-[#4a242c]"
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleOpenFullProject(currentProject)}
                      className="p-2 bg-[#2a1317] hover:bg-[#3d1d23] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-[#4a242c]"
                      title="Fullscreen Inspect"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Prev / Next Swipe Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      className="p-2 bg-[#2a1317] hover:bg-[#801620] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-[#4a242c]"
                      title="Previous Video (Swipe Right)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 bg-[#2a1317] hover:bg-[#801620] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-[#4a242c]"
                      title="Next Video (Swipe Left)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Reel Meta Info */}
              <div className="mt-4 text-center px-2 max-w-[360px]">
                <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#d4af37] bg-[#221115] px-2 py-0.5 rounded-xs border border-[#442830]">
                    {currentProject.frameNumber}
                  </span>
                  <span className="font-mono text-xs text-[#ffd79e]/70">
                    {currentProject.category}
                  </span>
                  {currentProject.driveUrl && (
                    <a
                      href={currentProject.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 px-2 py-0.5 rounded-xs transition-colors shadow-xs"
                      title="Open Google Drive folder"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>DRIVE FOLDER</span>
                    </a>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-[#fcf9f0] leading-snug">
                  {currentProject.title}
                </h3>
                <p className="font-sans text-xs text-[#d1c2a8]/80 mt-1 leading-relaxed">
                  {currentProject.tagline}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

