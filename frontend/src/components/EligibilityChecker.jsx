import React, { useState } from 'react';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    category: 'General', // General, SC, ST, OBC
    gender: 'Male',
    farmerType: 'Small/Marginal (< 2 Hectares)',
    landSize: '',
    irrigationType: 'Rainfed', // Rainfed, Irrigated
    annualIncome: '',
    isSharecropper: 'No'
  });

  const [eligibleSchemes, setEligibleSchemes] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();

    // Comprehensive mock calculation based on form values
    const results = [];
    const land = parseFloat(formData.landSize) || 0;

    if (land <= 5) {
      results.push({
        name: "PM-Kisan Samman Nidhi",
        badge: "Financial Aid",
        status: "Eligible",
        reason: "Small/Marginal landholding criteria fulfilled."
      });
    }

    results.push({
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      badge: "Crop Insurance",
      status: "Eligible",
      reason: `Applicable for ${formData.irrigationType} land in ${formData.state || 'your state'}.`
    });

    if (formData.farmerType.includes("Small/Marginal") || formData.category !== "General") {
      results.push({
        name: "Sub-Mission on Agricultural Mechanization (SMAM)",
        badge: "Subsidy",
        status: "High Subsidy (40-50%)",
        reason: "Special subsidy rate available for small landholders and reserved categories."
      });
    }

    if (formData.irrigationType === 'Rainfed') {
      results.push({
        name: "PM Krishi Sinchayee Yojana (Micro Irrigation)",
        badge: "Irrigation",
        status: "Eligible",
        reason: "Eligible for Drip/Sprinkler subsidy support."
      });
    }

    setEligibleSchemes(results);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white rounded-2xl shadow-sm border border-gray-200 my-8">
      <div className="text-center mb-6">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Smart Matching Engine
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
          🌾 Scheme Eligibility Checker
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Enter your details below to check personalized government schemes and subsidies you qualify for.
        </p>
      </div>

      <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
          <input
            type="text"
            placeholder="e.g. Bihar, UP, Maharashtra"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600"
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">District</label>
          <input
            type="text"
            placeholder="e.g. Patna, Varanasi"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Social Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600 bg-white"
          >
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>

        {/* Farmer Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Farmer Category</label>
          <select
            value={formData.farmerType}
            onChange={(e) => setFormData({ ...formData, farmerType: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600 bg-white"
          >
            <option value="Small/Marginal (< 2 Hectares)">Small/Marginal (&lt; 2 Hectares)</option>
            <option value="Medium (2-10 Hectares)">Medium (2-10 Hectares)</option>
            <option value="Large (> 10 Hectares)">Large (&gt; 10 Hectares)</option>
            <option value="Tenant Farmer / Landless">Tenant Farmer / Landless</option>
          </select>
        </div>

        {/* Land Size */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Land Size (in Acres)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 2.5"
            value={formData.landSize}
            onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600"
            required
          />
        </div>

        {/* Irrigation Source */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Irrigation Source</label>
          <select
            value={formData.irrigationType}
            onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600 bg-white"
          >
            <option value="Rainfed">Rainfed (Dependent on Rain)</option>
            <option value="Canal / Borewell">Canal / Tube-well / Borewell</option>
            <option value="Drip / Sprinkler">Drip / Sprinkler System</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600 bg-white"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Annual Household Income (₹)</label>
          <input
            type="number"
            placeholder="e.g. 150000"
            value={formData.annualIncome}
            onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-emerald-600"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 md:col-span-3 mt-2">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md cursor-pointer"
          >
            🔍 Find Eligible Schemes
          </button>
        </div>
      </form>

      {/* Results Rendering */}
      {eligibleSchemes && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <span>🎯</span> Matched Schemes for You ({eligibleSchemes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleSchemes.map((item, idx) => (
              <div key={idx} className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">{item.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EligibilityChecker;