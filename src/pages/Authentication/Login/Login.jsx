import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md"; // ✅ Add this import
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();



    const submitHandler = (data) => {


    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 p-6">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full max-w-md bg-base-100 p-10 rounded-xl shadow-lg"
                noValidate
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">
                    Login to HallPoint
                </h2>

                {/* Email */}
                <div className="mb-6 relative">
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <MdEmail
                            size={20}
                            className="absolute z-5 top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.email ? "input-error" : ""}`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-error mt-1 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-1 relative">
                    <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <MdLock
                            size={20}
                            className="z-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.password ? "input-error" : ""}`}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-error mt-1 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="mb-6 text-right">
                    <button
                        type="button"
                        className="text-sm text-primary hover:underline focus:outline-none"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg font-semibold mb-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div className="flex items-center mb-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-400 font-semibold">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Login */}
                <SocialLogin></SocialLogin>

                {/* Register Link */}
                <p className="mt-8 text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link to='/auth/register'>
                        <button
                            type="button"
                            className="text-primary font-semibold hover:underline focus:outline-none"
                        >
                            Register
                        </button>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;