import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../Assets/Images/BannerImg/img1.jpg";
import img2 from "../Assets/Images/BannerImg/img2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye, EyeOff } from "lucide-react";
import { useInView } from "react-intersection-observer";

const BeforeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (storedCredentials) {
      if ((storedCredentials.email && storedCredentials.email === email && storedCredentials.password === password) ||
          (storedCredentials.phone && storedCredentials.phone === email)) {
        alert("Sign-in successful!");
        navigate("/home");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } else {
      alert("No user found. Please sign up.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className="row w-100 mt-5 d-flex align-items-center justify-content-center">
        <div
          className="col-md-3 d-none d-md-block bg-image"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
          }}
        ></div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <h2 className="text-success fw-bold mb-3">Sign In to Your Account</h2>
          <p className="text-secondary ms-5 me-4 mb-2">
            Welcome back! Please sign in with your credentials.
          </p>
          <div className="login-box">
            <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="me-2"
                style={{ width: "20px" }}
              />
              Sign in with Google
            </button>
            <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="me-2"
                style={{ width: "20px" }}
              />
              Sign in with Facebook
            </button>
            <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="me-2"
                style={{ width: "20px" }}
              />
              Sign in with Apple
            </button>
            <div className="text-center text-muted my-3">or</div>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="form-control mb-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 mb-2"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div
          className="col-md-3 d-none d-md-block bg-image"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
          }}
        ></div>
      </div>
      <p className="mt-2 fs-5">
        Don't have an account?{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={handleSignupRedirect}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default BeforeLogin;
