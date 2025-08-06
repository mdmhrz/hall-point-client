import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FaLock, FaInfoCircle, FaCheck, FaCreditCard, FaGlobeAsia } from 'react-icons/fa';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';
import { Helmet } from 'react-helmet-async';
import SslCommerz from './SslCommerz';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Checkout = () => {
    const { selectedPlan } = useParams();

    const membershipTiers = {
        silver: { price: 9.99, benefits: ['Priority support', 'Early meal access'] },
        gold: { price: 19.99, benefits: ['All Silver perks', 'Featured badge', 'Special deals'] },
        platinum: { price: 29.99, benefits: ['All Gold perks', 'Meal requests priority', 'Premium support'] },
    };

    const { price, benefits } = membershipTiers[selectedPlan] || {};

    return (
        <>
            <Helmet>
                <title>Payment | HallPoint</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-sky-100 to-emerald-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white grid lg:grid-cols-2">
                    {/* Background Shape */}
                    <div className="absolute w-80 h-80 bg-gradient-to-tr from-primary/20 to-secondary/30 rounded-full -top-20 -left-20 blur-3xl opacity-30 z-0"></div>

                    {/* Left Side - Summary */}
                    <div className="relative p-10 space-y-6 bg-gradient-to-br from-accent/20 to-primary/3 z-10">
                        <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow">
                            Plan Summary
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 capitalize">
                            {selectedPlan} Membership
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Enjoy exclusive access, elevated support, and unlock special privileges with our {selectedPlan} tier. Perfect for food lovers and top contributors!
                        </p>

                        <div className="space-y-2">
                            {benefits?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                    <FaCheck className="text-green-500" /> {item}
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-2xl font-bold text-primary">${price}</p>
                            <p className="text-xs text-gray-400 mt-1">Membership is non-refundable and billed once.</p>
                        </div>
                    </div>

                    {/* Right Side - Checkout */}
                    <div className="relative white p-10 z-10 flex flex-col justify-center space-y-8">
                        {/* Stripe Payment Box */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
                                <FaLock className="text-primary" /> Pay with Card (Stripe)
                            </h3>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm price={price} selectedPlan={selectedPlan} />
                            </Elements>
                        </div>

                        {/* Divider */}
                        <div className="text-center text-gray-400 text-sm font-medium">— or —</div>

                        {/* SSLCOMMERZ Payment Box */}
                        <SslCommerz price={price} selectedPlan={selectedPlan}></SslCommerz>


                        {/* Notice */}
                        <div className="mt-4 text-sm text-yellow-600 flex items-center justify-center gap-2">
                            <FaInfoCircle />
                            Upgrading will replace your current membership tier.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
