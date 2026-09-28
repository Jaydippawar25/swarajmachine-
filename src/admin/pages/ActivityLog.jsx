import React, { useState, useEffect } from 'react';
import { History, Search, Download, Clock, ShieldCheck, User } from 'lucide-react';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const { at, adminLang } = useAuth();

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const data = await activityService.getLogs(100);
    setLogs(data);
  };

  const filteredLogs = logs.filter(l => 
    (l.action || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.details || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.userEmail || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <History className="w-6 h-6 text-brand-blue-700" />
          <span>{at.activityTitle || 'Security & System Activity Log'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {at.activitySubtitle || 'Audit trail of logins, content modifications, price changes, and lead status updates.'}
        </p>
      </div>

      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={adminLang === 'mr' ? 'ईमेल, क्रिया किंवा नोंदीनुसार शोधा...' : adminLang === 'hi' ? 'ईमेल, कार्रवाई या विवरण से खोजें...' : 'Filter by user email, action or details...'}
          className="w-full p-1.5 bg-transparent border-0 text-xs focus:ring-0"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="py-3 px-4">{adminLang === 'mr' ? 'वेळ व तारीख' : adminLang === 'hi' ? 'समय व दिनांक' : 'Timestamp'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'वापरकर्ता' : adminLang === 'hi' ? 'उपयोगकर्ता' : 'User'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'क्रिया' : adminLang === 'hi' ? 'कार्रवाई' : 'Action'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'तपशील' : adminLang === 'hi' ? 'विवरण' : 'Details'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  {adminLang === 'mr' ? 'कोणत्याही नोंदी आढळल्या नाहीत.' : adminLang === 'hi' ? 'कोई एक्टिविटी लॉग नहीं मिले।' : 'No activity logs found.'}
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, idx) => (
                <tr key={log.id || idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{log.userEmail}</span>
                    <span className="text-[10px] text-amber-600 uppercase font-black">{log.userRole}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 leading-relaxed">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
