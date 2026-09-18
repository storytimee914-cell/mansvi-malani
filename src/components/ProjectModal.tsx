import { useState, useRef, useEffect, TouchEvent } from 'react';
import { Project } from '../types';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Film, 
  ChevronLeft, 
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { playPaperSound, playDigicamBeep } from '../utils/audio';

interface Props {
  project: Project | null;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  onClose: () => void;
}

export function ProjectModal({ project, projects = [], onSelectProject, onClose }: Props) {
  if (!project) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const totalProjects = projects.length;
  const hasMultipleProjects = totalProjects > 1 && !!onSelectProject;

  // Whenever the active project changes, reset and play the video
  useEffect(() => {
    setActiveStageIdx(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [project.id]);

  const handleNext = () => {
    if (!hasMultipleProjects || !onSelectProject) return;
    playDigicamBeep(1100);
    const nextIdx = (currentIndex + 1) % totalProjects;
    onSelectProject(projects[nextIdx]);
  };

  const handlePrev = () => {
    if (!hasMultipleProjects || !onSelectProject) return;
    playDigicamBeep(960);
    const prevIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    onSelectProject(projects[prevIdx]);
  };

  // When a video finishes playing: auto-advance to next video!
  const handleVideoEnded = () => {
    if (autoAdvance && hasMultipleProjects && onSelectProject) {
      playDigicamBeep(1200);
      const nextIdx = (currentIndex + 1) % totalProjects;
      onSelectProject(projects[nextIdx]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasMultipleProjects]);

  // Touch handlers for swipe navigation
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
        // Swiped Up -> Next
        handleNext();
      } else if (distanceY < -minSwipeDistance) {
        // Swiped Down -> Prev
        handlePrev();
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playDigicamBeep(1100);
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
    playDigicamBeep(1200);
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    playDigicamBeep(950);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleStageJump = (idx: number, timeStr: string) => {
    setActiveStageIdx(idx);
    playDigicamBeep(1150);
    if (!videoRef.current) return;
    const seconds = parseInt(timeStr.split(':')[1]?.split(' ')[0] || '0', 10);
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      {/* Floating Prev Button for Modal */}
      {hasMultipleProjects && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1b0609]/90 hover:bg-[#801620] text-[#ffd79e] border border-[#d4af37]/40 items-center justify-center shadow-2xl transition-all z-60 active:scale-95"
          title="Previous Video (Swipe Right / Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Floating Next Button for Modal */}
      {hasMultipleProjects && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1b0609]/90 hover:bg-[#801620] text-[#ffd79e] border border-[#d4af37]/40 items-center justify-center shadow-2xl transition-all z-60 active:scale-95"
          title="Next Video (Swipe Left / Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div 
        className={`relative bg-[#fdfaf2] text-[#24060b] ${project.isVideo ? 'max-w-4xl' : 'max-w-2xl'} w-full p-4 sm:p-8 rounded-sm shadow-2xl border-2 border-[#e5dcce] my-4 sm:my-8 transform sm:rotate-0.5 max-h-[92vh] overflow-y-auto custom-scrollbar select-none`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStartHandler}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
      >
        {/* Washi tape on top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-6 washi-tape rotate-1 rounded-xs border border-black/10 flex items-center justify-center shadow-xs">
          <span className="font-mono text-[10px] font-bold text-[#5c0d16] uppercase tracking-wider">
            {project.frameNumber} // {project.isVideo ? 'VIDEO REEL ARCHIVE' : 'ARCHIVE FILE'}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playPaperSound();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-[#200508] text-[#ffd79e] flex items-center justify-center hover:bg-[#4a0d14] active:scale-95 transition-all z-20 shadow"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header & Navigation Strip */}
        <div className="pt-2 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#200508] text-[#ffd79e] font-mono text-[11px] font-bold rounded-xs flex items-center gap-1.5">
                {project.isVideo && <Film className="w-3 h-3 text-[#d4af37]" />}
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#801620] font-bold">
                YEAR: {project.year}
              </span>
              {project.isVideo && (
                <span className="px-2 py-0.5 bg-red-700 text-white font-mono text-[10px] font-bold rounded-xs animate-pulse">
                  ● 9:16 VERTICAL REEL
                </span>
              )}
            </div>

            {/* Reel Navigation & Auto-advance status */}
            {hasMultipleProjects && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoAdvance(!autoAdvance)}
                  className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded-xs border flex items-center gap-1 transition-colors ${
                    autoAdvance
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-500'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                  }`}
                  title="Auto advance to next video when current video ends"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${autoAdvance ? 'bg-emerald-600 animate-ping' : 'bg-neutral-400'}`}></span>
                  <span>AUTO-NEXT: {autoAdvance ? 'ON' : 'OFF'}</span>
                </button>

                <span className="font-mono text-xs text-[#801620] font-bold bg-[#efe4ce] px-2 py-0.5 rounded-xs">
                  {currentIndex + 1} OF {totalProjects}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 bg-[#200508] hover:bg-[#4a0d14] text-[#ffd79e] rounded-xs transition-colors"
                    title="Previous Video"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 bg-[#200508] hover:bg-[#4a0d14] text-[#ffd79e] rounded-xs transition-colors"
                    title="Next Video"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1a0407] leading-tight">
            {project.title}
          </h3>
          <p className="font-sans-clean text-sm sm:text-base text-[#5a2128] font-medium mt-1">
            {project.tagline}
          </p>

          {/* Swipe indicator hint on mobile */}
          <div className="flex sm:hidden items-center gap-1.5 font-mono text-[11px] text-[#801620] mt-2 bg-[#f4ebd9] px-2 py-1 rounded-xs border border-[#ded0b6]">
            <Smartphone className="w-3 h-3 text-[#801620]" />
            <span>Swipe left or right to switch videos. Auto-plays next when finished.</span>
          </div>
        </div>

        {/* Video Player Display or Polaroid Image */}
        {project.isVideo && project.videoUrl ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
            {/* Vertical Video Viewport in Vintage Digicam Frame (5 cols on md) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] bg-[#120406] p-2.5 rounded-sm border-2 border-[#d6c9af] shadow-xl">
                
                {/* Top tape on video casing */}
                <div className="absolute -top-2.5 left-8 w-16 h-4 washi-tape-red rotate-2 rounded-xs border border-white/20"></div>

                {/* Video Monitor Bezel */}
                <div className="relative aspect-[9/16] bg-black rounded-xs overflow-hidden border border-[#3d2b2f]">
                  <video
                    ref={videoRef}
                    key={project.videoUrl}
                    src={project.videoUrl}
                    poster={project.videoPoster || project.image}
                    autoPlay
                    playsInline
                    muted={isMuted}
                    onEnded={handleVideoEnded}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Digicam OSD Overlay on Video */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded font-mono text-[9px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    <span>{isPlaying ? 'PLAY' : 'PAUSE'}</span>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded font-mono text-[9px] text-[#ffd79e]">
                    {currentIndex + 1}/{totalProjects} REEL
                  </div>

                  {/* Unmute prompt if muted */}
                  {isMuted && isPlaying && (
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-3 inset-x-2 py-1 px-2 bg-black/80 hover:bg-[#801620] text-[#ffd79e] font-mono text-[10px] font-bold rounded flex items-center justify-center gap-1 border border-[#ffd79e]/40"
                    >
                      <VolumeX className="w-3 h-3 text-amber-400" />
                      <span>TAP TO UNMUTE</span>
                    </button>
                  )}
                </div>

                {/* Playback Control Bar underneath */}
                <div className="mt-2.5 pt-2 border-t border-[#3d2b2f] flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      id="video-modal-play-btn"
                      className="p-2 sm:p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center bg-[#801620] hover:bg-[#a61c2b] text-[#ffd79e] rounded-xs transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={restartVideo}
                      id="video-modal-restart-btn"
                      className="p-2 sm:p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleMute}
                      id="video-modal-mute-btn"
                      className="p-2 sm:p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>

                  {hasMultipleProjects && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        className="p-1.5 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs transition-colors"
                        title="Prev Video"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-1.5 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs transition-colors"
                        title="Next Video"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stages & Process Breakdown for the Video Reel (7 cols on md) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-[#801620] uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#d4af37]" />
                  VIDEO TIMELINE & STORYBOARD BREAKDOWN:
                </h4>
                <p className="font-sans-clean text-xs text-[#522026]">
                  Click any stage below to scrub the video playback to that exact manufacturing sequence:
                </p>

                {/* Stage Cards */}
                <div className="space-y-2.5 pt-1">
                  {project.stages?.map((st, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleStageJump(idx, st.time)}
                      className={`p-3 rounded-xs border transition-all cursor-pointer flex items-center gap-3 ${
                        activeStageIdx === idx
                          ? 'bg-[#f4ebe0] border-[#801620] shadow-md ring-1 ring-[#801620]/30 -translate-y-0.5'
                          : 'bg-[#faf6ee] border-[#ded0b6] hover:bg-[#f5eedf]'
                      }`}
                    >
                      {/* Stage Thumbnail */}
                      {st.image && (
                        <div className="w-12 h-16 rounded-xs overflow-hidden border border-[#c9baa0] flex-shrink-0 bg-black">
                          <img src={st.image} alt={st.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-mono text-xs font-bold text-[#801620]">
                            {st.title}
                          </span>
                          <span className="font-mono text-[10px] bg-[#200508] text-[#ffd79e] px-1.5 py-0.5 rounded-xs">
                            {st.time}
                          </span>
                        </div>
                        <p className="font-sans-clean text-xs text-[#3d1318] line-clamp-2 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand statement banner */}
              <div className="p-3 bg-[#f2e6d2] rounded-xs border border-[#dec9ab] text-center flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#801620] block">
                    “{project.title.split('·')[0]}”
                  </span>
                  <span className="font-handwriting text-sm text-[#420a10]">
                    Directed & Edited by Ananya Sharma
                  </span>
                </div>
                {hasMultipleProjects && (
                  <button
                    onClick={handleNext}
                    className="px-3 py-1.5 bg-[#801620] hover:bg-[#9e1c2a] text-[#ffd79e] font-mono text-[11px] font-bold rounded-xs shadow flex items-center gap-1 transition-colors"
                  >
                    <span>NEXT REEL</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Standard 16:9 Polaroid Image for other projects */
          <div className="relative aspect-[16/9] bg-[#1a1215] overflow-hidden rounded-xs border-2 border-[#dcd1ba] mb-5 shadow-inner">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded font-mono-cam text-sm text-[#ffb86c]">
              {project.frameNumber} · 35MM EXPOSURE
            </div>
          </div>
        )}

        {/* Description */}
        <div className="space-y-4 mb-6">
          <p className="font-sans-clean text-sm sm:text-base text-[#391217] leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="bg-[#f4ece0] p-4 rounded-xs border border-[#decbb2] space-y-2">
            <h4 className="font-mono text-xs font-bold text-[#801620] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              {project.isVideo ? 'PRODUCTION & MOTION HIGHLIGHTS:' : 'ENGINEERING & IMPACT HIGHLIGHTS:'}
            </h4>
            <ul className="space-y-1.5">
              {project.highlights.map((hl, i) => (
                <li key={i} className="font-sans-clean text-xs sm:text-sm text-[#381116] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <span className="font-mono text-xs font-bold text-[#801620] uppercase block mb-2">
              {project.isVideo ? 'SOFTWARE & PRODUCTION TOOLS:' : 'TECHNOLOGIES USED:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#ede4ce] text-[#2c080d] font-mono text-xs font-medium rounded-xs border border-[#dacbb1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#e2d5bd] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#801620] hover:bg-[#9c1e2a] text-[#ffd79e] font-mono text-xs font-bold tracking-wider uppercase rounded-xs shadow flex items-center gap-1.5"
              >
                {project.isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <ExternalLink className="w-3.5 h-3.5" />}
                {project.isVideo ? 'OPEN FULL RESOLUTION REEL' : 'LIVE PREVIEW'}
              </a>
            )}
            {project.driveUrl && (
              <a
                href={project.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] font-mono text-xs font-bold tracking-wider uppercase rounded-xs shadow border border-emerald-500/40 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                GOOGLE DRIVE FOLDER
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#200508] hover:bg-[#380b12] text-[#ffd79e] font-mono text-xs font-bold tracking-wider uppercase rounded-xs shadow border border-[#d4af37]/30 flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                VIEW CODE
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasMultipleProjects && (
              <button
                onClick={handleNext}
                className="font-mono text-xs text-[#801620] font-bold hover:underline flex items-center gap-1"
              >
                <span>NEXT REEL</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => {
                playPaperSound();
                onClose();
              }}
              className="font-mono text-xs text-[#801620] font-bold hover:underline"
            >
              RETURN TO ARCHIVE ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


