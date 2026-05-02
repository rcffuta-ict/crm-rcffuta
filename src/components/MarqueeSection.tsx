"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, BookOpen, ChevronRight, Building2 } from "lucide-react";
import Image from "next/image";
import { fellowships, Fellowship } from "@/data/fellowships";
import config from "@/data/rcrc";
import SectionHeading from "./common/SectionHeading";

function getMergedFellowships() {
    return fellowships
        .filter((f) => f.id !== "other")
        .map((f) => {
            const extra = config.fellowships.find((r) => r.id === f.id);
            return { ...f, ...extra };
        });
}

type MergedFellowship = Fellowship & {
    president?: string;
    presidentImage?: string;
    founded?: string;
    location?: string;
};

export function FellowshipsSection() {
    const merged = getMergedFellowships() as MergedFellowship[];
    const [selected, setSelected] = useState<MergedFellowship>(merged[0]);

    return (
        <section id="fellowships" className="relative overflow-hidden bg-[#fafaf8] py-28">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="absolute top-1/4 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-amber-100/60 blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-green-100/50 blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <SectionHeading
                    title="Participating Chapters"
                    subtitle="Uniting RCF chapters from across the Ondo Zone under one banner."
                    tag="The Constituency"
                    centered={false}
                />

                {/* Interactive panel */}
                <div className="grid gap-5 lg:grid-cols-[320px_1fr]">

                    {/* Left: fellowship list */}
                    <div className="card rounded-3xl p-2 shadow-sm">
                        <div className="max-h-[520px] overflow-y-auto">
                            <div className="space-y-0.5 p-2">
                                {merged.map((f, i) => (
                                    <motion.button
                                        key={f.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.035 }}
                                        onClick={() => setSelected(f)}
                                        className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                                            selected.id === f.id
                                                ? "bg-amber-50 shadow-[inset_0_0_0_1.5px_rgba(217,119,6,0.25)]"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        {/* Logo */}
                                        <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-slate-100 transition-all duration-200 ${
                                            selected.id === f.id ? "border-amber-300" : "border-slate-200"
                                        }`}>
                                            {f.logo && !f.logo.startsWith("bg-") ? (
                                                <Image src={f.logo} alt={f.short} fill className="object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-black text-slate-400">
                                                    {f.short.split(" ").pop()?.substring(0, 2)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className={`truncate text-sm font-semibold transition-colors ${
                                                selected.id === f.id ? "text-amber-700" : "text-slate-700 group-hover:text-slate-900"
                                            }`}>
                                                {f.short}
                                            </p>
                                            <p className="truncate text-xs text-slate-400">{f.location || "Ondo Zone"}</p>
                                        </div>

                                        <ChevronRight className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                                            selected.id === f.id ? "text-amber-500 translate-x-0.5" : "text-slate-300 group-hover:text-slate-400"
                                        }`} />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: detail panel */}
                    <div className="card relative min-h-[400px] overflow-hidden rounded-3xl shadow-sm">
                        {/* Top accent stripe */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-green-500" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.25 }}
                                className="flex h-full flex-col p-8 md:p-10"
                            >
                                {/* Header */}
                                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
                                    <div className="relative h-18 w-18 flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                                        {selected.logo && !selected.logo.startsWith("bg-") ? (
                                            <Image src={selected.logo} alt={selected.short} fill className="object-contain p-2" />
                                        ) : (
                                            <span className="text-xl font-black text-slate-400">
                                                {selected.short.split(" ").pop()?.substring(0, 2)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <span className="mb-2 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-bold tracking-widest text-amber-700 uppercase">
                                            RCF Chapter
                                        </span>
                                        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{selected.short}</h3>
                                        <p className="mt-1 text-slate-500">{selected.name}</p>
                                    </div>
                                </div>

                                {/* Info cards */}
                                <div className="mb-8 grid gap-3 sm:grid-cols-3">
                                    {/* President */}
                                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                                        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-amber-200 bg-amber-50">
                                            {selected.presidentImage ? (
                                                <Image src={selected.presidentImage} alt={selected.president || "President"} fill className="object-cover" />
                                            ) : (
                                                <Users className="h-5 w-5 text-amber-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">President</p>
                                            <p className="mt-0.5 text-sm font-bold text-slate-900">{selected.president || "TBA"}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                                        <MapPin className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Location</p>
                                            <p className="mt-0.5 text-sm font-bold text-slate-900">{selected.location || "Ondo Zone"}</p>
                                        </div>
                                    </div>

                                    {/* Founded */}
                                    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                                        <Building2 className="h-5 w-5 text-blue-400" />
                                        <div>
                                            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Est.</p>
                                            <p className="mt-0.5 text-sm font-bold text-slate-900">{selected.founded || "TBA"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-8 text-sm leading-relaxed text-slate-600 md:text-base">{selected.description}</p>

                                {/* Units */}
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-amber-500" />
                                        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Departments & Units</span>
                                        <span className="ml-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
                                            {selected.units.length}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selected.units.map((unit) => (
                                            <span
                                                key={unit}
                                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                                            >
                                                {unit}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom marquee strip */}
                <div className="relative mt-10 overflow-hidden">
                    <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-[#fafaf8] to-transparent" />
                    <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-[#fafaf8] to-transparent" />
                    <div className="animate-scroll flex w-max gap-2.5 py-2">
                        {[...merged, ...merged].map((f, i) => (
                            <button
                                key={`${f.id}-${i}`}
                                onClick={() => setSelected(f)}
                                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                                    selected.id === f.id
                                        ? "border-amber-300 bg-amber-50 text-amber-700"
                                        : "border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:text-slate-700"
                                }`}
                            >
                                {f.short}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
