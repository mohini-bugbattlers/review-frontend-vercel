// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useNavigate, Link } from "react-router-dom";
// import { ThumbsUp, ThumbsDown } from "lucide-react";
// import axios from "axios";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./AllReviews.css";
// import img1 from "../Assets/Images/BannerImg/construction.jpg";

// const AllReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [error, setError] = useState(null);
//   const [showReplies, setShowReplies] = useState({});
//   const [newReplies, setNewReplies] = useState({});
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editingCommentText, setEditingCommentText] = useState("");
//   const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
//   const navigate = useNavigate();
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         setCurrentUserId(decoded.userId);
//       } catch (err) {
//         console.error("Error decoding token:", err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const response = await axios.get("https://review-backend-vercel.vercel.app/api/reviews", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setReviews(
//           response.data.filter((review) => review.status === "approved")
//         );
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//         setError("Failed to fetch reviews. Please try again later.");
//       }
//     };
//     fetchReviews();
//   }, []);

//   const fetchCommentsForReview = async (reviewId) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await axios.get(
//         `https://review-backend-vercel.vercel.app/api/review/${reviewId}/comments`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews((prev) =>
//         prev.map((review) =>
//           review._id === reviewId ? { ...review, comments: res.data } : review
//         )
//       );
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//     }
//   };

//   const postCommentForReview = async (
//     reviewId,
//     commentText,
//     isBuilder = false
//   ) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.post(
//         `https://review-backend-vercel.vercel.app/api/review/${reviewId}/comments`,
//         { text: commentText, isBuilder },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (err) {
//       console.error("Error posting comment:", err);
//       return null;
//     }
//   };

//   const updateComment = async (commentId, updatedText) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.put(
//         `https://review-backend-vercel.vercel.app/api/comments/${commentId}`,
//         { text: updatedText },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (err) {
//       console.error("Error updating comment:", err);
//       return null;
//     }
//   };

//   const deleteComment = async (commentId, reviewId) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       await axios.delete(`https://review-backend-vercel.vercel.app/api/comments/${commentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews((prev) =>
//         prev.map((review) =>
//           review._id === reviewId
//             ? {
//                 ...review,
//                 comments: review.comments.filter((c) => c._id !== commentId),
//               }
//             : review
//         )
//       );
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//     }
//   };

//   const handleLike = async (reviewId) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         setError("Please log in to like a review.");
//         return;
//       }
//       const res = await axios.post(
//         `https://review-backend-vercel.vercel.app/api/reviews/${reviewId}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews((prev) =>
//         prev.map((review) =>
//           review._id === reviewId
//             ? {
//                 ...review,
//                 likes: res.data.review.likes,
//                 dislikes: res.data.review.dislikes,
//                 likeCount: res.data.review.likes.length,
//                 dislikeCount: res.data.review.dislikes.length,
//               }
//             : review
//         )
//       );
//     } catch (err) {
//       console.error("Error liking review:", err);
//       setError("Failed to like review. Please try again.");
//     }
//   };

//   const handleDislike = async (reviewId) => {
//   try {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//       setError("Please log in to dislike a review.");
//       return;
//     }
//     const res = await axios.post(
//       `https://review-backend-vercel.vercel.app/api/reviews/${reviewId}/dislike`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setReviews((prev) =>
//       prev.map((review) =>
//         review._id === reviewId
//           ? {
//               ...review,
//               likes: res.data.review.likes,
//               dislikes: res.data.review.dislikes,
//               likeCount: res.data.review.likes.length,
//               dislikeCount: res.data.review.dislikes.length,
//             }
//           : review
//       )
//     );
//   } catch (err) {
//     console.error("Error disliking review:", err);
//     setError("Failed to dislike review. Please try again.");
//   }
// };

//   const toggleReplies = (reviewId) => {
//     setShowReplies((prev) => {
//       const shouldShow = !prev[reviewId];
//       if (shouldShow) fetchCommentsForReview(reviewId);
//       return { ...prev, [reviewId]: shouldShow };
//     });
//   };

//   const handleReplyChange = (reviewId, text) => {
//     setNewReplies((prev) => ({ ...prev, [reviewId]: text }));
//   };

//   const handleReplySubmitWithRole = async (reviewId, isBuilder = false) => {
//     const text = newReplies[reviewId];
//     if (!text) return;
//     const postedComment = await postCommentForReview(reviewId, text, isBuilder);
//     if (postedComment) {
//       setReviews((prev) =>
//         prev.map((review) =>
//           review._id === reviewId
//             ? {
//                 ...review,
//                 comments: [...(review.comments || []), postedComment],
//               }
//             : review
//         )
//       );
//       setNewReplies((prev) => ({ ...prev, [reviewId]: "" }));
//     }
//   };

