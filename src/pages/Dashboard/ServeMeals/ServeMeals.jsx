import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

dayjs.extend(relativeTime);

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data: allMeals = [] } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["mealRequests", currentPage, itemsPerPage, searchTerm],
        queryFn: async () => {
            const url = searchTerm.trim()
                ? `/meal-requests/search?keyword=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`
                : `/meal-requests/all?page=${currentPage}&limit=${itemsPerPage}`;
            const res = await axiosSecure.get(url);
            return res.data;
        },
        keepPreviousData: true,
    });

    const filteredRequests = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = () => {
        setCurrentPage(1);
        refetch();
    };

    const handleServe = async (id) => {
        const confirm = await Swal.fire({
            title: "Serve this meal?",
            text: "Are you sure you want to mark this meal as served?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, serve it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/meal-requests/serve/${id}`);
                if (res.data.modifiedCount > 0) {
                    toast.success("Meal served successfully!");
                    refetch();
                } else {
                    toast.warn("Meal could not be updated.");
                }
            } catch (error) {
                toast.error("Failed to serve the meal.");
            }
        }
    };

    return (
        <motion.section
            className="max-w-7xl mx-auto px-6 py-14"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-primary">🍛 Serve Requested Meals</h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Manage and fulfill pending meal requests from users.
                </p>
                <p className="text-sm mt-2 text-gray-500 italic">
                    Highlighted rows indicate pending status. You can serve meals directly from here.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search by user email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                />
                <button onClick={handleSearch} className="btn btn-primary flex items-center gap-2">
                    <FaSearch /> Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200 shadow-xl rounded-xl">
                    <thead className="bg-base-200 text-gray-700 font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Meal</th>
                            <th>User Name & Email</th>
                            <th>Requested</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req, idx) => {
                            const meal = allMeals.find((m) => m._id === req.mealId);
                            return (
                                <motion.tr
                                    key={req._id}
                                    className={`hover:bg-base-100 transition duration-300 ${req.status === "pending" ? "bg-accent/10" : ""}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                    <td className="font-bold text-primary flex items-center gap-3">
                                        <img
                                            src={meal?.image || "https://i.ibb.co/8bqG6Cw/default-user.png"}
                                            alt={meal?.title}
                                            className="w-12 h-12 object-cover rounded-md border"
                                        />
                                        <p>{meal?.title || "N/A"}</p>
                                    </td>
                                    <td className="text-gray-500">
                                        <p><span className="font-semibold">Name:</span> {req.userName}</p>
                                        <p><span className="font-semibold">Email:</span> {req.userEmail}</p>
                                    </td>
                                    <td className="text-sm text-gray-500">{dayjs(req.requestedAt).fromNow()}</td>
                                    <td>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${req.status === "pending"
                                            ? "bg-warning/20 text-warning"
                                            : "bg-success/20 text-success"}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            disabled={req.status !== "pending"}
                                            onClick={() => handleServe(req._id)}
                                            className="btn btn-sm btn-success text-white flex items-center gap-1"
                                        >
                                            <FaCheckCircle /> Serve
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                        {filteredRequests.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-400">
                                    No meal requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 px-2">
                {/* Items per page */}
                <div className="flex items-center justify-between gap-2 text-sm">
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
        </motion.section>
    );
};

export default ServeMeals;
