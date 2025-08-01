// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const CustomerSignup = () => {
//   const [signupMethod, setSignupMethod] = useState("email");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     otp: "",
//   });
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     const { name, email, phone, password } = formData;

//     if (!name || (signupMethod === "email" ? !email || !password : !phone)) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       // Register the user first
//       const registerResponse = await axios.post(
//         "http://localhost:3000/api/auth/customer/signup",
//         {
//           name,
//           email,
//           password,
//           role: "customer",
//         }
//       );

//       console.log(registerResponse.data.message); // Log success message

//       // Now send the OTP
//       const otpResponse = await axios.post(
//         "http://localhost:3000/api/auth/customer/send-otp",
//         {
//           email: signupMethod === "email" ? email : null,
//           phone: signupMethod === "phone" ? phone : null,
//           role: "customer",
//         }
//       );

//       if (otpResponse.data.message === "OTP sent successfully") {
//         setOtpSent(true);
//         setError("");
//       }
//     } catch (err) {
//       if (err.response && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to send OTP or register user");
//       }
//       console.error("Error during OTP send or registration:", err);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     if (!formData.otp) {
//       setError("Please enter the OTP");
//       return;
//     }

//     try {
//       // Send request to verify OTP
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/customer/verify-otp",
//         {
//           email: signupMethod === "email" ? formData.email : null,
//           phone: signupMethod === "phone" ? formData.phone : null,
//           otp: formData.otp,
//           password: signupMethod === "email" ? formData.password : null,
//           role: "customer",
//         }
//       );

//       // Check response message
//       if (response.data.message === "OTP verified successfully") {
//         setError("");
//         alert("OTP Verified Successfully!");

//         // Store credentials based on signup method
//         if (signupMethod === "email") {
//           localStorage.setItem(
//             "userCredentials",
//             JSON.stringify({
//               email: formData.email,
//               password: formData.password,
//             })
//           );
//         } else {
//           localStorage.setItem(
//             "userCredentials",
//             JSON.stringify({
//               phone: formData.phone,
//             })
//           );
//         }

//         // Redirect to login page
//         navigate("/login");
//       } else {
//         // Handle unexpected successful responses without the correct message
//         setError("Unexpected response from server.");
//       }
//     } catch (err) {
//       setError("Failed to verify OTP");
//       console.error("Error during OTP verification:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
//             <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//             <p className="text-gray-600 mt-2">
//               Join as a customer to find trusted builders
//             </p>
//           </div>

//           <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
//             <button
//               onClick={() => setSignupMethod("email")}
//               className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
//                 signupMethod === "email"
//                   ? "bg-white shadow-sm text-blue-600"
//                   : "text-gray-500 hover:text-gray-900"
//               }`}
//             >
//               Email
//             </button>
//             <button
//               onClick={() => setSignupMethod("phone")}
//               className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
//                 signupMethod === "phone"
//                   ? "bg-white shadow-sm text-blue-600"
//                   : "text-gray-500 hover:text-gray-900"
//               }`}
//             >
//               Phone
//             </button>
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
//               {error}
//             </div>
//           )}

//           {!otpSent ? (
//             <form onSubmit={handleSendOTP} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="John Doe"
//                 />
//               </div>

//               {signupMethod === "email" ? (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       placeholder="you@example.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       placeholder="Create a password"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     placeholder="+91 98765 43210"
//                   />
//                 </div>
//               )}
//               <motion.button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Send OTP
//               </motion.button>

//               <div className="mt-6 text-center">
//                 <a
//                   href="/builder/signup"
//                   className="text-sm text-gray-600 hover:text-gray-800"
//                 >
//                   Are you a builder?{" "}
//                   <span className="text-blue-600 hover:text-blue-800">
//                     Sign up here
//                   </span>
//                 </a>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOTP} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   name="otp"
//                   value={formData.otp}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter 6-digit OTP"
//                   maxLength={6}
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Verify OTP
//               </motion.button>

//               <button
//                 type="button"
//                 onClick={() => setOtpSent(false)}
//                 className="w-full text-blue-600 text-sm hover:text-blue-800"
//               >
//                 Change {signupMethod}?
//               </button>
//             </form>
//           )}
//         </div>
//       </div>

