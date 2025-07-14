import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch, FaUserShield, FaUserSlash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { motion } from "framer-motion";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["users", search, currentPage, itemsPerPage],
        queryFn: async () => {
            if (!search.trim()) return { users: [], total: 0 };
            const res = await axiosSecure.get(`/users/manageUsers?keyword=${search}&page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
        enabled: !!search.trim(),
    });

    const users = data?.users || [];
    const totalUsers = data?.total || 0;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const handleRoleToggle = async (userId, role) => {
        const confirm = await Swal.fire({
            title: role === "admin" ? "Remove Admin?" : "Make Admin?",
            text: `Are you sure you want to ${role === "admin" ? "remove admin access" : "make this user an admin"}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            const updatedRole = role === 'admin' ? 'user' : 'admin';
            try {
                await axiosSecure.patch(`/users/update-role/${userId}`, { role: updatedRole });
                Swal.fire("Success", "User role updated", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error", "Failed to update user", "error");
            }
        }
    };

    const debouncedSearch = debounce((value) => {
        setSearch(value);
        setCurrentPage(1); // reset page when searching
    }, 500);

    return (
        <div className="px-6 py-8 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-3">Manage Users</h2>
            <p className="mb-6 text-gray-600 text-center">Search users by name or email and manage their access.</p>

            <div className="max-w-md md:max-w-xl mx-auto mb-8 flex items-center justify-center">
                <div className="flex w-full items-center border border-gray-500 rounded-lg overflow-hidden bg-base-100 shadow">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full px-4 py-2 outline-none bg-transparent"
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
                    <div className="px-4 text-gray-400">
                        <FaSearch />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center text-primary font-medium">Loading...</div>
            ) : users.length === 0 && search.trim() ? (
                <div className="text-center text-gray-500 mt-6">No user found with that keyword.</div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-base-200">
                        <table className="min-w-full table-fixed border-separate border-spacing-y-4">
                            <thead>
                                <tr className="bg-primary text-white text-sm uppercase tracking-wider">
                                    <th className="py-4 px-4 rounded-l-2xl text-left">#</th>
                                    <th className="py-4 px-4 text-left">Name</th>
                                    <th className="py-4 px-4 text-left">Email</th>
                                    <th className="py-4 px-4 text-left">Badge</th>
                                    <th className="py-4 px-4 text-left">Role</th>
                                    <th className="py-4 px-4 text-center rounded-r-2xl">Action</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm text-gray-700">
                                {users.map((user, idx) => (
                                    <motion.tr
                                        key={user._id}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 250 }}
                                        className="bg-base-100/50 shadow-md hover:shadow-lg rounded-2xl transition-all duration-200"
                                    >
                                        <td className="px-4 py-4 font-medium text-primary">
                                            {(currentPage - 1) * itemsPerPage + idx + 1}
                                        </td>
                                        <td className="px-4 py-4 font-semibold">{user.name}</td>
                                        <td className="px-4 py-4">{user.email}</td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={`badge px-3 py-1 w-fit capitalize font-medium text-xs rounded-full border-0 shadow-sm
                            ${user.badge === 'platinum' ? 'bg-purple-600 text-white' :
                                                        user.badge === 'silver' ? 'bg-gray-500 text-white' :
                                                            user.badge === 'gold' ? 'bg-yellow-600 text-white' : 'bg-base-200 text-gray-600'}`}
                                            >
                                                {user.badge || "none"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={`badge w-fit px-3 py-1 font-medium text-xs rounded-full border-0
                            ${user.role === "admin" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => handleRoleToggle(user._id, user.role)}
                                                className={`btn btn-sm w-32 flex items-center justify-center gap-2 font-semibold shadow-md 
                            ${user.role === "admin" ? "btn-error" : "btn-accent"}`}
                                            >
                                                {user.role === "admin" ? <FaUserSlash /> : <FaUserShield />}
                                                {user.role === "admin" ? "Remove" : "Make Admin"}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {users.length === 0 && (
                            <p className="text-center py-6 text-gray-400 italic">No users found.</p>
                        )}
                    </div>


                    {/* Pagination Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 px-2">
                        {/* Items per page */}
                        <div className="flex items-center gap-2 text-sm">
                            <label htmlFor="itemsPerPage" className="font-medium min-w-[120px]">Items per page:</label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="select select-sm border border-gray-300 rounded-md"
                            >
                                {[5, 10, 15, 20, 30, 50].map((count) => (
                                    <option key={count} value={count}>{count}</option>
                                ))}
                            </select>
                        </div>

                        {/* Page Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage <= 1}
                                className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
                            >
                                <BsChevronLeft size={16} />
                            </button>

                            {[...Array(totalPages).keys()].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page + 1)}
                                    className={`btn btn-sm ${currentPage === page + 1
                                        ? "btn-primary text-white"
                                        : "btn-outline text-gray-700"
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
                            >
                                <BsChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
