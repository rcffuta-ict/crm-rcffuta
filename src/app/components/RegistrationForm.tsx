"use client";
import { useEffect, useState } from "react";
import { fellowships } from "@/data/fellowships"; // Keep your existing data file
import { submitRegistration } from "@/app/actions/form.action"; // Keep your existing action file
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RegistrationForm() {
    // ... Same logic as previous code, just ensure styles match the new theme ...
    // For brevity, I am pasting the logic but you can use the one from the previous response.
    // I've updated the styling classes below to match the "Elegant" theme.

    const [selectedChapter, setSelectedChapter] = useState("");
    const [units, setUnits] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                setIsSuccess(true);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="py-12 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600"
                >
                    <CheckCircle2 className="h-12 w-12" />
                </motion.div>
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                    Registration Confirmed
                </h3>
                <p className="mb-8 text-slate-600">
                    Your details have been captured. Get ready for an encounter!
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="font-bold text-green-700 hover:underline"
                >
                    Register another attendee
                </button>
            </div>
        );
    }

    const inputClass =
        "w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400";
    const labelClass =
        "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs";

    return (
        <form action={handleSubmit} className="space-y-8">
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

            <div className="grid grid-cols-2 gap-6">
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
                                    className="accent-green-600"
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
