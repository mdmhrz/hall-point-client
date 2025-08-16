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
    FaCheckCircle
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
        { icon: <FaFacebookF />, color: "hover:bg-blue-600", label: "Facebook" },
        { icon: <FaTwitter />, color: "hover:bg-sky-500", label: "Twitter" },
        { icon: <FaInstagram />, color: "hover:bg-pink-600", label: "Instagram" },
        { icon: <FaLinkedin />, color: "hover:bg-blue-700", label: "LinkedIn" }
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
            bg: "bg-pink-50"
        },
        {
            name: "Bank Asia",
            logo: "/banks/net-banking/bankasia.png",
            bg: "bg-pink-50"
        },
        {
            name: "City Touch",
            logo: "/banks/net-banking/citytouch.png",
            bg: "bg-pink-50"
        },
        {
            name: "EBL",
            logo: "/banks/net-banking/eblsky.png",
            bg: "bg-pink-50"
        },
        {
            name: "FSIBL",
            logo: "/banks/net-banking/FsiblCloudLogo.png",
            bg: "bg-pink-50"
        },
        {
            name: "IBBL",
            logo: "/banks/net-banking/ibbl.png",
            bg: "bg-pink-50"
        },
        {
            name: "SB",
            logo: "/banks/net-banking/instapay.png",
            bg: "bg-pink-50"
        },
        {
            name: "Madhumati Bank",
            logo: "/banks/net-banking/modhumoti.png",
            bg: "bg-pink-50"
        },
        {
            name: "MTB",
            logo: "/banks/net-banking/mtbl.png",
            bg: "bg-pink-50"
        },
        {
            name: "PMONEY",
            logo: "/banks/net-banking/pmoney.png",
            bg: "bg-pink-50"
        },
        {
            name: "TouchNPay",
            logo: "/banks/net-banking/tapnpay.png",
            bg: "bg-pink-50"
        },
        {
            name: "Woori",
            logo: "/banks/net-banking/woori.png",
            bg: "bg-pink-50"
        },
        {
            name: "bKash",
            logo: "/banks/mobile-banking/bkash.png",
            bg: "bg-pink-50"
        },
        {
            name: "CellFin",
            logo: "/banks/mobile-banking/cellfin.png",
            bg: "bg-purple-50"
        },
        {
            name: "Rocket",
            logo: "/banks/mobile-banking/dbblmobilebank.png",
            bg: "bg-orange-50"
        },
        {
            name: "MCash",
            logo: "/banks/mobile-banking/ibblmobile.png",
            bg: "bg-blue-50"
        },
        {
            name: "OKWallet",
            logo: "/banks/mobile-banking/okwallet.png",
            bg: "bg-green-50"
        },
        {
            name: "TAP",
            logo: "/banks/mobile-banking/tap.png",
            bg: "bg-blue-50"
        },
        {
            name: "UPay",
            logo: "/banks/mobile-banking/upay.png",
            bg: "bg-blue-50"
        },
    ];

    const trustBadges = [
        { icon: <FaShieldAlt />, text: "SSL Secured", color: "text-green-400" },
        { icon: <FaCheckCircle />, text: "Verified", color: "text-blue-400" },
        { icon: <FaStar />, text: "Trusted", color: "text-yellow-400" }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Floating particles */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[size:50px_50px]"></div>
            </div>

            <div className="w-11/12 mx-auto relative z-10">
                {/* Main Footer Content */}
                <div className="pt-16 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Brand Section - Enhanced */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">H</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">HallPoint</h2>
                                    <p className="text-purple-400 text-sm">Hostel Management</p>
                                </div>
                            </motion.div>

                            <motion.p className="text-gray-400 leading-relaxed">
                                Revolutionizing hostel management with cutting-edge technology and seamless user experiences.
                                Trusted by thousands of students nationwide.
                            </motion.p>

                            {/* Enhanced Social Links */}
                            <div className="space-y-4">
                                <h4 className="text-white font-semibold">Follow Us</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            className={`w-11 h-11 rounded-xl bg-gray-800 ${social.color} border border-gray-700 hover:border-purple-500 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                                            title={social.label}
                                        >
                                            <span className="transform group-hover:scale-110 transition-transform duration-200">
                                                {social.icon}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:col-span-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {footerLinks.map((column, colIndex) => (
                                    <motion.div key={colIndex} className="space-y-4">
                                        <h3 className="text-lg font-bold text-white relative">
                                            {column.title}
                                            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                        </h3>
                                        <ul className="space-y-3">
                                            {column.links.map((link, linkIndex) => (
                                                <motion.li key={linkIndex}>
                                                    <Link
                                                        to={column.path[linkIndex]}
                                                        className="text-gray-400 hover:text-purple-400 transition-all duration-200 flex items-center gap-2 group hover:pl-2"
                                                    >
                                                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                                                        {link}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="lg:col-span-3 space-y-6">
                            <h3 className="text-lg font-bold text-white relative">
                                Get in Touch
                                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                            </h3>

                            <div className="space-y-4">
                                <motion.div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                                        <FaMapMarkerAlt className="text-purple-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            University Hostel, Level 2<br />
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                                        <FaEnvelope className="text-blue-400 text-sm" />
                                    </div>
                                    <a href="mailto:support@hallpoint.com" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                        support@hallpoint.com
                                    </a>
                                </motion.div>

                                <motion.div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                                        <FaPhone className="text-green-400 text-sm" />
                                    </div>
                                    <a href="tel:+8801234567890" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                                        +880 1234 567890
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods Section */}
                <div className="py-12 border-t border-gray-700/50">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-3">Secure Payment Methods</h3>
                        <p className="text-gray-400">We accept payments through trusted providers</p>
                    </div>

                    {/* TYpe of provider */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Powered by Stripe</h4>
                                    <p className="text-gray-400 text-sm">International payments</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <FaShieldAlt className="text-white text-lg" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">SSL Commerz</h4>
                                    <p className="text-gray-400 text-sm">Local & mobile banking</p>
                                </div>
                            </div>
                        </div>
                        {/* Payment Providers */}
                        <div className="md:col-span-2 lg:col-span-3">
                            {/* SSL Commerz Section */}
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                                {/* Providers */}
                                <div>
                                    <div className="flex items-center justify-center md:justify-start flex-wrap gap-2">
                                        {stripePayments.map((payment, index) => (
                                            <div key={index} className={`${payment.bg} rounded-lg p-1 border border-gray-200/20 hover:scale-105 transition-transform duration-200 group`}>
                                                <img
                                                    src={payment.logo}
                                                    alt={payment.name}
                                                    className="w-8 md:w-10 h-6 md:h-8 object-contain group-hover:scale-110 transition-transform duration-200"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <div className="text-center text-gray-800 font-semibold text-xs mt-1 hidden">
                                                    {payment.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Enhanced Bottom Bar */}
                <motion.div className="py-6 border-t border-gray-700/50">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <div className="flex items-center gap-2">
                                <FaShieldAlt className="text-green-400" />
                                <span>256-bit SSL Encryption</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <FaGlobe className="text-blue-400" />
                                <span>Global Payments</span>
                            </div>
                        </div>

                        <div className="text-center lg:text-right">
                            <div className="text-gray-400 text-sm mb-1">
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