//   const groupedReviews = reviews.reduce((acc, review) => {
//     const builder = review.constructorId?.name || "Unknown Builder";
//     if (!acc[builder]) acc[builder] = [];
//     acc[builder].push(review);
//     return acc;
//   }, {});

//   const calculateAverageRating = (reviews) => {
//     const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
//     return reviews.length ? totalRating / reviews.length : 0;
//   };

//   const userReviews = selectedUser
//     ? reviews.filter((r) => r.userId?.name === selectedUser)
//     : null;

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   if (error)
//     return <div className="text-red-500 text-center py-5">{error}</div>;

//   return (
//     <section
//       id="all-reviews"
//       className="py-5 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
//       ref={ref}
//     >
//       <div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-12">
//         <motion.h2
//           className="text-3xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
//           initial={{ opacity: 0, y: -50 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
//           transition={{ duration: 1 }}
//         >
//           {selectedUser ? `Reviews by ${selectedUser}` : "All Customer Reviews"}
//         </motion.h2>
//         {selectedUser && (
//           <button
//             onClick={() => setSelectedUser(null)}
//             className="mb-6 px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700"
//           >
//             Back to All Builders
//           </button>
//         )}

//         {/* Mobile View */}
//         <div className="md:hidden">
//           <Slider {...sliderSettings}>
//             {(selectedUser ? userReviews : Object.entries(groupedReviews)).map(
//               (entry) => {
//                 const isGroup = !selectedUser;
//                 const builder = isGroup ? entry[0] : null;
//                 const reviewsGroup = isGroup ? entry[1] : [entry];
//                 const avgRating = calculateAverageRating(reviewsGroup);
//                 const review = reviewsGroup[0];
//                 return (
//                   <div key={isGroup ? builder : review._id} className="px-2">
//                     <motion.div
//                       className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col"
//                       initial={{ opacity: 0, y: 50 }}
//                       animate={
//                         inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
//                       }
//                       transition={{ duration: 0.7 }}
//                     >
//                       {isGroup && (
//                         <>
//                           <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2">
//                             {builder}
//                             {review.constructorId?.isVerified && (
//                               <CheckCircleIcon
//                                 title="Verified Builder"
//                                 className="h-5 w-5 text-green-500"
//                               />
//                             )}
//                           </h3>
//                           <img
//                             src={review.constructorId?.image || img1}
//                             alt={`${builder} logo`}
//                             className="w-full h-40 object-cover rounded-lg mb-4"
//                           />
//                           <div className="flex items-center space-x-2 mb-2">
//                             <span className="text-2xl font-bold">
//                               {avgRating.toFixed(1)}
//                             </span>
//                             <span className="text-yellow-500">⭐</span>
//                             <span className="text-gray-600 text-sm">
//                               ({reviewsGroup.length} reviews)
//                             </span>
//                           </div>
//                         </>
//                       )}
//                       <div className="overflow-y-auto max-h-64 custom-scrollbar">
//                         {reviewsGroup.map((review) => (
//                           <div key={review._id} className="mt-4">
//                             <p className="text-sm font-semibold text-blue-700">
//                               <button
//                                 className="text-blue-600 mb-3"
//                                 onClick={() =>
//                                   setSelectedUser(review.userId?.name)
//                                 }
//                               >
//                                 {review.userId?.name || "Anonymous"}{" "}
//                                 {review.userId?.isVerified &&
//                                   review.userId?.role === "builder" && (
//                                     <CheckCircleIcon
//                                       className="h-5 w-5 text-green-500 inline ml-1"
//                                       title="Verified Builder"
//                                     />
//                                   )}
//                               </button>
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </p>
//                             <p className="mt-1 text-gray-800 text-sm">
//                               {review.comment}
//                             </p>
//                             <p className="text-sm font-bold text-yellow-600">
//                               ⭐ {review.rating} / 5
//                             </p>
//                             <div className="flex items-center justify-between mt-2">
//                               <Link
//                                 to={`/review/${review._id}`}
//                                 state={review}
//                                 className="text-blue-500"
//                               >
//                                 Show More
//                               </Link>
//                               <button
//                                 onClick={() => handleLike(review._id)}
//                                 className={`text-sm flex items-center gap-1 ${
//                                   currentUserId &&
//                                   review.likes?.includes(currentUserId)
//                                     ? "text-blue-600"
//                                     : "text-gray-600 hover:text-blue-600"
//                                 }`}
//                               >
//                                 <ThumbsUp size={16} />
//                                 {review.likeCount || 0}
//                               </button>
//                               <button
//                                 onClick={() => handleDislike(review._id)}
//                                 className={`text-sm flex items-center gap-1 ${
//                                   currentUserId &&
//                                   review.dislikes?.includes(currentUserId)
//                                     ? "text-red-600"
//                                     : "text-gray-600 hover:text-red-600"
//                                 }`}
//                               >
//                                 <ThumbsDown size={16} />
//                                 {review.dislikeCount || 0}
//                               </button>
//                               <button
//                                 onClick={() => toggleReplies(review._id)}
//                                 className="px-3 py-1"
//                               >
//                                 {showReplies[review._id]
//                                   ? "Hide replies"
//                                   : "Replies"}
//                               </button>
//                             </div>
//                             {showReplies[review._id] && (
//                               <div className="mt-4 border-t pt-2">
//                                 <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
//                                   {(review.comments || []).map((comment) => (
//                                     <div
//                                       key={comment._id}
//                                       className={`p-2 mb-2 rounded-md ${
//                                         comment.isBuilder
//                                           ? "bg-yellow-100 text-gray-900"
//                                           : "bg-gray-200 text-gray-800"
//                                       }`}
//                                     >
//                                       <p className="text-xs text-gray-500">
//                                         {comment.isBuilder
//                                           ? "👷 Builder"
//                                           : "🧑 User"}
//                                       </p>
//                                       {editingCommentId === comment._id ? (
//                                         <>
//                                           <textarea
//                                             value={editingCommentText}
//                                             onChange={(e) =>
//                                               setEditingCommentText(
//                                                 e.target.value
//                                               )
//                                             }
//                                             className="w-full p-1 rounded border text-sm"
//                                             rows="2"
//                                           />
//                                           <div className="flex space-x-2 mt-1">
//                                             <button
//                                               onClick={async () => {
//                                                 const updated =
//                                                   await updateComment(
//                                                     comment._id,
//                                                     editingCommentText
//                                                   );
//                                                 if (updated) {
//                                                   setReviews((prev) =>
//                                                     prev.map((r) =>
//                                                       r._id === review._id
//                                                         ? {
//                                                             ...r,
//                                                             comments:
//                                                               r.comments.map(
//                                                                 (c) =>
//                                                                   c._id ===
//                                                                   comment._id
//                                                                     ? {
//                                                                         ...c,
//                                                                         text: editingCommentText,
//                                                                       }
//                                                                     : c
//                                                               ),
//                                                           }
//                                                         : r
//                                                     )
//                                                   );
//                                                   setEditingCommentId(null);
//                                                   setEditingCommentText("");
//                                                 }
//                                               }}
//                                               className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                               Save
//                                             </button>
//                                             <button
//                                               onClick={() => {
//                                                 setEditingCommentId(null);
//                                                 setEditingCommentText("");
//                                               }}
//                                               className="text-sm px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//                                             >
//                                               Cancel
//                                             </button>
//                                           </div>
//                                         </>
//                                       ) : (
//                                         <>
//                                           <p className="text-sm">
//                                             {comment.text}
//                                           </p>
//                                           <div className="flex space-x-2 mt-1">
//                                             <button
//                                               onClick={() => {
//                                                 setEditingCommentId(
//                                                   comment._id
//                                                 );
//                                                 setEditingCommentText(
//                                                   comment.text
//                                                 );
//                                               }}
//                                               className="text-xs text-blue-600 underline"
//                                             >
//                                               Edit
//                                             </button>
//                                             <button
//                                               onClick={() =>
//                                                 deleteComment(
//                                                   comment._id,
//                                                   review._id
//                                                 )
//                                               }
//                                               className="text-xs text-red-600 underline"
//                                             >
//                                               Delete
//                                             </button>
//                                           </div>
//                                         </>
//                                       )}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                             <div className="mt-3 space-y-2">
//                               <textarea
//                                 value={newReplies[review._id] || ""}
//                                 onChange={(e) =>
//                                   handleReplyChange(review._id, e.target.value)
//                                 }
//                                 rows="3"
//                                 placeholder="Write a comment..."
//                                 className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                               />
//                               <div className="flex space-x-2">

