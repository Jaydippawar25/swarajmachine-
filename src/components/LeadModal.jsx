import React, { useState } from 'react';
import { X, User, MapPin, Building2, ChevronDown, ArrowRight, Lock, CheckCircle2, FileText } from 'lucide-react';
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
      // Allow but skip duplicate warning
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-slate-900/20 border border-slate-200 relative max-h-[92vh] overflow-y-auto"
      >
        {/* Clean Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Unified Professional Header Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-700 bg-brand-blue-50 border border-brand-blue-200/80 px-3 py-1 rounded-full mb-3 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-brand-blue-600" />
              <span>{lang === 'mr' ? 'थेट फॅक्टरी कोटेशन' : lang === 'hi' ? 'सीधा फैक्टरी कोटेशन' : 'Direct Factory Quotation'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
              {t.modal.title}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {lang === 'mr'
                ? 'खालील माहिती भरा, सबमिट करताच त्वरित WhatsApp वर कोटेशन आणि व्हिडिओ डेमो मिळेल:'
                : lang === 'hi'
                ? 'नीचे अपनी जानकारी भरें, सबमिट करते ही सीधे WhatsApp पर कोटेशन और वीडियो डेमो मिलेगा:'
                : 'Fill in your details below to instantly receive quotation & video demo on WhatsApp:'}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.modal.nameLabel}
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder={t.modal.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-brand-blue-600 focus:bg-white focus:ring-3 focus:ring-brand-blue-500/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.modal.phoneLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-slate-500 select-none pr-2 border-r border-slate-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder={t.modal.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full pl-14 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-brand-blue-600 focus:bg-white focus:ring-3 focus:ring-brand-blue-500/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition tracking-wide"
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.modal.cityLabel}
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder={t.modal.cityPlaceholder}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-brand-blue-600 focus:bg-white focus:ring-3 focus:ring-brand-blue-500/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Purpose Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.modal.purposeLabel}
                </label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-brand-blue-600 focus:bg-white focus:ring-3 focus:ring-brand-blue-500/10 text-sm font-medium text-slate-900 outline-none transition appearance-none cursor-pointer"
                  >
                    {t.modal.purposeOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Unified Primary Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 active:scale-[0.98] text-white font-black py-3.5 px-4 rounded-xl shadow-lg shadow-brand-blue-600/25 transition-all text-sm cursor-pointer"
                >
                  <span>
                    {lang === 'mr' 
                      ? 'कोटेशन व व्हिडिओ WhatsApp वर मिळवा' 
                      : lang === 'hi' 
                      ? 'कोटेशन व वीडियो WhatsApp पर पाएं' 
                      : 'Get Quotation & Video on WhatsApp'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reassuring Single-Tone Trust Footer */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-medium text-slate-600">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {lang === 'mr' 
                    ? '१००% मोफत कोटेशन • तुमची माहिती सुरक्षित राहील' 
                    : lang === 'hi' 
                    ? '100% नि:शुल्क कोटेशन • आपकी जानकारी सुरक्षित है' 
                    : '100% Free Quote • Your information is strictly confidential'}
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 text-brand-blue-600 border border-brand-blue-200 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              {t.modal.successTitle}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
              {t.modal.successDesc}
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
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
