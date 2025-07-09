import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import {
    MdClose,
    MdFastfood,
    MdCategory,
    MdAttachMoney,
    MdImage,
    MdDescription,
    MdRestaurantMenu,
    MdPublic,
    MdAccessTime,
} from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddUpcomingMealModal = ({ isOpen, closeModal, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);
    const [imageURL, setImageURL] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        try {
            setUploading(true);
            const res = await axios.post(uploadUrl, formData);
            setImageURL(res.data.data.url);
        } catch (error) {
            toast.error("Image upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        const mealData = {
            title: data.title,
            category: data.category,
            cuisine: data.cuisine,
            image: imageURL,
            ingredients: data.ingredients.split(",").map((item) => item.trim()),
            description: data.description,
            price: parseFloat(data.price),
            prep_time: data.prep_time,
            distributor_name: user?.displayName,
            distributor_email: user?.email,
        };

        console.log(mealData);
        try {
            const res = await axiosSecure.post("/upcoming-meals", mealData);
            if (res.data.insertedId) {
                toast.success("Upcoming meal added!");
                setImageURL("");
                reset();
                closeModal();
                refetch();
            }
        } catch (err) {
            toast.error("Failed to add upcoming meal!");
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 sm:p-8 relative border border-primary/10 bg-gradient-to-br from-white via-base-100 to-white"
            >
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl z-20"
                    title="Close"
                >
                    <MdClose />
                </button>

                <h2 className="text-3xl font-extrabold text-center mb-8 text-primary">🍱 Add Upcoming Meal</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">
                            <MdFastfood className="inline mr-2" /> Title
                        </label>
                        <input {...register("title", { required: "Title is required" })} className={`input input-bordered w-full ${errors.title ? "input-error border-error" : ""}`} />
                        {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="label font-semibold">
                            <MdCategory className="inline mr-2" /> Category
                        </label>
                        <select {...register("category", { required: true })} className={`select select-bordered w-full ${errors.category ? "select-error border-error" : ""}`}>
                            <option value="">Select</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Snack</option>
                            <option>Dessert</option>
                            <option>Beverage</option>
                        </select>
                    </div>

                    <div>
                        <label className="label font-semibold">
                            <MdPublic className="inline mr-2" /> Cuisine
                        </label>
                        <select {...register("cuisine", { required: true })} className={`select select-bordered w-full ${errors.cuisine ? "select-error border-error" : ""}`}>
                            <option value="">Select</option>
                            <option>Bengali</option>
                            <option>Indian</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Thai</option>
                            <option>American</option>
                            <option>Turkish</option>
                        </select>
                    </div>

                    <div>
                        <label className="label font-semibold">
                            <MdImage className="inline mr-2" /> Upload Image
                        </label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                        {uploading && <p className="text-sm text-info">Uploading...</p>}
                        {imageURL && <img src={imageURL} className="w-20 mt-2 rounded-md border border-base-200" />}
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdRestaurantMenu className="inline mr-2" /> Ingredients
                        </label>
                        <textarea {...register("ingredients", { required: true })} className={`textarea textarea-bordered w-full ${errors.ingredients ? "textarea-error border-error" : ""}`} placeholder="Separate with commas" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdDescription className="inline mr-2" /> Description
                        </label>
                        <textarea {...register("description", { required: true })} className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error border-error" : ""}`} />
                    </div>

                    <div>
                        <label className="label font-semibold">
                            <MdAttachMoney className="inline mr-2" /> Price ($)
                        </label>
                        <input type="number" step="0.01" {...register("price", { required: true })} className={`input input-bordered w-full ${errors.price ? "input-error border-error" : ""}`} />
                    </div>

                    <div>
                        <label className="label font-semibold">
                            <MdAccessTime className="inline mr-2" /> Prep Time (min)
                        </label>
                        <input {...register("prep_time", { required: true })} className={`input input-bordered w-full ${errors.prep_time ? "input-error border-error" : ""}`} />
                    </div>

                    <div>
                        <label className="label font-semibold">Distributor Name</label>
                        <input value={user?.displayName} readOnly className="input input-bordered w-full bg-base-200 text-gray-500" />
                    </div>
                    <div>
                        <label className="label font-semibold">Distributor Email</label>
                        <input value={user?.email} readOnly className="input input-bordered w-full bg-base-200 text-gray-500" />
                    </div>

                    <div className="md:col-span-2 text-center mt-4">
                        <button type="submit" className="btn btn-primary px-10 rounded-full shadow-md hover:scale-105 transition-transform">
                            Submit Meal
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddUpcomingMealModal;
