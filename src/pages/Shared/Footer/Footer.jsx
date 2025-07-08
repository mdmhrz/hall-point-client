import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaLocationArrow,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content relative overflow-hidden pt-16 pb-10 px-6 md:px-16">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>

            {/* Blur Decoration */}
            <div className="absolute w-60 h-60 bg-primary/20 blur-3xl rounded-full -top-16 -left-10 -z-10"></div>
            <div className="absolute w-60 h-60 bg-secondary/30 blur-2xl rounded-full bottom-0 right-0 -z-10"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 z-10 relative">
                {/* About */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">HallPoint</h2>
                    <p className="text-gray-500">
                        HallPoint is your trusted hostel management platform. Manage meals,
                        share reviews, and stay connected effortlessly.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="text-primary hover:text-accent transition">
                            <FaFacebookF size={18} />
                        </a>
                        <a href="#" className="text-primary hover:text-accent transition">
                            <FaTwitter size={18} />
                        </a>
                        <a href="#" className="text-primary hover:text-accent transition">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" className="text-primary hover:text-accent transition">
                            <FaLinkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Quick Links</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>
                            <a href="/" className="hover:text-primary transition">Home</a>
                        </li>
                        <li>
                            <a href="/meals" className="hover:text-primary transition">Meals</a>
                        </li>
                        <li>
                            <a href="/upcoming-meals" className="hover:text-primary transition">Upcoming Meals</a>
                        </li>
                        <li>
                            <a href="/membership" className="hover:text-primary transition">Membership</a>
                        </li>
                        <li>
                            <a href="/dashboard" className="hover:text-primary transition">Dashboard</a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Contact Us</h2>
                    <ul className="space-y-4 text-gray-600 text-sm">
                        <li className="flex items-center gap-3">
                            <FaLocationArrow className="text-accent" />
                            University Hostel, Level 2, Dhaka, BD
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-accent" />
                            support@hallpoint.com
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhone className="text-accent" />
                            +880 1234 567890
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-14 text-center text-sm text-gray-500 border-t pt-6 border-gray-300">
                © {new Date().getFullYear()} HallPoint. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
