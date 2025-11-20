"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MoveLeft, Compass, MapPinOff } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 selection:bg-green-200 selection:text-green-900">
                {/* --- Background Decoration --- */}
                <div className="pointer-events-none absolute inset-0 h-full w-full">
                    <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100/50 opacity-60 blur-3xl"></div>
                    <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-lg px-4 text-center">
                    {/* --- Animated Icon --- */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-xl shadow-green-900/5"
                    >
                        <motion.div
                            animate={{ rotate: [0, 45, 0, -45, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                            }}
                        >
                            <Compass className="h-12 w-12 text-green-600" />
                        </motion.div>

                        <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-white bg-red-100 p-2 text-red-600">
                            <MapPinOff className="h-5 w-5" />
                        </div>
                    </motion.div>

                    {/* --- Text Content --- */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="mb-2 text-8xl font-bold tracking-tighter text-slate-900">
                            404
                        </h1>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                            Off The Path
                        </h2>

                        <p className="mb-8 leading-relaxed text-slate-600">
                            It seems you&rsquo;ve ventured into uncharted
                            territory. Even the children of Israel wandered, but
                            you don&rsquo;t have to.
                        </p>

                        {/* --- Action Buttons --- */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <button
                                onClick={() => window.history.back()}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                            >
                                <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Go Back
                            </button>

                            <Link
                                href="/"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 sm:w-auto"
                            >
                                <Home className="h-4 w-4" />
                                Return Home
                            </Link>
                        </div>
                    </motion.div>

                    {/* --- Footer Note --- */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-xs font-medium tracking-widest text-slate-400 uppercase"
                    >
                        CRM Ondo Zone • CLT 2025
                    </motion.p>
                </div>
            </main>
        </>
    );
}
