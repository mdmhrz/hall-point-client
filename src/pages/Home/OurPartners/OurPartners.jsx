import { motion } from "framer-motion";
import SectionTitle from "../../../components/SectionTitle";

const partners = [
    { name: "Dhaka University", logo: "/logos/du.png" },
    { name: "Chittagong University", logo: "/logos/cu.png" },
    { name: "RUET", logo: "/logos/ruet.png" },
    { name: "BUET", logo: "/logos/buet.png" },
    { name: "SUST", logo: "/logos/sust.png" },
    { name: "NSU", logo: "/logos/nsu.png" },
    { name: "EWU", logo: "/logos/ewu.png" },
    { name: "Bkash", logo: "/banks/mobile-banking/bkash.png" },
    { name: "Cellfin", logo: "/banks/mobile-banking/cellfin.png" },
    { name: "American Express", logo: "/banks/international/american-express.png" },
    { name: "MasterCard", logo: "/banks/international/mastercard.png" },
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const cardHoverVariants = {
    hover: {
        scale: 1.05,
        y: -5,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
};

export default function OurPartners() {
    return (
        <motion.section
            className="py-20 bg-base-200 overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Animated Background decoration */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-10"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.1, 0.15]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <motion.div
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </motion.svg>
                        Trusted Partners
                    </motion.div>
                    <SectionTitle title={'Our Partners & Support'} subTitle={'Collaborating with leading institutions and organizations to deliver excellence'}></SectionTitle>

                </motion.div>

                {/* Marquee Container */}
                <motion.div
                    className="relative"
                    variants={itemVariants}
                >
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-base-200 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-base-200 to-transparent z-10"></div>

                    {/* Marquee */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{
                                x: [0, -100 * partners.length]
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            style={{ width: "max-content" }}
                            whileHover={{ animationPlayState: "paused" }}
                        >
                            {/* First set of partners */}
                            {partners.map((partner, index) => (
                                <motion.div
                                    key={`first-${index}`}
                                    className="min-w-[200px] flex-shrink-0"
                                    variants={cardHoverVariants}
                                    whileHover="hover"
                                >
                                    <div className="flex items-center justify-center h-20 px-4">
                                        <motion.img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-16 max-w-full object-contain filter "
                                            whileHover={{
                                                filter: "grayscale(0%)",
                                                scale: 1.1,
                                                opacity: 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                e.target.src = `data:image/svg+xml;base64,${btoa(`
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
                                                        <rect width="120" height="60" fill="transparent"/>
                                                        <text x="60" y="35" font-family="Arial" font-size="12" text-anchor="middle" fill="#9ca3af">${partner.name}</text>
                                                    </svg>
                                                `)}`;
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Duplicate set for seamless loop */}
                            {partners.map((partner, index) => (
                                <motion.div
                                    key={`second-${index}`}
                                    className="min-w-[200px] flex-shrink-0"
                                    variants={cardHoverVariants}
                                    whileHover="hover"
                                >
                                    <div className="flex items-center justify-center h-20 px-4">
                                        <motion.img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-16 max-w-full object-contain filter grayscale opacity-60"
                                            whileHover={{
                                                filter: "grayscale(0%)",
                                                scale: 1.1,
                                                opacity: 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                e.target.src = `data:image/svg+xml;base64,${btoa(`
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
                                                        <rect width="120" height="60" fill="transparent"/>
                                                        <text x="60" y="35" font-family="Arial" font-size="12" text-anchor="middle" fill="#9ca3af">${partner.name}</text>
                                                    </svg>
                                                `)}`;
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 text-base-content/60"
                        whileHover={{ scale: 1.05, color: "hsl(var(--p))" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span>Join our growing network of partners</span>
                        <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}