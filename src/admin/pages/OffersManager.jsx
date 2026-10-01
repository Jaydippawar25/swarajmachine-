import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Clock, Eye, EyeOff, Calendar, Flame, PartyPopper } from 'lucide-react';
import { contentService, defaultOffers } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import partyPopperImg from '../../assets/party-popper.png';
import toast from 'react-hot-toast';

export default function OffersManager() {
  const [offerEnabled, setOfferEnabled] = useState(defaultOffers.enabled);
  const [prefix, setPrefix] = useState(defaultOffers.prefix);
  const [offerText, setOfferText] = useState(defaultOffers.offerText);
  const [ctaText, setCtaText] = useState(defaultOffers.ctaText);
  const [discountPercent, setDiscountPercent] = useState(defaultOffers.discountPercent);
  const [hasExpiry, setHasExpiry] = useState(defaultOffers.hasExpiry);
  const [expiryDate, setExpiryDate] = useState(defaultOffers.expiryDate);
  const [isSaving, setIsSaving] = useState(false);
  const { user, at, adminLang } = useAuth();

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const data = await contentService.getOffers();
    if (data) {
      setOfferEnabled(data.enabled ?? true);
      setPrefix(data.prefix || defaultOffers.prefix);
      setOfferText(data.offerText || defaultOffers.offerText);
      setCtaText(data.ctaText || defaultOffers.ctaText);
      setDiscountPercent(data.discountPercent || defaultOffers.discountPercent);
      setHasExpiry(data.hasExpiry ?? false);
      setExpiryDate(data.expiryDate || defaultOffers.expiryDate);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const offerData = {
        enabled: offerEnabled,
        prefix,
        offerText,
        ctaText,
        discountPercent,
        hasExpiry,
        expiryDate,
      };
      await contentService.saveOffers(offerData);
      await activityService.log('offer_update', `Updated urgent announcement offer banner settings: "${prefix} ${offerText}"`, user);
      toast.success(adminLang === 'mr' ? 'ऑफर सेटिंग्ज सेव्ह झाल्या व वेबसाइटवर अपडेट झाल्या!' : adminLang === 'hi' ? 'ऑफर सेटिंग्स सेव हो गईं व वेबसाइट पर अपडेट हुईं!' : 'Offer settings saved and updated live!');
    } catch (e) {
      toast.error('Failed to save offer');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>{at.offersTitle || 'Offers & Urgent Announcement Bar'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.offersSubtitle || 'Configure the top urgency banner, discount promotions, and announcements.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? (adminLang === 'mr' ? 'सेव्ह होत आहे...' : 'Saving...') : (at.saveOffer || 'Save Offer')}</span>
        </button>
      </div>

      {/* Live Preview of the Banner */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {adminLang === 'mr' ? 'थेट बॅनर पूर्वावलोकन:' : adminLang === 'hi' ? 'लाइव बैनर पूर्वावलोकन:' : 'Live Banner Preview:'}
        </span>
        <div className={`relative overflow-hidden bg-slate-950 text-white border-b border-amber-500/25 py-2 px-3 text-xs rounded-xl shadow-lg transition-opacity ${!offerEnabled ? 'opacity-40 grayscale' : ''}`}>
          <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <img src={partyPopperImg} alt="Party popper" className="w-4 h-4 object-contain" />
              <span className="font-black text-amber-400 uppercase tracking-wide">
                {prefix}
              </span>
              <span className="text-slate-200">
                {offerText}
              </span>
              <img src={partyPopperImg} alt="Party popper" className="w-4 h-4 object-contain -scale-x-100 hidden sm:inline" />
            </div>

            <button
              type="button"
              className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black"
            >
              {ctaText} →
            </button>
          </div>
        </div>
        {!offerEnabled && (
          <p className="text-[11px] text-amber-600 font-bold">
            ⚠️ {adminLang === 'mr' ? 'बॅनर सध्या लपवले आहे (वेबसाइटवर दिसणार नाही)' : 'Banner is currently disabled and hidden on website.'}
          </p>
        )}
      </div>

      {/* Offer Settings Form */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-bold text-slate-900 text-sm">
            {adminLang === 'mr' ? 'बॅनर नियंत्रणे' : adminLang === 'hi' ? 'बैनर नियंत्रण' : 'Banner Controls'}
          </span>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={offerEnabled}
              onChange={(e) => setOfferEnabled(e.target.checked)}
              className="rounded text-amber-500 w-4 h-4 cursor-pointer"
            />
            <span>
              {offerEnabled 
                ? (adminLang === 'mr' ? 'बॅनर सक्रिय (वेबसाइटवर दिसेल)' : adminLang === 'hi' ? 'बैनर सक्रिय (दिखेगा)' : 'Banner Active (Visible on website)')
                : (adminLang === 'mr' ? 'बॅनर लपवले आहे' : adminLang === 'hi' ? 'बैनर छुपा हुआ' : 'Banner Hidden')}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {adminLang === 'mr' ? 'शीर्षक / टॅगलाइन' : adminLang === 'hi' ? 'शीर्षक / टैगलाइन' : 'Prefix / Tagline'}
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {adminLang === 'mr' ? 'मुख्य घोषणा मजकूर' : adminLang === 'hi' ? 'मुख्य घोषणा संदेश' : 'Main Announcement Text'}
            </label>
            <input
              type="text"
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {adminLang === 'mr' ? 'कृती बटण मजकूर (CTA)' : adminLang === 'hi' ? 'बटन टेक्स्ट (CTA)' : 'CTA Button Text'}
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-amber-600 focus:bg-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {adminLang === 'mr' ? 'फॅक्टरी डिस्काउंट लेबल' : adminLang === 'hi' ? 'फैक्टरी डिस्काउंट लेबल' : 'Factory Discount Label'}
            </label>
            <input
              type="text"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer pt-6">
              <input
                type="checkbox"
                checked={hasExpiry}
                onChange={(e) => setHasExpiry(e.target.checked)}
                className="rounded text-amber-500"
              />
              <span>{adminLang === 'mr' ? 'मुदत संपण्याची तारीख/वेळ ठरवा' : adminLang === 'hi' ? 'एक्सपायरी तारीख/समय सेट करें' : 'Set Expiration Date/Time'}</span>
            </label>
            {hasExpiry && (
              <input
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
