import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MdEmail, MdOutlineBadge } from "react-icons/md";
import { FaUtensils, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: meals = [] } = useQuery({
        queryKey: ['adminMeals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/distributor/${user.email}`);
            return res.data;
        },
    });

    const { data: admin = {} } = useQuery({
        queryKey: ['adminEmail', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`users/search?keyword=${user.email}`);
            const matchedAdmin = res.data?.[0];
            // console.log(matchedAdmin?.name);
            return matchedAdmin;
        },
    });

    console.log(admin);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen py-16 px-4"
        >
            <div className="max-w-6xl bg-white mx-auto shadow-2xl rounded-3xl p-10 border border-base-300">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Profile Picture */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative group"
                    >
                        <img
                            src={user?.photoURL || "https://i.ibb.co/8bqG6Cw/default-user.png"}
                            alt="Admin"
                            className="w-52 h-52 rounded-full border-4 border-primary object-cover shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary opacity-0 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                    </motion.div>

                    {/* Admin Info */}
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="text-4xl font-extrabold text-primary">
                            {user?.displayName || "Admin"}
                        </h2>
                        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-lg">
                            <MdEmail className="text-xl text-accent" />
                            {user?.email}
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-lg">
                            <FaUserShield className="text-xl text-info" />
                            Role: <span className="font-semibold text-black">Admin</span>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-center md:text-left">
                            <div className="bg-success/10 border border-success text-success px-6 py-3 rounded-xl shadow-sm flex items-center justify-center gap-3 font-semibold text-lg">
                                <FaUtensils /> Meals Added: <span>{meals.length}</span>
                            </div>

                            <div className="bg-accent/10 border border-accent text-accent px-6 py-3 rounded-xl shadow-sm flex items-center justify-center gap-3 font-semibold text-lg">
                                <MdOutlineBadge /> Badge: <span className="capitalize">{admin.badge}</span>
                            </div>

                            <div className="bg-warning/10 border border-warning text-warning px-6 py-3 rounded-xl shadow-sm flex items-center justify-center gap-3 font-semibold text-lg">
                                <FaCalendarAlt /> Joined: <span>{new Date(admin.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AdminProfile;
