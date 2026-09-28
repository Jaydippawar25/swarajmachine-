import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const LOCAL_LEADS_KEY = 'swaraj_crm_leads';

const INITIAL_SAMPLE_LEADS = [];

export const leadService = {
  // Get all leads
  async getLeads() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn('Failed to fetch leads from Firestore, using local fallback:', err);
      }
    }

    // Local Storage fallback
    const stored = localStorage.getItem(LOCAL_LEADS_KEY);
    if (!stored) {
      return [];
    }
    try {
      const parsed = JSON.parse(stored);
      // Remove any dummy sample leads (e.g. lead-001 to lead-005)
      const cleaned = Array.isArray(parsed)
        ? parsed.filter(l => !l.id?.startsWith('lead-00'))
        : [];
      if (cleaned.length !== (Array.isArray(parsed) ? parsed.length : 0)) {
        localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      return [];
    }
  },

  // Save a new lead (from public site)
  async saveLead(leadData) {
    const newLead = {
      name: leadData.name || 'Anonymous',
      mobile: leadData.mobile || '',
      city: leadData.city || '',
      state: leadData.state || '',
      businessType: leadData.businessType || 'shg',
      language: leadData.language || 'hi',
      source: leadData.source || 'Website',
      status: leadData.status || 'new',
      notes: leadData.notes || '',
      followUpDate: leadData.followUpDate || '',
      createdAt: leadData.createdAt || new Date().toISOString(),
      details: leadData.details || {},
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'leads'), {
          ...newLead,
          serverTimestamp: serverTimestamp(),
        });
        return { id: docRef.id, ...newLead };
      } catch (err) {
        console.warn('Failed to save lead to Firestore, saving locally:', err);
      }
    }

    // Local save
    const leads = await this.getLeads();
    const leadWithId = { id: 'lead-' + Date.now(), ...newLead };
    leads.unshift(leadWithId);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads));
    return leadWithId;
  },

  // Update lead
  async updateLead(id, updates) {
    if (isFirebaseConfigured && db) {
      try {
        const leadRef = doc(db, 'leads', id);
        await updateDoc(leadRef, updates);
      } catch (err) {
        console.warn('Failed to update lead in Firestore:', err);
      }
    }

    const leads = await this.getLeads();
    const updated = leads.map(l => (l.id === id ? { ...l, ...updates } : l));
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));
    return true;
  },

  // Delete lead
  async deleteLead(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'leads', id));
      } catch (err) {
        console.warn('Failed to delete lead from Firestore:', err);
      }
    }

    const leads = await this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(filtered));
    return true;
  },

  // Export CSV
  exportCSV(leads) {
    const headers = ['ID', 'Name', 'Mobile', 'City', 'State', 'Business Type', 'Status', 'Source', 'Follow-up Date', 'Created Date', 'Notes'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.name || ''}"`,
      `"${l.mobile || ''}"`,
      `"${l.city || ''}"`,
      `"${l.state || ''}"`,
      `"${l.businessType || ''}"`,
      `"${l.status || ''}"`,
      `"${l.source || ''}"`,
      `"${l.followUpDate || ''}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `swaraj_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
