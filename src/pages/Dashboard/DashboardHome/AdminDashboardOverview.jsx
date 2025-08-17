import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

// Theme-friendly color palette (instead of hardcoded hex codes)
const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#AA66CC"];

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

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-base-content">
                Welcome back, {user?.displayName}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card label="Approved Meals" value={data.totalMeals} />
                <Card label="Upcoming Meals" value={data.upcomingMeals} />
                <Card label="Pending Requests" value={data.pendingRequests} />
                <Card label="Users" value={data.totalUsers} />
                <Card label="Reviews" value={data.totalReviews} />
                <Card label="Revenue" value={`$${data.totalRevenue?.toFixed(2)}`} />
            </div>

            <div className="bg-base-100 rounded-xl shadow p-4 mt-4">
                <h3 className="text-lg font-semibold mb-2 text-base-content">
                    Meal Distribution by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data.categoryDistribution}
                            dataKey="count"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                        >
                            {data.categoryDistribution?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--b1))", color: "hsl(var(--bc))" }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const Card = ({ label, value }) => (
    <div className="bg-base-100 rounded-xl p-4 shadow text-center">
        <h4 className="text-sm font-medium text-base-content/70">{label}</h4>
        <p className="text-2xl font-bold text-base-content">{value}</p>
    </div>
);

export default AdminDashboardOverview;
