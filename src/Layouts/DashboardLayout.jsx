import React, { useState } from "react";
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
    FaBars
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";
import { useEffect } from "react";


//Admin Dashboard Links
const adminLinks = [
    { name: "Admin Profile", path: "/dashboard/admin-profile", icon: <FaUserShield /> },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsersCog /> },
    { name: "Add Meal", path: "/dashboard/add-meal", icon: <FaPlusCircle /> },
    { name: "All Meal", path: "/dashboard/all-meals", icon: <FaUtensils /> },
    { name: "All Reviews", path: "/dashboard/all-reviews", icon: <FaCommentDots /> },
    { name: "Serve Meals", path: "/dashboard/serve-meals", icon: <FaConciergeBell /> },
    { name: "Upcoming Meals", path: "/dashboard/upcoming-meals-review", icon: <FaCalendarAlt /> },
]

// User Dashboard Links

const userLinks = [
    { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
    { name: "Requested Meals", path: "/dashboard/requested-meals", icon: <FaClipboardList /> },
    { name: "My Reviews", path: "/dashboard/my-reviews", icon: <FaStar /> },
    { name: "Payment History", path: "/dashboard/payment-history", icon: <FaMoneyCheckAlt /> }
]

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, loading } = useAuth();
    const [navLinks, setNavLinks] = useState([]);
    const [roleReady, setRoleReady] = useState(false);

    // only call useUserRole if user exists and auth loading is false
    const { role, roleLoading } = useUserRole();

    useEffect(() => {
        if (!loading && !roleLoading) {
            if (role === "admin") {
                setNavLinks(adminLinks);
            } else {
                setNavLinks(userLinks);
            }
            setRoleReady(true);
        }
    }, [role, loading, roleLoading]);

    if (loading || roleLoading || !roleReady) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`bg-base-300 border-r border-base-300 fixed lg:static z-20 top-0 left-0 h-full w-64 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
                    <Link to="/" className="text-xl font-bold text-primary">
                        HallPoint
                    </Link>
                    <button
                        className="lg:hidden text-xl"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 mt-4 px-4 pb-10">
                    <Link to='/dashboard' className="flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 hover:bg-primary hover:text-white"><FaHome />  Overview</Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${location.pathname === link.path
                                ? "bg-primary text-white"
                                : "hover:bg-primary hover:text-white"
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar (Mobile) */}
                <div className="bg-base-100 shadow px-4 py-3 flex justify-between items-center lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-xl text-primary"
                    >
                        <FaBars />
                    </button>
                    <h2 className="font-bold text-lg">Dashboard</h2>
                </div>

                {/* Content Outlet */}
                <main className="flex-1 p-4 overflow-y-auto bg-base-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
