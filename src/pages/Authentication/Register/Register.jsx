import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MdEmail, MdImage, MdLock, MdPerson } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerAnimation from "../../../assets/login.json";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const [profilePic, setProfilePic] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const { createUser, updateUserProfile } = useAuth();

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const password = watch("password");

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        setUploading(true);
        setUploadError('');
        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        try {
            const res = await axios.post(imageUploadUrl, formData);
            const imageUrl = res.data.data.url;
            setProfilePic(imageUrl);
            toast.success('Image uploaded successfully!');
        } catch (err) {
            setUploadError('Image upload failed. Try again.');
            toast.error('Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const submitHandler = async (data) => {
        try {
            const userCredential = await createUser(data.email, data.password);
            const userInfo = {
                email: data.email,
                name: data.name,
                role: 'user',
                badge: 'bronze',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            };

            await axiosInstance.post('/users', userInfo);

            await updateUserProfile({
                displayName: data.name,
                photoURL: profilePic,
            });

            toast.success("Registration successful!");
            navigate(from);
        } catch (err) {
            console.error(err);
            toast.error("Registration failed. Try again.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Register | HallPoint</title>
            </Helmet>

            <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                >
                    {/* Animation Section */}
                    <div className="hidden lg:flex bg-primary p-8 items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-full max-w-md"
                        >
                            <Lottie
                                animationData={registerAnimation}
                                loop={true}
                                autoplay={true}
                                className="w-full"
                            />
                        </motion.div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 md:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-base-content mb-2">Create Account</h2>
                                <p className="text-base-content/70">Register to access all features</p>
                            </div>

                            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                                {/* Name Field */}
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-base-content mb-2">
                                        Full Name
                                    </label>
                                    <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" size={20} />
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Your name"
                                            {...register("name", { required: "Name is required" })}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.name ? "border-error" : "border-base-300"} input focus:ring focus:ring-primary`}
                                        />
                                    </motion.div>
                                    {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="mb-6">
                                    <label htmlFor="image" className="block text-sm font-medium text-base-content mb-2">
                                        Profile Picture
                                    </label>
                                    <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                        <MdImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            onChange={handleImageUpload}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-base-300 focus:ring focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                        />
                                    </motion.div>
                                    {uploading && <p className="mt-1 text-sm text-primary">Uploading image...</p>}
                                    {uploadError && <p className="mt-1 text-sm text-error">{uploadError}</p>}
                                    {profilePic && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 flex justify-center"
                                        >
                                            <img src={profilePic} alt="Profile Preview" className="w-16 h-16 rounded-full object-cover border-2 border-base-300 shadow-sm" />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2">
                                        Email Address
                                    </label>
                                    <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" size={20} />
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
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? "border-error" : "border-base-300"} input focus:ring focus:ring-primary`}
                                        />
                                    </motion.div>
                                    {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-base-content mb-2">
                                        Password
                                    </label>
                                    <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                        <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" size={20} />
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                            })}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.password ? "border-error" : "border-base-300"} input focus:ring focus:ring-primary`}
                                        />
                                    </motion.div>
                                    {errors.password && <p className="mt-1 text-sm text-error">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="mb-8">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-base-content mb-2">
                                        Confirm Password
                                    </label>
                                    <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                        <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" size={20} />
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm password"
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: (value) => value === password || "Passwords do not match",
                                            })}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.confirmPassword ? "border-error" : "border-base-300"} input focus:ring focus:ring-primary`}
                                        />
                                    </motion.div>
                                    {errors.confirmPassword && <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting || uploading}
                                    className={`w-full py-3 px-4 btn btn-primary ${(isSubmitting || uploading) ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Account...
                                        </span>
                                    ) : (
                                        "Register"
                                    )}
                                </motion.button>

                                {/* Divider */}
                                <div className="flex items-center my-6">
                                    <div className="flex-grow border-t border-base-300"></div>
                                    <span className="mx-4 text-base-content/70 text-sm">or continue with</span>
                                    <div className="flex-grow border-t border-base-300"></div>
                                </div>

                                {/* Social Login */}
                                <SocialLogin />

                                {/* Login Link */}
                                <div className="mt-6 text-center">
                                    <p className="text-base-content/70">
                                        Already have an account?{" "}
                                        <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Register;
