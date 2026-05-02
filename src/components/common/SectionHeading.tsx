"use client";

import { motion } from "framer-motion";
import config from "@/data/rcrc";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    tag?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    centered = true,
    tag,
}: SectionHeadingProps) {
    return (
        <div className={`mb-14 ${centered ? "text-center" : "text-left"}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 ${centered ? "mx-auto" : ""}`}
            >
                <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                    {tag || `${config.event.name} ${config.event.edition}`}
                </span>
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
                    className={`mt-4 max-w-2xl text-lg text-slate-500 ${centered ? "mx-auto" : ""}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
