import React from 'react';
import { Heart, Phone, ShieldCheck, Lock } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isAdminLoggedIn }) => {
  return (
    <footer className="w-full bg-slate-950 text-white border-t border-slate-900 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                <svg viewBox="0 0 100 100" className="w-7 h-7 text-red-600 fill-current">
                  <path d="M50 10 C35 35 20 50 20 68 A30 30 0 0 0 80 68 C80 50 65 35 50 10 Z" fill="#DC2626" />
                  <text x="50" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold">PK</text>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">PK Blood Management</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Connecting voluntary blood donors with hospitals and critical care patients across cities. Real-time availability, fast requests, and emergency support.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Verified Network
              </span>
              <span>•</span>
              <span className="text-amber-400 font-bold">24x7 Emergency Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Quick Portal Links</h4>
            <ul className="text-xs space-y-2 text-slate-300 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-300 transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-amber-300 transition-colors">
                  Search Blood Donor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('register')} className="hover:text-amber-300 transition-colors">
                  Register as Donor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('request')} className="hover:text-amber-300 transition-colors">
                  Submit Blood Request
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compatibility')} className="hover:text-amber-300 transition-colors">
                  Blood Group Guide & AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Emergency & Support</h4>
            <div className="space-y-2">
              <a
                href="tel:108"
                className="w-full py-2.5 px-4 rounded-xl bg-red-900/80 hover:bg-red-900 text-white font-bold text-xs flex items-center justify-between border border-red-700/50"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-400" />
                  Emergency Ambulance Helpline
                </span>
                <span className="font-extrabold text-amber-300">108</span>
              </a>

              {isAdminLoggedIn && (
                <button
                  onClick={() => setActiveTab('admin-dashboard')}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-between shadow"
                >
                  <span>Go to Admin Dashboard</span>
                  <Lock className="w-3.5 h-3.5 text-slate-950" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-400">
          <p className="select-none">
            © 2026 PK Blood Management System | Developed by{' '}
            <span 
              onClick={() => setActiveTab('login')}
              className="cursor-pointer hover:text-slate-200 transition-colors"
              title="Secret Admin Access"
            >
              PK Management
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};
