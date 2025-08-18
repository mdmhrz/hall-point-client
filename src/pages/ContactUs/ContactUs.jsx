import { motion } from "framer-motion";
import { useState } from "react";
import {
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdAccessTime,
    MdSend,
    MdPerson,
    MdSubject,
    MdMessage
} from "react-icons/md";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
    FaClock
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Visit Us",
            details: ["123 University Avenue", "Chittagong, Bangladesh", "Postal Code: 4000"],
            color: "text-primary"
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: "Email Us",
            details: ["info@hallpoint.com", "support@hallpoint.com", "admin@hallpoint.com"],
            color: "text-secondary"
        },
        {
            icon: <FaPhoneAlt className="text-2xl" />,
            title: "Call Us",
            details: ["+880 1812-345678", "+880 1912-345678", "Hotline: 16263"],
            color: "text-accent"
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: "Office Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
            color: "text-info"
        }
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, name: "Facebook", color: "hover:text-blue-600", href: "#" },
        { icon: <FaTwitter />, name: "Twitter", color: "hover:text-blue-400", href: "#" },
        { icon: <FaInstagram />, name: "Instagram", color: "hover:text-pink-500", href: "#" },
        { icon: <FaLinkedinIn />, name: "LinkedIn", color: "hover:text-blue-700", href: "#" }
    ];

    return (
        <>
            <Helmet>
                <title>Contact Us | HallPoint</title>
                <meta name="description" content="Get in touch with HallPoint. We're here to help with your meal management needs." />
            </Helmet>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-base-200"
            >
                {/* Hero Section */}
                <motion.section
                    variants={itemVariants}
                    className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 sm:py-24"
                >
                    <div className="absolute inset-0 bg-base-100/80 backdrop-blur-sm"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-6"
                        >
                            Contact
                            <span className="text-primary ml-3">HallPoint</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto"
                        >
                            Have questions about our meal management system? We're here to help you make the most of your dining experience.
                        </motion.p>
                    </div>
                </motion.section>

                {/* Contact Information Cards */}
                <motion.section
                    variants={itemVariants}
                    className="py-16 px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300 text-center hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className={`${info.color} mb-4 flex justify-center`}>
                                        {info.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-base-content mb-3">
                                        {info.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-sm text-base-content/70">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Main Contact Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-base-100 rounded-3xl p-6 sm:p-8 shadow-xl border border-base-300"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-4 flex items-center gap-3">
                                        <MdSend className="text-primary" />
                                        Send us a Message
                                    </h2>
                                    <p className="text-base-content/70">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2">
                                                <MdPerson className="text-primary" />
                                                Full Name *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="input input-bordered input-primary focus:input-primary w-full"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2">
                                                <MdEmail className="text-secondary" />
                                                Email Address *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email address"
                                            className="input input-bordered input-secondary focus:input-secondary w-full"
                                            required
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2">
                                                <MdSubject className="text-accent" />
                                                Subject *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="What is this about?"
                                            className="input input-bordered input-accent focus:input-accent w-full"
                                            required
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2">
                                                <MdMessage className="text-info" />
                                                Message *
                                            </span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Write your message here..."
                                            rows="5"
                                            className="textarea textarea-bordered textarea-info focus:textarea-info w-full resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`btn btn-primary w-full gap-2 ${isSubmitting ? 'loading' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <MdSend />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* Contact Information & Map */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-8"
                            >
                                {/* Get in Touch */}
                                <div className="bg-base-100 rounded-3xl p-6 sm:p-8 shadow-xl border border-base-300">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6">
                                        Get in Touch
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <MdLocationOn className="text-primary text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base-content mb-1">Address</h3>
                                                <p className="text-base-content/70 text-sm">
                                                    123 University Avenue<br />
                                                    Chittagong, Bangladesh<br />
                                                    Postal Code: 4000
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-secondary/10 p-3 rounded-full">
                                                <MdPhone className="text-secondary text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base-content mb-1">Phone</h3>
                                                <p className="text-base-content/70 text-sm">
                                                    +880 1812-345678<br />
                                                    +880 1912-345678<br />
                                                    Hotline: 16263
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-accent/10 p-3 rounded-full">
                                                <MdEmail className="text-accent text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base-content mb-1">Email</h3>
                                                <p className="text-base-content/70 text-sm">
                                                    info@hallpoint.com<br />
                                                    support@hallpoint.com<br />
                                                    admin@hallpoint.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-info/10 p-3 rounded-full">
                                                <MdAccessTime className="text-info text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base-content mb-1">Office Hours</h3>
                                                <p className="text-base-content/70 text-sm">
                                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                    Saturday: 10:00 AM - 4:00 PM<br />
                                                    Sunday: Closed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Map Section */}
                                <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-300">
                                    <h3 className="text-xl font-bold text-base-content mb-4">Find Us</h3>
                                    <div className="overflow-hidden rounded-2xl border border-base-300">
                                        <iframe
                                            title="HallPoint Location"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.376405059264!2d90.39035027589671!3d23.733953189406368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e90a449e4f%3A0xb7092a9c25197fa4!2sUniversity%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1755495745517!5m2!1sen!2sbd"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>

                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-300">
                                    <h3 className="text-xl font-bold text-base-content mb-4">Follow Us</h3>
                                    <p className="text-base-content/70 mb-6 text-sm">
                                        Stay connected with HallPoint on social media for updates and news.
                                    </p>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={index}
                                                href={social.href}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`btn btn-circle btn-outline ${social.color} transition-colors duration-300`}
                                                aria-label={social.name}
                                            >
                                                {social.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <motion.section
                    variants={itemVariants}
                    className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-base-content mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-base-content/70 mb-12">
                            Quick answers to common questions about HallPoint
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    question: "How do I request meals?",
                                    answer: "Simply log into your student dashboard and browse available meals to make requests."
                                },
                                {
                                    question: "What are the meal timings?",
                                    answer: "Breakfast: 7-9 AM, Lunch: 12-2 PM, Dinner: 7-9 PM daily."
                                },
                                {
                                    question: "How can I update my profile?",
                                    answer: "Visit your profile page and click 'Edit Profile' to update your information."
                                },
                                {
                                    question: "Who can I contact for support?",
                                    answer: "Reach out to our support team via email at support@hallpoint.com or use this contact form."
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-base-200 rounded-2xl p-6 text-left hover:shadow-lg transition-shadow duration-300"
                                >
                                    <h3 className="font-semibold text-base-content mb-2">{faq.question}</h3>
                                    <p className="text-base-content/70 text-sm">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </>
    );
};

export default ContactUs;