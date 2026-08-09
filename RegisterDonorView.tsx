import React, { useState } from 'react';
import { UserPlus, Heart, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { BloodGroup, ActiveTab } from '../types';
import { CITIES_LIST } from '../data/mockData';

interface RegisterDonorViewProps {
  onRegisterDonor: (donorData: any) => Promise<boolean>;
  setActiveTab: (tab: ActiveTab) => void;
}

export const RegisterDonorView: React.FC<RegisterDonorViewProps> = ({
  onRegisterDonor,
  setActiveTab
}) => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'A+' as BloodGroup,
    age: '25',
    gender: 'Male',
    mobile: '',
    city: 'Pune',
    email: '',
    notes: '',
    eligibleCheck: false,
    autoApprove: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length < 8) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage('Please select or enter your city.');
      return;
    }

    if (!formData.eligibleCheck) {
      setErrorMessage('Please confirm the donor health eligibility checklist.');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onRegisterDonor({
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        age: Number(formData.age) || 25,
        gender: formData.gender,
        mobile: formData.mobile,
        city: formData.city,
        email: formData.email,
        notes: formData.notes,
        autoApprove: formData.autoApprove
      });

      if (success) {
        setSubmittedMessage(
          formData.autoApprove
            ? 'Success! Your donor profile is now live in the PK Blood Directory.'
            : 'Registration Successful! Your details have been submitted for admin verification. You will appear in search results once approved.'
        );
        setFormData({
          name: '',
          bloodGroup: 'A+',
          age: '25',
          gender: 'Male',
          mobile: '',
          city: 'Pune',
          email: '',
          notes: '',
          eligibleCheck: false,
          autoApprove: false
        });
      } else {
        setErrorMessage('Failed to register. Please check input details and try again.');
      }
    } catch (err: any) {
      setErrorMessage('An error occurred while registering. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('home')}
        className="mb-4 text-xs font-extrabold text-red-600 hover:text-red-800 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-red-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Main Registration Box */}
      <div className="bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-6 sm:p-8 text-white text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
            <UserPlus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Register as Voluntary Blood Donor</h2>
          <p className="text-sm text-red-100 mt-1 max-w-lg mx-auto">
            Your single decision to donate blood can save up to 3 precious lives in emergencies.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-10">
          
          {submittedMessage ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-900">Registration Submitted!</h3>
              <p className="text-sm text-emerald-700 max-w-md mx-auto">{submittedMessage}</p>
              
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setSubmittedMessage(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                >
                  Register Another Donor
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                >
                  View Donor Directory
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="register-name-input"
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-extrabold bg-slate-50 text-slate-900"
                    id="register-blood-select"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9823011223"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-mono font-bold bg-slate-50 text-slate-900"
                    id="register-mobile-input"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Age (18-65 yrs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="register-age-input"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="register-gender-select"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    City / District <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900"
                    id="register-city-select"
                  >
                    {CITIES_LIST.filter(c => c !== 'All Cities').map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Optional */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="donor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="register-email-input"
                  />
                </div>

              </div>

              {/* Eligibility Consent */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.eligibleCheck}
                    onChange={(e) => setFormData({ ...formData, eligibleCheck: e.target.checked })}
                    className="mt-0.5 w-5 h-5 rounded border-amber-300 text-red-600 focus:ring-red-500"
                    id="register-eligibility-checkbox"
                  />
                  <span className="text-xs text-slate-800 leading-relaxed font-medium">
                    I confirm that I am in good health, weigh at least 45 kg, have no major bloodborne illnesses, and agree to be contacted for voluntary blood donation requests in emergencies.
                  </span>
                </label>
              </div>

              {/* Instant Auto-Approve Option for Demo */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 text-xs">
                <span className="font-bold text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Direct Listing Option (Instant Approval)
                </span>
                <label className="flex items-center space-x-2 cursor-pointer font-extrabold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.autoApprove}
                    onChange={(e) => setFormData({ ...formData, autoApprove: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                id="register-submit-btn"
              >
                <Heart className="w-5 h-5 text-amber-200 fill-current animate-pulse" />
                <span>{isSubmitting ? 'Submitting Registration...' : 'Save & Register Donor'}</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
