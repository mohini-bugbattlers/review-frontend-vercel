import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      setError("Please enter both current and new passwords.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://review-backend-vercel.vercel.app/api/auth/change-password",
        {
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password changed successfully:", response.data.message);
      setConfirmation(true);
      setError("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(
        "Error changing password:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Change Password
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your current and new password to change it.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mt-4">
            {error}
          </div>
        )}

        {confirmation ? (
          <div className="text-center mt-6">
            <p className="text-green-600 text-lg font-medium">
              Password updated successfully.
            </p>
            <a
              href="/login"
              className="mt-4 inline-block text-purple-600 font-medium hover:text-purple-800"
            >
              Back to Login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="New password"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Change Password
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
