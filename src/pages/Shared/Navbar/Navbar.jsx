import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaBell, FaSignOutAlt, FaTachometerAlt, FaUserCircle, FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userModalOpen, setUserModalOpen] = useState(false);

    const links = [
        { path: "/", label: "Home" },
        { path: "/meals", label: "Meals" },
        { path: "/upcoming-meals", label: "Upcoming Meals" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-xl shadow-2xl',
                confirmButton: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
                cancelButton: 'bg-gray-200 hover:bg-gray-300'
            }
        }).then(result => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        setUserModalOpen(false);
                    })
                    .catch(error => {
                        console.error('Logout error:', error);
                    });
            }
        });
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg py-2" : "bg-primary/95 backdrop-blur-md py-3"}`}>
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <Link to="/" className="flex items-center">
                            <span className="text-3xl font-bold text-white">
                                HallPoint
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-1 py-2 text-md font-medium transition-colors ${isActive ? "text-secondary underline underline-offset-10  " : "text-white hover:text-purple-500"}`
                                }
                            >
                                {link.label}
                                {({ isActive }) => isActive && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center text-white space-x-4">
                        {/* Notification */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 rounded-full bg-gray-800 hover:text-gray-800 hover:bg-purple-50 transition-colors"
                        >
                            <FaBell className="w-5 h-5 text-gray-200 hover:text-gray-800" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
                        </motion.button>

                        {/* Auth */}
                        {!user ? (
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    to="/auth/register"
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    Join Us
                                </Link>
                            </motion.div>
                        ) : (
                            <>
                                {/* User Avatar */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUserModalOpen(true)}
                                    className="relative focus:outline-none"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
                                        <img
                                            src={user?.photoURL || "https://via.placeholder.com/40"}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.button>

                                {/* User Modal */}
                                <AnimatePresence>
                                    {userModalOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 bg-black/30 z-40"
                                                onClick={() => setUserModalOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                className="fixed right-4 top-20 md:right-8 z-50 w-72 bg-white rounded-xl shadow-2xl overflow-hidden"
                                            >
                                                {/* User Info */}
                                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                                                            <img
                                                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                                                alt="User"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 truncate">
                                                                {user?.displayName || "User"}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                {user?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="p-2">
                                                    <Link
                                                        to="/dashboard"
                                                        onClick={() => setUserModalOpen(false)}
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                                                    >
                                                        <FaTachometerAlt className="mr-3 text-purple-600" />
                                                        <span>Dashboard</span>
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <FaSignOutAlt className="mr-3" />
                                                        <span>Logout</span>
                                                    </button>
                                                </div>

                                                {/* Close Button */}
                                                <button
                                                    onClick={() => setUserModalOpen(false)}
                                                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-gray-100 transition-colors"
                                                >
                                                    <FaTimes className="w-4 h-4 text-gray-500" />
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-secondary focus:outline-none"
                        >
                            <FiMenu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 h-screen z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50" // ← changed absolute → fixed
                        >
                            <div className="flex justify-between items-center p-4 border-b">
                                <span className="text-xl font-bold text-primary">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <FaTimes className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <nav className="p-4 bg-base-200 h-screen">
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.path}>
                                            <NavLink
                                                to={link.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `block px-4 py-3 rounded-lg ${isActive ? "bg-purple-50 text-purple-600" : "text-gray-700 hover:bg-primary hover:text-white"}`
                                                }
                                            >
                                                {link.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                    {user && (
                                        <>
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </header>
    );
};

export default Navbar;