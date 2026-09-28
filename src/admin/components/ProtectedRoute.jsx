import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ children, requireOwner = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm font-medium">Verifying Swaraj Admin Session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireOwner && user.role !== 'owner') {
    return (
      <div className="p-8 max-w-lg mx-auto text-center mt-20 bg-white rounded-2xl shadow-xl border border-rose-100">
        <ShieldAlert className="w-14 h-14 text-rose-500 mx-auto mb-3" />
        <h3 className="text-xl font-black text-slate-900">Owner Access Required</h3>
        <p className="text-sm text-slate-600 mt-2">
          Your current account role (<span className="font-bold text-slate-800">{user.role}</span>) does not have permission to view this section.
        </p>
      </div>
    );
  }

  return children;
}
