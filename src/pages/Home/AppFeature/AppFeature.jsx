import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle';

const features = [
    {
        id: 1,
        title: "Smart Meal Browser",
        description: "Browse upcoming meals with detailed nutrition info, ingredients, and student ratings. Filter by dietary preferences and meal types.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        mockup: "browser",
        stats: { meals: "200+", filters: "15+", categories: "8" }
    },
    {
        id: 2,
        title: "One-Tap Meal Requests",
        description: "Request your favorite meals with a single tap. Set preferences, dietary restrictions, and get notified when requested meals are available.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        mockup: "requests",
        stats: { requests: "50K+", success: "89%", time: "< 2min" }
    },
    {
        id: 3,
        title: "Real-time Notifications",
        description: "Get instant notifications about meal availability, menu changes, special dishes, and membership benefits. Never miss your favorites again.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.97 4.97l2.83 2.83L16.17 5.5a2.5 2.5 0 000-3.54l-.01-.01a2.5 2.5 0 00-3.54 0l-2.3 2.3z" />
            </svg>
        ),
        mockup: "notifications",
        stats: { delivered: "99.9%", response: "< 30s", types: "12" }
    },
    {
        id: 4,
        title: "Interactive Rating System",
        description: "Rate and review meals, share photos, and read community feedback. Your ratings directly influence future menu planning.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
        mockup: "ratings",
        stats: { reviews: "25K+", photos: "8K+", impact: "70%" }
    },
    {
        id: 5,
        title: "Membership Dashboard",
        description: "Track your membership benefits, meal credits, request history, and exclusive perks. Upgrade or manage your plan seamlessly.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        mockup: "dashboard",
        stats: { members: "12K+", retention: "94%", savings: "₹500+" }
    },
    {
        id: 6,
        title: "Analytics & Insights",
        description: "View your dining patterns, favorite cuisines, nutrition tracking, and personalized meal recommendations based on your preferences.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        mockup: "analytics",
        stats: { insights: "20+", accuracy: "91%", trends: "Weekly" }
    }
];

