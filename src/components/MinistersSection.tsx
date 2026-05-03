/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import config from "@/data/rcrc";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./common/SectionHeading";

export default function MinistersSection() {
    return (
        <section
            id="ministers"
            className="relative overflow-hidden bg-[#f4f4f0] py-28"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-slate-300 to-transparent" />
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-slate-300 to-transparent" />
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
                    {(config.ministers as any).map(
                        (minister: any, i: number) => (
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
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div
                                                className={`flex h-full w-full items-center justify-center bg-linear-to-br ${minister.accent} opacity-10`}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="h-20 w-20 rounded-full border-2 border-dashed border-slate-300" />
                                                </div>
                                            </div>
                                        )}
                                        {/* Bottom fade */}
                                        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-60" />

                                        {/* Gradient accent top strip */}
                                        <div
                                            className={`absolute top-0 right-0 left-0 h-1 bg-linear-to-r ${minister.accent}`}
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
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
