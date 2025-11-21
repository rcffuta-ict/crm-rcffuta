"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, Zap, Music, Flag, Heart } from "lucide-react";

import ImageDisplay, {
    ImagePlaceholder,
} from "../components/common/ImageDisplay";
import SectionHeading from "../components/common/SectionHeading";
import HeroSection from "../components/HeroSection";
import RegistrationForm from "../components/RegistrationForm";
import { FellowshipsSection } from "../components/MarqueeSection";
import GallerySection from "../components/GallerySection";

import Header from "../components/Header";
import { ministers } from "@/data/ministers";
import { fellowships } from "@/data/fellowships";
import { useMemo } from "react";

export default function CLT2025Experience() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const totalFellowships = useMemo(() => fellowships.length, []);

    return (
        <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 selection:bg-green-200 selection:text-green-900">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 right-0 left-0 z-[60] h-1 origin-left bg-gradient-to-r from-green-500 to-amber-500"
                style={{ scaleX }}
            />

            <Header />

            {/* --- Hero Section (Keep Dark/Cinematic for impact) --- */}
            <HeroSection />

            {/* --- About Section (BRIGHT & VIBRANT) --- */}
            <section
                id="about"
                className="relative overflow-hidden bg-white py-24"
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
                            {/* Gradient Text for pop */}
                            <span className="bg-gradient-to-r from-green-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
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
                            Volunteers.
                        </p>

                        {/* Stats - Light Mode */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
                                <div className="mb-1 text-4xl font-extrabold text-slate-900">
                                    500<span className="text-green-600">+</span>
                                </div>
                                <div className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                    Leaders Expected
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
                                <div className="mb-1 text-4xl font-extrabold text-slate-900">
                                    {totalFellowships}
                                </div>
                                <div className="text-sm font-medium tracking-wider text-slate-500 uppercase">
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
                        {/* Visual Decoration - Bright Blobs */}
                        <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-green-200 opacity-40 mix-blend-multiply blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-amber-200 opacity-40 mix-blend-multiply blur-3xl"></div>

                        {/* Image Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <ImagePlaceholder
                                text="Worship"
                                height="h-64"
                                className="mt-12 rounded-tr-[3rem] border-4 border-white shadow-xl"
                            />
                            <ImagePlaceholder
                                text="Word"
                                height="h-64"
                                className="rounded-tl-[3rem] border-4 border-white shadow-xl"
                            />
                            <ImagePlaceholder
                                text="Prayer"
                                height="h-64"
                                className="rounded-br-[3rem] border-4 border-white shadow-xl"
                            />
                            <ImagePlaceholder
                                text="Community"
                                height="h-64"
                                className="mb-12 rounded-bl-[3rem] border-4 border-white shadow-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Speakers Section (Bright & Clean) --- */}
            <section id="ministers" className="bg-slate-50 py-24">
                <div className="mx-auto max-w-7xl px-4">
                    {/* Pass isDark={false} if your SectionHeading component supports it, otherwise it adapts */}
                    <SectionHeading
                        title="Ministering Vessels"
                        subtitle="Prepared by God to bless this generation."
                        centered
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
                                <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                                    <ImageDisplay
                                        alt={`${speaker.name} Photo`}
                                        src={speaker.picture}
                                        height="h-[400px]"
                                        className="transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient on Image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40"></div>
                                </div>

                                {/* Floating Info Card */}
                                <div className="absolute right-4 bottom-4 left-4 translate-y-2 transform rounded-2xl border border-slate-100 bg-white p-5 shadow-xl transition-all duration-300 group-hover:translate-y-0">
                                    <p className="mb-1 text-xs font-bold tracking-wider text-amber-600 uppercase">
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

            {/* --- Gallery / Marquee Section (Keep Dark for contrast/visual break) --- */}
            <div className="relative z-20">
                {/* <GallerySection /> */}
                <FellowshipsSection />
            </div>

            {/* --- Schedule Section (BRIGHT) --- */}
            <section id="schedule" className="bg-white py-24">
                <div className="mx-auto max-w-4xl px-4">
                    <SectionHeading title="Order of Events" centered />

                    <div className="space-y-4">
                        {[
                            {
                                time: "09:00 AM",
                                activity: "Opening Prayer & Worship",
                                desc: "Praise, Introductions, and Special Welcome",
                                icon: Music,
                            },
                            {
                                time: "10:00 AM",
                                activity: "Word Session I",
                                desc: "The First Charge",
                                icon: BookOpen,
                            },
                            {
                                time: "11:00 AM",
                                activity: "Creative Ministrations",
                                desc: "Drama Presentation & Prayer Charge",
                                icon: Zap,
                            },
                            {
                                time: "12:00 PM",
                                activity: "Word Session II",
                                desc: "The Second Charge & Prayer",
                                icon: BookOpen,
                            },
                            {
                                time: "01:00 PM",
                                activity: "Word Session III",
                                desc: "Choir Ministration & Third Charge",
                                icon: BookOpen,
                            },
                            {
                                time: "02:00 PM",
                                activity: "Interactive & Handover",
                                desc: "Q&A, Offering, and Zonal Executive Handover",
                                icon: Flag,
                            },
                            {
                                time: "03:00 PM",
                                activity: "Thanksgiving & Benediction",
                                desc: "Closing Praises",
                                icon: Heart,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-green-200 hover:shadow-lg md:gap-6"
                            >
                                {/* Time Column */}
                                <div className="flex w-20 flex-shrink-0 flex-col md:w-24">
                                    <span className="font-mono text-sm font-bold text-green-600 md:text-base">
                                        {item.time.split(" ")[0]}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {item.time.split(" ")[1]}
                                    </span>
                                </div>

                                {/* Vertical Line */}
                                <div className="h-12 w-[2px] rounded-full bg-slate-100"></div>

                                {/* Content Column */}
                                <div className="flex-grow">
                                    <h3 className="text-lg leading-tight font-bold text-slate-900">
                                        {item.activity}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Icon Column */}
                                <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors group-hover:bg-green-100 sm:flex">
                                    <item.icon className="h-6 w-6" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Registration Section (Bright & Inviting) --- */}
            <section id="register" className="relative overflow-hidden py-32">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-slate-50"></div>
                <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-green-200/30 blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] h-[60%] w-[40%] rounded-full bg-amber-200/30 blur-3xl"></div>

                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

                <div className="relative z-10 mx-auto max-w-3xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-slate-900">
                            Secure Your Seat
                        </h2>
                        <p className="text-lg text-slate-600">
                            Registration is mandatory for all attendees.
                        </p>
                    </div>

                    {/* Registration Form Container - Light & Clean */}
                    <div className="rounded-3xl border border-white bg-white/60 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl md:p-12">
                        <RegistrationForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
