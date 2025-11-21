/* eslint-disable @typescript-eslint/no-explicit-any */
import { initSupabase } from "@/lib/supabase";
import {
    CheckCircle2,
    Clock,
    User,
    MapPin,
    ShieldCheck,
    XCircle,
} from "lucide-react";
import Link from "next/link";

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
        dateStyle: "full",
        timeStyle: "medium",
    }).format(date);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
                {/* Header Status - Gold/Amber Gradient */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-center text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                    <MotionCheckMark />
                    <h1 className="mt-4 text-2xl font-bold">
                        Verified Attendee
                    </h1>
                    <p className="text-amber-100 opacity-90">The Mantle 2025</p>
                </div>

                {/* User Details */}
                <div className="space-y-6 p-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {attendee.full_name}
                        </h2>
                        <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase">
                            {attendee.category}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <DetailItem
                            icon={ShieldCheck}
                            label="Chapter"
                            value={attendee.chapter}
                        />
                        <DetailItem
                            icon={User}
                            label="Unit"
                            value={attendee.unit}
                        />
                        <DetailItem
                            icon={Clock}
                            label="Registered On"
                            value={formattedDate}
                        />
                        <DetailItem
                            icon={MapPin}
                            label="Status"
                            value="Confirmed"
                        />
                    </div>

                    {/* Metadata for Admin */}
                    <div className="border-t border-slate-100 pt-6">
                        <p className="text-center font-mono text-xs text-slate-400">
                            UUID: {attendee.id}
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="flex justify-center border-t border-slate-100 bg-slate-50 p-4">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

// --- Sub Components ---

function DetailItem({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-amber-50/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    {label}
                </p>
                <p className="font-semibold text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function InvalidID() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <XCircle className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Invalid Ticket</h1>
            <p className="mt-2 mb-6 text-slate-500">
                This QR Code does not exist in our database.
            </p>
            <Link
                href="/"
                className="rounded-full bg-slate-900 px-6 py-2 text-sm font-bold text-white"
            >
                Go Home
            </Link>
        </main>
    );
}

function MotionCheckMark() {
    return (
        <div className="mx-auto flex h-16 w-16 animate-[bounce_1s_infinite] items-center justify-center rounded-full bg-white text-amber-600 shadow-lg">
            <CheckCircle2 className="h-8 w-8" />
        </div>
    );
}
