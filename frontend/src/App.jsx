import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchemesList from './components/SchemesList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Hero />
          <SchemesList />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;