//       <div className="hidden lg:block lg:w-1/2 relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
//         <img
//           className="absolute inset-0 w-full h-full object-cover"
//           src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
//           alt="Modern home"
//         />
//         <div className="absolute inset-0 flex items-center justify-center p-12">
//           <div className="text-white text-center">
//             <h2 className="text-4xl font-bold mb-6">
//               Find Your Perfect Builder
//             </h2>
//             <p className="text-lg max-w-md mx-auto">
//               Create an account to connect with professional builders and start
//               your journey
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerSignup;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerSignup = () => {
  const [signupMethod, setSignupMethod] = useState("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const otpInputRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formData;
    if (!name || (signupMethod === "email" ? !email || !password : !phone)) {
      setError("All fields are required.");
      return;
    }
    if (signupMethod === "email" && !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (signupMethod === "email" && !validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    try {
      // Register the user first
      const registerResponse = await axios.post(
        "http://localhost:3000/api/auth/customer/signup",
        {
          name,
          email,
          password,
          role: "customer",
        }
      );
      toast.success(registerResponse.data.message);
      // Now send the OTP
      const otpResponse = await axios.post(
        "http://localhost:3000/api/auth/customer/send-otp",
        {
          email: signupMethod === "email" ? email : null,
          phone: signupMethod === "phone" ? phone : null,
          role: "customer",
        }
      );
      if (
        otpResponse.data.message === "OTP sent successfully via Email" ||
        otpResponse.data.message === "OTP sent successfully via SMS" ||
        otpResponse.data.message === "OTP sent successfully"
      ) {
        setOtpSent(true);
        setError("");
        toast.success("OTP sent successfully");
      } else {
        setError("Failed to send OTP");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.error && err.response.data.error.includes("E11000 duplicate key error")) {
          setError("This email is already registered. Please use a different email.");
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to send OTP or register user");
        }
      } else if (err.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error during OTP send or registration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/customer/verify-otp",
        {
          email: signupMethod === "email" ? formData.email : null,
          phone: signupMethod === "phone" ? formData.phone : null,
          otp: formData.otp,
          password: signupMethod === "email" ? formData.password : null,
          role: "customer",
        }
      );
      if (response.data.message === "OTP verified successfully") {
        setError("");
        toast.success("OTP Verified Successfully!");
        if (signupMethod === "email") {
          localStorage.setItem(
            "userCredentials",
            JSON.stringify({
              email: formData.email,
              password: formData.password,
            })
          );
        } else {
          localStorage.setItem(
            "userCredentials",
            JSON.stringify({
              phone: formData.phone,
            })
          );
        }
        navigate("/login");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to verify OTP");
      } else if (err.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("Failed to verify OTP");
      }
      console.error("Error during OTP verification:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otpSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Join as a customer to find trusted builders
            </p>
          </div>
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setSignupMethod("email")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                signupMethod === "email"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setSignupMethod("phone")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                signupMethod === "phone"
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
          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  {signupMethod === "email" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Create a password"
                        />
                      </div>
                    </>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </motion.button>
                  <div className="mt-6 text-center">
                    <a
                      href="/builder/signup"
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Are you a builder?{" "}
                      <span className="text-blue-600 hover:text-blue-800">
                        Sign up here
                      </span>
                    </a>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
                  <p className="text-gray-600 mt-2">
                    Enter the 6-digit OTP sent to {signupMethod === "email" ? formData.email : formData.phone}
                  </p>
                </div>
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
                      ref={otpInputRef}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? "Verifying OTP..." : "Verify OTP"}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setFormData({ ...formData, otp: "" });
                    }}
                    className="w-full text-blue-600 text-sm hover:text-blue-800 transition"
                  >
                    Change {signupMethod === "email" ? "Email" : "Phone"}?
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="Modern home"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-6">
              Find Your Perfect Builder
            </h2>
            <p className="text-lg max-w-md mx-auto">
              Create an account to connect with professional builders and start your journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;



