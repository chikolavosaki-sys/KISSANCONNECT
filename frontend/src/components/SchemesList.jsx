import React, { useState } from 'react';

const schemesData = [
  {
    id: 1,
    title: "PM-Kisan Samman Nidhi",
    category: "Financial Aid",
    description: "Provides income support of ₹6,000 per year in three equal instalments to all landholding farmer families.",
    benefit: "₹6,000 / year",
    badgeColor: "bg-blue-100 text-blue-800",
    eligibility: "Small and marginal farmers holding cultivable land up to 2 hectares.",
    documents: ["Aadhaar Card", "Land Ownership Papers", "Bank Account Details"]
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Insurance",
    description: "Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest.",
    benefit: "Up to 90% Coverage",
    badgeColor: "bg-purple-100 text-purple-800",
    eligibility: "All farmers growing notified crops in notified areas including sharecroppers.",
    documents: ["Land Revenue Receipt", "Sowing Certificate", "Bank Passbook", "Aadhaar Card"]
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    category: "Loans",
    description: "Provides timely credit to farmers to meet their cultivation and other emergency agricultural needs.",
    benefit: "4% Interest Rate",
    badgeColor: "bg-green-100 text-green-800",
    eligibility: "Farmers - individual/joint borrowers, tenant farmers, and self-help groups.",
    documents: ["Identity Proof", "Address Proof", "Land Ownership Documents"]
  },
  {
    id: 4,
    title: "PM Krishi Sinchayee Yojana (PMKSY)",
    category: "Irrigation",
    description: "Focuses on 'More Crop Per Drop' by providing subsidies on drip and sprinkler irrigation systems.",
    benefit: "50-55% Subsidy",
    badgeColor: "bg-yellow-100 text-yellow-800",
    eligibility: "Farmers owning land or having land under lease for at least 7 years.",
    documents: ["Land Records", "Water Source Availability Proof", "Bank Account Details"]
  },
];

const categories = ["All", "Financial Aid", "Insurance", "Loans", "Irrigation"];

const SchemesList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = selectedCategory === "All"
    ? schemesData
    : schemesData.filter((scheme) => scheme.category === selectedCategory);

  return (
    <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Government Schemes</h2>
        <p className="mt-2 text-gray-600">Explore popular schemes and apply directly for benefits.</p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              selectedCategory === cat
                ? "bg-emerald-700 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scheme.badgeColor}`}>
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {scheme.benefit}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{scheme.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">Govt Verified ✅</span>
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedScheme(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
            >
              ✕
            </button>
            
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${selectedScheme.badgeColor}`}>
              {selectedScheme.category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedScheme.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{selectedScheme.description}</p>

            <div className="space-y-3 border-t pt-4">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Eligibility Criteria:</h4>
                <p className="text-sm text-gray-600">{selectedScheme.eligibility}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Required Documents:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {selectedScheme.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-sm"
              >
                Close
              </button>
              <button
                onClick={() => alert("Redirecting to Portal...")}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 text-sm"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SchemesList;