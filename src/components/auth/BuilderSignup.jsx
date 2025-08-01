// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Building2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BuilderSignup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     licenseNumber: "",
//     password: "",
//     otp: "",
//   });
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();
//   const otpInputRef = useRef(null);

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[`\]s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 6;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     const { name, email, licenseNumber, password } = formData;
//     if (!name || !email || !licenseNumber || !password) {
//       toast.error("All fields are required.");
//       return;
//     }
//     if (!validatePassword(password)) {
//       toast.error("Password must be at least 6 characters long.");
//       return;
//     }
//     try {
//       const registerResponse = await axios.post(
//         "http://localhost:3000/api/auth/builder/signup",
//         {
//           name,
//           email,
//           password,
//           licenseNumber,
//           role: "builder",
//         }
//       );
//       toast.success(registerResponse.data.message);
//       const otpResponse = await axios.post(
//         "http://localhost:3000/api/auth/builder/send-otp",
//         {
//           email,
//           role: "builder",
//         }
//       );
//       console.log("OTP Response:", otpResponse.data); // Log the response
//       if (
//         otpResponse.data.message === "OTP sent successfully via SMS" ||
//         otpResponse.data.message === "OTP sent successfully via Email"
//       ) {
//         setOtpSent(true);
//         setError("");
//         toast.success("OTP sent successfully");
//         console.log("OTP Sent State:", otpSent); // Log the state change
//       }
//     } catch (err) {
//       console.error("Error during OTP send or registration:", err);
//       if (err.response && err.response.data.message) {
//         toast.error("User already exists" || err.response.data.message);
//       } else {
//         toast.error("Failed to send OTP or register builder");
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("OTP Sent State Changed:", otpSent); // Log state change
//     if (otpSent && otpInputRef.current) {
//       otpInputRef.current.focus();
//     }
//   }, [otpSent]);

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     if (!formData.otp || formData.otp.length !== 6) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/builder/verify-otp",
//         {
//           email: formData.email,
//           otp: formData.otp,
//           password: formData.password,
//           role: "builder",
//         }
//       );

//       if (response.data.message === "OTP verified successfully") {
//         setError("");
//         toast.success("OTP Verified Successfully!");
//         localStorage.setItem(
//           "userCredentials",
//           JSON.stringify({
//             email: formData.email,
//             password: formData.password,
//           })
//         );
//         navigate("/login");
//       }
//     } catch (err) {
//       toast.error("Failed to verify OTP");
//       console.error("Error during OTP verification:", err);
//     }
//   };

//   useEffect(() => {
//     if (otpSent && otpInputRef.current) {
//       otpInputRef.current.focus();
//     }
//   }, [otpSent]);

//   return (
//     <div className="min-h-screen flex">
//       <ToastContainer />
//       <div className="hidden lg:block lg:w-1/2 relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-600/90 mix-blend-multiply"></div>
//         <img
//           className="absolute inset-0 w-full h-full object-cover"
//           src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
//           alt="Construction site"
//         />
//         <div className="absolute inset-0 flex items-center justify-center p-12">
//           <div className="text-white text-center">
//             <h2 className="text-4xl font-bold mb-6">
//               Join Our Builder Network
//             </h2>
//             <p className="text-lg max-w-md mx-auto">
//               Showcase your work and connect with potential clients looking for
//               quality builders
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
//         <AnimatePresence mode="wait">
//           {!otpSent ? (
//             <motion.div
//               key="signup-form"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ duration: 0.3 }}
//               className="w-full max-w-md"
//             >
//               <div className="text-center mb-8">
//                 <Building2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   Builder Registration
//                 </h2>
//                 <p className="text-gray-600 mt-2">
//                   Create your builder account
//                 </p>
//               </div>
//               {error && (
//                 <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSendOTP} className="space-y-6">
//                 <input
//                   name="name"
//                   placeholder="Company Name"
//                   onChange={handleChange}
//                   value={formData.name}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 />
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   value={formData.email}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 />
//                 <input
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   value={formData.password}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 />
//                 <input
//                   name="licenseNumber"
//                   placeholder="License Number"
//                   onChange={handleChange}
//                   value={formData.licenseNumber}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 />
//                 <motion.button
//                   type="submit"
//                   className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Send OTP
//                 </motion.button>
//               </form>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="otp-form"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.3 }}
//               className="w-full max-w-md"
//             >
//               <div className="text-center mb-8">
//                 <Building2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
//                 <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
//                 <p className="text-gray-600 mt-2">
//                   Enter the 6-digit OTP sent to {formData.email}
//                 </p>
//               </div>
//               {error && (
//                 <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleVerifyOTP} className="space-y-6">
//                 <input
//                   name="otp"
//                   placeholder="Enter 6-digit OTP"
//                   maxLength={6}
//                   onChange={handleChange}
//                   value={formData.otp}
//                   ref={otpInputRef}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest"
//                   type="text"
//                   inputMode="numeric"
//                   pattern="[0-9]*"
//                 />
//                 <motion.button
//                   type="submit"
//                   className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Verify OTP
//                 </motion.button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOtpSent(false);
//                     setFormData({ ...formData, otp: "" });
//                   }}
//                   className="w-full text-purple-600 text-sm hover:text-purple-800 transition"
//                 >
//                   Change Email?
//                 </button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default BuilderSignup;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuilderSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    licenseNumber: "",
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
    const { name, email, licenseNumber, password } = formData;

    if (!name || !email || !licenseNumber || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // First, register the user
      const registerResponse = await axios.post(
        "http://localhost:3000/api/auth/builder/signup",
        {
          name,
          email,
          password,
          licenseNumber,
          role: "builder",
        }
      );

      toast.success(registerResponse.data.message);

      // Then, send the OTP
      const otpResponse = await axios.post(
        "http://localhost:3000/api/auth/builder/send-otp",
        {
          email,
          role: "builder",
        }
      );

      console.log("OTP Response:", otpResponse.data);

      if (
        otpResponse.data.message === "OTP sent successfully via SMS" ||
        otpResponse.data.message === "OTP sent successfully via Email"
      ) {
        setOtpSent(true);
        setError("");
        toast.success("OTP sent successfully");
        console.log("OTP Sent State:", otpSent);
      }
    } catch (err) {
      console.error("Error during OTP send or registration:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(err.response.data.message || "An error occurred. Please try again.");
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("No response received from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("OTP Sent State Changed:", otpSent);
    if (otpSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [otpSent]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/builder/verify-otp",
        {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
          role: "builder",
        }
      );

      if (response.data.message === "OTP verified successfully") {
        setError("");
        toast.success("OTP Verified Successfully!");
        localStorage.setItem(
          "userCredentials",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        );
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      if (err.response) {
        toast.error(err.response.data.message || "Failed to verify OTP");
      } else if (err.request) {
        toast.error("No response received from the server. Please try again.");
      } else {
        toast.error("Failed to verify OTP");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-600/90 mix-blend-multiply"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
          alt="Construction site"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-6">
              Join Our Builder Network
            </h2>
            <p className="text-lg max-w-md mx-auto">
              Showcase your work and connect with potential clients looking for
              quality builders
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Builder Registration
                </h2>
                <p className="text-gray-600 mt-2">
                  Create your builder account
                </p>
              </div>
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}
              <form onSubmit={handleSendOTP} className="space-y-6">
                <input
                  name="name"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="licenseNumber"
                  placeholder="License Number"
                  onChange={handleChange}
                  value={formData.licenseNumber}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:bg-purple-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
                <p className="text-gray-600 mt-2">
                  Enter the 6-digit OTP sent to {formData.email}
                </p>
              </div>
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <input
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  onChange={handleChange}
                  value={formData.otp}
                  ref={otpInputRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:bg-purple-400"
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
                  className="w-full text-purple-600 text-sm hover:text-purple-800 transition"
                >
                  Change Email?
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuilderSignup;
