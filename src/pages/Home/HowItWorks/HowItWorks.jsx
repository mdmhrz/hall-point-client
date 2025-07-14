import { motion } from 'framer-motion';
import { FaSignInAlt, FaCrown, FaUtensils, FaHeart } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';

const steps = [
    {
        icon: <FaSignInAlt className="text-white text-xl" />,
        title: 'Log In to HallPoint',
        desc: 'Use your university credentials to securely access your dashboard.',
    },
    {
        icon: <FaCrown className="text-white text-xl" />,
        title: 'Purchase a Membership',
        desc: 'Choose from Silver, Gold, or Platinum tiers and unlock meal request features.',
    },
    {
        icon: <FaUtensils className="text-white text-xl" />,
        title: 'Request Meals You Love',
        desc: 'Browse the upcoming meals and send requests for your preferred dishes.',
    },
    {
        icon: <FaHeart className="text-white text-xl" />,
        title: 'Enjoy Daily Meals',
        desc: 'Receive your selected meals every day through our efficient hostel dining.',
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-base-300 py-20 px-6 md:px-12 lg:px-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">How HallPoint Works</h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
                We’ve designed HallPoint to make your hostel dining experience simple, flexible, and smart.
            </p>

            {/* Timeline */}
            <div className="relative border-l-4 border-primary/30 ml-4">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        className="relative pl-10 mb-12"
                    >
                        <div className="absolute -left-6 top-1">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                                {step.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Feedback Importance Block */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-24 bg-gradient-to-r from-purple-100 via-blue-50 to-white border-l-4 border-primary p-8 rounded-xl shadow-xl max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-4 mb-3">
                    <MdStarRate className="text-3xl text-yellow-500" />
                    <h4 className="text-2xl font-bold text-gray-800">Your Feedback Powers Our Menu</h4>
                </div>
                <p className="text-gray-700">
                    Every time you like or review a meal, it contributes to its popularity. When a dish earns over
                    <span className="text-primary font-semibold"> 10 positive ratings</span>, it gets promoted into the
                    <span className="font-semibold"> regular meal list</span> — making your choices a part of the future menu.
                </p>
                <p className="mt-2 text-gray-500 text-sm">
                    Your voice matters. Rate, review, and make an impact on the hostel dining experience.
                </p>
            </motion.div>
        </div>
    );
};

export default HowItWorks;
