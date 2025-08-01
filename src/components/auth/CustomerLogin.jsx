import React, { useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const CustomerLogin = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    const contact = loginMethod === "email" ? formData.email : formData.phone;

    if (!contact) {
      setError(`Please enter your ${loginMethod}`);
      return;
    }

    console.log(`Sending OTP to ${loginMethod}:`, contact);
    setOtpSent(true);
    setError("");
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter the OTP");
      return;
    }

    console.log("Verifying OTP:", formData.otp);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your customer account</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                loginMethod === "email"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                loginMethod === "phone"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Phone
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              {loginMethod === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send OTP
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Verify OTP
              </motion.button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-blue-600 text-sm hover:text-blue-800"
              >
                Change {loginMethod}?
              </button>
            </form>
          )}

          {/* Forgot Password Link */}
          <p className="mt-6 text-center">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot Password?
            </a>
          </p>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/customer/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </a>
          </p>

          <div className="mt-6 text-center">
            <a href="/builder/login" className="text-sm text-gray-600 hover:text-gray-800">
              Are you a builder?{" "}
              <span className="text-blue-600 hover:text-blue-800">Login here</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
          alt="Modern home interior"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Find Your Dream Home</h2>
            <p className="text-lg max-w-md mx-auto">
              Connect with trusted builders and make your dream home a reality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;