import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
    FaRegTrashAlt,
    FaRegEdit,
    FaExternalLinkSquareAlt,
    FaHeart,
    FaComment,
} from "react-icons/fa";
import EditReviewModal from "./EditReviewModal";
import dayjs from "dayjs";

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [editingReview, setEditingReview] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data: reviewData = {}, refetch, isLoading } = useQuery({
        queryKey: ["myReviews", user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/reviews/user?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    const reviews = reviewData?.reviews || [];
    const total = reviewData?.total || 0;
    const totalPages = Math.ceil(total / itemsPerPage);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6"
        >
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl px-6 py-8 border border-indigo-100">
                <h1 className="text-3xl font-bold text-indigo-600 text-center mb-1">
                    My Reviews
                </h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Manage and track your meal reviews. Click edit to update or delete to remove.
                </p>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="table w-full text-sm">
                        <thead className="bg-indigo-100 text-indigo-800 font-semibold text-left">
                            <tr>
                                <th className="py-3 px-4">Meal</th>
                                <th className="py-3 px-4">Review</th>
                                <th className="py-3 px-4 text-center"><FaHeart title="Likes" /></th>
                                <th className="py-3 px-4 text-center"><FaComment title="Comments" /></th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">Loading...</td>
                                </tr>
                            ) : reviews.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        You haven’t posted any reviews yet.
                                    </td>
                                </tr>
                            ) : (
                                reviews.map((review) => {
                                    const meal = allMeals.find((m) => m._id === review.mealId);
                                    if (!meal) return null;

                                    return (
                                        <motion.tr
                                            key={review._id}
                                            whileHover={{ scale: 1.01, backgroundColor: "#f0f5ff" }}
                                            transition={{ duration: 0.2 }}
                                            className="border-b border-gray-200 transition-all"
                                        >
                                            <td className="py-3 px-4 flex items-center gap-3">
                                                <img
                                                    src={meal.image}
                                                    alt={meal.title}
                                                    className="w-12 h-12 rounded-md object-cover shadow-md"
                                                />
                                                <span className="font-medium">{meal.title}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-gray-700">{review.comment}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Posted {dayjs(review.created_at).fromNow()}
                                                </p>
                                            </td>
                                            <td className="py-3 px-4 text-center">{meal.likes}</td>
                                            <td className="py-3 px-4 text-center">{meal.reviews_count}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex justify-center gap-3 text-[18px]">
                                                    <button
                                                        onClick={() => navigate(`/meal-details/${meal._id}`)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                        title="View Meal"
                                                    >
                                                        <FaExternalLinkSquareAlt />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingReview(review)}
                                                        className="text-yellow-500 hover:text-yellow-600"
                                                        title="Edit Review"
                                                    >
                                                        <FaRegEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(review._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Delete Review"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {total > 0 && (
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <label htmlFor="itemsPerPage" className="font-medium min-w-[120px]">Items per page:</label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="select select-sm border border-gray-300 rounded-md"
                            >
                                {[5, 10, 15, 20, 30, 50].map((count) => (
                                    <option key={count} value={count}>{count}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage <= 1}
                                className="btn btn-sm btn-outline"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages).keys()].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page + 1)}
                                    className={`btn btn-sm ${currentPage === page + 1 ? "btn-primary text-white" : "btn-outline"}`}
                                >
                                    {page + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="btn btn-sm btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
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
