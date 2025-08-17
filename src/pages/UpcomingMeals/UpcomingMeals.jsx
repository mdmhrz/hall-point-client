import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";
import UpcomingMealCard from "../../components/UpcomingMealCard";

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
            <div className="bg-base-300">
                <section className="py-12  px-4 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Upcoming Meals</h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Explore delicious meals coming soon. Like your favorites!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {meals.map((meal) => (
                            <UpcomingMealCard
                                key={meal._id}
                                meal={meal}
                                likedMeals={likedMeals}
                                setLikedMeals={setLikedMeals}
                                userRole={userRole}
                                handleLike={handleLike}
                            ></UpcomingMealCard>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default UpcomingMeals;
