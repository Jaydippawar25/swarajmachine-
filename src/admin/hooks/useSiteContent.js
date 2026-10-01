import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../services/firebase';
import { 
  contentService, 
  defaultSettings, 
  defaultOffers, 
  defaultSpecs, 
  defaultBrochures, 
  defaultFaqsByLang, 
  defaultTestimonials, 
  defaultCalculatorSettings 
} from '../services/contentService';
import { translations } from '../../data/translations';

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target, source) {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (isObject(source[key]) && isObject(target?.[key])) {
      output[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }
  return output;
}

export function useSiteContent(lang = 'hi') {
  const baseTranslation = translations[lang] || translations.hi || translations.mr;
  const [content, setContent] = useState(baseTranslation);
  const [settings, setSettings] = useState(defaultSettings);
  const [offers, setOffers] = useState(defaultOffers);
  const [specs, setSpecs] = useState(defaultSpecs);
  const [brochures, setBrochures] = useState(defaultBrochures);
  const [faqs, setFaqs] = useState(defaultFaqsByLang);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [calculatorSettings, setCalculatorSettings] = useState(defaultCalculatorSettings);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    try {
      // 1. Main site copy
      const savedContent = await contentService.getContent();
      if (savedContent && savedContent[lang]) {
        setContent(deepMerge(baseTranslation, savedContent[lang]));
      } else {
        setContent(baseTranslation);
      }

      // 2. Settings
      const savedSettings = await contentService.getSettings();
      if (savedSettings) setSettings(savedSettings);

      // 3. Offers
      const savedOffers = await contentService.getOffers();
      if (savedOffers) setOffers(savedOffers);

      // 4. Specs
      const savedSpecs = await contentService.getSpecs();
      if (savedSpecs) setSpecs(savedSpecs);

      // 5. Brochures
      const savedBrochures = await contentService.getBrochures();
      if (savedBrochures) setBrochures(savedBrochures);

      // 6. FAQs
      const savedFaqs = await contentService.getFaqs();
      if (savedFaqs) setFaqs(savedFaqs);

      // 7. Testimonials
      const savedTestimonials = await contentService.getTestimonials();
      if (savedTestimonials) setTestimonials(savedTestimonials);

      // 8. Calculator Settings
      const savedCalc = await contentService.getCalculatorSettings();
      if (savedCalc) setCalculatorSettings(savedCalc);
    } catch (e) {
      console.warn('Failed to load dynamic site content:', e);
    } finally {
      setLoading(false);
    }
  }, [lang, baseTranslation]);

  useEffect(() => {
    loadAll();

    // Listen for custom in-app events
    const handleUpdate = () => {
      loadAll();
    };
    window.addEventListener('swaraj_content_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Setup Firestore Realtime Listeners if configured
    let unsubscribes = [];
    if (isFirebaseConfigured && db) {
      try {
        unsubscribes.push(
          onSnapshot(doc(db, 'siteContent', 'main'), (snap) => {
            if (snap.exists()) {
              const live = snap.data();
              if (live[lang]) {
                setContent(deepMerge(baseTranslation, live[lang]));
              }
            }
          }),
          onSnapshot(doc(db, 'settings', 'general'), (snap) => {
            if (snap.exists()) setSettings({ ...defaultSettings, ...snap.data() });
          }),
          onSnapshot(doc(db, 'settings', 'offers'), (snap) => {
            if (snap.exists()) setOffers({ ...defaultOffers, ...snap.data() });
          }),
          onSnapshot(doc(db, 'settings', 'specs'), (snap) => {
            if (snap.exists()) setSpecs({ ...defaultSpecs, ...snap.data() });
          }),
          onSnapshot(doc(db, 'settings', 'brochures'), (snap) => {
            if (snap.exists()) setBrochures({ ...defaultBrochures, ...snap.data() });
          }),
          onSnapshot(doc(db, 'settings', 'faqs'), (snap) => {
            if (snap.exists()) setFaqs({ ...defaultFaqsByLang, ...snap.data() });
          }),
          onSnapshot(doc(db, 'settings', 'calculator'), (snap) => {
            if (snap.exists()) setCalculatorSettings({ ...defaultCalculatorSettings, ...snap.data() });
          })
        );
      } catch (err) {
        console.warn('Realtime listener error:', err);
      }
    }

    return () => {
      window.removeEventListener('swaraj_content_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [lang, loadAll, baseTranslation]);

  return {
    content,
    settings,
    offers,
    specs,
    brochures,
    faqs,
    testimonials,
    calculatorSettings,
    loading
  };
}
