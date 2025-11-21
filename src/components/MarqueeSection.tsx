"use client";

import { motion } from "framer-motion";
import { fellowships, Fellowship } from "@/data/fellowships";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

export function FellowshipsSection() {
    // 1. Filter out non-fellowships (like "Guest")
    const validFellowships = fellowships.filter((e) => e.id !== "other");

    // 2. Triple the array to ensure smooth infinite scrolling on wide screens
    const marqueeItems = [
        ...validFellowships,
        ...validFellowships,
        // ...validFellowships, // Uncommented for smoother looping on wide monitors
    ];

    return (
        <section className="relative z-20 overflow-hidden border-t border-white/5 bg-slate-950 py-24">
            {/* --- Header Section --- */}
            <div className="mx-auto mb-16 flex max-w-7xl flex-col items-end justify-between gap-6 px-4 md:flex-row">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-900/10 px-3 py-1 text-xs font-bold tracking-wider text-amber-500 uppercase backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                        </span>
                        The Constituency
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white md:text-5xl">
                        Participating Chapters
                    </h2>
                </div>
                <p className="max-w-md text-sm text-slate-400 md:text-base">
                    Uniting students from every institution across the Ondo Zone
                    under the banner of Christ.
                </p>
            </div>

            {/* --- Marquee Container --- */}
            <div className="relative w-full">
                {/* Left/Right Fade Masks (Matches bg-slate-950) */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-950 to-transparent"></div>
                <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-slate-950 to-transparent"></div>

                {/* Scrolling Track */}
                <div className="animate-scroll flex w-max py-4 hover:[animation-play-state:paused]">
                    {marqueeItems.map((item, index) => (
                        <FellowshipCard
                            key={`${item.id}-${index}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Sub Component: The Card ---
function FellowshipCard({ item }: { item: Fellowship }) {
    return (
        <div className="group relative mx-4 h-72 w-64 flex-shrink-0 cursor-pointer">
            {/* Glow Effect behind card (Updated to Amber/Orange) */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 blur transition duration-500 group-hover:opacity-30"></div>

            {/* Card Content */}
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-500/30">
                {/* Top: Logo/Initials */}
                <div className="flex items-start justify-between">
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-inner">
                        {item.logo ? (
                            <Image
                                src={item.logo}
                                alt={item.short}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-lg font-black text-slate-200">
                                {item.short.split(" ").pop()?.substring(0, 2)}
                            </span>
                        )}

                        {/* Decorative gradient blob inside logo box */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent"></div>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/40 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                    </div>
                </div>

                {/* Middle: Text Info */}
                <div>
                    <h3 className="mb-1 text-lg leading-tight font-bold text-white">
                        {item.short}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                        {item.name.replace("RCF", "").trim()}
                    </p>
                </div>

                {/* Bottom: Metadata */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                        <MapPin className="h-3 w-3 text-amber-500" />
                        Ondo Zone
                    </div>
                </div>
            </div>
        </div>
    );
}
