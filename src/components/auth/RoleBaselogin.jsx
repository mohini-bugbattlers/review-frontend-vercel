import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google"; // Updated library

import img1 from "../../Assets/Images/BannerImg/img1.jpg";
import img2 from "../../Assets/Images/BannerImg/img2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RoleLogin = () => {
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({ email: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      const role = response.data.user.role;
      console.log(role);

      if (token) {
        toast.success("Customer login successful!");
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        navigate("/home");
        window.location.reload();
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
    console.log("Google response:", credentialResponse); // Debug
    try {
      const res = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/login/google",
        {
          token: credentialResponse.credential, // Use credential instead of tokenId
        }
      );
      const { token } = res.data;
      if (token) {
        toast.success("Google login successful!");
        sessionStorage.setItem("token", token);
        navigate("/home");
      } else {
        setError("Google login failed. No token received.");
      }
    } catch (err) {
      setError("Google login failed. Please try again later.");
      console.error("Google login error:", err);
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
        navigate("/builder/dashboard");
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

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="text-center mt-4">
        <button
          className={`btn btn-${
            role === "customer" ? "primary" : "outline-primary"
          } mx-2`}
          onClick={() => setRole("customer")}
        >
          Customer
        </button>
        <button
          className={`btn btn-${
            role === "builder" ? "primary" : "outline-primary"
          } mx-2`}
          onClick={() => setRole("builder")}
        >
          Builder
        </button>
      </div>
      {role === "customer" ? (
        <div className="container d-flex justify-content-center align-items-center py-5">
          <div className="row w-100 mt-4 d-flex align-items-center justify-content-center">
            <div
              className="col-md-4 d-none d-md-block"
              style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
              }}
            />
            <div className="col-md-3 text-center p-4 bg-white rounded shadow">
              <h2 className="text-success fw-bold mb-2">
                Sign In to Your Account
              </h2>
              <p className="text-secondary mb-2">
                Welcome back! Please sign in.
              </p>
              <div className="login-box">
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    setError("Google login failed. Please try again.");
                    console.error("Google login failed");
                  }}
                  className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border"
                />
                {/* <FacebookLogin
                  appId="YOUR_FACEBOOK_APP_ID"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border"
                  icon="fa-facebook"
                  textButton="Continue with Facebook"
                /> */}
                <div className="text-center text-muted my-3">or</div>
              </div>
              <form onSubmit={handleCustomerLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}
                <button type="submit" className="btn btn-primary w-100">
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
            <div
              className="col-md-4 d-none d-md-block"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light py-5">
          <div className="row w-100 max-w-screen-lg shadow rounded overflow-hidden">
            <div className="col-lg-6 position-relative p-0 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
                alt="Construction site"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-white text-center p-4">
                <h2 className="fw-bold mb-3">Grow Your Business</h2>
                <p>
                  Connect with potential clients and showcase your exceptional
                  work
                </p>
              </div>
            </div>
            <div className="col-lg-6 bg-white p-4 p-md-5">
              <div className="text-center mb-4">
                <Building2 className="text-primary mb-3" size={40} />
                <h3 className="fw-bold">Builder Login</h3>
                <p className="text-muted">Access your builder dashboard</p>
              </div>
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
              {error && <div className="alert alert-danger py-2">{error}</div>}
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
                      className="form-control"
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
                    className="btn btn-primary w-100"
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
                      className="form-control"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-success w-100"
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
                    className="btn btn-link w-100 mt-2"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleLogin;
