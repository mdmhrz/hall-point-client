import React from 'react';
import { FaStar, FaUtensils, FaHeart, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const MealCard = ({ meal }) => {
    return (
        <div className="group relative">
            {/* Main Card Container */}
            <div className="bg-base-100 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 border border-base-200 group-hover:border-primary/20">

                {/* Image Container with Overlays */}
                <div className="relative overflow-hidden">
                    <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="bg-primary/90 backdrop-blur-sm text-primary-content text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20">
                            {meal.category}
                        </div>
                    </div>

                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button className="btn btn-circle btn-sm bg-base-100/90 border-none hover:bg-error hover:text-white shadow-lg backdrop-blur-sm">
                            <FaHeart className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Rating Badge - Bottom Right */}
                    <div className="absolute bottom-4 right-4 bg-base-100/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/20">
                        <div className="flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-warning" />
                            <span className="text-sm font-bold text-base-content">{meal.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                    {/* Title and Price */}
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-base-content line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {meal.title}
                        </h3>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-primary">${meal.price}</span>
                            <span className="text-xs text-base-content/60">per serving</span>
                        </div>
                    </div>



                    {/* Star Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`w-4 h-4 transition-colors duration-200 ${i < Math.floor(meal.rating)
                                        ? 'text-warning'
                                        : 'text-base-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-base-content/60 font-medium">
                            ({meal.rating}/5)
                        </span>
                    </div>

                    {/* Ingredients Preview */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-base-content/80">Key Ingredients:</h4>
                        <div className="flex flex-wrap gap-2">
                            {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                                <span
                                    key={idx}
                                    className="bg-secondary/10 text-secondary text-xs font-medium px-3 py-1.5 rounded-full border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200"
                                >
                                    {ingredient}
                                </span>
                            ))}
                            {meal.ingredients.length > 3 && (
                                <span className="bg-base-200 text-base-content/60 text-xs font-medium px-3 py-1.5 rounded-full">
                                    +{meal.ingredients.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Link
                            to={`/meal-details/${meal._id}`}
                            className="btn btn-primary btn-block rounded-full group/btn relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <span className="flex items-center gap-2 relative z-10">
                                <FaUtensils className="w-4 h-4" />
                                <span className="font-semibold">View Details</span>
                                <FaArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </span>

                            {/* Button shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        </div>
    );
};

export default MealCard;