import React from 'react';
import { Search, UserPlus, FileText, Heart, ShieldCheck, AlertCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  urgentCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, urgentCount }) => {
  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4 sm:px-6">
      
      {/* Curved Container Matching home.css */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-rose-600 to-amber-600 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-red-400/30">
        
        {/* Background Decorative Rings */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-red-900/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Urgent Request Badge */}
            {urgentCount > 0 && (
              <div 
                onClick={() => setActiveTab('request')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 hover:bg-red-950 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer transition-all animate-pulse"
              >
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>{urgentCount} Critical Blood Request(s) active in your city right now!</span>
              </div>
            )}

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
                PK Blood<br />
                <span className="text-amber-200">Management System</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-red-50/95 max-w-2xl">
                Connecting Donors with Lives in Need <Heart className="inline-block w-5 h-5 text-rose-300 fill-current ml-1" />
              </p>
            </div>

            <p className="text-sm sm:text-base text-red-100/90 leading-relaxed max-w-xl">
              A comprehensive community platform bridging emergency blood seekers with verified voluntary donors across hospitals and blood banks. Every drop counts!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-2">
              <button
                id="hero-search-btn"
                onClick={() => setActiveTab('search')}
                className="px-6 py-3.5 rounded-full bg-white text-red-600 font-extrabold text-sm sm:text-base shadow-xl hover:bg-red-50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <Search className="w-5 h-5 text-red-600" />
                <span>Search Blood</span>
              </button>

              <button
                id="hero-register-btn"
                onClick={() => setActiveTab('register')}
                className="px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm sm:text-base shadow-lg backdrop-blur-md hover:scale-105 transition-all duration-200 border border-white/30 flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5 text-amber-200" />
                <span>Register as Donor</span>
              </button>

              <button
                id="hero-request-btn"
                onClick={() => setActiveTab('request')}
                className="px-6 py-3.5 rounded-full bg-red-950/70 hover:bg-red-950 text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-all duration-200 border border-red-400/40 flex items-center gap-2"
              >
                <FileText className="w-5 h-5 text-rose-300" />
                <span>Request Blood</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-red-100/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                100% Free Service
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Verified Donors
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                24/7 Availability
              </span>
            </div>

          </div>

          {/* Right SVG Illustration Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Soft Glowing Circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 border border-white/20 blur-sm pointer-events-none" />

            {/* Doctor & Blood Donation Artwork SVG */}
            <div className="relative z-10 w-full max-w-md p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl transform hover:scale-102 transition-transform duration-300">
              <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-xl rounded-2xl">
                <defs>
                  <linearGradient id="doctorCoat" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                  </linearGradient>
                  <linearGradient id="bloodBag" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#991B1B" />
                  </linearGradient>
                  <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF2F2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Card Background Circle */}
                <circle cx="250" cy="200" r="180" fill="url(#bgGlow)" />

                {/* Doctor Head & Hair */}
                <circle cx="250" cy="110" r="45" fill="#FDBA74" />
                <path d="M210 100 C210 65 290 65 290 100 C280 80 220 80 210 100 Z" fill="#334155" />

                {/* Doctor Face Features */}
                <circle cx="235" cy="110" r="4" fill="#1E293B" />
                <circle cx="265" cy="110" r="4" fill="#1E293B" />
                <path d="M240 128 Q250 138 260 128" stroke="#EA580C" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Doctor Body & Coat */}
                <path d="M170 280 L200 160 Q250 150 300 160 L330 280 Z" fill="url(#doctorCoat)" stroke="#CBD5E1" strokeWidth="2" />
                
                {/* Shirt & Tie */}
                <path d="M235 160 L265 160 L250 200 Z" fill="#2563EB" />
                <path d="M245 160 L255 160 L252 230 L248 230 Z" fill="#1D4ED8" />

                {/* Stethoscope */}
                <path d="M215 165 C215 220 285 220 285 165" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
                <circle cx="250" cy="225" r="12" fill="#94A3B8" stroke="#475569" strokeWidth="3" />

                {/* Doctor Right Arm Holding Blood Bag */}
                <path d="M190 180 L130 220 L130 280" fill="none" stroke="#FDBA74" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Blood Donation Bag */}
                <rect x="90" y="210" width="70" height="100" rx="12" fill="url(#bloodBag)" stroke="#FFFFFF" strokeWidth="3" />
                <rect x="105" y="225" width="40" height="30" rx="4" fill="#FFFFFF" opacity="0.9" />
                <text x="125" y="245" textAnchor="middle" fill="#B91C1C" fontSize="16" fontWeight="bold">A+</text>
                <path d="M125 310 L125 340 Q125 350 135 350 L200 350" fill="none" stroke="#EF4444" strokeWidth="4" />

                {/* Doctor Left Arm Thumb Up */}
                <path d="M310 180 L370 220 L380 200" fill="none" stroke="#FDBA74" strokeWidth="20" strokeLinecap="round" />
                <circle cx="385" cy="195" r="10" fill="#FDBA74" />

                {/* Heart Badges floating */}
                <g transform="translate(380, 80)">
                  <circle cx="20" cy="20" r="24" fill="#FFFFFF" />
                  <path d="M20 32 C12 24 8 18 8 13 C8 8 12 5 17 5 C19.5 5 22 6.5 23 8 C24 6.5 26.5 5 29 5 C34 5 38 8 38 13 C38 18 34 24 26 32 Z" fill="#DC2626" />
                </g>

                <g transform="translate(60, 100)">
                  <circle cx="18" cy="18" r="20" fill="#FFFFFF" />
                  <text x="18" y="24" textAnchor="middle" fill="#DC2626" fontSize="16" fontWeight="bold">O-</text>
                </g>
              </svg>

              {/* Caption Overlay */}
              <div className="text-center pt-2 pb-1">
                <span className="text-xs font-bold tracking-wider text-white bg-black/30 px-3 py-1 rounded-full uppercase">
                  Verified Blood Donor Network
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
