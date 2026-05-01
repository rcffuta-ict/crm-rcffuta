"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Zap } from "lucide-react";

import ImageDisplay, {
    ImagePlaceholder,
} from "../components/common/ImageDisplay";
import SectionHeading from "../components/common/SectionHeading";
import HeroSection from "../components/HeroSection";
import RegistrationForm from "../components/RegistrationForm";
import { FellowshipsSection } from "../components/MarqueeSection";

import Header from "../components/Header";
import { fellowships } from "@/data/fellowships";
import config from "@/data/config.json";
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
                            {config.about.title}
                        </div>
                        <h2 className="mb-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: config.about.heading.replace(
                                        " Kingdom Giants",
                                        "<br /><span class='bg-gradient-to-r from-green-600 via-amber-500 to-orange-500 bg-clip-text text-transparent'>Kingdom Giants</span>",
                                    ),
                                }}
                            />
                        </h2>
                        {config.about.paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className="mb-6 text-lg leading-relaxed text-slate-600"
                            >
                                {p}
                            </p>
                        ))}

                        {/* Stats - Light Mode */}
                        <div className="grid grid-cols-2 gap-6">
                            {config.about.stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-1 text-4xl font-extrabold text-slate-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
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

                    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                        {config.ministers.map((speaker, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                                    <div
                                        className={`flex h-[400px] w-full items-center justify-center ${speaker.color}`}
                                    >
                                        {speaker.picture ? (
                                            <ImageDisplay
                                                alt={`${speaker.name} Photo`}
                                                src={speaker.picture}
                                                height="h-[400px]"
                                                className="transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <div className="h-24 w-24 rounded-full bg-slate-200" />
                                            </div>
                                        )}
                                    </div>
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

                    {config.schedule.isUpcoming ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-slate-50 p-12 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Zap className="h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                                    Stay Tuned
                                </h3>
                                <p className="mx-auto max-w-md text-lg text-slate-600">
                                    {config.schedule.upcomingMessage}
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* In the future, map over config.schedule.events here */}
                        </div>
                    )}
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
