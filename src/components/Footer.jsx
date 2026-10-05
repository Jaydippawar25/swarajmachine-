import React from 'react';
import { Phone, MapPin, Clock, Award, PhoneCall, Mail } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/logo.png';

export default function Footer({ t, lang, onOpenQuote, settings }) {
  const data = t.footer;

  const phone = settings?.phone || t.nav.phone;
  const whatsappNumber = settings?.whatsappNumber || t.nav.whatsappNumber;
  const email = settings?.notificationEmail || settings?.email || data.email || t.nav.email || 'mkenterprises2325@gmail.com';
  const address = settings?.address || data.address;
  const sections = settings?.sections || {};

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-10 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-white rounded-xl p-1.5 shadow-md inline-block">
                <img 
                  src={logoImg} 
                  alt="SWARAJ MACHINERY'S" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {data.tagline}
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{data.badge}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {data.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              {sections.showcase !== false && <li><a href="#machine-showcase" className="hover:text-white transition">{t.nav.overview}</a></li>}
              {sections.comparison !== false && <li><a href="#comparison" className="hover:text-white transition">{t.nav.comparison}</a></li>}
              {sections.calculator !== false && <li><a href="#calculator" className="hover:text-white transition">{t.nav.calculator}</a></li>}
              {sections.process !== false && <li><a href="#process" className="hover:text-white transition">{t.nav.process}</a></li>}
              {sections.brochures !== false && <li><a href="#brochures" className="hover:text-white transition">{t.nav.brochure}</a></li>}
              {sections.testimonials !== false && <li><a href="#testimonials" className="hover:text-white transition">{lang === 'mr' ? 'अभिप्राय' : lang === 'hi' ? 'समीक्षा' : 'Reviews'}</a></li>}
              {sections.faq !== false && <li><a href="#faq" className="hover:text-white transition">{t.nav.faq}</a></li>}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {data.contactInfo}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition font-bold text-white">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-amber-400 flex-shrink-0 fill-current" />
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-white transition font-bold text-white text-left cursor-pointer"
                >
                  WhatsApp: {phone}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition font-medium text-white truncate">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{data.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Factory Booking CTA */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {data.bookDemo}
            </h4>
            <p className="text-xs text-slate-400">
              {data.bookDemoDesc}
            </p>
            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
            >
              {data.btnDemo}
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-slate-500">
          {data.copyright}
        </div>

      </div>
    </footer>
  );
}
