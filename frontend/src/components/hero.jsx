import React from 'react';

const Hero = () => {
  const categories = [
    { title: '🌾 Crop Insurance', desc: 'Protect crops from natural calamities' },
    { title: '🚜 Machinery Subsidy', desc: 'Financial aid for farming equipment' },
    { title: '💧 Irrigation & Solar', desc: 'Solar pumps & water management' },
    { title: '💳 Farmer Credit / Loans', desc: 'Low-interest loans & credit cards' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Title Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
        Empowering Farmers with <span className="text-emerald-700">Smart Schemes</span> 🌾
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Find government agricultural schemes, subsidies, and financial support tailored specifically to your needs.
      </p>

      {/* Search Bar */}
      <div className="mt-8 max-w-xl mx-auto flex items-center bg-white rounded-xl shadow-md border border-gray-200 p-2">
        <input
          type="text"
          placeholder="Search schemes by crop, state, or benefit..."
          className="w-full px-4 py-2 text-gray-700 outline-none rounded-l-xl"
        />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-200">
          Search
        </button>
      </div>

      {/* Category Cards */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer text-left"
          >
            <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;