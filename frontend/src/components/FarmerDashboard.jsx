import React, { useState } from 'react';
import SavedSchemes from './SavedSchemes';

const FarmerDashboard = ({ savedSchemes, onRemoveScheme }) => {
  const [activeTab, setActiveTab] = useState('saved');

  // Dummy Application Tracking Data
  const applications = [
    { id: 'APP-1029', schemeName: 'PM-Kisan Samman Nidhi', status: 'Under Review', date: '2026-08-10' },
    { id: 'APP-0941', schemeName: 'PM Fasal Bima Yojana', status: 'Approved', date: '2026-07-22' },
  ];

  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-4">
      <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase bg-emerald-700/60 text-emerald-200 px-3 py-1 rounded-full font-semibold">
            Farmer Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">Welcome Back, Ramesh Kumar 👋</h2>
          <p className="text-emerald-200 text-xs sm:text-sm mt-1">
            District: Ranchi, Jharkhand | Landholding: 2.5 Acres
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-emerald-800/80 p-1.5 rounded-xl border border-emerald-700">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            Saved Schemes
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-white text-emerald-900 shadow'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            My Applications
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'saved' ? (
        <SavedSchemes savedSchemes={savedSchemes} onRemoveScheme={onRemoveScheme} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> Applied Schemes Status
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Scheme Name</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="py-3 px-4 font-mono font-medium text-gray-800">{app.id}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{app.schemeName}</td>
                    <td className="py-3 px-4 text-xs">{app.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          app.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default FarmerDashboard;