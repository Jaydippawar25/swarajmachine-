import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function Faq({ t }) {
  const [openIndex, setOpenIndex] = useState(0);
  const data = t.faq;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {data.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {data.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition overflow-hidden ${
                  isOpen
                    ? 'border-brand-blue-400 bg-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-bold text-slate-900"
                >
                  <span className="text-xs sm:text-base flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-brand-blue-100 text-brand-blue-700 text-[11px] font-black flex items-center justify-center flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      isOpen ? 'transform rotate-180 text-brand-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <div className="pl-8 sm:pl-9">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
