import React from "react";
import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaRocket,
    FaShieldAlt,
    FaHeart
} from "react-icons/fa";
import logo from '../../../assets/logos/color-logo.svg'
import { Link } from "react-router";

const Footer = () => {
    const socialLinks = [
        { icon: <FaFacebookF />, color: "bg-blue-600" },
        { icon: <FaTwitter />, color: "bg-sky-500" },
        { icon: <FaInstagram />, color: "bg-pink-600" },
        { icon: <FaLinkedin />, color: "bg-blue-700" }
    ];

    const footerLinks = [
        { title: "Company", links: ["Home", "Meals", "Upcoming Meals", "Membeship"], path: ["/", "/meals", "/upcoming-meals", "/"] },
        { title: "Product", links: ["Dashboard", "My Profile", "My Reviews", "My Requests"], path: ["/dashboard", "dashboard/my-profile", "/dashboard/my-reviews", "/dashboard/requested-meals"] }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 overflow-hidden pt-20 pb-12">
            {/* Floating elements */}
            <div className="w-11/12 mx-auto">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute w-4 h-4 rounded-full bg-purple-500/30 top-1/4 left-10"
                    />
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                        className="absolute w-6 h-6 rounded-full bg-blue-500/20 top-1/3 right-20"
                    />
                    <motion.div
                        animate={{ y: [0, 25, 0] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                        className="absolute w-3 h-3 rounded-full bg-emerald-400/20 bottom-1/4 left-1/3"
                    />
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                    {/* Brand column */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            <img className="w-40" src={logo} alt="HallPoint Logo" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-400"
                        >
                            Revolutionizing hostel management with cutting-edge technology and seamless user experiences.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-4"
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    href="#"
                                    className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all`}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Links columns */}
                    {footerLinks.map((column, colIndex) => (
                        <motion.div
                            key={colIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                            <ul className="space-y-3">
                                {column.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={linkIndex}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Link
                                            to={column.path[linkIndex]}
                                            className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Contact column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="space-y-4">
                            <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-purple-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">University Hostel, Level 2, Dhaka, BD</span>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3">
                                <FaEnvelope className="text-purple-500" />
                                <a href="mailto:support@hallpoint.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    support@hallpoint.com
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3">
                                <FaPhone className="text-purple-500" />
                                <a href="tel:+8801234567890" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    +880 1234 567890
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>

                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-gray-500 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaShieldAlt className="text-purple-500" />
                        <span>Secured with SSL Encryption</span>
                    </div>

                    <div className="text-gray-500 text-sm flex items-center gap-1">
                        <span>Made with</span>
                        <FaHeart className="text-pink-500" />
                        <span>in Bangladesh</span>
                    </div>

                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} HallPoint. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;