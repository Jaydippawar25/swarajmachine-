import React from 'react';
import { Menu, Globe, ExternalLink, LogOut, ShieldCheck, Database, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../services/firebase';
import toast from 'react-hot-toast';

export default function AdminNavbar({ onToggleSidebar }) {
  const { user, logout, adminLang, setAdminLang, at } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (e) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-black text-slate-900 text-sm sm:text-base tracking-tight hidden sm:inline">
            {at.panelTitle}
          </span>
          {isFirebaseConfigured ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>{at.liveMode}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200" title="Connect Firebase in .env">
              <Database className="w-3 h-3 text-amber-600" />
              <span>{at.demoMode}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Toggle (MR / HI / EN) */}
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-bold text-slate-700">
          <button
            type="button"
            onClick={() => setAdminLang('mr')}
            className={`px-2.5 py-1 rounded-md transition ${adminLang === 'mr' ? 'bg-white shadow-xs text-brand-blue-700 font-black' : 'hover:text-slate-950'}`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('hi')}
            className={`px-2.5 py-1 rounded-md transition ${adminLang === 'hi' ? 'bg-white shadow-xs text-brand-blue-700 font-black' : 'hover:text-slate-950'}`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('en')}
            className={`px-2.5 py-1 rounded-md transition ${adminLang === 'en' ? 'bg-white shadow-xs text-brand-blue-700 font-black' : 'hover:text-slate-950'}`}
          >
            EN
          </button>
        </div>

        {/* Live Website Preview Button */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-blue-50 text-brand-blue-700 hover:bg-brand-blue-100 border border-brand-blue-200 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{at.liveSite}</span>
        </a>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
            {user?.displayName?.[0]?.toUpperCase() || 'S'}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {user?.displayName || 'Admin'}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${user?.role === 'owner' ? 'text-amber-600' : 'text-slate-500'}`}>
              {user?.role || 'staff'}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
