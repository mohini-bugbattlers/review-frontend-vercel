import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Star, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Search Builders",
      description:
        "Browse through our extensive database of verified construction professionals in your area.",
      icon: <Search className="w-12 h-12 text-blue-600" />,
    },
    {
      number: 2,
      title: "Read Reviews",
      description:
        "Check ratings and read authentic reviews from verified customers to make informed decisions.",
      icon: <Star className="w-12 h-12 text-blue-600" />,
    },
    {
      number: 3,
      title: "Share Experience",
      description:
        "After your project, share your experience by leaving a review to help others in the community.",
      icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
    },
  ];

  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="md:py-24 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Step Number */}
                <motion.div
                  className="absolute -top-4 sm:-top-6 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center rounded-full text-base sm:text-lg font-bold shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.number}
                </motion.div>
                {/* Step Icon */}
                <motion.div
                  className="mb-4 sm:mb-6 mt-2 sm:mt-4 transform transition-transform duration-300 hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {step.title}
                </h3>
                {/* Step Description */}
                <p className="text-sm sm:text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