//                                 <button
//                                   onClick={() =>
//                                     handleReplySubmitWithRole(review._id, true)
//                                   }
//                                   className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                                 >
//                                   Reply
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   </div>
//                 );
//               }
//             )}
//           </Slider>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden md:flex flex-wrap gap-6 justify-center">
//           {(selectedUser ? userReviews : Object.entries(groupedReviews)).map(
//             (entry) => {
//               const isGroup = !selectedUser;
//               const builder = isGroup ? entry[0] : null;
//               const reviewsGroup = isGroup ? entry[1] : [entry];
//               const avgRating = calculateAverageRating(reviewsGroup);
//               const review = reviewsGroup[0];
//               return (
//                 <motion.div
//                   key={isGroup ? builder : review._id}
//                   className="w-full sm:w-96 md:w-80 lg:w-72 bg-white rounded-lg shadow-md p-4 flex flex-col"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={
//                     inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
//                   }
//                   transition={{ duration: 0.7 }}
//                 >
//                   {isGroup && (
//                     <>
//                       <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2">
//                         {builder}
//                         {review.constructorId?.isVerified && (
//                           <CheckCircleIcon
//                             title="Verified Builder"
//                             className="h-5 w-5 text-green-500"
//                           />
//                         )}
//                       </h3>
//                       <img
//                         src={review.constructorId?.image || img1}
//                         alt={`${builder} logo`}
//                         className="w-full h-40 object-cover rounded-lg mb-4"
//                       />
//                       <div className="flex items-center space-x-2 mb-2">
//                         <span className="text-2xl font-bold">
//                           {avgRating.toFixed(1)}
//                         </span>
//                         <span className="text-yellow-500">⭐</span>
//                         <span className="text-gray-600 text-sm">
//                           ({reviewsGroup.length} reviews)
//                         </span>
//                       </div>
//                     </>
//                   )}
//                   <div className="overflow-y-auto max-h-64 custom-scrollbar">
//                     {reviewsGroup.map((review) => (
//                       <div key={review._id} className="mt-4">
//                         <p className="text-sm font-semibold text-blue-700">
//                           <button
//                             className="text-blue-600 mb-3"
//                             onClick={() => setSelectedUser(review.userId?.name)}
//                           >
//                             {review.userId?.name || "Anonymous"}{" "}
//                             {review.userId?.isVerified &&
//                               review.userId?.role === "builder" && (
//                                 <CheckCircleIcon
//                                   className="h-5 w-5 text-green-500 inline ml-1"
//                                   title="Verified Builder"
//                                 />
//                               )}
//                           </button>
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </p>
//                         <p className="mt-1 text-gray-800 text-sm">
//                           {review.comment}
//                         </p>
//                         <p className="text-sm font-bold text-yellow-600">
//                           ⭐ {review.rating} / 5
//                         </p>
//                         <div className="flex items-center justify-between mt-2">
//                           <Link
//                             to={`/review/${review._id}`}
//                             state={review}
//                             className="text-blue-500"
//                           >
//                             Show More
//                           </Link>
//                           <button
//                             onClick={() => handleLike(review._id)}
//                             className={`text-sm flex items-center gap-1 ${
//                               currentUserId &&
//                               review.likes?.includes(currentUserId)
//                                 ? "text-blue-600"
//                                 : "text-gray-600 hover:text-blue-600"
//                             }`}
//                           >
//                             <ThumbsUp size={16} />
//                             {review.likeCount || 0}
//                           </button>
//                           <button
//                             onClick={() => handleDislike(review._id)}
//                             className={`text-sm flex items-center gap-1 ${
//                               currentUserId &&
//                               review.dislikes?.includes(currentUserId)
//                                 ? "text-red-600"
//                                 : "text-gray-600 hover:text-red-600"
//                             }`}
//                           >
//                             <ThumbsDown size={16} />
//                             {review.dislikeCount || 0}
//                           </button>
//                           <button
//                             onClick={() => toggleReplies(review._id)}
//                             className="px-3 py-1"
//                           >
//                             {showReplies[review._id]
//                               ? "Hide replies"
//                               : "Replies"}
//                           </button>
//                         </div>
//                         {showReplies[review._id] && (
//                           <div className="mt-4 border-t pt-2">
//                             <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
//                               {(review.comments || []).map((comment) => (
//                                 <div
//                                   key={comment._id}
//                                   className={`p-2 mb-2 rounded-md ${
//                                     comment.isBuilder
//                                       ? "bg-yellow-100 text-gray-900"
//                                       : "bg-gray-200 text-gray-800"
//                                   }`}
//                                 >
//                                   <p className="text-xs text-gray-500">
//                                     {comment.isBuilder
//                                       ? "👷 Builder"
//                                       : "🧑 User"}
//                                   </p>
//                                   {editingCommentId === comment._id ? (
//                                     <>
//                                       <textarea
//                                         value={editingCommentText}
//                                         onChange={(e) =>
//                                           setEditingCommentText(e.target.value)
//                                         }
//                                         className="w-full p-1 rounded border text-sm"
//                                         rows="2"
//                                       />
//                                       <div className="flex space-x-2 mt-1">
//                                         <button
//                                           onClick={async () => {
//                                             const updated = await updateComment(
//                                               comment._id,
//                                               editingCommentText
//                                             );
//                                             if (updated) {
//                                               setReviews((prev) =>
//                                                 prev.map((r) =>
//                                                   r._id === review._id
//                                                     ? {
//                                                         ...r,
//                                                         comments:
//                                                           r.comments.map((c) =>
//                                                             c._id ===
//                                                             comment._id
//                                                               ? {
//                                                                   ...c,
//                                                                   text: editingCommentText,
//                                                                 }
//                                                               : c
//                                                           ),
//                                                       }
//                                                     : r
//                                                 )
//                                               );
//                                               setEditingCommentId(null);
//                                               setEditingCommentText("");
//                                             }
//                                           }}
//                                           className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                           Save
//                                         </button>
//                                         <button
//                                           onClick={() => {
//                                             setEditingCommentId(null);
//                                             setEditingCommentText("");
//                                           }}
//                                           className="text-sm px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//                                         >
//                                           Cancel
//                                         </button>
//                                       </div>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <p className="text-sm">{comment.text}</p>
//                                       <div className="flex space-x-2 mt-1">
//                                         <button
//                                           onClick={() => {
//                                             setEditingCommentId(comment._id);
//                                             setEditingCommentText(comment.text);
//                                           }}
//                                           className="text-xs text-blue-600 underline"
//                                         >
//                                           Edit
//                                         </button>
//                                         <button
//                                           onClick={() =>
//                                             deleteComment(
//                                               comment._id,
//                                               review._id
//                                             )
//                                           }
//                                           className="text-xs text-red-600 underline"
//                                         >
//                                           Delete
//                                         </button>
//                                       </div>
//                                     </>
//                                   )}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         <div className="mt-3 space-y-2">
//                           <textarea
//                             value={newReplies[review._id] || ""}
//                             onChange={(e) =>
//                               handleReplyChange(review._id, e.target.value)
//                             }
//                             rows="3"
//                             placeholder="Write a comment..."
//                             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           />
//                           <div className="flex space-x-2">

