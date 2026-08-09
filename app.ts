import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_DONORS, INITIAL_REQUESTS } from './src/data/mockData';
import { Donor, BloodRequest, BloodGroup } from './src/types';

export const app = express();

app.use(express.json());

// In-memory data persistence initialized from mock data
let donorsStore: Donor[] = [...INITIAL_DONORS];
let requestsStore: BloodRequest[] = [...INITIAL_REQUESTS];

// ================= API ENDPOINTS =================

// Healthcheck
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get Admin / System Stats
app.get('/api/stats', (_req, res) => {
  const totalDonors = donorsStore.length;
  const availableDonors = donorsStore.filter(d => d.status === 'approved').length;
  const pendingDonors = donorsStore.filter(d => d.status === 'pending').length;
  const totalRequests = requestsStore.length;
  const urgentRequests = requestsStore.filter(r => (r.urgency === 'Critical' || r.urgency === 'Urgent') && r.status === 'Pending').length;
  const fulfilledRequests = requestsStore.filter(r => r.status === 'Fulfilled').length;

  res.json({
    totalDonors,
    availableDonors,
    pendingDonors,
    totalRequests,
    urgentRequests,
    fulfilledRequests
  });
});

// Get Donors with optional query filters
app.get('/api/donors', (req, res) => {
  const { bloodGroup, city, status, search } = req.query;

  let filtered = [...donorsStore];

  if (status) {
    filtered = filtered.filter(d => d.status === status);
  }

  if (bloodGroup && bloodGroup !== 'All' && bloodGroup !== '') {
    filtered = filtered.filter(d => d.bloodGroup === bloodGroup);
  }

  if (city && city !== 'All Cities' && city !== '') {
    filtered = filtered.filter(d => d.city.toLowerCase() === (city as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.mobile.includes(q)
    );
  }

  res.json(filtered);
});

// Add / Register Donor
app.post('/api/donors', (req, res) => {
  const { name, bloodGroup, age, gender, mobile, city, email, notes, autoApprove } = req.body;

  if (!name || !bloodGroup || !mobile || !city) {
    return res.status(400).json({ error: 'Name, blood group, mobile, and city are required.' });
  }

  const newDonor: Donor = {
    id: `DNR-${Math.floor(1000 + Math.random() * 9000)}`,
    name: String(name).trim(),
    bloodGroup: bloodGroup as BloodGroup,
    age: Number(age) || 25,
    gender: (gender as 'Male' | 'Female' | 'Other') || 'Male',
    mobile: String(mobile).trim(),
    city: String(city).trim(),
    status: autoApprove ? 'approved' : 'pending',
    registeredAt: new Date().toISOString().split('T')[0],
    email: email ? String(email).trim() : undefined,
    notes: notes ? String(notes).trim() : undefined,
    totalDonations: 0
  };

  donorsStore.unshift(newDonor);
  res.status(201).json(newDonor);
});

// Approve Pending Donor
app.post('/api/donors/:id/approve', (req, res) => {
  const { id } = req.params;
  const donor = donorsStore.find(d => d.id === id);

  if (!donor) {
    return res.status(404).json({ error: 'Donor not found' });
  }

  donor.status = 'approved';
  res.json(donor);
});

// Delete Donor
app.delete('/api/donors/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = donorsStore.length;
  donorsStore = donorsStore.filter(d => d.id !== id);

  if (donorsStore.length === initialLength) {
    return res.status(404).json({ error: 'Donor not found' });
  }

  res.json({ message: 'Donor removed successfully', id });
});

// Get Blood Requests
app.get('/api/requests', (req, res) => {
  const { bloodGroup, city, urgency, status } = req.query;

  let filtered = [...requestsStore];

  if (status) {
    filtered = filtered.filter(r => r.status === status);
  }

  if (bloodGroup && bloodGroup !== 'All') {
    filtered = filtered.filter(r => r.bloodGroup === bloodGroup);
  }

  if (city && city !== 'All Cities') {
    filtered = filtered.filter(r => r.city.toLowerCase() === (city as string).toLowerCase());
  }

  if (urgency) {
    filtered = filtered.filter(r => r.urgency === urgency);
  }

  res.json(filtered);
});

