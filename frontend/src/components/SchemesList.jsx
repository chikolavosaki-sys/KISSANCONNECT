import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const schemesData = [
  {
    id: 1,
    title: "PM-Kisan Samman Nidhi",
    category: "Financial Aid",
    desc: "Provides income support of ₹6,000 per year in three equal instalments to all landholding farmer families.",
    badge: "₹6,000 / year",
    eligibility: "All landholding farmer families across India (Subject to exclusion criteria).",
    documents: ["Aadhaar Card", "Landholding Ownership Papers", "Bank Account Details"],
    officialUrl: "https://pmkisan.gov.in"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Insurance",
    desc: "Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest.",
    badge: "Up to 90% Coverage",
    eligibility: "Farmers growing notified crops in notified areas including sharecroppers and tenant farmers.",
    documents: ["Aadhaar Card", "Land Sowing Certificate / Crop Receipt", "Bank Passbook"],
    officialUrl: "https://pmfby.gov.in"
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    category: "Loans",
    desc: "Provides timely credit to farmers to meet their cultivation and other needs at a subsidized interest rate.",
    badge: "4% Interest Rate",
    eligibility: "Individual / Joint borrowers, SHGs, tenant farmers, and sharecroppers.",
    documents: ["Duly filled application form", "Identity Proof (Aadhaar/Voter ID)", "Land Documents"],
    officialUrl: "https://pmkisan.gov.in"
  },
  {
    id: 4,
    title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    category: "Irrigation",
    desc: "Aims to expand cultivable area under assured irrigation, improve on-farm water use efficiency, and promote micro-irrigation.",
    badge: "50-55% Subsidy",
    eligibility: "Farmers with cultivable land, members of self-help groups, and water user associations.",
    documents: ["Aadhaar Card", "Land Ownership Record (Khata/Khasra)", "Bank Details"],
    officialUrl: "https://pmksy.gov.in"
  }
];

const categories = ["All", "Financial Aid", "Insurance", "Loans", "Irrigation"];

const SchemesList = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = selectedCategory === "All"
    ? schemesData
    : schemesData.filter(s => s.category === selectedCategory);

  return (
    <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {t.schemesHeader}
        </h2>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {scheme.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.desc}</p>
            </div>

            <button
              onClick={() => setSelectedScheme(scheme)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition mt-2 cursor-pointer"
            >
              {t.viewDetails}
            </button>
          </div>
        ))}
      </div>

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedScheme(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
              {selectedScheme.category}
            </span>

            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
              {selectedScheme.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              {selectedScheme.desc}
            </p>

            <div className="border-t pt-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Eligibility Criteria
                </h4>
                <p className="text-sm text-gray-800">{selectedScheme.eligibility}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Required Documents
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {selectedScheme.documents.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={selectedScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2.5 rounded-lg font-semibold text-sm transition"
              >
                {t.applyNow} ↗
              </a>
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SchemesList;