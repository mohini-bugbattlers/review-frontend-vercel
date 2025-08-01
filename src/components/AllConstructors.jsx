import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllConstructors.css";
import Image1 from "../Assets/Images/BannerImg/skyline.jpg";

const AllConstructors = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const [constructors, setConstructors] = useState([]);

  useEffect(() => {
    const fetchConstructors = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const api = axios.create({
          baseURL: "http://localhost:3000/api",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.get("/constructors");
        const data = response.data.constructors || [];
        const limitedData = data.slice(0, 8).map((item, index) => ({
          ...item,
          imageUrl: item.imageUrl || `${Image1},${index}`,
        }));
        setConstructors(limitedData);
      } catch (error) {
        console.error("Error fetching constructors:", error);
      }
    };
    fetchConstructors();
  }, []);

  const handleLikeClick = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50">
      <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          All Constructors
        </motion.h1>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {constructors.map((constructor, index) => (
            <div key={constructor.id} className="px-2">
              <motion.div
                className="p-4 rounded-lg shadow-md bg-white transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={constructor.imageUrl}
                  alt={constructor.name}
                  className="object-cover object-center w-full rounded-md h-56 md:h-64 lg:h-72 bg-gray-500 transition-transform duration-300 hover:scale-105"
                />
                <div className="flex flex-col flex-grow mt-4">
                  <span className="block text-sm font-medium font-mono tracking-widest uppercase text-gray-600">
                    {constructor.specialization}
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold tracking-wide text-gray-900">
                    {constructor.name}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base flex-grow h-[60px] md:h-[80px] lg:h-[100px] overflow-y-auto">
                    {constructor.description || "No description available."}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => navigate(`/all-reviews`)}
                      className="py-1 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none"
                    >
                      View Projects
                    </button>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, idx) => (
                        <span
                          key={idx}
                          className={`${
                            idx < constructor.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-gray-500 text-sm">
                        ({constructor.rating} Stars)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-gray-600 text-sm">
                  <div className="flex items-center">
                    <button
                      className="flex items-center mr-4 hover:text-blue-600 transition-colors"
                      onClick={() => handleLikeClick(constructor.id)}
                    >
                      <FaThumbsUp className="w-5 h-5" />
                      <span className="ml-1">{likes[constructor.id] || 0}</span>
                    </button>
                    <button className="flex items-center hover:text-blue-600 transition-colors">
                      <span className="material-icons">comment</span>
                      <span className="ml-1">{constructor.replies || 0}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <Slider {...sliderSettings}>
            {constructors.map((constructor, index) => (
              <div key={constructor.id} className="px-2">
                <motion.div
                  className="p-4 rounded-lg shadow-md bg-white transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer h-full flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={constructor.imageUrl}
                    alt={constructor.name}
                    className="object-cover object-center w-full rounded-md h-56 bg-gray-500 transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex flex-col flex-grow mt-4">
                    <span className="block text-sm font-medium font-mono tracking-widest uppercase text-gray-600">
                      {constructor.specialization}
                    </span>
                    <h2 className="text-lg font-semibold tracking-wide text-gray-900">
                      {constructor.name}
                    </h2>
                    <p className="text-gray-600 text-sm flex-grow h-[60px] overflow-y-auto">
                      {constructor.description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => navigate(`/all-reviews`)}
                        className="py-1 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none"
                      >
                        View Projects
                      </button>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={`${
                              idx < constructor.rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-gray-500 text-sm">
                          ({constructor.rating} Stars)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-gray-600 text-sm">
                    <div className="flex items-center">
                      <button
                        className="flex items-center mr-4 hover:text-blue-600 transition-colors"
                        onClick={() => handleLikeClick(constructor.id)}
                      >
                        <FaThumbsUp className="w-5 h-5" />
                        <span className="ml-1">{likes[constructor.id] || 0}</span>
                      </button>
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <span className="material-icons">comment</span>
                        <span className="ml-1">{constructor.replies || 0}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/home")}
            className="py-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllConstructors;
