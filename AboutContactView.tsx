import React from 'react';
import { Info, Phone, MapPin, Mail, ShieldCheck, Heart, AlertCircle, Clock, Award } from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutContactViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ setActiveTab }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-widest text-amber-200">
          About & Community Support
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          PK Blood Management System
        </h2>
        <p className="text-sm sm:text-base text-red-100/90 max-w-2xl mx-auto">
          Dedicated to saving lives by bridging voluntary blood donors with hospitals, blood banks, and critical care patients 24x7.
        </p>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Who Can Donate?</h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-medium leading-relaxed">
            <li>Age between 18 and 65 years</li>
            <li>Weight at least 45 kg</li>
            <li>Hemoglobin level minimum 12.5 g/dL</li>
            <li>Pulse rate between 60 to 100 beats/min</li>
            <li>No alcohol intake in the past 24 hours</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Donation Frequency</h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-medium leading-relaxed">
            <li>Male donors: Every 3 months (90 days)</li>
            <li>Female donors: Every 4 months (120 days)</li>
            <li>Platelet donation: Every 2 weeks</li>
            <li>Hydrate well with water before donating</li>
            <li>Rest for 15 minutes after donation</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Safety & Standards</h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-medium leading-relaxed">
            <li>100% sterile single-use disposable kits</li>
            <li>Conducted under expert medical supervision</li>
            <li>Free health & blood pressure screening</li>
            <li>Privacy & data security guaranteed</li>
            <li>Instant digital donor certificate</li>
          </ul>
        </div>

      </div>

      {/* Emergency Contact Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-black text-amber-400">Emergency Hotlines & Contact</h3>
            <p className="text-xs text-slate-400">Reach our central coordination team anytime for critical blood unit requirements.</p>
          </div>
          <a
            href="tel:108"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow"
          >
            Call Ambulance: 108
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm mb-1">24x7 Helpline</strong>
              <p>+91 98230 11223</p>
              <p>+91 (020) 2544-9988</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm mb-1">Email Support</strong>
              <p>help@pkbloodbank.org</p>
              <p>support@pkmanagement.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm mb-1">Central Blood Bank</strong>
              <p>PK Blood Management Building, Karve Road, Pune, MH - 411004</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
