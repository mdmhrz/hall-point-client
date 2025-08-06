// /src/pages/Cancel.jsx
import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-4xl font-bold text-yellow-500">Payment Canceled</h1>
            <p className="text-gray-600 mt-4">You have canceled the payment process.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                Back to Home
            </Link>
        </div>
    );
};

export default PaymentCancel;
