// /src/pages/Fail.jsx
import React from 'react';
import { Link } from 'react-router';

const PaymentFail = () => {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>
            <p className="text-gray-600 mt-4">Unfortunately, your transaction could not be completed.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
                Back to Home
            </Link>
        </div>
    );
};

export default PaymentFail;
