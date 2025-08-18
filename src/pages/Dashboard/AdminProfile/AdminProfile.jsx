import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MdEmail,
    MdOutlineBadge,
    MdEdit,
    MdSave,
    MdCancel,
    MdPhone,
    MdLocationOn,
    MdPerson,
    MdCloudUpload
} from "react-icons/md";
import { FaUtensils, FaCalendarAlt, FaUserShield, FaCamera, FaSpinner } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../../hooks/useUserRole";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import axios from "axios";

const AdminProfile = () => {
    const { user, updateUserProfile, refreshUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useUserRole();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isPhotoUploading, setIsPhotoUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // get admin distributorship information
    const { data: meals = [] } = useQuery({
        queryKey: ['adminMeals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/distributor/${user.email}`);
            return res.data;
        },
    });

    // get admin email and information
    const { data: admin = {}, isLoading, refetch } = useQuery({
        queryKey: ['adminEmail', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`users/search?keyword=${user.email}`);
            const matchedAdmin = res.data?.[0];
            return matchedAdmin;
        },
    });

    // Reset photoPreview when user photo changes
    useEffect(() => {
        if (user?.photoURL && !isEditing) {
            setPhotoPreview(null);
        }
    }, [user?.photoURL, isEditing]);

    const updateProfileMutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/users/updateInfo/${admin._id}`, updatedData);
            return res.data;
        },
        onSuccess: async (data) => {
            // Update Firebase user profile
            await updateUserProfile({
                displayName: editableData.displayName,
                photoURL: editableData.photoURL,
            });

            // Refresh the user context to get updated info
            if (refreshUser) {
                await refreshUser();
            }

            // Invalidate and refetch queries
            queryClient.invalidateQueries(['adminEmail', user?.email]);
            await refetch();

            toast.success('Profile updated successfully!');
            setIsEditing(false);
            setPhotoPreview(null);
        },
        onError: (error) => {
            toast.error('Failed to update profile');
            console.error(error);
        }
    });

    const handleEdit = () => {
        setEditableData({
            displayName: user?.displayName || admin?.name || '',
            email: user?.email || '',
            phone: admin?.phone || '',
            address: admin?.address || '',
            photoURL: user?.photoURL || admin?.photoURL || ''
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableData({});
        setPhotoPreview(null);
    };

    const handleSubmit = async () => {
        try {
            await updateProfileMutation.mutateAsync(editableData);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setEditableData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const uploadImage = async (image) => {
        if (!image) return null;

        if (image.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return null;
        }

        if (!image.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return null;
        }

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        try {
            setIsPhotoUploading(true);
            const res = await axios.post(imageUploadUrl, formData);
            const imageUrl = res.data.data.url;
            setPhotoPreview(imageUrl);
            setEditableData(prev => ({
                ...prev,
                photoURL: imageUrl
            }));
            toast.success('Image uploaded successfully!');
            return imageUrl;
        } catch (err) {
            toast.error('Image upload failed.');
            return null;
        } finally {
            setIsPhotoUploading(false);
        }
    };

    const handlePhotoChange = async (e) => {
        const image = e.target.files[0];
        if (image) {
            await uploadImage(image);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadImage(e.dataTransfer.files[0]);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    // Get current photo URL with priority: photoPreview > user.photoURL > admin.photoURL > default
    const getCurrentPhotoURL = () => {
        return photoPreview || user?.photoURL || admin?.photoURL || "https://i.ibb.co/8bqG6Cw/default-user.png";
    };

    return (
        <>
            <Helmet>
                <title>Admin Profile | HallPoint</title>
            </Helmet>

            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 bg-base-200"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
                        {/* Profile Card */}
                        <motion.div
                            variants={itemVariants}
                            className="xl:col-span-2 bg-base-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-base-300"
                        >
                            {/* Edit Controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2">
                                    <MdPerson className="text-primary" />
                                    Personal Information
                                </h2>

                                <AnimatePresence mode="wait">
                                    {!isEditing ? (
                                        <motion.button
                                            key="edit"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={handleEdit}
                                            className="btn btn-primary btn-sm gap-2 w-full sm:w-auto"
                                        >
                                            <MdEdit />
                                            Edit Profile
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            key="actions"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
                                        >
                                            <button
                                                onClick={handleSubmit}
                                                disabled={updateProfileMutation.isLoading}
                                                className="btn btn-success btn-sm gap-2 order-2 sm:order-1"
                                            >
                                                <MdSave />
                                                {updateProfileMutation.isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="btn btn-error btn-sm gap-2 order-1 sm:order-2"
                                            >
                                                <MdCancel />
                                                Cancel
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                                {/* Profile Photo Section */}
                                <motion.div
                                    className="flex flex-col items-center space-y-4 order-2 lg:order-1"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="relative group">
                                        <motion.img
                                            src={getCurrentPhotoURL()}
                                            alt="Profile"
                                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-primary shadow-2xl"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />

                                        {isEditing && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            >
                                                {isPhotoUploading ? (
                                                    <FaSpinner className="text-white text-2xl animate-spin" />
                                                ) : (
                                                    <>
                                                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                                            <FaCamera className="text-white text-2xl mb-1" />
                                                            <span className="text-white text-xs">Change Photo</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handlePhotoChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </>
                                                )}
                                            </motion.div>
                                        )}

                                        <motion.div
                                            className="absolute inset-0 rounded-full border-4 border-dashed border-secondary opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>

                                    {/* Drag & Drop Area for mobile/better UX */}
                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`w-full max-w-xs p-4 border-2 border-dashed rounded-xl transition-all duration-300 ${dragActive
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-base-300 hover:border-primary/50'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <label className="flex flex-col items-center justify-center cursor-pointer">
                                                {isPhotoUploading ? (
                                                    <>
                                                        <FaSpinner className="text-primary text-2xl animate-spin mb-2" />
                                                        <span className="text-sm text-primary font-medium">Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <MdCloudUpload className="text-primary text-3xl mb-2" />
                                                        <span className="text-sm text-base-content/70 text-center">
                                                            Drag & drop or click to upload
                                                        </span>
                                                        <span className="text-xs text-base-content/50 mt-1">
                                                            PNG, JPG up to 5MB
                                                        </span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhotoChange}
                                                    className="hidden"
                                                    disabled={isPhotoUploading}
                                                />
                                            </label>
                                        </motion.div>
                                    )}

                                    <div className="text-center">
                                        <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                                            {user?.displayName || admin?.name || 'Admin'}
                                        </h3>
                                        <div className="badge badge-primary badge-lg mt-2">
                                            {role || 'Administrator'}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Editable Fields */}
                                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                                    {/* Name Field */}
                                    <motion.div variants={itemVariants} className="form-control">
                                        <label className="label">
                                            <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                                                <MdPerson className="text-primary" />
                                                Full Name
                                            </span>
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editableData.displayName || ''}
                                                onChange={(e) => handleInputChange('displayName', e.target.value)}
                                                className="input input-bordered input-primary focus:input-primary w-full"
                                                placeholder="Enter your full name"
                                            />
                                        ) : (
                                            <div className="p-3 bg-base-200 rounded-lg border border-base-300 min-h-[48px] flex items-center">
                                                {user?.displayName || admin?.name || 'Not provided'}
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Email Field */}
                                    <motion.div variants={itemVariants} className="form-control">
                                        <label className="label">
                                            <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                                                <MdEmail className="text-accent" />
                                                Email Address
                                            </span>
                                        </label>
                                        <div className="p-3 bg-base-200 rounded-lg border border-base-300 text-base-content/70 min-h-[48px] flex items-center">
                                            {user?.email}
                                        </div>
                                    </motion.div>

                                    {/* Phone Field */}
                                    <motion.div variants={itemVariants} className="form-control">
                                        <label className="label">
                                            <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                                                <MdPhone className="text-info" />
                                                Mobile Number
                                            </span>
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editableData.phone || ''}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="input input-bordered input-primary focus:input-primary w-full"
                                                placeholder="Enter your mobile number"
                                            />
                                        ) : (
                                            <div className="p-3 bg-base-200 rounded-lg border border-base-300 min-h-[48px] flex items-center">
                                                {admin?.phone || 'Not provided'}
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Address Field */}
                                    <motion.div variants={itemVariants} className="form-control">
                                        <label className="label">
                                            <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                                                <MdLocationOn className="text-warning" />
                                                Address
                                            </span>
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={editableData.address || ''}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className="textarea textarea-bordered textarea-primary focus:textarea-primary w-full resize-none"
                                                placeholder="Enter your address"
                                                rows="3"
                                            />
                                        ) : (
                                            <div className="p-3 bg-base-200 rounded-lg border border-base-300 min-h-[80px] flex items-start">
                                                <span className="whitespace-pre-wrap">
                                                    {admin?.address || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Professional Info Sidebar */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Role Card */}
                            <div className="bg-base-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-base-300">
                                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                    <FaUserShield className="text-info" />
                                    Professional Info
                                </h3>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-info/10 rounded-xl border border-info/20">
                                        <span className="text-sm sm:text-base text-base-content/70">Role</span>
                                        <span className="font-semibold text-info text-sm sm:text-base">{role || 'Administrator'}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-xl border border-success/20">
                                        <span className="text-sm sm:text-base text-base-content/70 flex items-center gap-2">
                                            <FaUtensils className="text-success" />
                                            Meals Added
                                        </span>
                                        <span className="font-semibold text-success text-sm sm:text-base">{meals.length}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-xl border border-accent/20">
                                        <span className="text-sm sm:text-base text-base-content/70 flex items-center gap-2">
                                            <MdOutlineBadge className="text-accent" />
                                            Badge
                                        </span>
                                        <span className="font-semibold text-accent capitalize text-sm sm:text-base">
                                            {admin?.badge || 'Standard'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-xl border border-warning/20">
                                        <span className="text-sm sm:text-base text-base-content/70 flex items-center gap-2">
                                            <FaCalendarAlt className="text-warning" />
                                            Joined
                                        </span>
                                        <span className="font-semibold text-warning text-sm sm:text-base">
                                            {admin?.created_at ? new Date(admin.created_at).toLocaleDateString() : 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20">
                                <h4 className="text-base sm:text-lg font-bold text-base-content mb-4">Quick Stats</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="text-center p-3 sm:p-4 bg-base-100/50 rounded-xl">
                                        <div className="text-xl sm:text-2xl font-bold text-primary">{meals.length}</div>
                                        <div className="text-xs sm:text-sm text-base-content/70">Total Meals</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-base-100/50 rounded-xl">
                                        <div className="text-xl sm:text-2xl font-bold text-secondary">
                                            {admin?.created_at ? Math.floor((Date.now() - new Date(admin.created_at)) / (1000 * 60 * 60 * 24)) : 0}
                                        </div>
                                        <div className="text-xs sm:text-sm text-base-content/70">Days Active</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default AdminProfile;