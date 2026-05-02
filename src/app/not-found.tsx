"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MoveLeft, Compass, MapPinOff, Sparkles } from "lucide-react";
import config from "@/data/rcrc";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#fafaf8] selection:bg-amber-100 selection:text-amber-900">
            {/* --- Background Decoration --- */}
            <div className="pointer-events-none absolute inset-0 h-full w-full">
                <div className="absolute top-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/50 opacity-60 blur-[120px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
                {/* --- Animated Icon --- */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-amber-900/5"
                >
                    <motion.div
                        animate={{ rotate: [0, 15, 0, -15, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut",
                        }}
                    >
                        <Compass className="h-14 w-14 text-amber-600" />
                    </motion.div>

                    <div className="absolute -right-2 -bottom-2 rounded-2xl border-2 border-white bg-red-50 p-2.5 text-red-600 shadow-lg">
                        <MapPinOff className="h-6 w-6" />
                    </div>
                </motion.div>

                {/* --- Text Content --- */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-xs font-black tracking-[0.3em] text-amber-600 uppercase">Page Not Found</span>
                    </div>
                    
                    <h1 className="mb-4 text-9xl font-black tracking-tighter text-slate-900">
                        404
                    </h1>
                    
                    <h2 className="mb-4 text-2xl font-bold text-slate-800">
                        Off The Path
                    </h2>

                    <p className="mb-10 text-sm leading-relaxed text-slate-500 max-w-sm mx-auto">
                        Even the children of Israel wandered, but you don't have to. 
                        The page you are looking for has been moved or doesn't exist.
                    </p>

                    {/* --- Action Buttons --- */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => window.history.back()}
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-600 transition-all hover:border-amber-200 hover:bg-amber-50/50 sm:w-auto"
                        >
                            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Go Back
                        </button>

                        <Link
                            href="/"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                        >
                            <Home className="h-4 w-4" />
                            Return Home
                        </Link>
                    </div>
                </motion.div>

                {/* --- Footer Note --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <p className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase">
                        {config.hierarchy[1].name} × {config.hierarchy[2].name}
                    </p>
                    <p className="text-[9px] font-medium tracking-widest text-slate-300 uppercase">
                        {config.event.theme} {config.event.edition}
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
