import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import confetti from 'canvas-confetti';
import { leadService } from '../admin/services/leadService';

export default function LeadModal({ isOpen, onClose, t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    purpose: t.modal.purposeOptions[0]
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot spam check
    if (honeypot) {
      console.warn('Spam detected via honeypot');
      onClose();
      return;
    }

    // 2. Validate 10-digit mobile number
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert(lang === 'mr' ? 'कृपया योग्य १० अंकी मोबाईल नंबर टाका.' : lang === 'hi' ? 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // 3. Rate limit check (30 seconds)
    const lastSub = localStorage.getItem('swaraj_last_lead_sub');
    if (lastSub && Date.now() - parseInt(lastSub, 10) < 30000) {
      // Allow but skip duplicate warning to not confuse genuine customer
    } else {
      localStorage.setItem('swaraj_last_lead_sub', Date.now().toString());
    }

    // 4. Save Lead to CRM / Firestore (Never blocks WhatsApp)
    try {
      let bType = 'startup';
      const pLower = (formData.purpose || '').toLowerCase();
      if (pLower.includes('shg') || pLower.includes('बचत') || pLower.includes('समूह')) {
        bType = 'shg';
      } else if (pLower.includes('मिठाई') || pLower.includes('दुकान') || pLower.includes('sweet')) {
        bType = 'sweet_shop';
      }

      await leadService.saveLead({
        name: formData.name,
        mobile: formData.phone,
        city: formData.city,
        state: 'India',
        businessType: bType,
        language: lang,
        source: 'WhatsApp Lead Form',
        notes: `Purpose: ${formData.purpose}`
      });
    } catch (err) {
      console.warn('Failed to record lead in CRM, proceeding to WhatsApp:', err);
    }

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    const whatsappNumber = t?.nav?.whatsappNumber || '917447271253';

    const msg = lang === 'mr'
      ? `*नमस्कार Swaraj Machinery,*\n\nमला राजगिरा आणि मुरमुरा लाडू मेकिंग मशीनबद्दल माहिती व फॅक्टरी कोटेशन हवे आहे.\n\n👤 *नाव:* ${formData.name}\n📱 *मोबाईल:* ${formData.phone}\n📍 *गाव/शहर:* ${formData.city}\n💼 *व्यवसाय प्रकार:* ${formData.purpose}\n\nकृपया मला थेट फॅक्टरी किंमत, सवलत आणि व्हिडिओ डेमो पाठवा.`
      : lang === 'hi'
      ? `*नमस्ते Swaraj Machinery,*\n\nमुझे राजगिरा और मुरमुरा लड्डू मेकिंग मशीन की जानकारी और फैक्टरी कोटेशन चाहिए।\n\n👤 *नाम:* ${formData.name}\n📱 *फ़ोन:* ${formData.phone}\n📍 *शहर/गाँव:* ${formData.city}\n💼 *व्यावसायिक उद्देश्य:* ${formData.purpose}\n\nकृपया मुझे सीधी फैक्टरी कीमत और वीडियो डेमो भेजें।`
      : `*Hello Swaraj Machinery,*\n\nI need information and factory quote for the Laddu Making Machine.\n\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📍 *City:* ${formData.city}\n💼 *Setup:* ${formData.purpose}\n\nPlease share official factory price quote and demo video.`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue-600 to-amber-500" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit mb-2 shadow-xs">
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
              <span>{lang === 'mr' ? 'थेट WhatsApp कोटेशन व डेमो' : lang === 'hi' ? 'सीधा WhatsApp कोटेशन व डेमो' : 'Direct WhatsApp Quote & Demo'}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              {t.modal.title}
            </h3>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              {lang === 'mr'
                ? 'खालील साधी माहिती भरा, सबमिट करताच थेट WhatsApp वर संपूर्ण माहिती व व्हिडिओ मिळेल.'
                : lang === 'hi'
                ? 'कृपया नीचे दी गई जानकारी भरें, सबमिट करते ही सीधे WhatsApp पर कोटेशन व वीडियो मिलेगा।'
                : 'Fill this quick form to instantly receive official pricing & demo video on WhatsApp.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Invisible spam prevention honeypot */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
              />
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue-500 text-sm font-medium outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal.phoneLabel} (१० अंकी) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder={t.modal.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue-500 text-sm font-medium outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal.cityLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.cityPlaceholder}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue-500 text-sm font-medium outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal.purposeLabel}
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue-500 text-sm font-medium outline-none transition bg-white"
                >
                  {t.modal.purposeOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>
                    {lang === 'mr' 
                      ? 'सबमिट करा व WhatsApp सुरू करा' 
                      : lang === 'hi' 
                      ? 'सबमिट करें और WhatsApp शुरू करें' 
                      : 'Submit & Open WhatsApp'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              {t.modal.successTitle}
            </h3>
            <p className="text-slate-600 text-xs max-w-xs mx-auto leading-relaxed">
              {t.modal.successDesc}
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs hover:bg-slate-800 transition"
              >
                {lang === 'mr' ? 'बंद करा (Close)' : lang === 'hi' ? 'बंद करें (Close)' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
