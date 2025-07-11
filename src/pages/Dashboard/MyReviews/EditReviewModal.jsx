import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EditReviewModal = ({ review, closeModal, refetch }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { text: review.text },
    });
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            await axiosSecure.patch(`/reviews/${review._id}`, data);
            toast.success("Review updated.");
            refetch();
            closeModal();
        } catch (err) {
            toast.error("Update failed.");
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
            >
                <h2 className="text-xl font-semibold text-indigo-600 mb-4">Edit Your Review</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <textarea
                        {...register("text", { required: true })}
                        className="w-full border rounded-lg p-3 resize-none"
                        rows={4}
                        defaultValue={review.comment}
                        placeholder="Update your review..."
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditReviewModal;
