import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaExternalLinkAlt, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import EditReviewModal from "./EditReviewModal";

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [editingReview, setEditingReview] = useState(null);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["myReviews", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: allMeals = [] } = useQuery({
        queryKey: ["allMeals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "Are you sure you want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/reviews/${id}`);
                    toast.success("Review deleted successfully.");
                    refetch();
                } catch (err) {
                    toast.error("Failed to delete review.");
                }
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6"
        >
            <div className="max-w-6xl mx-auto bg-white shadow-xl border rounded-3xl px-6 py-8">
                <h1 className="text-3xl font-bold text-indigo-600 text-center mb-1">My Reviews</h1>
                <p className="text-center text-sm text-gray-500 mb-4">
                    View, edit, or remove your posted reviews. Click “View Meal” to revisit the meal page.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-indigo-50 text-indigo-700 font-semibold">
                                <th className="py-3 px-4 text-left">Meal</th>
                                <th className="py-3 px-4 text-left">Review</th>
                                <th className="py-3 px-4 text-center"><FaThumbsUp /></th>
                                <th className="py-3 px-4 text-center"><FaCommentDots /></th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        You haven’t posted any reviews yet.
                                    </td>
                                </tr>
                            )}
                            {reviews.map((review) => {
                                const meal = allMeals.find((m) => m._id === review.mealId);
                                if (!meal) return null;

                                return (
                                    <motion.tr
                                        key={review._id}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b hover:bg-indigo-50/30"
                                    >
                                        <td className="py-3 px-4 flex items-center gap-3">
                                            <img
                                                src={meal.image}
                                                alt={meal.title}
                                                className="w-12 h-12 rounded-md object-cover shadow"
                                            />
                                            <span>{meal.title}</span>
                                        </td>
                                        <td className="py-3 px-4 max-w-sm truncate">{review.comment}</td>
                                        <td className="py-3 px-4 text-center">{meal.likes}</td>
                                        <td className="py-3 px-4 text-center">{meal.reviews_count}</td>
                                        <td className="py-3 px-4 text-center flex gap-2 justify-center">
                                            <button
                                                onClick={() => navigate(`/meal-details/${meal._id}`)}
                                                className="text-blue-500 hover:text-blue-700"
                                                title="View Meal"
                                            >
                                                <FaExternalLinkAlt />
                                            </button>
                                            <button
                                                onClick={() => setEditingReview(review)}
                                                className="text-yellow-500 hover:text-yellow-600"
                                                title="Edit Review"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete Review"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingReview && (
                <EditReviewModal
                    review={editingReview}
                    closeModal={() => setEditingReview(null)}
                    refetch={refetch}
                />
            )}
        </motion.div>
    );
};

export default MyReviews;
