import { motion } from "framer-motion";
import { fellowships } from "@/data/fellowships";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";

export function FellowshipsSection() {
    // Duplicate the array to create a seamless infinite loop
    const marqueeItems = fellowships.filter((e) => e.id !== "other"); //.map((e) => e.logo);

    return (
        <section className="relative z-20 overflow-hidden bg-slate-950 py-24">
            <div className="mx-auto mb-12 flex max-w-7xl flex-col items-end justify-between gap-6 px-4 md:flex-row">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-4 inline-block rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold tracking-wider text-slate-300 uppercase"
                    >
                        The Constituency
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Participating Chapters
                    </h2>
                </div>
                <p className="max-w-md text-sm text-slate-400 md:text-base">
                    Uniting students from every institution across the Ondo Zone
                    under the banner of Christ.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full">
                {/* Gradient Masks for smooth fade edges */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent"></div>
                <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent"></div>

                {/* The Scrolling Track */}
                <div className="animate-scroll flex w-max hover:[animation-play-state:paused]">
                    {marqueeItems.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="group mx-4 h-48 w-48 flex-shrink-0 cursor-pointer md:h-56 md:w-56"
                            onClick={() =>
                                toast.info(`Viewing ${item.name} details...`)
                            }
                        >
                            <div
                                className={`h-full w-full rounded-3xl ${item.logo} relative transform overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1`}
                            >
                                {/* Logo Placeholder (Replace with <Image> later) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-inner backdrop-blur-sm">
                                        <span className="text-xl font-black opacity-80">
                                            {item.short[0]}
                                        </span>
                                    </div>
                                    <span className="translate-y-4 transform font-bold opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        {item.short}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-start justify-end bg-black/20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2">
                                        <ArrowUpRight className="h-4 w-4 text-slate-900" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
