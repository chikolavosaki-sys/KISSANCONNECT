import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-emerald-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          {t.heroTitle}
        </h1>
        <p className="text-emerald-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>
        <div className="flex max-w-md mx-auto bg-white rounded-lg p-1.5 shadow-lg">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full px-4 py-2 text-gray-800 focus:outline-none text-sm"
          />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md font-medium text-sm transition">
            🔍
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;