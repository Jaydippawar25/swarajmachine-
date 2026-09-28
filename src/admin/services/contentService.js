import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { translations } from '../../data/translations';

const LOCAL_CONTENT_KEY = 'swaraj_site_content';
const LOCAL_SETTINGS_KEY = 'swaraj_site_settings';
const LOCAL_FAQS_KEY = 'swaraj_site_faqs';
const LOCAL_BROCHURES_KEY = 'swaraj_site_brochures';
const LOCAL_TESTIMONIALS_KEY = 'swaraj_site_testimonials';
const LOCAL_CALCULATOR_KEY = 'swaraj_calculator_settings';

export const defaultSettings = {
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  notificationEmail: 'sales@swarajmachine.com',
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
  workingDaysPerMonth: 25
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
      try { return { ...defaultSettings, ...JSON.parse(stored) }; } catch (e) {}
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
    localStorage.setItem(LOCAL_TESTIMONIALS_KEY, JSON.stringify(testimonials));
    return true;
  },

  // Reset to original translations
  resetToDefaults() {
    localStorage.removeItem(LOCAL_CONTENT_KEY);
    localStorage.removeItem(LOCAL_SETTINGS_KEY);
    localStorage.removeItem(LOCAL_CALCULATOR_KEY);
    localStorage.removeItem(LOCAL_TESTIMONIALS_KEY);
    return true;
  }
};