const AppFeatures = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-cycle through features
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const MockupBrowser = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div className="flex-1 bg-base-200 rounded-full px-3 py-1 text-xs text-base-content/50">
                    Browse Meals
                </div>
            </div>
            <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-base-300 rounded-full mb-2"></div>
                            <div className="h-3 bg-base-300/50 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-primary">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MockupRequests = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <div className="text-center mb-4">
                <h4 className="font-bold text-base-content mb-2">Meal Requests</h4>
                <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm">Active: 5 requests</div>
            </div>
            <div className="space-y-3">
                {['Chicken Biryani', 'Beef Curry', 'Fish Fry'].map((meal, i) => (
                    <div key={meal} className="flex items-center justify-between p-3 bg-base-200 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm font-medium">{meal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-base-content/60">{3 - i} votes</span>
                            <button className="btn btn-xs btn-primary">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MockupNotifications = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-base-content">Notifications</h4>
                <div className="badge badge-primary badge-sm">3 new</div>
            </div>
            <div className="space-y-2">
                {[
                    { text: "Your requested Biryani is available today!", time: "2m ago", type: "success" },
                    { text: "New Italian menu added this week", time: "1h ago", type: "info" },
                    { text: "Rate yesterday's dinner experience", time: "1d ago", type: "warning" }
                ].map((notif, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${notif.type === 'success' ? 'bg-success/10' :
                        notif.type === 'info' ? 'bg-info/10' : 'bg-warning/10'
                        }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${notif.type === 'success' ? 'bg-success' :
                            notif.type === 'info' ? 'bg-info' : 'bg-warning'
                            }`}></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-base-content">{notif.text}</p>
                            <p className="text-xs text-base-content/50 mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MockupRatings = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <div className="text-center mb-4">
                <h4 className="font-bold text-base-content mb-2">Rate Your Meal</h4>
                <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                        <svg key={star} className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="space-y-3">
                <textarea className="textarea textarea-bordered w-full text-sm" rows="3" placeholder="Share your thoughts about today's meal..."></textarea>
                <div className="flex justify-between items-center">
                    <button className="btn btn-outline btn-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                        Add Photo
                    </button>
                    <button className="btn btn-primary btn-sm">Submit Review</button>
                </div>
            </div>
        </div>
    );

    const MockupDashboard = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="font-bold text-base-content">Gold Member</h4>
                    <p className="text-sm text-base-content/60">Sarah Ahmed</p>
                </div>
                <div className="badge badge-warning">GOLD</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-primary">15</div>
                    <div className="text-xs text-base-content/60">Requests Left</div>
                </div>
                <div className="bg-success/10 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-success">89%</div>
                    <div className="text-xs text-base-content/60">Success Rate</div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Membership expires</span>
                    <span className="text-primary font-medium">Dec 2024</span>
                </div>
                <button className="btn btn-primary btn-sm w-full">Upgrade to Platinum</button>
            </div>
        </div>
    );

    const MockupAnalytics = () => (
        <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-300">
            <h4 className="font-bold text-base-content mb-4">Your Dining Insights</h4>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Most Loved Cuisine</span>
                        <span className="font-medium">Bengali</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Weekly Meal Orders</span>
                        <span className="font-medium">18</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Satisfaction Score</span>
                        <span className="font-medium">4.8/5</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMockup = (type) => {
        switch (type) {
            case 'browser': return <MockupBrowser />;
            case 'requests': return <MockupRequests />;
            case 'notifications': return <MockupNotifications />;
            case 'ratings': return <MockupRatings />;
            case 'dashboard': return <MockupDashboard />;
            case 'analytics': return <MockupAnalytics />;
            default: return <MockupBrowser />;
        }
    };

    return (
        <div className="bg-base-300 py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-accent/3 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                            App Features
                        </span>
                    </div>
                    <SectionTitle title={'Everything You Need'} subTitle={'Discover powerful features designed to make your hostel dining experience seamless, smart, and satisfying'}></SectionTitle>
                </div>

                {/* Main Feature Display */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Feature Content */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-content shadow-lg">
                                    {features[activeFeature].icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">
                                        {features[activeFeature].title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {Object.entries(features[activeFeature].stats).map(([key, value]) => (
                                            <span key={key} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-base-content/70 text-lg leading-relaxed mb-8">
                                {features[activeFeature].description}
                            </p>

                            {/* Feature Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {Object.entries(features[activeFeature].stats).map(([key, value]) => (
                                    <div key={key} className="text-center bg-base-200/50 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                                        <div className="text-xs text-base-content/60 capitalize">{key}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Mockup */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div className="bg-base-100 rounded-[3rem] p-4 shadow-2xl border-8 border-base-300 mx-auto max-w-sm">
                                <div className="bg-base-200 rounded-[2.5rem] p-6 min-h-[500px]">
                                    {renderMockup(features[activeFeature].mockup)}
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-2xl blur-sm"></div>
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary/20 rounded-full blur-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Feature Navigation */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveFeature(index)}
                            className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 ${activeFeature === index
                                ? 'bg-primary text-primary-content border-primary shadow-lg scale-105'
                                : 'bg-base-100 text-base-content border-base-300 hover:border-primary/50 hover:shadow-md hover:scale-102'
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeFeature === index
                                    ? 'bg-primary-content/20'
                                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                                    }`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{feature.title}</h4>
                                </div>
                            </div>
                            <p className={`text-sm leading-relaxed ${activeFeature === index ? 'text-primary-content/80' : 'text-base-content/70'
                                }`}>
                                {feature.description.slice(0, 80)}...
                            </p>
                        </button>
                    ))}
                </div>

                {/* Auto-play Controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="btn btn-outline btn-primary gap-2"
                    >
                        {isAutoPlaying ? (
                            <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                                Pause Auto-Demo
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                                </svg>
                                Play Auto-Demo
                            </>
                        )}
                    </button>

                    {/* Progress Indicators */}
                    <div className="flex gap-2">
                        {features.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFeature === index ? 'bg-primary w-8' : 'bg-base-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-base-content mb-4">
                            Ready to Transform Your Dining Experience?
                        </h3>
                        <p className="text-base-content/70 mb-6">
                            Download HallPoint now and join thousands of students enjoying smarter, better hostel dining.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn btn-primary btn-lg gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                Download App
                            </button>
                            <button className="btn btn-outline btn-primary btn-lg">
                                View Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppFeatures;