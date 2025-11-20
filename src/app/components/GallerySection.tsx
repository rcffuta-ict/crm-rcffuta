import { Plus } from "lucide-react";

export default function GallerySection() {
    return (
        <section id="gallery" className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-4xl font-bold text-slate-900">
                        Moments of Impact
                    </h2>
                    <p className="text-slate-600">
                        A visual journey through previous conferences, retreats,
                        and congresses. See what God is doing in our midst.
                    </p>
                </div>

                {/* Masonry / Bento Grid Layout */}
                <div className="grid h-[1200px] grid-cols-1 gap-4 md:h-[800px] md:grid-cols-4 md:grid-rows-3">
                    {/* Large Item (Top Left) */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
                        {/* REPLACE WITH: <Image src="/path.jpg" fill className="object-cover" /> */}
                        <div className="absolute inset-0 bg-slate-300 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-8">
                            <span className="mb-2 text-sm font-bold text-green-400">
                                WORSHIP
                            </span>
                            <h3 className="text-2xl font-bold text-white">
                                Deep Calls to Deep
                            </h3>
                        </div>
                    </div>

                    {/* Tall Item (Right) */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-1 md:row-span-2">
                        <div className="absolute inset-0 bg-slate-400 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                            <Plus className="h-10 w-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    </div>

                    {/* Standard Item */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-1 md:row-span-1">
                        <div className="absolute inset-0 bg-slate-200 transition-transform duration-700 group-hover:scale-105"></div>
                    </div>

                    {/* Wide Item (Bottom) */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-2 md:row-span-1">
                        <div className="absolute inset-0 bg-slate-800 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-mono text-sm text-slate-500">
                                Main Auditorium Crowd
                            </p>
                        </div>
                    </div>

                    {/* Standard Item */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-1 md:row-span-1">
                        <div className="absolute inset-0 bg-slate-300 transition-transform duration-700 group-hover:scale-105"></div>
                    </div>

                    {/* Standard Item */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-1 md:row-span-1">
                        <div className="absolute inset-0 bg-slate-200 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="font-bold text-white">
                                View All
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
