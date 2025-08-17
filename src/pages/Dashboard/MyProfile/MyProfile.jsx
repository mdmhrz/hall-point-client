import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaMedal } from "react-icons/fa";
import { MdEmail, MdCalendarMonth } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

const badgeColors = {
    Bronze: "text-amber-600",
    Silver: "text-gray-400",
    Gold: "text-yellow-400",
};

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    return (
        <>
            <Helmet>
                <title>My Profile | HallPoint</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl mx-auto px-4 py-10"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-base-100 rounded-3xl shadow-lg p-6 md:p-10 relative overflow-hidden border border-base-300"
                >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-tr from-purple-100 via-indigo-100 to-transparent rounded-full blur-2xl opacity-50" />

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-32 h-32 rounded-full shadow-md border-4 border-primary object-cover"
                        />
                        <div className="text-center md:text-left space-y-2">
                            <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
                                <IoPerson className="text-primary" />
                                {userData?.name || "Unknown User"}
                            </h2>
                            <p className="text-base-content/70 flex items-center gap-2">
                                <MdEmail className="text-primary/80" />
                                {userData?.email}
                            </p>
                            <div className="flex items-center gap-2">
                                <FaMedal className={`${badgeColors[userData?.badge]} text-xl`} />
                                <span className={`font-semibold ${badgeColors[userData?.badge]}`}>
                                    {userData?.badge || "No Badge"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-dashed border-base-300"></div>

                    {/* Extra Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-base-content/70">
                            <MdCalendarMonth className="text-primary/80" />
                            <span>
                                Member Since:{" "}
                                <strong>
                                    {userData?.created_at
                                        ? dayjs(userData.createdAt).format("MMM D, YYYY")
                                        : "Unknown"}
                                </strong>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-base-content/70">
                            <BsStars className="text-primary/80" />
                            <span>
                                Plan Type:{" "}
                                <strong className="capitalize">{userData?.role || "Basic Member"}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Completion Bar */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-base-content/70 mb-1">Profile Completion</p>
                        <div className="w-full h-3 bg-base-300 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <p className="text-xs text-right text-base-content/50 mt-1">75% Complete</p>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default MyProfile;
