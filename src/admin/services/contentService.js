import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { translations } from '../../data/translations';

const LOCAL_CONTENT_KEY = 'swaraj_site_content';
const LOCAL_SETTINGS_KEY = 'swaraj_site_settings';
const LOCAL_FAQS_KEY = 'swaraj_faqs_by_lang';
const LOCAL_BROCHURES_KEY = 'swaraj_site_brochures';
const LOCAL_TESTIMONIALS_KEY = 'swaraj_site_testimonials';
const LOCAL_CALCULATOR_KEY = 'swaraj_calculator_settings';
const LOCAL_OFFERS_KEY = 'swaraj_site_offers';
const LOCAL_SPECS_KEY = 'swaraj_site_specs';

function notifyUpdate(type, data) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swaraj_content_updated', { detail: { type, data } }));
  }
}

export const defaultSettings = {
  phone: '+91 94034 54653',
  whatsappNumber: '919403454653',
  email: 'mkenterprises2325@gmail.com',
  notificationEmail: 'mkenterprises2325@gmail.com',
  address: 'Swaraj Machinery Works, MIDC Industrial Area, Shiroli, Kolhapur, Maharashtra - 416122',
  googleMapsUrl: 'https://maps.google.com',
  maintenanceMode: false,
  sections: {
    hero: true,
    showcase: true,
    comparison: true,
    calculator: true,
    process: true,
    targetAudience: true,
    brochures: true,
    testimonials: true,
    faq: true,
  },
  seo: {
    title: "Swaraj Machinery's - Commercial Rajgira & Murmura Laddu Making Machine",
    description: "Automatic Commercial Rajgira and Murmura Laddu Making Machine with 1000+ laddus/hour capacity. 100% SS 304 food-grade stainless steel with 1-year warranty.",
    keywords: "laddu machine, rajgira laddu making machine, murmura laddu machine, bachat gat business, swaraj machinery",
    googleAnalyticsId: "",
    metaPixelId: ""
  }
};

export const defaultCalculatorSettings = {
  minProduction: 500,
  maxProduction: 5000,
  stepProduction: 250,
  defaultProduction: 1500,
  minMargin: 0.5,
  maxMargin: 3.0,
  stepMargin: 0.1,
  defaultMargin: 1.2,
  monthlyLaborSavings: 30000,
  machineCostForPayback: 185000,
  workingDaysPerMonth: 26
};

export const defaultOffers = {
  enabled: true,
  prefix: 'धमाका ऑफर:',
  offerText: 'महिला स्वयं सहायता समूह (SHG) व नए उद्यमियों के लिए सीधी फैक्टरी छूट!',
  ctaText: 'ऑफर रेट पाएं',
  discountPercent: '15% Factory Discount',
  hasExpiry: false,
  expiryDate: '2026-10-31T23:59',
  byLang: {
    hi: {
      prefix: 'धमाका ऑफर:',
      offerText: 'महिला स्वयं सहायता समूह (SHG) व नए उद्यमियों के लिए सीधी फैक्टरी छूट!',
      ctaText: 'ऑफर रेट पाएं'
    },
    mr: {
      prefix: 'धमाका ऑफर:',
      offerText: 'महिला बचत गट व नवीन उद्योजकांसाठी थेट फॅक्टरी डिस्काउंट!',
      ctaText: 'ऑफर रेट मिळवा'
    },
    en: {
      prefix: 'SPECIAL OFFER:',
      offerText: 'Direct factory discount for Self-Help Groups and new food entrepreneurs!',
      ctaText: 'Claim Offer Rate'
    }
  }
};

