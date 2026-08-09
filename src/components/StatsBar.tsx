import React from 'react';
import { Users, CheckCircle2, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { AdminStats, ActiveTab } from '../types';

interface StatsBarProps {
  stats: AdminStats;
  setActiveTab: (tab: ActiveTab) => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, setActiveTab }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Total Donors Card */}
        <div 
          onClick={() => setActiveTab('search')}
          className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:border-red-200 cursor-pointer transition-all duration-200 group"
          id="stats-total-donors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Donors</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalDonors}</span>
            <span className="text-xs text-emerald-600 font-semibold">Registered</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Verified community list</p>
        </div>

        {/* Available Donors Card */}
        <div 
          onClick={() => setActiveTab('search')}
          className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:border-emerald-200 cursor-pointer transition-all duration-200 group"
          id="stats-available-donors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Available Donors</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.availableDonors}</span>
            <span className="text-xs text-emerald-600 font-semibold">Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Approved & active</p>
        </div>

        {/* Current Requests Card */}
        <div 
          onClick={() => setActiveTab('request')}
          className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:border-amber-200 cursor-pointer transition-all duration-200 group"
          id="stats-total-requests"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Requests</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalRequests}</span>
            <span className="text-xs text-amber-600 font-semibold">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Hospital requirements</p>
        </div>

        {/* Urgent Requests Card */}
        <div 
          onClick={() => setActiveTab('request')}
          className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:border-rose-300 cursor-pointer transition-all duration-200 group"
          id="stats-urgent-requests"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-extrabold">Urgent Needed</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">{stats.urgentRequests}</span>
            <span className="text-xs text-rose-600 font-semibold animate-pulse">Critical</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Needs immediate match</p>
        </div>

        {/* Cities Covered Card */}
        <div 
          onClick={() => setActiveTab('search')}
          className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 hover:shadow-xl hover:border-blue-200 cursor-pointer transition-all duration-200 group col-span-2 md:col-span-4 lg:col-span-1"
          id="stats-cities-covered"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cities Network</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">12+</span>
            <span className="text-xs text-blue-600 font-semibold">Locations</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Wide regional reach</p>
        </div>

      </div>
    </div>
  );
};
