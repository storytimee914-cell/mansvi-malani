export function ScrapbookStickers() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Film negative snippet in top right */}
      <div 
        className="absolute top-24 -right-10 w-24 h-44 bg-[#0a0708] border border-[#2a2225] rounded-xs shadow-2xl rotate-[18deg] opacity-25 flex flex-col justify-between p-1.5"
      >
        <div className="flex justify-between">
          <span className="w-1.5 h-2 bg-black rounded-xs"></span>
          <span className="w-1.5 h-2 bg-black rounded-xs"></span>
        </div>
        <div className="text-[7px] font-mono text-[#ffd79e] text-center rotate-90">
          35MM EXP 24
        </div>
        <div className="flex justify-between">
          <span className="w-1.5 h-2 bg-black rounded-xs"></span>
          <span className="w-1.5 h-2 bg-black rounded-xs"></span>
        </div>
      </div>

      {/* Star sticker in mid left */}
      <div 
        className="absolute top-[35%] -left-4 w-16 h-16 rounded-full bg-[#fcf8ee] border border-[#d6cfbe] shadow-lg rotate-[-15deg] opacity-20 flex items-center justify-center text-[#801620] font-serif-vintage text-2xl"
      >
        ★
      </div>

      {/* Washi tape strip floating in lower right */}
      <div 
        className="absolute top-[65%] -right-6 w-32 h-7 washi-tape-red rotate-[-22deg] opacity-25 rounded-xs"
      ></div>

      {/* Star sticker near bottom left */}
      <div 
        className="absolute bottom-28 left-8 w-12 h-12 rounded-full bg-[#d4af37] shadow-lg rotate-[10deg] opacity-20 flex items-center justify-center text-[#200508] font-bold text-xs"
      >
        '26
      </div>
    </div>
  );
}
