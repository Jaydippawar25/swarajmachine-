import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users2, 
  FileText, 
  Cpu, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  HelpCircle, 
  Sparkles, 
  Calculator, 
  MessageSquareQuote, 
  BarChart3, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  History, 
  DatabaseBackup,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../../assets/logo.png';

export default function AdminSidebar({ isOpen, onClose }) {
  const { user, isOwner, adminLang } = useAuth();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', labelMr: 'डॅशबोर्ड' },
    { to: '/admin/leads', icon: Users2, labelEn: 'Leads (CRM)', labelHi: 'लीड्स (CRM)', labelMr: 'लीड्स (CRM)' },
    { to: '/admin/content', icon: FileText, labelEn: 'Website Content', labelHi: 'वेबसाइट कंटेंट', labelMr: 'वेबसाइट मजकूर' },
    { to: '/admin/specs', icon: Cpu, labelEn: 'Products & Specs', labelHi: 'मशीन स्पेसिफिकेशन्स', labelMr: 'मशीन वैशिष्ट्ये व दर' },
    { to: '/admin/media', icon: ImageIcon, labelEn: 'Media Library', labelHi: 'मीडिया लाइब्रेरी', labelMr: 'फोटो व व्हिडिओ' },
    { to: '/admin/brochures', icon: FileSpreadsheet, labelEn: 'Brochures', labelHi: 'ब्रोशर सूची', labelMr: 'ब्रोशर यादी' },
    { to: '/admin/faqs', icon: HelpCircle, labelEn: 'FAQs', labelHi: 'प्रश्नोत्तरी (FAQ)', labelMr: 'नेहमीचे प्रश्न (FAQ)' },
    { to: '/admin/offers', icon: Sparkles, labelEn: 'Offers & Banner', labelHi: 'धमाका ऑफर बैनर', labelMr: 'धमाका ऑफर बॅनर' },
    { to: '/admin/calculator', icon: Calculator, labelEn: 'Calculator Settings', labelHi: 'मुनाफा कैलकुलेटर', labelMr: 'नफा कॅल्क्युलेटर' },
    { to: '/admin/testimonials', icon: MessageSquareQuote, labelEn: 'Testimonials', labelHi: 'ग्राहक समीक्षा', labelMr: 'ग्राहक अभिप्राय' },
    { to: '/admin/analytics', icon: BarChart3, labelEn: 'Analytics', labelHi: 'क्लिक एनालिटिक्स', labelMr: 'क्लिक ॲनालिटिक्स' },
    { to: '/admin/settings', icon: SettingsIcon, labelEn: 'Settings', labelHi: 'सेटिंग्स', labelMr: 'सेटिंग्ज' },
    ...(isOwner ? [
      { to: '/admin/users', icon: ShieldCheck, labelEn: 'Users Management', labelHi: 'स्टाफ प्रबंधन', labelMr: 'स्टाफ व्यवस्थापन' },
      { to: '/admin/activity', icon: History, labelEn: 'Activity Log', labelHi: 'एक्टिविटी लॉग', labelMr: 'ॲक्टिव्हिटी लॉग' },
      { to: '/admin/backup', icon: DatabaseBackup, labelEn: 'Backup & Restore', labelHi: 'बैकअप और रीस्टोर', labelMr: 'बॅकअप आणि रिस्टोर' },
    ] : [])
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="Swaraj Logo" className="h-9 w-auto object-contain bg-white rounded p-0.5" />
            <div>
              <div className="font-black text-white text-sm tracking-wide leading-none">
                SWARAJ
              </div>
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                {adminLang === 'mr' ? 'ॲडमिन पॅनेल' : adminLang === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const label = adminLang === 'mr' ? item.labelMr : adminLang === 'hi' ? item.labelHi : item.labelEn;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all
                  ${isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between bg-slate-900/30">
          <span>v1.2.0 • 2026</span>
          <span className="text-emerald-400 font-bold">● Active</span>
        </div>
      </aside>
    </>
  );
}
