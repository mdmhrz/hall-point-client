// === MealDetails.jsx ===
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'

const MealDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [meal, setMeal] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [userRating, setUserRating] = useState(0);



    useEffect(() => {
        axiosSecure.get(`/meals/${id}`).then(res => setMeal(res.data));
    }, [id, axiosSecure]);


    const { data: mealReviews = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['mealReviews', id], // cache key
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}/reviews`);
            return res.data;
        },
        enabled: !!id, // only run if id exists
    });


    const handleLike = async () => {
        if (!user) return toast.error("Login required to like");
        try {
            await axiosSecure.patch(`/meals/${id}/like`);
            const res = await axiosSecure.get(`/meals/${id}`);
            setMeal(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRequestMeal = async () => {
        if (!user) return toast.error("Login required to request meal");

        try {
            // 1. Get user data from the DB
            const userRes = await axiosSecure.get(`/users?email=${user.email}`);
            const dbUser = userRes.data;

            if (!dbUser || dbUser.badge === 'bronze') {
                return toast.error("Upgrade your membership to request meals.");
            }

            // 2. Check if this user already requested this meal
            const existingRes = await axiosSecure.get(`/meal-requests?mealId=${id}&userEmail=${user.email}`);
            if (existingRes.data.exists) {
                return toast.warning("You’ve already requested this meal.");
            }

            // 3. Post new meal request
            await axiosSecure.post(`/meal-requests`, {
                mealId: id,
                userName: user.displayName,
                userEmail: user.email,
                status: 'pending',
                requestedAt: new Date().toISOString(),
            });

            toast.success("Meal requested successfully!");

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };



    const handlePostReview = async () => {
        if (!reviewText.trim()) return;
        try {
            await axiosSecure.post(`/meals/${id}/reviews`, {
                mealTitle: meal.title,
                user: user.displayName,
                email: user.email,
                comment: reviewText,
                rating: userRating,
            });
            setReviewText("");
            const res = await axiosSecure.get(`/meals/${id}`);
            setMeal(res.data);
            toast.success("Review posted!");
            setUserRating(0)
            refetch()
        } catch (err) {
            console.error(err);
        }
    };

    if (!meal) return <div className="text-center py-20">Loading meal...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="text-center max-w-2xl md:max-w-3xl mx-auto mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                    Meal Details
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                    Here's everything you need to know about this dish — from its ingredients and taste profile to user ratings and reviews.
                    Enjoy reading and feel free to share your feedback!
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img src={meal.image} alt={meal.title} className="rounded-xl w-full h-96 object-cover shadow" />
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{meal.title}</h1>
                    <p className="text-gray-500">{meal.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                        {meal.ingredients.map((i, idx) => (
                            <span key={idx} className="bg-secondary/10 text-secondary border border-secondary px-3 py-1 rounded-full">
                                {i}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">Posted on: {new Date(meal.posted_at).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">Distributor: <span className="font-medium">{meal.distributor_name}</span></p>
                    <p className="text-2xl text-primary font-bold">${meal.price}</p>

                    <div className="flex items-center gap-1 text-yellow-500">
                        {Array(5).fill().map((_, i) => (
                            <FaStar key={i} className={i < meal.rating ? 'text-yellow-500' : 'text-gray-300'} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({meal.rating})</span>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            className="btn btn-outline flex items-center gap-2"
                            onClick={handleLike}
                            disabled={!user}
                        >
                            {meal.likes > 0 ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {meal.likes}
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleRequestMeal}
                            disabled={!user}
                        >
                            Request Meal
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-3">Reviews ({meal.reviews_count || 0})</h3>

                {user && (
                    <div className="my-6">
                        {/* Rating Input */}
                        <div className="form-control mb-3">
                            <label className="label font-semibold">Your Rating</label>
                            <div className="rating rating-md">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <input
                                        key={num}
                                        type="radio"
                                        name="rating"
                                        className="mask mask-star-2 bg-yellow-400"
                                        value={num}
                                        checked={userRating === num}
                                        onChange={() => setUserRating(num)}
                                    />
                                ))}
                            </div>
                            <small className='ml-5 text-gray-600'>(Recommended)</small>
                        </div>

                        {/* Review Text */}
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            className="textarea textarea-bordered w-full mb-2"
                            rows={3}
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            onClick={handlePostReview}
                            className="btn btn-primary"
                            disabled={!reviewText.trim() || !userRating}
                        >
                            Post Review
                        </button>
                    </div>

                )}


                {/* Previous Reviews */}
                <div className="space-y-4">
                    {mealReviews?.map((r, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-all p-5 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold text-primary">{r.user}</p>
                                    <p className="text-sm text-gray-400">{r.email}</p>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(r.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>

                            <div className="mt-2 text-gray-700 text-sm border-l-4 border-primary pl-4 italic bg-gray-50 rounded-md">
                                “{r.comment}”
                            </div>
                        </div>
                    ))}
                </div>




            </div>
        </div>
    );
};

export default MealDetails;