export const defaultSpecs = {
  priceDisplay: '₹1,85,000',
  priceOnRequest: false,
  items: [
    { id: 'spec-1', label: 'उत्पादन क्षमता (Speed)', val: '800 से 1200+ लड्डू प्रति घंटा' },
    { id: 'spec-2', label: 'उपयुक्त लड्डू प्रकार', val: 'राजगिरा, मुरमुरा (लाई), तिल-गुड़ लड्डू' },
    { id: 'spec-3', label: 'बिजली कनेक्शन (Power)', val: '220V सिंगल फेज (घरेलू सामान्य बिजली)' },
    { id: 'spec-4', label: 'फूड संपर्क पार्ट्स', val: '100% SS 304 फूड-ग्रेड स्टेनलेस स्टील' },
    { id: 'spec-5', label: 'ऑपरेटर की आवश्यकता', val: 'केवल 1 ऑपरेटर (आसान स्पीड कंट्रोल)' },
    { id: 'spec-6', label: 'दैनिक बिजली खर्च', val: 'मात्र ₹8 - ₹12 प्रति दिन' },
    { id: 'spec-7', label: 'डिलीवरी व ट्रेनिंग', val: 'अखिल भारतीय ट्रांसपोर्ट + वीडियो डेमो गाइड' },
    { id: 'spec-8', label: 'वारंटी सपोर्ट', val: '1 वर्ष की वारंटी + लाइफटाइम सपोर्ट' }
  ]
};

export const defaultBrochures = {
  whatsappTemplate: 'नमस्कार Swaraj Machinery, मला राजगिरा आणि मुरमुरा लाडू मेकिंग मशीनचे संपूर्ण पीडीएफ ब्रोशर आणि फॅक्टरी रेट्स पाठवा.',
  items: [
    {
      id: 'brochure-1',
      title: 'Swaraj Automatic Laddu Machine Technical Catalog',
      desc: 'Complete specifications, power load, dimensions, and output speed.',
      thumbType: 'comparison',
      pdfUrl: '#',
      size: '2.4 MB'
    },
    {
      id: 'brochure-2',
      title: 'Commercial Business Comparison & ROI Guide',
      desc: 'Manual labor cost analysis and government subsidy details (PMEGP/Mudra).',
      thumbType: 'features',
      pdfUrl: '#',
      size: '1.8 MB'
    }
  ]
};

