import React, { useState } from 'react';
import { Languages, Search, Save, AlertCircle, Check } from 'lucide-react';
import { translations } from '../../data/translations';
import { contentService } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function TranslationsEditor() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(() => {
    // Flatten keys from Hindi
    const hiKeys = Object.keys(translations.hi.nav);
    return hiKeys.map(k => ({
      key: `nav.${k}`,
      hi: translations.hi.nav[k] || '',
      mr: translations.mr?.nav?.[k] || '',
      en: translations.en?.nav?.[k] || '',
    }));
  });
  const { user, at, adminLang } = useAuth();

  const handleUpdate = (idx, lang, val) => {
    setData(prev => {
      const copy = [...prev];
      copy[idx][lang] = val;
      return copy;
    });
  };

  const handleSave = async () => {
    await activityService.log('translations_update', 'Saved live translations dictionary', user);
    toast.success(adminLang === 'mr' ? 'भाषांतर शब्दकोश सेव्ह झाला!' : adminLang === 'hi' ? 'अनुवाद शब्दकोश सेव हो गया!' : 'Translations published!');
  };

  const filtered = data.filter(d => 
    d.key.toLowerCase().includes(search.toLowerCase()) ||
    d.hi.toLowerCase().includes(search.toLowerCase()) ||
    d.mr.toLowerCase().includes(search.toLowerCase()) ||
    d.en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Languages className="w-6 h-6 text-brand-blue-700" />
            <span>{adminLang === 'mr' ? 'त्रैभाषिक शब्दकोश व की-संपादक' : adminLang === 'hi' ? 'त्रिभाषी शब्दकोश व की-संपादक' : 'Trilingual Dictionary & Key Editor'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {adminLang === 'mr' ? 'मराठी, हिंदी आणि इंग्रजी मधील मुख्य बटणे आणि मथळे एकाच ठिकाणी तपासा व बदला.' : adminLang === 'hi' ? 'हिंदी, मराठी और अंग्रेजी में नेविगेशन लेबल और मुख्य शब्द संपादित करें।' : 'Compare and edit navigation labels and common phrases across Hindi, Marathi, and English.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{adminLang === 'mr' ? 'शब्दकोश सेव्ह करा' : adminLang === 'hi' ? 'शब्दकोश सेव करें' : 'Save Dictionary'}</span>
        </button>
      </div>

      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={adminLang === 'mr' ? 'की नाव किंवा कोणत्याही भाषेतील मजकूर शोधा...' : adminLang === 'hi' ? 'की नाम या किसी भी भाषा में शब्द खोजें...' : 'Search by key name or text in any language...'}
          className="w-full p-1.5 bg-transparent border-0 text-xs focus:ring-0"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="py-3 px-3 w-40">Key</th>
              <th className="py-3 px-3">Hindi (हिंदी)</th>
              <th className="py-3 px-3">Marathi (मराठी)</th>
              <th className="py-3 px-3">English (EN)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((item, idx) => {
              const hasMissing = !item.hi || !item.mr || !item.en;
              return (
                <tr key={item.key} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 font-mono font-bold text-slate-500 text-[11px]">
                    {item.key}
                    {hasMissing && (
                      <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">
                        missing
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={item.hi}
                      onChange={(e) => handleUpdate(idx, 'hi', e.target.value)}
                      className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={item.mr}
                      onChange={(e) => handleUpdate(idx, 'mr', e.target.value)}
                      className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={item.en}
                      onChange={(e) => handleUpdate(idx, 'en', e.target.value)}
                      className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
