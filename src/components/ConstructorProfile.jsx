import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { featuredConstructors } from "../dummyData";
import { motion } from "framer-motion";

const ConstructorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const constructor = featuredConstructors.find((c) => c.id === parseInt(id));

  if (!constructor) {
    return (
      <div className="text-center py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Constructor not found.
        </motion.div>
      </div>
    );
  }

  const handleProjectClick = (projectId) => {
    navigate(`/all-reviews/${projectId}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Constructor Details */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mt-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {constructor.companyName}
            </h1>
          </motion.div>

          <motion.h1
            className="py-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {constructor.name}
          </motion.h1>
          <p className="text-sm text-gray-600 uppercase mt-2">{constructor.specialization}</p>
          <motion.p
            className="text-lg text-gray-700 mt-6 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {constructor.description}
          </motion.p>
        </div>

        {/* Projects Section */}
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center underline decoration-blue-500">Projects</h2>
          <motion.ul
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {constructor.projects.map((project) => (
              <motion.li
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
                onClick={() => handleProjectClick(project.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-500">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-800">
                  {project.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
};

export default ConstructorProfile;