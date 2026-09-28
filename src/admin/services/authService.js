import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';

const LOCAL_USER_KEY = 'swaraj_admin_local_user';
const LAST_ACTIVITY_KEY = 'swaraj_admin_last_activity';

// Default Owner account for demo/offline fallback
export const DEFAULT_DEMO_OWNER = {
  uid: 'demo-owner-001',
  email: 'admin@swarajmachine.com',
  displayName: 'Swaraj Owner',
  role: 'owner',
  photoURL: null,
};

export const authService = {
  // Sign in
  async login(email, password) {
    this.updateActivity();

    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch role from Firestore
      let role = 'staff';
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          role = userDoc.data().role || 'staff';
        } else {
          // If first user, promote to owner
          role = 'owner';
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'owner',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn("Could not fetch user role, defaulting to owner:", err);
        role = 'owner';
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        role,
      };
    } else {
      // Local/demo fallback
      if (email.toLowerCase() === 'admin@swarajmachine.com' && password === 'Swaraj@2026') {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(DEFAULT_DEMO_OWNER));
        return DEFAULT_DEMO_OWNER;
      } else {
        throw new Error('Invalid email or password. Use admin@swarajmachine.com / Swaraj@2026 for demo.');
      }
    }
  },

  // Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
  },

  // Reset Password
  async resetPassword(email) {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
    } else {
      // Demo simulated reset
      console.log(`Password reset link simulated for ${email}`);
    }
  },

  // Listen to Auth State
  onAuthChange(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          let role = 'staff';
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              role = userDoc.data().role || 'staff';
            }
          } catch (e) {
            role = 'owner';
          }
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            role,
          });
        } else {
          callback(null);
        }
      });
    } else {
      // Local fallback
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      if (saved) {
        try {
          callback(JSON.parse(saved));
        } catch (e) {
          callback(null);
        }
      } else {
        callback(null);
      }
      return () => {};
    }
  },

  // Inactivity tracking (30 minutes)
  updateActivity() {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  },

  checkInactivity(onTimeout) {
    const lastActive = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (lastActive) {
      const diffMinutes = (Date.now() - parseInt(lastActive, 10)) / (1000 * 60);
      if (diffMinutes >= 30) {
        this.logout();
        if (onTimeout) onTimeout();
      }
    }
  }
};
