import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
  };

  const imageHoverStyle = {
    transition: "transform 0.3s ease-in-out",
  };

  const contentHoverStyle = {
    transition: "box-shadow 0.3s ease-in-out",
    ":hover": {
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  };

  const sections = [
    {
      title: "Our Goal",
      content: [
        "At <strong class='font-weight-bold'>See in Fact</strong>, we are dedicated to fostering transparency and trust within the real estate industry.",
        "Established in 2024, our platform provides a reliable space for buyers, sellers, renters, and real estate professionals to share honest, firsthand experiences about properties, agents, construction services, and related offerings.",
        "We understand that buying, selling, or renting property is one of the biggest decisions in your life.",
        "That’s why we created a transparent platform where customers, tenants, and property seekers can share their real experiences and insights.",
        "Our goal is to empower you with authentic reviews so you can make well-informed choices when selecting properties or real estate professionals.",
      ],
      imageUrl:
        "https://img.freepik.com/free-photo/view-building-with-cartoon-style-architecture_23-2151154845.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740",
    },
    {
      title: "Our Devotion",
      content: [
        "At <strong class='font-weight-bold'>See in Fact</strong>, we believe that honesty and transparency build trust.",
        "We are committed to providing a safe and respectful space for everyone to voice their opinions without fear of censorship or manipulation.",
        "Our moderation policies ensure that all reviews meet high standards of accuracy, fairness, and appropriateness.",
        "We recognize that real estate decisions are often among the most significant financial and personal choices individuals make.",
        "With this in mind, our mission is to empower consumers by providing access to authentic reviews and insights, helping them make informed decisions with confidence.",
        "Whether you are searching for your next home, seeking trustworthy professionals, or looking to share your own experience, <strong class='font-weight-bold'>See in Fact</strong> is your trusted partner in navigating the real estate market with clarity and assurance.",
        "Thank you for being part of our community!",
      ],
      imageUrl:
        "https://img.freepik.com/free-vector/hand-draw-city-skyline-sketch_1035-20493.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-16 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* About Section */}
        <div className="text-center mb-8">
          <motion.h1
            className="py-5 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Welcome to <strong className="font-weight-bold">See in Fact</strong>
            , your trusted destination for honest and reliable reviews on
            properties, home seekers, real estate agents, construction services,
            and all things related to real estate.
          </motion.p>
        </div>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center mb-12`}
          >
            <motion.div
              className={`w-full md:w-1/2 p-6 ${
                index % 2 === 0 ? "md:pr-6" : "md:pl-6"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.7 }}
              style={contentHoverStyle}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                  {section.title}
                </h2>
                <ul
                  style={listStyle}
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .map((item, i) => `<li key=${i}>${item}</li>`)
                      .join(""),
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 p-6 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.2, duration: 0.7 }}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg"
                style={imageHoverStyle}
              >
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="rounded-lg shadow-lg"
                  style={{
                    width: "400px",
                    height: "300px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </motion.div>
          </div>
        ))}

        {/* Team Section */}
        <div className="text-center mb-12">
          <motion.h2
            className="py-5 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            style={contentHoverStyle}
          >
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
              <li className="text-gray-700 mb-2">
                Our team at{" "}
                <strong className="font-weight-bold">See in Fact</strong> is
                made up of passionate real estate professionals, technology
                experts, and customer advocates who believe in the power of
                transparency and honest communication.
              </li>
              <li className="text-gray-700 mb-2">
                We work tirelessly to create a user-friendly and secure platform
                where every voice is heard and respected.
              </li>
              <li className="text-gray-700 mb-2">
                <strong className="font-weight-bold">See in Fact</strong> is
                committed to providing a trustworthy platform for honest reviews
                about properties, real estate agents, and construction services.
              </li>
              <li className="text-gray-700 mb-2">
                We help buyers, renters, and sellers make informed decisions by
                sharing real experiences from genuine users.
              </li>
              <li className="text-gray-700">
                From verifying reviews to continuously improving the user
                experience, our dedicated staff ensures that the information you
                find here is accurate, reliable, and helpful.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Our Core Values Section */}
        <div className="text-left mb-12">
          <motion.h2
            className="py-5 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            Our Core Beliefs
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center mb-12">
            <motion.div
              className="w-full md:w-1/2 p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              style={contentHoverStyle}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                  Our Core Values
                </h2>
                <ul style={listStyle}>
                  <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                    Integrity: We are committed to honesty and fairness in all
                    interactions and content published on our platform.
                  </li>
                  <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                    Transparency: We promote open, unbiased sharing of
                    experiences to help users make informed decisions.
                  </li>
                  <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                    Respect: We foster a respectful community where diverse
                    opinions are welcomed and protected.
                  </li>
                  <li className="text-gray-700 mb-2 hover:text-blue-700 transition-colors duration-300">
                    Customer Focus: Our platform is designed with you in mind —
                    your trust and satisfaction are our top priorities.
                  </li>
                  <li className="text-gray-700 hover:text-blue-700 transition-colors duration-300">
                    Innovation: We continuously improve our technology and
                    processes to provide the best possible experience.
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 p-6 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg"
                style={imageHoverStyle}
              >
                <img
                  src="https://img.freepik.com/free-vector/beautiful-hand-draw-city-skyline-sketch-design_1035-28515.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740"
                  alt="Our Core Values"
                  style={{
                    width: "400px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <motion.div
            className="w-full md:w-1/2 p-6 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              style={imageHoverStyle}
            >
              <img
                src="https://img.freepik.com/free-vector/hand-draw-city-skyline-sketch_1035-19581.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740"
                alt="Our Vision"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            style={contentHoverStyle}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Our Vision
              </h2>
              <ul style={listStyle}>
                <li className="text-gray-700 mb-2">
                  To be the most trusted and transparent platform in the real
                  estate industry, empowering every property buyer, renter, and
                  seller with authentic insights and reliable information to
                  make confident decisions.
                </li>
                <li className="text-gray-700">
                  To be the leading platform trusted by buyers, renters, and
                  real estate professionals alike, delivering transparent and
                  authentic insights that transform how people experience the
                  real estate market.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <motion.div
            className="w-full md:w-1/2 p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            style={contentHoverStyle}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Our Mission
              </h2>
              <ul style={listStyle}>
                <li className="text-gray-700 mb-2">
                  To provide a secure, user-friendly space where individuals can
                  share honest and unbiased reviews about properties, real
                  estate agents, and related services.
                </li>
                <li className="text-gray-700 mb-2">
                  To promote transparency, accountability, and integrity within
                  the real estate market through verified and respectful
                  feedback.
                </li>
                <li className="text-gray-700 mb-2">
                  To continuously enhance our platform with innovative tools and
                  strict moderation to ensure quality and trustworthiness.
                </li>
                <li className="text-gray-700 mb-2">
                  To support our community by delivering valuable information
                  that simplifies the complex process of buying, selling, or
                  renting real estate.
                </li>
                <li className="text-gray-700 mb-2">
                  To empower home buyers and renters with honest, firsthand
                  reviews that help them find the perfect property with
                  confidence.
                </li>
                <li className="text-gray-700 mb-2">
                  To provide real estate professionals with a fair and
                  transparent space to showcase their services and build trust.
                </li>
                <li className="text-gray-700 mb-2">
                  To uphold the highest standards of accuracy, respect, and
                  integrity through thorough moderation and verification
                  processes.
                </li>
                <li className="text-gray-700 mb-2">
                  To continuously innovate our platform to enhance user
                  experience and support the evolving needs of our real estate
                  community.
                </li>
                <li className="text-gray-700">
                  Our mission is to promote transparency and accountability in
                  the real estate market through authentic feedback and strict
                  content standards. Whether you’re searching for a new home or
                  a reliable professional, we’re here to support your journey
                  with confidence and clarity.
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-6 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7 }}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              style={imageHoverStyle}
            >
              <img
                src="https://img.freepik.com/premium-photo/hancock-building-hd-8k-wallpaper-stock-photographic-image_853645-91489.jpg?uid=R186470405&ga=GA1.1.228076469.1742381623&semt=ais_hybrid&w=740" // Replace with your image URL
                alt="Our Mission"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7 }}
          >
            We'd love to hear from you! Whether you have a project in mind, need
            more information, or just want to chat, feel free to reach out to
            us. We're here to help.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7 }}
          >
            <p className="text-gray-600">Email: seeinfact@gmail.com.</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
