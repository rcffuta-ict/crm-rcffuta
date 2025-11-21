"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Users, Mic2, Menu, X } from "lucide-react";

import ImageDisplay, {
    ImagePlaceholder,
} from "../components/common/ImageDisplay";
import SectionHeading from "../components/common/SectionHeading";
import HeroSection from "../components/HeroSection";
import RegistrationForm from "../components/RegistrationForm";
import { FellowshipsSection } from "../components/MarqueeSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ministers } from "@/data/ministers";

export default function CLT2025Experience() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 selection:bg-green-200 selection:text-green-900">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 right-0 left-0 z-[60] h-1 origin-left bg-green-600"
                style={{ scaleX }}
            />

            <Header />

            {/* --- Hero Section with Parallax --- */}
            <HeroSection />

            {/* --- About Section --- */}
            <section
                id="about"
                className="relative overflow-hidden bg-slate-50 py-24"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-green-600 uppercase">
                            <span className="h-[2px] w-8 bg-green-600"></span>
                            About the Gathering
                        </div>
                        <h2 className="mb-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                            Forging the Next Generation of <br />
                            <span className="bg-linear-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                                Kingdom Giants
                            </span>
                        </h2>
                        <p className="mb-6 text-lg leading-relaxed text-slate-600">
                            The Campus Leadership Training (CLT) is the annual
                            flagship convergence of the Redeemed Christian
                            Fellowship (RCF) chapters across Ondo Zone.
                        </p>
                        <p className="mb-8 text-lg leading-relaxed text-slate-600">
                            Hosted by Christ Redeemer&apos;s Ministries (CRM),
                            this meeting is designed to sharpen the spiritual
                            and administrative capacity of Excos, Workers, and
                            Volunteers. We believe that the campus is a training
                            ground for world changers.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="mb-1 text-3xl font-bold text-green-600">
                                    500+
                                </div>
                                <div className="text-sm text-slate-500">
                                    Leaders Expected
                                </div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="mb-1 text-3xl font-bold text-green-600">
                                    4+
                                </div>
                                <div className="text-sm text-slate-500">
                                    RCF Chapters
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Visual Decoration */}
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-green-200 opacity-30 blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>

                        {/* Image Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <ImagePlaceholder
                                text="Worship Session"
                                height="h-64"
                                className="mt-12 rounded-tr-[3rem]"
                            />
                            <ImagePlaceholder
                                text="Teaching"
                                height="h-64"
                                className="rounded-tl-[3rem]"
                            />
                            <ImagePlaceholder
                                text="Prayer"
                                height="h-64"
                                className="rounded-br-[3rem]"
                            />
                            <ImagePlaceholder
                                text="Crowd Shot"
                                height="h-64"
                                className="mb-12 rounded-bl-[3rem]"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Speakers Section --- */}
            <section id="ministers" className="py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <SectionHeading
                        title="Ministering Vessels"
                        subtitle="Prepared by God to bless this generation."
                    />

                    <div className="grid gap-8 md:grid-cols-3">
                        {ministers.map((speaker, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <ImageDisplay
                                        alt={`${speaker.name} Photo`}
                                        src={speaker.picture}
                                        height="h-96"
                                        className="transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute right-4 bottom-4 left-4 transform rounded-xl border border-slate-100 bg-white/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2">
                                    <p className="mb-1 text-xs font-bold tracking-wider text-green-600 uppercase">
                                        {speaker.role}
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {speaker.name}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Gallery / Marquee Section --- */}
            <GallerySection />
            <FellowshipsSection />

            {/* --- Schedule Section --- */}
            <section id="schedule" className="bg-slate-50 py-24">
                <div className="mx-auto max-w-4xl px-4">
                    <SectionHeading title="Order of Events" centered />

                    <div className="space-y-4">
                        {[
                            {
                                time: "08:00 AM",
                                activity: "Arrival & Registration",
                                icon: Users,
                            },
                            {
                                time: "09:00 AM",
                                activity: "Opening Prayer & Worship",
                                icon: Mic2,
                            },
                            {
                                time: "10:00 AM",
                                activity: "Session 1: The Leader's Heart",
                                icon: Users,
                            },
                            {
                                time: "12:00 PM",
                                activity: "Breakout Sessions (Units)",
                                icon: Users,
                            },
                            {
                                time: "02:00 PM",
                                activity: "Plenary Session & impartation",
                                icon: Users,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="w-24 flex-shrink-0 font-mono font-bold text-green-600">
                                    {item.time}
                                </div>
                                <div className="h-10 w-[2px] bg-slate-100"></div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {item.activity}
                                    </h3>
                                </div>
                                <div className="text-slate-300">
                                    <item.icon className="h-6 w-6" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Registration Section (The Core) --- */}
            <section id="register" className="relative py-32">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

                <div className="relative z-10 mx-auto max-w-3xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-slate-900">
                            Secure Your Seat
                        </h2>
                        <p className="text-lg text-slate-600">
                            Registration is mandatory for all attendees.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white bg-white/80 p-8 shadow-2xl shadow-green-900/10 backdrop-blur-xl md:p-12">
                        <RegistrationForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
