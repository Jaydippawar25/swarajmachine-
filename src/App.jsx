import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import PublicWebsite from './components/PublicWebsite';
import { Loader2 } from 'lucide-react';

// Lazy-load all Admin pages so they never slow down the public site
const Login = lazy(() => import('./admin/pages/Login'));
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const LeadsManager = lazy(() => import('./admin/pages/LeadsManager'));
const WebsiteContent = lazy(() => import('./admin/pages/WebsiteContent'));
const SpecsManager = lazy(() => import('./admin/pages/SpecsManager'));
const MediaLibrary = lazy(() => import('./admin/pages/MediaLibrary'));
const BrochureManager = lazy(() => import('./admin/pages/BrochureManager'));
const FaqManager = lazy(() => import('./admin/pages/FaqManager'));
const OffersManager = lazy(() => import('./admin/pages/OffersManager'));
const CalculatorSettings = lazy(() => import('./admin/pages/CalculatorSettings'));
const TestimonialsManager = lazy(() => import('./admin/pages/TestimonialsManager'));
const Analytics = lazy(() => import('./admin/pages/Analytics'));
const Settings = lazy(() => import('./admin/pages/Settings'));
const UserManager = lazy(() => import('./admin/pages/UserManager'));
const ActivityLog = lazy(() => import('./admin/pages/ActivityLog'));
const BackupRestore = lazy(() => import('./admin/pages/BackupRestore'));

function AdminSuspenseLoader() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-3" />
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
        Loading Swaraj Admin Module...
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Login */}
          <Route 
            path="/admin/login" 
            element={
              <Suspense fallback={<AdminSuspenseLoader />}>
                <Login />
              </Suspense>
            } 
          />

          {/* Protected Admin Control Panel */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminSuspenseLoader />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            
            {/* CRM Leads */}
            <Route path="leads" element={<LeadsManager />} />

            {/* Content & Banners */}
            <Route path="content" element={<WebsiteContent />} />
            <Route path="offers" element={<OffersManager />} />
            <Route path="specs" element={<SpecsManager />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="brochures" element={<BrochureManager />} />
            <Route path="faqs" element={<FaqManager />} />
            <Route path="calculator" element={<CalculatorSettings />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />

            {/* Owner Only Modules */}
            <Route 
              path="users" 
              element={
                <ProtectedRoute requireOwner={true}>
                  <UserManager />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="activity" 
              element={
                <ProtectedRoute requireOwner={true}>
                  <ActivityLog />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="backup" 
              element={
                <ProtectedRoute requireOwner={true}>
                  <BackupRestore />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all for /admin/* */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* Fallback unknown routes to public site */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
