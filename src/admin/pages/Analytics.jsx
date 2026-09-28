import React, { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, PhoneCall, Download, Calculator, Globe, TrendingUp, MousePointerClick, Inbox } from 'lucide-react';
import { leadService } from '../services/leadService';
import { useAuth } from '../context/AuthContext';

export default function Analytics() {
  const [leads, setLeads] = useState([]);
  const { adminLang } = useAuth();

  useEffect(() => {
    leadService.getLeads().then(setLeads);
  }, []);

  const total = leads.length;
  const sourceModal = leads.filter(l => (l.source || '').toLowerCase().includes('modal')).length;
  const sourceCalc = leads.filter(l => (l.source || '').toLowerCase().includes('calculator')).length;
  const sourceHero = leads.filter(l => (l.source || '').toLowerCase().includes('hero') || (l.source || '').toLowerCase().includes('direct')).length;
  const sourceBrochure = leads.filter(l => (l.source || '').toLowerCase().includes('brochure')).length;
  const sourceOther = Math.max(0, total - (sourceModal + sourceCalc + sourceHero + sourceBrochure));

  const modalPct = total ? Math.round((sourceModal / total) * 100) : 0;
  const heroPct = total ? Math.round((sourceHero / total) * 100) : 0;
  const calcPct = total ? Math.round((sourceCalc / total) * 100) : 0;

  const events = [
    { 
      name: adminLang === 'mr' ? 'एकूण ग्राहक चौकशी' : adminLang === 'hi' ? 'कुल ग्राहक पूछताछ' : 'Total Customer Inquiries', 
      count: total, 
      icon: Inbox, 
      color: 'text-brand-blue-600 bg-brand-blue-50' 
    },
    { 
      name: adminLang === 'mr' ? 'कोटेशन पॉपअप फॉर्म' : adminLang === 'hi' ? 'कोटेशन पॉपअप फॉर्म' : 'Quotation Modal Popups', 
      count: sourceModal, 
      icon: MousePointerClick, 
      color: 'text-amber-600 bg-amber-50' 
    },
    { 
      name: adminLang === 'mr' ? 'नफा कॅल्क्युलेटर चौकशी' : adminLang === 'hi' ? 'मुनाफा कैलकुलेटर लीड्स' : 'ROI Profit Calculator Used', 
      count: sourceCalc, 
      icon: Calculator, 
      color: 'text-purple-600 bg-purple-50' 
    },
    { 
      name: adminLang === 'mr' ? 'हिरो सेक्शन थेट संपर्क' : adminLang === 'hi' ? 'हीरो डायरेक्ट संपर्क' : 'Hero Direct CTA Inquiries', 
      count: sourceHero, 
      icon: PhoneCall, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
    { 
      name: adminLang === 'mr' ? 'ब्रोशर विनंती' : adminLang === 'hi' ? 'ब्रोशर अनुरोध' : 'PDF Brochures Requested', 
      count: sourceBrochure, 
      icon: Download, 
      color: 'text-rose-600 bg-rose-50' 
    },
    { 
      name: adminLang === 'mr' ? 'इतर वेबसाइट स्त्रोत' : adminLang === 'hi' ? 'अन्य वेबसाइट स्रोत' : 'Other Website Channels', 
      count: sourceOther, 
      icon: Globe, 
      color: 'text-indigo-600 bg-indigo-50' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-blue-700" />
          <span>{adminLang === 'mr' ? 'क्लिक ॲनालिटिक्स व लीड ट्रॅकिंग' : adminLang === 'hi' ? 'क्लिक एनालिटिक्स व लीड ट्रैकिंग' : 'Conversion Analytics & Click Tracking'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {adminLang === 'mr' ? 'वेबसाइटवरील थेट ग्राहक संवाद आणि चौकशी चॅनेलचे विश्लेषण.' : adminLang === 'hi' ? 'वेबसाइट से रियल-टाइम ग्राहक पूछताछ और क्लिक का विश्लेषण।' : 'Monitor real customer interactions, lead capture channels, and conversion metrics.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div key={evt.name} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">{evt.name}</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{evt.count}</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                  {total > 0 ? `${Math.round((evt.count / total) * 100)}% of total` : (adminLang === 'mr' ? 'थेट डेटा' : adminLang === 'hi' ? 'लाइव डेटा' : 'Live Data')}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${evt.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          {adminLang === 'mr' ? 'सर्वाधिक प्रतिसाद देणारे चॅनेल्स' : adminLang === 'hi' ? 'शीर्ष प्रदर्शन करने वाले चैनल्स' : 'Top Performing Call-To-Action Ranking'}
        </h3>
        {total === 0 ? (
          <p className="text-xs text-slate-400 py-3">
            {adminLang === 'mr' ? 'अजून कोणतीही चौकशी नोंदवली गेलेली नाही. ग्राहकांनी वेबसाइटवर फॉर्म भरल्यानंतर येथे रिअल-टाइम आकडेवारी दिसेल.' : adminLang === 'hi' ? 'अभी कोई पूछताछ दर्ज नहीं हुई है। वेबसाइट से इंक्वायरी आने पर यहां आंकड़े दिखेंगे।' : 'No inquiry data recorded yet. Real-time metrics will update automatically when customers submit inquiries.'}
          </p>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>1. {adminLang === 'mr' ? 'कोटेशन पॉपअप मोडल' : adminLang === 'hi' ? 'कोटेशन पॉपअप मॉडल' : 'Quotation Modal Form'}</span>
                <span className="text-amber-700">{modalPct}% ({sourceModal} leads)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${modalPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>2. {adminLang === 'mr' ? 'हिरो थेट संपर्क' : adminLang === 'hi' ? 'हीरो डायरेक्ट संपर्क' : 'Hero Section Direct CTA'}</span>
                <span className="text-emerald-700">{heroPct}% ({sourceHero} leads)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${heroPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>3. {adminLang === 'mr' ? 'नफा कॅल्क्युलेटर चौकशी' : adminLang === 'hi' ? 'मुनाफा कैलकुलेटर' : 'ROI Profit Calculator'}</span>
                <span className="text-brand-blue-700">{calcPct}% ({sourceCalc} leads)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-brand-blue-600 h-2 rounded-full" style={{ width: `${calcPct}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
