import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SchemesList = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      id: 1,
      title: "PM-Kisan Samman Nidhi",
      category: "Financial Aid",
      desc: "Provides income support of ₹6,000 per year in three equal instalments to all landholding farmer families.",
      badge: "₹6,000 / year"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "Insurance",
      desc: "Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest.",
      badge: "Up to 90% Coverage"
    },
    {
      id: 3,
      title: "Kisan Credit Card (KCC)",
      category: "Loans",
      desc: "Provides timely credit to farmers to meet their cultivation and other needs at a subsidized interest rate.",
      badge: "4% Interest Rate"
    }
  ];

  return (
    <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t.schemesHeader}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
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

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition mt-2">
              {t.viewDetails}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SchemesList;