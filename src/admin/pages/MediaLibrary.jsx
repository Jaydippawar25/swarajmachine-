import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, Eye, Video, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import machineMain from '../../assets/machine-main.jpg';
import machineTray from '../../assets/machine-laddu-tray.jpg';
import comparisonPoster from '../../assets/comparison-poster.jpg';
import featuresPoster from '../../assets/features-poster.jpg';
import toast from 'react-hot-toast';

const INITIAL_MEDIA = [
  { id: 'm-1', name: 'machine-main.jpg', title: 'Machine Front View', type: 'image', size: '325 KB', url: machineMain, assignedTo: 'Showcase Tab 2' },
  { id: 'm-2', name: 'machine-laddu-tray.jpg', title: 'Laddu Tray Model View', type: 'image', size: '385 KB', url: machineTray, assignedTo: 'Showcase Tab 1' },
  { id: 'm-3', name: 'comparison-poster.jpg', title: 'Commercial Comparison Poster', type: 'image', size: '362 KB', url: comparisonPoster, assignedTo: 'Brochure Gallery' },
  { id: 'm-4', name: 'features-poster.jpg', title: 'Technical Features Infographic', type: 'image', size: '450 KB', url: featuresPoster, assignedTo: 'Brochure Gallery' },
  { id: 'm-5', name: 'hero-bg.mp4', title: 'Live Working Machine Video', type: 'video', size: '4.9 MB', url: '', assignedTo: 'Hero Video & Showcase Tab 3' }
];

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState(INITIAL_MEDIA);
  const [selectedItem, setSelectedItem] = useState(null);
  const { at, adminLang } = useAuth();

  const handleUploadSimulate = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      toast.error('File size exceeds 25MB limit');
      return;
    }

    const newMedia = {
      id: 'm-' + Date.now(),
      name: file.name,
      title: file.name.split('.')[0],
      type: file.type.includes('video') ? 'video' : 'image',
      size: (file.size / 1024).toFixed(0) + ' KB',
      url: URL.createObjectURL(file),
      assignedTo: 'Unassigned'
    };

    setMediaList([newMedia, ...mediaList]);
    toast.success(adminLang === 'mr' ? 'फोटो/व्हिडिओ यशस्वीरीत्या अपलोड झाला!' : adminLang === 'hi' ? 'मीडिया सफलतापूर्वक अपलोड हुआ!' : 'Media uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-brand-blue-700" />
            <span>{adminLang === 'mr' ? 'मशीन फोटो व व्हिडिओ गॅलरी' : adminLang === 'hi' ? 'मशीन मीडिया व वीडियो लाइब्रेरी' : 'Machine Media & Video Library'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {adminLang === 'mr' ? 'उच्च दर्जाचे मशीनचे फोटो, तांत्रिक डायग्राम्स आणि कामाचे व्हिडिओ अपलोड करा.' : adminLang === 'hi' ? 'उच्च गुणवत्ता वाले मशीन के फोटो, तकनीकी चार्ट और वीडियो अपलोड करें।' : 'Upload and assign high-definition machine photos, diagrams, and working demo videos.'}
          </p>
        </div>

        <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{adminLang === 'mr' ? 'मीडिया अपलोड करा' : adminLang === 'hi' ? 'मीडिया अपलोड करें' : 'Upload Media'}</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUploadSimulate}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
              {item.type === 'video' ? (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Video className="w-10 h-10 text-brand-blue-600" />
                  <span className="text-xs font-bold">Video File (MP4)</span>
                </div>
              ) : (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              )}
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/70 text-white backdrop-blur-xs">
                {item.size}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 truncate max-w-[180px]">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono block">{item.name}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-brand-blue-700 bg-brand-blue-50 px-2 py-0.5 rounded">
                  {item.assignedTo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
