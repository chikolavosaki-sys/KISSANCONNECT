import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl tracking-wide">KisanConnect</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-emerald-200 transition duration-150">
              Home
            </a>
            <a href="#schemes" className="hover:text-emerald-200 transition duration-150">
              Schemes
            </a>
            <a href="#about" className="hover:text-emerald-200 transition duration-150">
              About Us
            </a>
          </div>

          {/* Action Button */}
          <div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;