// Create Blood Request
app.post('/api/requests', (req, res) => {
  const { patientName, bloodGroup, hospital, city, units, urgency, contactMobile, notes, smsNotifications } = req.body;

  if (!patientName || !bloodGroup || !hospital || !city || !contactMobile) {
    return res.status(400).json({ error: 'Patient name, blood group, hospital, city, and contact mobile are required.' });
  }

  const newRequest: BloodRequest = {
    id: `REQ-${Math.floor(5000 + Math.random() * 9000)}`,
    patientName: String(patientName).trim(),
    bloodGroup: bloodGroup as BloodGroup,
    hospital: String(hospital).trim(),
    city: String(city).trim(),
    units: Number(units) || 1,
    urgency: (urgency as 'Critical' | 'Urgent' | 'Standard') || 'Standard',
    contactMobile: String(contactMobile).trim(),
    status: 'Pending',
    requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    notes: notes ? String(notes).trim() : undefined,
    smsNotifications: smsNotifications !== undefined ? Boolean(smsNotifications) : true
  };

  requestsStore.unshift(newRequest);
  res.status(201).json(newRequest);
});

// Update Request Status (Fulfill/Cancel)
app.patch('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = requestsStore.find(r => r.id === id);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  if (status) {
    request.status = status;
  }

  res.json(request);
});

// Admin Login Authentication Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'atulll.pawar' && password === '9922209136') {
    return res.json({
      success: true,
      token: 'pk-admin-jwt-token-998822',
      user: { name: 'Atull Pawar (PK Admin)', role: 'Super Admin', email: 'atulllpawar2302@gmail.com' }
    });
  }

  res.status(401).json({ success: false, error: 'Invalid admin username or password' });
});

// Server-side AI Matching & Advice endpoint using Gemini API
app.post('/api/ai/match', async (req, res) => {
  const { patientBloodGroup, city, urgency, hospital } = req.body;

  const exactDonors = donorsStore.filter(
    d => d.status === 'approved' && d.bloodGroup === patientBloodGroup && d.city.toLowerCase() === (city || '').toLowerCase()
  );

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      matchSummary: `Found ${exactDonors.length} direct matching donors for ${patientBloodGroup} in ${city || 'your area'}.`,
      exactDonors,
      aiAdvice: `Emergency Protocol: For blood type ${patientBloodGroup}, compatible donors include ${
        patientBloodGroup === 'O-' ? 'O- only' : 'O-, ' + patientBloodGroup
      }. Contact donors immediately or place an urgent request on PK Blood Management System.`
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the AI Medical Assistant for PK Blood Management System.
A emergency request was received for Patient Blood Type: ${patientBloodGroup}, City: ${city || 'Unknown'}, Hospital: ${hospital || 'General Hospital'}, Urgency Level: ${urgency || 'Urgent'}.

Provide a concise 3-bullet medical advice for blood bank coordination, compatibility guidance, and rapid donor outreach steps. Keep it professional, reassuring, and clear.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({
      matchSummary: `Found ${exactDonors.length} direct matching donors for ${patientBloodGroup} in ${city || 'your area'}.`,
      exactDonors,
      aiAdvice: response.text
    });
  } catch (err: any) {
    console.error('Gemini API Error:', err?.message || err);
    res.json({
      matchSummary: `Found ${exactDonors.length} direct matching donors for ${patientBloodGroup} in ${city || 'your area'}.`,
      exactDonors,
      aiAdvice: `Blood Type ${patientBloodGroup} Compatibility Guidance: Prioritize ${patientBloodGroup} or universal donor O- in emergency situations. Ensure cross-matching before transfusion.`
    });
  }
});
