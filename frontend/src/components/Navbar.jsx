import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <span>🌾</span>
            <span>KissanConnect</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#schemes" className="hover:text-emerald-200 transition">
              {t.schemesHeader}
            </a>
            <a href="#about" className="hover:text-emerald-200 transition">
              About
            </a>

            {/* Language Switcher */}
            <div className="flex bg-emerald-800 rounded-lg p-1 border border-emerald-600">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  lang === 'en' ? 'bg-white text-emerald-800 shadow' : 'text-emerald-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  lang === 'hi' ? 'bg-white text-emerald-800 shadow' : 'text-emerald-100 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Language Switcher Mobile */}
            <div className="flex bg-emerald-800 rounded-lg p-0.5 border border-emerald-600">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-emerald-800' : 'text-emerald-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  lang === 'hi' ? 'bg-white text-emerald-800' : 'text-emerald-100'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-emerald-800 focus:outline-none"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800 border-t border-emerald-600 px-4 pt-2 pb-4 space-y-2">
          <a
            href="#schemes"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
          >
            {t.schemesHeader}
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
          >
            About
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;