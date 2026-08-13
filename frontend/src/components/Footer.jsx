import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-100 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-3">
              <span>🌾</span>
              <span>KisanConnect</span>
            </div>
            <p className="text-sm text-emerald-200">
              Connecting Indian farmers with direct government agricultural schemes, subsidies, and financial aid.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-emerald-200">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#schemes" className="hover:text-white transition">Government Schemes</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support & Helpline</h4>
            <p className="text-sm text-emerald-200">📞 Kisan Toll-Free: 1800-180-1551</p>
            <p className="text-sm text-emerald-200 mt-1">✉️ Email: support@kisanconnect.gov.in</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-800 mt-8 pt-6 text-center text-xs text-emerald-300">
          © {new Date().getFullYear()} KisanConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;