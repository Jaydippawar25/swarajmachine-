import React, { useState } from 'react';
import { translations } from '../data/translations';
import Navbar from './Navbar';
import Hero from './Hero';
import MachineShowcase from './MachineShowcase';
import Comparison from './Comparison';
import RoiCalculator from './RoiCalculator';
import WorkingProcess from './WorkingProcess';
import TargetAudience from './TargetAudience';
import BrochureGallery from './BrochureGallery';
import Faq from './Faq';
import Footer from './Footer';
import LeadModal from './LeadModal';
import FloatingWhatsapp from './FloatingWhatsapp';

export default function PublicWebsite() {
  const [lang, setLang] = useState('hi'); // Default: 'hi' (Hindi), with 'en' (English) & 'mr' (Marathi)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.hi || translations.mr;

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-x-hidden w-full ${lang !== 'en' ? 'font-devanagari' : ''} pb-14 sm:pb-0`}>
      {/* Top Navbar */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onOpenQuote={() => setIsQuoteOpen(true)} 
      />

      {/* Main Flow */}
      <main className="flex-1">
        {/* High-Impact Sales Hero with Live Video Background & Immediate CTAs */}
        <Hero 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* Machine Showcase: Real Media Gallery (Tray Model, Front View, Video) & Verified Specs Table */}
        <MachineShowcase 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* Manual vs Machine: Commercial Pain Points vs 10x Speed & Savings */}
        <Comparison 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* Interactive Earnings & Net Profit Predictor */}
        <RoiCalculator 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* 3 Simple Operation Steps & High-Margin Products */}
        <WorkingProcess 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* Who is Earning With This Machine? (SHG, Sweet Shops, Startups) */}
        <TargetAudience 
          t={t} 
          lang={lang} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
        />

        {/* Official Catalogues & Flyer Lightbox with WhatsApp PDF Request */}
        <BrochureGallery 
          t={t} 
          lang={lang} 
        />

        {/* Essential Buyer FAQs */}
        <Faq 
          t={t} 
          lang={lang} 
        />
      </main>

      {/* Footer */}
      <Footer 
        t={t} 
        lang={lang} 
        onOpenQuote={() => setIsQuoteOpen(true)} 
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
      />
    </div>
  );
}
