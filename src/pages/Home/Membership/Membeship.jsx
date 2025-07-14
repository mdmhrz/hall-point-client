import React from "react";
import { Link } from "react-router";
import { FaCheck, FaCrown, FaGem, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const packages = [
    {
        tier: "Silver",
        price: 9.99,
        icon: <FaStar className="text-slate-400" />,
        bg: "bg-gradient-to-br from-slate-50 to-slate-100",
        ring: "ring-slate-200",
        benefits: [
            "Standard meal access",
            "Weekly food ratings",
            "Basic support",
        ],
        color: "text-slate-600",
        highlight: false,
    },
    {
        tier: "Gold",
        price: 19.99,
        icon: <FaCrown className="text-yellow-500" />,
        bg: "bg-gradient-to-br from-amber-50 via-amber-50 to-white",
        ring: "ring-yellow-300",
        benefits: [
            "Priority meals",
            "Fast admin support",
            "Private review zone",
            "Event discounts",
        ],
        color: "text-amber-700",
        highlight: true,
    },
    {
        tier: "Platinum",
        price: 29.99,
        icon: <FaGem className="text-purple-500" />,
        bg: "bg-gradient-to-br from-purple-50 via-white to-white",
        ring: "ring-purple-400",
        benefits: [
            "All premium features",
            "Direct support access",
            "Free premium meals",
            "Featured user rewards",
            "Lifetime discount",
        ],
        color: "text-purple-800",
        highlight: false,
    },
];

const MembershipCard = ({ pkg, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className={`relative h-full ${pkg.highlight ? "lg:-mt-4" : ""}`}
        >
            {pkg.highlight && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10"
                >
                    POPULAR
                </motion.div>
            )}

            <div className={`h-full p-8 rounded-3xl shadow-xl ${pkg.bg} ring-1 ${pkg.ring} flex flex-col`}>
                <div className="flex justify-center mb-6">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className={`p-4 rounded-full ${pkg.highlight ? "bg-yellow-100" : "bg-white"} shadow-md`}
                    >
                        {React.cloneElement(pkg.icon, { size: 36 })}
                    </motion.div>
                </div>

                <motion.h3
                    className={`text-center text-2xl font-bold mb-2 ${pkg.color}`}
                    whileHover={{ scale: 1.05 }}
                >
                    {pkg.tier}
                </motion.h3>

                <motion.div
                    className={`text-center text-4xl font-extrabold mb-6 ${pkg.color}`}
                    initial={{ scale: 0.9 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    ${pkg.price}<span className="text-lg font-medium">/mo</span>
                </motion.div>

                <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.benefits.map((benefit, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ x: -20 }}
                            animate={inView ? { x: 0 } : {}}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="flex items-start gap-3"
                        >
                            <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                        </motion.li>
                    ))}
                </ul>

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto"
                >
                    <Link
                        to={`/checkout/${pkg.tier.toLowerCase()}`}
                        className={`block w-full py-3 px-6 rounded-full text-center font-bold shadow-md transition-all ${pkg.highlight
                            ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-yellow-200/50"
                            : "bg-white text-gray-800 ring-1 ring-gray-200 hover:bg-gray-50"
                            } ${pkg.tier === 'Platinum' && 'bg-gradient-to-r from-primary to-secondary text-white'}`}
                    >
                        Get Started
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Membership = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            {/* Luxury decorative elements */}
            <div className="absolute w-80 h-80 bg-purple-200/20 rounded-full blur-3xl -top-20 -left-20 -z-10"></div>
            <div className="absolute w-96 h-96 bg-amber-200/20 rounded-full blur-3xl bottom-0 right-0 -z-10"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5 -z-20"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-purple-600 mb-4">
                        Exclusive Memberships
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Elevate your dining experience with our premium membership tiers, designed to offer unparalleled access and benefits.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
                    {packages.map((pkg, index) => (
                        <MembershipCard key={pkg.tier} pkg={pkg} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 text-gray-500 text-sm"
                >
                    * All plans come with a 30-day money-back guarantee
                </motion.div>
            </div>
        </section>
    );
};

export default Membership;