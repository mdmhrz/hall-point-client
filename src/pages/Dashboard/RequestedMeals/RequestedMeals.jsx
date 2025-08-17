import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaThumbsUp, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

const RequestedMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data: allMeals = [] } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["mealRequests", user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/meal-requests/user?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    const mealRequests = data?.requests || [];
    const totalRequests = data?.total || 0;
    const totalPages = Math.ceil(totalRequests / itemsPerPage);

    const handleCancel = (id) => {
        Swal.fire({
            title: "Cancel Request?",
            text: "Do you really want to cancel this meal request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel it!",
            cancelButtonText: "No",
            confirmButtonColor: "#ef4444",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/mealRequests/${id}`);
                    toast.success("Meal request cancelled.");
                    refetch();
                } catch (error) {
                    toast.error("Failed to cancel request.");
                }
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Requested Meals | HallPoint</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6"
            >
                <div className="bg-base-100 rounded-3xl shadow-xl overflow-x-auto px-4 py-6">
                    <h2 className="text-2xl font-semibold mb-4 text-primary text-center">
                        Your Requested Meals
                    </h2>

                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-primary/20 text-base-content text-sm">
                                <th className="px-4 py-3 text-left">Meal Title</th>
                                <th className="px-4 py-3 text-center"><FaThumbsUp /></th>
                                <th className="px-4 py-3 text-center"><FaCommentDots /></th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-center">Requested At</th>
                                <th className="px-4 py-3 text-center">Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-base-content/50">
                                        {isLoading ? "Loading..." : "You have no meal requests yet."}
                                    </td>
                                </tr>
                            )}
                            {mealRequests.map((req) => {
                                const requestId = req._id?.$oid || req._id;
                                const meal = allMeals.find((m) => m._id === req.mealId);
                                if (!meal) return null;

                                return (
                                    <motion.tr
                                        key={requestId}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ duration: 0.2 }}
                                        className={`text-sm text-base-content ${req.status === "pending"
                                            ? "bg-warning/20"
                                            : "bg-base-100"
                                            } border-b`}
                                    >
                                        <td className="px-4 py-3 font-medium flex items-center gap-3">
                                            <img
                                                src={meal.image}
                                                alt={meal.title}
                                                className="w-12 h-12 rounded-lg object-cover shadow-sm"
                                            />
                                            <span>{meal.title}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">{meal.likes || 0}</td>
                                        <td className="px-4 py-3 text-center">{meal.reviews_count || 0}</td>
                                        <td className="px-4 py-3 text-center capitalize">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${req.status === "pending"
                                                    ? "bg-warning/30 text-warning"
                                                    : "bg-success/30 text-success"
                                                    }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {dayjs(req.requestedAt).format("MMM D, YYYY h:mm A")}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleCancel(requestId)}
                                                className="text-error hover:text-error-focus transition duration-200"
                                                title="Cancel Request"
                                            >
                                                <FaTrashAlt size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination Footer */}
                    {totalRequests > 0 && (
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
                                    className="select select-sm border border-base-300 rounded-md"
                                >
                                    {[5, 10, 15, 20, 30, 50].map((count) => (
                                        <option key={count} value={count}>{count}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Page Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                                            : "btn-outline text-base-content"
                                            }`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage >= totalPages}
                                    className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
                                >
                                    <BsChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default RequestedMeals;
