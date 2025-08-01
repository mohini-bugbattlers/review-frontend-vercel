import React, { useState, useEffect, useRef } from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  Menu,
  X,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer");
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({ email: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const popupRef = useRef(null);
  const loginPopupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (showLoginPopup && loginPopupRef.current) {
      loginPopupRef.current.focus();
    }
  }, [showLoginPopup]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const reviews = [
    { id: 1, builder: "ABC Construction", name: "Project Alpha" },
    { id: 2, builder: "XYZ Builders", name: "Project Beta" },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = reviews.filter((review) =>
      review.builder.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (isLoggedIn) {
      navigate("/all-reviews");
    } else {
      setShowLoginPopup(true);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/profile");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (link) => {
    if (isLoggedIn) {
      navigate(link.to);
    } else {
      setRedirectPath(link.to);
      setShowLoginPopup(true);
    }
    setIsMobileMenuOpen(false);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least 8 characters, including at least one number, one special character, one uppercase and one lowercase letter."
      );
      return;
    }
    try {
      const response = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      if (token) {
        toast.success("Customer login successful!");
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true); // Update state immediately
        setShowLoginPopup(false);
        window.location.reload();
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials. Please check your email and password.");
      } else {
        setError("Server error. Please try again later.");
      }
      console.error("Error during login attempt:", err);
    }
  };

  const responseGoogle = async (credentialResponse) => {
    console.log("Google response:", credentialResponse);
    try {
      const res = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/login/google",
        {
          token: credentialResponse.credential,
        }
      );
      const { token } = res.data;
      if (token) {
        toast.success("Google login successful!");
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true); // Update state immediately
        setShowLoginPopup(false);
        window.location.reload();
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      } else {
        setError("Google login failed. No token received.");
      }
    } catch (err) {
      setError("Google login failed. Please try again later.");
      console.error("Google login error:", err);
    }
  };

  const responseFacebook = async (response) => {
    try {
      const res = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/login/facebook",
        {
          accessToken: response.accessToken,
          userID: response.userID,
        }
      );
      const { token } = res.data;
      if (token) {
        toast.success("Facebook login successful!");
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true); // Update state immediately
        setShowLoginPopup(false);
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      } else {
        setError("Facebook login failed. No token received.");
      }
    } catch (err) {
      setError("Facebook login failed. Please try again later.");
      console.error("Facebook login error:", err);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const { email, phone } = formData;
    if (
      (loginMethod === "email" && !email) ||
      (loginMethod === "phone" && !phone)
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/customer/send-otp",
        {
          email: loginMethod === "email" ? email : null,
          phone: loginMethod === "phone" ? phone : null,
          role: "customer",
        }
      );
      if (response.data.message === "OTP sent successfully") {
        setOtpSent(true);
        setError("");
        toast.success("OTP sent successfully!");
      }
    } catch (err) {
      setError("Failed to send OTP");
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const { otp } = formData;
    try {
      const response = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/customer/verify-otp",
        {
          otp,
          email: loginMethod === "email" ? formData.email : null,
          phone: loginMethod === "phone" ? formData.phone : null,
        }
      );
      if (response.data.message === "OTP verified successfully") {
        toast.success("Builder login successful!");
        setIsLoggedIn(true); // Update state immediately
        setShowLoginPopup(false);
        window.location.reload();
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      } else {
        setError("Invalid OTP.");
        toast.error("Invalid OTP.");
      }
    } catch (err) {
      setError("Failed to verify OTP");
      toast.error("Failed to verify OTP");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
    setError("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLoginPopup(false);
      }
    };
    if (showLoginPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginPopup]);

  const navigationLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/all-constructors", label: "Reviews" },
    { to: "/how-it-works", label: "Help" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      className="bg-gradient-to-r from-black to-gray-900 shadow-lg fixed w-full z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Building2 className="h-12 w-12 text-blue-500" />
            <HashLink
              to="/home"
              smooth
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide hover:text-blue-200 transition duration-300"
            >
              Builder Reviews
            </HashLink>
          </motion.div>
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-gray-300 hover:text-white font-medium transition duration-300 cursor-pointer"
                  onClick={() => handleMenuClick(link)}
                >
                  {link.label}
                </span>
              </motion.div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search company and projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <motion.button
              onClick={handleSearchSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </motion.button>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-white cursor-pointer"
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-6 w-6" />
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            )}
            <motion.button
              className="lg:hidden text-white p-2"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 mt-4">
            {navigationLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-gray-300 hover:text-white font-medium transition duration-300 cursor-pointer"
                  onClick={() => handleMenuClick(link)}
                >
                  {link.label}
                </span>
              </motion.div>
            ))}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search company and projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <motion.button
              onClick={() => {
                handleSearchSubmit();
                setIsMobileMenuOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </motion.button>
            {isLoggedIn && (
              <motion.button
                onClick={handleLogout}
                className="text-white border border-white px-3 py-1 rounded transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            )}
          </div>
        )}
      </div>
      {showLoginPopup && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <ToastContainer />
            <div className="flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-green-600 font-bold mb-3">
                Your work people are here
              </h2>
              <p className="text-gray-500 mb-2">
                Create an account or sign in. By continuing, you agree to our
                <a href="#" className="text-blue-500 mx-1">
                  Terms of Use
                </a>
                and acknowledge our
                <a href="#" className="text-blue-500 mx-1">
                  Privacy Policy
                </a>
                .
              </p>

              {role === "customer" ? (
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={() => {
                      setError("Google login failed. Please try again.");
                      console.error("Google login failed");
                    }}
                    className="btn btn-light w-full mb-2 d-flex align-items-center justify-content-center border"
                  />

                  <div className="text-center text-muted my-3">or</div>
                  <form onSubmit={handleCustomerLogin}>
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="form-control w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="form-control w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </span>
                    </div>
                    {error && (
                      <div className="alert alert-danger py-2">{error}</div>
                    )}
                    <button type="submit" className="btn btn-primary w-full">
                      Sign In
                    </button>
                  </form>
                  <p className="mt-3">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/customer/signup")}
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <div className="d-flex mb-3 bg-light rounded">
                    <button
                      className={`flex-fill py-2 btn ${
                        loginMethod === "email"
                          ? "btn-light text-primary fw-bold"
                          : "btn-link"
                      }`}
                      onClick={() => setLoginMethod("email")}
                    >
                      Email
                    </button>
                    <button
                      className={`flex-fill py-2 btn ${
                        loginMethod === "phone"
                          ? "btn-light text-primary fw-bold"
                          : "btn-link"
                      }`}
                      onClick={() => setLoginMethod("phone")}
                    >
                      Phone
                    </button>
                  </div>
                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}
                  {!otpSent ? (
                    <form onSubmit={handleSendOTP}>
                      <div className="mb-3">
                        <label className="form-label">
                          {loginMethod === "email"
                            ? "Email Address"
                            : "Phone Number"}
                        </label>
                        <input
                          type={loginMethod === "email" ? "email" : "tel"}
                          name={loginMethod}
                          value={formData[loginMethod]}
                          onChange={handleChange}
                          className="form-control w-full"
                          placeholder={
                            loginMethod === "email"
                              ? "you@example.com"
                              : "+91 9876543210"
                          }
                          required
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="btn btn-primary w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send OTP
                      </motion.button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP}>
                      <div className="mb-3">
                        <label className="form-label">Enter OTP</label>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          className="form-control w-full"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="btn btn-success w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Verify OTP
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setFormData({ ...formData, otp: "" });
                        }}
                        className="btn btn-link w-full mt-2"
                      >
                        Change {loginMethod}?
                      </button>
                    </form>
                  )}
                  <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center mt-3">
                    <span>Don't have a builder account? </span>
                    <a
                      href="/builder/signup"
                      className="text-decoration-none text-primary"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
