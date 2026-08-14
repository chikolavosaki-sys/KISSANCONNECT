import React from 'react';

const SupportHelpline = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-6">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-3xl">
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            24/7 Assistance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 mb-4">
            Need Help with Schemes or Applications?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mb-6">
            Get direct support from official Kisan Call Centers and government agriculture helpdesks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-xs text-emerald-200 uppercase font-bold">Kisan Call Center (Toll-Free)</p>
              <p className="text-2xl font-bold mt-1 text-white">📞 1551</p>
              <p className="text-xs text-emerald-100 mt-1">Available 6:00 AM to 10:00 PM</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-xs text-emerald-200 uppercase font-bold">PM-Kisan Helpdesk</p>
              <p className="text-lg font-bold mt-1 text-white">✉️ pmkisan-ict@gov.in</p>
              <p className="text-xs text-emerald-100 mt-1">Helpline: 011-24300606</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHelpline;