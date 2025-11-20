import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = ["About", "Ministers", "Gallery", "Schedule"];

function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-green-800 font-bold text-white shadow-lg shadow-green-700/20">
                        CRM
                    </div>
                    <div className="mx-1 hidden h-8 w-[1px] bg-slate-300 md:block"></div>
                    <div className="flex flex-col">
                        <span className="leading-none font-bold text-slate-900">
                            CLT 2025
                        </span>
                        <span className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                            Ondo Zone
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <ScrollLink
                            key={item}
                            to={item.toLowerCase()}
                            smooth={true}
                            offset={-100}
                            className="cursor-pointer text-sm font-medium text-slate-600 transition-colors hover:text-green-700"
                        >
                            {item}
                        </ScrollLink>
                    ))}
                    <ScrollLink
                        to="register"
                        smooth={true}
                        className="transform rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-slate-900/30"
                    >
                        Register
                    </ScrollLink>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="p-2 text-slate-600 md:hidden"
                >
                    {isNavOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-slate-200 bg-white md:hidden"
                    >
                        <div className="flex flex-col space-y-4 px-4 py-6">
                            {[...nav, "Register"].map((item) => (
                                <ScrollLink
                                    key={item}
                                    to={item.toLowerCase()}
                                    smooth={true}
                                    onClick={() => setIsNavOpen(false)}
                                    className="border-b border-slate-100 py-2 text-lg font-medium text-slate-800"
                                >
                                    {item}
                                </ScrollLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default function Header() {
    return (
        <>
            <Navigation />
        </>
    );
}
