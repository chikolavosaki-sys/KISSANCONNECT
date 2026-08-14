import React, { useState } from 'react';

export default function Dashboard({ userRole, farmerProfile }) {
  const [applications, setApplications] = useState([
    {
      id: 1,
      farmerName: 'Ramesh Kumar',
      district: 'Ranchi',
      scheme: 'PM-KISAN Samman Nidhi',
      eviScore: 78,
      status: 'Pending Verification',
      elecSubsidy: 'Active (₹450/mo)',
      remarks: 'Land documents verified',
    },
    {
      id: 2,
      farmerName: 'Sunita Devi',
      district: 'Hazaribagh',
      scheme: 'State Drip Irrigation Subsidy',
      eviScore: 82,
      status: 'Under Review',
      elecSubsidy: 'Pending Approval',
      remarks: 'Awaiting field officer inspect',
    },
  ]);

  // EVI Score Calculation
  const calculateEVI = () => {
    if (!farmerProfile) return { score: 68, level: 'Moderate Vulnerability' };
    let score = 35;
    if (parseFloat(farmerProfile.landSizeAcres || 1.5) < 2) score += 25;
    if (farmerProfile.irrigationType === 'Rainfed') score += 20;
    if (parseFloat(farmerProfile.annualIncome || 80000) < 100000) score += 15;

    let level = score >= 70 ? 'High Vulnerability' : 'Moderate Vulnerability';
    return { score: Math.min(score, 95), level };
  };

  const evi = calculateEVI();

  const handleApprove = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: 'Approved by Govt' } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= FARMER VIEW ================= */}
        {userRole === 'farmer' && (
          <>
            {/* Top Header Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Farmer Executive Dashboard</span>
                <h1 className="text-2xl font-bold mt-1">Namaste, {farmerProfile?.fullName || 'Ramesh Kumar'} 🙏</h1>
                <p className="text-emerald-100 text-sm mt-0.5">
                  Location: {farmerProfile?.district || 'Ranchi'}, {farmerProfile?.state || 'Jharkhand'} • Land: {farmerProfile?.landSizeAcres || '1.8'} Acres ({farmerProfile?.irrigationType || 'Rainfed'})
                </p>
              </div>

              {/* Vulnerability Score Card */}
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-center min-w-[210px]">
                <div className="text-xs text-emerald-200 font-medium uppercase">Economic Vulnerability (EVI)</div>
                <div className="text-3xl font-extrabold text-white my-0.5">{evi.score} / 100</div>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-400/20 text-red-200 border border-red-400/30">
                  {evi.level}
                </span>
              </div>
            </div>

            {/* 6 KEY DASHBOARD METRICS / WIDGETS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* ⚡ 1. Electricity & Pump Subsidy Tracker */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">⚡ Electricity & Pump Subsidy</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Subsidized Rate</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-bold text-slate-800">142 Units</span>
                  <span className="text-sm font-semibold text-emerald-600">Bill: ₹0 (100% Govt Subsidy)</span>
                </div>
                <p className="text-xs text-slate-500">Agri Pump Meter ID: #JHB-88219 • Status: Active</p>
              </div>

              {/* 🌧️ 2. Weather & Crop Advisory */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">🌧️ Weather & Advisory</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Moderate Risk</span>
                </div>
                <div className="text-lg font-bold text-slate-800">28°C • Light Rain Expected</div>
                <p className="text-xs text-slate-600 mt-1">
                  💡 <i>Advisory: Delay pesticide spraying for Paddy until Saturday afternoon.</i>
                </p>
              </div>

              {/* 🌾 3. Mandi MSP Price Ticker */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">🌾 Mandi Live MSP Rates</span>
                  <span className="text-xs text-slate-400">Ranchi Mandi</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Paddy (Common):</span>
                    <span className="font-bold text-slate-800">₹2,300 / Qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Maize:</span>
                    <span className="font-bold text-slate-800">₹2,225 / Qtl</span>
                  </div>
                </div>
              </div>

              {/* 📄 4. Digital Document Locker */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">📄 Land Verification (Khasra)</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Verified</span>
                </div>
                <div className="text-sm font-semibold text-slate-800">Khata No: 44 / Khasra: 102A</div>
                <p className="text-xs text-slate-500 mt-1">Digital Land Registry synced with State Revenue Portal.</p>
              </div>

              {/* 💧 5. Irrigation & Soil Health */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">💧 Irrigation & Soil Health</span>
                  <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">Card Issued</span>
                </div>
                <div className="text-sm font-semibold text-slate-800">Soil Moisture: Optimal (42%)</div>
                <p className="text-xs text-slate-500 mt-1">Nitrogen: Medium • Phosphorus: Low (Recommendation: Add NPK 10:26:26)</p>
              </div>

              {/* 🏛️ 6. State Government Benefit Tracker */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">🏛️ State Govt Payout Status</span>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-semibold">16th Installment</span>
                </div>
                <div className="text-lg font-bold text-emerald-600">₹2,000 Transferred</div>
                <p className="text-xs text-slate-500 mt-1">Direct Benefit Transfer (DBT) to Aadhaar linked SBI account.</p>
              </div>

            </div>

            {/* Scheme Matching Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Recommended Government Schemes</h2>
              <p className="text-sm text-slate-500 mb-6">Matched specifically for rainfed & small landholders in Jharkhand</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-slate-200 p-5 rounded-xl hover:border-emerald-500 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">98% Priority Match</span>
                    <span className="text-xs text-slate-500">Central + State</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Jharkhand Krishi Rin Mafi Yojana</h3>
                  <p className="text-sm text-slate-600 mt-1">Loan waiver support for small and marginal farmers up to ₹50,000.</p>
                  <button className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm">
                    Apply with Verified Aadhaar →
                  </button>
                </div>

                <div className="border border-slate-200 p-5 rounded-xl hover:border-emerald-500 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">91% Priority Match</span>
                    <span className="text-xs text-slate-500">State Irrigation Dept</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Solar Agriculture Pump Subsidy</h3>
                  <p className="text-sm text-slate-600 mt-1">90% subsidy on installing 3HP solar irrigation pump sets.</p>
                  <button className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm">
                    Apply with Verified Aadhaar →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= ADMIN / STATE GOVT VIEW ================= */}
        {userRole === 'admin' && (
          <>
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">State Agriculture Department</span>
                <h1 className="text-2xl font-bold mt-1">Officer Desk & Scheme Verification Portal</h1>
              </div>
            </div>

            {/* High-Level State Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">Total Applications</div>
                <div className="text-3xl font-bold text-slate-800 mt-1">4,120</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">High Vulnerability (EVI &gt; 75)</div>
                <div className="text-3xl font-bold text-red-600 mt-1">840</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">Agri Power Subsidies Disbursed</div>
                <div className="text-3xl font-bold text-emerald-600 mt-1">₹18.4 Lakhs</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-semibold uppercase">Pending Officer Reviews</div>
                <div className="text-3xl font-bold text-amber-600 mt-1">32</div>
              </div>
            </div>

            {/* Applications Table with Government Review Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">State Government Review Pipeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
                    <tr>
                      <th className="p-3">Farmer Name</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Scheme Requested</th>
                      <th className="p-3">EVI Risk Score</th>
                      <th className="p-3">Electricity Subsidy Status</th>
                      <th className="p-3">Govt Review Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-800">{app.farmerName}</td>
                        <td className="p-3">{app.district}</td>
                        <td className="p-3">{app.scheme}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            app.eviScore >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {app.eviScore} (High Risk)
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-700">{app.elecSubsidy}</td>
                        <td className="p-3">
                          {app.status === 'Approved by Govt' ? (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold text-xs">
                              ✓ Approved
                            </span>
                          ) : (
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow transition"
                            >
                              Approve Scheme & Subsidy
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
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