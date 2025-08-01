import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedConstructors from "./components/FeaturedConstructors";
import ConstructorProfile from "./components/ConstructorProfile";
import ConstructorDetails from "./components/ConstructorDetails";
import HowItWorks from "./components/HowItWorks";
import ContactSection from "./components/ContactSection";
import BuilderLogin from "./components/auth/BuilderLogin";
import BuilderSignup from "./components/auth/BuilderSignup";
import CustomerLogin from "./components/auth/CustomerLogin";
import RoleLogin from "./components/auth/RoleBaselogin";
import CustomerSignup from "./components/auth/CustomerSignup";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Write from "./components/Write";
import AllReviews from "./components/AllReviews";
import ForgetPassword from "./components/auth/ForgetPassword";
import AllConstructors from "./components/AllConstructors";
import About from "./components/About";
import ProfileCard from "./components/ProfilePage";
import ReviewDetail from "./components/ReviewDetail";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Signup from "./components/Signup";
import SubscriptionPlan from "./components/SubscriptionPlan";
import ReplyForm from "./components/ReplyForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId="164602834709-eik4sr0ue69f5rtmlm9didnais0f40bu.apps.googleusercontent.com">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/login" element={<RoleLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/builder/login" element={<BuilderLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/builder/signup" element={<BuilderSignup />} />
            <Route path="/customer/login" element={<CustomerLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/customer/signup" element={<CustomerSignup />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/about" element={<About />} />
            <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/profile/:id" element={<ProtectedRoute><ConstructorProfile /></ProtectedRoute>} />
            <Route path="/all-reviews/:projectId" element={<ProtectedRoute><AllReviews /></ProtectedRoute>} />
            <Route path="/all-constructors" element={<ProtectedRoute><AllConstructors /></ProtectedRoute>} />
            <Route path="/constructor/:id" element={<ProtectedRoute><ConstructorDetails /></ProtectedRoute>} />
            <Route path="/all-reviews" element={<ProtectedRoute><AllReviews /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileCard /></ProtectedRoute>} />
            <Route path="/review/:id" element={<ProtectedRoute><ReviewDetail /></ProtectedRoute>} />
            <Route path="/Terms" element={<TermsAndConditions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/subscription" element={<SubscriptionPlan />} />
            <Route path="/reply" element={<ProtectedRoute><ReplyForm /></ProtectedRoute>} />
            <Route
              path="/home"
              element={
                <>
                  <HeroSection />
                  <FeaturedConstructors />
                  <HowItWorks />
                  <Reviews />
                </>
              }
            />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
