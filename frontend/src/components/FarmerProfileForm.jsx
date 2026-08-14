import React, { useState } from 'react';

export default function FarmerProfileForm({ onSubmitProfile }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    fullName: '',
    state: '',
    district: '',
    category: 'General',
    landSizeAcres: '',
    landOwnership: 'Owned',
    irrigationType: 'Irrigated',
    primaryCrop: 'Wheat',
    annualIncome: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProfile(profile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-xl w-full p-8">
        
        {/* Header & Step Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-slate-800">Complete Your Farmer Profile</h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              Step {step} of 3
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* STEP 1: Personal & Location Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">1. Personal & Location Info</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. Jharkhand"
                    value={profile.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    required
                    placeholder="e.g. Ranchi"
                    value={profile.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Social Category</label>
                <select
                  name="category"
                  value={profile.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow transition"
              >
                Next: Agricultural Details →
              </button>
            </div>
          )}

          {/* STEP 2: Land & Irrigation Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">2. Landholding & Farming</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Land Size (in Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  name="landSizeAcres"
                  required
                  placeholder="e.g. 2.5"
                  value={profile.landSizeAcres}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Land Ownership</label>
                  <select
                    name="landOwnership"
                    value={profile.landOwnership}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased / Tenant</option>
                    <option value="Sharecropper">Sharecropper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Irrigation Source</label>
                  <select
                    name="irrigationType"
                    value={profile.irrigationType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Irrigated">Irrigated (Borewell/Canal)</option>
                    <option value="Rainfed">Rainfed / Dependent on Monsoon</option>
                    <option value="Partially Irrigated">Partially Irrigated</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Primary Crop Grown</label>
                <input
                  type="text"
                  name="primaryCrop"
                  required
                  placeholder="e.g. Paddy / Rice, Wheat, Cotton"
                  value={profile.primaryCrop}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-lg transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow transition"
                >
                  Next: Financial Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Financial Info & Submission */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">3. Income & Verification</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Annual Household Income (₹)
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  required
                  placeholder="e.g. 120000"
                  value={profile.annualIncome}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800">
                📌 <strong>EVI Index Calculation:</strong> Your details will be used to compute your Economic Vulnerability Score to match high-priority support schemes automatically.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-lg transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow transition"
                >
                  Save Profile & Go to Dashboard ✨
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}