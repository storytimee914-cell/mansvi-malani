import { useState, useEffect } from 'react';
import { Sparkles, Film, Award, Code, Mail, Menu, X, Globe } from 'lucide-react';
import { playDigicamBeep, playPaperSound } from '../utils/audio';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Retro digicam timestamp clock
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about', icon: Sparkles },
    { label: 'SKILLS', href: '#skills', icon: Code },
    { label: 'WORK', href: '#work', icon: Film },
    { label: 'WEBSITES', href: '#websites', icon: Globe },
    { label: 'ACHIEVEMENTS', href: '#achievements', icon: Award },
    { label: 'CONTACT', href: '#contact', icon: Mail },
  ];

  return (
    <header 
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 py-2.5 sm:py-3 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#4d0912]/95 backdrop-blur-md border-b border-[#ffd79e]/20 shadow-xl' 
          : 'bg-[#6b0f1a]/50 backdrop-blur-xs sm:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Vintage Label Maker / Digicam OSD Badge */}
        <a 
          href="#top" 
          onClick={() => {
            playDigicamBeep(850);
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 group min-h-[44px]"
          id="nav-logo"
        >
          <div className="bg-[#181414] text-[#f7f3e8] px-2.5 py-1 text-xs font-mono tracking-widest uppercase border border-[#d4af37]/40 shadow-sm flex items-center gap-1.5 transform -rotate-1 group-hover:rotate-0 transition-transform">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-bold">MM // '26</span>
          </div>
          <span className="hidden sm:inline-block font-mono-cam text-lg text-[#ffd79e] tracking-wider">
            REC [{currentTime || '12:00:00'}]
          </span>
        </a>

        {/* Center: Desktop Scrapbook Paper Tape Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item, idx) => {
            const rot = (idx % 2 === 0 ? -1 : 1) * (0.8 + (idx * 0.2));
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => playDigicamBeep(950 + idx * 40)}
                id={`nav-link-${item.label.toLowerCase()}`}
                style={{ transform: `rotate(${rot}deg)` }}
                className="relative px-3 py-1.5 bg-[#fcf9f0] text-[#420a10] text-xs font-sans-clean font-bold tracking-wider hover:bg-[#fffdf7] hover:scale-105 transition-all shadow-sm border border-[#e2d8c3] rounded-xs min-h-[32px] flex items-center"
              >
                {/* Washi tape pin illusion on top edge */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#d4af37]/40 rounded-xs"></span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Controls & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Talk CTA button */}
          <a
            href="#contact"
            onClick={() => {
              playDigicamBeep(1200);
              setMobileMenuOpen(false);
            }}
            id="header-cta-btn"
            className="hidden xs:flex items-center px-3 py-1.5 bg-[#d4af37] hover:bg-[#ebd074] text-[#34080d] font-sans-clean font-bold text-xs tracking-wider rounded-xs shadow-md transform hover:-rotate-1 transition-all border border-[#f7e096] min-h-[40px]"
          >
            LET'S TALK
          </a>

          {/* Mobile Hamburger Toggle (Visible only on < md) */}
          <button
            onClick={() => {
              playDigicamBeep(mobileMenuOpen ? 800 : 1000);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            id="mobile-menu-toggle-btn"
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-10 h-10 bg-[#25080c] text-[#ffd79e] rounded-xs border border-[#d4af37]/40 shadow-sm active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Viewport */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#d4af37]/30 bg-[#2a060a]/95 backdrop-blur-md rounded-b-lg px-2 pb-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="font-mono text-[11px] text-[#ffd79e]/80 tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              ARCHIVE DIRECTORY // MENU
            </span>
            <span className="font-mono-cam text-xs text-[#50fa7b]">
              {currentTime}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    playPaperSound();
                    playDigicamBeep(950 + idx * 40);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-xs bg-[#fcf9f0] text-[#38090e] font-sans-clean font-bold text-xs tracking-wider border border-[#ded5c0] shadow-sm active:scale-95 transition-transform min-h-[46px]"
                >
                  <Icon className="w-4 h-4 text-[#801620] flex-shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#54121a] flex items-center justify-between px-2">
            <a
              href="#contact"
              onClick={() => {
                playDigicamBeep(1200);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#d4af37] text-[#34080d] font-sans-clean font-bold text-xs tracking-wider uppercase text-center rounded-xs shadow flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>SEND A NOTE / CONTACT MANSVI</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
