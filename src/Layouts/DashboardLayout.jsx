import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
    FaHome,
    FaUser,
    FaClipboardList,
    FaStar,
    FaMoneyCheckAlt,
    FaUserShield,
    FaUsersCog,
    FaPlusCircle,
    FaConciergeBell,
    FaCommentDots,
    FaUtensils,
    FaCalendarAlt,
    FaTimes,
    FaBars,
    FaArrowLeft
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";

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

    useEffect(() => {
        if (!loading && !roleLoading) {
            setNavLinks(role === "admin" ? adminLinks : userLinks);
            setRoleReady(true);
        }
    }, [role, loading, roleLoading]);

    if (loading || roleLoading || !roleReady) return <Loading />;

    return (
        <div className="flex h-screen overflow-hidden bg-base-100">
            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-full w-72 z-30 bg-white border-r border-base-300 transform transition-transform duration-300 shadow-lg lg:shadow-none
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-5 border-b border-base-200 bg-primary text-white">
                    <h1 className="text-xl font-bold">HallPoint</h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <FaTimes />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-4 text-center border-b border-base-200">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/ZKp63ZF/avatar.png"}
                        alt="User"
                        className="w-16 h-16 rounded-full mx-auto border-2 border-primary"
                    />
                    <p className="font-semibold mt-2">{user?.email}</p>
                    <span className="text-xs text-gray-500 capitalize">{role} Panel</span>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 text-sm">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition"
                    >
                        <FaHome />
                        Overview
                    </Link>

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${location.pathname === link.path
                                ? "bg-primary text-white"
                                : "hover:bg-primary hover:text-white"
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/"
                        className="absolute left-5 right-5 bottom-10 flex items-center justify-center btn gap-3 px-4 py-2 rounded-md mt-4 text-primary hover:bg-primary hover:text-white border border-primary transition"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>
                </nav>
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
                <main className="flex-1 p-5 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
