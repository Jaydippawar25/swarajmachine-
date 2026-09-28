import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Trash2, KeyRound, Mail, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { activityService } from '../services/activityService';
import toast from 'react-hot-toast';

const INITIAL_USERS = [
  {
    id: 'user-1',
    name: 'Swaraj Factory Owner',
    email: 'admin@swarajmachine.com',
    role: 'owner',
    status: 'active',
    lastLogin: 'Active Now'
  }
];

export default function UserManager() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('staff');
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isOwner, at, adminLang } = useAuth();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newEmail || !newName) return;

    const newUser = {
      id: 'user-' + Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'active',
      lastLogin: 'Never'
    };

    setUsers([...users, newUser]);
    await activityService.log('user_created', `Added new user ${newEmail} with role ${newRole}`, user);
    toast.success(adminLang === 'mr' ? 'कर्मचारी खाते तयार झाले!' : adminLang === 'hi' ? 'स्टाफ खाता बनाया गया!' : 'Staff account created!');
    setModalOpen(false);
    setNewEmail('');
    setNewName('');
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const next = u.status === 'active' ? 'disabled' : 'active';
        toast.success(adminLang === 'mr' ? `वापरकर्ता आता ${next === 'active' ? 'सक्रिय' : 'निष्क्रिय'} आहे` : `User is now ${next}`);
        return { ...u, status: next };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-blue-700" />
            <span>{at.usersTitle || 'Staff & Admin Users (Owner Only)'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.usersSubtitle || 'Manage who can view customer leads, edit website copy, or configure pricing.'}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>{at.addStaff || 'Add Staff Member'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="py-3 px-4">{adminLang === 'mr' ? 'नाव' : adminLang === 'hi' ? 'नाम' : 'Name'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'ईमेल' : adminLang === 'hi' ? 'ईमेल' : 'Email'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'भूमिका' : adminLang === 'hi' ? 'भूमिका' : 'Role'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'स्थिती' : adminLang === 'hi' ? 'स्थिति' : 'Status'}</th>
              <th className="py-3 px-4">{adminLang === 'mr' ? 'शेवटचे सक्रिय' : adminLang === 'hi' ? 'अंतिम सक्रिय' : 'Last Active'}</th>
              <th className="py-3 px-4 text-right">{adminLang === 'mr' ? 'कृती' : adminLang === 'hi' ? 'कार्रवाई' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/70 transition">
                <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                <td className="py-3 px-4 text-slate-600 font-mono">{u.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    u.role === 'owner' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                    u.status === 'active' ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 text-[11px]">{u.lastLogin}</td>
                <td className="py-3 px-4 text-right">
                  {u.role !== 'owner' && (
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-950 px-2 py-1 rounded bg-slate-100"
                    >
                      {u.status === 'active' ? 'Disable' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900 mb-3">
              {adminLang === 'mr' ? 'नवीन कर्मचारी जोडा' : adminLang === 'hi' ? 'नया स्टाफ जोड़ें' : 'Add Team Member'}
            </h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {adminLang === 'mr' ? 'पूर्ण नाव' : adminLang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={adminLang === 'mr' ? 'उदा. महेश शिंदे' : adminLang === 'hi' ? 'उदा. महेश शिंदे' : 'e.g. Mahesh Shinde'}
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {adminLang === 'mr' ? 'ईमेल पत्ता' : adminLang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@swarajmachine.com"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {adminLang === 'mr' ? 'प्रवेश भूमिका' : adminLang === 'hi' ? 'एक्सेस भूमिका' : 'Access Role'}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="staff">{adminLang === 'mr' ? 'स्टाफ (फक्त लीड्स व फॉलो-अप)' : adminLang === 'hi' ? 'स्टाफ (केवल लीड्स व फॉलो-अप)' : 'Staff (Leads & Follow-ups Only)'}</option>
                  <option value="owner">{adminLang === 'mr' ? 'मालक / ॲडमिन (संपूर्ण अधिकार)' : adminLang === 'hi' ? 'मालिक / एडमिन (पूर्ण अधिकार)' : 'Owner (Full System Access)'}</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-slate-600"
                >
                  {adminLang === 'mr' ? 'रद्द करा' : adminLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-400 font-black text-slate-950 hover:bg-amber-300"
                >
                  {adminLang === 'mr' ? 'खाते तयार करा' : adminLang === 'hi' ? 'खाता बनाएं' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
