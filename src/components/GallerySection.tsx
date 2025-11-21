"use client";

import { Plus, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SectionHeading from "../components/common/SectionHeading";

export default function GallerySection() {
    return (
        <section id="gallery" className="relative bg-slate-950 py-24">
            {/* Background Pattern for texture */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4">
                {/* Using the reusable component in Dark Mode */}
                <SectionHeading
                    title="Moments of Impact"
                    subtitle="A visual journey through previous conferences, retreats, and congresses. See what God is doing in our midst."
                    centered
                    isDark={true}
                />

                {/* Masonry / Bento Grid Layout */}
                <div className="grid h-[1200px] grid-cols-1 gap-4 md:h-[800px] md:grid-cols-4 md:grid-rows-3">
                    {/* 1. Large Item (Top Left) - WORSHIP HIGHLIGHT */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:col-span-2 md:row-span-2">
                        <Image
                            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
                            alt="Worship Session"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <span className="mb-2 inline-flex w-fit items-center rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-[10px] font-bold tracking-wider text-amber-400 uppercase backdrop-blur-md">
                                Worship
                            </span>
                            <h3 className="text-2xl font-bold text-white md:text-3xl">
                                Deep Calls to Deep
                            </h3>
                        </div>
                    </div>

                    {/* 2. Tall Item (Right) - SPEAKER / PRAYER */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:col-span-1 md:row-span-2">
                        <Image
                            src="https://images.unsplash.com/photo-1475721027767-f4240295bd43?q=80&w=2070&auto=format&fit=crop"
                            alt="Ministration"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 transition-colors group-hover:bg-slate-950/50"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="rounded-full bg-white/10 p-4 backdrop-blur-md">
                                <Plus className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* 3. Standard Item - CROWD */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-xl md:col-span-1 md:row-span-1">
                        <Image
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                            alt="Students Praying"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay"></div>
                    </div>

                    {/* 4. Wide Item (Bottom) - AUDITORIUM */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-xl md:col-span-2 md:row-span-1">
                        <Image
                            src="https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=2070&auto=format&fit=crop"
                            alt="Main Auditorium"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center px-8">
                            <div>
                                <p className="font-bold text-white">
                                    The Convergence
                                </p>
                                <p className="font-mono text-xs text-slate-400">
                                    3,000+ in attendance
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Standard Item - INTENSE */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-xl md:col-span-1 md:row-span-1">
                        <Image
                            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
                            alt="Music Ministry"
                            fill
                            className="object-cover grayscale transition-all transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                        />
                    </div>

                    {/* 6. View All Link (Gold Theme) */}
                    <div className="group relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-xl md:col-span-1 md:row-span-1">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale transition-opacity duration-500 group-hover:opacity-50"></div>

                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-slate-950/80"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-105">
                            <span className="text-3xl font-bold text-white">
                                View All
                            </span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-amber-500 group-hover:bg-amber-600">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
