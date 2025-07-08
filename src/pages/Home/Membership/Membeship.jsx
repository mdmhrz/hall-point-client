import React from "react";
import { useNavigate } from "react-router";
import { FaCheck, FaCrown, FaGem, FaStar } from "react-icons/fa";

const packages = [
    {
        tier: "Silver",
        price: 9.99,
        icon: <FaStar size={36} className="text-slate-500" />,
        bg: "bg-gradient-to-br from-white to-slate-100",
        ring: "ring-slate-300",
        benefits: [
            "Standard meal access",
            "Weekly food ratings",
            "Basic support",
        ],
        color: "text-slate-700",
    },
    {
        tier: "Gold",
        price: 19.99,
        icon: <FaCrown size={36} className="text-yellow-500" />,
        bg: "bg-gradient-to-br from-yellow-100 to-white",
        ring: "ring-yellow-300",
        benefits: [
            "Priority meals",
            "Fast admin support",
            "Private review zone",
            "Event discounts",
        ],
        color: "text-yellow-800",
    },
    {
        tier: "Platinum",
        price: 29.99,
        icon: <FaGem size={36} className="text-purple-600" />,
        bg: "bg-gradient-to-br from-purple-100 to-white",
        ring: "ring-purple-400",
        benefits: [
            "All premium features",
            "Direct support access",
            "Free premium meals",
            "Featured user rewards",
            "Lifetime discount",
        ],
        color: "text-purple-800",
    },
];

const Membership = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 px-6 md:px-12 bg-base-100 relative overflow-hidden">
            {/* Decorative blur elements */}
            <div className="absolute w-72 h-72 bg-purple-300/30 rounded-full blur-3xl top-10 left-10 -z-10"></div>
            <div className="absolute w-72 h-72 bg-yellow-300/20 rounded-full blur-2xl bottom-10 right-10 -z-10"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-sm">
                    Membership Packages
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                    Upgrade to experience HallPoint at its best — with exclusive access and benefits.
                </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {packages.map((pkg) => (
                    <div
                        key={pkg.tier}
                        className={`group p-6 relative rounded-3xl shadow-xl ring-2 ${pkg.ring} ${pkg.bg} transition-transform hover:-translate-y-2`}
                    >
                        {/* Tier Badge */}
                        <div className="absolute top-0 right-0 m-4 text-sm px-3 py-1 rounded-full bg-black/10 font-semibold uppercase tracking-wider backdrop-blur-md">
                            {pkg.tier}
                        </div>

                        {/* Icon */}
                        <div className="flex justify-center items-center mb-5">{pkg.icon}</div>

                        {/* Price */}
                        <div className={`text-center mb-2 text-3xl font-bold ${pkg.color}`}>
                            ${pkg.price}/mo
                        </div>

                        {/* Title */}
                        <h3 className="text-center text-xl font-semibold mb-5">
                            {pkg.tier} Membership
                        </h3>

                        {/* Features */}
                        <ul className="space-y-3 text-sm mb-8 px-4">
                            {pkg.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <FaCheck className="text-green-500 mt-1" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <button
                            onClick={() => navigate(`/checkout/${pkg.tier.toLowerCase()}`)}
                            className="btn btn-primary rounded-full btn-sm w-full"
                        >
                            Get {pkg.tier} Membership
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Membership;
