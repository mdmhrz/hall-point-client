import React, { useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../../assets/question.json"; // Replace with your Lottie file
import SectionTitle from "../../../components/SectionTitle";

const faqs = [
    {
        question: "How can I change or request a meal?",
        answer: "You can request a meal change from your dashboard under the 'Requested Meals' tab. Admins will review and confirm changes.",
    },
    {
        question: "What does a premium membership offer?",
        answer: "Premium members can view upcoming meals in advance, receive priority meal customization, and get access to exclusive dishes.",
    },
    {
        question: "How do I leave a meal review?",
        answer: "After each meal, go to the 'My Reviews' section in your dashboard. You can rate and leave feedback for meals you've eaten.",
    },
    {
        question: "Can admins manage multiple hostels?",
        answer: "Yes, admin users can manage meal data, reviews, and users across multiple hostel blocks from the 'Admin Dashboard'.",
    },
    {
        question: "Is there a mobile app for HallPoint?",
        answer: "Not yet, but it's in the roadmap! Stay tuned for our Android and iOS releases in upcoming updates.",
    },
];

const FAQ = () => {
    const lottieRef = useRef();

    return (
        <section className="relative py-20 bg-gradient-to-l from-base-300 via-base-200 to-base-300 overflow-hidden px-4 md:px-8">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="hidden lg:block"
                >
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        speed={0.001}
                        className="w-full max-w-md mx-auto"
                    />
                </motion.div>

                {/* FAQ Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto lg:mx-0"
                >
                    <div className="text-center lg:text-left mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full mb-4"
                        >
                            Need Help?
                        </motion.span>
                        <SectionTitle title={'Frequently Asked Questions'} subTitle={'Find quick answers to common questions about our meal management system.'}></SectionTitle>

                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <details className="group">
                                    <summary
                                        className="p-6 flex justify-between items-center cursor-pointer list-none"
                                        onClick={() => lottieRef.current?.playSegments([0, 30], true)}
                                    >
                                        <h3 className="text-lg font-semibold text-base-content/60 group-open:text-primary transition-colors">
                                            {faq.question}
                                        </h3>
                                        <div className="ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                            <span className="block w-4 h-0.5 bg-gray-500 group-open:bg-purple-600 transition-colors"></span>
                                            <span className="block absolute w-0.5 h-4 bg-gray-500 group-open:bg-purple-600 group-open:opacity-0 transition-all"></span>
                                        </div>
                                    </summary>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6 text-gray-600"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                </details>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center lg:text-left"
                    >
                        <p className="text-gray-500 mb-4">Still have questions?</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium">
                            Contact Support
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;