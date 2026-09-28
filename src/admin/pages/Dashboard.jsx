import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  MessageSquare, 
  PhoneCall, 
  TrendingUp, 
  ArrowUpRight, 
  Building2, 
  Store, 
  Rocket, 
  Calendar, 
  ExternalLink,
  Phone,
  Filter
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { adminLang, at } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  // Metrics
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const totalLeads = leads.length;
  const newToday = leads.filter(l => (l.createdAt || '').startsWith(todayStr)).length;
  const thisMonth = leads.filter(l => (l.createdAt || '').startsWith(thisMonthStr)).length;
  const converted = leads.filter(l => l.status === 'won').length;
  const conversionRate = totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;

  // Breakdown by Business Type
  const shgCount = leads.filter(l => l.businessType === 'shg').length;
  const sweetShopCount = leads.filter(l => l.businessType === 'sweet_shop').length;
  const startupCount = leads.filter(l => l.businessType === 'startup').length;

  // Breakdown by Source
  const sourceModal = leads.filter(l => (l.source || '').toLowerCase().includes('modal')).length;
  const sourceCalc = leads.filter(l => (l.source || '').toLowerCase().includes('calculator')).length;
  const sourceHero = leads.filter(l => (l.source || '').toLowerCase().includes('hero') || (l.source || '').toLowerCase().includes('direct')).length;
  const sourceOther = totalLeads - (sourceModal + sourceCalc + sourceHero);

  // Recent 10 leads
  const recentLeads = leads.slice(0, 10);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 animate-pulse">{adminLang === 'mr' ? 'नवीन' : adminLang === 'hi' ? 'नई' : 'NEW'}</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">{adminLang === 'mr' ? 'संपर्क साधला' : adminLang === 'hi' ? 'संपर्क किया' : 'CONTACTED'}</span>;
      case 'quotation_sent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">{adminLang === 'mr' ? 'कोटेशन पाठवले' : adminLang === 'hi' ? 'कोटेशन भेजा' : 'QUOTATION SENT'}</span>;
      case 'negotiation':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">{adminLang === 'mr' ? 'चर्चा सुरू' : adminLang === 'hi' ? 'बातचीत जारी' : 'NEGOTIATION'}</span>;
      case 'won':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{adminLang === 'mr' ? 'विक्री पूर्ण' : adminLang === 'hi' ? 'बिक्री सफल' : 'WON (SOLD)'}</span>;
      case 'lost':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">{adminLang === 'mr' ? 'रद्द' : adminLang === 'hi' ? 'रद्द' : 'LOST'}</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getBusinessLabel = (type) => {
    switch (type) {
      case 'shg': return at.shgCategory || 'Bachat Gat (SHG)';
      case 'sweet_shop': return at.sweetShopCategory || 'Sweet / Farsan Shop';
      case 'startup': return at.startupCategory || 'New Food Startup';
      default: return type || 'General';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {at.overviewTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.overviewSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
          >
            <span>{at.manageLeadsBtn}</span>
            <ArrowUpRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Leads */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {at.totalInquiries}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {totalLeads}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 mt-1 block flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> All sources
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* New Today */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {at.newToday}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 block">
              {newToday}
            </span>
            <span className="text-[10px] font-bold text-amber-600 mt-1 block">
              Requires response
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {at.thisMonth}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-brand-blue-700 mt-1 block">
              {thisMonth}
            </span>
            <span className="text-[10px] font-bold text-slate-400 mt-1 block">
              Current calendar month
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Converted / Won */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {at.converted}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">
              {converted}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 mt-1 block">
              {conversionRate}% {at.conversionRate}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Segment Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Inquiries by Business Category</h3>
            <p className="text-xs text-slate-500 mb-4">Target customer profile segmentation</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" />
                    Bachat Gat / SHG
                  </span>
                  <span className="text-slate-900">{shgCount} ({totalLeads ? Math.round((shgCount/totalLeads)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${totalLeads ? (shgCount/totalLeads)*100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Store className="w-3.5 h-3.5 text-amber-600" />
                    Sweet / Farsan Shops
                  </span>
                  <span className="text-slate-900">{sweetShopCount} ({totalLeads ? Math.round((sweetShopCount/totalLeads)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${totalLeads ? (sweetShopCount/totalLeads)*100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Rocket className="w-3.5 h-3.5 text-emerald-600" />
                    New Food Startups
                  </span>
                  <span className="text-slate-900">{startupCount} ({totalLeads ? Math.round((startupCount/totalLeads)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${totalLeads ? (startupCount/totalLeads)*100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>{adminLang === 'mr' ? 'प्रमुख भर: महिला बचत गट' : adminLang === 'hi' ? 'मुख्य फोकस: महिला स्वयं सहायता समूह' : 'Primary Focus: Women SHG (Bachat Gat)'}</span>
            <span className="font-bold text-brand-blue-700">{adminLang === 'mr' ? '६५% ध्येय' : adminLang === 'hi' ? '65% लक्ष्य' : '65% Target'}</span>
          </div>
        </div>

        {/* Lead Generation Channel Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{at.leadChannels}</h3>
            <p className="text-xs text-slate-500 mb-4">{at.captureLocations}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{at.modalChannel}</span>
                <span className="text-xs font-black text-brand-blue-700">{sourceModal} {adminLang === 'mr' ? 'लीड्स' : adminLang === 'hi' ? 'लीड्स' : 'leads'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{at.calcChannel}</span>
                <span className="text-xs font-black text-amber-600">{sourceCalc} {adminLang === 'mr' ? 'लीड्स' : adminLang === 'hi' ? 'लीड्स' : 'leads'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{at.heroChannel}</span>
                <span className="text-xs font-black text-emerald-600">{sourceHero} {adminLang === 'mr' ? 'लीड्स' : adminLang === 'hi' ? 'लीड्स' : 'leads'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{at.otherChannel}</span>
                <span className="text-xs font-black text-slate-600">{Math.max(0, sourceOther)} {adminLang === 'mr' ? 'लीड्स' : adminLang === 'hi' ? 'लीड्स' : 'leads'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            {adminLang === 'mr' ? 'कोटेशन पॉपअप आणि ऑफर बॅनरवरून सर्वाधिक ग्राहक चौकशी.' : adminLang === 'hi' ? 'कोटेशन पॉपअप व घोषणा बैनर से सर्वाधिक पूछताछ।' : 'Higher conversion on Quotation Modal via announcement banner.'}
          </div>
        </div>

        {/* Quick Action & Machine Status Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              {adminLang === 'mr' ? 'विक्री पाइपलाइन कृती' : adminLang === 'hi' ? 'सेल्स पाइपलाइन एक्शन' : 'Sales Pipeline Action'}
            </span>
            <h3 className="text-base font-black text-white">{adminLang === 'mr' ? 'व्यावसायिक लाडू मेकिंग मशीन' : adminLang === 'hi' ? 'कमर्शियल लड्डू मेकिंग मशीन' : 'Commercial Laddu Making Machine'}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {adminLang === 'mr' ? 'स्टँडर्ड १०००+ नग/तास SS 304 मॉडेल दर: ' : adminLang === 'hi' ? 'स्टैंडर्ड 1000+ नग/घंटा SS 304 मॉडल मूल्य: ' : 'Standard 1000+ pcs/hr SS 304 model pricing: '}
              <span className="text-amber-400 font-bold">₹1,85,000 + GST</span>.
            </p>
            
            <div className="mt-4 p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{adminLang === 'mr' ? 'प्रलंबित फॉलो-अप:' : adminLang === 'hi' ? 'लंबित फॉलो-अप:' : 'Pending Follow-ups:'}</span>
                <span className="font-bold text-amber-400">{leads.filter(l => l.status === 'new' || l.status === 'contacted').length}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{adminLang === 'mr' ? 'कोटेशन पाठवले:' : adminLang === 'hi' ? 'कोटेशन भेजा गया:' : 'Quotation Shared:'}</span>
                <span className="font-bold text-purple-400">{leads.filter(l => l.status === 'quotation_sent').length}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{adminLang === 'mr' ? 'अंतिम चर्चा सुरू:' : adminLang === 'hi' ? 'अंतिम बातचीत में:' : 'In Final Negotiation:'}</span>
                <span className="font-bold text-emerald-400">{leads.filter(l => l.status === 'negotiation').length}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <NavLink
              to="/admin/leads"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition"
            >
              <span>{adminLang === 'mr' ? 'फॉलो-अप यादी उघडा' : adminLang === 'hi' ? 'फॉलो-अप सूची खोलें' : 'Open Follow-up Pipeline'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">{at.recentInquiries}</h2>
            <p className="text-xs text-slate-500">{at.quickActionsSubtitle}</p>
          </div>
          <NavLink
            to="/admin/leads"
            className="text-xs font-bold text-brand-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <span>{adminLang === 'mr' ? `सर्व ${totalLeads} लीड्स पहा` : adminLang === 'hi' ? `सभी ${totalLeads} लीड्स देखें` : `View All ${totalLeads} Leads`}</span>
            <ArrowUpRight className="w-3 h-3" />
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">{at.customerName}</th>
                <th className="py-3 px-4">{at.contactNo}</th>
                <th className="py-3 px-4">{at.location}</th>
                <th className="py-3 px-4">{at.category}</th>
                <th className="py-3 px-4">{at.status}</th>
                <th className="py-3 px-4">{at.source}</th>
                <th className="py-3 px-4 text-right">{at.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    {adminLang === 'mr' ? 'कोणतीही चौकशी उपलब्ध नाही.' : adminLang === 'hi' ? 'अभी कोई पूछताछ दर्ज नहीं है।' : 'No leads recorded yet.'}
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => {
                  const whatsappMsg = adminLang === 'mr'
                    ? `नमस्कार ${lead.name || ''}, स्वराज्य मशिनरीकडून लाडू मेकिंग मशीनबद्दल संपर्क केल्याबद्दल धन्यवाद. आम्ही थेट फॅक्टरी कोटेशन व लाइव्ह व्हिडिओ डेमो शेअर करण्यासाठी उत्सुक आहोत.`
                    : adminLang === 'hi'
                    ? `नमस्ते ${lead.name || ''}, स्वराज मशीनरी से संपर्क करने के लिए धन्यवाद। हम आपके साथ लड्डू मेकिंग मशीन का फैक्टरी कोटेशन व वीडियो डेमो साझा करना चाहते हैं।`
                    : `Hello ${lead.name || ''}, thank you for contacting Swaraj Machinery regarding the Laddu Making Machine. We would be glad to share the factory price and video demo.`;
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {lead.name}
                        {lead.status === 'new' && (
                          <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-rose-500" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono">
                        {lead.mobile}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {lead.city}{lead.state ? `, ${lead.state}` : ''}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-slate-800">
                          {getBusinessLabel(lead.businessType)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-500">
                        {lead.source}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <a
                          href={`https://wa.me/91${lead.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{at.chatWhatsapp || 'WhatsApp'}</span>
                        </a>
                        <a
                          href={`tel:${lead.mobile}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] transition"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
