import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete, MdVisibility } from "react-icons/md";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import Loading from "../../../components/Loading";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [refresh, setRefresh] = useState(false);

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['allReviews', refresh],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this review?");
            if (!confirmed) return;
            const res = await axiosSecure.delete(`/reviews/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Review deleted successfully");
                refetch();
            }
        } catch (err) {
            toast.error("Failed to delete review");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <section className="px-4 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary">🌟 All Meal Reviews</h2>
                <p className="text-gray-600 mt-2 text-lg">Manage and monitor all meal reviews from one place.</p>
                <div className="mt-4 bg-base-100 p-4 rounded-xl text-sm text-info border border-info/20 shadow">
                    💡 Tip: Click on “View Meal” to see detailed meal info or “Delete” to remove inappropriate reviews.
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-xl border border-base-300">
                <table className="table table-zebra text-sm md:text-base">
                    <thead className="bg-primary text-white text-left">
                        <tr>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Review Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review._id}>
                                <td className="font-semibold">{review.mealTitle || "N/A"}</td>
                                <td className="text-rose-500 font-medium flex items-center gap-2">
                                    <FaHeart /> {review.likes || 0}
                                </td>
                                <td className="text-blue-500 font-medium flex items-center gap-2">
                                    <FaRegCommentDots /> {review.reviews_count || 0}
                                </td>
                                <td className="flex gap-3 items-center">
                                    <Link to={`/dashboard/admin/meal-details/${review.mealId}`}>
                                        <button className="btn btn-sm btn-info text-white flex gap-1 items-center">
                                            <MdVisibility /> View Meal
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-sm btn-error text-white flex gap-1 items-center"
                                    >
                                        <MdDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reviews.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No reviews available yet.</p>
                )}
            </div>
        </section>
    );
};

export default AllReviews;
