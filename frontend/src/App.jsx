import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchemesList from './components/SchemesList';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <SchemesList />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;