import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddUpcomingMealModal from "./AddUpcomingMealModal";
import { Helmet } from "react-helmet-async";

const UpcomingMealsReview = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data: response = {}, refetch, isLoading } = useQuery({
        queryKey: ["admin-upcoming-meals", currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcoming-meals/sorted?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const meals = response.data || [];
    const totalPages = response.totalPages || 1;

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
                const newMeal = { ...meal };
                await axiosSecure.post("/meals", newMeal);
                await axiosSecure.delete(`/upcoming-meals/${meal._id}`);
                refetch();
                Swal.fire("Published", "Meal has been published.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to publish meal.", "error");
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Upcoming Meals - Dashboard | HallPoint</title>
            </Helmet>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 max-w-7xl mx-auto"
            >
                {/* Banner / Header Section */}
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary">Manage Upcoming Meals</h2>
                    <p className="text-base-content/70 text-sm md:text-base max-w-2xl mx-auto">
                        View, review, and manage all upcoming meals planned by distributors.
                    </p>
                    <p className="text-base-content/50 text-xs italic">
                        You can publish upcoming meals once they are ready. Click below to add a new one.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary mt-4 px-6 rounded-full shadow-md"
                    >
                        <FaPlusCircle className="mr-2" /> Add New Meal
                    </button>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl border border-base-200">
                    <table className="min-w-full table-fixed border-separate border-spacing-y-4">
                        <thead>
                            <tr className="bg-primary text-primary-content text-sm uppercase tracking-wider">
                                <th className="py-4 px-4 rounded-l-2xl text-left">#</th>
                                <th className="py-4 px-4 text-left">Meal</th>
                                <th className="py-4 px-4 text-left">Category</th>
                                <th className="py-4 px-4 text-left">Cuisine</th>
                                <th className="py-4 px-4 text-left">Distributor</th>
                                <th className="py-4 px-4 text-center">Likes</th>
                                <th className="py-4 px-4 text-center rounded-r-2xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-base-content">
                            {meals.map((meal, idx) => (
                                <motion.tr
                                    key={meal._id}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-base-100/50 shadow-md hover:shadow-lg rounded-2xl transition-all duration-200"
                                >
                                    <td className="px-4 py-4 font-semibold text-primary">
                                        {(currentPage - 1) * itemsPerPage + idx + 1}
                                    </td>
                                    <td className="px-4 py-4 font-semibold">{meal.title}</td>
                                    <td className="px-4 py-4">{meal.category}</td>
                                    <td className="px-4 py-4">{meal.cuisine}</td>
                                    <td className="px-4 py-4 text-base-content/70">{meal.distributor_name}</td>
                                    <td className="px-4 py-4 text-center font-semibold text-accent">
                                        {meal.likes}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={() => handlePublish(meal)}
                                            className="btn btn-sm btn-success flex items-center gap-1 shadow-md rounded-full"
                                        >
                                            <MdOutlinePublishedWithChanges className="text-lg" /> Publish
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {meals.length === 0 && (
                        <p className="text-center py-6 text-base-content/50">No upcoming meals found.</p>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 px-2">
                    {/* Items per page */}
                    <div className="flex items-center justify-between gap-2 text-sm">
                        <label htmlFor="itemsPerPage" className="font-medium min-w-[120px]">
                            Items per page:
                        </label>
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
                                <option key={count} value={count}>
                                    {count}
                                </option>
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
                                    ? "btn-primary text-primary-content"
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

                <AddUpcomingMealModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    refetch={refetch}
                />
            </motion.section>
        </>
    );
};

export default UpcomingMealsReview;
