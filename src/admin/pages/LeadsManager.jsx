import React, { useState, useEffect } from 'react';
import { 
  Users2, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  Square, 
  Trash2, 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  X,
  FileSpreadsheet,
  CheckCircle2,
  PhoneCall,
  UserPlus
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessFilter, setBusinessFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    mobile: '',
    city: '',
    state: 'Maharashtra',
    businessType: 'shg',
    status: 'new',
    source: 'Direct Phone Call',
    followUpDate: '',
    notes: '',
    assignedStaff: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, isOwner, adminLang, at } = useAuth();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  // Status options
  const statusOptions = [
    { value: 'new', label: adminLang === 'mr' ? 'नवीन' : adminLang === 'hi' ? 'नई' : 'New', color: 'bg-rose-100 text-rose-700' },
    { value: 'contacted', label: adminLang === 'mr' ? 'संपर्क साधला' : adminLang === 'hi' ? 'संपर्क किया' : 'Contacted', color: 'bg-blue-100 text-blue-700' },
    { value: 'quotation_sent', label: adminLang === 'mr' ? 'कोटेशन पाठवले' : adminLang === 'hi' ? 'कोटेशन भेजा' : 'Quotation Sent', color: 'bg-purple-100 text-purple-700' },
    { value: 'negotiation', label: adminLang === 'mr' ? 'चर्चा सुरू' : adminLang === 'hi' ? 'बातचीत जारी' : 'Negotiation', color: 'bg-amber-100 text-amber-800' },
    { value: 'won', label: adminLang === 'mr' ? 'विक्री पूर्ण (Won)' : adminLang === 'hi' ? 'बिक्री सफल (Won)' : 'Won (Sold)', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'lost', label: adminLang === 'mr' ? 'रद्द (Lost)' : adminLang === 'hi' ? 'रद्द (Lost)' : 'Lost', color: 'bg-slate-100 text-slate-600' },
  ];

  // Filtering
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.mobile || '').includes(search) ||
      (lead.city || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.state || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesBusiness = businessFilter === 'all' || lead.businessType === businessFilter;

    return matchesSearch && matchesStatus && matchesBusiness;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Quick WhatsApp Follow-up template
  const openWhatsApp = (lead) => {
    const name = lead.name || (adminLang === 'mr' ? 'ग्राहक' : adminLang === 'hi' ? 'सर/मैडम' : 'Sir/Madam');
    const text = adminLang === 'mr'
      ? `नमस्कार ${name}, स्वराज्य मशिनरीकडून लाडू मेकिंग मशीनबद्दल चौकशी केल्याबद्दल धन्यवाद. आम्ही थेट फॅक्टरी कोटेशन व लाइव्ह व्हिडिओ डेमो शेअर करण्यासाठी संपर्क केला आहे. आपल्याला मशीनची कोणती माहिती हवी आहे?`
      : adminLang === 'hi'
      ? `नमस्ते ${name}, स्वराज मशीनरी से लड्डू मेकिंग मशीन के बारे में पूछताछ के लिए धन्यवाद। हम सीधे फैक्टरी कोटेशन व लाइव वीडियो डेमो साझा करने हेतु संपर्क कर रहे हैं। आपको मशीन के बारे में क्या जानकारी चाहिए?`
      : `Hello ${name}, thank you for contacting Swaraj Machinery regarding the Laddu Making Machine. We would be glad to share the factory price and video demo.`;
    window.open(`https://wa.me/91${lead.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Status Change
  const handleStatusChange = async (id, newStatus) => {
    await leadService.updateLead(id, { status: newStatus });
    await activityService.log('lead_status_update', `Changed lead ${id} status to ${newStatus}`, user);
    toast.success('Status updated');
    fetchLeads();
  };

  // Save Modal Notes & Follow-up
  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!editingLead) return;

    await leadService.updateLead(editingLead.id, {
      status: editingLead.status,
      notes: editingLead.notes,
      followUpDate: editingLead.followUpDate,
      assignedStaff: editingLead.assignedStaff,
    });
    await activityService.log('lead_details_edit', `Updated notes for ${editingLead.name}`, user);
    toast.success('Lead updated successfully');
    setEditingLead(null);
    fetchLeads();
  };

  // Add New Customer Manually
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.name?.trim() || !newCustomer.mobile?.trim()) {
      toast.error(
        adminLang === 'mr' 
          ? 'कृपया ग्राहकाचे नाव आणि मोबाईल नंबर टाका' 
          : adminLang === 'hi' 
          ? 'कृपया ग्राहक का नाम और मोबाइल नंबर दर्ज करें' 
          : 'Please enter customer name and mobile number'
      );
      return;
    }

    try {
      await leadService.saveLead({
        name: newCustomer.name.trim(),
        mobile: newCustomer.mobile.trim(),
        city: newCustomer.city.trim(),
        state: newCustomer.state.trim() || 'Maharashtra',
        businessType: newCustomer.businessType,
        status: newCustomer.status,
        source: newCustomer.source,
        followUpDate: newCustomer.followUpDate,
        notes: newCustomer.notes,
        assignedStaff: newCustomer.assignedStaff,
        createdAt: new Date().toISOString(),
      });

      await activityService.log('lead_created', `Manually added customer inquiry for ${newCustomer.name} (${newCustomer.mobile})`, user);
      toast.success(
        adminLang === 'mr' 
          ? 'नवीन ग्राहक यशस्वीरीत्या जोडला गेला!' 
          : adminLang === 'hi' 
          ? 'नया ग्राहक सफलतापूर्वक जोड़ा गया!' 
          : 'New customer inquiry added successfully!'
      );
      setAddModalOpen(false);
      setNewCustomer({
        name: '',
        mobile: '',
        city: '',
        state: 'Maharashtra',
        businessType: 'shg',
        status: 'new',
        source: 'Direct Phone Call',
        followUpDate: '',
        notes: '',
        assignedStaff: '',
      });
      fetchLeads();
    } catch (err) {
      toast.error('Failed to add customer inquiry');
    }
  };

  // Bulk Status
  const handleBulkStatus = async (status) => {
    if (!selectedIds.length) return;
    for (const id of selectedIds) {
      await leadService.updateLead(id, { status });
    }
    toast.success(`Updated ${selectedIds.length} leads to ${status}`);
    setSelectedIds([]);
    fetchLeads();
  };

  // Bulk Delete (Owner only)
  const handleBulkDelete = async () => {
    if (!isOwner) {
      toast.error('Only owner can delete leads');
      return;
    }
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected leads?`)) return;
    for (const id of selectedIds) {
      await leadService.deleteLead(id);
    }
    toast.success(`Deleted ${selectedIds.length} leads`);
    setSelectedIds([]);
    fetchLeads();
  };

  // Export
  const handleExport = () => {
    leadService.exportCSV(filteredLeads);
    toast.success('Leads CSV exported');
  };

  // Selection toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedLeads.map(l => l.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users2 className="w-6 h-6 text-brand-blue-700" />
            <span>{at.leadsTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.leadsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{at.addCustomer || '+ Add New Customer'}</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{at.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder={at.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">{at.allStatuses}</option>
            <option value="new">{at.statusNew}</option>
            <option value="contacted">{at.statusContacted}</option>
            <option value="quotation_sent">{at.statusQuotation}</option>
            <option value="negotiation">{at.statusNegotiation}</option>
            <option value="won">{at.statusWon}</option>
            <option value="lost">{at.statusLost}</option>
          </select>

          {/* Business Category Filter */}
          <select
            value={businessFilter}
            onChange={(e) => { setBusinessFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">{at.allCategories}</option>
            <option value="shg">{at.shgCategory}</option>
            <option value="sweet_shop">{at.sweetShopCategory}</option>
            <option value="startup">{at.startupCategory}</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar (when selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg animate-soft-pulse">
          <span className="text-xs font-bold text-amber-400">
            {selectedIds.length} {adminLang === 'mr' ? 'लीड्स निवडल्या' : adminLang === 'hi' ? 'लीड्स चयनित' : 'leads selected'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{adminLang === 'mr' ? 'स्थिती बदला:' : adminLang === 'hi' ? 'स्थिति बदलें:' : 'Set Status:'}</span>
            <select
              onChange={(e) => e.target.value && handleBulkStatus(e.target.value)}
              className="bg-slate-800 text-white text-xs rounded-lg px-2 py-1 border border-slate-700 font-bold"
              defaultValue=""
            >
              <option value="" disabled>{adminLang === 'mr' ? 'स्थिती निवडा...' : adminLang === 'hi' ? 'स्थिति चुनें...' : 'Change Status...'}</option>
              <option value="contacted">{adminLang === 'mr' ? 'संपर्क साधला' : adminLang === 'hi' ? 'संपर्क किया' : 'Contacted'}</option>
              <option value="quotation_sent">{adminLang === 'mr' ? 'कोटेशन पाठवले' : adminLang === 'hi' ? 'कोटेशन भेजा' : 'Quotation Sent'}</option>
              <option value="negotiation">{adminLang === 'mr' ? 'चर्चा सुरू' : adminLang === 'hi' ? 'बातचीत जारी' : 'Negotiation'}</option>
              <option value="won">{adminLang === 'mr' ? 'विक्री पूर्ण (Won)' : adminLang === 'hi' ? 'बिक्री सफल (Won)' : 'Won (Sold)'}</option>
              <option value="lost">{adminLang === 'mr' ? 'रद्द (Lost)' : adminLang === 'hi' ? 'रद्द (Lost)' : 'Lost'}</option>
            </select>

            {isOwner && (
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{adminLang === 'mr' ? 'हटवा' : adminLang === 'hi' ? 'हटाएं' : 'Delete'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-8 text-center">
                  <button onClick={toggleSelectAll}>
                    {selectedIds.length === paginatedLeads.length && paginatedLeads.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3">{at.customerName}</th>
                <th className="py-3 px-3">{at.contactNo}</th>
                <th className="py-3 px-3">{at.category}</th>
                <th className="py-3 px-3">{at.location}</th>
                <th className="py-3 px-3">{at.status}</th>
                <th className="py-3 px-3">{at.followUpReminder}</th>
                <th className="py-3 px-3 text-right">{at.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    {adminLang === 'mr' ? 'कोणतीही लीड्स सापडली नाही.' : adminLang === 'hi' ? 'कोई लीड्स नहीं मिली।' : 'No leads found matching current filters.'}
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => {
                  const isOverdue = lead.followUpDate && lead.followUpDate < todayStr && lead.status !== 'won' && lead.status !== 'lost';
                  const isSelected = selectedIds.includes(lead.id);

                  return (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-slate-50/80 transition ${isSelected ? 'bg-amber-50/50' : ''}`}
                    >
                      <td className="py-3 px-3 text-center">
                        <button onClick={() => toggleSelect(lead.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <button 
                          onClick={() => setEditingLead({ ...lead })}
                          className="font-bold text-slate-900 hover:text-brand-blue-700 text-left block"
                        >
                          {lead.name}
                          {lead.status === 'new' && (
                            <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-500 text-white uppercase">
                              {adminLang === 'mr' ? 'नवीन' : adminLang === 'hi' ? 'नई' : 'New'}
                            </span>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400 block">
                          {adminLang === 'mr' ? 'माध्यम' : adminLang === 'hi' ? 'स्रोत' : 'Via'}: {lead.source} • {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-slate-900 font-bold block">{lead.mobile}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{lead.language || 'mr'}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-semibold text-slate-800">
                          {lead.businessType === 'shg' ? at.shgCategory : lead.businessType === 'sweet_shop' ? at.sweetShopCategory : at.startupCategory}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {lead.city}{lead.state ? `, ${lead.state}` : ''}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border-0 cursor-pointer focus:ring-1 focus:ring-amber-500 ${
                            statusOptions.find(o => o.value === lead.status)?.color || 'bg-slate-100'
                          }`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        {lead.followUpDate ? (
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                            isOverdue ? 'text-rose-600 animate-pulse' : 'text-slate-600'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            {lead.followUpDate}
                            {isOverdue && <AlertCircle className="w-3 h-3 text-rose-500" title="Overdue!" />}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">{at.noDateSet}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => openWhatsApp(lead)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{at.chatWhatsapp}</span>
                        </button>
                        <a
                          href={`tel:${lead.mobile}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] transition"
                          title={at.callCustomer}
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

        {/* Pagination Controls */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            {adminLang === 'mr' ? `एकूण ${filteredLeads.length} पैकी ${paginatedLeads.length} चौकशी दाखवत आहे` : adminLang === 'hi' ? `कुल ${filteredLeads.length} में से ${paginatedLeads.length} पूछताछ प्रदर्शित` : `Showing ${paginatedLeads.length} of ${filteredLeads.length} inquiries`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-700">
              {adminLang === 'mr' ? `पान ${currentPage} / ${totalPages}` : adminLang === 'hi' ? `पृष्ठ ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {adminLang === 'mr' ? 'लीड तपशील: ' : adminLang === 'hi' ? 'लीड विवरण: ' : 'Lead Details: '} {editingLead.name}
                </h3>
                <span className="text-xs text-slate-400">
                  {at.contactNo}: {editingLead.mobile} • {editingLead.city}
                </span>
              </div>
              <button 
                onClick={() => setEditingLead(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {adminLang === 'mr' ? 'विक्री स्थिती' : adminLang === 'hi' ? 'बिक्री स्थिति' : 'Sales Status'}
                </label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {at.followUpReminder}
                </label>
                <input
                  type="date"
                  value={editingLead.followUpDate || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {adminLang === 'mr' ? 'नियुक्त कर्मचारी (Staff)' : adminLang === 'hi' ? 'नियुक्त कर्मचारी (Staff)' : 'Assigned Staff Member'}
                </label>
                <input
                  type="text"
                  value={editingLead.assignedStaff || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, assignedStaff: e.target.value })}
                  placeholder={adminLang === 'mr' ? 'उदा. राहुल पाटील (सेल्स)' : adminLang === 'hi' ? 'उदा. राहुल पाटिल (सेल्स)' : 'e.g. Rahul Patil (Sales Lead)'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {adminLang === 'mr' ? 'ग्राहक चर्चा व आवश्यक बाबी' : adminLang === 'hi' ? 'ग्राहक चर्चा व आवश्यकता नोट्स' : 'Customer Discussion Notes & Requirements'}
                </label>
                <textarea
                  rows={4}
                  value={editingLead.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  placeholder={adminLang === 'mr' ? 'ग्राहकाच्या गरजा, बजेट, लाडूचा आकार इत्यादी नोंदी ठेवा...' : adminLang === 'hi' ? 'ग्राहक की जरूरतें, बजट, लड्डू का साइज आदि दर्ज करें...' : 'Record customer preferences, budget, electricity setup, laddu size required, etc.'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Show ROI Calculator info if available */}
              {editingLead.details?.dailyProduction && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <span className="font-bold block mb-1">{adminLang === 'mr' ? 'कॅल्क्युलेट केलेल्या ग्राहकाच्या गरजा:' : adminLang === 'hi' ? 'कैलकुलेट की गई ग्राहक आवश्यकताएं:' : 'Calculated Customer Requirements:'}</span>
                  <span>{adminLang === 'mr' ? 'दैनिक उत्पादन:' : adminLang === 'hi' ? 'दैनिक उत्पादन:' : 'Daily Production:'} <b>{editingLead.details.dailyProduction} laddus/day</b></span> • 
                  <span className="ml-2">{adminLang === 'mr' ? 'नफा मार्जिन:' : adminLang === 'hi' ? 'मुनाफा मार्जिन:' : 'Profit Margin:'} <b>₹{editingLead.details.profitMargin} / laddu</b></span>
                </div>
              )}

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  {adminLang === 'mr' ? 'रद्द करा' : adminLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black hover:bg-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{adminLang === 'mr' ? 'लीड सेव्ह करा' : adminLang === 'hi' ? 'लीड सेव करें' : 'Save Lead'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Customer Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-lg w-full text-slate-900 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    {adminLang === 'mr' ? 'नवीन ग्राहक चौकशी जोडा' : adminLang === 'hi' ? 'नई ग्राहक पूछताछ जोड़ें' : 'Add New Customer Inquiry'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {adminLang === 'mr' ? 'फोन कॉल, व्हॉट्सॲप किंवा प्रत्यक्ष भेटीतील ग्राहकाची नोंद करा' : adminLang === 'hi' ? 'फोन कॉल, व्हाट्सएप या सीधी मुलाकात के ग्राहक का विवरण दर्ज करें' : 'Record customer details from phone calls, WhatsApp, or factory walk-ins'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Customer Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'ग्राहकाचे / गटाचे नाव *' : adminLang === 'hi' ? 'ग्राहक / समूह का नाम *' : 'Customer / Group Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder={adminLang === 'mr' ? 'उदा. सचिन शिंदे / जय भवानी बचत गट' : 'e.g. Sachin Shinde / SHG Name'}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-400 font-bold"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'मोबाईल नंबर *' : adminLang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={newCustomer.mobile}
                    onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                    placeholder="e.g. 9403454653"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* City / Village */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'गाव / शहर / जिल्हा' : adminLang === 'hi' ? 'शहर / गांव / जिला' : 'City / Town / District'}
                  </label>
                  <input
                    type="text"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    placeholder={adminLang === 'mr' ? 'उदा. सोलापूर, सांगली, पुणे' : 'e.g. Solapur, Pune, Kolhapur'}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'राज्य' : adminLang === 'hi' ? 'राज्य' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={newCustomer.state}
                    onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
                    placeholder="Maharashtra"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Business Type */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'व्यवसाय वर्गवारी' : adminLang === 'hi' ? 'व्यापार श्रेणी' : 'Business Category'}
                  </label>
                  <select
                    value={newCustomer.businessType}
                    onChange={(e) => setNewCustomer({ ...newCustomer, businessType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-amber-400"
                  >
                    <option value="shg">{adminLang === 'mr' ? 'महिला बचत गट (SHG)' : adminLang === 'hi' ? 'महिला स्वयं सहायता समूह' : 'Bachat Gat / Women SHG'}</option>
                    <option value="sweet_shop">{adminLang === 'mr' ? 'मिठाई व फरसाण दुकान' : adminLang === 'hi' ? 'मिठाई व नमकीन दुकान' : 'Sweet / Farsan Mart'}</option>
                    <option value="startup">{adminLang === 'mr' ? 'नवीन अन्न प्रक्रिया उद्योग' : adminLang === 'hi' ? 'नया खाद्य प्रसंस्करण उद्योग' : 'New Food Startup'}</option>
                    <option value="other">{adminLang === 'mr' ? 'इतर व्यावसायिक' : adminLang === 'hi' ? 'अन्य व्यावसायिक' : 'Other Commercial'}</option>
                  </select>
                </div>

                {/* Lead Source */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'चौकशी माध्यम / स्त्रोत' : adminLang === 'hi' ? 'पूछताछ स्रोत' : 'Inquiry Source / Channel'}
                  </label>
                  <select
                    value={newCustomer.source}
                    onChange={(e) => setNewCustomer({ ...newCustomer, source: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-amber-400"
                  >
                    <option value="Direct Phone Call">{adminLang === 'mr' ? 'थेट फोन कॉल (Direct Call)' : 'Direct Phone Call'}</option>
                    <option value="Direct WhatsApp">{adminLang === 'mr' ? 'थेट व्हॉट्सॲप संपर्क (WhatsApp)' : 'Direct WhatsApp'}</option>
                    <option value="Factory Walk-in">{adminLang === 'mr' ? 'थेट फॅक्टरी भेट (Walk-in)' : 'Factory Walk-in'}</option>
                    <option value="Exhibition / Krishi Mela">{adminLang === 'mr' ? 'कृषी प्रदर्शन / एक्झिबिशन' : 'Exhibition / Krishi Mela'}</option>
                    <option value="Customer Referral">{adminLang === 'mr' ? 'ग्राहक शिफारस (Referral)' : 'Customer Referral'}</option>
                    <option value="Manual Entry">{adminLang === 'mr' ? 'इतर ऑफलाइन नोंद' : 'Other Offline Entry'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Initial Status */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {adminLang === 'mr' ? 'सुरुवातीची स्थिती' : adminLang === 'hi' ? 'प्रारंभिक स्थिति' : 'Initial Sales Status'}
                  </label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-amber-400"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Follow-up Date */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {at.followUpReminder || 'पुढील संपर्क तारीख'}
                  </label>
                  <input
                    type="date"
                    value={newCustomer.followUpDate}
                    onChange={(e) => setNewCustomer({ ...newCustomer, followUpDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Discussion Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {adminLang === 'mr' ? 'ग्राहकाच्या गरजा व चर्चा नोट्स' : adminLang === 'hi' ? 'ग्राहक आवश्यकता व चर्चा नोट्स' : 'Discussion Notes & Requirements'}
                </label>
                <textarea
                  rows={3}
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  placeholder={adminLang === 'mr' ? 'उदा. राजगिरा लाडूसाठी कोटेशन हवे आहे, पुढील सोमवारी फॅक्टरी व्हिजिट करणार आहेत...' : 'e.g. Inquired about 1000 pcs/hr machine, requested video demo on WhatsApp, planned factory visit next week...'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  {adminLang === 'mr' ? 'रद्द करा' : adminLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{adminLang === 'mr' ? 'ग्राहक जतन करा' : adminLang === 'hi' ? 'ग्राहक सुरक्षित करें' : 'Save Customer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
