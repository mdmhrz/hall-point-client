import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FiCheckCircle, FiClock, FiDollarSign, FiPieChart, FiStar } from "react-icons/fi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const chartVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3 } }
};

const UserDashboardOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["userDashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/user-dashboard-overview?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-medium"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                    <p className="font-semibold text-gray-800">{payload[0].payload._id}</p>
                    <p className="text-sm text-gray-600">{payload[0].value} requests</p>
                    <p className="text-xs text-gray-500">
                        {((payload[0].payload.count / data.totalMeals) * 100).toFixed(1)}% of total
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 p-4 md:p-6"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user?.displayName} 👋</h2>
                    <p className="text-gray-500 mt-1">{currentDate}</p>
                </div>
                <div className="mt-2 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
                    <p className="text-sm font-medium text-blue-600">User Dashboard</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                >
                    <Card
                        label="Approved Meals"
                        value={data.totalMeals || 0}
                        icon={<FiCheckCircle className="text-green-500" />}
                    />
                </motion.div>
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                >
                    <Card
                        label="Meal Requests"
                        value={data.mealRequests || 0}
                        icon={<FiPieChart className="text-blue-500" />}
                    />
                </motion.div>
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                >
                    <Card
                        label="Pending Requests"
                        value={data.pendingRequests || 0}
                        icon={<FiClock className="text-yellow-500" />}
                    />
                </motion.div>
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                >
                    <Card
                        label="Reviews Given"
                        value={data.reviewCount || 0}
                        icon={<FiStar className="text-purple-500" />}
                    />
                </motion.div>
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                >
                    <Card
                        label="Total Paid"
                        value={`$${(data.totalPaid || 0).toFixed(2)}`}
                        icon={<FiDollarSign className="text-cyan-500" />}
                    />
                </motion.div>
            </div>

            <motion.div
                variants={chartVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6"
            >
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Meal Request Categories</h3>
                    <div className="mt-2 md:mt-0 flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-500">Categories distribution</span>
                    </div>
                </div>

                {data.categoryDistribution?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <FiPieChart className="text-4xl mb-2" />
                        <p>No category data available</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="w-full lg:w-1/2 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.categoryDistribution}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        innerRadius={60}
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                    >
                                        {data.categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        <Label
                                            value="Categories"
                                            position="center"
                                            className="text-sm font-medium fill-gray-500"
                                        />
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-700">Category Breakdown</h4>
                                <div className="space-y-3">
                                    {data.categoryDistribution?.map((category, index) => (
                                        <div key={category._id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className="text-sm font-medium text-gray-700">{category._id}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {category.count} ({((category.count / data.totalMeals) * 100).toFixed(1)}%)
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">Total Requests:</span> {data.totalMeals || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

const Card = ({ label, value, icon }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h4>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
                {icon}
            </div>
        </div>
    </div>
);

export default UserDashboardOverview;