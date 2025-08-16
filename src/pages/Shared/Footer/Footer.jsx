import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaCreditCard,
    FaMobileAlt,
    FaUniversity,
    FaGlobe,
    FaHeart,
    FaStar,
    FaCheckCircle,
    FaAward,
    FaLock
} from "react-icons/fa";
import { Link } from "react-router";

// Mock framer-motion for demonstration
const motion = {
    div: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
    p: ({ children, className, ...props }) => <p className={className} {...props}>{children}</p>,
    a: ({ children, className, ...props }) => <a className={className} {...props}>{children}</a>,
    li: ({ children, className, ...props }) => <li className={className} {...props}>{children}</li>
};

const Footer = () => {
    const socialLinks = [
        { icon: <FaFacebookF />, color: "hover:bg-blue-600", label: "Facebook", url: "#" },
        { icon: <FaTwitter />, color: "hover:bg-sky-500", label: "Twitter", url: "#" },
        { icon: <FaInstagram />, color: "hover:bg-pink-600", label: "Instagram", url: "#" },
        { icon: <FaLinkedin />, color: "hover:bg-blue-700", label: "LinkedIn", url: "#" }
    ];

    const footerLinks = [
        { title: "Company", links: ["Home", "Meals", "Upcoming Meals", "Membership"], path: ["/", "/meals", "/upcoming-meals", "/"] },
        { title: "Product", links: ["Dashboard", "My Profile", "My Reviews", "My Requests"], path: ["/dashboard", "dashboard/my-profile", "/dashboard/my-reviews", "/dashboard/requested-meals"] }
    ];

    // Payment methods supported by Stripe and SSL Commerz
    const stripePayments = [
        {
            name: "Visa",
            logo: "/banks/international/visa.png",
            bg: "bg-white"
        },
        {
            name: "Mastercard",
            logo: "/banks/international/mastercard.png",
            bg: "bg-white"
        },
        {
            name: "American Express",
            logo: "/banks/international/american-express.png",
            bg: "bg-white"
        },
        {
            name: "Discover",
            logo: "/banks/international/discover.png",
            bg: "bg-white"
        },
        {
            name: "Fast Cash",
            logo: "/banks/international/fastcash.png",
            bg: "bg-white"
        },
        {
            name: "QCash",
            logo: "/banks/international/qcash.png",
            bg: "bg-white"
        },
        {
            name: "AB Bank",
            logo: "/banks/net-banking/abbank.png",
            bg: "bg-white"
        },
        {
            name: "Bank Asia",
            logo: "/banks/net-banking/bankasia.png",
            bg: "bg-white"
        },
        {
            name: "City Touch",
            logo: "/banks/net-banking/citytouch.png",
            bg: "bg-white"
        },
        {
            name: "EBL",
            logo: "/banks/net-banking/eblsky.png",
            bg: "bg-white"
        },
        {
            name: "FSIBL",
            logo: "/banks/net-banking/FsiblCloudLogo.png",
            bg: "bg-white"
        },
        {
            name: "IBBL",
            logo: "/banks/net-banking/ibbl.png",
            bg: "bg-white"
        },
        {
            name: "SB",
            logo: "/banks/net-banking/instapay.png",
            bg: "bg-white"
        },
        {
            name: "Madhumati Bank",
            logo: "/banks/net-banking/modhumoti.png",
            bg: "bg-white"
        },
        {
            name: "MTB",
            logo: "/banks/net-banking/mtbl.png",
            bg: "bg-white"
        },
        {
            name: "PMONEY",
            logo: "/banks/net-banking/pmoney.png",
            bg: "bg-white"
        },
        {
            name: "TouchNPay",
            logo: "/banks/net-banking/tapnpay.png",
            bg: "bg-white"
        },
        {
            name: "Woori",
            logo: "/banks/net-banking/woori.png",
            bg: "bg-white"
        },
        {
            name: "bKash",
            logo: "/banks/mobile-banking/bkash.png",
            bg: "bg-white"
        },
        {
            name: "CellFin",
            logo: "/banks/mobile-banking/cellfin.png",
            bg: "bg-white"
        },
        {
            name: "Rocket",
            logo: "/banks/mobile-banking/dbblmobilebank.png",
            bg: "bg-white"
        },
        {
            name: "MCash",
            logo: "/banks/mobile-banking/ibblmobile.png",
            bg: "bg-white"
        },
        {
            name: "OKWallet",
            logo: "/banks/mobile-banking/okwallet.png",
            bg: "bg-white"
        },
        {
            name: "TAP",
            logo: "/banks/mobile-banking/tap.png",
            bg: "bg-white"
        },
        {
            name: "UPay",
            logo: "/banks/mobile-banking/upay.png",
            bg: "bg-white"
        },
    ];

    const trustBadges = [
        { icon: <FaShieldAlt />, text: "SSL Secured", color: "text-green-400" },
        { icon: <FaAward />, text: "Certified", color: "text-yellow-400" },
        { icon: <FaCheckCircle />, text: "Verified", color: "text-blue-400" }
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Ultra Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
                {/* Animated mesh gradient */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-teal-600/20 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-pink-600/10 via-indigo-600/10 to-cyan-600/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Premium floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Sophisticated grid pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:40px_40px]"></div>

                {/* Premium sparkles */}
                <div className="absolute top-20 left-20 w-1 h-1 bg-white/50 rounded-full animate-ping"></div>
                <div className="absolute top-32 right-32 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="w-11/12 mx-auto relative z-10 text-gray-100">
                {/* Main Footer Content */}
                <div className="pt-20 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Enhanced Brand Section */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 transform group-hover:scale-105">
                                            <span className="text-white font-black text-2xl">H</span>
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-white tracking-tight">HallPoint</h2>
                                        <p className="text-purple-300 font-semibold">Premium Hostel Management</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Revolutionizing hostel management with cutting-edge technology and seamless user experiences.
                                </p>
                                <p className="text-purple-300 font-medium">
                                    Trusted by <span className="text-white font-bold">10,000+</span> students nationwide
                                </p>
                            </motion.div>

                            {/* Premium Social Links */}
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                    <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                    Connect With Us
                                </h4>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.url}
                                            className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 ${social.color} border border-gray-700/50 hover:border-purple-500/50 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-xl group overflow-hidden`}
                                            title={social.label}
                                        >
                                            <span className="transform group-hover:scale-125 transition-transform duration-300 relative z-10">
                                                {social.icon}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Links Sections */}
                        <div className="lg:col-span-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                {footerLinks.map((column, colIndex) => (
                                    <motion.div key={colIndex} className="space-y-6">
                                        <h3 className="text-xl font-bold text-white relative pb-3">
                                            {column.title}
                                            <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                            <div className="absolute bottom-0 left-0 w-6 h-1 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                                        </h3>
                                        <ul className="space-y-4">
                                            {column.links.map((link, linkIndex) => (
                                                <motion.li key={linkIndex}>
                                                    <Link
                                                        to={column.path[linkIndex]}
                                                        className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-3 group hover:pl-4 text-lg"
                                                    >
                                                        <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
                                                        <span className="relative">
                                                            {link}
                                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                                                        </span>
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Premium Contact Section */}
                        <div className="lg:col-span-3 space-y-8">
                            <h3 className="text-xl font-bold text-white relative pb-3">
                                Get in Touch
                                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-1 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { icon: <FaMapMarkerAlt />, color: "purple", content: "University Hostel, Level 2\nDhaka, Bangladesh", type: "text" },
                                    { icon: <FaEnvelope />, color: "blue", content: "support@hallpoint.com", type: "email" },
                                    { icon: <FaPhone />, color: "green", content: "+880 1234 567890", type: "phone" }
                                ].map((contact, index) => (
                                    <motion.div key={index} className="group">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${contact.color}-500/20 to-${contact.color}-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                <span className={`text-${contact.color}-400 text-lg`}>
                                                    {contact.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                {contact.type === "text" ? (
                                                    <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                                                        {contact.content}
                                                    </p>
                                                ) : (
                                                    <a
                                                        href={contact.type === "email" ? `mailto:${contact.content}` : `tel:${contact.content}`}
                                                        className={`text-gray-200 hover:text-${contact.color}-300 transition-colors duration-300 font-medium`}
                                                    >
                                                        {contact.content}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Payment Methods Section */}
                <div className="py-16 border-t border-gray-700/30">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-8 py-3 rounded-full border border-purple-500/20 mb-6">
                            <FaLock className="text-purple-400" />
                            <span className="text-purple-300 font-semibold">Secure Payments</span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Premium Payment Methods</h3>
                        <p className="text-gray-300 text-lg">We accept all major payment providers for your convenience</p>
                    </div>

                    {/* Enhanced Payment Providers Layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
                        {/* Provider Info */}
                        <div className="xl:col-span-1 space-y-6">
                            {/* Stripe */}
                            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-xl">S</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Stripe</h4>
                                        <p className="text-gray-400 text-sm">International Gateway</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm">Global payment processing with enterprise-grade security</p>
                            </div>

                            {/* SSL Commerz */}
                            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FaShieldAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">SSL Commerz</h4>
                                        <p className="text-gray-400 text-sm">Local Gateway</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm">Bangladesh's leading payment gateway for local banking</p>
                            </div>
                        </div>

                        {/* Payment Methods Grid */}
                        <div className="xl:col-span-3">
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl p-8 border border-gray-600/30 backdrop-blur-sm">
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
                                    {stripePayments.map((payment, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                            title={payment.name}
                                        >
                                            <div className={`${payment.bg} rounded-xl p-2 border border-gray-200/20 hover:border-purple-400/50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-purple-500/20 relative overflow-hidden`}>
                                                <img
                                                    src={payment.logo}
                                                    alt={payment.name}
                                                    className="w-full h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <div className="text-center text-gray-800 font-semibold text-xs mt-1 hidden">
                                                    {payment.name}
                                                </div>
                                                {/* Hover glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Trust Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {trustBadges.map((badge, index) => (
                            <div key={index} className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-gray-600/30 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className={badge.color + " text-xl"}>
                                        {badge.icon}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">{badge.text}</p>
                                    <p className="text-gray-400 text-sm">Enterprise Grade</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ultra Premium Bottom Bar */}
                <motion.div className="py-8 border-t border-gray-700/30">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-400">
                            <div className="flex items-center gap-3">
                                <FaShieldAlt className="text-green-400 text-lg" />
                                <span className="font-medium">256-bit SSL Encryption</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="flex items-center gap-3">
                                <FaGlobe className="text-blue-400 text-lg" />
                                <span className="font-medium">Global Payments</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="flex items-center gap-3">
                                <FaAward className="text-yellow-400 text-lg" />
                                <span className="font-medium">PCI DSS Certified</span>
                            </div>
                        </div>

                        <div className="text-center lg:text-right space-y-2">
                            <div className="text-gray-300 font-medium">
                                © {new Date().getFullYear()} HallPoint. All rights reserved.
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;