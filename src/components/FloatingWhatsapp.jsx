import React from 'react';
import { PhoneCall } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsapp({ t, lang, onOpenQuote, settings }) {
  const phone = settings?.phone || t.nav.phone;
  const whatsappNumber = settings?.whatsappNumber || t.nav.whatsappNumber;

  const handleChat = () => {
    // Open lead capture form before redirecting to WhatsApp
    if (onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-3">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/60 text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-2xl flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === 'mr' ? 'WhatsApp वर थेट बोला' : lang === 'hi' ? 'WhatsApp पर सीधी बात करें' : 'Chat on WhatsApp'}</span>
        </div>

        <button
          type="button"
          onClick={handleChat}
          aria-label="Contact on WhatsApp"
          className="relative bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
          <WhatsAppIcon className="w-7 h-7 relative z-10 fill-white" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center gap-2">
        <a
          href={`tel:${phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white py-2.5 px-3 rounded-xl font-bold text-xs"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.nav.callUs}</span>
        </a>

        <button
          type="button"
          onClick={handleChat}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 px-3 rounded-xl font-bold text-xs shadow-md"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={onOpenQuote}
          className="flex-1 inline-flex items-center justify-center gap-1 bg-brand-blue-600 text-white py-2.5 px-2 rounded-xl font-black text-xs shadow-md"
        >
          <span>{lang === 'en' ? 'Quote' : 'कोटेशन'}</span>
        </button>
      </div>
    </>
  );
}
