import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchProfile();
    fetchReviews();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile'

      )
      ; // ✅ Updated

      const data = res.data;
      setName(data.name || '');
      setEmail(data.email || '');
      setPhoneNumber(data.phoneNumber || '');
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      setReviews(res.data || []);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{10}$/;
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!valid) return;

    try {
      await api.put('/auth/profile', { // ✅ Updated
        name,
        email,
        phoneNumber,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };
  const handleLogout=async()=>{
   sessionStorage.setItem("token", null);
   navigate("/login");
  }

  return (
    <div className="profile-page w-full py-20 mt-5 min-h-screen bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50 flex justify-center items-center p-4">
      <div className="profile-container w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 space-y-8 flex flex-col md:flex-row">
        {/* Profile Section */}
        <div className="profile-section w-full md:w-1/3 flex flex-col items-center md:items-center space-y-6">
          {/* Avatar */}
          <div className="avatar w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {name.split(' ')[0]?.charAt(0)}
          </div>
          {isEditing ? (
            <div className="w-full space-y-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your name"
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your phone number"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              <button
                onClick={handleSaveClick}
                className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-gray-900">{name}</h2>
              <p className="text-gray-700 mt-2">{phoneNumber}</p>
              <p className="text-gray-700">{email}</p>
              <button
                onClick={handleEditClick}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="mt-6 mx-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="reviews-section w-full md:w-2/3 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">My Reviews</h3>
          <div className="space-y-4">
            {(reviews.length > 0 ? reviews : [
              {
                _id: uuidv4(),
                constructor: 'Sample Builder',
                rating: 4,
                review: 'Great service and timely work.',
              },
              {
                _id: uuidv4(),
                constructor: 'Demo Constructions',
                rating: 5,
                review: 'Exceeded expectations with high-quality work.',
              },
            ]).map((review) => (
              <div
                key={review._id || uuidv4()}
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900">{review.constructor}</h4>
                  <div className="rating text-yellow-500 text-sm">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="text-gray-700 mt-2">{review.review}</p>
                </div>
                {reviews.length > 0 && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="mt-2 md:mt-0 text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
