import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, Scale, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Comparison({ t, lang, onOpenQuote }) {
  const data = t.comparison;

  return (
    <section id="comparison" className="py-14 sm:py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Scale className="w-4 h-4 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto pt-2">
          
          {/* Card 1: Traditional Manual Hand Rolling (Clean Neutral Slate with Muted Warning) */}
          <div className="relative rounded-3xl p-5 sm:p-7 border border-slate-300 bg-slate-50 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {data.manualTitle}
                    </h3>
                    <span className="text-xs font-semibold text-rose-600">
                      {lang === 'mr' ? 'कमी वेग • जास्त खर्च' : lang === 'hi' ? 'धीमी गति • भारी लागत' : 'Low Speed • High Cost'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 border border-slate-300">
                  {lang === 'mr' ? '१२०-१५० लाडू/तास' : lang === 'hi' ? '120-150 लड्डू/घंटा' : '120-150 pcs/hr'}
                </span>
              </div>

              {/* Points */}
              <div className="space-y-3">
                {data.manualPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200">
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-slate-600 text-center">
              {lang === 'mr' 
                ? '❌ तोटा: कामाचा ताण, सणासुदीला कारागीर न मिळणे आणि नफ्यात मोठे नुकसान.' 
                : lang === 'hi'
                ? '❌ नुकसान: अत्यधिक थकान, त्योहारों पर कारीगरों की कमी और मुनाफे का बड़ा नुकसान।'
                : '❌ Consequence: Heavy fatigue, worker shortage during festivals, and lost profit.'}
            </div>
          </div>

          {/* Card 2: SWARAJ Machine Automation (Professional Brand Blue Theme - No Text Cropping) */}
          <div className="relative rounded-3xl p-5 sm:p-7 border-2 border-brand-blue-600 bg-white flex flex-col justify-between shadow-xl shadow-brand-blue-600/10 hover:shadow-2xl hover:shadow-brand-blue-600/15 transition-all duration-300 group">
            {/* Fully visible top badge without overflow clipping */}
            <div className="absolute -top-3.5 right-6 bg-brand-blue-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md border border-brand-blue-500 z-20">
              {lang === 'mr' ? 'व्यवसायासाठी सर्वोत्तम' : lang === 'hi' ? 'व्यापार के लिए सर्वोत्तम' : 'RECOMMENDED FOR BUSINESS'}
            </div>

            {/* Subtle inner hover shimmer safely contained */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-brand-blue-50/50 to-transparent transition-transform duration-1000" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-blue-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-blue-50 text-brand-blue-600 border border-brand-blue-200 flex items-center justify-center font-bold flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {data.machineTitle}
                    </h3>
                    <span className="text-xs font-bold text-brand-blue-600">
                      {lang === 'mr' ? '१० पट वेग • भरघोस नफा' : lang === 'hi' ? '10 गुना तेज गति • बंपर मुनाफा' : '10x Faster • Huge Margins'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-black px-3 py-1 rounded-full bg-brand-blue-600 text-white shadow-xs">
                  {lang === 'mr' ? '१०००+ लाडू/तास' : lang === 'hi' ? '1000+ लड्डू/घंटा' : '1000+ pcs/hr'}
                </span>
              </div>

              {/* Points */}
              <div className="space-y-3">
                {data.machinePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-blue-50/40 border border-brand-blue-100 hover:border-brand-blue-300 shadow-xs hover:shadow-sm transition-all duration-200">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div className="relative z-10 mt-6 pt-4 border-t border-brand-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-800 text-center sm:text-left">
                {lang === 'mr' ? 'दरमहा सरासरी बचत: ₹३०,००० ते ₹४०,०००' : lang === 'hi' ? 'औसत मासिक बचत: ₹30,000 से ₹40,000' : 'Average Monthly Savings: ₹30,000 - ₹40,000'}
              </div>
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-brand-blue-600 hover:bg-brand-blue-700 active:scale-95 text-white font-black px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>{lang === 'mr' ? 'कोटेशन मिळवा' : lang === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Commercial Payback Callout Banner */}
        <div className="mt-10 sm:mt-12 bg-slate-900 border border-slate-800 text-amber-300 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center max-w-4xl mx-auto shadow-md font-bold text-xs sm:text-base">
          {data.bottomCallout}
        </div>

      </div>
    </section>
  );
}
