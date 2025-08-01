import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  const contentHoverStyle = {
    transition: "box-shadow 0.3s ease-in-out",
    ":hover": {
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  };

  const imageHoverStyle = {
    transition: "transform 0.3s ease-in-out",
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '1.5rem'
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"
      >
        <motion.h1
          className="py-5 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Review Guidelines
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center mb-12">
          <motion.div
            className="w-full md:w-1/2 p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={contentHoverStyle}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Review Submission Guidelines
              </h2>
              <ul style={listStyle}>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  You must be at least 18 years old to submit a Review.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Reviews should be submitted only by individuals who have directly used or experienced the property or service being reviewed.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  All Reviews must be honest and based on your genuine personal experience.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Posting false, misleading, or fraudulent Reviews is strictly prohibited.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Do not post Reviews on behalf of others or use fake identities.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Reviews must not contain offensive, abusive, discriminatory, defamatory, or obscene language.
                </li>
                <li className="text-gray-700 hover:text-blue-700 transition-colors duration-300">
                  Reviews must not contain promotional content, spam, or advertisements.
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-6 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg" style={imageHoverStyle}>
              <img
                src="https://img.freepik.com/free-vector/hand-draw-city-skyline-sketch_1035-19581.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740"
                alt="Review Guidelines"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-12">
          <motion.div
            className="w-full md:w-1/2 p-6 flex justify-center md:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg" style={imageHoverStyle}>
              <img
                src="https://img.freepik.com/free-vector/beautiful-hand-draw-city-skyline-sketch-design_1035-28553.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740"
                alt="Additional Policies"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-6 md:order-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={contentHoverStyle}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Additional Policies
              </h2>
              <ul style={listStyle}>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Avoid including confidential or proprietary information.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  By submitting a Review, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, distribute, and display the Review in any media.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  You confirm that you own or have the right to share the content of your Review.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  We reserve the right to edit, refuse, or remove any Review that violates these Terms or is otherwise inappropriate.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  We do not guarantee publication of all Reviews.
                </li>
                <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                  Negative Reviews are welcome as long as they comply with these Terms.
                </li>
                <li className="text-gray-700 hover:text-blue-700 transition-colors duration-300">
                  Reviews are submitted voluntarily without compensation or incentive.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-8 text-center"
        >
          <p>
            If you have any questions about these terms, please contact us at{" "}
            <a
              href="mailto:seeinfact@gmail.com"
              className="text-blue-600 hover:underline ml-1"
            >
              seeinfact@gmail.com
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
