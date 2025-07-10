import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdClose, MdFastfood, MdAttachMoney, MdImage, MdDescription, MdCategory } from "react-icons/md";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateMealModal = ({ isOpen, closeModal, mealData, refetch }) => {
    const { _id, title, price, category, image, ingredients, description } = mealData || {};
    const [imageURL, setImageURL] = useState(image);
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title,
            price,
            category,
            ingredients: ingredients?.join(", "),
            description
        }
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        try {
            setUploading(true);
            const res = await axios.post(uploadUrl, formData);
            setImageURL(res.data.data.url);
            toast.success("Image uploaded");
        } catch (err) {
            toast.error("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        const updatedData = {
            title: data.title,
            price: parseFloat(data.price),
            category: data.category,
            image: imageURL,
            ingredients: data.ingredients.split(",").map(i => i.trim()),
            description: data.description,
        };

        try {
            const res = await axiosSecure.patch(`/meals/update/${_id}`, updatedData);
            console.log(res.data.message);
            if (res.data?.success === true > 0) {
                toast.success("Meal updated successfully!");
                closeModal();
                refetch();
                reset();
            }
        } catch (err) {
            toast.error("Failed to update meal");
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white max-w-3xl w-[90%] rounded-xl shadow-2xl border border-primary/10 relative p-8 overflow-y-auto max-h-[90vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                {/* Close */}
                <button onClick={closeModal} className="absolute top-3 right-4 text-red-600 text-2xl">
                    <MdClose />
                </button>

                <h2 className="text-3xl font-bold text-primary text-center mb-8">✏️ Update Meal</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold"><MdFastfood className="inline mr-1" /> Title</label>
                        <input {...register("title", { required: true })} className="input input-bordered w-full" />
                        {errors.title && <p className="text-error text-sm">Title is required</p>}
                    </div>

                    <div>
                        <label className="label font-semibold"><MdAttachMoney className="inline mr-1" /> Price</label>
                        <input type="number" step="0.01" {...register("price", { required: true })} className="input input-bordered w-full" />
                        {errors.price && <p className="text-error text-sm">Price is required</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold"><MdCategory className="inline mr-1" /> Category</label>
                        <select {...register("category", { required: true })} className="select select-bordered w-full">
                            <option value="">Select category</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Snack</option>
                            <option>Dessert</option>
                            <option>Beverage</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold"><MdImage className="inline mr-1" /> Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                        {uploading && <p className="text-info mt-1">Uploading...</p>}
                        {imageURL && <img src={imageURL} alt="Preview" className="w-24 mt-2 rounded border" />}
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold"><MdDescription className="inline mr-1" /> Ingredients (comma separated)</label>
                        <textarea {...register("ingredients", { required: true })} className="textarea textarea-bordered w-full" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-semibold"><MdDescription className="inline mr-1" /> Description</label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" />
                    </div>

                    <div className="md:col-span-2 text-center">
                        <button type="submit" className="btn btn-success px-8 rounded-full text-white hover:scale-105 transition-transform">
                            ✅ Update Meal
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default UpdateMealModal;
