import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, DEFAULT_DEMO_OWNER } from '../services/authService';
import { adminI18n } from '../data/adminI18n';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminLang, setAdminLangState] = useState(() => localStorage.getItem('swaraj_admin_lang') || 'mr');

  const setAdminLang = (lang) => {
    setAdminLangState(lang);
    localStorage.setItem('swaraj_admin_lang', lang);
  };

  useEffect(() => {
    // Check initial session
    const unsubscribe = authService.onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Activity check every 2 minutes for 30-min auto logout
    const activityInterval = setInterval(() => {
      authService.checkInactivity(() => {
        setUser(null);
      });
    }, 2 * 60 * 1000);

    // Event listeners to keep session alive when user interacts
    const resetTimer = () => authService.updateActivity();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      unsubscribe();
      clearInterval(activityInterval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const resetPassword = async (email) => {
    await authService.resetPassword(email);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    resetPassword,
    isOwner: user?.role === 'owner',
    isStaff: user?.role === 'staff',
    adminLang,
    setAdminLang,
    at: adminI18n[adminLang] || adminI18n.mr,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
