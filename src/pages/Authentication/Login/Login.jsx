import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();

    const submitHandler = (data) => {
        signIn(data.email, data.password).then(result => {
            console.log(result.user);
            toast.success("You've successfully logged in")
            navigate(from)
        }).catch(error => console.log(error))
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <>
            <Helmet>
                <title>Login | HallPoint</title>
            </Helmet>

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
            >
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="w-full space-y-6"
                    noValidate
                >
                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-base-content/90">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                                <MdEmail className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className={`w-full pl-12 pr-4 py-3 bg-base-100 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm
                                    ${errors.email
                                        ? 'border-error focus:border-error text-error'
                                        : 'border-base-300 focus:border-primary text-base-content hover:border-base-400'
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-error font-medium flex items-center gap-1"
                            >
                                <span className="w-4 h-4 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                {errors.email.message}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-base-content/90">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                                <MdLock className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors duration-200" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className={`w-full pl-12 pr-12 py-3 bg-base-100 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm
                                    ${errors.password
                                        ? 'border-error focus:border-error text-error'
                                        : 'border-base-300 focus:border-primary text-base-content hover:border-base-400'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/50 hover:text-primary transition-colors duration-200"
                            >
                                {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                            </button>
                        </div>
                        {errors.password && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-error font-medium flex items-center gap-1"
                            >
                                <span className="w-4 h-4 rounded-full bg-error/20 flex items-center justify-center text-xs">!</span>
                                {errors.password.message}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Remember Me & Forgot Password */}
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 rounded text-primary focus:ring-primary/20 focus:ring-2 bg-base-100 transition-colors duration-200"
                            />
                            <span className="text-sm text-base-content/70 group-hover:text-base-content transition-colors duration-200">
                                Remember me
                            </span>
                        </label>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="text-sm text-primary hover:text-primary-focus font-medium hover:underline transition-all duration-200"
                        >
                            Forgot Password?
                        </motion.button>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus text-primary-content font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-3">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    Signing you in...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Sign In to Your Account
                                </span>
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

                    {/* Register Link */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 text-center border-t border-base-300/50">
                        <p className="text-base-content/70 ">
                            New to our platform?
                        </p>
                        <Link to='/auth/register'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                className="text-primary hover:text-primary-focus font-semibold text-base hover:underline underline-offset-4 transition-all duration-200"
                            >
                                SignUp
                            </motion.button>
                        </Link>
                    </motion.div>
                </form>
            </motion.div>
        </>
    );
};

export default Login;