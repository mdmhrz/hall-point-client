import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import UpdateMealModal from "./UpdateMealModal";
import Swal from "sweetalert2";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const AllMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ["allMeals", currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/sorted?page=${currentPage}&limit=${itemsPerPage}`);
            setTotalCount(res.data.totalCount); // save total for pagination
            return res.data.data; // return meals array
        },
        keepPreviousData: true
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This meal will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/meals/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("The meal has been deleted.");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error!", "Failed to delete the meal.", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="text-center mb-10 px-4 md:px-0">
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
                    🍽️ All Meals Admin Panel
                </h2>
                <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
                    View, edit, or remove meals. Keep the data fresh!
                </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-base-200">
                <table className="min-w-full table-fixed border-separate border-spacing-y-4">
                    <thead>
                        <tr className="bg-primary text-white text-left text-sm">
                            <th className="py-4 px-4 rounded-l-2xl">Meal Title</th>
                            <th className="py-4 px-4">Likes</th>
                            <th className="py-4 px-4">Reviews</th>
                            <th className="py-4 px-4">Rating</th>
                            <th className="py-4 px-4">Distributor</th>
                            <th className="py-4 px-4">Price ($)</th>
                            <th className="py-4 px-4 rounded-r-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr
                                key={meal._id}
                                className="bg-base-100/50 text-sm shadow-md hover:shadow-lg rounded-2xl"
                            >
                                <td className="py-4 px-4 font-semibold text-primary">{meal.title}</td>
                                <td className="py-4 px-4">{meal.likes || 0}</td>
                                <td className="py-4 px-4">{meal.reviews_count || 0}</td>
                                <td className="py-4 px-4">{meal.rating.toFixed(1)}</td>
                                <td className="py-4 px-4 text-gray-700">{meal.distributor_name}</td>
                                <td className="py-4 px-4 font-bold">${meal.price}</td>
                                <td className="py-4 px-4 space-x-2">
                                    <Link
                                        to={`/meal-details/${meal._id}`}
                                        className="btn btn-sm btn-info rounded-full shadow-md"
                                    >
                                        <MdVisibility className="text-lg" />
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedMeal(meal);
                                            setModalOpen(true);
                                        }}
                                        className="btn btn-sm btn-warning rounded-full shadow-md"
                                    >
                                        <MdEdit className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meal._id)}
                                        className="btn btn-sm btn-error rounded-full shadow-md"
                                    >
                                        <MdDelete className="text-lg" />
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
                                ? "bg-primary text-white"
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

            {/* Update Modal */}
            {selectedMeal && (
                <UpdateMealModal
                    isOpen={modalOpen}
                    closeModal={() => setModalOpen(false)}
                    mealData={selectedMeal}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default AllMeals;
