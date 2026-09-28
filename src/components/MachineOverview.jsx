import React, { useState } from 'react';
import { Calculator, ShieldCheck, Zap, Award, Sparkles, Play, Image as ImageIcon } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import machineImg from '../assets/machine-main.jpg';
import heroBgVideo from '../assets/hero-bg.mp4';

export default function MachineOverview({ t, lang, onOpenQuote }) {
  const [activeMedia, setActiveMedia] = useState('photo');

  const handleWhatsapp = () => {
    const text = lang === 'hi'
      ? "नमस्ते Swaraj Machinery, मुझे राजगिरा और मुरमुरा लड्डू मेकिंग मशीन की पूरी जानकारी और फैक्टरी मूल्य चाहिए।"
      : "Hello Swaraj Machinery, please share complete specifications and factory price quotation for the Rajgira & Chirmura Laddu Making Machine.";
    window.open(`https://wa.me/${t.nav.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="machine-overview" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/30 to-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background Subtle Geometric Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Tagline, Detailed Description & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Top Verified Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200/60 shadow-sm text-brand-blue-700 text-xs sm:text-sm font-bold tracking-wide">
              <Award className="w-4 h-4 text-brand-amber-500" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Tagline / Subheading */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                {t.hero.tagline}
              </h2>
            </div>

            {/* Detailed Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsapp}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>{t.hero.ctaWhatsapp}</span>
              </button>

              {/* Get Quote Modal Button */}
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-brand-blue-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.nav.getQuote}</span>
              </button>

              {/* ROI Calculator Scroll Link */}
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-slate-200 shadow-sm transition hover:border-slate-300 text-sm sm:text-base"
              >
                <Calculator className="w-5 h-5 text-brand-amber-600" />
                <span>{t.hero.ctaCalculate}</span>
              </a>
            </div>

            {/* Live Trust Callout */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>{lang === 'hi' ? 'पूरे भारत में सुरक्षित ट्रांसपोर्ट व होम डिलीवरी उपलब्ध (Pan-India Dispatch)' : 'Safe Transport & Home Delivery Available Across India (Pan-India Dispatch)'}</span>
            </div>

          </div>

          {/* Right Column: High-Res Machine Visual Showcase with Media Switcher & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Frame Backdrop */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Radial Backdrop Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-600/20 to-brand-amber-500/20 rounded-3xl filter blur-2xl transform scale-95" />

              {/* Showcase Container Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 sm:p-4 shadow-2xl border border-slate-100 group">
                
                {/* Media Switcher Tab */}
                <div className="absolute top-5 right-5 z-20 flex items-center bg-slate-900/85 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white/20">
                  <button
                    onClick={() => setActiveMedia('photo')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeMedia === 'photo' ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'फोटो' : 'Photo'}</span>
                  </button>
                  <button
                    onClick={() => setActiveMedia('video')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeMedia === 'video' ? 'bg-brand-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'hi' ? 'लाइव वीडियो' : 'Live Video'}</span>
                  </button>
                </div>

                {activeMedia === 'photo' ? (
                  <div className="relative">
                    <img 
                      src={machineImg} 
                      alt={lang === 'hi' ? 'SWARAJ लड्डू मेकिंग मशीन' : 'SWARAJ Laddu Making Machine'}
                      className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Machine Overlay Highlight */}
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>SWARAJ Original 2026 Model</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                    <video
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="w-full h-full object-cover rounded-2xl"
                    >
                      <source src={heroBgVideo} type="video/mp4" />
                      <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>

              {/* Floating Live Badge 1: High Capacity */}
              <div className="absolute -bottom-3 left-2 sm:-bottom-4 sm:-left-6 max-w-[85%] sm:max-w-none bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2.5 sm:gap-3 animate-soft-pulse">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-black text-slate-900 leading-tight">{lang === 'hi' ? '1000+ लड्डू/घंटा' : '1000+ Laddus/Hr'}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">{lang === 'hi' ? 'भरपूर उत्पादन क्षमता' : 'High Production Capacity'}</div>
                </div>
              </div>

              {/* Floating Live Badge 2: Dual Output */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 max-w-[85%] sm:max-w-none bg-white/95 backdrop-blur-md p-2 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-base font-black text-slate-900 leading-tight">{lang === 'hi' ? 'SS 304 स्टील' : 'SS 304 Steel'}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">{lang === 'hi' ? '100% फूड हाइजेनिक' : '100% Food Hygienic'}</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Bottom Key Metrics Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200/80">
          
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-xl sm:text-3xl font-black text-brand-blue-600">{t.hero.stat1Val}</div>
            <div className="text-[11px] sm:text-sm font-semibold text-slate-700 mt-1">{t.hero.stat1Label}</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-xl sm:text-3xl font-black text-emerald-600">{t.hero.stat2Val}</div>
            <div className="text-[11px] sm:text-sm font-semibold text-slate-700 mt-1">{t.hero.stat2Label}</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-xl sm:text-3xl font-black text-brand-amber-500">{t.hero.stat3Val}</div>
            <div className="text-[11px] sm:text-sm font-semibold text-slate-700 mt-1">{t.hero.stat3Label}</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-xl sm:text-3xl font-black text-purple-600">{t.hero.stat4Val}</div>
            <div className="text-[11px] sm:text-sm font-semibold text-slate-700 mt-1">{t.hero.stat4Label}</div>
          </div>

        </div>

      </div>
    </section>
  );
}
