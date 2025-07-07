import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { FaSearch } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
    {
        title: "Welcome to HallPoint",
        description: "Manage your hostel meals and reviews effortlessly.",
        bg: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?auto=format&fit=crop&w=1500&q=80",
    },
    {
        title: "Simple, Smart, Secure",
        description: "A seamless hostel experience for students and admins.",
        bg: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1500&q=80",
    },
    {
        title: "Your Meal. Your Review.",
        description: "Rate, review, and explore meals inside the hostel.",
        bg: "https://images.unsplash.com/photo-1565190725616-62e0f3e69ddb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const Banner = () => {
    const [search, setSearch] = useState("");
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <div className="relative w-full h-[80vh]">
            {/* Background Swiper */}
            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000 }}
                loop
                onSlideChange={({ realIndex }) => setActiveSlide(realIndex)}
                className="w-full h-full"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.bg})`,
                            }}
                        >
                            <div className="w-full h-full bg-black/60" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md mb-4">
                    {slides[activeSlide].title}
                </h1>
                <p className="text-lg md:text-xl drop-shadow-sm mb-8 max-w-2xl">
                    {slides[activeSlide].description}
                </p>

                {/* Search Box (Persistent) */}
                <div className="w-full max-w-md flex bg-white rounded-full shadow-lg overflow-hidden">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search meals or reviews..."
                        className="flex-grow px-4 py-2 text-gray-700 outline-none"
                    />
                    <button className="btn btn-primary rounded-none rounded-r-full px-6">
                        <FaSearch className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
