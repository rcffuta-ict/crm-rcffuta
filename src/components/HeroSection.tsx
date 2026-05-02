"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronRight, MapPin, Calendar } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import config from "@/data/rcrc";

// Stagger container
const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export default function HeroSection() {
    const { scrollY } = useScroll();
    const yLogo = useTransform(scrollY, [0, 600], [0, -60]);
    const yText = useTransform(scrollY, [0, 600], [0, -30]);
    const opacity = useTransform(scrollY, [0, 380], [1, 0]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#fafaf8]">
            {/* ── BACKGROUND LAYER ──────────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Warm dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2c990_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

                {/* Main gold radial — right side behind logo */}
                <div className="bg-gradient-radial absolute top-0 right-0 h-[90vh] w-[60vw] translate-x-1/4 rounded-full from-amber-200/60 via-amber-100/30 to-transparent blur-[80px]" />

                {/* Secondary green — bottom left */}
                <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-green-200/40 blur-[100px]" />

                {/* Cross-hatch thin lines — decorative */}
                <div
                    className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-amber-300/20 to-transparent"
                    style={{ left: "8%" }}
                />
                <div
                    className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-200/15 to-transparent"
                    style={{ left: "92%" }}
                />
                <div
                    className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"
                    style={{ top: "20%" }}
                />
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-24 pb-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-0 lg:pt-0">
                {/* ── LEFT: TEXT CONTENT (Order 2 on mobile) ─────────────────── */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    style={{ y: yText }}
                    className="order-2 flex flex-col items-start justify-center lg:order-1 lg:pr-12"
                >
                    {/* Hierarchy badge */}
                    <motion.div variants={item} className="mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs shadow-sm">
                            {config.hierarchy.map((h, i) => (
                                <span
                                    key={h.name}
                                    className="flex items-center gap-2"
                                >
                                    {i > 0 && (
                                        <span className="text-amber-300">
                                            ›
                                        </span>
                                    )}
                                    <span
                                        className={`font-bold tracking-[0.12em] uppercase ${i === config.hierarchy.length - 1 ? "text-amber-700" : "text-slate-400"}`}
                                    >
                                        {h.name}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pre-title */}
                    <motion.p
                        variants={item}
                        className="mb-3 text-sm font-bold tracking-[0.25em] text-slate-400 uppercase"
                    >
                        {config.event.name} · {config.event.edition}
                    </motion.p>

                    {/* Main heading */}
                    <motion.div variants={item} className="mb-5">
                        <h1 className="text-5xl leading-[1.0] font-black tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
                            <span className="block">One Theme.</span>
                            <span className="block">One Purpose.</span>
                            <span
                                className="relative mt-1 block text-transparent"
                                style={{
                                    WebkitTextStroke: "2px #C8960C",
                                }}
                            >
                                One God.
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        variants={item}
                        className="mb-8 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg"
                    >
                        {config.event.subtitle} — a convergence of RCF chapters
                        across the Ondo Zone, gathered under the theme{" "}
                        <span className="font-bold text-amber-700 italic">
                            &#34;{config.event.theme}&#34;
                        </span>
                        .
                    </motion.p>

                    {/* Date / Venue chips */}
                    <motion.div
                        variants={item}
                        className="mb-8 flex flex-wrap gap-2.5"
                    >
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            <Calendar className="h-3.5 w-3.5 text-amber-500" />
                            {config.event.date === "TBA"
                                ? "Date — TBA"
                                : config.event.date}
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            <MapPin className="h-3.5 w-3.5 text-green-500" />
                            {config.event.venue === "TBA"
                                ? "Venue — TBA"
                                : config.event.venueShort}
                        </div>
                    </motion.div>

                    {/* CTA row */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <ScrollLink
                            to="register"
                            smooth
                            className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(200,150,12,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_-4px_rgba(200,150,12,0.65)] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Register Now{" "}
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                            {/* Shine sweep */}
                            <div className="group-hover:animate-shine absolute -inset-full top-0 z-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </ScrollLink>

                        <ScrollLink
                            to="about"
                            smooth
                            className="cursor-pointer text-sm font-semibold text-slate-500 underline-offset-4 transition-colors hover:text-amber-700 hover:underline"
                        >
                            About the Congress
                        </ScrollLink>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        variants={item}
                        className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8"
                    >
                        {config.about.stats.map((stat, i) => (
                            <div key={i} className="text-left">
                                <div className="text-2xl font-black text-slate-900">
                                    {stat.value}
                                    <span className="text-amber-500">
                                        {stat.suffix}
                                    </span>
                                </div>
                                <div className="mt-0.5 text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: LOGO (Order 1 on mobile) ────────────────────────── */}
                <motion.div
                    style={{ y: yLogo, opacity }}
                    initial={{ opacity: 0, scale: 0.88, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                        duration: 1.1,
                        type: "spring",
                        bounce: 0.2,
                        delay: 0.2,
                    }}
                    className="order-1 flex items-center justify-center lg:order-2 lg:justify-end"
                >
                    <div className="relative flex w-full max-w-[450px] items-center justify-center sm:max-w-[550px] lg:max-w-none">
                        {/* Outer gold ring glow */}
                        <div className="animate-glow-pulse absolute h-[110%] w-[110%] rounded-full bg-amber-300/25 blur-[60px]" />

                        {/* Inner intense glow */}
                        <div className="absolute h-[70%] w-[70%] rounded-full bg-amber-200/40 blur-[40px]" />

                        {/* Rotating outer decoration ring */}
                        <div
                            className="animate-spin-slow absolute inset-0 m-auto aspect-square w-[95%] rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, transparent 0%, rgba(200,150,12,0.08) 25%, transparent 50%, rgba(200,150,12,0.08) 75%, transparent 100%)",
                            }}
                        />

                        <div className="animate-float relative z-10 flex w-full justify-center">
                            <Image
                                src={config.event.themeLogo}
                                alt={config.event.theme}
                                width={750}
                                height={600}
                                className="h-auto w-full max-w-[380px] object-contain drop-shadow-[0_20px_50px_rgba(200,150,12,0.4)] sm:max-w-[480px] lg:max-w-[700px]"
                                priority
                            />
                        </div>

                        {/* Decorative corner dots */}
                        <div className="absolute -top-4 -right-4 h-3 w-3 rounded-full bg-amber-400/60" />
                        <div className="absolute -bottom-4 -left-4 h-2 w-2 rounded-full bg-green-400/60" />
                        <div className="absolute top-1/4 -left-6 h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                        <div className="absolute -right-6 bottom-1/4 h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                    </div>
                </motion.div>
            </div>

            {/* ── SCROLL INDICATOR ──────────────────────────────────────────── */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-1 text-slate-300">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
                        Scroll
                    </span>
                    <ArrowDown className="h-4 w-4" />
                </div>
            </motion.div>

            {/* ── BOTTOM FADE ───────────────────────────────────────────────── */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-[#fafaf8] to-transparent" />
        </section>
    );
}
