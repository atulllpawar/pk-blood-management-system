import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, MessageSquare, AlertCircle, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';
import { Donor, BloodGroup, ActiveTab } from '../types';
import { CITIES_LIST } from '../data/mockData';

interface SearchBloodViewProps {
  donors: Donor[];
  setActiveTab: (tab: ActiveTab) => void;
  onRefreshDonors: () => void;
}

export const SearchBloodView: React.FC<SearchBloodViewProps> = ({
  donors,
  setActiveTab,
  onRefreshDonors
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [contactedDonorId, setContactedDonorId] = useState<string | null>(null);

  useEffect(() => {
    let result = donors.filter(d => d.status === 'approved');

    if (selectedBloodGroup !== 'All' && selectedBloodGroup !== '') {
      result = result.filter(d => d.bloodGroup === selectedBloodGroup);
    }

    if (selectedCity !== 'All Cities' && selectedCity !== '') {
      result = result.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.mobile.includes(q)
      );
    }

    setFilteredDonors(result);
  }, [selectedBloodGroup, selectedCity, searchTerm, donors]);

  const handleContactClick = (donor: Donor) => {
    setContactedDonorId(donor.id);
    setTimeout(() => {
      setContactedDonorId(null);
    }, 3000);
  };

  const bloodGroupsList: (BloodGroup | 'All')[] = [
    'All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Search Header Container */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-widest text-amber-200">
            Real-time Donor Directory
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Search Blood Donors
          </h2>
          <p className="text-sm sm:text-base text-red-100/90">
            Find registered voluntary blood donors nearby by selecting blood group and city.
          </p>
        </div>

        {/* Search Controls Form Card */}
        <div className="mt-6 bg-white p-4 sm:p-6 rounded-2xl shadow-2xl text-slate-800 border border-red-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Blood Group Select */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Blood Group
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900 transition-all"
                id="search-blood-group-select"
              >
                {bloodGroupsList.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg === 'All' ? 'Select Blood Group (All)' : `Blood Group ${bg}`}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900 transition-all"
                id="search-city-select"
              >
                {CITIES_LIST.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Search Name / Mobile
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Prajwal, Pune..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm bg-slate-50 text-slate-900 transition-all"
                  id="search-keyword-input"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

          </div>

          {/* Quick Blood Group Buttons Pill Strip */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Quick Select:</span>
            {bloodGroupsList.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBloodGroup(bg)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
                  selectedBloodGroup === bg
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 hover:bg-red-50 text-slate-700 border border-slate-200'
                }`}
              >
                {bg}
              </button>
            ))}
            <button
              onClick={() => {
                setSelectedBloodGroup('All');
                setSelectedCity('All Cities');
                setSearchTerm('');
              }}
              className="ml-auto text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Available Donors</span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-extrabold">
              {filteredDonors.length} Found
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Showing approved active donors matching your criteria.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('request')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Can't find a donor? Submit Blood Request</span>
          </button>
        </div>
      </div>

      {/* Donors Table & Card List */}
      {filteredDonors.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Table View for Medium+ Screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-rose-700 text-white text-xs uppercase tracking-wider font-extrabold">
                  <th className="py-4 px-6">Donor Name</th>
                  <th className="py-4 px-4 text-center">Blood Group</th>
                  <th className="py-4 px-4">Age / Gender</th>
                  <th className="py-4 px-4">City</th>
                  <th className="py-4 px-4">Mobile Number</th>
                  <th className="py-4 px-6 text-center">Contact Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-red-50/50 transition-colors">
                    
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-red-600 font-extrabold text-sm flex items-center justify-center border border-rose-200">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{donor.name}</p>
                          <p className="text-[11px] text-slate-400">ID: {donor.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-600 text-white font-black text-sm shadow-sm tracking-wide">
                        {donor.bloodGroup}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {donor.age} yrs • {donor.gender}
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-semibold flex items-center gap-1.5 py-5">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{donor.city}</span>
                    </td>

                    <td className="py-4 px-4 text-slate-800 font-mono font-bold">
                      {donor.mobile}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Call Button */}
                        <a
                          href={`tel:${donor.mobile.replace(/\s+/g, '')}`}
                          onClick={() => handleContactClick(donor)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-1"
                          title="Call Donor Directly"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/${donor.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(donor.donorName || donor.name)},%20I%20found%20your%20contact%20on%20PK%20Blood%20Bank%20System.%20We%20need%20blood%20type%20${donor.bloodGroup}%20urgently.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleContactClick(donor)}
                          className="px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow transition-all flex items-center gap-1"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {contactedDonorId === donor.id && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1 animate-pulse">
                          ✓ Contact initiated
                        </p>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid for Small Screens */}
          <div className="block md:hidden divide-y divide-slate-200">
            {filteredDonors.map((donor) => (
              <div key={donor.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-red-600 font-extrabold flex items-center justify-center">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900">{donor.name}</h4>
                      <p className="text-xs text-slate-500">{donor.age} yrs • {donor.gender}</p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-red-600 text-white font-extrabold text-sm shadow">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {donor.city}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{donor.mobile}</span>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={`tel:${donor.mobile.replace(/\s+/g, '')}`}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Donor</span>
                  </a>
                  <a
                    href={`https://wa.me/${donor.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-green-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-lg space-y-4 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">No Donors Found</h3>
          <p className="text-sm text-slate-500">
            We couldn't find any approved donor matching <span className="font-bold text-red-600">{selectedBloodGroup}</span> in <span className="font-bold text-slate-800">{selectedCity}</span>.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setSelectedBloodGroup('All');
                setSelectedCity('All Cities');
                setSearchTerm('');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Clear Search Filters
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md hover:bg-red-700"
            >
              Post Urgent Blood Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
