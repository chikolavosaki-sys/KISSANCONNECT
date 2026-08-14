import React, { useState } from 'react';
import SignIn from './components/SignIn';
import FarmerProfileForm from './components/FarmerProfileForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleProfileSubmit = (profileData) => {
    setFarmerProfile(profileData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFarmerProfile(null);
  };

  if (!currentUser) {
    return <SignIn onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentUser.role === 'farmer' && !farmerProfile) {
    return <FarmerProfileForm onSubmitProfile={handleProfileSubmit} />;
  }

  return (
    <div>
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <div className="font-bold text-emerald-700 text-xl tracking-tight">🌱 KisanConnect</div>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md uppercase">
            Role: {currentUser.role}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-red-600 hover:text-red-800 transition"
          >
            Logout ↵
          </button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <Dashboard userRole={currentUser.role} farmerProfile={farmerProfile} />
    </div>
  );
}