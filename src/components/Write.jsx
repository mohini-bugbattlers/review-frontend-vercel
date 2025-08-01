import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  FaStar,
  FaHome,
  FaBuilding,
  FaParking,
  FaWater,
  FaTools,
  FaBolt,
  FaTree,
  FaPaintBrush,
  FaCertificate,
  FaHandshake,
  FaSolarPanel,
  FaEye,
} from "react-icons/fa";

function Write() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState({});
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [wings, setWings] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [residentialType, setResidentialType] = useState("");
  const [commercialType, setCommercialType] = useState("");
  const [ownershipType, setOwnershipType] = useState([]);
  const [ownerType, setOwnerType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [constructors, setConstructors] = useState([]);
  const [projects, setProjects] = useState([]);

  const allParameters = [
    { name: "Project Location", icon: <FaHome /> },
    { name: "Construction Quality", icon: <FaBuilding /> },
    { name: "Amenities", icon: <FaBuilding /> },
    { name: "Parking Facilities", icon: <FaParking /> },
    { name: "Water Supply", icon: <FaWater /> },
    { name: "Plumbing Quality and Sanitary Fittings", icon: <FaTools /> },
    { name: "Electrical Fittings", icon: <FaBolt /> },
    { name: "Garden & Children Play Area", icon: <FaTree /> },
    { name: "Floor Tiles & Wall Tiles", icon: <FaPaintBrush /> },
    { name: "Project Legal Documentation", icon: <FaCertificate /> },
    { name: "Customer Relationship Management", icon: <FaHandshake /> },
    { name: "Solar & Fire Fighting", icon: <FaSolarPanel /> },
    { name: "Paint Quality & Lifts", icon: <FaPaintBrush /> },
  ];

  const handleRatingChange = (parameterName, star) => {
    setRatings((prev) => ({ ...prev, [parameterName]: star }));
  };

  const [imageURL, setImageURL] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setImage(file);
    }
  };
  useEffect(() => {
    const fetchConstructors = async () => {
      try {
        const res = await axios.get(
          "https://review-backend-vercel.vercel.app/api/constructors"
        );
        setConstructors(res.data.constructors);
      } catch (error) {
        console.error("Error fetching constructors", error);
      }
    };

    fetchConstructors();
  }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      if (!name) {
        setProjects([]);
        return;
      }
      try {
        const res = await axios.get(
          `https://review-backend-vercel.vercel.app/api/projects/constructor/${name}`
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [name]);

  const handlePropertyTypeChange = (type) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleOwnershipChange = (type) => {
    setOwnershipType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePropertyStatusChange = (status) => {
    setPropertyStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const missingRatings = allParameters.filter(
      (parameter) => !ratings[parameter.name]
    );

    if (
      !name ||
      !projectName ||
      !message ||
      !location ||
      ownershipType.length === 0 ||
      (ownershipType.includes("Owner") && !ownerType.trim()) ||
      (propertyType.includes("Residential") && !residentialType.trim()) ||
      (propertyType.includes("Commercial") && !commercialType.trim()) ||
      missingRatings.length > 0 ||
      !termsAccepted
    ) {
      alert("Please complete all fields and accept the terms and conditions");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const formData = {
      constructorId: name,
      projectId: projectName,
      userId: "currentUserId", // Replace with actual user ID from session or context
      rating:
        Object.values(ratings).reduce((a, b) => a + b, 0) /
        Object.keys(ratings).length,
      comment: message,
      status: "pending",
    };

    try {
      const response = await fetch(
        "https://review-backend-vercel.vercel.app/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Form submitted successfully!");
        navigate("/home");
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }

    // Reset form fields
    setName("");
    setProjectName("");
    setMessage("");
    setRatings({});
    setImageURL(null);
    setLocation("");
    setWings("");
    setPropertyType([]);
    setResidentialType("");
    setCommercialType("");
    setPropertyStatus([]);
    setOwnershipType([]);
    setOwnerType("");
    setTermsAccepted(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-8">
      <motion.h2
        className="mt-20 text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Share Your Experience
      </motion.h2>
      <motion.div
        className="bg-white rounded-3xl p-10 shadow-2xl w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-12 gap-6">
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-6 w-full px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-lg"
            >
              <option value="">Select Builder</option>
              {constructors.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-6 w-full px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-lg"
              disabled={!name}
            >
              {!name ? (
                <option value="">Please select a builder first</option>
              ) : projects.length === 0 ? (
                <option value="">
                  No projects found for selected builder. Please select another
                  one.
                </option>
              ) : (
                <>
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </>
              )}
            </select>

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-6 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-sm text-lg font-medium text-gray-800"
            />
            <input
              type="text"
              placeholder="Wings"
              value={wings}
              onChange={(e) => setWings(e.target.value)}
              className="col-span-6 w-full px-6 py-2 border border-gray-300 rounded-lg"
            />
            <div className="col-span-6 mb-3">
              <label className="block font-semibold">Property Type:</label>
              {["Residential", "Commercial"].map((type) => (
                <label key={type} className="ml-4">
                  <input
                    type="checkbox"
                    onChange={() => handlePropertyTypeChange(type)}
                    checked={propertyType.includes(type)}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
            {propertyType.includes("Residential") && (
              <select
                className="col-span-6 w-full px-2 border rounded"
                value={residentialType}
                onChange={(e) => setResidentialType(e.target.value)}
              >
                <option value="">Select Residential Type</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="2.5BHK">2.5BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="3.5BHK">3.5 BHK</option>
                <option value="4BHK">4 BHK</option>
                <option value="4.5BHK">4.5 BHK</option>
                <option value="5BHK">5 BHK</option>
                <option value="5.5BHK">5.5 BHK</option>
                <option value="Duplex">Duplex</option>
                <option value="Villa">Villa</option>
                <option value="Bunglows">Bunglows</option>
                <option value="Row Houses">Row Houses</option>
                <option value="Town Houses">Town Houses</option>
              </select>
            )}
            {propertyType.includes("Commercial") && (
              <select
                className="col-span-6 w-full px-2 border rounded"
                value={commercialType}
                onChange={(e) => setCommercialType(e.target.value)}
              >
                <option value="">Select Commercial Type</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
                <option value="Showroom">Showroom</option>
                <option value="Studio Appartment">Studio Appartment</option>
                <option value="Industrial Property">Industrial Property</option>
                <option value="Retail Spaces">Retail Spaces</option>
                <option value="Hospitality">Hospitality Properties</option>
              </select>
            )}
            <div className="col-span-6 mb-3">
              <label className="block font-semibold">Property Status:</label>
              {["Ready", "Ongoing"].map((status) => (
                <label key={status} className="ml-4">
                  <input
                    type="checkbox"
                    onChange={() => handlePropertyStatusChange(status)}
                    checked={propertyStatus.includes(status)}
                  />{" "}
                  {status}
                </label>
              ))}
            </div>
            <div className="col-span-6 mb-3">
              <label className="block font-semibold">Ownership Type:</label>
              {["Owner", "Visitor", "Tenant"].map((type) => (
                <label key={type} className="ml-4">
                  <input
                    type="checkbox"
                    onChange={() => handleOwnershipChange(type)}
                    checked={ownershipType.includes(type)}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
            {ownershipType.includes("Owner") && (
              <select
                className="col-span-6 w-full px-2 border rounded"
                value={ownerType}
                onChange={(e) => setOwnerType(e.target.value)}
              >
                <option value="">Select Owner Type</option>
                <option value="1Owner">First Owner</option>
                <option value="2Owner">Second Owner</option>
              </select>
            )}
            <label className="col-span-12 block font-semibold">
              Attach project images:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="col-span-6 text-lg"
            />
            {imageURL && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-gray-700">Uploaded Image:</span>
                <a href={imageURL} target="_blank" rel="noopener noreferrer">
                  <FaEye className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700" />
                </a>
              </div>
            )}
          </div>
          <h3 className="text-center fs-3">Rate As Per Your Experiences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allParameters.map((parameter, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 text-xl">
                    {parameter.icon}
                  </span>
                  <p className="text-gray-700 font-semibold text-sm">
                    {parameter.name}
                  </p>
                </div>
                <div className="mt-2 flex gap-2 justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRatingChange(parameter.name, star)}
                      className={`cursor-pointer text-xl ${
                        star <= (ratings[parameter.name] || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                    >
                      <FaStar />
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <textarea
            className="w-full px-6 py-2 border border-gray-300 rounded-lg"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
          <div className="col-span-12 mb-3">
            <label className="block font-semibold">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />{" "}
              I accept the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </form>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Write;