export const defaultFaqsByLang = {
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

export const defaultTestimonials = [
  {
    id: 'test-1',
    name: 'Savitri Mahila Bachat Gat',
    city: 'Kolhapur, Maharashtra',
    text: 'आमच्या बचत गटाने स्वराज्य मशीन घेतल्यानंतर राजगिरा लाडू उत्पादन तिप्पट झाले. सणासुदीला सर्व ऑर्डर्स वेळेवर पूर्ण होतात.',
    rating: 5,
    businessType: 'Bachat Gat',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Shree Krishna Sweets & Snacks',
    city: 'Indore, MP',
    text: 'मशीन का आकार एकदम कॉम्पॅक्ट है और सिंगल फेज लाइट पर आराम से चलती है। 1 आदमी पूरा काम संभाल लेता है।',
    rating: 5,
    businessType: 'Sweet Shop',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Mauli Food Products',
    city: 'Pune, Maharashtra',
    text: '१००% फूड ग्रेड SS 304 स्टील बॉडी आहे आणि लाडूचा आकार अगदी एकसारखा येतो. पॅकिंगमध्ये खूप मदत झाली.',
    rating: 5,
    businessType: 'Startup',
    verified: true
  }
];

export const contentService = {
  // Get main site content (with language support)
  async getContent() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'siteContent', 'main');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return snap.data();
        }
      } catch (err) {
        console.warn('Failed to fetch content from Firestore:', err);
      }
    }

    const stored = localStorage.getItem(LOCAL_CONTENT_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }

    return null; // Signals fallback to translations.js
  },

  // Save main content
  async saveContent(contentData) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'siteContent', 'main'), contentData, { merge: true });
      } catch (err) {
        console.warn('Failed to save content to Firestore:', err);
      }
    }
    localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(contentData));
    notifyUpdate('content', contentData);
    return true;
  },

  // Get Settings
  async getSettings() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          return { ...defaultSettings, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.phone === '+91 74472 71253' || parsed.phone === '+91 75170 52317') parsed.phone = defaultSettings.phone;
        if (parsed.whatsappNumber === '917447271253' || parsed.whatsappNumber === '917517052317') parsed.whatsappNumber = defaultSettings.whatsappNumber;
        if (parsed.notificationEmail === 'sales@swarajmachine.com') parsed.notificationEmail = defaultSettings.notificationEmail;
        return { ...defaultSettings, ...parsed };
      } catch (e) {}
    }
    return defaultSettings;
  },

  // Save Settings
  async saveSettings(settings) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
    notifyUpdate('settings', settings);
    return true;
  },

  // Get Calculator Settings
  async getCalculatorSettings() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'calculator'));
        if (snap.exists()) {
          return { ...defaultCalculatorSettings, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_CALCULATOR_KEY);
    if (stored) {
      try { return { ...defaultCalculatorSettings, ...JSON.parse(stored) }; } catch (e) {}
    }
    return defaultCalculatorSettings;
  },

  async saveCalculatorSettings(settings) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'calculator'), settings, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_CALCULATOR_KEY, JSON.stringify(settings));
    notifyUpdate('calculator', settings);
    return true;
  },

  // Get Testimonials
  async getTestimonials() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDocs(collection(db, 'testimonials'));
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_TESTIMONIALS_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return defaultTestimonials;
  },

  async saveTestimonials(testimonials) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'settings', 'testimonials');
        await setDoc(docRef, { list: testimonials }, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_TESTIMONIALS_KEY, JSON.stringify(testimonials));
    notifyUpdate('testimonials', testimonials);
    return true;
  },

  // Get Offers
  async getOffers() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'offers'));
        if (snap.exists()) {
          return { ...defaultOffers, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_OFFERS_KEY);
    if (stored) {
      try { return { ...defaultOffers, ...JSON.parse(stored) }; } catch (e) {}
    }
    return defaultOffers;
  },

  async saveOffers(offers) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'offers'), offers, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_OFFERS_KEY, JSON.stringify(offers));
    notifyUpdate('offers', offers);
    return true;
  },

  // Get Specs
  async getSpecs() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'specs'));
        if (snap.exists()) {
          return { ...defaultSpecs, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_SPECS_KEY);
    if (stored) {
      try { return { ...defaultSpecs, ...JSON.parse(stored) }; } catch (e) {}
    }
    return defaultSpecs;
  },

  async saveSpecs(specsData) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'specs'), specsData, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_SPECS_KEY, JSON.stringify(specsData));
    notifyUpdate('specs', specsData);
    return true;
  },

  // Get Brochures
  async getBrochures() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'brochures'));
        if (snap.exists()) {
          return { ...defaultBrochures, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_BROCHURES_KEY);
    if (stored) {
      try { return { ...defaultBrochures, ...JSON.parse(stored) }; } catch (e) {}
    }
    return defaultBrochures;
  },

  async saveBrochures(brochuresData) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'brochures'), brochuresData, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_BROCHURES_KEY, JSON.stringify(brochuresData));
    notifyUpdate('brochures', brochuresData);
    return true;
  },

  // Get FAQs
  async getFaqs() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'faqs'));
        if (snap.exists()) {
          return { ...defaultFaqsByLang, ...snap.data() };
        }
      } catch (e) {}
    }

    const stored = localStorage.getItem(LOCAL_FAQS_KEY);
    if (stored) {
      try { return { ...defaultFaqsByLang, ...JSON.parse(stored) }; } catch (e) {}
    }
    return defaultFaqsByLang;
  },

  async saveFaqs(faqsData) {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'faqs'), faqsData, { merge: true });
      } catch (e) {}
    }
    localStorage.setItem(LOCAL_FAQS_KEY, JSON.stringify(faqsData));
    notifyUpdate('faqs', faqsData);
    return true;
  },

  // Reset all to original translations
  resetToDefaults() {
    localStorage.removeItem(LOCAL_CONTENT_KEY);
    localStorage.removeItem(LOCAL_SETTINGS_KEY);
    localStorage.removeItem(LOCAL_CALCULATOR_KEY);
    localStorage.removeItem(LOCAL_TESTIMONIALS_KEY);
    localStorage.removeItem(LOCAL_OFFERS_KEY);
    localStorage.removeItem(LOCAL_SPECS_KEY);
    localStorage.removeItem(LOCAL_BROCHURES_KEY);
    localStorage.removeItem(LOCAL_FAQS_KEY);
    notifyUpdate('reset', null);
    return true;
  }
};
