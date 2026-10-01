import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Trash2, Save, GripVertical, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { contentService, defaultSpecs } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function SpecsManager() {
  const [specs, setSpecs] = useState(defaultSpecs.items);
  const [priceDisplay, setPriceDisplay] = useState(defaultSpecs.priceDisplay);
  const [priceOnRequest, setPriceOnRequest] = useState(defaultSpecs.priceOnRequest);
  const [isSaving, setIsSaving] = useState(false);
  const { user, at, adminLang } = useAuth();

  useEffect(() => {
    loadSpecs();
  }, []);

  const loadSpecs = async () => {
    const data = await contentService.getSpecs();
    if (data) {
      if (Array.isArray(data.items)) setSpecs(data.items);
      if (data.priceDisplay !== undefined) setPriceDisplay(data.priceDisplay);
      if (data.priceOnRequest !== undefined) setPriceOnRequest(data.priceOnRequest);
    }
  };

  const handleAddRow = () => {
    setSpecs(prev => [
      ...prev,
      { id: 'spec-' + Date.now(), label: adminLang === 'mr' ? 'नवीन वैशिष्ट्य' : adminLang === 'hi' ? 'नई विशेषता' : 'New Specification', val: adminLang === 'mr' ? 'तपशील' : adminLang === 'hi' ? 'विवरण' : 'Details' }
    ]);
  };

  const handleUpdateRow = (id, field, value) => {
    setSpecs(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteRow = (id) => {
    setSpecs(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        priceDisplay,
        priceOnRequest,
        items: specs
      };
      await contentService.saveSpecs(payload);
      await activityService.log('specs_update', `Updated ${specs.length} machine specifications and pricing`, user);
      toast.success(adminLang === 'mr' ? 'वैशिष्ट्ये व दर सेव्ह झाले!' : adminLang === 'hi' ? 'स्पेसिफिकेशन्स और रेट सेव हो गए!' : (at.saveSpecs || 'Specifications saved') + '!');
    } catch (e) {
      toast.error('Failed to save specifications');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-brand-blue-700" />
            <span>{at.specsTitle || 'Products & Technical Specifications'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.specsSubtitle || 'Edit verified specifications and public pricing displayed on the machine showcase.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{at.addRow || 'Add Row'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (adminLang === 'mr' ? 'सेव्ह होत आहे...' : 'Saving...') : (at.saveSpecs || 'Save Specs')}</span>
          </button>
        </div>
      </div>

      {/* Pricing display card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{at.pricingDisplay || 'Pricing Display'}</h3>
            <p className="text-xs text-slate-500">{adminLang === 'mr' ? 'कमर्शियल स्टँडर्ड मॉडेल (SS 304 सिंगल फेज)' : adminLang === 'hi' ? 'कमर्शियल स्टैंडर्ड मॉडल (SS 304 सिंगल फेज)' : 'Commercial Standard Model (SS 304 Single Phase)'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={priceOnRequest}
              onChange={(e) => setPriceOnRequest(e.target.checked)}
              className="rounded text-amber-500"
            />
            <span>{at.onDemandNote || 'Show "Price on Request"'}</span>
          </label>

          {!priceOnRequest && (
            <input
              type="text"
              value={priceDisplay}
              onChange={(e) => setPriceDisplay(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 w-32 focus:bg-white focus:outline-none focus:border-amber-400"
            />
          )}
        </div>
      </div>

      {/* Specs table list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">{adminLang === 'mr' ? `वैशिष्ट्ये यादी (${specs.length})` : adminLang === 'hi' ? `स्पेसिफिकेशन सूची (${specs.length})` : `Specification Rows (${specs.length})`}</h2>
          <span className="text-[11px] text-slate-400">{adminLang === 'mr' ? 'मूल्ये थेट संपादित करा' : adminLang === 'hi' ? 'मान सीधे संपादित करें' : 'Edit values directly'}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {specs.map((item, idx) => (
            <div key={item.id || idx} className="p-3 sm:p-4 flex items-center gap-3 hover:bg-slate-50/60 transition">
              <span className="text-xs font-mono font-bold text-slate-400 w-6">
                #{idx + 1}
              </span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleUpdateRow(item.id, 'label', e.target.value)}
                  placeholder={adminLang === 'mr' ? 'वैशिष्ट्याचे नाव' : adminLang === 'hi' ? 'विशेषता का नाम' : 'Specification Name'}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  value={item.val}
                  onChange={(e) => handleUpdateRow(item.id, 'val', e.target.value)}
                  placeholder={adminLang === 'mr' ? 'वैशिष्ट्याचे मूल्य / तपशील' : adminLang === 'hi' ? 'विशेषता का मान / विवरण' : 'Specification Value'}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                onClick={() => handleDeleteRow(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                title={adminLang === 'mr' ? 'हटवा' : 'Delete Row'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
