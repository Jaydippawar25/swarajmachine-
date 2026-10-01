import React from 'react';
import { Users, Store, Briefcase, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function TargetAudience({ t, lang, onOpenQuote }) {
  const data = t.audience;

  const icons = [
    <Users className="w-6 h-6 text-brand-blue-600" />,
    <Store className="w-6 h-6 text-brand-blue-600" />,
    <Briefcase className="w-6 h-6 text-brand-blue-600" />,
    <Sparkles className="w-6 h-6 text-brand-blue-600" />
  ];

  return (
    <section id="benefits" className="py-14 sm:py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* 4 Animated Clean Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.items.map((item, idx) => {
            const theme = {
              borderHover: 'hover:border-brand-blue-400',
              iconBg: 'bg-brand-blue-50 border-brand-blue-200 text-brand-blue-700',
              accent: 'bg-brand-blue-600',
              glow: 'hover:shadow-brand-blue-500/10'
            };

            return (
              <div
                key={idx}
                onClick={onOpenQuote}
                className={`relative overflow-hidden bg-white rounded-3xl p-6 border-2 border-slate-200/90 shadow-sm hover:shadow-2xl ${theme.borderHover} ${theme.glow} hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent before:transition-transform before:duration-700`}
              >
                {/* Top Subtle Animated Accent Bar */}
                <div className={`h-1.5 w-12 rounded-full ${theme.accent} group-hover:w-full transition-all duration-500 mb-4`} />

                <div>
                  <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} border flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs`}>
                    {icons[idx % icons.length]}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Check className="w-3.5 h-3.5" /> 
                    {lang === 'mr' ? '१००% योग्य' : lang === 'hi' ? '100% उपयुक्त' : '100% Fit'}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote();
                    }}
                    className="text-xs font-black text-brand-blue-600 group-hover:text-brand-blue-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{lang === 'mr' ? 'माहिती घ्या' : lang === 'hi' ? 'पूछताछ करें' : 'Inquire'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
