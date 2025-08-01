import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import img1 from "../Assets/Images/BannerImg/img1.jpg";
import img2 from "../Assets/Images/BannerImg/img2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCustomerDetailsForm, setShowCustomerDetailsForm] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    if (email) {
      setShowCustomerDetailsForm(true);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleCustomerDetailsSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "https://review-backend-vercel.vercel.app/api/auth/register",
        {
          name: customerName,
          email,
          password,
          role: "customer",
        }
      );
      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/home");
        localStorage.setItem("token", token);
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className="row w-100 mt-5">
        <div
          className="col-md-3 d-none d-md-block bg-image-static"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <h2 className="text-success fw-bold mb-3">Create an Account</h2>
          <p className="text-secondary mb-2">
            By continuing, you agree to our
            <a href="/Terms" className="text-primary mx-1">
              Terms of Use
            </a>
            and acknowledge our
            <a href="/privacy-policy" className="text-primary mx-1">
              Privacy Policy
            </a>
            .
          </p>

          <div className="login-box">
            <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="me-2"
                style={{ width: "20px" }}
              />
              Continue with Google
            </button>

            {/* <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="me-2"
                style={{ width: "20px" }}
              />
              Continue with Facebook
            </button> */}

            <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="me-2"
                style={{ width: "20px" }}
              />
              Continue with Apple
            </button>

            <div className="text-center text-muted my-3">or</div>

            <input
              type="email"
              placeholder="Enter email"
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              className="btn btn-dark w-100 mb-2"
              onClick={handleEmailLogin}
            >
              Continue with email
            </button>
          </div>

          {showCustomerDetailsForm && (
            <form onSubmit={handleCustomerDetailsSubmit} className="mt-3">
              <h3 className="text-center mb-3 fs-2">Customer Details</h3>

              <input
                type="text"
                placeholder="Customer Name"
                className="form-control mb-2 fs-6 rounded"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{ fontWeight: "bold" }}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="form-control mb-2 fs-6 rounded"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                style={{ fontWeight: "bold" }}
              />

              <div
                className="input-group mb-2"
                style={{ position: "relative" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="form-control fs-6 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontWeight: "bold", paddingRight: "3rem" }}
                />
                <span
                  className="input-group-text bg-transparent border-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "37%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div
                className="input-group mb-2"
                style={{ position: "relative" }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="form-control fs-6 rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ fontWeight: "bold", paddingRight: "3rem" }}
                />
                <span
                  className="input-group-text bg-transparent border-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "37%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-success w-75 mt-2 rounded"
              >
                Submit Details
              </button>
            </form>
          )}
        </div>

        <div
          className="col-md-3 d-none d-md-block bg-image-static"
          style={{ backgroundImage: `url(${img2})` }}
        ></div>
      </div>

      <p className="mt-2 fs-5">
        Already have an account?{" "}
        <a className="text-primary" href="/">
          Sign in
        </a>
      </p>

      <style>{`
        .bg-image-static {
          background-size: cover;
          background-position: center;
          height: 400px;
        }
        .login-box {
          padding: 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .form-control {
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default Signup;
