import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch, FaUserShield, FaUserSlash } from "react-icons/fa";
import { debounce, round } from "lodash";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            if (!search.trim()) return [];
            const res = await axiosSecure.get(`/users/search?keyword=${search}`);
            return res.data;
        },
        enabled: !!search.trim(),
    });

    const handleRoleToggle = async (userId, role) => {
        const confirm = await Swal.fire({
            title: role === "admin" ? "Remove Admin?" : "Make Admin?",
            text: `Are you sure you want to ${role === "admin" ? "remove admin access" : "make this user an admin"}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        const updatedRole = role === 'admin' ? 'user' : 'admin'

        if (confirm.isConfirmed) {
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
                users.length > 0 && (
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
                                        <td>{idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge badge-outline capitalize ${user.badge === 'platinum' && 'bg-purple-600 text-white'} ${user.badge === 'silver' && 'bg-slate-500 text-white'} ${user.badge === 'gold' && 'bg-[#B78628] text-white'} `}>{user.badge}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.role === "admin" ? "badge-success" : "badge-neutral"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleRoleToggle(user._id, user.role)}
                                                className={`btn btn-sm ${user.role === "admin" ? "btn-error" : "btn-primary"
                                                    } flex items-center gap-2`}
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
                )
            )}
        </div>
    );
};

export default ManageUsers;
