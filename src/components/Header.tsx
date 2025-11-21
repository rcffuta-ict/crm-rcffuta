import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = ["About", "Ministers", "Gallery", "Schedule"];

function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/90 backdrop-blur-md transition-all duration-300">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* --- Logo Section --- */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-green-800 font-bold text-white shadow-lg shadow-green-900/20">
                        CRM
                    </div>
                    <div className="mx-1 hidden h-8 w-[1px] bg-white/20 md:block"></div>
                    <div className="flex flex-col">
                        <span className="leading-none font-bold text-white">
                            CLT 2025
                        </span>
                        <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                            The Mantle
                        </span>
                    </div>
                </div>

                {/* --- Desktop Menu --- */}
                <div className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <ScrollLink
                            key={item}
                            to={item.toLowerCase()}
                            smooth={true}
                            offset={-80} // Adjusted offset so it doesn't hide section titles
                            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors hover:text-amber-400"
                        >
                            {item}
                        </ScrollLink>
                    ))}
                    <ScrollLink
                        to="register"
                        smooth={true}
                        className="transform cursor-pointer rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 hover:from-amber-500 hover:to-amber-600"
                    >
                        Register
                    </ScrollLink>
                </div>

                {/* --- Mobile Toggle --- */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="p-2 text-slate-300 transition-colors hover:text-white md:hidden"
                >
                    {/* CHANGED: Color from slate-600 to slate-300 so it's visible on dark bg */}
                    {isNavOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* --- Mobile Menu --- */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-white/10 bg-slate-950 md:hidden"
                    >
                        <div className="flex flex-col space-y-2 px-4 py-6">
                            {nav.map((item) => (
                                <ScrollLink
                                    key={item}
                                    to={item.toLowerCase()}
                                    smooth={true}
                                    offset={-80}
                                    onClick={() => setIsNavOpen(false)}
                                    className="border-b border-white/5 py-3 text-lg font-medium text-slate-300 transition-colors hover:text-amber-400"
                                >
                                    {item}
                                </ScrollLink>
                            ))}
                            {/* Mobile Register Button */}
                            <ScrollLink
                                to="register"
                                smooth={true}
                                onClick={() => setIsNavOpen(false)}
                                className="mt-4 block w-full rounded-xl bg-amber-600 py-3 text-center text-lg font-bold text-white active:bg-amber-700"
                            >
                                Register Now
                            </ScrollLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default function Header() {
    return <Navigation />;
}
