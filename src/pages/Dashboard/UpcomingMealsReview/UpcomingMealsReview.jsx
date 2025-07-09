import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import AddUpcomingMealModal from "./AddUpcomingMealModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpcomingMealsReview = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: meals = [], refetch, isLoading } = useQuery({
        queryKey: ["admin-upcoming-meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/upcoming-meals/sorted");
            return res.data;
        },
    });

    const handlePublish = async (meal) => {
        const confirm = await Swal.fire({
            title: "Publish Meal?",
            text: `Are you sure you want to publish ${meal.title}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Publish",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.post("/meals", { ...meal, status: "published" });
                await axiosSecure.delete(`/upcoming-meals/${meal._id}`);
                refetch();
                Swal.fire("Published", "Meal has been published.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to publish meal.", "error");
            }
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 max-w-7xl mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">Manage Upcoming Meals</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <FaPlusCircle /> Add Meal
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow">
                <table className="table w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Meal</th>
                            <th>Category</th>
                            <th>Cuisine</th>
                            <th>Distributor</th>
                            <th>Likes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, idx) => (
                            <motion.tr
                                key={meal._id}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="hover:bg-base-200 transition"
                            >
                                <td>{idx + 1}</td>
                                <td className="font-semibold">{meal.title}</td>
                                <td>{meal.category}</td>
                                <td>{meal.cuisine}</td>
                                <td>{meal.distributor_name}</td>
                                <td>{meal.likes}</td>
                                <td>
                                    <button
                                        onClick={() => handlePublish(meal)}
                                        className="btn btn-sm btn-success flex items-center gap-1"
                                    >
                                        <MdOutlinePublishedWithChanges /> Publish
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {meals.length === 0 && (
                    <p className="text-center py-6 text-gray-500">No upcoming meals found.</p>
                )}
            </div>

            <AddUpcomingMealModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} refetch={refetch} />

        </motion.section>
    );
};

export default UpcomingMealsReview;
