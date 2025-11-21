import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    isDark?: boolean; // New prop to switch between Light/Dark themes
}

const SectionHeading = ({
    title,
    subtitle,
    centered = true,
    isDark = false, // Defaults to Light Mode (since most body sections are white)
}: SectionHeadingProps) => (
    <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
        {/* Tag - Adapts the Amber shade based on background */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                isDark
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-400" // Dark Mode Tag
                    : "border-amber-200 bg-amber-50 text-amber-700" // Light Mode Tag
            }`}
        >
            The Mantle 2025
        </motion.div>

        {/* Title - Switches between White and Slate-900 */}
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold tracking-tight md:text-5xl ${
                isDark ? "text-white" : "text-slate-900"
            }`}
        >
            {title}
        </motion.h2>

        {/* Subtitle - Switches between Slate-400 and Slate-600 */}
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mt-4 max-w-2xl text-lg ${
                    centered ? "mx-auto" : ""
                } ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

export default SectionHeading;
