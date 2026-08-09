import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle2, AlertCircle, ArrowLeft, Building2, Phone, Bell } from 'lucide-react';
import { BloodGroup, ActiveTab } from '../types';
import { CITIES_LIST } from '../data/mockData';

interface RequestBloodViewProps {
  onRequestBlood: (requestData: any) => Promise<boolean>;
  setActiveTab: (tab: ActiveTab) => void;
}

export const RequestBloodView: React.FC<RequestBloodViewProps> = ({
  onRequestBlood,
  setActiveTab
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+' as BloodGroup,
    hospital: '',
    city: 'Pune',
    units: '2',
    urgency: 'Urgent' as 'Critical' | 'Urgent' | 'Standard',
    contactMobile: '',
    notes: '',
    smsNotifications: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.patientName.trim()) {
      setErrorMessage('Please enter patient name.');
      return;
    }

    if (!formData.hospital.trim()) {
      setErrorMessage('Please enter hospital name.');
      return;
    }

    if (!formData.contactMobile.trim()) {
      setErrorMessage('Please enter contact mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onRequestBlood({
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        hospital: formData.hospital,
        city: formData.city,
        units: Number(formData.units) || 1,
        urgency: formData.urgency,
        contactMobile: formData.contactMobile,
        notes: formData.notes,
        smsNotifications: formData.smsNotifications
      });

      if (success) {
        setSubmittedMessage(
          `Emergency Blood Request posted successfully! Our admin team and registered ${formData.bloodGroup} donors in ${formData.city} have been alerted.`
        );
        setFormData({
          patientName: '',
          bloodGroup: 'O+',
          hospital: '',
          city: 'Pune',
          units: '2',
          urgency: 'Urgent',
          contactMobile: '',
          notes: '',
          smsNotifications: true
        });
      } else {
        setErrorMessage('Failed to submit request. Please check inputs and retry.');
      }
    } catch (err) {
      setErrorMessage('An error occurred while submitting your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Back button */}
      <button
        onClick={() => setActiveTab('home')}
        className="mb-4 text-xs font-extrabold text-red-600 hover:text-red-800 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-red-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Main Request Form Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 sm:p-8 text-white text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
            <FileText className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Submit Urgent Blood Request</h2>
          <p className="text-sm text-red-100 mt-1 max-w-lg mx-auto">
            Fill out patient details accurately to initiate fast donor matching and alert nearby blood banks.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10">
          
          {submittedMessage ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-rose-900">Request Published!</h3>
              <p className="text-sm text-rose-800 max-w-md mx-auto">{submittedMessage}</p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setActiveTab('search')}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md hover:bg-red-700"
                >
                  Search Donors for {formData.bloodGroup}
                </button>
                <button
                  onClick={() => setSubmittedMessage(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                >
                  Post Another Request
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Patient Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunil Jadhav"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="request-patient-name-input"
                  />
                </div>

                {/* Blood Group Needed */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Blood Group Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-black bg-slate-50 text-slate-900"
                    id="request-blood-group-select"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Units Needed */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Units Required (Bags)
                  </label>
                  <select
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900"
                    id="request-units-select"
                  >
                    <option value="1">1 Unit</option>
                    <option value="2">2 Units</option>
                    <option value="3">3 Units</option>
                    <option value="4">4+ Units</option>
                  </select>
                </div>

                {/* Hospital Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Hospital / Clinic Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahyadri Hospital, Karve Road"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-semibold bg-slate-50 text-slate-900"
                    id="request-hospital-input"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    City / Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900"
                    id="request-city-select"
                  >
                    {CITIES_LIST.filter(c => c !== 'All Cities').map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Urgency Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-bold bg-slate-50 text-slate-900"
                    id="request-urgency-select"
                  >
                    <option value="Critical">🚨 Critical (Immediate Transfusion)</option>
                    <option value="Urgent">⚠️ Urgent (Needed Within 12 Hours)</option>
                    <option value="Standard">📋 Standard (Planned Surgery)</option>
                  </select>
                </div>

                {/* Contact Mobile */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Contact Person Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822044112"
                    value={formData.contactMobile}
                    onChange={(e) => setFormData({ ...formData, contactMobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm font-mono font-bold bg-slate-50 text-slate-900"
                    id="request-contact-mobile-input"
                  />
                </div>

                {/* Additional Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Additional Requirement Details / Doctor Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Patient is in ICU Bed 14. Doctor requested whole blood or PRBC."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-sm bg-slate-50 text-slate-900"
                    id="request-notes-textarea"
                  />
                </div>

                {/* SMS Opt-in Checkbox */}
                <div className="sm:col-span-2 bg-red-50/60 rounded-2xl p-4 border border-red-100 flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="request-sms-optin-checkbox"
                    checked={formData.smsNotifications}
                    onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <label htmlFor="request-sms-optin-checkbox" className="text-xs text-slate-700 cursor-pointer space-y-0.5">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-red-600" />
                      Opt-in for Automated SMS Notifications
                    </span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Receive real-time SMS alerts on your mobile when potential matching blood donors accept your request or when blood unit availability status updates.
                    </p>
                  </label>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                id="request-submit-btn"
              >
                <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>{isSubmitting ? 'Posting Blood Request...' : 'Submit Emergency Request'}</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
