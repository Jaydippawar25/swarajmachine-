import React from 'react';
import { 
  Layers, 
  Zap, 
  CircleDot, 
  Sliders, 
  ShieldCheck, 
  BatteryCharging, 
  Hammer, 
  TrendingUp, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function Features({ t }) {
  // Mapping icons to feature IDs
  const getIcon = (id) => {
    switch (id) {
      case 'dual':
        return <Layers className="w-6 h-6 text-brand-blue-600" />;
      case 'speed':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'shape':
        return <CircleDot className="w-6 h-6 text-emerald-500" />;
      case 'control':
        return <Sliders className="w-6 h-6 text-indigo-500" />;
      case 'ss':
        return <ShieldCheck className="w-6 h-6 text-sky-500" />;
      case 'power':
        return <BatteryCharging className="w-6 h-6 text-green-500" />;
      case 'body':
        return <Hammer className="w-6 h-6 text-orange-500" />;
      case 'opportunity':
        return <TrendingUp className="w-6 h-6 text-brand-amber-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-blue-600" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-brand-amber-500" />
            <span>{t.features.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t.features.title}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.features.subtitle}
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.list.map((item, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-brand-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-blue-100/40 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getIcon(item.id)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t.features.certifiedBadge || (lang === 'hi' ? 'परीक्षित एवं प्रमाणित गुणवत्ता' : 'Tested & Certified Quality')}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
