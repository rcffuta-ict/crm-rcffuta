/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
    Users,
    Flag,
    Music,
    BookOpen,
    Zap,
    Heart,
    Sun,
    Layers,
    Flame,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import SectionHeading from "../components/common/SectionHeading";
import HeroSection from "../components/HeroSection";
import RegistrationForm from "../components/RegistrationForm";
import { FellowshipsSection } from "../components/MarqueeSection";
import Header from "../components/Header";
import config from "@/data/rcrc";

const iconMap: Record<string, React.ElementType> = {
    users: Users,
    flag: Flag,
    music: Music,
    book: BookOpen,
    zap: Zap,
    heart: Heart,
    sun: Sun,
    layers: Layers,
    flame: Flame,
    sparkles: Sparkles,
};

const dayPalettes = {
    amber: {
        tab: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
        tabInactive:
            "bg-white border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700",
        dot: "bg-amber-500",
        ring: "rgba(217,119,6,0.15)",
        icon: "bg-amber-50 border-amber-100 text-amber-600",
        dayLabel: "text-amber-600",
        badge: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    green: {
        tab: "bg-green-600 text-white shadow-lg shadow-green-500/30",
        tabInactive:
            "bg-white border border-slate-200 text-slate-500 hover:border-green-300 hover:text-green-700",
        dot: "bg-green-500",
        ring: "rgba(22,163,74,0.15)",
        icon: "bg-green-50 border-green-100 text-green-600",
        dayLabel: "text-green-600",
        badge: "bg-green-50 text-green-700 border border-green-200",
    },
    blue: {
        tab: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
        tabInactive:
            "bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-700",
        dot: "bg-blue-500",
        ring: "rgba(59,130,246,0.15)",
        icon: "bg-blue-50 border-blue-100 text-blue-600",
        dayLabel: "text-blue-600",
        badge: "bg-blue-50 text-blue-700 border border-blue-200",
    },
};

export default function ZonalCongressApp() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const [activeDay, setActiveDay] = useState(0);

    const schedule = config.schedule;

    const days =
        !schedule.isUpcoming && "days" in schedule
            ? ((schedule as any).days as Array<{
                  day: string;
                  label: string;
                  date: string;
                  color: string;
                  events: Array<{
                      time: string;
                      activity: string;
                      desc: string;
                      icon: string;
                  }>;
              }>)
            : [];

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#fafaf8] font-sans text-slate-900">
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 right-0 left-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-amber-500 via-amber-400 to-green-500"
                style={{ scaleX }}
            />

            <Header />

            {/* Hero stays dark/cinematic */}
            <HeroSection />

            {/* ─── ABOUT ──────────────────────────────────────────────── */}
            <section
                id="about"
                className="relative overflow-hidden bg-[#fafaf8] py-28"
            >
                {/* Subtle dot grid bg */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
                {/* Gold blob top-right */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-amber-200/40 blur-[80px]" />
                {/* Green blob bottom-left */}
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-green-200/40 blur-[80px]" />

                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                                {config.about.tagline}
                            </span>
                        </div>

                        <h2 className="mb-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                            {config.about.heading.split(config.about.highlight)[0]}
                            <span className="text-gold-shimmer">
                                {config.about.highlight}
                            </span>
                            {config.about.heading.split(config.about.highlight)[1]}
                        </h2>

                        {config.about.paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className="mb-5 text-base leading-relaxed text-slate-600 md:text-lg"
                            >
                                {p}
                            </p>
                        ))}

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {config.about.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                    className="card card-hover rounded-2xl p-5 text-center"
                                >
                                    <div className="text-3xl font-black text-slate-900">
                                        {stat.value}
                                        <span className="text-amber-500">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image mosaic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 grid grid-cols-2 gap-3">
                            {config.about.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`relative flex h-64 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm ${
                                        i === 0
                                            ? "mt-10"
                                            : i === 3
                                              ? "mb-10"
                                              : ""
                                    }`}
                                >
                                    {img.src ? (
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <div className="h-12 w-12 rounded-full border-2 border-dashed border-slate-300" />
                                            <span className="text-xs font-medium">
                                                {img.alt}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                                        {img.alt}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Floating badge */}
                        <div className="absolute top-1/2 -right-4 z-20 -translate-y-1/2 rotate-3 rounded-2xl border border-amber-200 bg-white p-4 shadow-xl">
                            <div className="text-center">
                                <div className="text-2xl font-black text-amber-600">
                                    {config.event.edition}
                                </div>
                                <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    {config.event.name}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── MINISTERS ──────────────────────────────────────────── */}
            <section
                id="ministers"
                className="relative overflow-hidden bg-[#f4f4f0] py-28"
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <div className="absolute top-1/4 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-amber-100/60 blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4">
                    <SectionHeading
                        title="Ministering Vessels"
                        subtitle="Chosen and prepared by God to bless this generation."
                        tag="Guest Ministers"
                        centered
                    />

                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {config.ministers.map((minister, i) => (
                            <motion.div
                                key={minister.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="group relative"
                            >
                                <div className="card card-hover relative flex h-[340px] flex-col overflow-hidden rounded-3xl transition-all duration-500">
                                    {/* Photo area */}
                                    <div className="relative flex-1 overflow-hidden bg-slate-100">
                                        {minister.picture ? (
                                            <Image
                                                src={minister.picture}
                                                alt={minister.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div
                                                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${minister.accent} opacity-10`}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="h-20 w-20 rounded-full border-2 border-dashed border-slate-300" />
                                                </div>
                                            </div>
                                        )}
                                        {/* Bottom fade */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />

                                        {/* Gradient accent top strip */}
                                        <div
                                            className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${minister.accent}`}
                                        />

                                        {/* TBA badge */}
                                        {minister.name === "TBA" && (
                                            <div className="absolute top-4 right-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-bold text-slate-400 backdrop-blur-sm">
                                                TBA
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <p
                                            className={`mb-1 bg-gradient-to-r text-[10px] font-bold tracking-widest uppercase ${minister.accent} bg-clip-text text-transparent`}
                                        >
                                            {minister.role}
                                        </p>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {minister.name}
                                        </h3>
                                        {minister.church &&
                                            minister.church !== "TBA" && (
                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {minister.church}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FELLOWSHIPS ────────────────────────────────────────── */}
            <FellowshipsSection />

            {/* ─── SCHEDULE ───────────────────────────────────────────── */}
            <section
                id="schedule"
                className="relative overflow-hidden bg-[#fafaf8] py-28"
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    <div className="absolute -bottom-20 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-green-100/50 blur-[80px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4">
                    <SectionHeading
                        title="Order of Events"
                        subtitle="Three days of glory, fire, and transformation."
                        tag="Programme"
                        centered
                    />

                    {schedule.isUpcoming ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center sm:p-16"
                        >
                            <div className="animate-glow-pulse mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200 bg-amber-100">
                                <Zap className="h-10 w-10 text-amber-600" />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-slate-900">
                                Stay Tuned
                            </h3>
                            <p className="mx-auto max-w-md text-slate-500">
                                {schedule.upcomingMessage}
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Day tabs — Pills style */}
                            <div className="scrollbar-hide mb-10 flex gap-3 overflow-x-auto pb-4 sm:justify-center sm:overflow-visible sm:pb-0">
                                {days.map((day, i) => {
                                    const palette =
                                        dayPalettes[
                                            day.color as keyof typeof dayPalettes
                                        ] ?? dayPalettes.amber;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setActiveDay(i)}
                                            className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                                                activeDay === i
                                                    ? palette.tab
                                                    : palette.tabInactive
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                                                    {day.day}
                                                </span>
                                                <span className="h-1 w-1 rounded-full bg-current opacity-30" />
                                                <span>{day.label}</span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Events list */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDay}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3"
                                >
                                    {days[activeDay]?.events.map((item, i) => {
                                        const Icon =
                                            iconMap[item.icon] ?? Sparkles;
                                        const palette =
                                            dayPalettes[
                                                days[activeDay]
                                                    .color as keyof typeof dayPalettes
                                            ] ?? dayPalettes.amber;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:shadow-md sm:gap-5 sm:p-5"
                                            >
                                                {/* Time */}
                                                <div className="w-14 shrink-0 text-right sm:w-20">
                                                    <span className="font-mono text-[9px] font-bold text-slate-400 sm:text-xs">
                                                        {item.time}
                                                    </span>
                                                </div>

                                                {/* Icon (Mobile: Visible) */}
                                                <div
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border sm:hidden ${palette.icon}`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                                                        {item.activity}
                                                    </h4>
                                                    <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                                        {item.desc}
                                                    </p>
                                                </div>

                                                {/* Icon (Desktop) */}
                                                <div
                                                    className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:flex ${palette.icon}`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </section>

            {/* ─── REGISTRATION ───────────────────────────────────────── */}
            <section
                id="register"
                className="relative overflow-hidden bg-[#f4f4f0] py-28"
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/60 blur-[100px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
                </div>

                <div className="relative z-10 mx-auto max-w-3xl px-4">
                    <div className="mb-12 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
                            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                                Registration
                            </span>
                        </div>
                        <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
                            {config.registration.headline}
                        </h2>
                        <p className="text-lg text-slate-500">
                            {config.registration.subheadline}
                        </p>
                    </div>

                    <div className="card rounded-3xl p-8 shadow-xl md:p-12">
                        <RegistrationForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
