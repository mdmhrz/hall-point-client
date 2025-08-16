import React from 'react';
import { FaStar, FaClock, FaUser, FaEnvelope } from "react-icons/fa";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { motion } from "framer-motion";

const UpcomingMealCard = ({ meal, likedMeals, userRole, handleLike }) => {
    return (
        <motion.div
            key={meal._id}
            whileHover={{ scale: 1.02 }}
            className="card bg-base-300 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200"
        >
            <figure className="relative">
                <img
                    src={meal.image}
                    alt={meal.title}
                    className="h-48 w-full object-cover"
                />

                <div className="absolute top-3 right-3 badge badge-primary font-bold">
                    ${meal.price}
                </div>
            </figure>

            <div className="card-body p-5 flex flex-col justify-between">
                <div>
                    {/* everything above the button */}
                    <div className="flex items-center justify-between">
                        <h2 className="card-title text-xl text-primary flex-1">{meal.title}</h2>
                        <div className="badge badge-outline badge-accent text-xs ml-2">
                            {meal.cuisine}
                        </div>
                    </div>
                    <p className="text-base-content/70 text-sm mb-4">{meal.description}</p>

                    <div className="flex flex-wrap gap-1 mt-2">
                        {meal.ingredients.slice(0, 4).map((ingredient, i) => (
                            <span
                                key={i}
                                className="bg-primary/30 px-4 py-1 rounded-full text-xs"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-5 text-sm text-base-content/60">
                        <div className="flex items-center gap-1">
                            <FaClock className="text-primary" />
                            <span>{meal.prep_time}min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaUser className="text-accent" />
                            <span className="truncate max-w-20">{meal.distributor_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MdOutlineFavorite className="text-error" />
                            <span>{meal.likes || 0}</span>
                        </div>
                    </div>
                </div>

                {/* button sticks at bottom */}
                <div className="card-actions mt-4">
                    <button
                        onClick={() => handleLike(meal._id)}
                        disabled={userRole === "Bronze"}
                        className={`btn btn-sm w-full ${likedMeals.has(meal._id)
                            ? "btn-outline btn-error"
                            : "btn-primary"
                            }`}
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
            </div>

        </motion.div>
    );
};

export default UpcomingMealCard;