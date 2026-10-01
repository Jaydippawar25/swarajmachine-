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
                  <span className="text-3xl sm:text-4xl font-black text-brand-blue-600">
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

        {/* 2 Supported Bestselling Products (Clean Professional Gray Theme) */}
        <div className="mt-12 bg-slate-100 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto shadow-sm border border-slate-300 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-300 px-4 py-1.5 rounded-full shadow-xs inline-block">
              {lang === 'mr' ? '२ प्रकारच्या रेसिपी मशीन' : lang === 'hi' ? '2-इन-1 ड्यूल रेसिपी मशीन' : 'DUAL RECIPE MACHINE'}
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-3 tracking-normal">
              {data.productsTitle}
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Box 1: Rajgira Laddu */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🌾</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    {lang === 'mr' ? 'उपवास स्पेशल' : lang === 'hi' ? 'व्रत स्पेशल' : 'Fasting Special'}
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-brand-blue-600 transition-colors">
                {data.prod1Name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                {data.prod1Desc}
              </p>
            </div>

            {/* Box 2: Murmura Laddu */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🍯</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    {lang === 'mr' ? 'सदाबहार स्नॅक' : lang === 'hi' ? 'सदाबहार स्नैक' : 'All Season Hit'}
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-brand-blue-600 transition-colors">
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
              className="inline-flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-blue-600/25 transition transform hover:scale-105 active:scale-95 text-xs sm:text-sm cursor-pointer"
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
