import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchemesList from './components/SchemesList';
import EligibilityChecker from './components/EligibilityChecker';
import SupportHelpline from './components/SupportHelpline';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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