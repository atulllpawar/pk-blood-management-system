import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, ArrowLeft, AlertCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface AdminLoginViewProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLogin,
  setActiveTab
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const success = await onLogin(username, password);
      if (!success) {
        setError('Invalid username or password. (Default credentials: admin / admin123)');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      
      {/* Back button */}
      <button
        onClick={() => setActiveTab('home')}
        className="mb-6 text-xs font-extrabold text-red-600 hover:text-red-800 flex items-center gap-1 bg-white px-3.5 py-2 rounded-xl border border-red-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Public Portal</span>
      </button>

      {/* Login Box Container matching style.css */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-red-100 text-center space-y-6">
        
        {/* PK Logo Header */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center mx-auto shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
            <path d="M50 10 C35 35 20 50 20 68 A30 30 0 0 0 80 68 C80 50 65 35 50 10 Z" fill="#FFFFFF" />
            <text x="50" y="66" textAnchor="middle" fill="#DC2626" fontSize="22" fontWeight="bold" fontFamily="sans-serif">PK</text>
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">Admin Portal Login</h2>
          <p className="text-xs text-slate-500 mt-1">
            PK Blood Bank & Donor Management System
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                id="admin-login-username-input"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                id="admin-login-password-input"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            id="admin-login-submit-btn"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>{isLoading ? 'Authenticating...' : 'Login to Dashboard'}</span>
          </button>

        </form>

        {/* Demo Fast Fill Badge */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <p className="text-[11px] text-slate-400">
            Demo Credentials: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800 font-bold">admin</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800 font-bold">admin123</code>
          </p>
          <button
            onClick={handleDemoFill}
            className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors"
          >
            Auto-fill Admin Credentials
          </button>
        </div>

      </div>

    </div>
  );
};
