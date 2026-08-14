import React, { useState } from 'react';

export default function SignIn({ onLoginSuccess }) {
  const [role, setRole] = useState('farmer'); // 'farmer' or 'admin'
  const [formData, setFormData] = useState({
    mobile: '',
    aadhaar: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass authenticated user state to parent app
    onLoginSuccess({
      role: role,
      user: role === 'farmer' ? formData.mobile : formData.email,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Welcome to KisanConnect</h2>
          <p className="text-slate-500 text-sm mt-1">Select your account type to sign in</p>
        </div>

        {/* Role Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'farmer'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌾 Farmer Login
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏢 Admin Portal
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'farmer' ? (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Aadhaar Number (Optional)
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  placeholder="12-digit Aadhaar for instant verification"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Department Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@kisanconnect.gov.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            {role === 'farmer' ? 'Continue to Profile Building →' : 'Sign In as Admin →'}
          </button>
        </form>
      </div>
    </div>
  );
}