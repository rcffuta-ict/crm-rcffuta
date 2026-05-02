"use client";

import { useState, useRef, useMemo } from "react";
import { fellowships } from "@/data/fellowships";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    ChevronRight,
    Loader2,
    Download,
    CalendarX,
} from "lucide-react";
import { toPng } from "html-to-image";
import { submitRegistration } from "@/actions/form.action";
import config from "@/data/rcrc";
import RegistrationTicket from "./RegistrationTicket";
import {
    FormLabel,
    CustomSelect,
    RadioGroup,
} from "@/components/common/FormComponents";

/* eslint-disable @typescript-eslint/no-explicit-any */

const isActive = config.registration.isActive;

export default function RegistrationForm() {
    const [category, setCategory] = useState("Student");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<any>(null);
    const ticketRef = useRef<HTMLDivElement>(null);

    // Derive units based on selected chapter
    const units = useMemo(() => {
        const currentChapter = fellowships.find(
            (f: any) => f.id === selectedChapter,
        );
        return currentChapter ? [...currentChapter.units] : [];
    }, [selectedChapter]);

    // ── Fellowship options ─────────────────────────────────────────────────
    const fellowshipOptions = useMemo(() => {
        return fellowships.map((f: any) => ({
            value: f.id,
            label: f.name,
        }));
    }, []);

    const unitOptions = useMemo(() => {
        return [
            ...units.map((u) => ({ value: u, label: u })),
            { value: "Other", label: "Other" },
        ];
    }, [units]);

    const handleChapterChange = (val: string) => {
        setSelectedChapter(val);
        setSelectedUnit(""); // Reset unit when chapter changes
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        toast.loading("Submitting form...", { id: "submission" });

        const currentCategory = formData.get("category") as string;

        if (currentCategory !== "Student") formData.set("unit", "N/A");

        const fellowship = formData.get("chapter");
        if (currentCategory === "Guest" && (!fellowship || fellowship === "")) {
            formData.set("chapter", "other");
        }

        const result = await submitRegistration(formData);
        setIsLoading(false);

        if (result?.success) {
            toast.success("Registered successfully! 🎉", { id: "submission" });
            setTicketData(result.data);
        } else {
            toast.error(result?.message || "An error occurred.", {
                id: "submission",
            });
        }
    }

    // ── Registration closed ─────────────────────────────────────────────────
    if (!isActive) {
        return (
            <div className="flex flex-col items-center py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 rounded-full border border-slate-200 bg-slate-100 p-6 text-slate-400"
                >
                    <CalendarX className="h-12 w-12" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    Registration Closed
                </h3>
                <p className="mx-auto max-w-xs text-slate-500">
                    There is no event currently scheduled. Please check back
                    later.
                </p>
            </div>
        );
    }

    // ── Success ticket ──────────────────────────────────────────────────────
    if (ticketData) {
        const ticketUrl = `${config.site.url}/attendees/${ticketData.id}`;

        async function downloadTicket() {
            if (!ticketRef.current) return;
            try {
                const dataUrl = await toPng(ticketRef.current, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: "#ffffff",
                });
                const link = document.createElement("a");
                link.download = `ticket-${ticketData.full_name.replace(/ /g, "-")}.png`;
                link.href = dataUrl;
                link.click();
            } catch {
                toast.error("Could not download ticket.");
            }
        }

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-8 py-4"
            >
                <RegistrationTicket
                    ref={ticketRef}
                    ticketData={ticketData}
                    ticketUrl={ticketUrl}
                />

                <div className="flex flex-col items-center gap-6">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                        <CheckCircle2 className="h-5 w-5" /> Registration
                        Confirmed
                    </p>

                    <div className="flex w-full max-w-xs flex-col gap-3">
                        <button
                            onClick={downloadTicket}
                            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Download className="h-4 w-4" /> Download Ticket
                        </button>
                        <button
                            onClick={() => setTicketData(null)}
                            className="rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50"
                        >
                            Register Another
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Personal details */}
            <div className="space-y-5">
                <div>
                    <FormLabel required>Full Name</FormLabel>
                    <input
                        name="fullName"
                        required
                        type="text"
                        placeholder="Surname and Firstname"
                        className="input-base"
                    />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <FormLabel required>Email Address</FormLabel>
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="input-base"
                        />
                    </div>
                    <div>
                        <FormLabel required>Phone Number</FormLabel>
                        <input
                            name="phoneNumber"
                            required
                            type="tel"
                            placeholder="080..."
                            className="input-base"
                        />
                    </div>
                </div>
            </div>

            {/* Gender */}
            <div>
                <FormLabel required>Gender</FormLabel>
                <input type="hidden" name="gender" value={gender} required />
                <RadioGroup
                    name="gender_ui"
                    value={gender}
                    onChange={setGender}
                    options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                    ]}
                />
            </div>

            {/* Category */}
            <div>
                <FormLabel required>Category</FormLabel>
                <input type="hidden" name="category" value={category} />
                <RadioGroup
                    name="category_ui"
                    value={category}
                    onChange={(v) => {
                        setCategory(v);
                        if (v === "Guest") {
                            setSelectedChapter("");
                            setSelectedUnit("");
                        }
                    }}
                    options={[
                        { value: "Student", label: "Student" },
                        { value: "Alumni", label: "Alumni" },
                        { value: "Guest", label: "Guest" },
                    ]}
                />
            </div>

            {/* Fellowship Chapter */}
            <div>
                <FormLabel required={category !== "Guest"}>
                    Fellowship Chapter
                    {category === "Guest" && (
                        <span className="ml-1 font-normal text-slate-400 normal-case">
                            (Optional)
                        </span>
                    )}
                </FormLabel>
                <CustomSelect
                    name="chapter"
                    value={selectedChapter}
                    onChange={handleChapterChange}
                    placeholder="Select your chapter"
                    required={category !== "Guest"}
                    options={fellowshipOptions}
                />
            </div>

            {/* Unit — Students & Alumni only */}
            <AnimatePresence>
                {(category.toLowerCase() === "student" ||
                    category.toLowerCase() === "alumni") && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1"
                    >
                        <div className="pt-1">
                            <FormLabel required>Unit / Department</FormLabel>
                            <CustomSelect
                                key={selectedChapter || "none"}
                                name="unit"
                                value={selectedUnit}
                                onChange={setSelectedUnit}
                                placeholder={
                                    !selectedChapter
                                        ? "Select a chapter first"
                                        : "Select your unit"
                                }
                                required
                                disabled={!selectedChapter}
                                options={unitOptions || []}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expectations */}
            <div>
                <FormLabel>Expectations</FormLabel>
                <textarea
                    name="expectations"
                    rows={3}
                    className="input-base"
                    placeholder="Write your prayer request or expectation for the Congress..."
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-4 text-base font-bold text-white shadow-[0_4px_20px_-4px_rgba(217,119,6,0.4)] transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_-4px_rgba(217,119,6,0.5)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        Complete Registration{" "}
                        <ChevronRight className="h-5 w-5" />
                    </>
                )}
            </button>
        </form>
    );
}
