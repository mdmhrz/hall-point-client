import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import forbiddenAnimation from "../assets/forbiddenAnimation.json"; // Optional Lottie file

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
            {/* Optional Lottie animation */}
            {/* If you don't want Lottie, replace with icon below */}
            <div className="w-64 h-64 mb-6">
                <Lottie animationData={forbiddenAnimation} loop={true} />
            </div>

            {/* If you don't want to use Lottie, use this icon instead:
      <FaLock className="text-6xl text-red-500 mb-6" />
      */}

            <h1 className="text-5xl font-bold text-red-500 mb-4">403 - Forbidden</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
                You do not have permission to access this page. If you think this is a mistake, please contact an administrator.
            </p>

            <Link to="/" className="btn btn-primary px-6 text-white">
                Go Home
            </Link>
        </div>
    );
};

export default Forbidden;
