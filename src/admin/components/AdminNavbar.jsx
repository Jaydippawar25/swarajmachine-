import React from 'react';
import { Menu, ExternalLink, LogOut, Database, Search, Plus, Bell, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../services/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminNavbar({ onToggleSidebar }) {
  const { user, logout, adminLang, setAdminLang, at } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(adminLang === 'mr' ? 'यशस्वीरित्या लॉगआउट झाले' : 'Logged out successfully');
    } catch (e) {
      toast.error('Logout failed');
    }
  };

  const handleSearchFocus = () => {
    navigate('/admin/leads');
  };

  return (
    <header className="h-18 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition border border-slate-200"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (⌘K) */}
        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            onFocus={handleSearchFocus}
            placeholder={adminLang === 'mr' 
              ? "नाव, मोबाईल (+91), शहर (पुणे, सातारा, मुंबई) किंवा मशीन मॉडेल शोधा..." 
              : adminLang === 'hi'
              ? "ग्राहक नाम, मोबाइल (+91), शहर या मशीन मॉडल खोजें..."
              : "Search leads by customer name, city, phone (+91), or machine model..."
            }
            className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:bg-white transition-all text-slate-700"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Language Switcher (Segmented Pill) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setAdminLang('mr')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              adminLang === 'mr' 
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {adminLang === 'mr' && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('hi')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              adminLang === 'hi' 
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {adminLang === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('en')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              adminLang === 'en' 
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {adminLang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
            EN
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

        {/* Quick Action: Add Commercial Lead */}
        <NavLink
          to="/admin/leads"
          className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all hover:shadow-sky-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">
            {adminLang === 'mr' ? 'नवीन लीड जोडा' : adminLang === 'hi' ? 'नया लीड जोड़ें' : 'Add Commercial Lead'}
          </span>
        </NavLink>

        {/* Live Site Preview Link */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          title={adminLang === 'mr' ? 'थेट वेबसाइट उघडा' : 'Open Live Website'}
          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-800 font-extrabold text-xs">
            {user?.displayName?.[0]?.toUpperCase() || 'S'}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1 leading-tight">
              {user?.displayName || 'Admin'}
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {user?.role === 'owner' ? 'Super Admin (HQ)' : 'Staff'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
