import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../services/firebase';
import { contentService } from '../services/contentService';
import { translations } from '../../data/translations';

export function useSiteContent(lang = 'hi') {
  const [content, setContent] = useState(translations[lang] || translations.hi);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeContent = () => {};
    let unsubscribeSettings = () => {};

    const loadInitial = async () => {
      // Load local or cached content first for zero layout shift
      const savedContent = await contentService.getContent();
      if (savedContent && savedContent[lang]) {
        setContent({ ...translations[lang], ...savedContent[lang] });
      } else {
        setContent(translations[lang] || translations.hi);
      }

      const savedSettings = await contentService.getSettings();
      setSettings(savedSettings);
      setLoading(false);

      // Setup Firestore Realtime Listeners if configured
      if (isFirebaseConfigured && db) {
        try {
          unsubscribeContent = onSnapshot(doc(db, 'siteContent', 'main'), (snap) => {
            if (snap.exists()) {
              const liveData = snap.data();
              if (liveData[lang]) {
                setContent({ ...translations[lang], ...liveData[lang] });
              }
            }
          });

          unsubscribeSettings = onSnapshot(doc(db, 'settings', 'general'), (snap) => {
            if (snap.exists()) {
              setSettings(snap.data());
            }
          });
        } catch (err) {
          console.warn('Realtime listener error:', err);
        }
      }
    };

    loadInitial();

    return () => {
      unsubscribeContent();
      unsubscribeSettings();
    };
  }, [lang]);

  return { content, settings, loading };
}
