import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchemesList from './components/SchemesList';
import EligibilityChecker from './components/EligibilityChecker';
import FarmerDashboard from './components/FarmerDashboard';
import SupportHelpline from './components/SupportHelpline';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Saved Schemes State
  const [savedSchemes, setSavedSchemes] = useState([
    {
      id: 1,
      title: "PM-Kisan Samman Nidhi",
      category: "Financial Aid",
      officialUrl: "https://pmkisan.gov.in"
    }
  ]);

  const handleRemoveScheme = (schemeId) => {
    setSavedSchemes(savedSchemes.filter((item) => item.id !== schemeId));
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          {/* Farmer Dashboard Section */}
          <FarmerDashboard 
            savedSchemes={savedSchemes} 
            onRemoveScheme={handleRemoveScheme} 
          />

          <EligibilityChecker />
          <SchemesList searchQuery={searchQuery} />
          <SupportHelpline />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;