import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle';

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        university: "University of Dhaka",
        year: "3rd Year, CSE",
        rating: 5,
        text: "HallPoint completely transformed my dining experience! No more waiting in long queues or eating meals I don't like. The meal request feature is a game-changer.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Frustrated with limited meal options → After: Enjoying personalized dining daily"
    },
    {
        id: 2,
        name: "Mohammad Rahman",
        university: "BUET",
        year: "4th Year, EEE",
        rating: 5,
        text: "The Gold membership is worth every penny! I love how my food preferences are remembered and how I can see which meals are trending among students.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Skipping meals frequently → After: Never missing a meal I love"
    },
    {
        id: 3,
        name: "Fatima Khan",
        university: "Chittagong University",
        year: "2nd Year, BBA",
        rating: 5,
        text: "Amazing platform! The meal rating system helped improve our hall's food quality dramatically. Now we actually look forward to dinner time!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Poor food quality complaints → After: 90% satisfaction rate in our hall"
    },
    {
        id: 4,
        name: "Rajesh Sharma",
        university: "Jahangirnagar University",
        year: "1st Year, Physics",
        rating: 4,
        text: "As a new student, HallPoint made adapting to hostel life so much easier. I can request familiar dishes and discover new favorites through recommendations.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Homesick and struggling with food → After: Feeling at home in the hostel"
    },
    {
        id: 5,
        name: "Ayesha Begum",
        university: "Rajshahi University",
        year: "3rd Year, English",
        rating: 5,
        text: "The Silver membership fits my budget perfectly. I love the notification system that reminds me about my requested meals. Never missed a favorite dish since!",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Missing favorite meals → After: Getting exactly what I want, when I want"
    },
    {
        id: 6,
        name: "Tanvir Hasan",
        university: "North South University",
        year: "4th Year, Business",
        rating: 5,
        text: "HallPoint's data-driven approach to dining is brilliant! Seeing meal popularity and reviews helps me make better choices. The Platinum perks are amazing.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Random meal choices → After: Data-informed dining decisions"
    },
    {
        id: 7,
        name: "Nusrat Jahan",
        university: "Shahjalal University",
        year: "2nd Year, Sociology",
        rating: 4,
        text: "Love how HallPoint brings our hostel community together! We discuss meal ratings and share food experiences. It's more than just a dining app.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Eating alone quietly → After: Active food community discussions"
    },
    {
        id: 8,
        name: "Arif Ahmed",
        university: "Islamic University",
        year: "3rd Year, Economics",
        rating: 5,
        text: "The meal request system is so intuitive! I requested biryani 5 times and it got added to our regular menu. Feeling heard as a student is priceless.",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: No voice in meal planning → After: Direct impact on menu decisions"
    },
    {
        id: 9,
        name: "Rashida Sultana",
        university: "Comilla University",
        year: "1st Year, Law",
        rating: 5,
        text: "HallPoint made my first year so much better! The app is user-friendly and customer support is excellent. They really care about student satisfaction.",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Struggling with hostel adjustment → After: Loving the complete dining experience"
    },
    {
        id: 10,
        name: "Kabir Hassan",
        university: "BRAC University",
        year: "4th Year, Computer Science",
        rating: 4,
        text: "As a tech student, I appreciate HallPoint's clean interface and smart features. The meal analytics and prediction system is impressive!",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Basic dining experience → After: Tech-enhanced smart dining"
    },
    {
        id: 11,
        name: "Sumaya Rahman",
        university: "American International University",
        year: "2nd Year, Marketing",
        rating: 5,
        text: "HallPoint's marketing is spot-on - they delivered exactly what they promised! The membership tiers are well-designed and offer real value.",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Skeptical about dining apps → After: HallPoint's biggest advocate"
    },
    {
        id: 12,
        name: "Imran Khan",
        university: "Daffodil International University",
        year: "3rd Year, Software Engineering",
        rating: 5,
        text: "The code quality of HallPoint is excellent! Smooth performance, no bugs, and regular updates. It's clear they have a great development team.",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
        beforeAfter: "Before: Buggy dining apps → After: Seamless, reliable platform experience"
    }
];

const StudentTestimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Auto-slide functionality
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const StarRating = ({ rating }) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-warning' : 'text-base-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-base-200 py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-accent/3 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                            Student Voices
                        </span>
                    </div>
                    <SectionTitle title={'What Students Say'} subTitle={'Join thousands of students who transformed their hostel dining experience with HallPoint'}></SectionTitle>

                </div>

                {/* Testimonial Slider */}
                <div className="relative">
                    {/* Main testimonial display */}
                    <div className="bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-3xl p-8 md:p-12 shadow-2xl mb-8 min-h-[400px] flex items-center">
                        <div className="w-full">
                            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                {/* Student Photo & Info */}
                                <div className="flex-shrink-0 text-center lg:text-left">
                                    <div className="relative inline-block mb-6">
                                        <img
                                            src={testimonials[currentSlide].avatar}
                                            alt={testimonials[currentSlide].name}
                                            className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover shadow-xl border-4 border-base-300"
                                        />
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-primary-content" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-base-content mb-2">
                                        {testimonials[currentSlide].name}
                                    </h3>
                                    <p className="text-base-content/60 mb-1">{testimonials[currentSlide].university}</p>
                                    <p className="text-sm text-base-content/50 mb-4">{testimonials[currentSlide].year}</p>
                                    <StarRating rating={testimonials[currentSlide].rating} />
                                </div>

                                {/* Testimonial Content */}
                                <div className="flex-1">
                                    {/* Quote */}
                                    <div className="relative mb-6">
                                        <svg className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z" />
                                        </svg>
                                        <p className="text-xl lg:text-2xl text-base-content leading-relaxed italic pl-6">
                                            "{testimonials[currentSlide].text}"
                                        </p>
                                    </div>

                                    {/* Before/After */}
                                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-2xl">
                                        <p className="text-sm text-base-content/70 font-medium">
                                            <span className="text-primary font-semibold">Impact:</span> {testimonials[currentSlide].beforeAfter}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between">
                        {/* Previous/Next Buttons */}
                        <button
                            onClick={prevSlide}
                            className="btn btn-circle btn-primary btn-lg shadow-lg hover:scale-110 transition-transform duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Slide Indicators */}
                        <div className="flex items-center gap-2 px-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? 'bg-primary scale-125'
                                        : 'bg-base-300 hover:bg-primary/50'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextSlide}
                            className="btn btn-circle btn-primary btn-lg shadow-lg hover:scale-110 transition-transform duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Play/Pause Button */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="btn btn-outline btn-primary btn-sm gap-2"
                        >
                            {isPlaying ? (
                                <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                    Pause
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                                    </svg>
                                    Play
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <div className="text-center bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300">
                        <div className="text-3xl lg:text-4xl font-black text-primary mb-2">12,000+</div>
                        <div className="text-sm text-base-content/60">Happy Students</div>
                    </div>
                    <div className="text-center bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300">
                        <div className="text-3xl lg:text-4xl font-black text-primary mb-2">4.8★</div>
                        <div className="text-sm text-base-content/60">Average Rating</div>
                    </div>
                    <div className="text-center bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300">
                        <div className="text-3xl lg:text-4xl font-black text-primary mb-2">50+</div>
                        <div className="text-sm text-base-content/60">Partner Hostels</div>
                    </div>
                    <div className="text-center bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300">
                        <div className="text-3xl lg:text-4xl font-black text-primary mb-2">95%</div>
                        <div className="text-sm text-base-content/60">Satisfaction Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentTestimonials;