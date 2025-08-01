import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const HorizontalCarousel = ({ advertisements }) => {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <div className="absolute inset-0 flex items-center space-x-8 px-8 overflow-x-auto scrollbar-hide">
        {advertisements.map((ad, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{ad.title}</h3>
              <p className="text-gray-300 text-sm">{ad.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Prop validation for the advertisements array
HorizontalCarousel.propTypes = {
  advertisements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HorizontalCarousel;
