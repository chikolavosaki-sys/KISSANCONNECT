import React, { useState } from 'react';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    state: '',
    landSize: '',
    category: 'Small/Marginal',
    cropType: 'Wheat/Paddy'
  });

  const [eligibleSchemes, setEligibleSchemes] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    // Simple logic for matching schemes
    const results = [
      { name: "PM-Kisan Samman Nidhi", status: "Eligible", reason: "Landholding under limit" },
      { name: "Pradhan Mantri Fasal Bima Yojana", status: "Eligible", reason: "Valid crop category" }
    ];
    setEligibleSchemes(results);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 bg-white rounded-2xl shadow-sm border border-gray-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        🌾 Scheme Eligibility Checker
      </h2>

      <form onSubmit={handleCheck} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
          <input
            type="text"
            placeholder="e.g. Punjab, Bihar, UP"
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            className="w-full border rounded-lg p-2.5 text-sm focus:outline-emerald-600"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Land Size (in Acres)</label>
          <input
            type="number"
            placeholder="e.g. 2.5"
            value={formData.landSize}
            onChange={(e) => setFormData({...formData, landSize: e.target.value})}
            className="w-full border rounded-lg p-2.5 text-sm focus:outline-emerald-600"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            Check Eligibility
          </button>
        </div>
      </form>

      {eligibleSchemes && (
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-800 mb-3">Matching Schemes:</h3>
          <div className="space-y-2">
            {eligibleSchemes.map((item, idx) => (
              <div key={idx} className="p-3 bg-emerald-50 rounded-lg flex justify-between items-center">
                <span className="font-medium text-emerald-900 text-sm">{item.name}</span>
                <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded font-semibold">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EligibilityChecker;