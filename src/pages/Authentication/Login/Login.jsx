import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/register.json"; // You'll need to add this file

const Login = () => {
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

    return (
        <>
            <Helmet>
                <title>Login | HallPoint</title>
            </Helmet>

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-12 lg:py-20">
                <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Animation Section */}
                    <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 items-center justify-center">
                        <div className="w-full h-full max-w-md">
                            <Lottie
                                animationData={loginAnimation}
                                loop={true}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 p-8 md:p-12">
                        <form
                            onSubmit={handleSubmit(submitHandler)}
                            className="w-full max-w-md mx-auto"
                            noValidate
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    Welcome to <span className="text-indigo-600">HallPoint</span>
                                </h2>
                                <p className="text-gray-500">Please enter your details to sign in</p>
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MdEmail className="text-gray-400" />
                                    </div>
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
                                        className={`bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MdLock className="text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        className={`bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5`}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Forgot Password */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                                        />
                                    </div>
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-md hover:shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : "Sign In"}
                            </button>

                            {/* Divider */}
                            <div className="my-6 flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-gray-500 text-sm">or continue with</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Social Login */}
                            <SocialLogin />

                            {/* Register Link */}
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Don't have an account?{" "}
                                <Link to='/auth/register'>
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                                    >
                                        Register here
                                    </button>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;