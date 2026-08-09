import React, { useState } from 'react';
import { Activity, Sparkles, Heart, ShieldCheck, ArrowRight, UserCheck, Bot, RefreshCw } from 'lucide-react';
import { BloodGroup, ActiveTab, Donor } from '../types';
import { BLOOD_COMPATIBILITY_MATRIX, CITIES_LIST } from '../data/mockData';

interface CompatibilityCalculatorViewProps {
  donors: Donor[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const CompatibilityCalculatorView: React.FC<CompatibilityCalculatorViewProps> = ({
  donors,
  setActiveTab
}) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O-');
  const [aiPatientGroup, setAiPatientGroup] = useState<BloodGroup>('O+');
  const [aiCity, setAiCity] = useState<string>('Pune');
  const [aiHospital, setAiHospital] = useState<string>('Sahyadri Hospital');
  const [aiUrgency, setAiUrgency] = useState<string>('Critical');
  const [aiResult, setAiResult] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  const activeInfo = BLOOD_COMPATIBILITY_MATRIX[selectedGroup];

  const handleRunAiMatch = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientBloodGroup: aiPatientGroup,
          city: aiCity,
          hospital: aiHospital,
          urgency: aiUrgency
        })
      });
      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error('Error fetching AI match:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-widest text-amber-200">
          Medical Reference & Emergency Guidance
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Blood Group Compatibility & AI Assistant
        </h2>
        <p className="text-sm sm:text-base text-red-100/90 max-w-2xl mx-auto">
          Understand transfusion compatibility rules and generate instant AI matching protocols for emergency blood requests.
        </p>
      </div>

      {/* Interactive Blood Matrix Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Transfusion Compatibility Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">
              Click any blood group to view compatible donors and recipients.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-red-50 text-red-700 rounded-full">
            Selected: <strong className="text-red-600">{selectedGroup}</strong>
          </span>
        </div>

        {/* Blood Group Quick Picker Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {bloodGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`py-3 rounded-2xl font-black text-sm transition-all duration-200 border ${
                selectedGroup === group
                  ? 'bg-red-600 text-white shadow-lg border-red-600 scale-105'
                  : 'bg-slate-50 hover:bg-red-50 text-slate-800 border-slate-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Selected Group Detailed Cards */}
        {activeInfo && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            
            {/* Can Give To */}
            <div className="md:col-span-6 bg-red-50/70 p-5 rounded-2xl border border-red-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-red-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-600 fill-current" />
                  <span>Can Donate Red Cells To ({selectedGroup})</span>
                </h4>
                <span className="text-xs font-bold text-red-700">{activeInfo.canGiveTo.length} Types</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeInfo.canGiveTo.map((bg) => (
                  <span
                    key={bg}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-sm"
                  >
                    {bg}
                  </span>
                ))}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="md:col-span-6 bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Can Receive Red Cells From ({selectedGroup})</span>
                </h4>
                <span className="text-xs font-bold text-emerald-700">{activeInfo.canReceiveFrom.length} Types</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeInfo.canReceiveFrom.map((bg) => (
                  <span
                    key={bg}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-sm"
                  >
                    {bg}
                  </span>
                ))}
              </div>
            </div>

            {/* Description & Rarity Footer */}
            <div className="md:col-span-12 bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                  Prevalence & Medical Fact ({activeInfo.rarity})
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {activeInfo.description}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('search')}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <span>Find {selectedGroup} Donors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* AI Assistant Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-red-900/50 space-y-6">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>AI Emergency Donor Matching Assistant</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300">
              Powered by Gemini API for intelligent compatibility triage and rapid donor matching protocols.
            </p>
          </div>
        </div>

        {/* AI Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-700/60">
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Patient Blood Type
            </label>
            <select
              value={aiPatientGroup}
              onChange={(e) => setAiPatientGroup(e.target.value as BloodGroup)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-extrabold text-sm"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              City / District
            </label>
            <select
              value={aiCity}
              onChange={(e) => setAiCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            >
              {CITIES_LIST.filter(c => c !== 'All Cities').map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Urgency Level
            </label>
            <select
              value={aiUrgency}
              onChange={(e) => setAiUrgency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            >
              <option value="Critical">Critical (Immediate)</option>
              <option value="Urgent">Urgent (Within 12 Hours)</option>
              <option value="Standard">Standard</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunAiMatch}
              disabled={loadingAi}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loadingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Matching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate Match</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* AI Output Card */}
        {aiResult && (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-amber-400/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                AI Triage & Match Report
              </span>
              <span className="text-xs text-slate-400">
                Patient Group: <strong className="text-white">{aiPatientGroup}</strong> ({aiCity})
              </span>
            </div>

            <p className="text-sm text-slate-200 font-semibold">
              {aiResult.matchSummary}
            </p>

            <div className="p-4 rounded-xl bg-slate-800/90 text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed font-mono">
              <strong className="text-amber-300 block font-sans uppercase">Medical Protocol & Advice:</strong>
              {aiResult.aiAdvice}
            </div>

            {aiResult.exactDonors && aiResult.exactDonors.length > 0 && (
              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-300 uppercase mb-2">Direct Available Donors in Database:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {aiResult.exactDonors.map((d: Donor) => (
                    <div key={d.id} className="p-3 rounded-xl bg-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{d.name}</span>
                        <span className="text-slate-400">{d.city} • {d.mobile}</span>
                      </div>
                      <a
                        href={`tel:${d.mobile.replace(/\s+/g, '')}`}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
