import React from 'react';
import { MessageSquareQuote, Star, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials({ testimonials = [], lang = 'hi' }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-14 sm:py-20 relative border-b border-slate-200/80 bg-white/75 backdrop-blur-[1px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-4 h-4 text-brand-amber-500" />
            <span>
              {lang === 'mr' ? 'ग्राहक यशोगाथा व अभिप्राय' : lang === 'hi' ? 'ग्राहक समीक्षा व सफलता की कहानियां' : 'Customer Stories & Reviews'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'mr' ? 'आमच्या समाधानी ग्राहकांचे अनुभव' : lang === 'hi' ? 'हमारे संतुष्ट ग्राहकों के वास्तविक अनुभव' : 'Verified Customer Testimonials'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            {lang === 'mr' 
              ? 'बचत गट, मिठाई व्यावसायिक आणि नवउद्योजकांनी स्वराज्य मशीन वापरून व्यवसायात केलेली प्रगती.' 
              : lang === 'hi'
              ? 'महिला स्वयं सहायता समूह व मिठाई दुकानदारों की सच्ची ज़ुबानी।'
              : 'Real feedback from businesses scaling production with Swaraj Laddu Making Machine.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-amber-200/50 -scale-x-100 pointer-events-none" />

              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.businessType || (lang === 'mr' ? 'पडताळणीकृत' : 'Verified')}</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-black flex items-center justify-center text-sm">
                  {item.name ? item.name.charAt(0) : 'S'}
                </div>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-brand-blue-700 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
