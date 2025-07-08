import React from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Register = ({ onRegister, onGoogleRegister, onNavigateLogin }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();

    const { createUser } = useAuth()

    const submitHandler = async (data) => {
        try {
            await createUser(data.email, data.password).then(result => {
                console.log(result.user);
                navigate(from)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const password = watch("password");

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 p-6">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full max-w-md bg-base-100 p-10 rounded-xl shadow-lg"
                noValidate
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">
                    Create Account
                </h2>

                {/* Name */}
                <div className="mb-5 relative">
                    <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                        Full Name
                    </label>
                    <div className="relative">
                        <MdPerson
                            size={20}
                            className="absolute z-5 top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.name ? "input-error" : ""
                                }`}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-error mt-1 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-5 relative">
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
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.email ? "input-error" : ""
                                }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-error mt-1 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-5 relative">
                    <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <MdLock
                            size={20}
                            className="absolute z-5 top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
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
                            className={`input input-bordered pl-10 w-full ${errors.password ? "input-error" : ""
                                }`}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-error mt-1 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-6 relative">
                    <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <MdLock
                            size={20}
                            className="absolute z-5 top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.confirmPassword ? "input-error" : ""
                                }`}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-error mt-1 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg font-semibold mb-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating Account..." : "Register"}
                </button>

                {/* Divider */}
                <div className="flex items-center mb-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-400 font-semibold">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Button */}
                <SocialLogin></SocialLogin>

                {/* Login Link */}
                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-primary font-semibold hover:underline focus:outline-none" >Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
