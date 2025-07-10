import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaThumbsUp, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";

const RequestedMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: mealRequests = [], refetch } = useQuery({
        queryKey: ["mealRequests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal-requests/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: allMeals = [] } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <div className="bg-white rounded-3xl shadow-xl border overflow-x-auto px-4 py-6">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
                    Your Requested Meals
                </h2>

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700 text-sm">
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
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    You have no meal requests yet.
                                </td>
                            </tr>
                        )}
                        {mealRequests.map((req) => {
                            // normalize id because _id might be { $oid: string }
                            const requestId = req._id?.$oid || req._id;

                            const meal = allMeals.find((m) => m._id === req.mealId);

                            if (!meal) return null;

                            return (
                                <motion.tr
                                    key={requestId}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-sm text-gray-700 ${req.status.toLowerCase() === "pending"
                                        ? "bg-indigo-50/60"
                                        : "bg-white"
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
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${req.status.toLowerCase() === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
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
                                            className="text-red-500 hover:text-red-700 transition duration-200"
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
            </div>
        </motion.div>
    );
};

export default RequestedMeals;
