import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

dayjs.extend(relativeTime);

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRequests, setFilteredRequests] = useState([]);

    const { data: allMeals = [] } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/all");
            return res.data;
        },
    });

    // Default load of all meal requests
    const { data: allRequests = [], refetch } = useQuery({
        queryKey: ["mealRequests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meal-requests/all");
            return res.data;
        },
    });

    // Search handler
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setFilteredRequests(allRequests);
            return;
        }

        try {
            const res = await axiosSecure.get(`/meal-requests/search?keyword=${searchTerm}`);
            setFilteredRequests(res.data);
        } catch (err) {
            toast.error("Search failed");
        }
    };

    // Initially load all requests into filteredRequests
    useEffect(() => {
        setFilteredRequests(allRequests);
    }, [allRequests]);

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
                <button
                    onClick={handleSearch}
                    className="btn btn-primary flex items-center gap-2"
                >
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
                                    className={`hover:bg-base-100 transition duration-300 ${req.status === "pending" ? "bg-accent/10" : ""
                                        }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <td>{idx + 1}</td>
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
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${req.status === "pending"
                                                ? "bg-warning/20 text-warning"
                                                : "bg-success/20 text-success"
                                                }`}
                                        >
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
        </motion.section>
    );
};

export default ServeMeals;
