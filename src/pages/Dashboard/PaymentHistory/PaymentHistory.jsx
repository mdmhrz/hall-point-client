import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaMoneyCheckAlt, FaReceipt, FaClock, FaCrown } from "react-icons/fa";
import dayjs from "dayjs";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data: paymentData = {}, isLoading } = useQuery({
        queryKey: ["paymentHistory", user?.email, currentPage, itemsPerPage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/user?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data;
        },
    });

    const payments = paymentData.payments || [];
    const total = paymentData.total || 0;
    const totalPages = Math.ceil(total / itemsPerPage);

    return (

        <>
            <Helmet>
                <title>Payment History | HallPoint</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6"
            >
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-indigo-100 px-6 py-8">
                    <h1 className="text-3xl font-bold text-indigo-600 text-center mb-2">
                        Payment History
                    </h1>
                    <p className="text-center text-sm text-gray-500 mb-6">
                        View your recent payments and subscription history.
                    </p>

                    {isLoading ? (
                        <p className="text-center text-gray-400">Loading...</p>
                    ) : payments.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            No payment history found.
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto rounded-xl border">
                                <table className="min-w-full table-auto text-sm">
                                    <thead className="bg-indigo-100 text-indigo-800 font-semibold text-left">
                                        <tr>
                                            <th className="py-3 px-4"><FaReceipt className="inline mr-1" />Transaction ID</th>
                                            <th className="py-3 px-4"><FaMoneyCheckAlt className="inline mr-1" />Amount</th>
                                            <th className="py-3 px-4"><FaCrown className="inline mr-1" />Plan</th>
                                            <th className="py-3 px-4"><FaClock className="inline mr-1" />Paid At</th>
                                            <th className="py-3 px-4">Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((pay) => (
                                            <motion.tr
                                                key={pay._id}
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.2 }}
                                                className="border-b hover:bg-indigo-50/30"
                                            >
                                                <td className="py-3 px-4 text-indigo-600 font-mono">{pay.transactionId}</td>
                                                <td className="py-3 px-4 text-green-600 font-semibold">${pay.amount}</td>
                                                <td className="py-3 px-4 capitalize">{pay.paid_for}</td>
                                                <td className="py-3 px-4 text-gray-500">
                                                    {dayjs(pay.paid_at_string).format("MMMM D, YYYY - h:mm A")}
                                                </td>
                                                <td className="py-3 px-4 uppercase">
                                                    {Array.isArray(pay.paymentMethod)
                                                        ? pay.paymentMethod.join(", ")
                                                        : pay.paymentMethod}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <label htmlFor="itemsPerPage" className="font-medium">Items per page:</label>
                                    <select
                                        id="itemsPerPage"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="select select-sm border border-gray-300 rounded-md"
                                    >
                                        {[5, 10, 15, 20, 30, 50].map((count) => (
                                            <option key={count} value={count}>{count}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage <= 1}
                                        className="btn btn-sm btn-outline"
                                    >
                                        Prev
                                    </button>

                                    {[...Array(totalPages).keys()].map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page + 1)}
                                            className={`btn btn-sm ${currentPage === page + 1 ? "btn-primary text-white" : "btn-outline"}`}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage >= totalPages}
                                        className="btn btn-sm btn-outline"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default PaymentHistory;
