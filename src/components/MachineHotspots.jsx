import React, { useState } from 'react';
import { Target, Info, Check, Sparkles, Sliders, Shield, Layers, HelpCircle } from 'lucide-react';
import machineImg from '../assets/machine-main.jpg';

export default function MachineHotspots({ t, lang }) {
  const [selectedHotspot, setSelectedHotspot] = useState(1);

  // Relative position percentages on the new machine image
  const hotspotPositions = {
    1: { top: '67%', left: '32%' }, // Control Panel (Speed & Power)
    2: { top: '52%', left: '53%' }, // SS 304 Bowl & Blades
    3: { top: '88%', left: '27%' }, // Anti-vibration feet
    4: { top: '36%', left: '91%' }, // Adjustment Lever / Side Arm
    5: { top: '18%', left: '50%' }, // Top Motor & Gear Mechanism
  };

  const currentInfo = t.anatomy.hotspots.find(h => h.id === selectedHotspot) || t.anatomy.hotspots[0];

  return (
    <section id="anatomy" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Target className="w-4 h-4 text-brand-amber-500" />
            <span>{t.anatomy.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t.anatomy.title}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.anatomy.subtitle}
          </p>
        </div>

        {/* Hotspots Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Machine Photo with Interactive Clickable Pulse Hotspots */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-lg bg-white p-4 rounded-3xl shadow-xl border border-slate-200">
              <img 
                src={machineImg} 
                alt={lang === 'hi' ? 'SWARAJ लड्डू मेकिंग मशीन विवरण' : 'SWARAJ Laddu Making Machine Specs'}
                className="w-full h-auto rounded-2xl block"
              />

              {/* Hotspot Markers */}
              {t.anatomy.hotspots.map((item) => {
                const pos = hotspotPositions[item.id] || { top: '50%', left: '50%' };
                const isSelected = selectedHotspot === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedHotspot(item.id)}
                    style={{ top: pos.top, left: pos.left }}
                    aria-label={item.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                  >
                    <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-amber-400' : 'bg-brand-blue-400'
                      }`} />
                      <span className={`relative inline-flex rounded-full h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-white text-xs font-black shadow-lg transition-transform transform ${
                        isSelected ? 'bg-brand-amber-500 scale-125 ring-4 ring-amber-200' : 'bg-brand-blue-600 group-hover:scale-110'
                      }`}>
                        {item.id}
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 bg-slate-900/90 backdrop-blur-md rounded-xl p-2 sm:p-2.5 text-white text-[11px] sm:text-xs text-center flex items-center justify-center gap-1.5 sm:gap-2">
                <Info className="w-4 h-4 text-brand-amber-400 flex-shrink-0" />
                <span>
                  {lang === 'hi' 
                    ? 'मशीन के किसी भी भाग पर या नीचे सूची पर क्लिक करके विवरण देखें' 
                    : 'Click any hotspot on the machine or the list below to inspect'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Hotspot Card & Selector List */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Active Details Box */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl border-2 border-brand-blue-500/30 relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-blue-50 text-brand-blue-700 border border-brand-blue-200">
                  {lang === 'hi' ? `भाग संख्या #${currentInfo.id}` : `Part #${currentInfo.id}`}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {currentInfo.pos}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentInfo.name}
              </h3>

              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentInfo.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <Check className="w-4 h-4" />
                <span>
                  {lang === 'hi' ? 'दीर्घायु और अत्यधिक विश्वसनीय इंजीनियरिंग' : 'Engineered for Long Life & High Reliability'}
                </span>
              </div>
            </div>

            {/* List of all hotspots for quick clicking */}
            <div className="space-y-2">
              {t.anatomy.hotspots.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedHotspot(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                    selectedHotspot === item.id
                      ? 'bg-brand-blue-600 text-white border-brand-blue-600 shadow-md font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      selectedHotspot === item.id ? 'bg-white text-brand-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.id}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className={`text-xs ${selectedHotspot === item.id ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.pos}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
