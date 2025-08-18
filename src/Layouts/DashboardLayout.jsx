import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FaHome, FaUser, FaClipboardList, FaStar, FaMoneyCheckAlt, FaUserShield, FaUsersCog, FaPlusCircle, FaConciergeBell, FaCommentDots, FaUtensils, FaCalendarAlt, FaTimes, FaBars, FaArrowLeft } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import moduleName from '../assets/logos/color-logo.svg';
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import { times } from "lodash";

// Admin Dashboard Links
const adminLinks = [
    { name: "Admin Profile", path: "/dashboard/admin-profile", icon: <FaUserShield /> },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsersCog /> },
    { name: "Add Meal", path: "/dashboard/add-meal", icon: <FaPlusCircle /> },
    { name: "All Meal", path: "/dashboard/all-meals", icon: <FaUtensils /> },
    { name: "All Reviews", path: "/dashboard/all-reviews", icon: <FaCommentDots /> },
    { name: "Serve Meals", path: "/dashboard/serve-meals", icon: <FaConciergeBell /> },
    { name: "Upcoming Meals", path: "/dashboard/upcoming-meals-review", icon: <FaCalendarAlt /> },
];

// User Dashboard Links
const userLinks = [
    { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
    { name: "Requested Meals", path: "/dashboard/requested-meals", icon: <FaClipboardList /> },
    { name: "My Reviews", path: "/dashboard/my-reviews", icon: <FaStar /> },
    { name: "Payment History", path: "/dashboard/payment-history", icon: <FaMoneyCheckAlt /> },
];

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, loading } = useAuth();
    const [navLinks, setNavLinks] = useState([]);
    const [roleReady, setRoleReady] = useState(false);
    const { role, roleLoading } = useUserRole();
    const navigate = useNavigate()

    const [currentTime, setCurrentTime] = useState(new Date());

    // Update the time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, []);

    // Format date and time
    const formattedDate = currentTime.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = currentTime.toLocaleTimeString();

    useEffect(() => {
        if (!loading && !roleLoading) {
            setNavLinks(role === "admin" ? adminLinks : userLinks);
            setRoleReady(true);
        }
    }, [role, loading, roleLoading]);

    if (loading || roleLoading || !roleReady) return <Loading />;
    // console.log(user);

    return (
        <div className="flex h-screen bg-base-200/50">
            <ScrollToTop />

            {/* Sidebar */}
            <div
                className={`fixed h-screen lg:static top-0 left-0 bottom-0 w-72 z-30 bg-base-100 shadow-2xl lg:shadow-xl transform transition-all duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header with gradient */}
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-90"></div>
                        <div className="relative flex items-center lg:justify-center justify-between h-21 px-6 text-primary-content">
                            <img
                                onClick={() => navigate("/")}
                                className="w-40 cursor-pointer hover:scale-105 transition-transform duration-200"
                                src={moduleName}
                                alt="logo"
                            />
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-lg hover:bg-base-100/20 transition-colors duration-200"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                    </div>

                    {/* Enhanced User Info Card */}
                    <div className="p-6 hidden lg:block">
                        <div className="bg-base-200/50 backdrop-blur-sm rounded-2xl p-4 border border-base-300/50">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/ZKp63ZF/avatar.png"}
                                        alt="User"
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-base-content truncate text-sm">
                                        {user?.displayName || user?.email}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="badge badge-primary badge-xs"></div>
                                        <span className="text-xs text-base-content/70 capitalize">{role} Panel</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Navigation */}
                    <nav className="flex-1 scrollBar overflow-y-auto px-4 space-y-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <div className="space-y-1">
                            <Link
                                to="/dashboard"
                                className={`mt-4 lg:mt-0 group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === "/dashboard"
                                    ? "bg-primary text-primary-content shadow-md"
                                    : "hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                <FaHome className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Overview</span>
                                {location.pathname === "/dashboard" && (
                                    <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                )}
                            </Link>

                            {/* Navigation Section Divider */}
                            <div className="px-4 py-2">
                                <div className="h-px bg-base-300/50"></div>
                                <span className="text-xs text-base-content/50 font-semibold uppercase tracking-wider mt-2 block">
                                    {role === "admin" ? "Administration" : "My Account"}
                                </span>
                            </div>

                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === link.path
                                        ? "bg-primary text-primary-content shadow-md"
                                        : "hover:bg-primary/10 hover:text-primary"
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                        {link.icon}
                                    </span>
                                    <span className="font-medium">{link.name}</span>
                                    {location.pathname === link.path && (
                                        <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Enhanced Back to Home Button */}
                    <div className="p-4 border-t border-base-300/50">
                        <Link
                            to="/"
                            className="group flex items-center justify-center gap-3 bg-gradient-to-r from-accent/90 to-accent text-accent-content rounded-xl px-4 py-3 hover:from-accent hover:to-accent/80 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="font-semibold">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Enhanced Header */}
                <header className="bg-base-100 shadow-lg border-b border-base-300/50">
                    <div className="flex items-center justify-between px-4 md:px-8 py-4">
                        <div className="flex items-center space-x-4">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-xl hover:bg-base-200 transition-colors duration-200"
                            >
                                <FiMenu className="text-xl text-base-content" />
                            </button>

                            {/* Page Title */}
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-base-content">
                                    {role === "admin" ? "Admin" : "User"} Dashboard
                                </h1>
                                <p className="text-sm text-base-content/60 hidden sm:block">
                                    Welcome back, manage your {role === "admin" ? "platform" : "account"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Mobile User Info */}
                            <div className="flex items-center space-x-3 lg:hidden">
                                <img
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
                                    src={user.photoURL || "https://i.ibb.co/ZKp63ZF/avatar.png"}
                                    alt="User Photo"
                                />
                                <div className="hidden sm:flex flex-col text-sm">
                                    <span className="font-semibold text-base-content">{user?.displayName}</span>
                                    <span className="text-base-content/60">{user?.email}</span>
                                </div>
                            </div>

                            {/* Time Display for Large Screens */}
                            <div className="hidden lg:flex flex-col text-sm text-right">
                                <span className="font-semibold text-base-content">{formattedDate}</span>
                                <span className="text-base-content/60">{formattedTime}</span>
                            </div>

                            {/* Notification Bell */}
                            <div className="relative">
                                <button className="p-2 rounded-xl hover:bg-base-200 transition-colors duration-200">
                                    <FiBell className="text-xl text-base-content" />
                                </button>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-base-100"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Content Area */}
                <main className="flex-1 scrollBar overflow-y-auto bg-gradient-to-br from-base-200/30 to-base-300/50 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    <div className="p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-base-content/20 backdrop-blur-sm z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;