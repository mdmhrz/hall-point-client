import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import UpdateMealModal from "./UpdateMealModal";
import Swal from "sweetalert2";

const AllMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedMeal, setSelectedMeal] = useState(null); // stores meal to update
    const [modalOpen, setModalOpen] = useState(false); // controls modal visibility

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ["allMeals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals/sorted");
            return res.data;
        },
    });

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
    ;

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">🍽️ All Meals Overview</h2>

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
                        {meals.map((meal, idx) => (
                            <tr key={meal._id} className="bg-base-100/50 text-sm shadow-md hover:shadow-lg rounded-2xl">
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
                                            setModalOpen(true)
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

            {/* Update Modal */}
            {selectedMeal && (
                <UpdateMealModal
                    isOpen={modalOpen}
                    closeModal={() => setModalOpen(false)}
                    mealData={selectedMeal}
                    refetch={refetch}
                ></UpdateMealModal>
            )}
        </div>
    );
};

export default AllMeals;
