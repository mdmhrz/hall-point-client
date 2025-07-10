import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [refetching, setRefetching] = useState(false);

    // Meals
    const { data: meals = [], refetch } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    // Reviews
    const { data: reviews = [], refetch: reviewRefetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        },
    });

    // Delete Review Handler
    const handleDeleteReview = async (reviewId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/reviews/${reviewId}`);
                if (res.data.success) {
                    toast.success("Review deleted");
                    setRefetching(true);
                    await reviewRefetch();
                    setRefetching(false);
                } else {
                    toast.warn(res.data.message || "Something went wrong");
                }
            } catch (err) {
                toast.error("Failed to delete review");
            }
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            {/* Heading */}
            <div className="text-center mb-10">
                <motion.h2
                    className="text-4xl font-extrabold text-primary"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    📝 All Meal Reviews
                </motion.h2>
                <p className="text-lg text-gray-600 mt-2">
                    Admin overview of meal feedback, likes, and engagement
                </p>
                <p className="text-sm text-gray-500 italic mt-1">
                    Manage reviews and explore customer interactions
                </p>
            </div>

            {/* Table */}
            <motion.div
                className="overflow-x-auto bg-white shadow-xl rounded-xl border border-primary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-base-200 text-primary text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Meal</th>
                            <th className="px-6 py-4 text-left">Likes</th>
                            <th className="px-6 py-4 text-left">Reviews Count</th>
                            <th className="px-6 py-4 text-left">Reviews</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {meals.map((meal, idx) => {
                            const mealReviews = reviews.filter((r) => r.mealId === meal._id);

                            return (
                                <motion.tr
                                    key={meal._id}
                                    className="hover:bg-primary/5 transition-all duration-200"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700">{idx + 1}</td>

                                    {/* Meal Info + View Button */}
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-primary">{meal.title}</div>
                                        <p className="text-xs text-gray-500 mb-2">${meal.price}</p>
                                        <button
                                            onClick={() => navigate(`/meal-details/${meal._id}`)}
                                            className="btn btn-xs btn-outline btn-info rounded-full"
                                        >
                                            View Meal
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-rose-500">
                                        {meal.likes}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-blue-600">
                                        {meal.reviews_count}
                                    </td>

                                    {/* Reviews Section */}
                                    <td className="px-6 py-4">
                                        {mealReviews.length > 0 ? (
                                            <div className="space-y-3 max-w-lg">
                                                {mealReviews.map((review) => (
                                                    <motion.div
                                                        key={review._id}
                                                        className="bg-base-100 border border-gray-200 p-3 rounded-lg shadow-sm flex items-start justify-between gap-2 hover:shadow-md transition"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                    >
                                                        <div className="text-sm text-gray-700">
                                                            <p className="font-semibold text-accent mb-1">
                                                                {review.user || "User"}
                                                            </p>
                                                            <p className="text-sm">{review.comment}</p>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteReview(review._id)
                                                            }
                                                            className="btn btn-xs btn-error rounded-md h-fit"
                                                        >
                                                            Delete
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">
                                                No reviews yet
                                            </p>
                                        )}
                                    </td>
                                </motion.tr>
                            );
                        })}
                        {meals.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No meals or reviews found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </section>
    );
};

export default AllReviews;
