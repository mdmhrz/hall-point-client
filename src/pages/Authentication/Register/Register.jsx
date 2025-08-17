import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MdEmail, MdImage, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <>
            <Helmet>
                <title>Register | HallPoint</title>
            </Helmet>

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
            >
                <form onSubmit={handleSubmit(submitHandler)} noValidate className="space-y-4">

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1  gap-4">
                        {/* Name Field */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <label htmlFor="name" className="block text-xs font-semibold text-base-content/90 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <MdPerson className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name", { required: "Name is required" })}
                                    className={`w-full pl-10 pr-3 py-2.5 bg-base-100  rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm text-sm
                                        ${errors.name
                                            ? 'border-error focus:border-error'
                                            : 'border-base-300 focus:border-primary hover:border-base-400'
                                        }`}
                                />
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-error font-medium flex items-center gap-1"
                                >
                                    <span className="w-3 h-3 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                    {errors.name.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <label htmlFor="email" className="block text-xs font-semibold text-base-content/90 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <MdEmail className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                                </div>
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
                                    className={`w-full pl-10 pr-3 py-2.5 bg-base-100 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm text-sm
                                        ${errors.email
                                            ? 'border-error focus:border-error'
                                            : 'border-base-300 focus:border-primary hover:border-base-400'
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-error font-medium flex items-center gap-1"
                                >
                                    <span className="w-3 h-3 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>

                    {/* Profile Picture Upload */}
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label htmlFor="image" className="block text-xs font-semibold text-base-content/90 uppercase tracking-wider">
                            Profile Picture (Optional)
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="relative group flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <MdImage className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    onChange={handleImageUpload}
                                    className="w-full pl-10 pr-3 py-2.5 bg-base-100  focus:border-primary hover:border-base-400 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                />
                            </div>
                            {profilePic && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg"
                                >
                                    <img src={profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                                </motion.div>
                            )}
                        </div>
                        {uploading && <p className="text-xs text-primary flex items-center gap-1">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border border-current border-t-transparent rounded-full" />
                            Uploading image...
                        </p>}
                        {uploadError && <p className="text-xs text-error font-medium flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                            {uploadError}
                        </p>}
                    </motion.div>

                    {/* Password Fields Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <label htmlFor="password" className="block text-xs font-semibold text-base-content/90 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <MdLock className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    className={`w-full pl-10 pr-10 py-2.5 bg-base-100 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm text-sm
                                        ${errors.password
                                            ? 'border-error focus:border-error'
                                            : 'border-base-300 focus:border-primary hover:border-base-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-primary transition-colors duration-200"
                                >
                                    {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-error font-medium flex items-center gap-1"
                                >
                                    <span className="w-3 h-3 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Confirm Password Field */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-base-content/90 uppercase tracking-wider">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <MdLock className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === password || "Passwords do not match",
                                    })}
                                    className={`w-full pl-10 pr-10 py-2.5 bg-base-100 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm text-sm
                                        ${errors.confirmPassword
                                            ? 'border-error focus:border-error'
                                            : 'border-base-300 focus:border-primary hover:border-base-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-primary transition-colors duration-200"
                                >
                                    {showConfirmPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-error font-medium flex items-center gap-1"
                                >
                                    <span className="w-3 h-3 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                    {errors.confirmPassword.message}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting || uploading}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus text-primary-content font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Your Account"
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-base-100/90 text-base-content/60 text-sm font-medium backdrop-blur-sm rounded-full">
                                or continue with
                            </span>
                        </div>
                    </motion.div>

                    {/* Social Login */}
                    <motion.div variants={itemVariants}>
                        <SocialLogin />
                    </motion.div>

                    {/* Login Link */}
                    <motion.div variants={itemVariants} className="text-center pt-4 border-t border-base-300/50 flex item-center justify-center gap-3">
                        <p className="text-base-content/70 text-sm mb-2 ">
                            Already have an account?
                        </p>
                        <Link to="/auth/login">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                className="text-primary hover:text-primary-focus font-semibold text-sm hover:underline underline-offset-4 transition-all duration-200"
                            >
                                Sign in
                            </motion.button>
                        </Link>
                    </motion.div>
                </form>
            </motion.div>
        </>
    );
};

export default Register;