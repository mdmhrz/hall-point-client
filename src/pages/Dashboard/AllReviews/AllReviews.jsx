import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [refetching, setRefetching] = useState(false);

    // Get all meals
    const { data: meals = [], refetch } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    // Get all reviews
    const { data: reviews = [], refetch: reviewRefetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        },
    });

    // Delete single review
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
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-primary">📊 All Meal Reviews</h2>
                <p className="text-lg text-gray-600 mt-2">
                    Overview of every meal’s feedback and engagement
                </p>
                <p className="mt-4 text-sm text-gray-500 italic">
                    🔍 Admin can view reviews, total likes, and manage reviews from here.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200 shadow-lg rounded-xl">
                    <thead className="bg-base-200 text-base font-semibold text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews Count</th>
                            <th>All Reviews</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, idx) => {

                            const mealReviews = reviews.filter(
                                (r) => r.mealId === meal._id
                            );
                            return (
                                <tr key={meal._id} className="hover:bg-base-100">
                                    <td>{idx + 1}</td>
                                    <td className="font-semibold">{meal.title}</td>
                                    <td className="text-rose-500 font-bold">{meal.likes}</td>
                                    <td className="text-blue-500 font-bold">
                                        {meal.reviews_count}
                                    </td>
                                    <td>
                                        <ul className="list-disc ml-4 text-sm space-y-1 max-w-xs">
                                            {mealReviews.map((review) => (
                                                <li key={review._id}>
                                                    <span className="font-medium">
                                                        {review.user || "User"}:
                                                    </span>{" "}
                                                    {review.comment}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        {mealReviews.map((review) => (
                                            <button
                                                key={review._id}
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="btn btn-xs btn-error mb-1 block"
                                            >
                                                Delete
                                            </button>
                                        ))}
                                    </td>
                                </tr>
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
            </div>
        </div>
    );
};

export default AllReviews;
