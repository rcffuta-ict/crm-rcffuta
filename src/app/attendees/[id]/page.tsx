/* eslint-disable @typescript-eslint/no-explicit-any */
import { unslugify } from "@/lib/function";
import { initSupabase } from "@/lib/supabase";
import {
    CheckCircle2,
    Clock,
    User,
    MapPin,
    ShieldCheck,
    XCircle,
    ArrowLeft,
    Share2,
} from "lucide-react";
import Link from "next/link";
import config from "@/data/rcrc";
import Image from "next/image";

export default async function AttendeePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = initSupabase(true);

    // Fetch attendee data
    const { data: attendee, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !attendee) {
        console.debug(error);
        return <InvalidID />;
    }

    // Calculate registration time
    const date = new Date(attendee.created_at);
    const formattedDate = new Intl.DateTimeFormat("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#fafaf8] p-4 font-sans selection:bg-amber-100 selection:text-amber-900">
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-100/40 blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-green-100/30 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Back button */}
                <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-amber-600">
                    <ArrowLeft className="h-4 w-4" /> Back to Event Home
                </Link>

                <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50">
                    <div className="flex flex-col md:flex-row">
                        {/* Side Panel - Cinematic Dark */}
                        <div className="relative flex w-full flex-col items-center justify-center bg-[#111827] px-8 py-10 text-center md:w-56 md:py-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,150,12,0.3),transparent)]" />
                            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block" />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent md:hidden" />
                            
                            {/* Status badge */}
                            <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-green-600 shadow-xl shadow-amber-500/10 ring-4 ring-amber-500/10">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            
                            <h1 className="relative z-10 text-xs font-black tracking-[0.2em] text-white uppercase [writing-mode:vertical-lr] md:rotate-180 hidden md:block">
                                Verified Attendee
                            </h1>
                            <h1 className="relative z-10 text-xs font-black tracking-[0.2em] text-white uppercase md:hidden">
                                Verified Attendee
                            </h1>
                            <p className="relative z-10 mt-2 text-[9px] font-bold tracking-[0.4em] text-amber-500 uppercase">
                                {config.event.name} {config.event.edition}
                            </p>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-1 flex-col p-8 md:p-10">
                            <div className="mb-8 flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Registered Attendee</p>
                                    <h2 className="mt-1 truncate text-3xl font-black text-slate-900 leading-tight">
                                        {attendee.full_name}
                                    </h2>
                                </div>
                                <div className="flex -space-x-2 shrink-0">
                                    <div className="h-9 w-9 rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden relative">
                                        <Image src={config.hierarchy[0].logo || ""} alt="RCCG" fill className="object-contain p-1.5" />
                                    </div>
                                    <div className="h-9 w-9 rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden relative">
                                        <Image src={config.hierarchy[1].logo || ""} alt="CRM" fill className="object-contain p-1.5" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-5">
                                    <DetailRow icon={ShieldCheck} label="Primary Chapter" value={unslugify(attendee.chapter).toUpperCase()} />
                                    <DetailRow icon={User} label="Unit / Department" value={attendee.unit || "General Attendee"} />
                                </div>
                                <div className="space-y-5">
                                    <DetailRow icon={Clock} label="Registration Time" value={formattedDate} />
                                    <DetailRow icon={MapPin} label="Access Status" value="Authorized" isLast />
                                </div>
                            </div>

                            {/* Footer Branding */}
                            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-dashed border-slate-200 pt-8 sm:flex-row">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Hosted By</p>
                                    <p className="text-xs font-bold text-slate-600">{config.hierarchy[2].full}</p>
                                </div>
                                <p className="font-mono text-[9px] text-slate-300 tracking-wider">
                                    REF: {attendee.id.substring(0, 13).toUpperCase()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share action */}
                <div className="mt-8 flex justify-center gap-4">
                    <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-amber-600 active:scale-95">
                        <Share2 className="h-4 w-4" /> Share Verification
                    </button>
                </div>
            </div>
        </main>
    );
}

// --- Helper Components ---

function DetailRow({ icon: Icon, label, value, isLast }: { icon: any, label: string, value: string, isLast?: boolean }) {
    return (
        <div className={`flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-amber-50/40 ${isLast ? "" : "border-b border-slate-50"}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-amber-600 ring-1 ring-slate-200/60">
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase leading-none mb-1.5">{label}</p>
                <p className="font-bold text-slate-800 truncate">{value}</p>
            </div>
        </div>
    );
}

function InvalidID() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf8] p-4 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500 shadow-xl shadow-red-100 ring-1 ring-red-100">
                <XCircle className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Invalid Ticket</h1>
            <p className="mt-2 mb-8 max-w-xs text-slate-500 font-medium">
                The verification code provided does not match any record in our database.
            </p>
            <Link
                href="/"
                className="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 active:scale-95"
            >
                Back to Home
            </Link>
        </main>
    );
}
