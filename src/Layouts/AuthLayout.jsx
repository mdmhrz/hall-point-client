import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiShield, FiUser, FiLock } from 'react-icons/fi';
import logo from '../assets/logos/color-logo.svg';

const AuthLayout = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login');
    const isRegister = location.pathname.includes('register');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-base-100 text-base-content">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/hostel.png')`,
                        filter: 'brightness(0.4) blur(1px)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-base-300/60 via-base-200/50 to-base-300/70" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-base-content/20 rounded-full"
                        animate={{ x: [0, 100, 0], y: [0, -100, 0], opacity: [0, 1, 0] }}
                        transition={{
                            duration: 6 + i,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: 'easeInOut',
                        }}
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + i * 10}%`,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-20 bg-base-100/10 backdrop-blur-lg border-b border-base-content/20"
            >
                <div className="w-11/12 mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                            <Link to="/" className="flex items-center">
                                <img className="w-32 md:w-40 h-auto drop-shadow-lg" src={logo} alt="Logo" />
                            </Link>
                        </motion.div>

                        {/* Back Button */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-4 py-2 bg-base-100/20 hover:bg-base-100/30 backdrop-blur-md rounded-xl text-base-content border border-base-content/30 hover:border-base-content/50 transition-all duration-300"
                            >
                                <FiArrowLeft className="text-lg" />
                                <span className="hidden sm:inline font-medium">Back to Home</span>
                                <FiHome className="sm:hidden text-lg" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 flex items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-8"
            >
                <div className="w-full max-w-lg lg:max-w-xl p-6 md:p-8">
                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-3xl blur opacity-75" />

                        {/* Main card */}
                        <div className="relative bg-base-300 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-content/20 p-8">
                            {/* Header Icon & Title */}
                            <motion.div variants={itemVariants} className="text-center mb-8">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg"
                                >
                                    {isLogin ? (
                                        <FiUser className="text-3xl text-primary-content" />
                                    ) : isRegister ? (
                                        <FiShield className="text-3xl text-primary-content" />
                                    ) : (
                                        <FiLock className="text-3xl text-primary-content" />
                                    )}
                                </motion.div>

                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    {isLogin ? 'Welcome Back' : isRegister ? 'Get Started' : 'Authentication'}
                                </h1>

                                <p className="text-base leading-relaxed">
                                    {isLogin
                                        ? 'Sign in to continue your journey with us'
                                        : isRegister
                                            ? 'Create your account and join our community'
                                            : 'Secure access to your account'}
                                </p>
                            </motion.div>

                            {/* Auth Form */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <Outlet />
                            </motion.div>

                            {/* Footer Links */}
                            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-base-content/20 text-center">
                                <p className="text-xs leading-relaxed opacity-80">
                                    By continuing, you agree to our{' '}
                                    <Link
                                        to="/terms"
                                        className="text-primary hover:text-primary-focus font-medium underline underline-offset-4"
                                    >
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        to="/privacy"
                                        className="text-primary hover:text-primary-focus font-medium underline underline-offset-4"
                                    >
                                        Privacy Policy
                                    </Link>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex justify-center items-center gap-6 mt-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 bg-base-100/20 backdrop-blur-md rounded-xl px-4 py-3 border border-base-content/30 text-base-content shadow-lg"
                        >
                            <FiShield className="text-lg text-success" />
                            <span className="text-sm font-medium">SSL Secured</span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 bg-base-100/20 backdrop-blur-md rounded-xl px-4 py-3 border border-base-content/30 text-base-content shadow-lg"
                        >
                            <FiUser className="text-lg text-info" />
                            <span className="text-sm font-medium">1000+ Users</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none z-10" />
            <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-2xl pointer-events-none z-10" />
        </div>
    );
};

export default AuthLayout;
