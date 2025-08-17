import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import {
    FiUsers,
    FiShoppingBag,
    FiClock,
    FiStar,
    FiDollarSign,
    FiCalendar,
    FiTrendingUp,
    FiPieChart,
    FiShield,
    FiActivity
} from "react-icons/fi";

// Theme-friendly colors using CSS custom properties
const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#AA66CC"];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", damping: 20, stiffness: 300 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.8,
            type: "spring",
            damping: 25,
            stiffness: 200
        }
    }
};

const AdminDashboardOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["adminDashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/admin-dashboard-overview");
            return res.data;
        },
    });

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (isLoading) return <Loading />;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (percent < 0.05) return null; // Don't show labels for very small slices

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="hsl(var(--p-c))"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-bold drop-shadow-sm"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-base-100 p-4 shadow-2xl rounded-2xl border border-primary/20 backdrop-blur-sm"
                >
                    <p className="font-bold text-base-content text-lg">{payload[0].payload._id}</p>
                    <p className="text-sm text-primary font-semibold">{payload[0].value} meals</p>
                    <p className="text-xs text-base-content/60 mt-1">
                        Category distribution
                    </p>
                </motion.div>
            );
        }
        return null;
    };

    const statsData = [
        {
            label: "Approved Meals",
            value: data.totalMeals,
            icon: <FiShoppingBag />,
            color: "success",
            trend: "+8.2%",
            description: "Total meals approved"
        },
        {
            label: "Upcoming Meals",
            value: data.upcomingMeals,
            icon: <FiCalendar />,
            color: "primary",
            trend: "+12.5%",
            description: "Scheduled meals"
        },
        {
            label: "Pending Requests",
            value: data.pendingRequests,
            icon: <FiClock />,
            color: "warning",
            trend: "0%",
            description: "Awaiting approval"
        },
        {
            label: "Total Users",
            value: data.totalUsers,
            icon: <FiUsers />,
            color: "info",
            trend: "+15.3%",
            description: "Registered users"
        },
        {
            label: "Reviews",
            value: data.totalReviews,
            icon: <FiStar />,
            color: "accent",
            trend: "+6.7%",
            description: "User feedback"
        },
        {
            label: "Revenue",
            value: `$${data.totalRevenue?.toFixed(2)}`,
            icon: <FiDollarSign />,
            color: "success",
            trend: "+23.1%",
            description: "Total earnings"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 p-4 md:p-6"
        >
            {/* Enhanced Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-3xl p-6 md:p-8 border border-primary/20"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <FiShield className="text-2xl text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Welcome back, {user?.displayName || 'Admin'}!
                                </h1>
                                <p className="text-base-content/70 font-medium">
                                    Administrative Dashboard
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 text-base-content/70"
                        >
                            <FiCalendar className="text-primary" />
                            <span className="font-medium">{currentDate}</span>
                            <span className="text-base-content/50">•</span>
                            <span className="font-medium">{currentTime}</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <div className="flex items-center gap-2 bg-base-100/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-success/30">
                            <FiActivity className="text-success text-xl" />
                            <div className="text-right">
                                <p className="text-xs text-base-content/60 font-medium">System Status</p>
                                <p className="text-sm font-bold text-success">All Systems Operational</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-base-100/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-primary/30">
                            <FiTrendingUp className="text-primary text-xl" />
                            <div className="text-right">
                                <p className="text-xs text-base-content/60 font-medium">Platform Growth</p>
                                <p className="text-sm font-bold text-primary">+18.5% This Month</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {statsData.map((stat, index) => (
                    <motion.div key={stat.label} variants={cardVariants}>
                        <AdminStatsCard {...stat} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Enhanced Chart Section */}
            <motion.div
                variants={chartVariants}
                initial="hidden"
                animate="visible"
                className="relative overflow-hidden bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-8"
            >
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>

                <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-base-content flex items-center gap-3">
                            <FiPieChart className="text-primary" />
                            Meal Distribution by Category
                        </h3>
                        <p className="text-base-content/60">Overview of meal categories across the platform</p>
                    </div>

                    <div className="mt-4 lg:mt-0 stats stats-horizontal shadow-lg bg-base-200">
                        <div className="stat py-2 px-4">
                            <div className="stat-title text-xs">Total Categories</div>
                            <div className="stat-value text-lg text-primary">{data.categoryDistribution?.length || 0}</div>
                        </div>
                        <div className="stat py-2 px-4">
                            <div className="stat-title text-xs">Total Meals</div>
                            <div className="stat-value text-lg text-accent">{data.totalMeals || 0}</div>
                        </div>
                    </div>
                </div>

                {!data.categoryDistribution || data.categoryDistribution?.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-96 text-base-content/50 bg-base-200/50 rounded-2xl"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FiPieChart className="text-6xl mb-4 text-primary/50" />
                        </motion.div>
                        <p className="text-lg font-medium">No category data available</p>
                        <p className="text-sm mt-1">Add meals to see category distribution</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* Enhanced Chart */}
                        <motion.div
                            className="lg:col-span-2 h-96 relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <defs>
                                        <filter id="shadow">
                                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
                                        </filter>
                                    </defs>
                                    <Pie
                                        data={data.categoryDistribution}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={140}
                                        innerRadius={70}
                                        paddingAngle={2}
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                        filter="url(#shadow)"
                                    >
                                        {data.categoryDistribution.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                stroke="hsl(var(--b1))"
                                                strokeWidth={3}
                                            />
                                        ))}
                                        <Label
                                            value="Categories"
                                            position="center"
                                            className="text-lg font-bold fill-base-content/70"
                                        />
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Enhanced Legend */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <div className="bg-base-200/50 rounded-2xl p-6">
                                <h4 className="font-bold text-lg text-base-content mb-4 flex items-center gap-2">
                                    <FiPieChart className="text-primary" />
                                    Distribution
                                </h4>
                                <div className="space-y-3">
                                    {data.categoryDistribution?.map((category, index) => (
                                        <motion.div
                                            key={category._id}
                                            className="flex items-center justify-between p-3 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-base-300/50"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-4 h-4 rounded-full shadow-sm"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className="font-semibold text-base-content text-sm">{category._id}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-primary">{category.count}</div>
                                                <div className="text-xs text-base-content/60">meals</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

const AdminStatsCard = ({ label, value, icon, color, trend, description }) => (
    <motion.div
        className="group relative overflow-hidden bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
    >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <div className="text-2xl">{icon}</div>
                </div>
                {trend && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${trend.startsWith('+') ? 'bg-success/10 text-success' :
                        trend.startsWith('-') ? 'bg-error/10 text-error' :
                            'bg-base-200 text-base-content/60'
                        }`}>
                        {trend}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-bold text-base-content/60 uppercase tracking-wider">
                    {label}
                </h4>
                <p className="text-3xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {value || 0}
                </p>
                <p className="text-xs text-base-content/50 font-medium">
                    {description}
                </p>
            </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out"></div>
    </motion.div>
);

export default AdminDashboardOverview;