import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Plus, Trash2, Save, Download, FileText, ExternalLink } from 'lucide-react';
import { contentService, defaultBrochures } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import poster1 from '../../assets/comparison-poster.jpg';
import poster2 from '../../assets/features-poster.jpg';
import toast from 'react-hot-toast';

export default function BrochureManager() {
  const [brochures, setBrochures] = useState(defaultBrochures.items);
  const [whatsappTemplate, setWhatsappTemplate] = useState(defaultBrochures.whatsappTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const { user, at, adminLang } = useAuth();

  useEffect(() => {
    loadBrochures();
  }, []);

  const loadBrochures = async () => {
    const data = await contentService.getBrochures();
    if (data) {
      if (Array.isArray(data.items)) setBrochures(data.items);
      if (data.whatsappTemplate) setWhatsappTemplate(data.whatsappTemplate);
    }
  };

  const handleAdd = () => {
    setBrochures([
      ...brochures,
      {
        id: 'brochure-' + Date.now(),
        title: adminLang === 'mr' ? 'नवीन मशिनरी कॅटलॉग PDF' : adminLang === 'hi' ? 'नई मशीनरी कैटलॉग PDF' : 'New Machinery Catalog PDF',
        desc: adminLang === 'mr' ? 'उत्पादन मॅन्युअल आणि तांत्रिक ब्रोशर' : adminLang === 'hi' ? 'उत्पाद मैनुअल और स्पेसिफिकेशन्स ब्रोशर' : 'Product manual and specifications brochure',
        thumbType: 'comparison',
        pdfUrl: '#',
        size: '2.0 MB'
      }
    ]);
  };

  const handleDelete = (id) => {
    setBrochures(brochures.filter(b => b.id !== id));
    toast.success(adminLang === 'mr' ? 'ब्रोशर काढले गेले' : adminLang === 'hi' ? 'ब्रोशर हटा दिया गया' : 'Brochure removed');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await contentService.saveBrochures({
        whatsappTemplate,
        items: brochures
      });
      await activityService.log('brochure_update', `Updated ${brochures.length} brochures`, user);
      toast.success(adminLang === 'mr' ? 'ब्रोशर अपडेट झाले व वेबसाइटवर सेव्ह झाले!' : adminLang === 'hi' ? 'ब्रोशर अपडेट हो गए व वेबसाइट पर सेव हुए!' : 'Brochures updated successfully!');
    } catch (e) {
      toast.error('Failed to save brochures');
    } finally {
      setIsSaving(false);
    }
  };

  const getThumbImage = (thumbType) => {
    return thumbType === 'features' ? poster2 : poster1;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-brand-blue-700" />
            <span>{at.brochuresTitle || 'Brochure & Catalog Manager'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.brochuresSubtitle || 'Manage downloadable brochures and WhatsApp catalog delivery templates.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{at.addBrochure || 'Add Brochure'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (adminLang === 'mr' ? 'सेव्ह होत आहे...' : 'Saving...') : (at.saveBrochures || 'Save Brochures')}</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Message Template */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          {adminLang === 'mr' ? 'व्हॉट्सॲप ब्रोशर विनंती मेसेज टेम्पलेट' : adminLang === 'hi' ? 'व्हाट्सएप ब्रोशर अनुरोध संदेश टेम्पलेट' : 'WhatsApp Brochure Request Template'}
        </h3>
        <p className="text-xs text-slate-500">
          {adminLang === 'mr' ? 'जेव्हा ग्राहक "व्हॉट्सॲपवर डाउनलोड करा" क्लिक करतात, तेव्हा हा संदेश थेट भरला जातो.' : adminLang === 'hi' ? 'जब ग्राहक "व्हाट्सएप पर डाउनलोड करें" क्लिक करेंगे, तो यह संदेश अपने आप आ जाएगा।' : 'When visitors click "Download on WhatsApp", this message is automatically pre-filled.'}
        </p>
        <textarea
          rows={2}
          value={whatsappTemplate}
          onChange={(e) => setWhatsappTemplate(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Brochures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brochures.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex gap-4 items-center">
            <img 
              src={getThumbImage(b.thumbType)} 
              alt={b.title} 
              className="w-20 h-28 object-cover rounded-xl border border-slate-200 flex-shrink-0"
            />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={b.title}
                onChange={(e) => setBrochures(brochures.map(item => item.id === b.id ? { ...item, title: e.target.value } : item))}
                className="w-full font-bold text-xs bg-slate-50 p-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                value={b.desc}
                onChange={(e) => setBrochures(brochures.map(item => item.id === b.id ? { ...item, desc: e.target.value } : item))}
                className="w-full text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-bold text-slate-400">{b.size}</span>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
