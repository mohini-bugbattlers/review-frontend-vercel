import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

function Footer() {
  return (
    <section id="footer" className="text-white">
      <div className="bg-black relative">
        <div className="container px-5 py-10">
          {/* Logo and Header */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-3"
          >
            <Building2 className="h-12 w-12 text-blue-500" />
          </motion.div>

          <div className="grid gap-10 md:grid-cols-3">
            {/* Left Section */}
            <div className="space-y-6">
              <p className="leading-relaxed text-sm sm:text-base">
                This Should Be Used To Tell A Story And Include Any Testimonials
                You Might Have About Your Product Or Service For Your Clients
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-sm sm:text-base">Follow Us</p>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Middle Section - Quick Links and Help */}
            <div className="flex flex-wrap gap-10 justify-center sm:justify-between">
              {/* Quick Links */}
              <div className="space-y-6 text-center">
                <h4 className="font-bold text-lg">Quick Links</h4>
                <ul className="space-y-3">
                  <li className="underline hover:no-underline hover:text-blue-500">
                    <a href="/home">Home</a>
                  </li>
                  <li className="underline hover:no-underline hover:text-blue-500">
                    <a href="/about">About Us</a>
                  </li>
                  <li className="underline hover:no-underline hover:text-blue-500">
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div className="space-y-6 text-center">
                <h4 className="font-bold text-lg">Help</h4>
                <ul className="space-y-3">
                  <li className="underline hover:no-underline hover:text-blue-500">
                    <a href="/all-reviews">Reviews</a>
                  </li>
                  <li className="underline hover:no-underline hover:text-blue-500">
                    <a href="/Terms">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <h5 className="font-semibold text-lg mb-2">
                  Subscribe to Our Newsletter
                </h5>
                <form className="flex flex-col sm:flex-row justify-center gap-2">
                  <input
                    type="email"
                    className="px-4 py-2 text-gray-700 rounded-lg text-sm w-full sm:w-auto focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm hover:bg-orange-600 transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex justify-center pt-10">
            <p className="text-xs sm:text-sm">
              2025 &copy; Builder Reviews. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
