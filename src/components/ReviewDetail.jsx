import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";

const ReviewDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [review, setReview] = useState(location.state ?? null);
  const [newComment, setNewComment] = useState("");

  const role = sessionStorage.getItem("role"); // 'customer' or 'builder'
console.log("role",role)
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review details:", error);
      }
    };

    if (!review || !review._id) {
      fetchReview();
    }
  }, [id, review]);

  if (review && !review.comments) {
    review.comments = [];
  }

  const handleAddComment = (isBuilder = false) => {
    if (isBuilder && role !== "builder") {
      alert("Only builders can add a reply.");
      return;
    }
    if (!isBuilder && role !== "customer") {
      alert("Only customers can add a comment.");
      return;
    }

    if (newComment.trim()) {
      setReview((prevReview) => ({
        ...prevReview,
        comments: [
          ...(prevReview.comments || []),
          { id: Date.now().toString(), text: newComment, isBuilder },
        ],
      }));
      setNewComment("");
    }
  };

  if (!review) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading review details...</p>
      </div>
    );
  }

  return (
    <section className="mt-20 py-8 sm:py-12 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="py-5 text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          {review.constructorId?.name || "Builder"}
        </h3>

        <div className="space-y-4">
          <img
            src={review.constructorId?.image || "https://via.placeholder.com/400"}
            alt="project"
            className="rounded-lg w-full max-w-xs mx-auto sm:max-w-sm object-cover"
          />
          <p className="text-lg font-semibold text-gray-800 text-center">
            Reviewed by: {review.customerId?.name || "Anonymous"}
          </p>
          <p className="text-sm">{review.comment}</p>
          <p className="text-gray-600 text-sm">
            Date: {new Date(review.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-4">
            <h4 className="font-semibold text-lg sm:text-xl">Overall Rating</h4>
            <div className="flex items-center space-x-1 mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < review.rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    index < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.09 6.42a1 1 0 00.95.69h6.759c.969 0 1.372 1.24.588 1.81l-5.486 3.989a1 1 0 00-.364 1.118l2.09 6.42c.3.921-.755 1.688-1.54 1.118l-5.486-3.989a1 1 0 00-1.176 0l-5.486 3.989c-.785.57-1.84-.197-1.54-1.118l2.09-6.42a1 1 0 00-.364-1.118L2.35 11.847c-.784-.57-.38-1.81.588-1.81h6.759a1 1 0 00.95-.69l2.09-6.42z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h4 className="font-semibold text-lg sm:text-xl">Comments</h4>
            {review.comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-3 rounded-lg text-sm sm:text-base ${
                  comment.isBuilder ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>
                  <strong>{comment.isBuilder ? "Builder" : "customer"}:</strong> {comment.text}
                </p>
              </div>
            ))}

            <div className="space-y-2">
              <textarea
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  rows="4"
  placeholder={
    role === "builder"
      ? "Write a reply as builder..."
      : role === "customer"
      ? "Write a comment as customer..."
      : "Login to comment"
  }
  className={`w-full p-3 rounded-lg border ${
    (role === "customer" || role === "builder")
      ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      : "border-red-400 bg-red-50 cursor-not-allowed"
  } text-sm`}
  disabled={role !== "customer" && role !== "builder"}
/>

{/* // Conditional button rendering */}
{role === "customer" && (
  <button
    onClick={() => handleAddComment(false)}
    className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
  >
    Add Comment
  </button>
)}

{role === "builder" && (
  <button
    onClick={() => handleAddComment(true)}
    className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Add Builder Reply
  </button>
)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
