import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, MapPin, Briefcase } from "lucide-react";

const SearchConstructors = () => {
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  const handleSearch = () => {
    console.log("Searching for:", { location, specialization });
  };

  return (
    <section
      id="search"
      ref={sectionRef}
      className="py-24 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          Find Trusted Builders
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-lg mb-12 text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Connect with verified builders in your area. Enter your location and
          preferred specialization to get started.
        </motion.p>

        {/* Search Form */}
        <motion.div
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Location Input */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Specialization Input */}
            <div className="flex-1 relative">
              <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Search Button */}
            <motion.button
              onClick={handleSearch}
              className="md:w-auto w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md flex items-center justify-center space-x-2 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchConstructors;