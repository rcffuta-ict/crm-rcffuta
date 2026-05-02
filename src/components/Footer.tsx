"use client";

import {
    Instagram, Facebook, MapPin, Phone, Mail, ExternalLink, Twitter, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import config from "@/data/rcrc";
import Image from "next/image";

export default function Footer() {
    const { footer, hierarchy, event, socials, nav } = config;
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-slate-200 bg-[#f4f4f0] pt-20 pb-10 text-slate-500">
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 lg:grid-cols-4">

                {/* ── Brand ── */}
                <div className="lg:col-span-2">
                    {/* Hierarchy breadcrumb */}
                    <div className="mb-6 flex items-center gap-2">
                        {hierarchy.map((h, i) => (
                            <span key={h.name} className="flex items-center gap-2">
                                {i > 0 && <span className="text-slate-300">›</span>}
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${i === hierarchy.length - 1 ? "text-amber-600" : "text-slate-400"}`}>
                                    {h.name}
                                </span>
                            </span>
                        ))}
                    </div>

                    <div className="mb-6 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-5 opacity-70 grayscale transition-all hover:grayscale-0">
                            {/* FUTA Logo */}
                            <div className="relative h-8 w-20">
                                <Image src="/images/logos/futa.png" alt="FUTA" fill className="object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                            {/* RCCG Logo */}
                            <div className="relative h-10 w-10">
                                <Image src={hierarchy[0].logo || ""} alt="RCCG" fill className="object-contain" />
                            </div>
                            {/* CRM Logo */}
                            <div className="relative h-10 w-10">
                                <Image src={hierarchy[1].logo || ""} alt="CRM" fill className="object-contain" />
                            </div>
                            {/* RCFFUTA Logo */}
                            <div className="relative h-10 w-10">
                                <Image src={hierarchy[2].logo || ""} alt="RCFFUTA" fill className="object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold tracking-[0.3em] text-amber-600 uppercase">{event.theme} · {event.edition}</span>
                        </div>
                    </div>

                    <p className="mb-7 max-w-sm text-sm leading-relaxed text-slate-500">
                        Raising men and women of stature who will take over the mountaintops of influence for the Kingdom of God.
                    </p>

                    {/* Social links */}
                    <div className="flex gap-2.5">
                        {socials.instagram !== "#" && <SocialLink href={socials.instagram} icon={<Instagram className="h-4 w-4" />} />}
                        {socials.facebook !== "#" && <SocialLink href={socials.facebook} icon={<Facebook className="h-4 w-4" />} />}
                        {socials.twitter !== "#" && <SocialLink href={socials.twitter} icon={<Twitter className="h-4 w-4" />} />}
                    </div>
                </div>

                {/* ── Navigation ── */}
                <div>
                    <h4 className="mb-6 text-xs font-bold tracking-widest text-slate-900 uppercase">Explore</h4>
                    <ul className="space-y-3">
                        {nav.map((item) => (
                            <FooterLink key={item.target} href={`#${item.target}`} text={item.label} />
                        ))}
                        <FooterLink href="#register" text="Register Now" highlight />
                    </ul>
                </div>

                {/* ── Contact ── */}
                <div>
                    <h4 className="mb-6 text-xs font-bold tracking-widest text-slate-900 uppercase">Contact</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                            <div>
                                <span className="block font-semibold text-slate-900">{footer.contact.addressTitle}</span>
                                <span className="mt-1 block text-xs text-slate-500">{footer.contact.addressDesc}</span>
                                <a
                                    href={footer.contact.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
                                >
                                    Get Directions <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                            <a href={`tel:${footer.contact.phone.replace(/[^0-9+]/g, "")}`} className="text-xs transition-colors hover:text-slate-900">
                                {footer.contact.phone}
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                            <a href={`mailto:${footer.contact.email}`} className="text-xs transition-colors hover:text-slate-900">
                                {footer.contact.email}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 px-4 pb-8 text-center text-xs md:flex-row md:text-left">
                <div className="text-slate-400">
                    © {year} <span className="font-bold text-slate-500">{footer.copyrightName}</span>. All rights reserved.
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400 md:items-end">
                    <span>Powered by</span>
                    <Link
                        href={footer.poweredByUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1 font-bold text-slate-500 transition-colors hover:text-amber-600"
                    >
                        {footer.poweredBy}
                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 hover:shadow-sm"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, text, highlight = false }: { href: string; text: string; highlight?: boolean }) {
    return (
        <li>
            <a
                href={href}
                className={`flex items-center gap-1.5 text-sm transition-colors ${highlight ? "font-bold text-amber-600 hover:text-amber-700" : "hover:text-slate-900"}`}
            >
                {highlight && <ArrowRight className="h-3 w-3" />}
                {text}
            </a>
        </li>
    );
}
