import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch, FaUserShield, FaUserSlash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Swal from "sweetalert2";
import { debounce } from "lodash";

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
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-2 text-primary">Manage Users</h2>
            <p className="mb-6 text-gray-600">Search users by name or email and manage their access.</p>

            <div className="max-w-md mb-8">
                <div className="flex items-center border rounded-lg overflow-hidden bg-base-100 shadow">
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
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full bg-base-100 rounded-xl shadow">
                            <thead className="bg-base-200 text-base font-semibold text-gray-700">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Badge</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge badge-outline capitalize ${user.badge === 'platinum' && 'bg-purple-600 text-white'} ${user.badge === 'silver' && 'bg-slate-500 text-white'} ${user.badge === 'gold' && 'bg-[#B78628] text-white'}`}>
                                                {user.badge}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.role === "admin" ? "badge-success" : "badge-neutral"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleRoleToggle(user._id, user.role)}
                                                className={`btn btn-sm ${user.role === "admin" ? "btn-error" : "btn-primary"} flex items-center gap-2`}
                                            >
                                                {user.role === "admin" ? <FaUserSlash /> : <FaUserShield />}
                                                {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
