import {
    Instagram,
    Facebook,
    MapPin,
    Phone,
    Mail,
    ExternalLink,
    AtSign,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import config from "@/data/config.json";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950 pt-20 pb-10 text-slate-400">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
                {/* --- Column 1: Brand & Mission --- */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 font-bold text-white shadow-lg shadow-amber-900/20">
                            {config.hierarchy[1].charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg leading-none font-bold tracking-tight text-white">
                                {config.hierarchy[1]} x {config.hierarchy[2]}
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                                {config.event.theme}
                            </span>
                        </div>
                    </div>
                    <p className="mb-8 text-sm leading-relaxed text-slate-400">
                        Raising men and women of stature who will take over the
                        mountaintops of influence for the Kingdom of God.
                    </p>
                    <div className="flex gap-4">
                        <SocialLink
                            href="#"
                            icon={<Instagram className="h-5 w-5" />}
                        />
                        <SocialLink
                            href="#"
                            icon={<Facebook className="h-5 w-5" />}
                        />
                        <SocialLink
                            href="#"
                            icon={<AtSign className="h-5 w-5" />}
                        />
                    </div>
                </div>

                {/* --- Column 2: Site Navigation --- */}
                <div>
                    <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">
                        Explore
                    </h4>
                    <ul className="space-y-3">
                        <FooterLink href="#about" text="About CLT" />
                        <FooterLink href="#ministers" text="Ministers" />
                        <FooterLink href="#schedule" text="Order of Events" />
                        <FooterLink href="#gallery" text="Gallery" />
                        <FooterLink
                            href="#register"
                            text="Register Now"
                            highlight
                        />
                    </ul>
                </div>

                {/* --- Column 3: Resources --- */}
                {/* <div>
                    <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">
                        Resources
                    </h4>
                    <ul className="space-y-3">
                        <FooterLink href="#" text="CRM Constitution" />
                        <FooterLink href="#" text="Statement of Faith" />
                        <FooterLink href="#" text="Past Messages" />
                        <FooterLink href="#" text="Partner with Us" />
                    </ul>
                </div> */}

                {/* --- Column 4: Contact & Location --- */}
                <div>
                    <h4 className="mb-6 text-sm font-bold tracking-wide text-white uppercase">
                        Contact Us
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
                            <div>
                                <span className="block font-medium text-white">
                                    {config.footer.contact.addressTitle}
                                </span>
                                <span className="mt-1 block text-slate-400">
                                    {config.footer.contact.addressDesc}
                                </span>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    className="mt-2 inline-flex items-center text-xs font-bold text-amber-500 hover:text-amber-400 hover:underline"
                                >
                                    Get Directions{" "}
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-amber-500" />
                            <a
                                href={`tel:${config.footer.contact.phone.replace(/[^0-9+]/g, "")}`}
                                className="transition-colors hover:text-white"
                            >
                                {config.footer.contact.phone}
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 shrink-0 text-amber-500" />
                            <a
                                href={`mailto:${config.footer.contact.email}`}
                                className="transition-colors hover:text-white"
                            >
                                {config.footer.contact.email}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 px-4 pt-8 text-sm md:flex-row">
                <div className="text-slate-600">
                    &copy; {new Date().getFullYear()} {config.footer.copyrightName}. All rights
                    reserved.
                </div>

                <div className="flex items-center gap-1 text-slate-500">
                    <span>Powered by</span>
                    <Link
                        href="https://ict.rcffuta.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 font-medium text-slate-400 transition-colors hover:text-amber-400"
                    >
                        {config.footer.poweredBy}
                        <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

// --- Helper Components ---

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-amber-500 hover:text-white"
        >
            {icon}
        </a>
    );
}

function FooterLink({
    href,
    text,
    highlight = false,
}: {
    href: string;
    text: string;
    highlight?: boolean;
}) {
    return (
        <li>
            <a
                href={href}
                className={`flex items-center gap-2 transition-colors ${
                    highlight
                        ? "font-bold text-amber-500 hover:text-amber-400"
                        : "hover:text-white"
                }`}
            >
                {highlight && <ArrowRight className="h-3 w-3" />}
                {text}
            </a>
        </li>
    );
}
