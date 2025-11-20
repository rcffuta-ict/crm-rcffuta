import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax effect for text
    const y2 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax for background

    return (
        <section className="relative flex h-screen min-h-[800px] items-center justify-center overflow-hidden bg-slate-900 text-white">
            {/* Background Image Placeholder with Overlay */}
            <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
                {/* REPLACE THIS DIV WITH: <Image src="/your-hero.jpg" layout="fill" objectFit="cover" ... /> */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/50 to-slate-900"></div>
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div style={{ y: y1 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md"
                    >
                        <span className="text-sm font-bold tracking-widest text-green-400 uppercase">
                            November 21, 2025
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6 bg-linear-to-b from-white to-slate-400 bg-clip-text text-6xl font-extrabold tracking-tighter text-transparent md:text-8xl"
                    >
                        CAMPUS <br /> LEADERSHIP <br /> TRAINING
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto mb-10 max-w-2xl text-xl font-light text-slate-300 md:text-2xl"
                    >
                        Equipping the stewards of God&#39;s heritage for maximum
                        impact on campus and beyond.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col justify-center gap-4 sm:flex-row"
                    >
                        <ScrollLink
                            to="register"
                            smooth={true}
                            className="transform cursor-pointer rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all hover:scale-105 hover:bg-green-500"
                        >
                            Register Now
                        </ScrollLink>
                        <ScrollLink
                            to="about"
                            smooth={true}
                            className="cursor-pointer rounded-full border border-white/30 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
                        >
                            Learn More
                        </ScrollLink>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <ArrowDown className="h-6 w-6" />
            </motion.div>
        </section>
    );
}
