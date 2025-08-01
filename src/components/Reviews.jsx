import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [newReplies, setNewReplies] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    constructorId: "",
    projectId: "",
    comment: "",
    rating: 0,
  });
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again later.");
      }
    };
    fetchReviews();
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (
      !isValidObjectId(newReview.constructorId) ||
      !isValidObjectId(newReview.projectId)
    ) {
      alert("Constructor ID and Project ID must be valid 24-character ObjectIds.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/reviews", newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewReview({ constructorId: "", projectId: "", comment: "", rating: 0 });
      setReviews((prev) => [...prev, res.data.review]);
      setShowModal(false);
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review.");
    }
  };

  const toggleReplies = (reviewId) => {
    setShowReplies((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleReplyChange = (reviewId, text) => {
    setNewReplies((prev) => ({ ...prev, [reviewId]: text }));
  };

  const handleReplySubmit = (reviewId) => {
    if (!newReplies[reviewId]) return;
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === reviewId
          ? {
              ...review,
              comments: [
                ...(review.comments || []),
                {
                  _id: `c${Date.now()}`,
                  text: newReplies[reviewId],
                  isBuilder: false,
                  likes: [],
                  dislikes: [],
                  createdAt: new Date().toISOString()
                },
              ],
            }
          : review
      )
    );
    setNewReplies((prev) => ({ ...prev, [reviewId]: "" }));
  };

  const handleLikeComment = async (commentId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/like/${commentId}`,
        { commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) => ({
          ...review,
          comments: review.comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: response.data.review.likes, dislikes: response.data.review.dislikes }
              : comment
          )
        }))
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDislikeComment = async (commentId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/dislike/${commentId}`,
        { commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) => ({
          ...review,
          comments: review.comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: response.data.review.likes, dislikes: response.data.review.dislikes }
              : comment
          )
        }))
      );
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };

  const handleLikeReview = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/reviews/${reviewId}/like`,
        { reviewId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? { ...review, likes: response.data.review.likes, dislikes: response.data.review.dislikes }
            : review
        )
      );
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislikeReview = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/reviews/${reviewId}/dislike`,
        { reviewId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? { ...review, likes: response.data.review.likes, dislikes: response.data.review.dislikes }
            : review
        )
      );
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  const getLikeCount = (item) => {
    return item.likes ? item.likes.length : 0;
  };

  const getDislikeCount = (item) => {
    return item.dislikes ? item.dislikes.length : 0;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const groupedReviews = reviews.reduce((acc, review) => {
    const builder = review.constructorId?.name || "Unknown Builder";
    if (!acc[builder]) acc[builder] = [];
    acc[builder].push(review);
    return acc;
  }, {});

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return reviews.length ? total / reviews.length : 0;
  };

  const userReviews = selectedUser
    ? reviews.filter((r) => r.userId?.name === selectedUser)
    : null;

  if (error) {
    return <div className="text-red-500 text-center py-5">{error}</div>;
  }

  return (
    <section
      id="all-reviews"
      className="bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
      ref={ref}
    >
      <div className="mt-20 container-fluid mx-auto px-4 sm:px-6 lg:px-12">
        <motion.h2
          className="text-3xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {selectedUser ? `Reviews by ${selectedUser}` : "All Customer Reviews"}
        </motion.h2>
        {/* <button
          onClick={() => setShowModal(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Review
        </button> */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {Object.entries(groupedReviews)
            .slice(0, 3)
            .map(([builder, group]) => {
              const avgRating = calculateAverageRating(group);
              const review = group[0];
              return (
                <motion.div
                  key={builder}
                  className="p-4 bg-white rounded-lg shadow-md overflow-y-auto max-h-[550px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7 }}
                >
                  <h3 className="text-lg font-semibold text-indigo-600">
                    {builder}
                  </h3>
                  <img
                    src={review.constructorId?.image || "https://via.placeholder.com/400"}
                    alt={builder}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-gray-600 text-sm">
                      ({group.length} reviews)
                    </span>
                  </div>
                  {group.map((review) => (
                    <div key={review._id} className="mt-4">
                      <p className="text-sm font-semibold text-blue-700">
                        <button
                          className="text-blue-600 mb-1"
                          onClick={() =>
                            setSelectedUser(review.userId?.name || "Unknown")
                          }
                        >
                          {review.userId?.name || "Anonymous"}
                          {review.isVerified && (
                            <CheckCircleIcon className="h-5 w-5 text-green-500 inline ml-1" />
                          )}
                        </button>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-800 text-sm mt-1">{review.comment}</p>
                      <p className="text-yellow-600 font-bold">
                        ⭐ {review.rating} / 5
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Link to={`/review/${review._id}`} className="text-blue-500 text-sm">
                          Show More
                        </Link>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => handleLikeReview(review._id)}
                            className="text-gray-600 hover:text-blue-600 flex items-center"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span className="ml-1">{getLikeCount(review)}</span>
                          </button>
                          <button
                            onClick={() => handleDislikeReview(review._id)}
                            className="text-gray-600 hover:text-red-600 flex items-center"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span className="ml-1">{getDislikeCount(review)}</span>
                          </button>
                          <button
                            onClick={() => toggleReplies(review._id)}
                            className="text-sm"
                          >
                            {showReplies[review._id] ? "Hide Replies" : "Replies"}
                          </button>
                        </div>
                      </div>
                      {showReplies[review._id] && (
                        <div className="mt-3 border-t pt-2">
                          <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
                            {(review.comments || []).length > 0 ? (
                              review.comments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className={`p-2 mb-2 rounded-md ${
                                    comment.isBuilder
                                      ? "bg-yellow-100"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  <p className="text-xs text-gray-500">
                                    {comment.isBuilder ? "👷 Builder" : "🧑 User"}
                                  </p>
                                  <p className="text-sm">{comment.text}</p>
                                  <div className="flex gap-2 items-center mt-1">
                                    <button
                                      onClick={() => handleLikeComment(comment._id)}
                                      className="text-gray-600 hover:text-blue-600 flex items-center text-xs"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                      <span className="ml-1">{getLikeCount(comment)}</span>
                                    </button>
                                    <button
                                      onClick={() => handleDislikeComment(comment._id)}
                                      className="text-gray-600 hover:text-red-600 flex items-center text-xs"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                      <span className="ml-1">{getDislikeCount(comment)}</span>
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 text-center">
                                No replies yet.
                              </p>
                            )}
                          </div>
                          <div className="mt-2 flex items-center space-x-2">
                            <input
                              type="text"
                              value={newReplies[review._id] || ""}
                              onChange={(e) =>
                                handleReplyChange(review._id, e.target.value)
                              }
                              placeholder="Write a reply..."
                              className="flex-1 px-3 py-1 border rounded-md text-sm"
                            />
                            <button
                              onClick={() => handleReplySubmit(review._id)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              );
            })}
        </div>
        <div className="md:hidden">
          <Slider {...settings}>
            {Object.entries(groupedReviews).map(([builder, group]) => {
              const avgRating = calculateAverageRating(group);
              const review = group[0];
              return (
                <div key={builder} className="p-4">
                  <div className="bg-white rounded-lg shadow-md overflow-y-auto max-h-[550px] p-4">
                    <h3 className="text-lg font-semibold text-indigo-600">
                      {builder}
                    </h3>
                    <img
                      src={review.constructorId?.image || "https://via.placeholder.com/400"}
                      alt={builder}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-gray-600 text-sm">
                        ({group.length} reviews)
                      </span>
                    </div>
                    {group.map((review) => (
                      <div key={review._id} className="mt-4">
                        <p className="text-sm font-semibold text-blue-700">
                          <button
                            className="text-blue-600 mb-1"
                            onClick={() =>
                              setSelectedUser(review.userId?.name || "Unknown")
                            }
                          >
                            {review.userId?.name || "Anonymous"}
                            {review.isVerified && (
                              <CheckCircleIcon className="h-5 w-5 text-green-500 inline ml-1" />
                            )}
                          </button>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800 text-sm mt-1">{review.comment}</p>
                        <p className="text-yellow-600 font-bold">
                          ⭐ {review.rating} / 5
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <Link to={`/review/${review._id}`} className="text-blue-500 text-sm">
                            Show More
                          </Link>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => handleLikeReview(review._id)}
                              className="text-gray-600 hover:text-blue-600 flex items-center"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span className="ml-1">{getLikeCount(review)}</span>
                            </button>
                            <button
                              onClick={() => handleDislikeReview(review._id)}
                              className="text-gray-600 hover:text-red-600 flex items-center"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span className="ml-1">{getDislikeCount(review)}</span>
                            </button>
                            <button
                              onClick={() => toggleReplies(review._id)}
                              className="text-sm"
                            >
                              {showReplies[review._id] ? "Hide Replies" : "Replies"}
                            </button>
                          </div>
                        </div>
                        {showReplies[review._id] && (
                          <div className="mt-3 border-t pt-2">
                            <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
                              {(review.comments || []).length > 0 ? (
                                review.comments.map((comment) => (
                                  <div
                                    key={comment._id}
                                    className={`p-2 mb-2 rounded-md ${
                                      comment.isBuilder
                                        ? "bg-yellow-100"
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    <p className="text-xs text-gray-500">
                                      {comment.isBuilder ? "👷 Builder" : "🧑 User"}
                                    </p>
                                    <p className="text-sm">{comment.text}</p>
                                    <div className="flex gap-2 items-center mt-1">
                                      <button
                                        onClick={() => handleLikeComment(comment._id)}
                                        className="text-gray-600 hover:text-blue-600 flex items-center text-xs"
                                      >
                                        <ThumbsUp className="w-3 h-3" />
                                        <span className="ml-1">{getLikeCount(comment)}</span>
                                      </button>
                                      <button
                                        onClick={() => handleDislikeComment(comment._id)}
                                        className="text-gray-600 hover:text-red-600 flex items-center text-xs"
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                        <span className="ml-1">{getDislikeCount(comment)}</span>
                                      </button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 text-center">
                                  No replies yet.
                                </p>
                              )}
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                              <input
                                type="text"
                                value={newReplies[review._id] || ""}
                                onChange={(e) =>
                                  handleReplyChange(review._id, e.target.value)
                                }
                                placeholder="Write a reply..."
                                className="flex-1 px-3 py-1 border rounded-md text-sm"
                              />
                              <button
                                onClick={() => handleReplySubmit(review._id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
                Add a Review
              </h2>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <input
                  name="constructorId"
                  placeholder="Constructor ID"
                  value={newReview.constructorId}
                  onChange={handleReviewChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  name="projectId"
                  placeholder="Project ID"
                  value={newReview.projectId}
                  onChange={handleReviewChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <textarea
                  name="comment"
                  placeholder="Your review..."
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  className="border p-2 rounded w-full"
                  rows="3"
                  required
                ></textarea>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReviews;
