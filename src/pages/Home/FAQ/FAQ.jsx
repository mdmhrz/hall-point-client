import React from "react";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "How can I change or request a meal?",
        answer:
            "You can request a meal change from your dashboard under the 'Requested Meals' tab. Admins will review and confirm changes.",
    },
    {
        question: "What does a premium membership offer?",
        answer:
            "Premium members can view upcoming meals in advance, receive priority meal customization, and get access to exclusive dishes.",
    },
    {
        question: "How do I leave a meal review?",
        answer:
            "After each meal, go to the 'My Reviews' section in your dashboard. You can rate and leave feedback for meals you've eaten.",
    },
    {
        question: "Can admins manage multiple hostels?",
        answer:
            "Yes, admin users can manage meal data, reviews, and users across multiple hostel blocks from the 'Admin Dashboard'.",
    },
    {
        question: "Is there a mobile app for HallPoint?",
        answer:
            "Not yet, but it's in the roadmap! Stay tuned for our Android and iOS releases in upcoming updates.",
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

const FAQ = () => {
    return (
        <section className="py-16 bg-base-300 px-4 md:px-8">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-base-100 border border-base-300 rounded-box shadow-md overflow-hidden"
                            custom={idx}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <details className="group transition-all duration-300 cursor-pointer">
                                <summary className="p-4 font-semibold flex justify-between items-center">
                                    {faq.question}
                                    <span className="transform group-open:rotate-45 transition-transform text-xl">+</span>
                                </summary>
                                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                            </details>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FAQ;
