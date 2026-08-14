import React, { useState } from 'react';

export default function Dashboard({ userRole, farmerProfile }) {
  const [activeTab, setActiveTab] = useState('schemes'); // 'schemes' | 'applications'

  // Sample dynamic EVI (Economic Vulnerability Index) Calculation
  const calculateEVI = () => {
    if (!farmerProfile) return { score: 42, level: 'Moderate' };
    
    let score = 30;
    if (parseFloat(farmerProfile.landSizeAcres) < 2) score += 25; // Small/Marginal farmer
    if (farmerProfile.irrigationType === 'Rainfed') score += 20; // High weather risk
    if (parseFloat(farmerProfile.annualIncome) < 100000) score += 20; // Low income
    if (farmerProfile.category !== 'General') score += 5;

    let level = 'Low Risk';
    if (score >= 70) level = 'High Vulnerability';
    else if (score >= 45) level = 'Moderate Vulnerability';

    return { score: Math.min(score, 95), level };
  };

  const evi = calculateEVI();

  // Dummy Schemes Data
  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      benefit: '₹6,000 / year direct benefit transfer',
      category: 'Central Scheme',
      matchScore: '98%',
      status: 'Eligible',
    },
    {
      id: 2,
      name: 'PM Fasal Bima Yojana (Crop Insurance)',
      benefit: 'Comprehensive coverage against crop failure',
      category: 'Insurance',
      matchScore: '92%',
      status: 'Eligible',
    },
    {
      id: 3,
      name: 'Pradhan Mantri Krishi Sinchayee Yojana',
      benefit: 'Up to 55% subsidy on Drip/Micro-irrigation equipment',
      category: 'Irrigation Subsidy',
      matchScore: '85%',
      status: 'Recommended',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* FARMER DASHBOARD VIEW */}
        {userRole === 'farmer' && (
          <>
            {/* Top Banner & EVI Score */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Farmer Portal</span>
                <h1 className="text-2xl font-bold mt-1">Welcome, {farmerProfile?.fullName || 'Kisan'} 👋</h1>
                <p className="text-emerald-100 text-sm mt-0.5">
                  {farmerProfile?.district}, {farmerProfile?.state} • {farmerProfile?.landSizeAcres} Acres ({farmerProfile?.irrigationType})
                </p>
              </div>

              {/* Computed EVI Card */}
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-center min-w-[200px]">
                <div className="text-xs text-emerald-200 font-medium uppercase">EVI Score (Vulnerability)</div>
                <div className="text-3xl font-extrabold text-white my-0.5">{evi.score} / 100</div>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  evi.score >= 70 ? 'bg-red-400/20 text-red-200 border border-red-400/30' : 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30'
                }`}>
                  {evi.level}
                </span>
              </div>
            </div>

            {/* Scheme List Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Recommended Schemes for You</h2>
                  <p className="text-sm text-slate-500">Auto-matched using your landholding and income profile</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                  {schemes.length} Matches Found
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {schemes.map((scheme) => (
                  <div key={scheme.id} className="border border-slate-200 hover:border-emerald-500 p-5 rounded-xl transition shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {scheme.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {scheme.matchScore} Match
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg leading-snug">{scheme.name}</h3>
                      <p className="text-sm text-slate-600 mt-2">{scheme.benefit}</p>
                    </div>

                    <button 
                      onClick={() => alert(`Application initiated for ${scheme.name}`)}
                      className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition"
                    >
                      Apply Now →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {userRole === 'admin' && (
          <>
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Government Officer Portal</span>
                <h1 className="text-2xl font-bold mt-1">Admin Analytics & Approval Desk</h1>
              </div>
            </div>

            {/* Admin Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">Total Registered Farmers</div>
                <div className="text-3xl font-bold text-slate-800 mt-1">2,480</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">High Risk Farmers (EVI &gt; 70)</div>
                <div className="text-3xl font-bold text-amber-600 mt-1">612</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">Pending Approvals</div>
                <div className="text-3xl font-bold text-emerald-600 mt-1">45</div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Applications for Review</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
                    <tr>
                      <th className="p-3">Farmer Name</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Scheme</th>
                      <th className="p-3">EVI Score</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">Ramesh Kumar</td>
                      <td className="p-3">Ranchi</td>
                      <td className="p-3">PM-KISAN Samman Nidhi</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded text-xs">75 (High)</span></td>
                      <td className="p-3">
                        <button className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-semibold">Approve</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}