//                             <button
//                               onClick={() =>
//                                 handleReplySubmitWithRole(review._id, true)
//                               }
//                               className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                Reply
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               );
//             }
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AllReviews;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate, Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllReviews.css";
import img1 from "../Assets/Images/BannerImg/construction.jpg";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [newReplies, setNewReplies] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(decoded.userId);
        setCurrentUserRole(decoded.role);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "https://review-backend-vercel.vercel.app/api/reviews",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(
          response.data.filter((review) => review.status === "approved")
        );
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again later.");
      }
    };
    fetchReviews();
  }, []);

  const fetchCommentsForReview = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        `https://review-backend-vercel.vercel.app/api/review/${reviewId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId ? { ...review, comments: res.data } : review
        )
      );
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const postCommentForReview = async (
    reviewId,
    commentText,
    isBuilder = false
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `https://review-backend-vercel.vercel.app/api/review/${reviewId}/comments`,
        { text: commentText, isBuilder },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error posting comment:", err);
      return null;
    }
  };

  const updateComment = async (commentId, updatedText) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `https://review-backend-vercel.vercel.app/api/comments/${commentId}`,
        { text: updatedText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating comment:", err);
      return null;
    }
  };

  const deleteComment = async (commentId, reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `https://review-backend-vercel.vercel.app/api/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                comments: review.comments.filter((c) => c._id !== commentId),
              }
            : review
        )
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Please log in to like a review.");
        return;
      }
      const res = await axios.post(
        `https://review-backend-vercel.vercel.app/api/reviews/${reviewId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: res.data.review.likes,
                dislikes: res.data.review.dislikes,
                likeCount: res.data.review.likes.length,
                dislikeCount: res.data.review.dislikes.length,
              }
            : review
        )
      );
    } catch (err) {
      console.error("Error liking review:", err);
      setError("Failed to like review. Please try again.");
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Please log in to dislike a review.");
        return;
      }
      const res = await axios.post(
        `https://review-backend-vercel.vercel.app/api/reviews/${reviewId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: res.data.review.likes,
                dislikes: res.data.review.dislikes,
                likeCount: res.data.review.likes.length,
                dislikeCount: res.data.review.dislikes.length,
              }
            : review
        )
      );
    } catch (err) {
      console.error("Error disliking review:", err);
      setError("Failed to dislike review. Please try again.");
    }
  };

  const toggleReplies = (reviewId) => {
    setShowReplies((prev) => {
      const shouldShow = !prev[reviewId];
      if (shouldShow) fetchCommentsForReview(reviewId);
      return { ...prev, [reviewId]: shouldShow };
    });
  };

  const handleReplyChange = (reviewId, text) => {
    setNewReplies((prev) => ({ ...prev, [reviewId]: text }));
  };

  const handleReplySubmitWithRole = async (reviewId, isBuilder = false) => {
    if (currentUserRole !== "builder") {
      alert("Only builders can reply to comments.");
      return;
    }

    const text = newReplies[reviewId];
    if (!text) return;
    const postedComment = await postCommentForReview(reviewId, text, isBuilder);
    if (postedComment) {
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                comments: [...(review.comments || []), postedComment],
              }
            : review
        )
      );
      setNewReplies((prev) => ({ ...prev, [reviewId]: "" }));
    }
  };

  const groupedReviews = reviews.reduce((acc, review) => {
    const builder = review.constructorId?.name || "Unknown Builder";
    if (!acc[builder]) acc[builder] = [];
    acc[builder].push(review);
    return acc;
  }, {});

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    return reviews.length ? totalRating / reviews.length : 0;
  };

  const userReviews = selectedUser
    ? reviews.filter((r) => r.userId?.name === selectedUser)
    : null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error)
    return <div className="text-red-500 text-center py-5">{error}</div>;

  return (
    <section
      id="all-reviews"
      className="py-5 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50"
      ref={ref}
    >
      <div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.h2
          className="text-3xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          {selectedUser ? `Reviews by ${selectedUser}` : "All Customer Reviews"}
        </motion.h2>
        {selectedUser && (
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-6 px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            Back to All Builders
          </button>
        )}
        {/* Mobile View */}
        <div className="md:hidden">
          <Slider {...sliderSettings}>
            {(selectedUser ? userReviews : Object.entries(groupedReviews)).map(
              (entry) => {
                const isGroup = !selectedUser;
                const builder = isGroup ? entry[0] : null;
                const reviewsGroup = isGroup ? entry[1] : [entry];
                const avgRating = calculateAverageRating(reviewsGroup);
                const review = reviewsGroup[0];
                return (
                  <div key={isGroup ? builder : review._id} className="px-2">
                    <motion.div
                      className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col"
                      initial={{ opacity: 0, y: 50 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                      }
                      transition={{ duration: 0.7 }}
                    >
                      {isGroup && (
                        <>
                          <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2">
                            {builder}
                            {review.constructorId?.isVerified && (
                              <CheckCircleIcon
                                title="Verified Builder"
                                className="h-5 w-5 text-green-500"
                              />
                            )}
                          </h3>
                          <img
                            src={review.constructorId?.image || img1}
                            alt={`${builder} logo`}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl font-bold">
                              {avgRating.toFixed(1)}
                            </span>
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-gray-600 text-sm">
                              ({reviewsGroup.length} reviews)
                            </span>
                          </div>
                        </>
                      )}
                      <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        {reviewsGroup.map((review) => (
                          <div key={review._id} className="mt-4">
                            <p className="text-sm font-semibold text-blue-700">
                              <button
                                className="text-blue-600 mb-3"
                                onClick={() =>
                                  setSelectedUser(review.userId?.name)
                                }
                              >
                                {review.userId?.name || "Anonymous"}{" "}
                                {review.userId?.isVerified &&
                                  review.userId?.role === "builder" && (
                                    <CheckCircleIcon
                                      className="h-5 w-5 text-green-500 inline ml-1"
                                      title="Verified Builder"
                                    />
                                  )}
                              </button>
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                            <p className="mt-1 text-gray-800 text-sm">
                              {review.comment}
                            </p>
                            <p className="text-sm font-bold text-yellow-600">
                              ⭐ {review.rating} / 5
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Link
                                to={`/review/${review._id}`}
                                state={review}
                                className="text-blue-500"
                              >
                                Show More
                              </Link>
                              <button
                                onClick={() => handleLike(review._id)}
                                className={`text-sm flex items-center gap-1 ${
                                  currentUserId &&
                                  review.likes?.includes(currentUserId)
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                              >
                                <ThumbsUp size={16} />
                                {review.likeCount || 0}
                              </button>
                              <button
                                onClick={() => handleDislike(review._id)}
                                className={`text-sm flex items-center gap-1 ${
                                  currentUserId &&
                                  review.dislikes?.includes(currentUserId)
                                    ? "text-red-600"
                                    : "text-gray-600 hover:text-red-600"
                                }`}
                              >
                                <ThumbsDown size={16} />
                                {review.dislikeCount || 0}
                              </button>
                              <button
                                onClick={() => toggleReplies(review._id)}
                                className="px-3 py-1"
                              >
                                {showReplies[review._id]
                                  ? "Hide replies"
                                  : "Replies"}
                              </button>
                            </div>
                            {showReplies[review._id] && (
                              <div className="mt-4 border-t pt-2">
                                <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
                                  {(review.comments || []).map((comment) => (
                                    <div
                                      key={comment._id}
                                      className={`p-2 mb-2 rounded-md ${
                                        comment.isBuilder
                                          ? "bg-yellow-100 text-gray-900"
                                          : "bg-gray-200 text-gray-800"
                                      }`}
                                    >
                                      <p className="text-xs text-gray-500">
                                        {comment.isBuilder
                                          ? "👷 Builder"
                                          : "🧑 User"}
                                      </p>
                                      {editingCommentId === comment._id ? (
                                        <>
                                          <textarea
                                            value={editingCommentText}
                                            onChange={(e) =>
                                              setEditingCommentText(
                                                e.target.value
                                              )
                                            }
                                            className="w-full p-1 rounded border text-sm"
                                            rows="2"
                                          />
                                          <div className="flex space-x-2 mt-1">
                                            <button
                                              onClick={async () => {
                                                const updated =
                                                  await updateComment(
                                                    comment._id,
                                                    editingCommentText
                                                  );
                                                if (updated) {
                                                  setReviews((prev) =>
                                                    prev.map((r) =>
                                                      r._id === review._id
                                                        ? {
                                                            ...r,
                                                            comments:
                                                              r.comments.map(
                                                                (c) =>
                                                                  c._id ===
                                                                  comment._id
                                                                    ? {
                                                                        ...c,
                                                                        text: editingCommentText,
                                                                      }
                                                                    : c
                                                              ),
                                                          }
                                                        : r
                                                    )
                                                  );
                                                  setEditingCommentId(null);
                                                  setEditingCommentText("");
                                                }
                                              }}
                                              className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={() => {
                                                setEditingCommentId(null);
                                                setEditingCommentText("");
                                              }}
                                              className="text-sm px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-sm">
                                            {comment.text}
                                          </p>
                                          <div className="flex space-x-2 mt-1">
                                            <button
                                              onClick={() => {
                                                setEditingCommentId(
                                                  comment._id
                                                );
                                                setEditingCommentText(
                                                  comment.text
                                                );
                                              }}
                                              className="text-xs text-blue-600 underline"
                                            >
                                              Edit
                                            </button>
                                            <button
                                              onClick={() =>
                                                deleteComment(
                                                  comment._id,
                                                  review._id
                                                )
                                              }
                                              className="text-xs text-red-600 underline"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="mt-3 space-y-2">
                              <textarea
                                value={newReplies[review._id] || ""}
                                onChange={(e) =>
                                  handleReplyChange(review._id, e.target.value)
                                }
                                rows="3"
                                placeholder="Write a comment..."
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleReplySubmitWithRole(review._id, true)
                                  }
                                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                );
              }
            )}
          </Slider>
        </div>
        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap gap-6 justify-center">
          {(selectedUser ? userReviews : Object.entries(groupedReviews)).map(
            (entry) => {
              const isGroup = !selectedUser;
              const builder = isGroup ? entry[0] : null;
              const reviewsGroup = isGroup ? entry[1] : [entry];
              const avgRating = calculateAverageRating(reviewsGroup);
              const review = reviewsGroup[0];
              return (
                <motion.div
                  key={isGroup ? builder : review._id}
                  className="w-full sm:w-96 md:w-80 lg:w-72 bg-white rounded-lg shadow-md p-4 flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.7 }}
                >
                  {isGroup && (
                    <>
                      <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2">
                        {builder}
                        {review.constructorId?.isVerified && (
                          <CheckCircleIcon
                            title="Verified Builder"
                            className="h-5 w-5 text-green-500"
                          />
                        )}
                      </h3>
                      <img
                        src={review.constructorId?.image || img1}
                        alt={`${builder} logo`}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold">
                          {avgRating.toFixed(1)}
                        </span>
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-gray-600 text-sm">
                          ({reviewsGroup.length} reviews)
                        </span>
                      </div>
                    </>
                  )}
                  <div className="overflow-y-auto max-h-64 custom-scrollbar">
                    {reviewsGroup.map((review) => (
                      <div key={review._id} className="mt-4">
                        <p className="text-sm font-semibold text-blue-700">
                          <button
                            className="text-blue-600 mb-3"
                            onClick={() => setSelectedUser(review.userId?.name)}
                          >
                            {review.userId?.name || "Anonymous"}{" "}
                            {review.userId?.isVerified &&
                              review.userId?.role === "builder" && (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-500 inline ml-1"
                                  title="Verified Builder"
                                />
                              )}
                          </button>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-gray-800 text-sm">
                          {review.comment}
                        </p>
                        <p className="text-sm font-bold text-yellow-600">
                          ⭐ {review.rating} / 5
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Link
                            to={`/review/${review._id}`}
                            state={review}
                            className="text-blue-500"
                          >
                            Show More
                          </Link>
                          <button
                            onClick={() => handleLike(review._id)}
                            className={`text-sm flex items-center gap-1 ${
                              currentUserId &&
                              review.likes?.includes(currentUserId)
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                          >
                            <ThumbsUp size={16} />
                            {review.likeCount || 0}
                          </button>
                          <button
                            onClick={() => handleDislike(review._id)}
                            className={`text-sm flex items-center gap-1 ${
                              currentUserId &&
                              review.dislikes?.includes(currentUserId)
                                ? "text-red-600"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            <ThumbsDown size={16} />
                            {review.dislikeCount || 0}
                          </button>
                          <button
                            onClick={() => toggleReplies(review._id)}
                            className="px-3 py-1"
                          >
                            {showReplies[review._id]
                              ? "Hide replies"
                              : "Replies"}
                          </button>
                        </div>
                        {showReplies[review._id] && (
                          <div className="mt-4 border-t pt-2">
                            <div className="max-h-36 overflow-y-auto border rounded p-2 bg-gray-50">
                              {(review.comments || []).map((comment) => (
                                <div
                                  key={comment._id}
                                  className={`p-2 mb-2 rounded-md ${
                                    comment.isBuilder
                                      ? "bg-yellow-100 text-gray-900"
                                      : "bg-gray-200 text-gray-800"
                                  }`}
                                >
                                  <p className="text-xs text-gray-500">
                                    {comment.isBuilder
                                      ? "👷 Builder"
                                      : "🧑 User"}
                                  </p>
                                  {editingCommentId === comment._id ? (
                                    <>
                                      <textarea
                                        value={editingCommentText}
                                        onChange={(e) =>
                                          setEditingCommentText(e.target.value)
                                        }
                                        className="w-full p-1 rounded border text-sm"
                                        rows="2"
                                      />
                                      <div className="flex space-x-2 mt-1">
                                        <button
                                          onClick={async () => {
                                            const updated = await updateComment(
                                              comment._id,
                                              editingCommentText
                                            );
                                            if (updated) {
                                              setReviews((prev) =>
                                                prev.map((r) =>
                                                  r._id === review._id
                                                    ? {
                                                        ...r,
                                                        comments:
                                                          r.comments.map((c) =>
                                                            c._id ===
                                                            comment._id
                                                              ? {
                                                                  ...c,
                                                                  text: editingCommentText,
                                                                }
                                                              : c
                                                          ),
                                                      }
                                                    : r
                                                )
                                              );
                                              setEditingCommentId(null);
                                              setEditingCommentText("");
                                            }
                                          }}
                                          className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingCommentId(null);
                                            setEditingCommentText("");
                                          }}
                                          className="text-sm px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-sm">{comment.text}</p>
                                      <div className="flex space-x-2 mt-1">
                                        <button
                                          onClick={() => {
                                            setEditingCommentId(comment._id);
                                            setEditingCommentText(comment.text);
                                          }}
                                          className="text-xs text-blue-600 underline"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            deleteComment(
                                              comment._id,
                                              review._id
                                            )
                                          }
                                          className="text-xs text-red-600 underline"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mt-3 space-y-2">
                          <textarea
                            value={newReplies[review._id] || ""}
                            onChange={(e) =>
                              handleReplyChange(review._id, e.target.value)
                            }
                            rows="3"
                            placeholder="Write a comment..."
                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleReplySubmitWithRole(review._id, true)
                              }
                              className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default AllReviews;
