import React from "react";
import { Link, NavLink } from "react-router";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import './Navbar.css'

const Navbar = () => {
    const { user, logOut } = useAuth()
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/meals">Meals</NavLink></li>
        <li><NavLink to="/upcoming-meals">Upcoming Meals</NavLink></li>
    </>

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then(result => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        console.log('Logged out successfully');
                    })
                    .catch(error => {
                        console.error('Logout error:', error);
                    });
            }
        });
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
            {/* Start - Logo */}
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                    {/* <img src="/logo.svg" alt="HallPoint" className="w-8 h-8" /> */}
                    HallPoint
                </Link>
            </div>

            {/* Center - Menu (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base font-medium">
                    {links}
                </ul>
            </div>

            {/* End - Actions */}
            <div className="navbar-end flex items-center gap-3">
                {/* Notification Icon */}
                <button className="btn btn-ghost btn-circle relative">
                    <FaBell size={20} />
                    <span className="badge badge-sm badge-error absolute -top-1 -right-1">3</span>
                </button>

                {/* Auth buttons */}
                {!user ? (
                    <Link to="/auth/register" className="btn btn-sm btn-primary rounded-full">
                        Join Us
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "/avatar.png"} alt="user" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li className="font-semibold text-center pointer-events-none">
                                {user?.displayName || "User"}
                            </li>
                            <div className="divider my-0" />
                            <li><Link to="/dashboard-layout">Dashboard</Link></li>
                            <li>
                                <button onClick={handleLogout} className="text-red-500">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Mobile Toggle */}
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <FiMenu size={22} />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
