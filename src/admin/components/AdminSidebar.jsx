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
  X,
  MessageSquare,
  LogOut,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../../assets/logo.png';
import toast from 'react-hot-toast';

export default function AdminSidebar({ isOpen, onClose }) {
  const { user, isOwner, adminLang, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (e) {
      toast.error('Logout failed');
    }
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', labelMr: 'डॅशबोर्ड', badge: 'Live', badgeType: 'live' },
    { to: '/admin/leads', icon: Users2, labelEn: 'Leads & CRM', labelHi: 'लीड्स (CRM)', labelMr: 'लीड्स (CRM)', badge: 'New', badgeType: 'alert' },
    { to: '/admin/content', icon: FileText, labelEn: 'Website Content', labelHi: 'वेबसाइट कंटेंट', labelMr: 'वेबसाइट मजकूर' },
    { to: '/admin/specs', icon: Cpu, labelEn: 'Products & Specs', labelHi: 'मशीन स्पेसिफिकेशन्स', labelMr: 'मशीन वैशिष्ट्ये व दर' },
    { to: '/admin/media', icon: ImageIcon, labelEn: 'Media Library', labelHi: 'मीडिया लाइब्रेरी', labelMr: 'फोटो व व्हिडिओ' },
    { to: '/admin/brochures', icon: FileSpreadsheet, labelEn: 'Brochures', labelHi: 'ब्रोशर सूची', labelMr: 'ब्रोशर यादी' },
    { to: '/admin/faqs', icon: HelpCircle, labelEn: 'FAQs', labelHi: 'प्रश्नोत्तरी (FAQ)', labelMr: 'नेहमीचे प्रश्न (FAQ)' },
    { to: '/admin/offers', icon: Sparkles, labelEn: 'Offers & Banner', labelHi: 'धमाका ऑफर बैनर', labelMr: 'धमाका ऑफर बॅनर' },
    { to: '/admin/calculator', icon: Calculator, labelEn: 'Calculator Settings', labelHi: 'मुनाफा कैलकुलेटर', labelMr: 'नफा कॅल्क्युलेटर' },
    { to: '/admin/testimonials', icon: MessageSquareQuote, labelEn: 'Testimonials', labelHi: 'ग्राहक समीक्षा', labelMr: 'ग्राहक अभिप्राय' },
    { to: '/admin/analytics', icon: BarChart3, labelEn: 'Click Analytics', labelHi: 'क्लिक एनालिटिक्स', labelMr: 'क्लिक ॲनालिटिक्स' },
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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800/80
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand header */}
        <div className="h-18 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-md shadow-sky-950 ring-1 ring-white/10 flex items-center justify-center">
              <img src={logoImg} alt="Swaraj Logo" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-sm tracking-wide">SWARAJ</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  CRM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {adminLang === 'mr' ? 'अन्न प्रक्रिया यंत्रसामग्री' : adminLang === 'hi' ? 'खाद्य प्रसंस्करण मशीनरी' : 'Food Machinery Suite'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Plant Status Indicator */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {adminLang === 'mr' ? 'सातारा फॅक्टरी प्लांट #१' : adminLang === 'hi' ? 'सतारा फैक्टरी प्लांट #1' : 'Satara Plant #1'}
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">
            SYNCED
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {adminLang === 'mr' ? 'ऑपरेशन्स आणि विक्री' : adminLang === 'hi' ? 'संचालन और बिक्री' : 'Operations & Sales'}
          </div>

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
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all group
                  ${isActive 
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-950 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-medium'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400 transition-colors'}`} />
                    <span className="truncate flex-1">{label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : item.badgeType === 'alert'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* WhatsApp Bot Status Box */}
        <div className="p-3 mx-3 mb-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp API Bot
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">99.8%</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            {adminLang === 'mr' ? 'कोटेशन व मशिन डेमो व्हिडिओ ऑटो-सेंड सक्रिय' : adminLang === 'hi' ? 'कोटेशन व मशीन डेमो वीडियो ऑटो-सेंड सक्रिय' : 'Auto-dispatching quotation PDF & trial video clips.'}
          </p>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-800 ring-2 ring-sky-500/40 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {user?.displayName?.[0]?.toUpperCase() || 'S'}
            </div>
            <div className="leading-tight truncate">
              <p className="text-xs font-semibold text-white truncate">
                {user?.displayName || (adminLang === 'mr' ? 'स्वराज ॲडमिन' : adminLang === 'hi' ? 'स्वराज एडमिन' : 'Swaraj Admin')}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                {user?.role === 'owner' ? (adminLang === 'mr' ? 'मुख्य मालक (Owner)' : adminLang === 'hi' ? 'मुख्य स्वामी (Owner)' : 'Super Admin') : 'Staff'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition" 
            title={adminLang === 'mr' ? 'लॉगआउट करा' : adminLang === 'hi' ? 'लॉगआउट' : 'Log out'}
          >
            <LogOut className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </aside>
    </>
  );
}
