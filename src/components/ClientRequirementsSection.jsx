import React from 'react';
import { CheckCircle2, Sparkles, Quote, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ClientRequirementsSection({ t, onOpenQuote }) {
  const data = t.clientRequirements;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-sky-50/50 to-white relative overflow-hidden border-y border-slate-100">
      {/* Background ambient blurs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-brand-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Prominent Golden Client Quote Banner */}
        <div className="relative mb-12 sm:mb-16 bg-gradient-to-r from-brand-amber-500 via-amber-500 to-brand-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-xl shadow-brand-amber-500/20 text-slate-950 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute -top-6 -right-6 text-white/20 pointer-events-none">
            <Quote className="w-24 h-24 sm:w-36 sm:h-36" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-md">
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-slate-950" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-300 mb-1.5 sm:mb-2">
                {data.quoteBadge || "CLIENT STATEMENT"}
              </span>
              <p className="text-base sm:text-2xl font-black leading-snug tracking-tight text-slate-950">
                {data.quoteBanner}
              </p>
            </div>
          </div>
        </div>

        {/* Section Header with Exact Introduction Paragraph */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>

          <p className="text-base sm:text-lg font-semibold text-brand-blue-600 mt-2">
            {data.subtitle}
          </p>

          {/* Exact Verbatim Paragraph */}
          <div className="mt-6 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-brand-blue-100 shadow-sm relative text-left">
            <p className="text-slate-700 text-sm sm:text-lg leading-relaxed font-medium">
              {data.introParagraph}
            </p>
          </div>
        </div>

        {/* The Exact 9 Key Features Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-blue-600 inline-block"></span>
              <span>{data.keyFeaturesTitle}</span>
              <span className="w-3 h-3 rounded-full bg-brand-amber-500 inline-block"></span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {data.keyFeatures.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brand-blue-400 transition-all duration-300 flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-brand-blue-600 bg-brand-blue-50 px-2 py-0.5 rounded mb-1">
                    {item.highlight}
                  </span>
                  <p className="text-xs sm:text-base font-bold text-slate-800 leading-snug group-hover:text-slate-950">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action Bottom Banner */}
        <div className="bg-slate-900 rounded-2xl p-5 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-2xl font-bold">
              {data.ctaTitle}
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {data.ctaSubtitle}
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue-500 to-sky-500 hover:from-brand-blue-600 hover:to-sky-600 text-white font-black px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
          >
            <span>{data.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
