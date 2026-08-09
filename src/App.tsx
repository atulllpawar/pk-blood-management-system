import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, Donor, BloodRequest, AdminStats } from './types';
import { INITIAL_DONORS, INITIAL_REQUESTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { SearchBloodView } from './components/SearchBloodView';
import { RegisterDonorView } from './components/RegisterDonorView';
import { RequestBloodView } from './components/RequestBloodView';
import { CompatibilityCalculatorView } from './components/CompatibilityCalculatorView';
import { AboutContactView } from './components/AboutContactView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { Footer } from './components/Footer';
import { Search, Heart, FileText, Activity, AlertTriangle, ShieldCheck, CheckCircle2, UserPlus, Phone, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // State Stores initialized from mock data
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [requests, setRequests] = useState<BloodRequest[]>(INITIAL_REQUESTS);
  const [stats, setStats] = useState<AdminStats>({
    totalDonors: INITIAL_DONORS.length,
    availableDonors: INITIAL_DONORS.filter(d => d.status === 'approved').length,
    pendingDonors: INITIAL_DONORS.filter(d => d.status === 'pending').length,
    totalRequests: INITIAL_REQUESTS.length,
    urgentRequests: INITIAL_REQUESTS.filter(r => r.urgency === 'Critical' || r.urgency === 'Urgent').length,
    fulfilledRequests: INITIAL_REQUESTS.filter(r => r.status === 'Fulfilled').length
  });

  // Calculate live stats
  const refreshStatsLocally = useCallback((currDonors: Donor[], currRequests: BloodRequest[]) => {
    setStats({
      totalDonors: currDonors.length,
      availableDonors: currDonors.filter(d => d.status === 'approved').length,
      pendingDonors: currDonors.filter(d => d.status === 'pending').length,
      totalRequests: currRequests.length,
      urgentRequests: currRequests.filter(r => (r.urgency === 'Critical' || r.urgency === 'Urgent') && r.status === 'Pending').length,
      fulfilledRequests: currRequests.filter(r => r.status === 'Fulfilled').length
    });
  }, []);

  // Fetch API data from Express backend
  const fetchAllData = useCallback(async () => {
    try {
      const [donorsRes, requestsRes, statsRes] = await Promise.all([
        fetch('/api/donors'),
        fetch('/api/requests'),
        fetch('/api/stats')
      ]);

      if (donorsRes.ok) {
        const dData = await donorsRes.json();
        setDonors(dData);
      }
      if (requestsRes.ok) {
        const rData = await requestsRes.json();
        setRequests(rData);
      }
      if (statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData);
      }
    } catch (err) {
      console.log('Using local client state');
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Secret URL check: ?admin=true or #admin
    if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
      setActiveTab('login');
    }

    // Secret Keyboard Shortcut: Ctrl + Shift + A to open Admin Login
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveTab('login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fetchAllData]);

  // Handlers
  const handleRegisterDonor = async (donorData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData)
      });

      if (res.ok) {
        const newDonor = await res.json();
        const updated = [newDonor, ...donors];
        setDonors(updated);
        refreshStatsLocally(updated, requests);
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    // Client fallback
    const fallbackDonor: Donor = {
      id: `DNR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: donorData.name,
      bloodGroup: donorData.bloodGroup,
      age: donorData.age,
      gender: donorData.gender,
      mobile: donorData.mobile,
      city: donorData.city,
      status: donorData.autoApprove ? 'approved' : 'pending',
      registeredAt: new Date().toISOString().split('T')[0],
      email: donorData.email
    };
    const updated = [fallbackDonor, ...donors];
    setDonors(updated);
    refreshStatsLocally(updated, requests);
    return true;
  };

  const handleRequestBlood = async (requestData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (res.ok) {
        const newReq = await res.json();
        const updatedReqs = [newReq, ...requests];
        setRequests(updatedReqs);
        refreshStatsLocally(donors, updatedReqs);
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    const fallbackReq: BloodRequest = {
      id: `REQ-${Math.floor(5000 + Math.random() * 9000)}`,
      patientName: requestData.patientName,
      bloodGroup: requestData.bloodGroup,
      hospital: requestData.hospital,
      city: requestData.city,
      units: requestData.units,
      urgency: requestData.urgency,
      contactMobile: requestData.contactMobile,
      status: 'Pending',
      requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: requestData.notes,
      smsNotifications: requestData.smsNotifications !== undefined ? Boolean(requestData.smsNotifications) : true
    };
    const updatedReqs = [fallbackReq, ...requests];
    setRequests(updatedReqs);
    refreshStatsLocally(donors, updatedReqs);
    return true;
  };

  const handleApproveDonor = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/donors/${id}/approve`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    const updated = donors.map(d => d.id === id ? { ...d, status: 'approved' as const } : d);
    setDonors(updated);
    refreshStatsLocally(updated, requests);
    return true;
  };

  const handleDeleteDonor = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/donors/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
    const updated = donors.filter(d => d.id !== id);
    setDonors(updated);
    refreshStatsLocally(updated, requests);
    return true;
  };

  const handleUpdateBloodRequestStatus = async (id: string, status: 'Pending' | 'Fulfilled' | 'Cancelled'): Promise<boolean> => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    }
    const updatedReqs = requests.map(r => r.id === id ? { ...r, status } : r);
    setRequests(updatedReqs);
    refreshStatsLocally(donors, updatedReqs);
    return true;
  };

  const handleLogin = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      if (res.ok) {
        setIsAdminLoggedIn(true);
        setActiveTab('admin-dashboard');
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    if ((username === 'admin' && pass === 'admin123') || (username === 'pkadmin' && pass === 'pk123')) {
      setIsAdminLoggedIn(true);
      setActiveTab('admin-dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveTab('home');
  };

  const pendingCount = donors.filter(d => d.status === 'pending').length;
  const urgentCount = requests.filter(r => (r.urgency === 'Critical' || r.urgency === 'Urgent') && r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-red-500 selection:text-white">
      
      {/* Sticky Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Card Container */}
            <HeroSection setActiveTab={setActiveTab} urgentCount={urgentCount} />

            {/* Statistics Bar */}
            <StatsBar stats={stats} setActiveTab={setActiveTab} />

            {/* Quick Action Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    PK Blood Services
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    How Can We Help You Today?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select an action below to find matching blood donors, post emergency requirements, or register yourself.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Search Blood */}
                  <div 
                    onClick={() => setActiveTab('search')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl hover:scale-102 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center font-bold shadow-md group-hover:rotate-6 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">Search Blood Donor</h3>
                      <p className="text-xs text-red-100/90 mt-1">
                        Instantly filter verified donors by blood group (A+, B+, O-, AB+) and city location.
                      </p>
                    </div>
                    <div className="pt-2 text-xs font-extrabold text-amber-200 flex items-center gap-1">
                      <span>Browse Donors List</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Card 2: Register Donor */}
                  <div 
                    onClick={() => setActiveTab('register')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white shadow-xl hover:scale-102 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md group-hover:rotate-6 transition-transform">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">Register as Donor</h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Join our life-saving voluntary donor community. Simple 2-minute registration process.
                      </p>
                    </div>
                    <div className="pt-2 text-xs font-extrabold text-amber-400 flex items-center gap-1">
                      <span>Become a Life Saver</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Card 3: Request Blood */}
                  <div 
                    onClick={() => setActiveTab('request')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-rose-600 via-amber-600 to-red-600 text-white shadow-xl hover:scale-102 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 flex items-center justify-center font-bold shadow-md group-hover:rotate-6 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">Request Blood Unit</h3>
                      <p className="text-xs text-red-100/90 mt-1">
                        Submit patient, hospital, and urgency details to alert nearby donors and admins immediately.
                      </p>
                    </div>
                    <div className="pt-2 text-xs font-extrabold text-white flex items-center gap-1">
                      <span>Post Hospital Request</span>
                      <span>→</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Emergency Blood Requests Live Feed */}
            {requests.filter(r => r.status === 'Pending').length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                      <h3 className="text-lg font-black text-slate-900">Active Emergency Blood Requests</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('request')}
                      className="text-xs font-extrabold text-red-600 hover:underline"
                    >
                      Post New Request
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requests.filter(r => r.status === 'Pending').slice(0, 4).map((req) => (
                      <div 
                        key={req.id} 
                        className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-xs">
                              {req.bloodGroup} ({req.units} U)
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              req.urgency === 'Critical' ? 'bg-red-800 text-white' : 'bg-amber-200 text-amber-900'
                            }`}>
                              {req.urgency}
                            </span>
                          </div>
                          <p className="font-black text-slate-900 text-sm">{req.patientName}</p>
                          <p className="text-xs text-slate-600 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-red-500" />
                            {req.hospital}, {req.city}
                          </p>
                        </div>

                        <a
                          href={`tel:${req.contactMobile.replace(/\s+/g, '')}`}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow shrink-0"
                        >
                          Call Contact
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Quick Compatibility Guide Teaser */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
                    <Activity className="w-4 h-4 text-amber-400" />
                    Transfusion Rules & AI Assistant
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">Not sure which blood group can be matched?</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Check our Universal Donor & Recipient compatibility chart or use Gemini AI for instant medical protocol matching.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all shrink-0"
                >
                  Open Blood Compatibility Guide
                </button>
              </div>
            </section>

          </div>
        )}

        {/* SEARCH BLOOD VIEW */}
        {activeTab === 'search' && (
          <SearchBloodView
            donors={donors}
            setActiveTab={setActiveTab}
            onRefreshDonors={fetchAllData}
          />
        )}

        {/* REGISTER DONOR VIEW */}
        {activeTab === 'register' && (
          <RegisterDonorView
            onRegisterDonor={handleRegisterDonor}
            setActiveTab={setActiveTab}
          />
        )}

        {/* REQUEST BLOOD VIEW */}
        {activeTab === 'request' && (
          <RequestBloodView
            onRequestBlood={handleRequestBlood}
            setActiveTab={setActiveTab}
          />
        )}

        {/* COMPATIBILITY & AI ASSISTANT VIEW */}
        {activeTab === 'compatibility' && (
          <CompatibilityCalculatorView
            donors={donors}
            setActiveTab={setActiveTab}
          />
        )}

        {/* ABOUT VIEW */}
        {(activeTab === 'about' || activeTab === 'contact') && (
          <AboutContactView setActiveTab={setActiveTab} />
        )}

        {/* ADMIN LOGIN VIEW */}
        {activeTab === 'login' && !isAdminLoggedIn && (
          <AdminLoginView
            onLogin={handleLogin}
            setActiveTab={setActiveTab}
          />
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {(activeTab === 'admin-dashboard' ||
          activeTab === 'admin-donors' ||
          activeTab === 'admin-pending' ||
          activeTab === 'admin-requests' ||
          activeTab === 'admin-add-donor' ||
          (activeTab === 'login' && isAdminLoggedIn)) && (
          isAdminLoggedIn ? (
            <AdminDashboardView
              stats={stats}
              donors={donors}
              requests={requests}
              onApproveDonor={handleApproveDonor}
              onDeleteDonor={handleDeleteDonor}
              onUpdateBloodRequestStatus={handleUpdateBloodRequestStatus}
              onAddDonor={handleRegisterDonor}
              onLogout={handleLogout}
              setActiveTab={setActiveTab}
            />
          ) : (
            <AdminLoginView
              onLogin={handleLogin}
              setActiveTab={setActiveTab}
            />
          )
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} isAdminLoggedIn={isAdminLoggedIn} />

    </div>
  );
}

function Building2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
