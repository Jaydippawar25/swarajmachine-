import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Loader2, KeyRound } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('mkenterprises2325@gmail.com');
  const [password, setPassword] = useState('Swaraj@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const { login, resetPassword, adminLang, setAdminLang, at } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(
        adminLang === 'mr' 
          ? 'कृपया ईमेल आणि पासवर्ड दोन्ही टाका' 
          : adminLang === 'hi' 
          ? 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें' 
          : 'Please enter both email and password'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success(
        adminLang === 'mr' 
          ? 'स्वराज्य ॲडमिन पॅनेलमध्ये स्वागत आहे!' 
          : adminLang === 'hi' 
          ? 'स्वराज एडमिन पैनल में आपका स्वागत है!' 
          : 'Welcome back to Swaraj Admin Panel!'
      );
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err.message || 
        (adminLang === 'mr' 
          ? 'लॉगिन अयशस्वी झाले. कृपया तपशील तपासा.' 
          : adminLang === 'hi' 
          ? 'लॉगिन विफल। कृपया क्रेडेंशियल जांचें।' 
          : 'Login failed. Please check credentials.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('mkenterprises2325@gmail.com');
    setPassword('Swaraj@2026');
    toast.success(adminLang === 'mr' ? 'मालक डेमो क्रेडेंशियल भरले गेले!' : 'Owner demo credentials filled!');
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error(adminLang === 'mr' ? 'कृपया आपला ईमेल टाका' : 'Please enter your email');
      return;
    }
    try {
      await resetPassword(resetEmail);
      toast.success(
        adminLang === 'mr' 
          ? 'पासवर्ड रीसेट लिंक पाठवली! आपला इनबॉक्स तपासा.' 
          : 'Password reset email sent! Check your inbox.'
      );
      setResetModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-10 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Dynamic atmospheric mesh background glows */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 85% 15%, rgba(6, 182, 212, 0.22) 0%, rgba(14, 165, 233, 0.12) 30%, transparent 60%),
            radial-gradient(circle at 15% 85%, rgba(245, 158, 11, 0.22) 0%, rgba(251, 191, 36, 0.12) 30%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.85) 0%, transparent 80%)
          `
        }}
      />

      {/* Modern High-Precision Dot-Grid Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1.4px, transparent 1.4px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Soft Ambient Corner Glows for Depth */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-cyan-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-amber-400/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Sparkle Accents Matching Mockup */}
      <div className="absolute bottom-24 right-8 sm:right-16 pointer-events-none opacity-40 text-amber-500 hidden sm:block">
        <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-28 left-8 sm:left-14 pointer-events-none opacity-30 text-teal-600 hidden sm:block">
        <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* Top Language Toggle & Live Website Link */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <a
          href="/"
          className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-[#0a3847] text-xs font-bold shadow-xs hover:border-slate-300 transition"
        >
          <span>{at.liveSite || 'थेट वेबसाइट'}</span>
        </a>

        <div className="flex items-center bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-1 text-xs shadow-xs">
          <button
            type="button"
            onClick={() => setAdminLang('mr')}
            className={`px-3 py-1 rounded-lg font-bold transition ${adminLang === 'mr' ? 'bg-[#f59e0b] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('hi')}
            className={`px-3 py-1 rounded-lg font-bold transition ${adminLang === 'hi' ? 'bg-[#f59e0b] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('en')}
            className={`px-3 py-1 rounded-lg font-bold transition ${adminLang === 'en' ? 'bg-[#f59e0b] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="w-full max-w-[430px] mx-auto relative z-10">
        {/* Brand Header & Logo Badge */}
        <div className="text-center">
          {/* Logo badge with prominent amber-to-teal dual gradient border */}
          <div className="p-[3px] rounded-[26px] bg-gradient-to-br from-[#f59e0b] via-[#eab308] via-45% to-[#0a3847] shadow-lg shadow-amber-500/15 inline-block mb-3.5 transition-transform hover:scale-105 duration-300">
            <div className="w-20 h-20 sm:w-22 sm:h-22 bg-white rounded-[23px] flex items-center justify-center p-2.5">
              <img 
                src={logoImg} 
                alt="Swaraj Machinery Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-[26px] font-black text-[#0a3847] tracking-wider leading-tight uppercase">
            SWARAJ MACHINERY'S
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-bold text-[#0a3847]">
            {at.loginSubtitle || 'सुरक्षित ॲडमिन कंट्रोल पॅनेल'}
          </p>
        </div>

        {/* Login Box with Crisp Dual Gradient Border (Amber on Top-Left, Teal on Bottom-Right) */}
        <div className="mt-6 sm:mt-7 relative group">
          {/* Soft ambient backlight behind card */}
          <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-[#0a3847]/20 rounded-[34px] blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Crisp 3.5px Dual-Tone Gradient Box Border */}
          <div className="p-[3.5px] rounded-[30px] bg-gradient-to-br from-[#f59e0b] via-[#eab308] via-45% to-[#0a3847] shadow-2xl shadow-slate-300/80 transition-all duration-300">
            <div className="bg-white rounded-[26.5px] p-6 sm:p-8 space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    {at.emailLabel || 'ईमेल पत्ता'}
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mkenterprises2325@gmail.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-800">
                      {at.passwordLabel || 'पासवर्ड'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setResetModalOpen(true)}
                      className="text-xs font-bold text-slate-800 hover:text-amber-700 transition cursor-pointer"
                    >
                      {at.forgotPassword || 'पासवर्ड विसरलात?'}
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs sm:text-sm placeholder-slate-400 tracking-wider focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Gold / Amber Action Button with ambient glow */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#eab308] hover:from-[#d97706] hover:to-[#ca8a04] text-slate-950 font-black text-xs sm:text-sm border border-amber-600/30 shadow-lg shadow-amber-400/40 hover:shadow-xl hover:shadow-amber-400/50 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>{at.signingIn || 'लॉगिन होत आहे...'}</span>
                    </>
                  ) : (
                    <span>{at.signInBtn || 'डॅशबोर्डवर लॉगिन करा'} →</span>
                  )}
                </button>
              </form>

              {/* Quick Demo Section */}
              <div className="pt-4 border-t border-slate-200/80 text-center space-y-2.5">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600">
                  <span className="text-amber-500 text-sm">⚡</span>
                  <span>{at.quickDemo || 'जलद ॲडमिन डेमो खाते:'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#eef2f6] hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200/80 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <span>{at.ownerDemo || '👑 मालक (Owner) डेमो - थेट लॉगिन'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-sm w-full text-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 text-amber-600">
              <KeyRound className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">
                {adminLang === 'mr' ? 'पासवर्ड रीसेट करा' : 'Reset Admin Password'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {adminLang === 'mr' 
                ? 'आपला नोंदणीकृत ईमेल पत्ता टाका. ईमेलवर पासवर्ड रीसेट लिंक पाठवली जाईल.' 
                : 'Enter your registered admin email address. A password reset link will be sent to your inbox.'}
            </p>
            <form onSubmit={handlePasswordReset} className="space-y-3">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="mkenterprises2325@gmail.com"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  {adminLang === 'mr' ? 'रद्द' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#f59e0b] text-slate-950 hover:bg-amber-400 transition shadow-xs cursor-pointer"
                >
                  {adminLang === 'mr' ? 'लिंक पाठवा' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
