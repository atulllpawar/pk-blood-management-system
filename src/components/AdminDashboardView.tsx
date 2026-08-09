import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Clock, AlertTriangle, UserPlus, Search, FileText, 
  Trash2, ShieldCheck, LogOut, UserCheck, Check, X, RefreshCw, PlusCircle
} from 'lucide-react';
import { Donor, BloodRequest, AdminStats, ActiveTab, BloodGroup } from '../types';
import { CITIES_LIST } from '../data/mockData';

interface AdminDashboardViewProps {
  stats: AdminStats;
  donors: Donor[];
  requests: BloodRequest[];
  onApproveDonor: (id: string) => Promise<boolean>;
  onDeleteDonor: (id: string) => Promise<boolean>;
  onUpdateBloodRequestStatus: (id: string, status: 'Pending' | 'Fulfilled' | 'Cancelled') => Promise<boolean>;
  onAddDonor: (donorData: any) => Promise<boolean>;
  onLogout: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  stats,
  donors,
  requests,
  onApproveDonor,
  onDeleteDonor,
  onUpdateBloodRequestStatus,
  onAddDonor,
  onLogout,
  setActiveTab
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'pending' | 'donors' | 'requests' | 'add-donor'>('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('All Cities');

  // Add Donor Form State inside Admin
  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodGroup: 'A+' as BloodGroup,
    age: '28',
    gender: 'Male',
    mobile: '',
    city: 'Pune',
    email: '',
    autoApprove: true
  });
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  const pendingDonors = donors.filter(d => d.status === 'pending');
  const approvedDonors = donors.filter(d => d.status === 'approved');

  const filteredAllDonors = donors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchFilter.toLowerCase()) || d.mobile.includes(searchFilter);
    const matchCity = cityFilter === 'All Cities' || d.city.toLowerCase() === cityFilter.toLowerCase();
    return matchSearch && matchCity;
  });

  const handleAdminAddDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.mobile) return;

    const success = await onAddDonor({
      ...newDonor,
      age: Number(newDonor.age) || 25
    });

    if (success) {
      setAddSuccess(`Donor ${newDonor.name} (${newDonor.bloodGroup}) added successfully!`);
      setNewDonor({
        name: '',
        bloodGroup: 'A+',
        age: '28',
        gender: 'Male',
        mobile: '',
        city: 'Pune',
        email: '',
        autoApprove: true
      });
      setTimeout(() => setAddSuccess(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Header Card matching dashboard.html */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Super Admin Control Panel
          </div>
          <h2 className="text-2xl sm:text-4xl font-black">Welcome Admin</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Blood Donation, Request and Donor Management System
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 transition-colors"
          >
            Public Site
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            id="admin-logout-top-btn"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setAdminTab('donors')}
          className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:border-red-300 cursor-pointer transition-all"
        >
          <span className="text-xs font-extrabold uppercase text-slate-500">Total Donors</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalDonors}</p>
          <span className="text-[11px] text-slate-400">All registered records</span>
        </div>

        <div 
          onClick={() => setAdminTab('donors')}
          className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:border-emerald-300 cursor-pointer transition-all"
        >
          <span className="text-xs font-extrabold uppercase text-slate-500">Available Donors</span>
          <p className="text-3xl font-black text-emerald-600 mt-1">{stats.availableDonors}</p>
          <span className="text-[11px] text-slate-400">Approved & searchable</span>
        </div>

        <div 
          onClick={() => setAdminTab('requests')}
          className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:border-amber-300 cursor-pointer transition-all"
        >
          <span className="text-xs font-extrabold uppercase text-slate-500">Current Requests</span>
          <p className="text-3xl font-black text-amber-600 mt-1">{stats.totalRequests}</p>
          <span className="text-[11px] text-slate-400">Active hospital requests</span>
        </div>

        <div 
          onClick={() => setAdminTab('pending')}
          className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:border-rose-300 cursor-pointer transition-all relative overflow-hidden"
        >
          <span className="text-xs font-extrabold uppercase text-slate-500">Pending Donors</span>
          <p className="text-3xl font-black text-rose-600 mt-1">{stats.pendingDonors}</p>
          {stats.pendingDonors > 0 && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black animate-pulse">
              Needs Review
            </span>
          )}
          <span className="text-[11px] text-slate-400">Awaiting approval</span>
        </div>

      </div>

      {/* Management Navigation Action Buttons Strip matching dashboard.html */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Management Quick Actions</h3>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setAdminTab('add-donor')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
              adminTab === 'add-donor' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Donor</span>
          </button>

          <button
            onClick={() => setAdminTab('donors')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
              adminTab === 'donors' ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>View Donors ({donors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800`}
          >
            <Search className="w-4 h-4" />
            <span>Search Blood</span>
          </button>

          <button
            onClick={() => setActiveTab('request')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Blood Request Form</span>
          </button>

          <button
            onClick={() => setAdminTab('requests')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
              adminTab === 'requests' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>View Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('pending')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 relative ${
              adminTab === 'pending' ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Donors ({pendingDonors.length})</span>
            {pendingDonors.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Content Display */}

      {/* TAB 1: PENDING DONORS */}
      {adminTab === 'pending' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xl font-black text-slate-900">Pending Donors Approval</h3>
              <p className="text-xs text-slate-500">Verify and approve donor registrations to publish them live.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black">
              {pendingDonors.length} Pending
            </span>
          </div>

          {pendingDonors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-extrabold">
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5 text-center">Blood</th>
                    <th className="p-3.5">Age / Gender</th>
                    <th className="p-3.5">Mobile</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {pendingDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{donor.name}</td>
                      <td className="p-3.5 text-center">
                        <span className="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="p-3.5">{donor.age} yrs • {donor.gender}</td>
                      <td className="p-3.5 font-mono">{donor.mobile}</td>
                      <td className="p-3.5">{donor.city}</td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => onApproveDonor(donor.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => onDeleteDonor(donor.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800">No pending donor approvals!</p>
              <p className="text-xs">All registered blood donors have been verified and approved.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DONOR MANAGEMENT */}
      {(adminTab === 'donors' || adminTab === 'overview') && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xl font-black text-slate-900">Donor Management List</h3>
              <p className="text-xs text-slate-500">View, search, or remove donor accounts from database.</p>
            </div>

            {/* Search / Filter Inputs */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Search name/mobile..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-slate-50"
              />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-slate-50 font-bold"
              >
                {CITIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-700 text-white text-xs uppercase tracking-wider font-extrabold">
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5 text-center">Blood</th>
                  <th className="p-3.5">Age</th>
                  <th className="p-3.5">Gender</th>
                  <th className="p-3.5">Mobile</th>
                  <th className="p-3.5">City</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAllDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{donor.name}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium">{donor.age}</td>
                    <td className="p-3.5 font-medium">{donor.gender}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-800">{donor.mobile}</td>
                    <td className="p-3.5 font-semibold text-slate-700">{donor.city}</td>
                    <td className="p-3.5 text-center">
                      {donor.status === 'approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {donor.status === 'pending' && (
                          <button
                            onClick={() => onApproveDonor(donor.id)}
                            className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-bold"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteDonor(donor.id)}
                          className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REQUEST MANAGEMENT */}
      {adminTab === 'requests' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xl font-black text-slate-900">Blood Request Management</h3>
              <p className="text-xs text-slate-500">Track and fulfill hospital patient blood requests.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
              {requests.length} Total Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-extrabold">
                  <th className="p-3.5">Patient Name</th>
                  <th className="p-3.5 text-center">Blood</th>
                  <th className="p-3.5">Hospital</th>
                  <th className="p-3.5">City</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5 text-center">Urgency</th>
                  <th className="p-3.5 text-center">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{r.patientName}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs">
                        {r.bloodGroup} ({r.units} U)
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">{r.hospital}</td>
                    <td className="p-3.5 font-medium">{r.city}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      <div>{r.contactMobile}</div>
                      {r.smsNotifications && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-sans font-bold mt-0.5">
                          💬 SMS Alert Active
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        r.urgency === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.urgency}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      {r.status === 'Fulfilled' ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          ✓ Fulfilled
                        </span>
                      ) : (
                        <button
                          onClick={() => onUpdateBloodRequestStatus(r.id, 'Fulfilled')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow"
                        >
                          Mark Fulfilled
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ADD DONOR IN ADMIN */}
      {adminTab === 'add-donor' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-xl font-black text-slate-900">Admin - Add New Donor</h3>
            <p className="text-xs text-slate-500">Directly register a new blood donor into the database.</p>
          </div>

          {addSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              {addSuccess}
            </div>
          )}

          <form onSubmit={handleAdminAddDonorSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Donor Name</label>
                <input
                  type="text"
                  required
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-bold bg-slate-50"
                  placeholder="e.g. Ramesh Kulkarni"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Blood Group</label>
                <select
                  value={newDonor.bloodGroup}
                  onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value as BloodGroup })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-bold bg-slate-50"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={newDonor.mobile}
                  onChange={(e) => setNewDonor({ ...newDonor, mobile: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-mono font-bold bg-slate-50"
                  placeholder="e.g. 9822011223"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  value={newDonor.age}
                  onChange={(e) => setNewDonor({ ...newDonor, age: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City</label>
                <select
                  value={newDonor.city}
                  onChange={(e) => setNewDonor({ ...newDonor, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-bold bg-slate-50"
                >
                  {CITIES_LIST.filter(c => c !== 'All Cities').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              Save Donor Record
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
