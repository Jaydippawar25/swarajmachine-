import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const LOCAL_ACTIVITY_KEY = 'swaraj_admin_activity_logs';

export const activityService = {
  async log(action, details, user) {
    const entry = {
      action,
      details,
      userId: user?.uid || 'unknown',
      userEmail: user?.email || 'admin@swarajmachine.com',
      userRole: user?.role || 'owner',
      timestamp: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'activityLogs'), entry);
      } catch (err) {
        console.warn('Failed to log activity to Firestore:', err);
      }
    }

    // Save to local storage as fallback / recent cache
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_ACTIVITY_KEY) || '[]');
      existing.unshift({ id: 'log-' + Date.now(), ...entry });
      localStorage.setItem(LOCAL_ACTIVITY_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    return entry;
  },

  async getLogs(max = 50) {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'), limit(max));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.warn('Failed to fetch activity logs from Firestore:', err);
      }
    }

    try {
      return JSON.parse(localStorage.getItem(LOCAL_ACTIVITY_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
};
