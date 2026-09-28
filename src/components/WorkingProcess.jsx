import React from 'react';
import { ChefHat, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function WorkingProcess({ t, lang, onOpenQuote }) {
  const data = t.process;

  return (
    <section id="process" className="py-14 sm:py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber-50 border border-brand-amber-200 text-brand-amber-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <ChefHat className="w-4 h-4 text-brand-amber-600" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-sky-400">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-blue-100 text-brand-blue-800">
                    {lang === 'mr' ? `पायरी ${idx + 1}` : lang === 'hi' ? `चरण ${idx + 1}` : `Step ${idx + 1}`}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Supported Bestselling Products (Premium Amber/Champagne Finish) */}
        <div className="mt-12 bg-gradient-to-br from-amber-100/90 via-orange-50/75 to-amber-100/80 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto shadow-xl border-2 border-amber-300/90 relative overflow-hidden">
          {/* Subtle Ambient Glows for Depth */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full shadow-sm inline-block">
              {lang === 'mr' ? '२ प्रकारच्या रेसिपी मशीन' : lang === 'hi' ? '2-इन-1 ड्यूल रेसिपी मशीन' : 'DUAL RECIPE MACHINE'}
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-3 tracking-normal">
              {data.productsTitle}
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Box 1: Rajgira Laddu with Floating & Hover Animation */}
            <div className="animate-card-float-1 group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border-2 border-amber-300/80 shadow-md hover:shadow-2xl hover:border-amber-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-amber-200/40 before:to-transparent before:transition-transform before:duration-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300">🌾</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {lang === 'mr' ? 'उपवास स्पेशल' : lang === 'hi' ? 'व्रत स्पेशल' : 'Fasting Special'}
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 transform group-hover:scale-110 group-hover:text-emerald-500 transition-all" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                {data.prod1Name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                {data.prod1Desc}
              </p>
            </div>

            {/* Box 2: Murmura Laddu with Staggered Floating & Hover Animation */}
            <div className="animate-card-float-2 group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border-2 border-amber-300/80 shadow-md hover:shadow-2xl hover:border-amber-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-amber-200/40 before:to-transparent before:transition-transform before:duration-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300">🍯</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {lang === 'mr' ? 'सदाबहार स्नॅक' : lang === 'hi' ? 'सदाबहार स्नैक' : 'All Season Hit'}
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 transform group-hover:scale-110 group-hover:text-emerald-500 transition-all" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                {data.prod2Name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                {data.prod2Desc}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 text-center">
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
            >
              <span>{lang === 'mr' ? 'मशीनचा व्हिडिओ डेमो पाहा' : lang === 'hi' ? 'मशीन का वीडियो डेमो देखें' : 'Watch Machine Video Demo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
