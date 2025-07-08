// === MealDetails.jsx ===
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

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
            await axiosSecure.post(`/meal-requests`, {
                mealId: id,
                userEmail: user.email,
                status: 'pending',
                requestedAt: new Date().toISOString(),
            });
            toast.success("Meal requested successfully!");
        } catch (err) {
            console.error(err);
        }
    };


    const handlePostReview = async () => {
        if (!reviewText.trim()) return;
        try {
            await axiosSecure.post(`/meals/${id}/reviews`, {
                user: user.displayName,
                email: user.email,
                comment: reviewText,
                rating: userRating,
            });
            setReviewText("");
            const res = await axiosSecure.get(`/meals/${id}`);
            setMeal(res.data);
            toast.success("Review posted!");
        } catch (err) {
            console.error(err);
        }
    };

    if (!meal) return <div className="text-center py-20">Loading meal...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
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
                <div className="space-y-4">
                    {meal.reviews?.map((r, i) => (
                        <div key={i} className="border p-4 rounded-lg shadow-sm">
                            <p className="font-semibold text-gray-800">{r.user}</p>
                            <p className="text-sm text-gray-500">{new Date(r.date).toLocaleDateString()}</p>
                            <p className="text-gray-700 mt-1">{r.comment}</p>
                        </div>
                    ))}
                </div>



                {user && (
                    <div className="mt-6">
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
            </div>
        </div>
    );
};

export default MealDetails;
