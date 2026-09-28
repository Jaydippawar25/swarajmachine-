import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Sliders, 
  Search, 
  ShieldAlert,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { contentService, defaultSettings } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isOwner, at, adminLang } = useAuth();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await contentService.getSettings();
    if (data) setSettings(data);
  };

  const handleFieldChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }));
  };

  const handleToggleSection = (sectionKey) => {
    setSettings(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections?.[sectionKey]
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await contentService.saveSettings(settings);
      await activityService.log('settings_update', 'Updated factory contact numbers and site settings', user);
      toast.success(adminLang === 'mr' ? 'सेटिंग्ज सेव्ह झाल्या!' : adminLang === 'hi' ? 'सेटिंग्स सेव हो गईं!' : 'Settings saved successfully!');
    } catch (e) {
      toast.error(adminLang === 'mr' ? 'सेटिंग्ज सेव्ह करण्यात त्रुटी' : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-brand-blue-700" />
            <span>{at.settingsTitle || 'General & System Settings'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.settingsSubtitle || 'Factory contact details, WhatsApp integration, SEO, and section visibility.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? (adminLang === 'mr' ? 'सेव्ह होत आहे...' : 'Saving...') : (adminLang === 'mr' ? 'सेटिंग्ज सेव्ह करा' : adminLang === 'hi' ? 'सेटिंग्स सेव करें' : 'Save Settings')}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Numbers & Channels */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-blue-600" />
            <span>{adminLang === 'mr' ? 'ग्राहक संपर्क व व्हॉट्सॲप चॅनेल्स' : adminLang === 'hi' ? 'ग्राहक संपर्क और व्हाट्सएप चैनल्स' : 'Customer Contact & WhatsApp Channels'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {adminLang === 'mr' ? 'फोन नंबर (कॉलसाठी)' : adminLang === 'hi' ? 'फोन नंबर (कॉल हेतु)' : 'Display Phone Number'}
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {adminLang === 'mr' ? 'व्हॉट्सॲप नंबर (+ शिवाय)' : adminLang === 'hi' ? 'व्हाट्सएप नंबर (+ के बिना)' : 'WhatsApp Number (without +)'}
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {adminLang === 'mr' ? 'सूचना ईमेल' : adminLang === 'hi' ? 'अधिसूचना ईमेल' : 'Notification Email'}
              </label>
              <input
                type="email"
                value={settings.notificationEmail || ''}
                onChange={(e) => handleFieldChange('notificationEmail', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {adminLang === 'mr' ? 'फॅक्टरी / वर्कशॉप पत्ता' : adminLang === 'hi' ? 'फैक्टरी का पूरा पता' : 'Factory Physical Address'}
            </label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>{adminLang === 'mr' ? 'वेबसाइट विभाग दृश्यमानता (Section Visibility)' : adminLang === 'hi' ? 'वेबसाइट सेक्शन दृश्यता' : 'Public Website Section Visibility'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(settings.sections || {}).map(([key, isEnabled]) => (
              <div 
                key={key} 
                onClick={() => handleToggleSection(key)}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isEnabled ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <span className="text-xs font-bold capitalize text-slate-800">
                  {key}
                </span>
                <span className={`text-[10px] font-black uppercase ${isEnabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {isEnabled ? (adminLang === 'mr' ? 'सक्रिय' : 'Active') : (adminLang === 'mr' ? 'लपवले' : 'Hidden')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Meta Configuration */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-purple-600" />
            <span>{adminLang === 'mr' ? 'सर्च इंजिन ऑप्टिमायझेशन (SEO) व ट्रॅकिंग' : adminLang === 'hi' ? 'सर्च इंजन अनुकूलन (SEO) और ट्रैकिंग' : 'Search Engine Optimization (SEO) & Tracking'}</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {adminLang === 'mr' ? 'पेज शीर्षक (Title Tag)' : adminLang === 'hi' ? 'पेज टाइटल टैग' : 'Page Title Tag'}
              </label>
              <input
                type="text"
                value={settings.seo?.title || ''}
                onChange={(e) => handleSeoChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {adminLang === 'mr' ? 'मेटा वर्णन (Meta Description)' : adminLang === 'hi' ? 'मेटा विवरण' : 'Meta Description'}
              </label>
              <textarea
                rows={2}
                value={settings.seo?.description || ''}
                onChange={(e) => handleSeoChange('description', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Analytics Measurement ID
                </label>
                <input
                  type="text"
                  value={settings.seo?.googleAnalyticsId || ''}
                  onChange={(e) => handleSeoChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.seo?.metaPixelId || ''}
                  onChange={(e) => handleSeoChange('metaPixelId', e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
