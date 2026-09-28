import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, Save, Star, CheckCircle2 } from 'lucide-react';
import { contentService, defaultTestimonials } from '../services/contentService';
import { activityService } from '../services/activityService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const { user, at, adminLang } = useAuth();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const data = await contentService.getTestimonials();
    if (data) setTestimonials(data);
  };

  const handleAdd = () => {
    setTestimonials([
      {
        id: 'test-' + Date.now(),
        name: adminLang === 'mr' ? 'नवीन ग्राहक / बचत गट' : adminLang === 'hi' ? 'नया ग्राहक / स्वयं सहायता समूह' : 'New Customer / Bachat Gat',
        city: 'Maharashtra, India',
        text: adminLang === 'mr' ? 'मशीनची गुणवत्ता आणि गती खूप चांगली आहे. वेळेवर डिलिव्हरी मिळाली.' : adminLang === 'hi' ? 'मशीन की गुणवत्ता और गति बहुत अच्छी है। समय पर डिलीवरी मिली।' : 'The machine build quality and speed is excellent. Got on-time delivery.',
        rating: 5,
        businessType: 'Bachat Gat',
        verified: true
      },
      ...testimonials
    ]);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success(adminLang === 'mr' ? 'अभिप्राय काढला गेला' : adminLang === 'hi' ? 'समीक्षा हटा दी गई' : 'Testimonial removed');
  };

  const handleSave = async () => {
    await contentService.saveTestimonials(testimonials);
    await activityService.log('testimonials_update', `Updated ${testimonials.length} customer reviews`, user);
    toast.success(adminLang === 'mr' ? 'अभिप्राय यशस्वीरीत्या सेव्ह झाले!' : adminLang === 'hi' ? 'समीक्षाएं सफलतापूर्वक सेव हुईं!' : 'Testimonials saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-brand-blue-700" />
            <span>{at.testimonialsTitle || 'Customer Testimonials & Case Studies'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {at.testimonialsSubtitle || 'Manage genuine customer reviews from Self-Help Groups and Sweet Shop owners.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{at.addReview || 'Add Review'}</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{at.saveReviews || 'Save Reviews'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={3}
              value={t.text}
              onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, text: e.target.value } : item))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed font-medium"
            />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <input
                type="text"
                value={t.name}
                onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, name: e.target.value } : item))}
                placeholder="Customer or Group Name"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
              <input
                type="text"
                value={t.city}
                onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, city: e.target.value } : item))}
                placeholder="City, State"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
