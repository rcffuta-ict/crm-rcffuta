"use client";

import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import config from "@/data/rcrc";
import Image from "next/image";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    // past-hero threshold (~95vh)
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (v) => {
            setScrolled(v > 60);
            setPastHero(v > window.innerHeight * 0.8);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // Since the hero is now bright, we use dark text/elements from the start
    const navBg = scrolled
        ? "bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-sm"
        : "border-transparent bg-transparent";

    const textColor = "text-slate-500 hover:text-slate-900";
    const logoNameColor = "text-slate-900";
    const logoTagColor = "text-amber-600";

    return (
        <nav className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${navBg}`}>
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logos */}
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {/* RCCG Logo */}
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100">
                            <Image
                                src={config.hierarchy[0].logo || "/images/logos/rccg.png"}
                                alt="RCCG"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        {/* CRM Logo */}
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100">
                            <Image
                                src={config.hierarchy[1].logo || "/images/logos/crm.png"}
                                alt="CRM"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`text-sm font-bold tracking-tight transition-colors ${logoNameColor}`}>
                            {config.event.name}
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${logoTagColor}`}>
                            {config.event.theme}
                        </span>
                    </div>
                </div>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {config.nav.map((item) => (
                        <ScrollLink
                            key={item.target}
                            to={item.target}
                            smooth
                            offset={-80}
                            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${textColor}`}
                        >
                            {item.label}
                        </ScrollLink>
                    ))}
                    <div className="mx-3 h-5 w-px bg-current opacity-10" />
                    <ScrollLink
                        to="register"
                        smooth
                        className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(217,119,6,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_-4px_rgba(217,119,6,0.6)]"
                    >
                        Register
                        <div className="group-hover:animate-shine absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </ScrollLink>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className={`rounded-xl p-2.5 transition-colors md:hidden ${pastHero ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10"}`}
                >
                    {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile menu — always light */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-4 py-6">
                            {config.nav.map((item, i) => (
                                <motion.div
                                    key={item.target}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                >
                                    <ScrollLink
                                        to={item.target}
                                        smooth
                                        offset={-80}
                                        onClick={() => setIsNavOpen(false)}
                                        className="flex cursor-pointer items-center rounded-xl px-4 py-4 text-lg font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                    >
                                        {item.label}
                                    </ScrollLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: config.nav.length * 0.07 }}
                                className="mt-4"
                            >
                                <ScrollLink
                                    to="register"
                                    smooth
                                    onClick={() => setIsNavOpen(false)}
                                    className="block w-full cursor-pointer rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 py-4 text-center text-lg font-bold text-white shadow-[0_4px_20px_-4px_rgba(217,119,6,0.4)]"
                                >
                                    Register Now ✦
                                </ScrollLink>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
