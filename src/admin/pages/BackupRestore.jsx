import React, { useState } from 'react';
import { DatabaseBackup, Download, Upload, ShieldCheck, AlertTriangle } from 'lucide-react';
import { leadService } from '../services/leadService';
import { contentService } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function BackupRestore() {
  const [isExporting, setIsExporting] = useState(false);
  const { user, isOwner, at, adminLang } = useAuth();

  const handleExportBackup = async () => {
    setIsExporting(true);
    try {
      const leads = await leadService.getLeads();
      const content = await contentService.getContent();
      const settings = await contentService.getSettings();
      const calculator = await contentService.getCalculatorSettings();
      const testimonials = await contentService.getTestimonials();

      const backupData = {
        exportedAt: new Date().toISOString(),
        version: '1.2.0',
        brand: "Swaraj Machinery's",
        data: {
          leads,
          content,
          settings,
          calculator,
          testimonials
        }
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `swaraj_machinery_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await activityService.log('backup_export', 'Exported full JSON system backup', user);
      toast.success(adminLang === 'mr' ? 'बॅकअप JSON यशस्वीरीत्या डाउनलोड झाला!' : adminLang === 'hi' ? 'बैकअप JSON सफलतापूर्वक डाउनलोड हुआ!' : 'Backup JSON downloaded successfully!');
    } catch (e) {
      toast.error('Failed to create backup');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileRestore = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!parsed.data) throw new Error('Invalid Swaraj backup file format');

        if (parsed.data.settings) await contentService.saveSettings(parsed.data.settings);
        if (parsed.data.calculator) await contentService.saveCalculatorSettings(parsed.data.calculator);
        if (parsed.data.content) await contentService.saveContent(parsed.data.content);

        await activityService.log('backup_restore', 'Restored system from JSON file', user);
        toast.success(adminLang === 'mr' ? 'सिस्टीम बॅकअपमधून पूर्ववत झाली!' : adminLang === 'hi' ? 'सिस्टम बैकअप से रीस्टोर हो गया!' : 'System restored from backup successfully!');
      } catch (err) {
        toast.error('Failed to restore: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <DatabaseBackup className="w-6 h-6 text-brand-blue-700" />
          <span>{at.backupTitle || 'Complete Backup & Restore (Owner Only)'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {at.backupSubtitle || 'Safeguard all customer inquiries, custom translations, machine specs, and settings.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {adminLang === 'mr' ? 'सिस्टीम बॅकअप डाउनलोड करा' : adminLang === 'hi' ? 'सिस्टम बैकअप डाउनलोड करें' : 'Export System Backup'}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {adminLang === 'mr' ? 'सर्व ग्राहक चौकशी (CRM), वेबसाइट मजकूर, कॅल्क्युलेटर मर्यादा आणि सेटिंग्जची सुरक्षित JSON फाइल डाउनलोड करा.' : adminLang === 'hi' ? 'सभी ग्राहक पूछताछ, वेबसाइट कंटेंट, कैलकुलेटर सेटिंग्स और डेटा की सुरक्षित JSON फाइल डाउनलोड करें।' : 'Download a complete JSON snapshot containing all leads, customized text copy, calculator variables, reviews, and system settings.'}
            </p>
          </div>

          <button
            onClick={handleExportBackup}
            disabled={isExporting}
            className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shadow-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? (adminLang === 'mr' ? 'बॅकअप तयार होत आहे...' : 'Generating Snapshot...') : (adminLang === 'mr' ? 'JSON बॅकअप डाउनलोड करा' : adminLang === 'hi' ? 'JSON बैकअप डाउनलोड करें' : 'Download JSON Backup')}</span>
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {adminLang === 'mr' ? 'बॅकअपमधून रिस्टोर करा' : adminLang === 'hi' ? 'बैकअप से रीस्टोर करें' : 'Restore from Backup'}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {adminLang === 'mr' ? 'पूर्वी सेव्ह केलेली स्वराज्य बॅकअप JSON फाइल अपलोड करून मजकूर व सेटिंग्ज त्वरित पूर्ववत करा.' : adminLang === 'hi' ? 'पहले से सुरक्षित बैकअप JSON फाइल अपलोड करके कंटेंट और सेटिंग्स तुरंत रीस्टोर करें।' : 'Upload a previously exported Swaraj backup JSON file to restore website copy, settings, and calculator bounds.'}
            </p>
          </div>

          <div>
            <label className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <Upload className="w-4 h-4" />
              <span>{adminLang === 'mr' ? 'JSON फाइल निवडा आणि रिस्टोर करा' : adminLang === 'hi' ? 'JSON फाइल चुनें और रीस्टोर करें' : 'Select & Restore JSON File'}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileRestore}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
