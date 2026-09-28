import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../services/firebase';

export function useAnalytics() {
  const trackEvent = async (eventName, details = {}) => {
    try {
      const payload = {
        event: eventName,
        details,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
      };

      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, 'events'), {
          ...payload,
          serverTimestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      // Analytics should never break customer experience
    }
  };

  return { trackEvent };
}
