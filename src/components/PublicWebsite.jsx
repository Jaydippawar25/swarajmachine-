import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../admin/hooks/useSiteContent';
import Navbar from './Navbar';
import Hero from './Hero';
import MachineShowcase from './MachineShowcase';
import Comparison from './Comparison';
import RoiCalculator from './RoiCalculator';
import WorkingProcess from './WorkingProcess';
import TargetAudience from './TargetAudience';
import BrochureGallery from './BrochureGallery';
import Testimonials from './Testimonials';
import Faq from './Faq';
import Footer from './Footer';
import LeadModal from './LeadModal';
import FloatingWhatsapp from './FloatingWhatsapp';
import { Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PublicWebsite() {
  const [lang, setLang] = useState('hi'); // Default: 'hi' (Hindi), with 'en' (English) & 'mr' (Marathi)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { 
    content: t, 
    settings, 
    offers, 
    specs, 
    brochures, 
    faqs, 
    testimonials, 
    calculatorSettings 
  } = useSiteContent(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Update SEO Meta Tags from admin settings
  useEffect(() => {
    if (settings?.seo?.title) {
      document.title = settings.seo.title;
    }
    if (settings?.seo?.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', settings.seo.description);
      }
    }
  }, [settings]);

  // Handle Maintenance Mode
  if (settings?.maintenanceMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center mb-6 shadow-xl">
          <Wrench className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black mb-3">
          {lang === 'mr' ? 'वेबसाइट देखभाल सुरू आहे' : lang === 'hi' ? 'वेबसाइट रखरखाव जारी है' : 'Under Scheduled Maintenance'}
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
          {lang === 'mr' 
            ? 'आम्ही नवीन अपडेट्स आणि सुधारणा करत आहोत. कृपया काही वेळात पुन्हा भेट द्या.' 
            : lang === 'hi'
            ? 'हम नई अपडेट्स और सुधार कर रहे हैं। कृपया कुछ समय बाद पुनः प्रयास करें।'
            : 'We are performing scheduled maintenance and updates. We will be back shortly.'}
        </p>
        <a 
          href="/admin" 
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 px-5 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'mr' ? 'ॲडमिन पॅनेल लॉगिन' : 'Admin Panel Login'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  const sections = settings?.sections || {};

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-x-hidden w-full relative ${lang !== 'en' ? 'font-devanagari' : ''} pb-14 sm:pb-0`}>
      {/* Top Navbar with dynamic offers and settings */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onOpenQuote={() => setIsQuoteOpen(true)} 
        offers={offers}
        settings={settings}
      />

      {/* Main Flow */}
      <main className="flex-1 relative">
        {/* 1. Hero Section - Crisp & 100% Unobstructed Video (NO texture) */}
        {sections.hero !== false && (
          <Hero 
            t={t} 
            lang={lang} 
            onOpenQuote={() => setIsQuoteOpen(true)} 
          />
        )}

        {/* 2. All Sections Below Hero: From Machine Showcase down to the very end with 50% opacity texture */}
        <div className="relative">
          {/* Continuous Texture Background at 50% Opacity behind all text sections */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 bg-cover bg-top bg-repeat-y opacity-50"
            style={{ 
              backgroundImage: `url('/text-bg-texture.jpg')`,
              backgroundSize: '100% auto',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Machine Showcase: Media Gallery & Verified Specs */}
            {sections.showcase !== false && (
              <MachineShowcase 
                t={t} 
                lang={lang} 
                onOpenQuote={() => setIsQuoteOpen(true)} 
                specs={specs}
                settings={settings}
              />
            )}

            {/* Manual vs Machine: Commercial Comparison */}
            {sections.comparison !== false && (
              <Comparison 
                t={t} 
                lang={lang} 
                onOpenQuote={() => setIsQuoteOpen(true)} 
              />
            )}

            {/* Interactive Earnings & Net Profit Predictor */}
            {sections.calculator !== false && (
              <RoiCalculator 
                t={t} 
                lang={lang} 
                onOpenQuote={() => setIsQuoteOpen(true)} 
                calculatorSettings={calculatorSettings}
              />
            )}

            {/* 3 Simple Operation Steps */}
            {sections.process !== false && (
              <WorkingProcess 
                t={t} 
                lang={lang} 
                onOpenQuote={() => setIsQuoteOpen(true)} 
              />
            )}

            {/* Target Audience: Bachat Gat, Sweet Shops, Startups */}
            {sections.targetAudience !== false && (
              <TargetAudience 
                t={t} 
                lang={lang} 
                onOpenQuote={() => setIsQuoteOpen(true)} 
              />
            )}

            {/* Official Catalogues & Lightbox */}
            {sections.brochures !== false && (
              <BrochureGallery 
                t={t} 
                lang={lang} 
                brochures={brochures}
                settings={settings}
              />
            )}

            {/* Customer Testimonials & Reviews */}
            {sections.testimonials !== false && (
              <Testimonials 
                testimonials={testimonials} 
                lang={lang} 
              />
            )}

            {/* Essential Buyer FAQs */}
            {sections.faq !== false && (
              <Faq 
                t={t} 
                lang={lang} 
                faqs={faqs}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        t={t} 
        lang={lang} 
        onOpenQuote={() => setIsQuoteOpen(true)} 
        settings={settings}
      />

      {/* Quotation Lead Request Modal */}
      <LeadModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        t={t} 
        lang={lang} 
      />

      {/* Floating WhatsApp on Desktop + Sticky Quick-Action Bar on Mobile */}
      <FloatingWhatsapp 
        t={t} 
        lang={lang} 
        onOpenQuote={() => setIsQuoteOpen(true)} 
        settings={settings}
      />
    </div>
  );
}
