import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddUpcomingMealModal from "./AddUpcomingMealModal";

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
                const newMeal = {
                    title: meal.title,
                    category: meal.category,
                    cuisine: meal.cuisine,
                    image: meal.image,
                    ingredients: meal.ingredients,
                    description: meal.description,
                    price: meal.price,
                    prep_time: meal.prep_time,
                    distributor_name: meal.distributor_name,
                    distributor_email: meal.distributor_email,
                    rating: meal.rating,
                    likes: meal.likes,
                    reviews_count: meal.reviews_count,
                    posted_at: meal.posted_at,
                };

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
                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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
                    <p className="text-center py-6 text-gray-500">
                        No upcoming meals found.
                    </p>
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
                        className="select select-sm border border-gray-300 rounded-md"
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
                                ? "btn-primary text-white"
                                : "btn-outline text-gray-700"
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
    );
};

export default UpcomingMealsReview;
