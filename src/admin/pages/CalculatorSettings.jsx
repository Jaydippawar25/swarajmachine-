import React, { useState, useEffect } from 'react';
import { Calculator, Save, RotateCcw, HelpCircle, IndianRupee } from 'lucide-react';
import { contentService, defaultCalculatorSettings } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function CalculatorSettings() {
  const [settings, setSettings] = useState(defaultCalculatorSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { user, at } = useAuth();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await contentService.getCalculatorSettings();
    if (data) setSettings(data);
  };

  const handleChange = (field, val) => {
    setSettings(prev => ({ ...prev, [field]: Number(val) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await contentService.saveCalculatorSettings(settings);
      await activityService.log('calculator_update', 'Updated ROI Calculator algorithm variables', user);
      toast.success(at.saveSettings + '!');
    } catch (e) {
      toast.error('Failed to save calculator settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultCalculatorSettings);
    toast.success(at.reset || 'Reset to defaults');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calculator className="w-6 h-6 text-brand-blue-700" />
            <span>{at.calcTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.calcSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{at.reset}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? at.saving : at.saveSettings}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Financial Assumptions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-600" />
            <span>{at.coreFinancial}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {at.machineCost}
              </label>
              <input
                type="number"
                value={settings.machineCostForPayback}
                onChange={(e) => handleChange('machineCostForPayback', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">{at.machineCostSub}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {at.laborSavings}
              </label>
              <input
                type="number"
                value={settings.monthlyLaborSavings}
                onChange={(e) => handleChange('monthlyLaborSavings', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">{at.laborSavingsSub}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {at.workingDays}
              </label>
              <input
                type="number"
                value={settings.workingDaysPerMonth}
                onChange={(e) => handleChange('workingDaysPerMonth', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">{at.workingDaysSub}</span>
            </div>
          </div>
        </div>

        {/* Slider 1: Production Slider Limits */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            {at.dailyProdSlider}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.minPcs}</label>
              <input
                type="number"
                value={settings.minProduction}
                onChange={(e) => handleChange('minProduction', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.maxPcs}</label>
              <input
                type="number"
                value={settings.maxProduction}
                onChange={(e) => handleChange('maxProduction', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.stepPcs}</label>
              <input
                type="number"
                value={settings.stepProduction}
                onChange={(e) => handleChange('stepProduction', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.defaultPcs}</label>
              <input
                type="number"
                value={settings.defaultProduction}
                onChange={(e) => handleChange('defaultProduction', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-brand-blue-700"
              />
            </div>
          </div>
        </div>

        {/* Slider 2: Margin Slider Limits */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            {at.marginSlider}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.minRupees}</label>
              <input
                type="number"
                step="0.1"
                value={settings.minMargin}
                onChange={(e) => handleChange('minMargin', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.maxRupees}</label>
              <input
                type="number"
                step="0.1"
                value={settings.maxMargin}
                onChange={(e) => handleChange('maxMargin', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.stepRupees}</label>
              <input
                type="number"
                step="0.05"
                value={settings.stepMargin}
                onChange={(e) => handleChange('stepMargin', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{at.defaultRupees}</label>
              <input
                type="number"
                step="0.1"
                value={settings.defaultMargin}
                onChange={(e) => handleChange('defaultMargin', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-amber-700"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
