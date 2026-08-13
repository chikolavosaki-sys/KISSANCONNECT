import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    navHome: "Home",
    navSchemes: "Schemes",
    navAbout: "About",
    loginBtn: "Login / Register",
    heroTitle: "Empowering Farmers Across India 🌾",
    heroSubtitle: "Easily discover, apply, and track government schemes and subsidies tailored for you.",
    searchPlaceholder: "Search for schemes (e.g. PM-Kisan, Irrigation)...",
    schemesHeader: "Available Government Schemes",
    viewDetails: "View Details",
    applyNow: "Apply Now"
  },
  hi: {
    navHome: "मुख्य पृष्ठ",
    navSchemes: "योजनाएं",
    navAbout: "हमारे बारे में",
    loginBtn: "लॉगिन / रजिस्टर",
    heroTitle: "भारत भर के किसानों का सशक्तिकरण 🌾",
    heroSubtitle: "अपने लिए उपयुक्त सरकारी योजनाओं और सब्सिडी को आसानी से खोजें और लागू करें।",
    searchPlaceholder: "योजनाएं खोजें (जैसे पीएम-किसान, सिंचाई)...",
    schemesHeader: "उपलब्ध सरकारी योजनाएं",
    viewDetails: "विवरण देखें",
    applyNow: "अभी आवेदन करें"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);