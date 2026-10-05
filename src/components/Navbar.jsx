import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronRight, ArrowRight, PhoneCall } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/logo.png';
import partyPopperImg from '../assets/party-popper.png';

export default function Navbar({ lang, setLang, t, onOpenQuote, offers, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phone = settings?.phone || t.nav.phone;
  const whatsappNumber = settings?.whatsappNumber || t.nav.whatsappNumber;

  const sections = settings?.sections || {};

  const allNavLinks = [
    { href: '#machine-showcase', label: t.nav.overview, show: sections.showcase !== false },
    { href: '#comparison', label: t.nav.comparison, show: sections.comparison !== false },
    { href: '#calculator', label: t.nav.calculator, show: sections.calculator !== false },
    { href: '#process', label: t.nav.process, show: sections.process !== false },
    { href: '#brochures', label: t.nav.brochure, show: sections.brochures !== false },
    { href: '#testimonials', label: lang === 'mr' ? 'अभिप्राय' : lang === 'hi' ? 'समीक्षा' : 'Reviews', show: sections.testimonials !== false },
    { href: '#faq', label: t.nav.faq, show: sections.faq !== false },
  ];
  const navLinks = allNavLinks.filter(l => l.show);

  // Check offer expiry
  const isOfferExpired = offers?.hasExpiry && offers?.expiryDate && new Date(offers.expiryDate) < new Date();
  const showOfferBanner = (offers ? offers.enabled : true) && !isOfferExpired;

  const offerPrefix = offers?.prefix || t.nav.offerPrefix;
  const offerText = offers?.offerText || t.nav.offerText;
  const offerCta = offers?.ctaText || t.nav.offerCta;

  const handleWhatsapp = () => {
    if (onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <>
      {/* Top Urgent Offer Announcement Bar */}
      {showOfferBanner && (
        <div className="relative overflow-hidden bg-slate-950 text-white border-b border-amber-500/25 z-50 py-1.5 px-3 sm:px-4 text-xs">
          {/* Texture Image Layer at 50% Opacity */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none mix-blend-screen"
            style={{ backgroundImage: `url('/text-bg-texture.jpg')` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />

          <div className="relative z-10 max-w-[1440px] mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
            <div 
              onClick={onOpenQuote}
              className="flex items-center gap-2 sm:gap-2.5 min-w-0 cursor-pointer hover:text-amber-300 transition"
            >
              {/* Clearly Visible NEW Badge with Speaker Icon */}
              <div className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wider flex-shrink-0 shadow-xs">
                <span>📢</span>
                <span>NEW</span>
              </div>
              <span className="text-slate-600 select-none hidden sm:inline">|</span>

              {/* Announcement Text - Proper Bold & Crisp with Multi-Language Support */}
              <span className="text-white text-[11px] sm:text-xs font-bold truncate">
                <span>
                  {lang === 'mr'
                    ? 'आता अधिक प्रभावी उत्पादनासाठी — स्वराज मशीनरीची नवीन आधुनिक मॉडेल्स उपलब्ध!'
                    : lang === 'hi'
                    ? 'अब अधिक प्रभावी उत्पादन के लिए — स्वराज मशीनरी के नए आधुनिक मॉडल्स उपलब्ध!'
                    : 'For High-Yield Production — New Upgraded Swaraj Machinery Models Available!'}
                </span>
                <span className="hidden sm:inline text-slate-200">
                  {lang === 'mr'
                    ? ' \u00A0|\u00A0 🚚 संपूर्ण महाराष्ट्र होम डिलिव्हरी व इंस्टॉलेशन सुविधा'
                    : lang === 'hi'
                    ? ' \u00A0|\u00A0 🚚 पूरे महाराष्ट्र व भारत में होम डिलीवरी व इंस्टॉलेशन सुविधा'
                    : ' \u00A0|\u00A0 🚚 All-Maharashtra Delivery & Installation Support'}
                </span>
              </span>
            </div>

            {/* Clear Yellow/Orange Button with Multi-Language Support */}
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-black transition-all flex-shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>
                {lang === 'mr' ? 'अधिक माहिती' : lang === 'hi' ? 'अधिक जानकारी' : 'Learn More'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white py-2 sm:py-2.5 border-b border-slate-100'
      }`}>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 w-full">
            
            {/* Brand Logo & Name - Bold, Clear & Prominent */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <img 
                src={logoImg} 
                alt="SWARAJ MACHINERY'S" 
                className="h-11 sm:h-14 md:h-16 w-auto object-contain flex-shrink-0 hover:opacity-95 transition"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-black text-lg sm:text-2xl tracking-tight text-red-600">
                    SWARAJ
                  </span>
                  <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-900">
                    MACHINERY'S
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
                  <span className="text-[11px] sm:text-xs font-black text-brand-blue-700 uppercase tracking-wide">
                    {lang === 'hi' ? 'लड्डू मशीन' : lang === 'en' ? 'LADDU MACHINE' : 'लाडू मशीन'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden md:inline">
                    • {t.nav.tagline}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links - Single line, Whitespace-Nowrap */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-blue-600 hover:bg-slate-100/70 px-2 xl:px-2.5 py-1.5 rounded-lg transition whitespace-nowrap inline-block"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: Compact Language Switcher + Call + WhatsApp + Quote */}
            <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 flex-shrink-0 whitespace-nowrap">
              
              {/* Language Switcher: Hindi (Default) & English */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-bold flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-md transition ${lang === 'hi' ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('mr')}
                  className={`px-2 py-1 rounded-md transition ${lang === 'mr' ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  मराठी
                </button>
              </div>

              {/* Call Button */}
              <a
                href={`tel:${phone}`}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition whitespace-nowrap flex-shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-blue-600 flex-shrink-0" />
                <span>{t.nav.callUs}</span>
              </a>

              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsapp}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition whitespace-nowrap flex-shrink-0"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white flex-shrink-0" />
                <span>WhatsApp</span>
              </button>

              {/* Quote CTA */}
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-3 xl:px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-brand-blue-500/20 transition whitespace-nowrap flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span>{t.nav.getQuote}</span>
              </button>
            </div>

            {/* Mobile Controls (Language + Hamburger) */}
            <div className="flex sm:hidden items-center gap-1.5">
              <div className="flex items-center rounded border border-slate-200 text-[10px] font-bold p-0.5">
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2 py-0.5 rounded ${lang === 'hi' ? 'bg-brand-blue-600 text-white' : 'text-slate-600'}`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-brand-blue-600 text-white' : 'text-slate-600'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('mr')}
                  className={`px-1.5 py-0.5 rounded ${lang === 'mr' ? 'bg-brand-blue-600 text-white' : 'text-slate-600'}`}
                >
                  म
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 shadow-xl">
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-1.5 text-sm font-semibold text-slate-800 border-b border-slate-50"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-brand-blue-600 text-white py-2.5 rounded-xl text-xs font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.nav.getQuote}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleWhatsapp();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
