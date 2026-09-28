import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, Save, Eye, EyeOff, Languages } from 'lucide-react';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const INITIAL_FAQS_BY_LANG = {
  en: [
    {
      id: 'faq-en-1',
      q: 'Does this machine run on normal 220V household electricity or require a commercial connection?',
      a: 'It runs 100% on standard single-phase 220V domestic wall power. You do not need any separate commercial 3-phase power line.',
      published: true,
    },
    {
      id: 'faq-en-2',
      q: 'How is laddu size and weight adjusted on the machine?',
      a: 'The machine comes with quick-change forming molds and variable speed control, allowing you to produce laddus from 20g to 50g+ with uniform shape and size.',
      published: true,
    },
    {
      id: 'faq-en-3',
      q: 'How is the machine delivered, and will there be any transit damage?',
      a: 'The entire machine is shipped in reinforced heavy-duty wooden crate packaging with transit insurance. Safe door delivery is guaranteed all across India.',
      published: true,
    },
    {
      id: 'faq-en-4',
      q: 'How easy is machine cleaning and maintenance?',
      a: 'All food-contact parts are manufactured from 100% SS 304 food-grade stainless steel. Cleaning takes just 10 minutes with warm water and a clean cloth after production.',
      published: true,
    },
    {
      id: 'faq-en-5',
      q: 'What warranty and after-sales support is provided?',
      a: 'Every machine comes with a 1-year comprehensive factory warranty and lifetime technical assistance. Genuine spare parts and video support are readily available.',
      published: true,
    }
  ],
  mr: [
    {
      id: 'faq-mr-1',
      q: 'ही मशीन घरातील 220V विजेवर चालते का की कमर्शियल वीज कनेक्शन हवे?',
      a: 'होय, ही मशीन सामान्य सिंगल-फेज (220V) घरगुती विजेवर सहज चालते. यासाठी कोणत्याही कमर्शियल 3-फेज कनेक्शनची गरज नाही.',
      published: true,
    },
    {
      id: 'faq-mr-2',
      q: 'एकाच मशीनवर राजगिरा आणि मुरमुरा दोन्ही लाडू बनवता येतात का?',
      a: 'होय, हे ड्युअल-युज मॉडेल आहे. उपवासाचे राजगिरा लाडू आणि कुरकुरीत गोड मुरमुरा लाडू दोन्ही सहज बनतात.',
      published: true,
    },
    {
      id: 'faq-mr-3',
      q: 'मशीन चालवण्याचे ट्रेनिंग कसे दिले जाते?',
      a: 'मशीन चालवणे अत्यंत सोपे आहे. आम्ही सविस्तर व्हिडिओ मॅन्युअल आणि थेट व्हिडिओ कॉल सपोर्ट देतो. ५ मिनिटांत कोणीही ऑपरेटर मशीन हाताळू शकतो.',
      published: true,
    },
    {
      id: 'faq-mr-4',
      q: 'गावात किंवा शहरात मशीनची डिलिव्हरी कशी होणार?',
      a: 'आम्ही संपूर्ण महाराष्ट्र आणि भारतभर सुरक्षित ट्रान्सपोर्टने डिलिव्हरी करतो. मशीन सुरक्षित हेवी-ड्यूटी लाकडी क्रेटमध्ये पॅक केलेली असते.',
      published: true,
    },
    {
      id: 'faq-mr-5',
      q: 'वॉरंटी आणि मेंटेनन्स सपोर्ट काय आहे?',
      a: 'मशीनवर १ वर्षाची वॉरंटी आणि लाइफटाइम तांत्रिक सहकार्य मिळते. स्पेअर पार्ट्स नेहमी उपलब्ध असतात.',
      published: true,
    }
  ],
  hi: [
    {
      id: 'faq-hi-1',
      q: 'क्या यह मशीन घरेलू 220V बिजली पर काम करती है या कमर्शियल कनेक्शन चाहिए?',
      a: 'यह 100% घरेलू 220V सिंगल-फेज सामान्य बिजली कनेक्शन पर आसानी से चलती है। इसके लिए किसी अलग कमर्शियल 3-फेज कनेक्शन की कोई आवश्यकता नहीं है।',
      published: true,
    },
    {
      id: 'faq-hi-2',
      q: 'लड्डू का वजन और साइज कैसे सेट किया जाता है?',
      a: 'मशीन में आसान मोल्ड और गति नियंत्रण दिया गया है जिससे आप 20 ग्राम से लेकर 50+ ग्राम तक के मनचाहे आकार और वजन के लड्डू बना सकते हैं।',
      published: true,
    },
    {
      id: 'faq-hi-3',
      q: 'मशीन की डिलीवरी कैसे होती है और ट्रांसपोर्ट में कोई नुकसान तो नहीं होगा?',
      a: 'पूरी मशीन हेवी-ड्यूटी वुडन क्रेट पैकिंग में ट्रांसपोर्ट होती है। पूरे भारत में सुरक्षित डोर डिलीवरी की जाती है।',
      published: true,
    },
    {
      id: 'faq-hi-4',
      q: 'मशीन की सफाई और मेंटेनेंस कितना आसान है?',
      a: 'फूड संपर्क के सभी पार्ट्स 100% SS 304 फूड-ग्रेड स्टेनलेस स्टील के हैं। काम खत्म होने के बाद 10 मिनट में आसानी से गर्म पानी और कपड़े से साफ हो जाती है।',
      published: true,
    },
    {
      id: 'faq-hi-5',
      q: 'वारंटी और आफ्टर-सेल्स सपोर्ट क्या मिलता है?',
      a: 'प्रत्येक मशीन पर 1 वर्ष की पूरी फैक्टरी वारंटी और लाइफटाइम तकनीकी सहायता मिलती है। स्पेयर पार्ट्स आसानी से उपलब्ध रहते हैं।',
      published: true,
    }
  ]
};

