import { motion } from "framer-motion";

const SectionHeading = ({
    title,
    subtitle,
    centered = true,
}: {
    title: string;
    subtitle?: string;
    centered?: boolean;
}) => (
    <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-bold tracking-wider text-green-800 uppercase"
        >
            CRM Ondo Zone
        </motion.div>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
        >
            {title}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`mt-4 max-w-2xl text-lg text-slate-600 ${centered ? "mx-auto" : ""}`}
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

export default SectionHeading;
