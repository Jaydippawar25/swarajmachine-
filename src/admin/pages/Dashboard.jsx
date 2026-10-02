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
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Flame,
  Zap,
  ChevronRight,
  ShieldCheck,
  Package,
  Layers
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const { adminLang, at } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Metrics calculation
  const totalLeadsCount = leads.length;
  // Calculate dynamic demo metrics blended with real leads
  const displayTotalInquiries = Math.max(totalLeadsCount, 324);
  const wonLeadsCount = leads.filter(l => l.status === 'won').length;
  const displayWonCount = Math.max(wonLeadsCount, 42);
  const activeQuotesCount = Math.max(leads.filter(l => l.status === 'quotation_sent' || l.status === 'negotiation').length, 18);
  const pipelineValueLakhs = (displayTotalInquiries * 0.15).toFixed(1);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            {adminLang === 'mr' ? 'नवीन चौकशी' : adminLang === 'hi' ? 'नई पूछताछ' : 'NEW'}
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            {adminLang === 'mr' ? 'संपर्क साधला' : adminLang === 'hi' ? 'संपर्क किया' : 'CONTACTED'}
          </span>
        );
      case 'quotation_sent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            {adminLang === 'mr' ? 'कोटेशन पाठवले' : adminLang === 'hi' ? 'कोटेशन भेजा' : 'QUOTATION SENT'}
          </span>
        );
      case 'negotiation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {adminLang === 'mr' ? 'चर्चा सुरू' : adminLang === 'hi' ? 'बातचीत जारी' : 'IN NEGOTIATION'}
          </span>
        );
      case 'won':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {adminLang === 'mr' ? 'विक्री पूर्ण' : adminLang === 'hi' ? 'सफल' : 'CLOSED WON'}
          </span>
        );
      case 'lost':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            {adminLang === 'mr' ? 'रद्द' : adminLang === 'hi' ? 'रद्द' : 'LOST'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const exportCSV = () => {
    if (!leads.length) {
      toast.error(adminLang === 'mr' ? 'डाउनलोड करण्यासाठी डेटा उपलब्ध नाही' : 'No data to export');
      return;
    }
    const headers = ['Customer Name,Mobile,City,State,Business Type,Status,Source,Date'];
    const rows = leads.map(l => 
      `"${l.name || ''}","${l.mobile || ''}","${l.city || ''}","${l.state || ''}","${l.businessType || ''}","${l.status || ''}","${l.source || ''}","${l.createdAt || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `swaraj_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(adminLang === 'mr' ? 'CSV फाइल यशस्वीरित्या डाऊनलोड झाली' : 'CSV exported successfully');
  };

  // Filtered leads for the table
  const filteredLeads = leads.filter(l => {
    if (selectedTab === 'new') return l.status === 'new';
    if (selectedTab === 'negotiation') return l.status === 'negotiation';
    if (selectedTab === 'won') return l.status === 'won';
    if (selectedTab === 'quotes') return l.status === 'quotation_sent';
    return true;
  });

  const displayTableLeads = filteredLeads.slice(0, 10);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Top Breadcrumb & Heading Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <span>Swaraj Enterprise CRM</span>
            <span className="text-slate-300">/</span>
            <span>{adminLang === 'mr' ? 'अन्न प्रक्रिया यंत्रसामग्री विभाग' : adminLang === 'hi' ? 'खाद्य प्रसंस्करण मशीनरी' : 'Industrial Confectionery Division'}</span>
            <span className="text-slate-300">/</span>
            <span className="text-sky-700 font-bold">{adminLang === 'mr' ? 'राष्ट्रीय ऑपरेशन्स डॅशबोर्ड' : 'National Dashboard'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {adminLang === 'mr' ? 'ऑपरेशन्स व मशीनरी लीड सेंटर' : adminLang === 'hi' ? 'संचालन एवं मशीनरी लीड केंद्र' : 'Operations & Machinery Lead Center'}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {adminLang === 'mr' ? 'Q3 ध्येय: ११४% पूर्ण' : 'Q3 FY26 Target: 114% Achieved'}
            </span>
          </h1>
        </div>

        {/* Date Range & Export Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{adminLang === 'mr' ? 'दिवाळी व लग्न हंगाम: सध्या सुरू' : 'Festive Rush: Current Active Cycle'}</span>
          </div>
          <button 
            onClick={exportCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{adminLang === 'mr' ? 'CSV डाउनलोड' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS ROW - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Inquiries */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {adminLang === 'mr' ? 'एकूण चौकशी (Leads)' : adminLang === 'hi' ? 'कुल पूछताछ (Leads)' : 'Total Inquiries'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{displayTotalInquiries}</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>{adminLang === 'mr' ? 'गेल्या महिन्यापेक्षा अधिक' : 'vs. 289 last month'}</span>
            <span className="font-semibold text-sky-700 font-mono">48 from WhatsApp</span>
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Card 2: Pipeline Value */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {adminLang === 'mr' ? 'पाइपलाइन मूल्य (Pipeline)' : adminLang === 'hi' ? 'पाइपलाइन वैल्यू' : 'Pipeline Value'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">₹{pipelineValueLakhs}L</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>{adminLang === 'mr' ? 'अपेक्षित पूर्णता: ₹३६.२ लाख' : 'Weighted: ₹36.2 Lakh'}</span>
            <span className="font-semibold text-slate-700 font-mono">{adminLang === 'mr' ? 'सरासरी ₹३.८L' : 'Avg Deal ₹3.8L'}</span>
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Card 3: Closed Deals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {adminLang === 'mr' ? 'विक्री पूर्ण (Closed Deals)' : adminLang === 'hi' ? 'सफल सौदे (Closed Deals)' : 'Closed Deals'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{displayWonCount} {adminLang === 'mr' ? 'नग' : 'Units'}</span>
            <span className="inline-flex items-center text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
              {adminLang === 'mr' ? 'ध्येय ३८ पूर्ण' : 'Target 38'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>{adminLang === 'mr' ? 'डिलिव्हरी दर: ९४% अचूक' : 'Dispatch rate: 94% on time'}</span>
            <span className="font-semibold text-emerald-600 font-mono">₹1.42 Cr Total</span>
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-violet-600 h-1.5 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* Card 4: Active Quotations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {adminLang === 'mr' ? 'सक्रिय कोटेशन्स (Quotes)' : adminLang === 'hi' ? 'सक्रिय कोटेशन (Quotes)' : 'Active Quotations'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeQuotesCount} B2B</span>
            <span className="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {adminLang === 'mr' ? '५ टोकन प्रतीक्षेत' : '5 Awaiting Advance'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>{adminLang === 'mr' ? 'सरासरी निर्णय: ४.२ दिवस' : 'Avg cycle: 4.2 days'}</span>
            <span className="font-semibold text-amber-600 font-mono">₹21.8L Pending</span>
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: 2 COLUMNS (7 cols + 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT 7 COLS: Machine Type Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {adminLang === 'mr' ? 'मशीन प्रकारानुसार ग्राहक मागणी व चौकशी' : adminLang === 'hi' ? 'मशीन श्रेणी अनुसार ग्राहक पूछताछ' : 'Lead Inquiries by Machine Category'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {adminLang === 'mr' ? 'सध्याच्या सणासुदीच्या हंगामातील सर्वाधिक मागणी असलेली मॉडेल्स' : 'High demand during festive season (Diwali, Wedding orders)'}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                {adminLang === 'mr' ? 'मासिक विश्लेषण' : 'Monthly Breakdown'}
              </span>
            </div>

            <div className="space-y-4">
              {/* 1. Automatic Laddu & Peda Machine */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md bg-sky-600 flex-shrink-0"></span>
                    <span className="text-sm font-bold text-slate-900">
                      {adminLang === 'mr' ? 'ऑटोमॅटिक लाडू व पेढा मेकिंग मशीन' : 'Automatic Laddu & Peda Making Machine'}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                      SW-LD-1200
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-900">138 Inquiries</span>
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">42.6%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-500 to-sky-600 h-2 rounded-full" style={{ width: '42.6%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{adminLang === 'mr' ? 'क्षमता: ८०० - १५०० नग/तास • SS 304 ग्रेड' : 'Capacity: 800 - 1,500 Pcs/hr • SS 304 Food Grade'}</span>
                  <span className="text-emerald-600 font-semibold">₹18.4L Pipeline Generated</span>
                </div>
              </div>

              {/* 2. Khoya / Mawa Making Machine */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md bg-emerald-600 flex-shrink-0"></span>
                    <span className="text-sm font-bold text-slate-900">
                      {adminLang === 'mr' ? 'खोया / मावा मेकिंग इंडस्ट्रियल प्लांट' : 'Khoya / Mawa Industrial Making Plant'}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      KM-500L
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-900">92 Inquiries</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">28.4%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{ width: '28.4%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{adminLang === 'mr' ? 'हेवी स्क्रॅपर सिस्टीम • गॅस / स्टीम / डिझेल' : 'Heavy Scraper System • Gas / Steam Fired'}</span>
                  <span className="text-emerald-600 font-semibold">₹14.2L Pipeline Generated</span>
                </div>
              </div>

              {/* 3. Continuous Cooker & Roaster */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md bg-amber-500 flex-shrink-0"></span>
                    <span className="text-sm font-bold text-slate-900">
                      {adminLang === 'mr' ? 'कन्टिन्युअस कुकर व रोस्टर (बेसन/रवा)' : 'Continuous Cooker & Roaster'}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      CC-ROAST-200
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-900">54 Inquiries</span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">16.7%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" style={{ width: '16.7%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{adminLang === 'mr' ? 'मोतीचूर व सोनपापडी बेसन भाजणीसाठी उपयुक्त' : 'Besan & Suji Roasting for Motichoor & Soan Papdi'}</span>
                  <span className="text-emerald-600 font-semibold">₹9.1L Pipeline Generated</span>
                </div>
              </div>

              {/* 4. Tilting Steam Jacketed Kettles */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md bg-indigo-600 flex-shrink-0"></span>
                    <span className="text-sm font-bold text-slate-900">
                      {adminLang === 'mr' ? 'टिल्टिंग स्टीम जॅकेटेड केटल' : 'Tilting Steam Jacketed Kettles'}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                      SK-300T
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-900">40 Inquiries</span>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">12.3%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full" style={{ width: '12.3%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{adminLang === 'mr' ? 'साखर पाक, बासुंदी आणि सिरप कॉन्सन्ट्रेटर' : 'Sugar Syrup & Basundi Concentrator (SS 316 Contact)'}</span>
                  <span className="text-emerald-600 font-semibold">₹6.8L Pipeline Generated</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              {adminLang === 'mr' ? 'प्रमुख मागणी राज्ये: महाराष्ट्र (४२%), गुजरात (२४%), राजस्थान (१८%), मध्य प्रदेश (१६%)' : 'Top inquiry origin regions: Maharashtra (42%), Gujarat (24%), Rajasthan (18%)'}
            </span>
            <NavLink to="/admin/specs" className="text-sky-600 hover:text-sky-700 font-bold flex items-center gap-0.5 transition-colors">
              <span>{adminLang === 'mr' ? 'मशीन स्पेक्स पहा' : 'View Catalog Specs'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </div>

        {/* RIGHT 5 COLS: Deal Stage Pipeline */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {adminLang === 'mr' ? 'विक्री टप्पे व फनेल (Pipeline)' : 'Deal Stage Pipeline'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {adminLang === 'mr' ? 'सक्रिय संभाव्य ग्राहकांची कन्व्हर्जन स्थिती' : 'Current conversion funnel across active prospects'}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                Win Rate: 34.2%
              </span>
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-3 mt-2">
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-bold text-slate-800">1. {adminLang === 'mr' ? 'नवीन व्हॉट्सॲप चौकशी' : 'New WhatsApp Inquiries'}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">124 leads <span className="text-slate-400 font-normal">| ₹62L</span></span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    <span className="font-bold text-slate-800">2. {adminLang === 'mr' ? 'व्हिडिओ डेमो व रेसिपी चाचणी' : 'Video Demo / Factory Trial Tested'}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">86 leads <span className="text-slate-400 font-normal">| ₹43L</span></span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '69%' }}></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-bold text-slate-800">3. {adminLang === 'mr' ? 'अधिकृत कोटेशन पाठवले (GST)' : 'Official Quotation Sent (GST Spec)'}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">54 leads <span className="text-slate-400 font-normal">| ₹28.5L</span></span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="font-bold text-slate-800">4. {adminLang === 'mr' ? 'किंमत व वाहतूक चर्चा' : 'In Commercial & Transport Negotiation'}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">28 leads <span className="text-slate-400 font-normal">| ₹16.8L</span></span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div className="border border-emerald-100 rounded-xl p-3 bg-emerald-50/50">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="font-bold text-emerald-950">5. {adminLang === 'mr' ? 'विक्री पूर्ण व ॲडव्हान्स टोकन जमा' : 'Won & Advance Token Received'}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800">42 closed <span className="text-emerald-700 font-semibold">| ₹48.5L</span></span>
                </div>
                <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tip / Notification Box */}
          <div className="mt-4 p-3.5 bg-sky-50 rounded-xl border border-sky-100 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-sky-950 leading-relaxed">
              <span className="font-bold">{adminLang === 'mr' ? 'कन्व्हर्जन टीप:' : 'Conversion Insight:'} </span>
              {adminLang === 'mr' 
                ? 'ज्या ग्राहकांनी स्वतःच्या पिठाच्या मिश्रणाचा व्हिडिओ डेमो व्हॉट्सॲपवर पाहिला, त्यांच्याशी व्यवहार २.८ पट वेगाने पूर्ण झाला.' 
                : 'Leads who tested video demonstration on WhatsApp with their own dough recipe closed 2.8x faster.'}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: RECENT LEADS & LIVE INQUIRIES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Header & Tabs */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {adminLang === 'mr' ? 'ताज्या व्यावसायिक चौकशी व ग्राहक लीड्स' : 'Recent Commercial Leads & Live Inquiries'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                {adminLang === 'mr' ? 'लाईव्ह फीड (Auto-Refreshed)' : 'Live Feed'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {adminLang === 'mr' 
                ? 'वेबसाइट व्हॉट्सॲप फॉर्म, नफा कॅल्क्युलेटर व थेट फॅक्टरी हॉटलाइनवरून आलेल्या चौकशी' 
                : 'High-priority leads from website WhatsApp widget, profit calculator, and direct inquiries.'}
            </p>
          </div>

          {/* Table Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'all' 
                  ? 'bg-sky-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {adminLang === 'mr' ? `सर्व (${leads.length})` : `All (${leads.length})`}
            </button>
            <button
              onClick={() => setSelectedTab('new')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'new' 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {adminLang === 'mr' ? 'नवीन' : 'New'}
            </button>
            <button
              onClick={() => setSelectedTab('negotiation')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'negotiation' 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {adminLang === 'mr' ? 'चर्चा सुरू' : 'Negotiation'}
            </button>
            <button
              onClick={() => setSelectedTab('won')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'won' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {adminLang === 'mr' ? 'विक्री पूर्ण' : 'Won'}
            </button>
            <NavLink
              to="/admin/leads"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-sky-700 border border-slate-200 transition-all inline-flex items-center gap-1"
            >
              <span>{adminLang === 'mr' ? 'सर्व व्यवस्थापित करा' : 'Manage All'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 sm:px-6">{adminLang === 'mr' ? 'ग्राहकाचे नाव' : 'Customer Name'}</th>
                <th className="py-3 px-4">{adminLang === 'mr' ? 'मोबाईल संपर्क' : 'Contact No.'}</th>
                <th className="py-3 px-4">{adminLang === 'mr' ? 'गाव / शहर' : 'City / State'}</th>
                <th className="py-3 px-4">{adminLang === 'mr' ? 'व्यवसाय प्रकार' : 'Business Category'}</th>
                <th className="py-3 px-4">{adminLang === 'mr' ? 'स्थिती' : 'Status'}</th>
                <th className="py-3 px-4">{adminLang === 'mr' ? 'माध्यम' : 'Source'}</th>
                <th className="py-3 px-4 sm:px-6 text-right">{adminLang === 'mr' ? 'त्वरित कृती' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {displayTableLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">
                      {adminLang === 'mr' ? 'निवडलेल्या फिल्टरनुसार चौकशी उपलब्ध नाही.' : 'No inquiries found for this filter.'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayTableLeads.map((lead) => {
                  const rawMobile = (lead.mobile || '').replace(/\D/g, '');
                  const whatsappMsg = adminLang === 'mr'
                    ? `नमस्कार ${lead.name || ''}, स्वराज्य मशिनरीकडून लाडू व खाद्य प्रक्रिया मशीनबद्दल संपर्क केल्याबद्दल धन्यवाद. आम्ही थेट फॅक्टरी कोटेशन व लाइव्ह व्हिडिओ डेमो शेअर करण्यासाठी उत्सुक आहोत.`
                    : adminLang === 'hi'
                    ? `नमस्ते ${lead.name || ''}, स्वराज मशीनरी से संपर्क करने के लिए धन्यवाद। हम आपके साथ मशीन का फैक्टरी कोटेशन व वीडियो डेमो साझा करना चाहते हैं।`
                    : `Hello ${lead.name || ''}, thank you for contacting Swaraj Machinery regarding food processing equipment. We are pleased to share the factory pricing and demo video with you.`;
                  
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/90 transition">
                      <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {(lead.name || 'G')[0]?.toUpperCase()}
                          </div>
                          <span className="truncate max-w-[160px]">{lead.name || 'Anonymous Lead'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono">
                        +91 {lead.mobile}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {lead.city || 'Maharashtra'}{lead.state ? `, ${lead.state}` : ''}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-slate-800">
                          {lead.businessType === 'shg' ? (adminLang === 'mr' ? 'महिला बचत गट' : 'Bachat Gat (SHG)')
                            : lead.businessType === 'sweet_shop' ? (adminLang === 'mr' ? 'मिठाई व फरसाण' : 'Sweet / Farsan')
                            : lead.businessType === 'startup' ? (adminLang === 'mr' ? 'नवीन उद्योग' : 'Food Startup')
                            : lead.businessType || 'General'}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {lead.source || 'Website Modal'}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap space-x-1.5">
                        <a
                          href={`https://wa.me/91${rawMobile}?text=${encodeURIComponent(whatsappMsg)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] border border-emerald-200 transition"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${lead.mobile}`}
                          className="inline-flex items-center p-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
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
