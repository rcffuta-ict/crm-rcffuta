"use client";

import { useEffect, useState, useRef } from "react";
import { fellowships } from "@/data/fellowships";
import { submitRegistration } from "@/actions/form.action";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronRight,
    Loader2,
    Download,
    Share2,
    MapPin,
    Calendar,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { unslugify } from "@/lib/function";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RegistrationForm() {
    const [selectedChapter, setSelectedChapter] = useState("");
    const [units, setUnits] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Store the successful registration data here
    const [ticketData, setTicketData] = useState<any>(null);

    const ticketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chapterData = fellowships.find(
            (f: any) => f.id === selectedChapter,
        );
        setUnits(chapterData ? [...chapterData.units] : []);
    }, [selectedChapter]);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            const result = await submitRegistration(formData);

            if (result.success) {
                // 1. Success Case
                setTicketData(result.data);
                toast.success(result.message);
            } else {
                // 2. Validation Error Case (Zod)
                if (result.errors) {
                    // Format validation errors into a readable list
                    // e.g. "Phone Number: Invalid format"
                    const errorDetails = Object.entries(result.errors)
                        .map(([field, messages]) => {
                            // Make field name readable (e.g., phoneNumber -> Phone Number)
                            const readableField = field
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());

                            // Combine messages
                            const messageText = Array.isArray(messages)
                                ? messages.join(", ")
                                : messages;

                            return `• ${readableField}: ${messageText}`;
                        })
                        .join("\n");

                    toast.error("Validation Failed", {
                        description: errorDetails,
                        duration: 5000, // Keep it visible longer so they can read
                        style: { whiteSpace: "pre-line" }, // Ensure newlines render
                    });
                } else {
                    // 3. Generic Server Error (e.g. "Failed to save")
                    toast.error("Registration Failed", {
                        description: result.message,
                    });
                }
            }
        } catch (e) {
            // 4. Network or Crash Errors
            console.error("Submission error:", e);
            toast.error("Connection Error", {
                description:
                    "Please check your internet connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadTicket = async () => {
        if (!ticketRef.current) return;

        const toastId = toast.loading("Generating ticket...", {
            id: "ticketId",
        });

        try {
            const dataUrl = await toPng(ticketRef.current, {
                quality: 1.0,
                pixelRatio: 3, // Increased for sharper text
                backgroundColor: "white",
                // This fixes the "trim" / "font is undefined" error
                skipFonts: true,
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            const fileName = `CLT2025-Ticket-${ticketData.full_name.replace(/\s+/g, "-")}.png`;
            link.download = fileName;
            link.click();

            // toast.dismiss(toastId);
            toast.success("Ticket downloaded!", {
                id: "ticketId",
            });
        } catch (err) {
            console.error("Ticket generation failed:", err);
            // toast.dismiss(toastId);
            toast.error(
                "Could not generate ticket. Please screenshot instead.",
                {
                    id: "ticketId",
                },
            );
        }
    };

    // --- SUCCESS STATE: THE TICKET VIEW ---
    if (ticketData) {
        // This URL matches the Page we will build in Part 3
        const verificationUrl = `${window.location.origin}/attendees/${ticketData.id}`;

        return (
            <div className="flex flex-col items-center py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                        You are confirmed!
                    </h3>
                    <p className="text-slate-600">
                        Please save your tag below.
                    </p>
                </motion.div>

                {/* --- THE TICKET CARD (Ref for Download) --- */}
                <div className="group perspective-1000 relative">
                    <div
                        ref={ticketRef}
                        className="relative w-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
                    >
                        {/* Decorative Header */}
                        <div className="relative flex h-24 items-center justify-center overflow-hidden bg-slate-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-600 to-transparent opacity-40"></div>
                            <h2 className="relative z-10 text-2xl font-bold tracking-widest text-white">
                                CLT 2025
                            </h2>
                        </div>

                        {/* Ticket Hole Punch Visual */}
                        <div className="absolute top-20 left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full border border-slate-200 bg-slate-50"></div>

                        {/* Content */}
                        <div className="px-6 pt-8 pb-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold tracking-wider text-green-700 uppercase">
                                {ticketData.category}
                            </span>

                            <h2 className="mb-1 truncate text-2xl leading-tight font-bold text-slate-900">
                                {ticketData.full_name}
                            </h2>

                            <p className="mb-6 truncate text-sm font-medium text-slate-500">
                                {unslugify(ticketData.chapter)}
                            </p>

                            {/* Details Grid */}
                            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left text-xs">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        Unit
                                    </p>
                                    <p className="truncate font-semibold text-slate-700">
                                        {ticketData.unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        Date
                                    </p>
                                    <p className="font-semibold text-slate-700">
                                        Nov 21, 2025
                                    </p>
                                </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                                    <QRCodeSVG
                                        value={verificationUrl}
                                        size={100}
                                        level="H"
                                        fgColor="#0f172a"
                                    />
                                </div>
                                <p className="mt-1 font-mono text-[10px] text-slate-400">
                                    ID: {ticketData.id.slice(0, 8)}...
                                </p>
                            </div>
                        </div>

                        {/* Footer Strip */}
                        <div className="h-3 bg-gradient-to-r from-green-500 via-blue-500 to-green-500"></div>
                    </div>
                </div>

                {/* --- Actions --- */}
                <div className="mt-8 flex w-full max-w-[320px] gap-4">
                    <button
                        onClick={handleDownloadTicket}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95"
                    >
                        <Download className="h-4 w-4" />
                        Save Tag
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50"
                        title="Register Another"
                    >
                        New
                    </button>
                </div>
            </div>
        );
    }

    // --- FORM RENDER (Unchanged Logic, just styles) ---
    const inputClass =
        "w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400";
    const labelClass =
        "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs";

    return (
        <form action={handleSubmit} className="space-y-8">
            {/* ... Your existing form fields ... */}
            {/* I am omitting the inputs for brevity as they are unchanged from your prompt */}

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                        name="fullName"
                        required
                        type="text"
                        placeholder="Surname Firstname"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                        name="phoneNumber"
                        required
                        type="tel"
                        placeholder="080..."
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className={labelClass}>Gender</label>
                    <div className="flex gap-4">
                        {["Male", "Female"].map((g) => (
                            <label
                                key={g}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 transition-all hover:border-green-200 hover:bg-green-50"
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    required
                                    className="h-4 w-4 accent-green-600" // Added explicit size for better touch
                                />
                                <span className="text-sm font-medium">{g}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Category</label>
                    <select name="category" required className={inputClass}>
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
            </div>

            <div>
                <label className={labelClass}>Fellowship Chapter</label>
                <select
                    name="chapter"
                    required
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className={inputClass}
                >
                    <option value="" disabled>
                        Select your chapter
                    </option>
                    {fellowships.map((f: any) => (
                        <option key={f.id} value={f.id}>
                            {f.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className={labelClass}>Unit / Department</label>
                <select
                    name="unit"
                    required
                    disabled={!selectedChapter}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                    <option value="" disabled selected>
                        {!selectedChapter
                            ? "Select a chapter first"
                            : "Select your unit"}
                    </option>
                    {units.map((u) => (
                        <option key={u} value={u}>
                            {u}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className={labelClass}>Expectations</label>
                <textarea
                    name="expectations"
                    rows={3}
                    className={inputClass}
                    placeholder="Write your prayer request or expectation..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.01] hover:bg-slate-800 active:scale-[0.99]"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        Complete Registration <ChevronRight />
                    </>
                )}
            </button>
        </form>
    );
}
