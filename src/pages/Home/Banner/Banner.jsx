import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { FaSearch, FaUtensils, FaCalendarAlt, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const slides = [
    {
        title: "Discover Culinary Delights",
        description: "Explore and rate your favorite hostel meals with ease.",
        bg: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        overlay: "bg-gradient-to-r from-indigo-500/50 via-black/50 to-purple-500/50",
    },
    {
        title: "Your Voice Matters",
        description: "Share your dining experience and help others decide.",
        bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        overlay: "bg-gradient-to-r from-emerald-500/50 via-black/50 to-teal-500/50",
    },
    {
        title: "Meal Planning Made Easy",
        description: "Check upcoming meals and plan your dining schedule.",
        bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        overlay: "bg-gradient-to-r from-amber-500/50 via-black/50 to-orange-500/50",
    },
];

const Banner = () => {
    const [search, setSearch] = useState("");
    const [activeSlide, setActiveSlide] = useState(0);
    const axiosSecure = useAxiosSecure();

    const {
        data: searchResults,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["searchResults", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/search?query=${search}`);
            return res.data;
        },
        enabled: !!search.trim(), // Only enable when search has value
    });

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim()) {
                refetch();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search, refetch]);

    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
            {/* Background Swiper with Gradient Overlay */}
            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop
                speed={1000}
                onSlideChange={({ realIndex }) => setActiveSlide(realIndex)}
                className="w-full h-full"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full h-full relative">
                            <div
                                className="w-full h-full bg-cover bg-center absolute inset-0"
                                style={{ backgroundImage: `url(${slide.bg})` }}
                            />
                            <div className={`w-full h-full absolute inset-0 ${slide.overlay}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white px-4">
                <div className="text-center max-w-4xl w-full">
                    <motion.h1
                        key={`title-${activeSlide}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        {slides[activeSlide].title}
                    </motion.h1>

                    <motion.p
                        key={`desc-${activeSlide}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
                    >
                        {slides[activeSlide].description}
                    </motion.p>

                    {/* Search Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative w-full max-w-2xl mx-auto"
                    >
                        <div className="relative flex items-center bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/30 shadow-lg">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search meals, reviews or upcoming meals..."
                                className="flex-grow px-6 py-4 bg-transparent outline-none text-white placeholder-white/80"
                            />
                            <button className="p-4 text-white hover:text-amber-300 transition-colors">
                                <FaSearch className="text-xl" />
                            </button>
                        </div>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {(search.trim() && (isLoading || searchResults)) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                                >
                                    {isLoading ? (
                                        <div className="p-6 text-center text-gray-600">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        <>
                                            {/* Meals Section */}
                                            {searchResults?.meals?.length > 0 && (
                                                <div className="border-b border-gray-100">
                                                    <div className="flex items-center px-6 pt-4 pb-2 bg-gray-50">
                                                        <FaUtensils className="text-amber-500 mr-2" />
                                                        <h3 className="font-semibold text-gray-700">Meals</h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 divide-y divide-gray-100">
                                                        {searchResults.meals.map((meal) => (
                                                            <Link
                                                                key={meal._id}
                                                                to={`/meal-details/${meal._id}`}
                                                                className="block hover:bg-gray-50 transition-colors"
                                                            >
                                                                <div className="p-4 flex items-start">
                                                                    <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden mr-4">
                                                                        <img
                                                                            src={meal.image}
                                                                            alt={meal.title}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <h4 className="font-medium text-gray-900">{meal.title}</h4>
                                                                        <p className="text-sm text-gray-500 line-clamp-1">
                                                                            {meal.description}
                                                                        </p>
                                                                        <div className="flex items-center justify-center mt-1">
                                                                            <div className="flex text-amber-400">
                                                                                {[...Array(5)].map((_, i) => (
                                                                                    <FaStar
                                                                                        key={i}
                                                                                        className={i < meal.rating ? "fill-current" : "fill-gray-300"}
                                                                                        size={12}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <span className="text-xs text-gray-500 ml-1">
                                                                                ({meal.reviewsCount} reviews)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="font-bold text-amber-600">${meal.price}</span>
                                                                        <span className="block text-xs text-gray-500">{meal.category}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Upcoming Meals Section */}
                                            {searchResults?.upcomingMeals?.length > 0 && (
                                                <div className="border-b border-gray-100">
                                                    <div className="flex items-center px-6 pt-4 pb-2 bg-gray-50">
                                                        <FaCalendarAlt className="text-blue-500 mr-2" />
                                                        <h3 className="font-semibold text-gray-700">Upcoming Meals</h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 divide-y divide-gray-100">
                                                        {searchResults.upcomingMeals.map((meal) => (
                                                            <Link
                                                                key={meal._id}
                                                                to={`/upcoming-meals/${meal._id}`}
                                                                className="block hover:bg-gray-50 transition-colors"
                                                            >
                                                                <div className="p-4 flex items-start">
                                                                    <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden mr-4">
                                                                        <img
                                                                            src={meal.image}
                                                                            alt={meal.title}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <h4 className="font-medium text-gray-900">{meal.title}</h4>
                                                                        <div className="flex items-center text-sm text-gray-500">
                                                                            <FaCalendarAlt className="mr-1" size={12} />
                                                                            {new Date(meal.date).toLocaleDateString()}
                                                                        </div>
                                                                        <div className="mt-1">
                                                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                                                {meal.type}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="font-bold text-blue-600">${meal.price}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Empty State */}
                                            {searchResults?.meals?.length === 0 &&
                                                searchResults?.upcomingMeals?.length === 0 && (
                                                    <div className="p-6 text-center text-gray-500">
                                                        No results found for "{search}"
                                                    </div>
                                                )}
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-white w-6" : "bg-white/50"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;