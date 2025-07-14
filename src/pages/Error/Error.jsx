import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import errorAnim from '../../assets/404.json'

const Error = () => {
    return (
        <div className="min-h-screen bg-base-300 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 40, x: 50 }}
                animate={{ opacity: 1, y: 0, x: 0, }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 max-h-[60vh] max-w-xl w-full text-center "
            >
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-error text-center text-7xl mb-4 flex items-center justify-center"
                >
                    <Lottie animationData={errorAnim} className='h-40 md:h-60'></Lottie>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl font-semibold text-red-600 mt-2"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-400 mt-4 text-sm md:text-base"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-8"
                >
                    <Link
                        to="/"
                        className="btn btn-primary px-6 py-2 rounded-xl gap-2 shadow-md"
                    >
                        <FaHome className="text-lg" />
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Error;