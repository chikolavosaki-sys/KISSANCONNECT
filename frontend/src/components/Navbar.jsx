import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span className="font-bold text-xl text-emerald-800">KisanConnect</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium text-sm">{t.navHome}</a>
              <a href="#schemes" className="text-gray-700 hover:text-emerald-600 font-medium text-sm">{t.navSchemes}</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium text-sm">{t.navAbout}</a>
            </div>

            <div className="flex items-center space-x-3">
              {/* Language Switch Button */}
              <button
                onClick={toggleLanguage}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 border transition cursor-pointer"
              >
                🌐 {lang === 'en' ? 'हिंदी (HI)' : 'English (EN)'}
              </button>

              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                {t.loginBtn}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;