import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ChevronDown, Award } from 'lucide-react';
import heroBgVideo from '../assets/hero-bg.mp4';

export default function Hero({ t, lang }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Video Player - 100% Crisp & Unobstructed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src={heroBgVideo} type="video/mp4" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Cinematic Ambient Gradient for Crisp Readability of the Title */}
      <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/35 pointer-events-none" />

      {/* Floating Sound Toggle Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
        <button
          onClick={toggleSound}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          title={isMuted ? "Sound On" : "Sound Off"}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-slate-300 group-hover:text-white transition" />
          ) : (
            <Volume2 className="w-5 h-5 text-amber-400 animate-pulse group-hover:text-amber-300 transition" />
          )}
        </button>
      </div>

      {/* Center Cinematic Content Over Video with 50% Opacity Texture Background */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 text-center py-10 sm:py-16 my-4 sm:my-8 rounded-3xl overflow-hidden">
        {/* Texture Image Layer at 50% Opacity behind Hero Text */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none mix-blend-screen"
          style={{ backgroundImage: `url('/text-bg-texture.jpg')` }}
          aria-hidden="true"
        />
        {/* Soft vignette backing to ensure text is 100% sharp and readable */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs pointer-events-none -z-10" />

        <div className="relative z-10">
          {/* Sleek Trust Badge matching the cinematic video */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] sm:text-xs font-bold shadow-xl border border-amber-400/40 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="tracking-wide">{t.hero.trustBadge}</span>
          </div>

          {/* Main Product Name - Fully dynamic for Hindi, English & Marathi */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-normal leading-[1.3] sm:leading-[1.25] drop-shadow-2xl">
            {t.hero.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 block sm:inline">
              {t.hero.titleHighlight}
            </span>
          </h1>
        </div>
      </div>

      {/* Inverted Semi-Circle Fade Divider (उलट अर्धसर्कल फेड - आत न जाता खाली वळणारा) */}
      <div className="absolute -bottom-px left-0 right-0 pointer-events-none z-10 overflow-hidden leading-none select-none">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 sm:h-16 md:h-20"
        >
          <defs>
            <linearGradient id="heroInvertedCurveFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
              <stop offset="45%" stopColor="#f8fafc" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path 
            d="M0,0 C450,95 990,95 1440,0 L1440,100 L0,100 Z" 
            fill="url(#heroInvertedCurveFade)" 
          />
        </svg>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#machine-showcase"
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/90 hover:text-white transition group"
      >
        <span className="text-[11px] sm:text-xs font-bold tracking-wider bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-xl group-hover:border-amber-400/50 transition">
          {lang === 'mr' ? 'तपशील खाली पाहा' : lang === 'hi' ? 'विवरण नीचे देखें' : 'Explore Details'}
        </span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-amber-400" />
      </a>
    </section>
  );
}
