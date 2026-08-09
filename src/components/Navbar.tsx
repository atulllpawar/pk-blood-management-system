import React, { useState } from 'react';
import { Heart, Search, UserPlus, FileText, Activity, Info, Phone, Lock, LogOut, Menu, X, ShieldAlert } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onLogout,
  pendingCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-red-700 via-rose-600 to-red-600 text-white shadow-xl border-b border-red-800/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            id="navbar-logo"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg group-hover:scale-105 transition-transform duration-200">
              {/* Hands & Blood Drop Icon SVG */}
              <svg viewBox="0 0 100 100" className="w-9 h-9 text-red-600 fill-current">
                <path d="M50 10 C35 35 20 50 20 68 A30 30 0 0 0 80 68 C80 50 65 35 50 10 Z" fill="#DC2626" />
                <path d="M25 75 C15 70 10 55 12 40 C14 42 22 55 35 60 Z" fill="#2563EB" opacity="0.85" />
                <path d="M75 75 C85 70 90 55 88 40 C86 42 78 55 65 60 Z" fill="#2563EB" opacity="0.85" />
                <text x="50" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">PK</text>
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>PK Blood</span>
                <span className="text-amber-300 font-bold">Management</span>
              </div>
              <p className="text-xs text-red-100/90 font-medium tracking-wide">
                Connecting Donors with Lives in Need <span className="text-red-300">❤️</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              id="nav-home-btn"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'home'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Heart className="w-4 h-4 fill-current text-rose-500" />
              <span>Home</span>
            </button>

            <button
              id="nav-search-btn"
              onClick={() => handleNav('search')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'search'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search Blood</span>
            </button>

            <button
              id="nav-register-btn"
              onClick={() => handleNav('register')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Donor</span>
            </button>

            <button
              id="nav-request-btn"
              onClick={() => handleNav('request')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'request'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Request Blood</span>
            </button>

            <button
              id="nav-compatibility-btn"
              onClick={() => handleNav('compatibility')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'compatibility'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>Blood Guide</span>
            </button>

            <button
              id="nav-about-btn"
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'about'
                  ? 'bg-white text-red-700 shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:108"
              className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-900 text-red-100 text-xs font-bold border border-red-400/30 flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
              <span>Helpline: 108</span>
            </a>

            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-admin-dash-btn"
                  onClick={() => handleNav('admin-dashboard')}
                  className="relative px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-lg hover:bg-amber-300 transition-all flex items-center gap-1.5"
                >
                  <Lock className="w-4 h-4 text-slate-900" />
                  <span>Dashboard</span>
                  {pendingCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-extrabold animate-bounce">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  title="Logout Admin"
                  className="p-2 rounded-xl bg-red-950/70 hover:bg-red-950 text-white border border-red-400/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => handleNav('login')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-sm font-bold shadow-md hover:shadow-xl transition-all border border-slate-700/50 flex items-center space-x-1.5"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-red-800/80 hover:bg-red-800 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-red-800 border-t border-red-700 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'home' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNav('search')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'search' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Blood Donor</span>
          </button>

          <button
            onClick={() => handleNav('register')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'register' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register as Donor</span>
          </button>

          <button
            onClick={() => handleNav('request')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'request' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Request Blood</span>
          </button>

          <button
            onClick={() => handleNav('compatibility')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'compatibility' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Blood Group Guide & AI Assistant</span>
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 ${
              activeTab === 'about' ? 'bg-white text-red-700 font-bold' : 'text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About & Guidelines</span>
          </button>

          <div className="pt-3 border-t border-red-700/60 flex flex-col space-y-2">
            <a
              href="tel:108"
              className="w-full text-center py-2.5 rounded-xl bg-red-950 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>Emergency Hotline: 108</span>
            </a>

            {isAdminLoggedIn ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleNav('admin-dashboard')}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm text-center"
                >
                  Admin Dashboard ({pendingCount} pending)
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2.5 rounded-xl bg-red-950 text-white font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Login Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
