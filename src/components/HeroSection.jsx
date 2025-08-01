import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllReviews from "./AllReviews";
import MainContentVideo from "../Assets/Images/sketch-video.mp4";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }
    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  const cardSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div
        className="relative h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex w-full min-h-screen transition-transform ease-in-out"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {/* Main Content Slide with Video Background */}
          <div className="min-w-full h-screen flex items-center justify-center relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute z-0 w-full h-full object-cover"
            >
              <source src={MainContentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 mx-auto w-full">
              <Building2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-blue-400 mb-4 mx-auto animate-pulse" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
                Find & Review{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                  Trusted Builders
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl mt-2 text-gray-200">
                Real reviews from real customers. <br className="hidden sm:block" /> Build with confidence.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* <motion.div
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/search">Find Builders</Link>
                </motion.div> */}
                <motion.div
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 text-white border border-white/20 rounded-lg shadow-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/write">Write a Review</Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Advertisement Slide with Image Background */}
          <div className="min-w-full h-screen flex items-center justify-center bg-cover bg-center relative bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800')]">
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
                Special Offers
              </h2>
              <Slider {...cardSliderSettings}>
                {[
                  {
                    title: "50% Off New Builds",
                    description:
                      "Get 50% off labor costs on your next construction project with our trusted partners.",
                    link: "/offers/new-builds",
                  },
                  {
                    title: "Free Consultation",
                    description:
                      "Schedule a free consultation with top-rated builders in your area.",
                    link: "/offers/consultation",
                  },
                  {
                    title: "Exclusive Materials Deal",
                    description:
                      "Save up to 30% on premium construction materials when you hire through us.",
                    link: "/offers/materials",
                  },
                ].map((ad, idx) => (
                  <div key={idx} className="p-4">
                    <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-md">
                      <h3 className="text-lg sm:text-xl font-semibold">{ad.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-gray-300">
                        {ad.description}
                      </p>
                      <Link
                        to={ad.link}
                        className="mt-3 inline-block text-blue-400 hover:text-blue-500 text-xs sm:text-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Third Slide with Reviews Slider */}
          <div className="min-w-full h-screen flex items-center justify-center bg-cover bg-center">
            <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 w-full mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
                Customer Reviews
              </h2>
              <Slider {...cardSliderSettings}>
                <AllReviews />
              </Slider>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-1 sm:p-2 rounded-full z-10"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-1 sm:p-2 rounded-full z-10"
          onClick={handleNext}
        >
          <ChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;