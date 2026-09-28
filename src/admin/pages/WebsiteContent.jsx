import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Layers, 
  Languages, 
  Eye, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { contentService } from '../services/contentService';
import { activityService } from '../services/activityService';
import { translations } from '../../data/translations';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function WebsiteContent() {
  const [activeLang, setActiveLang] = useState('mr'); // Default to 'mr'
  const [content, setContent] = useState(translations);
  const [isSaving, setIsSaving] = useState(false);
  const { user, at, adminLang } = useAuth();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const saved = await contentService.getContent();
    if (saved) {
      setContent(saved);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        [section]: {
          ...prev[activeLang]?.[section],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await contentService.saveContent(content);
      await activityService.log('content_update', `Updated ${activeLang.toUpperCase()} website copy`, user);
      toast.success(adminLang === 'mr' ? 'वेबसाइट मजकूर सेव्ह आणि प्रकाशित झाला!' : adminLang === 'hi' ? 'वेबसाइट कंटेंट सेव और प्रकाशित हुआ!' : 'Website content saved and published!');
    } catch (e) {
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm(adminLang === 'mr' ? 'सर्व मजकूर डीफॉल्ट फॅक्टरी व्हर्जनवर पूर्ववत करायचा आहे का?' : 'Reset all website content back to default factory translations?')) {
      contentService.resetToDefaults();
      setContent(translations);
      toast.success(adminLang === 'mr' ? 'डीफॉल्ट मजकूर रिस्टोर झाला' : 'Reset to default translations');
    }
  };

  const current = content[activeLang] || translations[activeLang] || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-blue-700" />
            <span>{at.contentTitle || 'Website Content Editor'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.contentSubtitle || 'Edit live headlines, offers, metrics, and banners across all 3 languages.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{adminLang === 'mr' ? 'डीफॉल्ट रिसेट करा' : adminLang === 'hi' ? 'डिफ़ॉल्ट रीसेट करें' : 'Reset Default'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (adminLang === 'mr' ? 'प्रकाशित होत आहे...' : 'Publishing...') : (at.saveContent || 'Save & Publish')}</span>
          </button>
        </div>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs">
        <button
          onClick={() => setActiveLang('hi')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
            activeLang === 'hi' 
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black' 
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <span>🇮🇳 Hindi (हिंदी - Primary)</span>
        </button>
        <button
          onClick={() => setActiveLang('mr')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
            activeLang === 'mr' 
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black' 
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <span>🚩 Marathi (मराठी)</span>
        </button>
        <button
          onClick={() => setActiveLang('en')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
            activeLang === 'en' 
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black' 
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <span>🌐 English (EN)</span>
        </button>
      </div>

      {/* Sections Form */}
      <div className="space-y-6">
        {/* Section 1: Urgent Offer Announcement Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">Top Urgent Announcement Bar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Offer Tag / Prefix
              </label>
              <input
                type="text"
                value={current.nav?.offerPrefix || ''}
                onChange={(e) => handleFieldChange('nav', 'offerPrefix', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Announcement Message Text
              </label>
              <input
                type="text"
                value={current.nav?.offerText || ''}
                onChange={(e) => handleFieldChange('nav', 'offerText', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Offer Button Text
              </label>
              <input
                type="text"
                value={current.nav?.offerCta || ''}
                onChange={(e) => handleFieldChange('nav', 'offerCta', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hero Section Text & Trust Badges */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-brand-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Hero Section Copy</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trust Banner / Badge (Top of Hero)
              </label>
              <input
                type="text"
                value={current.hero?.trustBadge || ''}
                onChange={(e) => handleFieldChange('hero', 'trustBadge', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={current.hero?.title || ''}
                  onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Headline Highlight Words
                </label>
                <input
                  type="text"
                  value={current.hero?.titleHighlight || ''}
                  onChange={(e) => handleFieldChange('hero', 'titleHighlight', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-brand-blue-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subheadline (Hook)
              </label>
              <input
                type="text"
                value={current.hero?.subheadline || ''}
                onChange={(e) => handleFieldChange('hero', 'subheadline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sales Paragraph Description
              </label>
              <textarea
                rows={3}
                value={current.hero?.description || ''}
                onChange={(e) => handleFieldChange('hero', 'description', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed"
              />
            </div>

            {/* 4 Hero Metric Badges */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4 Hero Metric Badges
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={current.hero?.stat1Val || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat1Val', e.target.value)}
                    className="w-full font-black text-sm bg-transparent border-0 p-0 text-slate-900 mb-1 focus:ring-0"
                  />
                  <input
                    type="text"
                    value={current.hero?.stat1Label || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat1Label', e.target.value)}
                    className="w-full text-[11px] text-slate-500 bg-transparent border-0 p-0 focus:ring-0"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={current.hero?.stat2Val || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat2Val', e.target.value)}
                    className="w-full font-black text-sm bg-transparent border-0 p-0 text-slate-900 mb-1 focus:ring-0"
                  />
                  <input
                    type="text"
                    value={current.hero?.stat2Label || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat2Label', e.target.value)}
                    className="w-full text-[11px] text-slate-500 bg-transparent border-0 p-0 focus:ring-0"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={current.hero?.stat3Val || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat3Val', e.target.value)}
                    className="w-full font-black text-sm bg-transparent border-0 p-0 text-slate-900 mb-1 focus:ring-0"
                  />
                  <input
                    type="text"
                    value={current.hero?.stat3Label || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat3Label', e.target.value)}
                    className="w-full text-[11px] text-slate-500 bg-transparent border-0 p-0 focus:ring-0"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={current.hero?.stat4Val || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat4Val', e.target.value)}
                    className="w-full font-black text-sm bg-transparent border-0 p-0 text-slate-900 mb-1 focus:ring-0"
                  />
                  <input
                    type="text"
                    value={current.hero?.stat4Label || ''}
                    onChange={(e) => handleFieldChange('hero', 'stat4Label', e.target.value)}
                    className="w-full text-[11px] text-slate-500 bg-transparent border-0 p-0 focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Payback Banner Callout */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Payback Highlight Banner</h3>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Banner Text Below Comparison
            </label>
            <input
              type="text"
              value={current.comparison?.bottomCallout || ''}
              onChange={(e) => handleFieldChange('comparison', 'bottomCallout', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-amber-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
