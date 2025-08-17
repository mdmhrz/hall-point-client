import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import Lottie from 'lottie-react';
import errorAnim from '../../assets/404.json'

const Error = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 blur-xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent/5 blur-xl"
                />
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/5 blur-lg"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-2xl w-full"
            >
                {/* Main Error Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-base-100 border border-base-300/50 rounded-3xl shadow-2xl backdrop-blur-sm p-8 md:p-12 text-center relative overflow-hidden"
                >
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>

                    {/* Animated Lottie */}
                    <motion.div
                        variants={floatingVariants}
                        animate="animate"
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            <Lottie
                                animationData={errorAnim}
                                className='h-48 md:h-64 w-auto'
                            />
                            {/* Glowing effect behind animation */}
                            <div className="absolute inset-0 bg-error/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </motion.div>

                    {/* Error Code with Animation */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6"
                    >
                        <motion.h1
                            variants={pulseVariants}
                            animate="animate"
                            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-error via-error to-warning bg-clip-text text-transparent mb-2"
                        >
                            404
                        </motion.h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-error to-warning rounded-full mx-auto"></div>
                    </motion.div>

                    {/* Error Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-base-content mb-4"
                    >
                        Oops! Page Not Found
                    </motion.h2>

                    {/* Error Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base-content/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md mx-auto"
                    >
                        The page you're looking for seems to have wandered off into the digital void.
                        Don't worry, we'll help you find your way back!
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/"
                            className="group btn btn-primary btn-lg rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <FiHome className="text-xl group-hover:scale-110 transition-transform duration-200" />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="group btn btn-outline btn-lg rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-200" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Additional Help */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 pt-6 border-t border-base-300/50"
                    >
                        <p className="text-base-content/50 text-sm mb-4">
                            Still having trouble? Try these options:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="btn btn-ghost btn-sm rounded-xl gap-2"
                            >
                                <FiRefreshCw className="text-base" />
                                Refresh Page
                            </motion.button>

                            <Link
                                to="/contact"
                                className="btn btn-ghost btn-sm rounded-xl gap-2"
                            >
                                <FiAlertTriangle className="text-base" />
                                Report Issue
                            </Link>

                            <Link
                                to="/search"
                                className="btn btn-ghost btn-sm rounded-xl gap-2"
                            >
                                <FaSearch className="text-base" />
                                Search Site
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                
            </motion.div>
        </div>
    );
};

export default Error;