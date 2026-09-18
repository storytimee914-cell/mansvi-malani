import { useState, FormEvent } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPaperSound, playDigicamBeep } from '../utils/audio';
import { Mail, Send, Copy, Check, Github, Linkedin, Twitter, Instagram, Sparkles, MapPin, MessageCircle, Phone } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    playDigicamBeep(1200);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleCopyPhone = () => {
    playDigicamBeep(1200);
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playPaperSound();
    playDigicamBeep(1300);

    const formattedNote = 
`💌 *Postcard Note for Mansvi*
━━━━━━━━━━━━━━━━━━
👤 *From:* ${formData.name.trim() || 'Visitor'}
📧 *Email:* ${formData.email.trim() || 'Not provided'}

📝 *Message / Project Scope:*
${formData.message.trim()}

📮 *Dispatched via Portfolio Airmail Postcard*`;

    const targetUrl = `https://wa.me/919145999309?text=${encodeURIComponent(formattedNote)}`;
    setWhatsappUrl(targetUrl);

    // Open WhatsApp directly
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback handled by the on-screen button
    }

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 10000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Big Impact Headline strictly required by user */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-block washi-tape px-4 py-1.5 -rotate-1 rounded-xs border border-[#d2c7b2] shadow-md mb-2">
            <span className="font-mono text-xs font-bold text-[#5c0d16] tracking-widest uppercase">
              06 // CORRESPONDENCE
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#fcf9f0] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] break-words px-2">
            LET'S BUILD SOMETHING.
          </h2>

          <p className="font-sans-clean text-base sm:text-xl text-[#eeddcb] max-w-2xl mx-auto leading-relaxed">
            Have an ambitious web build, an AI automation challenge, or a creative project in mind? Let's talk.
          </p>
        </div>

        {/* Vintage Airmail Postcard Layout */}
        <div className="relative bg-[#fdfaf2] text-[#24060b] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-4 border-[#efe7d3] p-4.5 sm:p-10 transform sm:-rotate-0.5 max-w-5xl mx-auto">
          
          {/* Authentic Airmail Striped Top Border */}
          <div className="absolute top-0 inset-x-0 h-3 bg-[repeating-linear-gradient(45deg,#801620,#801620_15px,#fdfaf2_15px,#fdfaf2_30px,#255280_30px,#255280_45px,#fdfaf2_45px,#fdfaf2_60px)]"></div>

          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape rotate-1 rounded-xs border border-black/10 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-[#420a10]">AIR MAIL POSTCARD</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
            
            {/* Left Side: Postcard Message Note Form (7 cols on lg) */}
            <div className="lg:col-span-7 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e2d6bf] pb-8 lg:pb-0">
              <div className="flex items-center justify-between mb-4">
                <span className="font-handwriting font-bold text-2xl sm:text-3xl text-[#801620]">
                  “write a note to Mansvi”
                </span>
                <span className="font-mono text-xs text-[#735d62]">
                  POSTAGE PAID
                </span>
              </div>

              {formSent ? (
                <div className="p-6 sm:p-8 bg-[#f3ecdb] rounded-xs border border-[#ded1ba] text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#1b8a4f] text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1a0407]">
                    Postcard Sent to WhatsApp!
                  </h3>
                  <p className="font-sans-clean text-xs sm:text-sm text-[#4b1d22] max-w-md mx-auto">
                    Your note has been formatted and dispatched to Mansvi at <strong className="text-[#0c4a29]">+91 91459 99309</strong>. If WhatsApp did not open automatically, tap below:
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-[#1b8a4f] hover:bg-[#146e3e] text-white font-mono text-xs font-bold rounded-xs shadow flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[44px] w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4" />
                      OPEN WHATSAPP CHAT
                    </a>
                    <button
                      onClick={() => setFormSent(false)}
                      className="px-4 py-2.5 bg-[#e8ded0] hover:bg-[#ded1be] text-[#5c1c24] font-mono text-xs font-semibold rounded-xs border border-[#cdbfab] min-h-[44px] w-full sm:w-auto"
                    >
                      Write Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-[#801620] font-bold uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-3.5 py-2.5 bg-[#f4ece0] border-b-2 border-[#801620] rounded-xs font-sans-clean text-sm text-[#2b080d] placeholder:text-[#9c8b8f] focus:outline-none focus:bg-[#ffffff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#801620] font-bold uppercase mb-1">
                      Your Email (or Contact)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 bg-[#f4ece0] border-b-2 border-[#801620] rounded-xs font-sans-clean text-sm text-[#2b080d] placeholder:text-[#9c8b8f] focus:outline-none focus:bg-[#ffffff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#801620] font-bold uppercase mb-1">
                      Message / Project Scope
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me what you're creating, automated goals, or timeline..."
                      className="w-full px-3.5 py-2.5 bg-[#f4ece0] border-b-2 border-[#801620] rounded-xs font-sans-clean text-sm text-[#2b080d] placeholder:text-[#9c8b8f] focus:outline-none focus:bg-[#ffffff] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-3.5 px-3 bg-[#801620] hover:bg-[#991c28] text-[#ffd79e] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs shadow-md active:translate-y-0.5 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 group min-h-[48px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[#ffd79e] group-hover:scale-110 transition-transform" />
                      <span>SEND NOTE TO WHATSAPP</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#ffd79e]/80 font-normal">
                      (+91 91459 99309)
                    </span>
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-[#735d62] pt-1 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      <span>Dispatches to <strong>+91 91459 99309</strong></span>
                    </span>
                    <span className="text-[#801620] font-bold">AIRMAIL // WHATSAPP</span>
                  </div>
                </form>
              )}
            </div>

            {/* Right Side: Postcard Recipient & Stamps & Direct Email (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              
              {/* Vintage Postage Stamp & Cancellation Mark */}
              <div className="flex items-start justify-between">
                {/* Cancellation Postmark */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-[#801620]/40 flex flex-col items-center justify-center -rotate-12 select-none">
                  <span className="font-mono text-[9px] font-bold text-[#801620]">MUMBAI AIR</span>
                  <span className="font-mono-cam text-xs text-[#801620]">15.09.26</span>
                  <span className="font-mono text-[8px] text-[#801620]">OFFICIAL</span>
                </div>

                {/* Vintage Postage Stamp */}
                <div className="w-20 h-24 bg-[#ede2cb] p-1.5 rounded-xs border-2 border-dashed border-[#948169] shadow-md transform rotate-2 flex flex-col items-center justify-between">
                  <div className="w-full h-14 bg-[#2b080d] overflow-hidden rounded-xs flex items-center justify-center text-[#ffd79e]">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="w-full text-center">
                    <span className="font-mono text-[8px] font-bold text-[#420a10]">INDIA POST · 25₹</span>
                  </div>
                </div>
              </div>

              {/* Addressed To */}
              <div className="space-y-1.5 border-l-2 border-[#e0d3bc] pl-4">
                <p className="font-mono text-xs text-[#801620] uppercase font-bold tracking-wider">
                  TO:
                </p>
                <p className="font-display font-extrabold text-xl text-[#1a0407]">
                  {PERSONAL_INFO.name}
                </p>
                <p className="font-sans-clean text-xs text-[#4b1d22]">
                  Web Developer · AI & Automation Creator
                </p>
                <p className="font-sans-clean text-xs text-[#4b1d22] flex items-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#801620]" />
                  {PERSONAL_INFO.location}
                </p>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="bg-[#eef8f2] p-3 rounded-xs border border-[#a8dfc1] space-y-1.5">
                <span className="font-mono text-[10px] text-[#137a44] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#1b8a4f]" />
                  DIRECT WHATSAPP:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#0c4a29]">
                    +91 91459 99309
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyPhone}
                      title="Copy WhatsApp Number"
                      className="p-2 bg-[#1b8a4f] hover:bg-[#156e3f] text-white rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href="https://wa.me/919145999309"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#1b8a4f] hover:bg-[#156e3f] text-white text-xs font-mono font-bold rounded-xs transition-colors flex items-center gap-1 shadow-xs min-h-[38px]"
                    >
                      Chat
                    </a>
                  </div>
                </div>
                {copiedPhone && (
                  <p className="text-[10px] font-mono text-emerald-800 font-bold">
                    ✓ WhatsApp number copied!
                  </p>
                )}
              </div>

              {/* Direct Quick-Copy Email Box */}
              <div className="bg-[#f2e8d5] p-3 rounded-xs border border-[#dbccaf] space-y-1.5">
                <span className="font-mono text-[10px] text-[#801620] font-bold uppercase tracking-wider block">
                  DIRECT EMAIL INBOX:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-xs sm:text-sm font-bold text-[#1f0508] truncate hover:text-[#801620] hover:underline"
                    title="Send Email"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      title="Compose Email"
                      className="p-2 bg-[#f4ece0] hover:bg-[#ebe0d0] text-[#801620] rounded-xs border border-[#dbccaf] transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      id="copy-email-btn"
                      title="Copy Email to Clipboard"
                      className="p-2 bg-[#801620] hover:bg-[#9c1d29] text-[#ffd79e] rounded-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-[10px] font-mono text-emerald-700 font-bold">
                    ✓ Email address copied to clipboard!
                  </p>
                )}
              </div>

              {/* Social Channels Badge Bar */}
              <div className="pt-1">
                <span className="font-mono text-[10px] text-[#735d62] uppercase font-bold block mb-1.5">
                  CREATIVE LINKS & CHATS:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://wa.me/919145999309"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1050)}
                    className="p-3 bg-[#1b8a4f] hover:bg-[#146e3e] text-white rounded-xs border border-emerald-500/40 transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="WhatsApp (+91 91459 99309)"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1100)}
                    className="p-3 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs border border-[#d4af37]/30 transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1150)}
                    className="p-3 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs border border-[#d4af37]/30 transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1200)}
                    className="p-3 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs border border-[#d4af37]/30 transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDigicamBeep(1250)}
                    className="p-3 bg-[#200508] hover:bg-[#3d0b12] text-[#ffd79e] rounded-xs border border-[#d4af37]/30 transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Airmail Striped Edge */}
          <div className="absolute bottom-0 inset-x-0 h-3 bg-[repeating-linear-gradient(45deg,#801620,#801620_15px,#fdfaf2_15px,#fdfaf2_30px,#255280_30px,#255280_45px,#fdfaf2_45px,#fdfaf2_60px)]"></div>
        </div>

      </div>
    </section>
  );
}
