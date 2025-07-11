import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdImage, MdLock, MdPerson } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const [profilePic, setProfilePic] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const { createUser, updateUserProfile } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    //Image Upload & Preview
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
            toast.success('✅ Image uploaded successfully!');
        } catch (err) {
            setUploadError('Image upload failed. Try again.');
            toast.error('Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    // ✅ Submit Handler
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

            toast.success("🎉 Registration successful!");
            navigate(from);
        } catch (err) {
            console.error(err);
            toast.error("Registration failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 p-6">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl"
                noValidate
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">
                    Create Account
                </h2>

                {/* Name */}
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                        Full Name
                    </label>
                    <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            {...register("name", { required: "Name is required" })}
                            className={`input input-bordered pl-10 w-full ${errors.name ? "input-error" : ""}`}
                        />
                    </div>
                    {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">
                        Upload Profile Picture
                    </label>
                    <div className="relative">
                        <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full pl-10"
                        />
                    </div>
                    {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
                    {uploadError && <p className="text-error text-sm mt-1">{uploadError}</p>}
                    {profilePic && (
                        <div className="mt-2">
                            <img src={profilePic} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border shadow" />
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
                            className={`input input-bordered pl-10 w-full ${errors.email ? "input-error" : ""}`}
                        />
                    </div>
                    {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
                    {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                            className={`input input-bordered pl-10 w-full ${errors.confirmPassword ? "input-error" : ""}`}
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg font-semibold mb-6"
                    disabled={isSubmitting || uploading}
                >
                    {isSubmitting ? "Creating Account..." : "Register"}
                </button>

                {/* Divider */}
                <div className="flex items-center mb-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-400 font-semibold">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Auth */}
                <SocialLogin />

                {/* Navigation Link */}
                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="text-primary font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
