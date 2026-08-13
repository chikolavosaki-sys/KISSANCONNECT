import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome Back! 🌾" : "Register with KisanConnect"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isLogin ? "Log in to manage your scheme applications" : "Create an account to apply for government benefits"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile / Email</label>
            <input
              type="text"
              placeholder="Enter mobile number or email"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            onClick={() => {
              alert(isLogin ? "Login Successful!" : "Registration Successful!");
              onClose();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm transition duration-200"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Toggle Option */}
        <div className="mt-5 text-center text-xs text-gray-600 border-t pt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;