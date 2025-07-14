import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaStar, FaClock, FaUser, FaEnvelope } from "react-icons/fa";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";

const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [userRole, setUserRole] = useState(null);
    const [likedMeals, setLikedMeals] = useState(() => new Set());

    // Get logged in user's role (Silver/Gold/Platinum)
    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users?email=${user.email}`);
                const userBadge = res.data?.badge
                setUserRole(userBadge);
            }
        };
        fetchUserData();
    }, [user?.email, axiosSecure]);



    // Get all upcoming meals (TanStack only used for GET)
    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ["upcomingMeals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/upcoming-meals");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const handleLike = async (mealId) => {
        if (!userRole || userRole === "Bronze") {
            toast.info("Only Silver, Gold, or Platinum members can like meals.");
            return;
        }

        try {
            const res = await axiosSecure.patch(`/upcoming-meals/like/${mealId}`, {
                email: user?.email,
            });

            if (res.data?.success) {
                const message = res.data?.published
                    ? "Meal published to main collection after 10 likes!"
                    : "Meal liked successfully!";

                toast.success(message);
                refetch();
            } else {
                toast.warn(res.data?.message || "Something went wrong.");
            }

        } catch (err) {
            const status = err.response?.status;

            if (status === 400) {
                toast.warn(err.response.data?.message || "You already liked this meal.");
            } else {
                toast.error("Failed to like the meal. Please try again.");
            }
        }
    };



    return (

        <>
            <Helmet>
                <title>Upcoming Meals | HallPoint</title>
            </Helmet>
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Upcoming Meals</h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Explore delicious meals coming soon. Like your favorites!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.map((meal) => (
                        <motion.div
                            key={meal._id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-white via-base-100 to-white shadow-lg rounded-3xl border border-primary/10 overflow-hidden flex flex-col"
                        >
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="h-48 w-full object-cover rounded-t-3xl"
                            />

                            <div className="p-5 flex flex-col gap-2 flex-grow">
                                <h3 className="text-2xl font-bold text-primary">{meal.title}</h3>
                                <p className="text-gray-700 text-sm">{meal.description}</p>

                                <div className="text-sm text-gray-500">
                                    <span className="font-semibold text-primary">Cuisine:</span>{" "}
                                    {meal.cuisine}
                                </div>

                                <div className="flex flex-wrap gap-2 text-sm mt-1">
                                    {meal.ingredients.slice(0, 4).map((ingredient, i) => (
                                        <span
                                            key={i}
                                            className="bg-primary/10 px-2 py-1 rounded-full text-primary"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between mt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <FaClock className="text-primary" /> {meal.prep_time} mins
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-500" /> ${meal.price}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-primary" /> {meal.distributor_name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MdOutlineFavorite className="text-rose-500" />{" "}
                                        {meal.likes || 0}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleLike(meal._id)}
                                    disabled={userRole === "Bronze"}
                                    className={`btn mt-4 ${likedMeals.has(meal._id)
                                        ? "btn-outline btn-error"
                                        : "btn-primary"
                                        } rounded-full w-full flex items-center justify-center gap-2`}
                                >
                                    {likedMeals.has(meal._id) ? (
                                        <>
                                            <MdOutlineFavorite />
                                            Liked
                                        </>
                                    ) : (
                                        <>
                                            <MdOutlineFavoriteBorder />
                                            Like This Meal
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default UpcomingMeals;
