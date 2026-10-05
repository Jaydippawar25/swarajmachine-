import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Image as ImageIcon, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Settings,
  PhoneCall,
  TrendingUp
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import machineTrayImg from '../assets/machine-laddu-tray.jpg';
import machineMainImg from '../assets/machine-main.jpg';
import machineVideo from '../assets/hero-bg.mp4';

function AnimatedCounter({ target, suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof target === 'number' ? target : parseInt(target, 10);
    if (isNaN(end)) return;

    const interval = 25;
    const steps = duration / interval;
    const increment = Math.max(1, Math.ceil(end / steps));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else {
        setVal(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{val.toLocaleString()}{suffix}</span>;
}

export default function MachineShowcase({ t, lang, onOpenQuote, specs, settings }) {
  const [activeMedia, setActiveMedia] = useState('tray'); // 'tray', 'front', 'video'
  const data = t.showcase;

  const whatsappNumber = settings?.whatsappNumber || t.nav.whatsappNumber;
  const phone = settings?.phone || t.nav.phone;

  const handleWhatsapp = () => {
    if (onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <section id="machine-showcase" className="py-14 sm:py-20 relative border-b border-slate-200 overflow-hidden site-text-texture-bg site-text-texture-wash-light">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Business Subheadline, Description & Primary Action CTAs */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-brand-amber-500" />
            <span>{t.hero.trustBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-normal leading-[1.35] sm:leading-[1.45] max-w-4xl mx-auto">
            {t.hero.subheadline}
          </h2>

          <p className="mt-6 sm:mt-7 text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            {t.hero.description}
          </p>

          {/* Primary High-Converting Buttons - Perfectly Equal Level & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-2xl mx-auto w-full">
            <button
              type="button"
              onClick={handleWhatsapp}
              className="h-12 sm:h-14 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
              <span>{t.hero.ctaWhatsapp}</span>
            </button>

            <button
              type="button"
              onClick={onOpenQuote}
              className="h-12 sm:h-14 w-full inline-flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-black px-4 rounded-2xl shadow-lg shadow-brand-blue-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>{t.hero.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>

            <a
              href={`tel:${phone}`}
              className="h-12 sm:h-14 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 rounded-2xl shadow-md transition text-sm whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{t.hero.ctaCall}</span>
            </a>
          </div>
        </div>

        {/* Top Divider Line - Perfectly Symmetrical & Aligned */}
        <div className="w-full max-w-5xl mx-auto border-t border-slate-200 my-10 sm:my-12" />

        {/* 4 Key Metrics Highlights (Framed Symmetrically) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          
          {/* Card 1: 1000+ Speed */}
          <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 text-brand-blue-600" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
                {lang === 'mr' ? 'हाय-स्पीड' : lang === 'hi' ? 'हाई-स्पीड' : 'High Speed'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-brand-blue-600 transition-colors">
              <AnimatedCounter target={1000} suffix="+" duration={1400} />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 leading-snug">
              {t.hero.stat1Label}
            </div>
          </div>

          {/* Card 2: 80% Savings */}
          <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
                {lang === 'mr' ? 'थेट बचत' : lang === 'hi' ? 'सीधी बचत' : 'Savings'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">
              <AnimatedCounter target={80} suffix="%" duration={1200} />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 leading-snug">
              {t.hero.stat2Label}
            </div>
          </div>

          {/* Card 3: SS 304 Steel */}
          <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4 text-brand-blue-600" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
                {lang === 'mr' ? 'फूड-ग्रेड' : lang === 'hi' ? 'फूड-ग्रेड' : 'Food Grade'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-brand-blue-600 transition-colors">
              {t.hero.stat3Val}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 leading-snug">
              {t.hero.stat3Label}
            </div>
          </div>

          {/* Card 4: 220V Electricity */}
          <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
                {lang === 'mr' ? 'सिंगल फेज' : lang === 'hi' ? 'सिंगल फेज' : 'Single Phase'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">
              {t.hero.stat4Val}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 leading-snug">
              {t.hero.stat4Label}
            </div>
          </div>

        </div>

        {/* Bottom Divider Line - Perfectly Symmetrical & Aligned */}
        <div className="w-full max-w-5xl mx-auto border-t border-slate-200 my-10 sm:my-12" />

        {/* Section Divider Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h3>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            {data.subtitle}
          </p>
        </div>

        {/* Main Showcase Layout: Left Visual Gallery + Right Specs - Symmetrical & Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Visual Media Showcase with Symmetrical Top Header */}
          <div className="h-full bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl flex flex-col justify-between group">
            
            <div>
              {/* Left Card Top Header - Matches Right Card Exactly */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold">
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900">
                    {lang === 'mr' ? 'मशीन प्रत्यक्ष दृश्य' : lang === 'hi' ? 'मशीन का लाइव दृश्य' : 'Machine Live Showcase'}
                  </h3>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
                  SWARAJ 2026
                </span>
              </div>

              {/* Top Media Switcher Bar */}
              <div className="flex items-center justify-between gap-1.5 mb-3 bg-slate-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveMedia('tray')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activeMedia === 'tray'
                      ? 'bg-brand-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="truncate">{data.tabPhoto1}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMedia('front')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activeMedia === 'front'
                      ? 'bg-brand-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="truncate">{data.tabPhoto2}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activeMedia === 'video'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="truncate">{data.tabVideo}</span>
                </button>
              </div>

              {/* Active Media Display Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
                {activeMedia === 'tray' && (
                  <img
                    src={machineTrayImg}
                    alt={lang === 'mr' ? 'SWARAJ लाडू मेकिंग मशीन लाडू ट्रे' : lang === 'hi' ? 'SWARAJ लड्डू मेकिंग मशीन लड्डू ट्रे' : 'SWARAJ Laddu Machine with Collection Tray'}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {activeMedia === 'front' && (
                  <img
                    src={machineMainImg}
                    alt={lang === 'mr' ? 'SWARAJ लाडू मशीन मुख्य भाग' : lang === 'hi' ? 'SWARAJ लड्डू मशीन मुख्य भाग' : 'SWARAJ Laddu Machine Front Chassis'}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {activeMedia === 'video' && (
                  <video
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  >
                    <source src={machineVideo} type="video/mp4" />
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                  </video>
                )}

                {/* Corner Genuine Product Stamp */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-md border border-amber-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SWARAJ Original 2026 Model</span>
                </div>
              </div>
            </div>

            {/* 4 Crisp Value Callouts Below Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{data.quickFeature1}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{data.quickFeature2}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{data.quickFeature3}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{data.quickFeature4}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clear, Practical Technical Specifications Table */}
          <div className="h-full bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl flex flex-col justify-between">
            
            <div>
              {/* Right Card Top Header - Matches Left Card Exactly */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900">
                      {data.specsTitle}
                    </h3>
                    {specs && (
                      <span className="text-[11px] font-bold text-amber-700 block">
                        {specs.priceOnRequest 
                          ? (lang === 'mr' ? 'किंमत: विचारणेवर उपलब्ध' : lang === 'hi' ? 'कीमत: मांग पर उपलब्ध' : 'Price: On Request')
                          : specs.priceDisplay ? `${lang === 'mr' ? 'किंमत:' : lang === 'hi' ? 'कीमत:' : 'Price:'} ${specs.priceDisplay}` : ''}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                  VERIFIED SPECS
                </span>
              </div>

              {/* Specs Table List */}
              <div className="divide-y divide-slate-100">
                {((specs?.items && specs.items.length > 0) ? specs.items : data.specs).map((item, idx) => (
                  <div key={item.id || idx} className="py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="text-slate-600 font-semibold">
                      {item.label}
                    </span>
                    <span className="text-slate-950 font-black text-right">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Factory Assurance Strip */}
              <div className="mt-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-brand-amber-600 flex-shrink-0" />
                <div className="text-xs text-amber-950 leading-snug">
                  <strong className="font-bold">{lang === 'mr' ? '१००% ओरिजिनल स्वदेशी फॅक्टरी गॅरंटी:' : lang === 'hi' ? '100% ओरिजिनल स्वदेशी फैक्टरी गारंटी:' : '100% Original Factory Guarantee:'}</strong>{' '}
                  {lang === 'mr' 
                    ? 'सर्व मशिन्सची अचूक चाचणी घेऊन डिस्पॅच केले जाते. थेट फॅक्टरी दरात कोणतेही कमिशन नाही!' 
                    : lang === 'hi'
                    ? 'सभी मशीनों की पूर्ण गुणवत्ता जांच के बाद ही डिस्पैच किया जाता है। सीधी फैक्टरी कीमत पर उपलब्ध!'
                    : 'Every machine is thoroughly quality-tested before dispatch.'}
                </div>
              </div>

              {/* Direct Quote Action Banner */}
              <div className="mt-3.5">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue-600 to-sky-600 hover:from-brand-blue-700 hover:to-sky-700 text-white font-black py-3 sm:py-3.5 px-6 rounded-2xl shadow-lg shadow-brand-blue-600/30 transition transform hover:scale-[1.01] active:scale-95 text-sm sm:text-base"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>{data.ctaBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
