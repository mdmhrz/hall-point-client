import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { MdFastfood, MdCategory, MdAttachMoney, MdImage, MdDescription, MdRestaurantMenu, MdPublic, MdAccessTime } from "react-icons/md";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddMeal = () => {
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
            console.error("Image upload failed", error);
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
            rating: 0,
            likes: 0,
            reviews_count: 0,
            posted_at: new Date().toISOString()
        };
        console.log(mealData);

        try {
            const res = await axiosSecure.post("/meals", mealData);
            if (res.data.insertedId) {
                console.log(res.data);
                setImageURL("");
                toast.success("Meal added successfully!");
                reset();
            }
        } catch (err) {
            console.error("Error adding meal:", err);
        }
    };

    return (
        <>
            <Helmet>
                <title>Add Meal | HallPoint</title>
            </Helmet>

            <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-tr from-base-100 via-base-200 to-base-100 shadow-2xl rounded-3xl mt-10 border border-base-300">
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-12">🍽️ Add New Meal</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Title */}
                    <div className="col-span-1">
                        <label className="label font-semibold">
                            <MdFastfood className="inline mr-2 " /> Meal Title
                        </label>
                        <input {...register("title", { required: "Title is required" })} className="input input-bordered w-full" placeholder="Enter meal title" />
                        {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Category Dropdown */}
                    <div className="col-span-1">
                        <label className="label font-semibold">
                            <MdCategory className="inline mr-2" /> Category
                        </label>
                        <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                            <option value="">Select category</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                        {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    {/* Cuisine Dropdown */}
                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdPublic className="inline mr-2" /> Cuisine Type
                        </label>
                        <select {...register("cuisine", { required: "Cuisine type is required" })} className="select select-bordered w-full">
                            <option value="">Select cuisine</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Thai">Thai</option>
                            <option value="American">American</option>
                            <option value="Turkish">Turkish</option>
                        </select>
                        {errors.cuisine && <p className="text-error text-sm mt-1">{errors.cuisine.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdImage className="inline mr-2" /> Upload Image
                        </label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                        {uploading && <p className="text-info text-sm mt-1">Uploading...</p>}
                        {imageURL && <img src={imageURL} alt="Uploaded" className="w-32 h-32 rounded-md mt-3 object-cover border border-base-300" />}
                    </div>

                    {/* Ingredients */}
                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdRestaurantMenu className="inline mr-2" /> Ingredients (comma separated)
                        </label>
                        <textarea {...register("ingredients", { required: "Ingredients are required" })} className="textarea textarea-bordered w-full" placeholder="e.g., Chicken, Rice, Spices" />
                        {errors.ingredients && <p className="text-error text-sm mt-1">{errors.ingredients.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="label font-semibold">
                            <MdDescription className="inline mr-2" /> Description
                        </label>
                        <textarea {...register("description", { required: "Description is required" })} className="textarea textarea-bordered w-full" placeholder="Write a short description" />
                        {errors.description && <p className="text-error text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Price */}
                    <div className="col-span-1">
                        <label className="label font-semibold">
                            <MdAttachMoney className="inline mr-2" /> Price ($)
                        </label>
                        <input type="number" step="0.01" {...register("price", { required: "Price is required" })} className="input input-bordered w-full" placeholder="Price in USD" />
                        {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    {/* Preparation Time */}
                    <div className="col-span-1">
                        <label className="label font-semibold">
                            <MdAccessTime className="inline mr-2" /> Preparation Time (mins)
                        </label>
                        <input type="text" {...register("prep_time", { required: "Preparation time is required" })} className="input input-bordered w-full" placeholder="e.g. 30 mins" />
                        {errors.prep_time && <p className="text-error text-sm mt-1">{errors.prep_time.message}</p>}
                    </div>

                    {/* Distributor Info Row */}
                    <div className="col-span-1">
                        <label className="label font-semibold">
                            Distributor Name
                        </label>
                        <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-base-200 text-base-content/70" />
                    </div>

                    <div className="col-span-1">
                        <label className="label font-semibold">
                            Distributor Email
                        </label>
                        <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200 text-base-content/70" />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 text-center">
                        <button type="submit" className="btn btn-primary px-10 text-lg rounded-full shadow-md hover:scale-105 transition-transform duration-300">Add Meal</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMeal;
