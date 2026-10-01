import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, X, Download } from 'lucide-react';
import poster1 from '../assets/comparison-poster.jpg';
import poster2 from '../assets/features-poster.jpg';
import machineShot from '../assets/machine-laddu-tray.jpg';
import WhatsAppIcon from './WhatsAppIcon';

export default function BrochureGallery({ t, lang, brochures, settings }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const data = t.brochures;

  const whatsappNumber = settings?.whatsappNumber || t.nav.whatsappNumber;

  const defaultItems = [
    {
      id: 1,
      src: poster1,
      title: data.card1Title,
    },
    {
      id: 2,
      src: poster2,
      title: data.card2Title,
    },
    {
      id: 3,
      src: machineShot,
      title: data.card3Title,
    }
  ];

  const getThumb = (item, idx) => {
    if (item.thumb) return item.thumb;
    if (item.thumbType === 'features' || idx === 1) return poster2;
    if (idx === 2) return machineShot;
    return poster1;
  };

  const dynamicItems = (brochures?.items && brochures.items.length > 0)
    ? brochures.items.map((item, idx) => ({
        id: item.id || idx,
        src: getThumb(item, idx),
        title: item.title,
        desc: item.desc,
        size: item.size
      }))
    : defaultItems;

  const handleWhatsappBrochure = (title) => {
    let text = '';
    if (brochures?.whatsappTemplate) {
      text = `${brochures.whatsappTemplate} (${title})`;
    } else {
      text = lang === 'mr'
        ? `नमस्कार, मला Swaraj Machinery च्या "${title}" चे ब्रोशर PDF आणि दर पाठवा.`
        : `नमस्ते, मुझे Swaraj Machinery के "${title}" का ब्रोशर PDF और रेट भेजिए।`;
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="brochures" className="py-14 sm:py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <ImageIcon className="w-4 h-4 text-brand-amber-500" />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {dynamicItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div 
                onClick={() => setSelectedImg(item)}
                className="relative aspect-[3/4] overflow-hidden bg-slate-200 cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                  <ZoomIn className="w-5 h-5" />
                  <span>{data.clickEnlarge}</span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-2 bg-white border-t border-slate-100">
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {item.title}
                </span>
                <button
                  type="button"
                  onClick={() => handleWhatsappBrochure(item.title)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex-shrink-0"
                  title="Request PDF on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-y-auto max-h-[88vh]">
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