export default function FaqManager() {
  const { user, at, adminLang } = useAuth();
  const [activeLang, setActiveLang] = useState(adminLang || 'en');
  const [allFaqs, setAllFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem('swaraj_faqs_by_lang');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_FAQS_BY_LANG;
  });

  // Sync active language with global admin language if user toggles in navbar
  useEffect(() => {
    if (adminLang && allFaqs[adminLang]) {
      setActiveLang(adminLang);
    }
  }, [adminLang]);

  const currentFaqs = allFaqs[activeLang] || allFaqs.en || [];

  const handleFaqChange = (id, field, value) => {
    setAllFaqs(prev => ({
      ...prev,
      [activeLang]: (prev[activeLang] || []).map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const handleAdd = () => {
    const newFaq = {
      id: `faq-${activeLang}-${Date.now()}`,
      q: activeLang === 'mr' ? 'नवीन प्रश्न येथे लिहा...' : activeLang === 'hi' ? 'नया प्रश्न यहाँ लिखें...' : 'Type new question in English here...',
      a: activeLang === 'mr' ? 'सविस्तर उत्तर येथे लिहा...' : activeLang === 'hi' ? 'विस्तृत उत्तर यहाँ लिखें...' : 'Type detailed answer in English here...',
      published: true,
    };
    setAllFaqs(prev => ({
      ...prev,
      [activeLang]: [newFaq, ...(prev[activeLang] || [])]
    }));
  };

  const handleTogglePublish = (id) => {
    setAllFaqs(prev => ({
      ...prev,
      [activeLang]: (prev[activeLang] || []).map(f => f.id === id ? { ...f, published: !f.published } : f)
    }));
  };

  const handleDelete = (id) => {
    const confirmMsg = activeLang === 'mr' 
      ? 'हा प्रश्न हटवायचा आहे का?' 
      : activeLang === 'hi' 
      ? 'क्या यह प्रश्न हटाना चाहते हैं?' 
      : 'Delete this FAQ?';
    if (confirm(confirmMsg)) {
      setAllFaqs(prev => ({
        ...prev,
        [activeLang]: (prev[activeLang] || []).filter(f => f.id !== id)
      }));
      toast.success(activeLang === 'mr' ? 'प्रश्न हटवला' : activeLang === 'hi' ? 'प्रश्न हटा दिया गया' : 'FAQ deleted');
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem('swaraj_faqs_by_lang', JSON.stringify(allFaqs));
      await activityService.log('faq_update', `Updated ${currentFaqs.length} ${activeLang.toUpperCase()} FAQs`, user);
      toast.success(
        activeLang === 'mr' 
          ? 'प्रश्न यशस्वीरीत्या सेव्ह झाले!' 
          : activeLang === 'hi' 
          ? 'प्रश्न सफलतापूर्वक सेव हुए!' 
          : 'English FAQs saved and published successfully!'
      );
    } catch (e) {
      toast.error('Failed to save FAQs');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand-blue-700" />
            <span>{at.faqsTitle || 'Frequently Asked Questions (FAQ)'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.faqsSubtitle || 'Manage questions and answers displayed in the public FAQ section.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{at.addFaq || 'Add FAQ'}</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{at.saveFaqs || 'Save FAQs'}</span>
          </button>
        </div>
      </div>

      {/* Language Switcher Tabs for FAQs */}
      <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs max-w-md">
        <button
          type="button"
          onClick={() => setActiveLang('en')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeLang === 'en' 
              ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🇬🇧 English</span>
          <span className="text-[10px] opacity-75">({(allFaqs.en || []).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLang('mr')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeLang === 'mr' 
              ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>मराठी</span>
          <span className="text-[10px] opacity-75">({(allFaqs.mr || []).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLang('hi')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeLang === 'hi' 
              ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>हिंदी</span>
          <span className="text-[10px] opacity-75">({(allFaqs.hi || []).length})</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {currentFaqs.map((faq, idx) => (
          <div key={faq.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => handleFaqChange(faq.id, 'q', e.target.value)}
                  placeholder={activeLang === 'mr' ? 'प्रश्नाचा मजकूर...' : activeLang === 'hi' ? 'प्रश्न का पाठ...' : 'Question text in English...'}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(faq.id)}
                  className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    faq.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                  }`}
                  title={faq.published ? (activeLang === 'mr' ? 'प्रकाशित' : 'Published') : (activeLang === 'mr' ? 'लपवलेले' : 'Hidden')}
                >
                  {faq.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <textarea
                rows={2}
                value={faq.a}
                onChange={(e) => handleFaqChange(faq.id, 'a', e.target.value)}
                placeholder={activeLang === 'mr' ? 'उत्तराचा मजकूर...' : activeLang === 'hi' ? 'उत्तर का पाठ...' : 'Answer text in English...'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
