import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FaHome, FaUser, FaClipboardList, FaStar, FaMoneyCheckAlt, FaUserShield, FaUsersCog, FaPlusCircle, FaConciergeBell, FaCommentDots, FaUtensils, FaCalendarAlt, FaTimes, FaBars, FaArrowLeft } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import moduleName from '../assets/logos/color-logo.svg';

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


    useEffect(() => {
        if (!loading && !roleLoading) {
            setNavLinks(role === "admin" ? adminLinks : userLinks);
            setRoleReady(true);
        }
    }, [role, loading, roleLoading]);

    if (loading || roleLoading || !roleReady) return <Loading />;

    return (
        <div className="flex h-screen bg-base-200">
            <ScrollToTop />

            {/* Sidebar */}
            <div
                className={`fixed h-screen lg:static top-0 left-0 bottom-0 w-72 z-30 bg-base-100 border-r border-base-300 transform transition-transform duration-300 shadow-lg lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center lg:justify-center justify-between h-14 p-5 border-b border-base-200 bg-primary text-primary-content">
                        <img onClick={() => navigate("/")} className="w-40 cursor-pointer" src={moduleName} alt="logo" />
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                            <FaTimes />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-4 text-center border-b border-base-200 shrink-0">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/ZKp63ZF/avatar.png"}
                            alt="User"
                            className="w-16 h-16 rounded-full mx-auto border-2 border-primary"
                        />
                        <p className="font-semibold mt-2">{user?.email}</p>
                        <span className="text-xs opacity-70 capitalize">{role} Panel</span>
                    </div>

                    {/* Navigation (scrollable middle) */}
                    <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-sm">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary hover:text-primary-content transition"
                        >
                            <FaHome />
                            Overview
                        </Link>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${location.pathname === link.path
                                    ? "bg-primary text-primary-content"
                                    : "hover:bg-primary hover:text-primary-content"
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Back to Home (fixed bottom) */}
                    <div className="p-4 border-t border-base-200 shrink-0">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-3 bg-primary text-primary-content rounded-lg px-4 py-2 border border-primary hover:bg-base-300 hover:text-base-content transition"
                        >
                            <FaArrowLeft />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Topbar */}
                <div className="lg:hidden flex items-center justify-between bg-base-200 px-4 py-3 shadow">
                    <button onClick={() => setSidebarOpen(true)} className="text-primary text-2xl">
                        <FaBars />
                    </button>
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>

                {/* Content */}
                <main className="flex-1 p-5 overflow-y-auto bg-base-200">
                    <div className="px-4 lg:px-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
