"use client";

import { useEffect, useState, useRef } from "react";
import { fellowships } from "@/data/fellowships";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronRight,
    Loader2,
    Download,
    CalendarX,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { submitRegistration } from "@/actions/form.action";
import { unslugify } from "@/lib/function";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper component for consistent labels with required indicator
const FormLabel = ({
    children,
    required,
}: {
    children: React.ReactNode;
    required?: boolean;
}) => (
    <label className="mb-2 block text-sm text-xs font-bold tracking-wide text-slate-700 uppercase">
        {children}
        {required && (
            <span className="ml-1 text-red-500" title="Required">
                *
            </span>
        )}
    </label>
);

const isActive = process.env.NEXT_PUBLIC_APP_ACTIVE === "true";

export default function RegistrationForm() {
    const [category, setCategory] = useState("Student"); // Default to Student
    const [selectedChapter, setSelectedChapter] = useState("");
    const [units, setUnits] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Store the successful registration data here
    const [ticketData, setTicketData] = useState<any>(null);

    const ticketRef = useRef<HTMLDivElement>(null);

    // --- NO EVENT STATE ---

    useEffect(() => {
        const chapterData = fellowships.find(
            (f: any) => f.id === selectedChapter,
        );
        setUnits(chapterData ? [...chapterData.units] : []);
    }, [selectedChapter]);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        toast.loading("Submitting form...", {
            id: "submission",
        });

        // --- LOGIC CORRECTION FOR SERVER VALIDATION ---
        // Since we are hiding fields in the UI, we must ensure the server
        // receives valid data to pass the Zod schema.

        const currentCategory = formData.get("category") as string;

        // 1. Handle Unit (If not a student, set unit to "N/A")
        if (currentCategory !== "Student") {
            formData.set("unit", "N/A");
        }

        // 2. Handle Fellowship (If Guest and empty, set to "guest" or "N/A")
        const fellowship = formData.get("chapter");
        if (currentCategory === "Guest" && (!fellowship || fellowship === "")) {
            // Assuming your 'fellowships' data has an ID for 'guest' or 'other'.
            // If not, use the first available or a specific string string your DB accepts.
            formData.set("chapter", "guest");
        }

        try {
            const result = await submitRegistration(formData);

            if (result.success) {
                setTicketData(result.data);
                toast.success(result.message, {
                    id: "submission",
                });
            } else {
                if (result.errors) {
                    const errorDetails = Object.entries(result.errors)
                        .map(([field, messages]) => {
                            const readableField = field
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());

                            const messageText = Array.isArray(messages)
                                ? messages.join(", ")
                                : messages;

                            return `• ${readableField}: ${messageText}`;
                        })
                        .join("\n");

                    toast.error("Please fix the following:", {
                        description: errorDetails,
                        duration: 6000,
                        style: { whiteSpace: "pre-line" },
                        id: "submission",
                    });
                } else {
                    toast.error("Registration Failed", {
                        id: "submission",
                        description: result.message,
                    });
                }
            }
        } catch (e) {
            console.error("Submission error:", e);
            toast.error("Connection Error", {
                id: "submission",
                description:
                    "Please check your internet connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadTicket = async () => {
        if (!ticketRef.current) return;

        toast.loading("Generating ticket...", {
            id: "ticketId",
        });

        try {
            const dataUrl = await toPng(ticketRef.current, {
                quality: 1.0,
                pixelRatio: 3,
                backgroundColor: "white",
                skipFonts: true,
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            const fileName = `CLT2025-Ticket-${ticketData.full_name.replace(/\s+/g, "-")}.png`;
            link.download = fileName;
            link.click();

            toast.success("Ticket downloaded!", { id: "ticketId" });
        } catch (err) {
            console.error("Ticket generation failed:", err);
            toast.error(
                "Could not generate ticket. Please screenshot instead.",
                { id: "ticketId" },
            );
        }
    };

    // --- NO EVENT STATE ---
    if (!isActive) {
        return (
            <div className="flex flex-col items-center py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 rounded-full bg-slate-100 p-6 text-slate-400"
                >
                    <CalendarX className="h-12 w-12" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    Registration Closed
                </h3>
                <p className="mx-auto max-w-xs text-slate-600">
                    There is no event currently scheduled. Please check back
                    later for upcoming programs.
                </p>
            </div>
        );
    }

    // --- SUCCESS STATE ---
    if (ticketData) {
        const verificationUrl = `${window.location.origin}/attendees/${ticketData.id}`;

        return (
            <div className="flex flex-col items-center py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                        Seat Secured!
                    </h3>
                    <p className="text-slate-600">
                        Here is your access tag for The Mantle 2025.
                    </p>
                </motion.div>

                {/* --- THE TICKET CARD --- */}
                <div className="group perspective-1000 relative">
                    <div
                        ref={ticketRef}
                        className="relative w-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
                    >
                        <div className="relative flex h-24 items-center justify-center overflow-hidden bg-slate-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500 to-transparent opacity-30"></div>
                            <div className="text-center">
                                <h2 className="relative z-10 text-2xl font-bold tracking-widest text-white">
                                    CLT 2025
                                </h2>
                                <p className="relative z-10 text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase">
                                    The Mantle
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-20 left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full border border-slate-200 bg-slate-50"></div>

                        <div className="px-6 pt-8 pb-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase">
                                {ticketData.category}
                            </span>
                            <h2 className="mb-1 truncate text-2xl leading-tight font-bold text-slate-900">
                                {ticketData.full_name}
                            </h2>
                            <p className="mb-6 truncate text-sm font-medium text-slate-500">
                                {unslugify(ticketData.chapter)}
                            </p>

                            {/* Details Grid */}
                            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-left text-xs">
                                <div>
                                    <p className="text-[10px] font-bold text-amber-600/70 uppercase">
                                        Unit
                                    </p>
                                    <p className="truncate font-semibold text-slate-800">
                                        {ticketData.unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-amber-600/70 uppercase">
                                        Date
                                    </p>
                                    <p className="font-semibold text-slate-800">
                                        Nov 21, 2025
                                    </p>
                                </div>
                            </div>

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
                        <div className="h-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
                    </div>
                </div>

                <div className="mt-8 flex w-full max-w-[320px] gap-4">
                    <button
                        onClick={handleDownloadTicket}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-3 font-bold text-white shadow-lg shadow-amber-900/20 transition-all hover:from-amber-500 hover:to-amber-600 active:scale-95"
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

    // --- FORM RENDER ---
    const inputClass =
        "w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400";

    return (
        <form action={handleSubmit} className="space-y-8">
            <div className="space-y-6">
                <div>
                    <FormLabel required>Full Name</FormLabel>
                    <input
                        name="fullName"
                        required
                        type="text"
                        placeholder="Surname and Firstname"
                        className={inputClass}
                    />
                </div>
                <div>
                    <FormLabel required>Email Address</FormLabel>
                    <input
                        name="email"
                        required
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass}
                    />
                </div>
                <div>
                    <FormLabel required>Phone Number</FormLabel>
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
                    <FormLabel required>Gender</FormLabel>
                    <div className="flex gap-4">
                        {["Male", "Female"].map((g) => (
                            <label
                                key={g}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 transition-all hover:border-amber-200 hover:bg-amber-50"
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    required
                                    className="h-4 w-4 accent-amber-600"
                                />
                                <span className="text-sm font-medium">{g}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Category Selection */}
                <div>
                    <FormLabel required>Category</FormLabel>
                    <select
                        name="category"
                        required
                        className={inputClass}
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            // If switching away from Student, check logic for other fields
                            if (e.target.value !== "Student") {
                                // Optional: Clear unit or chapter if needed
                            }
                        }}
                    >
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
            </div>

            <div>
                {/* Fellowship Logic:
                    - Student/Alumni: Required
                    - Guest: Optional
                 */}
                <FormLabel required={category !== "Guest"}>
                    Fellowship Chapter
                </FormLabel>
                <select
                    name="chapter"
                    required={category !== "Guest"} // Only required if NOT Guest
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className={inputClass}
                >
                    <option value="" disabled>
                        Select your chapter{" "}
                        {category === "Guest" && "(Optional)"}
                    </option>
                    {fellowships.map((f: any) => (
                        <option key={f.id} value={f.id}>
                            {f.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Unit Logic: Only show for Students */}
            {category === "Student" && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <FormLabel required>Unit / Department</FormLabel>
                    <select
                        name="unit"
                        required
                        disabled={!selectedChapter}
                        className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                        <option value="" disabled defaultValue={""}>
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
                </motion.div>
            )}

            <div>
                <FormLabel>Expectations</FormLabel>
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
                className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-4 text-lg font-bold text-white shadow-xl shadow-amber-900/20 transition-all hover:scale-[1.01] hover:from-amber-500 hover:to-amber-600 active:scale-[0.99] disabled:cursor-not-allowed"
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
