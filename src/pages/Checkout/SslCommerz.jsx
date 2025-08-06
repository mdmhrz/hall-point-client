import React from 'react';
import { FaCreditCard, FaGlobeAsia } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const SslCommerz = ({ price, selectedPlan }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const handleCreatePayment = async () => {
        const payment = {
            name: user.displayName,
            email: user.email,
            amount: price,
            paid_for: selectedPlan,
        }

        // console.log(membershipData);

        const response = await axiosSecure.post('/create-ssl-payment', payment)
        console.log('Response', response);

        if (response.data?.gatewayURL) {
            window.location.replace(response.data.gatewayURL)
        }
    }




    return (
        <div className="space-y-4 border border-gray-200 p-6 rounded-xl shadow bg-white">
            <h3 className="text-xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
                <FaGlobeAsia className="text-red-500" /> Pay with SSLCOMMERZ
            </h3>

            <p className="text-sm text-gray-600 text-center">
                Use SSLCOMMERZ for secure mobile banking, cards, or local gateway payments.
            </p>

            {/* You can turn this into a <form> or button based on how you implement SSLCOMMERZ */}
            <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                onClick={handleCreatePayment}
            >
                <FaCreditCard /> Pay with SSLCOMMERZ
            </button>
        </div>
    );
};

export default SslCommerz;