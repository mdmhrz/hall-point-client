import React from 'react';
import SectionTitle from '../../../components/SectionTitle';

const steps = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
        ),
        title: 'Log In to HallPoint',
        desc: 'Use your university credentials to securely access your personalized dashboard.',
        delay: 0.1
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
        title: 'Purchase a Membership',
        desc: 'Choose from Silver, Gold, or Platinum tiers and unlock premium meal request features.',
        delay: 0.2
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        title: 'Request Meals You Love',
        desc: 'Browse upcoming meals and send requests for your preferred dishes with ease.',
        delay: 0.3
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        title: 'Enjoy Daily Meals',
        desc: 'Receive your selected meals every day through our efficient hostel dining system.',
        delay: 0.4
    },
];

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-base-200 py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <SectionTitle title={'How HallPoint Works'} subTitle={`Experience a revolutionary approach to hostel dining that's simple, smart, and tailored just for you`}></SectionTitle>

                </div>

                {/* Steps Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-24">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`group relative bg-base-100/70 backdrop-blur-xl border border-base-300 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]`}
                            style={{
                                animationDelay: `${step.delay}s`,
                                animation: 'slideInUp 0.8s ease-out forwards'
                            }}
                        >
                            {/* Step number */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-neutral text-neutral-content rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:rotate-12 transition-transform duration-300">
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-accent' : 'bg-info'} flex items-center justify-center text-base-100 mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-base-content mb-4 group-hover:text-primary transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-base-content/70 text-lg leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="absolute bottom-4 right-8 w-2 h-2 bg-primary rounded-full group-hover:scale-150 group-hover:bg-secondary transition-all duration-300"></div>
                            <div className="absolute bottom-8 right-4 w-1 h-1 bg-accent rounded-full group-hover:scale-200 group-hover:bg-info transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Connecting Flow Visualization */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-primary/20"></div>

                {/* Feedback Section */}
                <div className="relative">
                    <div className="bg-base-100/60 backdrop-blur-xl border border-base-300 rounded-3xl p-10 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                        {/* Decorative top border */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-primary rounded-full"></div>

                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Icon section */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-warning rounded-3xl flex items-center justify-center shadow-xl transform hover:rotate-12 transition-transform duration-300">
                                    <svg className="w-10 h-10 text-warning-content" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <h4 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                    Your Voice Shapes Tomorrow's Menu
                                </h4>
                                <p className="text-base-content/80 text-lg leading-relaxed mb-4">
                                    Every rating and review you share helps build the future of hostel dining. When a dish receives
                                    <span className="inline-block mx-2 px-3 py-1 bg-primary text-primary-content text-sm font-semibold rounded-full shadow-md transform hover:scale-110 transition-transform duration-200">
                                        10+ positive ratings
                                    </span>
                                    it earns a permanent spot in our regular rotation.
                                </p>
                                <p className="text-base-content/60 text-base">
                                    Join thousands of students making dining better, one review at a time.
                                </p>
                            </div>
                        </div>

                        {/* Bottom decorative elements */}
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-8 right-8 w-8 h-8 bg-secondary/20 rounded-full blur-lg"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default HowItWorks;