import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const yBg = useTransform(scrollY, [0, 500], [0, -100]);
    const opacityNav = useTransform(scrollY, [0, 300], [1, 0]);

    const [randomDuration, setRandomDuration] = useState(0);

    useEffect(() => {
        // Generate the random number and set it to state only once
        function runIt() {
            const duration = Math.random() * 5 + 5;
            setRandomDuration(duration);
        }

        runIt();
    }, []);

    return (
        <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* --- 1. CINEMATIC BACKGROUND --- */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
                {/* Dark Overlay for depth */}
                <div className="absolute inset-0 z-10 bg-slate-950/80"></div>

                {/* Your Worship/Crowd Background Image */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay grayscale"></div>

                {/* Golden Glow from the bottom (The "Glory" effect) */}
                <div className="absolute right-0 bottom-0 left-0 z-10 h-[500px] bg-gradient-to-t from-amber-900/40 via-slate-950/50 to-transparent"></div>
            </motion.div>

            {/* --- 2. ATMOSPHERIC PARTICLES (Floating Embers) --- */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: "100vh",
                            x: randomDuration * 100 - 50 + "%",
                            opacity: 0,
                        }}
                        animate={{
                            y: "-10vh",
                            opacity: [0, 0.5, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: randomDuration * 5 + 5,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear",
                        }}
                        className="absolute bottom-0 h-1 w-1 rounded-full bg-amber-400 blur-[1px]"
                    />
                ))}
            </div>

            {/* --- 3. HERO CONTENT --- */}
            <div className="relative z-10 container mx-auto px-4 pt-10 text-center">
                <motion.div style={{ y: yText }}>
                    {/* Top Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 flex items-center justify-center gap-2"
                    >
                        <span className="h-[1px] w-8 bg-amber-500/50"></span>
                        <span className="text-glow text-sm font-bold tracking-[0.2em] text-amber-400 uppercase md:text-base">
                            Campus Leadership Training 2025
                        </span>
                        <span className="h-[1px] w-8 bg-amber-500/50"></span>
                    </motion.div>

                    {/* THE THEME IMAGE (Floating) */}
                    <div className="group perspective-1000 relative mx-auto mb-6 w-full max-w-3xl">
                        {/* Spotlight behind the text */}
                        <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 opacity-60 blur-3xl"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{
                                duration: 1,
                                type: "spring",
                                bounce: 0.4,
                            }}
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative"
                            >
                                <Image
                                    src="/images/logos/mantle.png"
                                    alt="The Mantle"
                                    width={800}
                                    height={300}
                                    className="h-auto w-full object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Subtitle / Slogan */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-slate-200 md:text-2xl"
                    >
                        <span className="text-amber-200/80 italic">
                            &quot;Receiving the double portion&quot;
                        </span>
                        <br />
                        Equipping stewards for maximum Kingdom impact.
                    </motion.p>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <ScrollLink
                            to="register"
                            smooth={true}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-b from-amber-600 to-amber-700 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_rgba(217,119,6,0.5)] transition-transform hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Register Now{" "}
                                <Sparkles className="h-4 w-4 text-amber-200" />
                            </span>
                            {/* Shimmer Effect */}
                            <div className="group-hover:animate-shine absolute -inset-full top-0 z-5 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-20" />
                        </ScrollLink>

                        <ScrollLink
                            to="about"
                            smooth={true}
                            className="cursor-pointer rounded-full border border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-bold text-slate-300 backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                        >
                            Event Details
                        </ScrollLink>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: opacityNav }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-500/50"
            >
                <ArrowDown className="h-8 w-8" />
            </motion.div>
        </section>
    );
}
