import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50 mt-4"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h2>

        {/* Unified Form */}
        <motion.div
          className="bg-white rounded-xl p-8 shadow-lg mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Contact Information
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href="mailto:seeinfact@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      seeinfact@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name *</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    placeholder="Eg. example@email.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Eg. +1800000000"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message *</label>
                  <textarea
                    placeholder="Write us a message"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
