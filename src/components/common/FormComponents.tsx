"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// FormLabel
// ─────────────────────────────────────────────────────────────────────────────
export function FormLabel({
    children,
    required,
    htmlFor,
}: {
    children: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
}) {
    return (
        <label htmlFor={htmlFor} className="input-label mb-2 block">
            {children}
            {required && <span className="required-star">*</span>}
        </label>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// FormGroup — wraps label + input with consistent spacing
// ─────────────────────────────────────────────────────────────────────────────
export function FormGroup({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={`flex flex-col ${className}`}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CustomSelect — animated dropdown with custom option list
// ─────────────────────────────────────────────────────────────────────────────
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type CustomSelectProps = {
    name: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
};

export function CustomSelect({
    name,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    required,
    disabled,
    id,
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const selected = options.find((o) => o.value === value);

    console.log("Open", open);
    return (
        <div
            ref={ref}
            className={`relative ${disabled ? "pointer-events-none opacity-50" : ""}`}
            id={id}
        >
            {/* Visually hidden native input for browser validation */}
            <input
                type="text"
                name={name}
                value={value}
                required={required}
                readOnly
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
                tabIndex={-1}
            />

            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`input-base select-base flex w-full cursor-pointer items-center transition-all ${
                    open
                        ? "border-amber-500 bg-[#fffdf5] ring-4 ring-amber-500/10"
                        : ""
                } ${!selected ? "text-slate-400" : "text-slate-900"}`}
            >
                <span className="flex truncate font-medium">
                    {selected ? selected.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "circOut" }}
                    className="-mr-1 flex h-5 w-5 items-center justify-center"
                >
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                </motion.div>
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
                        role="listbox"
                    >
                        <div className="max-h-60 overflow-y-auto p-1.5">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={value === opt.value}
                                    disabled={opt.disabled}
                                    onClick={() => {
                                        if (!opt.disabled) {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }
                                    }}
                                    className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                                        opt.disabled
                                            ? "cursor-not-allowed text-slate-300"
                                            : value === opt.value
                                              ? "bg-amber-50 text-amber-800"
                                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && (
                                        <Check className="h-4 w-4 text-amber-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// RadioGroup — custom pill-style radio buttons
// ─────────────────────────────────────────────────────────────────────────────
type RadioOption = { value: string; label: string };

type RadioGroupProps = {
    name: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
};

export function RadioGroup({
    name,
    options,
    value,
    onChange,
    required,
}: RadioGroupProps) {
    return (
        <div className="flex gap-3" role="radiogroup">
            <input
                type="hidden"
                name={name}
                value={value}
                required={required}
            />
            {options.map((opt) => {
                const checked = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        onClick={() => onChange(opt.value)}
                        className={`group relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                            checked
                                ? "border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100/60 text-amber-800 shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                                : "border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50/40 hover:text-amber-700"
                        }`}
                    >
                        {/* Custom radio indicator */}
                        <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                checked
                                    ? "border-amber-500 bg-amber-500"
                                    : "border-slate-300 bg-white group-hover:border-amber-300"
                            }`}
                        >
                            <AnimatePresence>
                                {checked && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="block h-1.5 w-1.5 rounded-full bg-white"
                                    />
                                )}
                            </AnimatePresence>
                        </span>
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CustomCheckbox — individual styled checkbox
// ─────────────────────────────────────────────────────────────────────────────
type CheckboxProps = {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
};

export function CustomCheckbox({
    name,
    label,
    checked,
    onChange,
    id,
}: CheckboxProps) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            id={id}
            onClick={() => onChange(!checked)}
            className="group flex cursor-pointer items-center gap-3 text-left"
        >
            <input type="hidden" name={name} value={checked ? "true" : ""} />
            <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                    checked
                        ? "border-amber-500 bg-amber-500"
                        : "border-slate-300 bg-white group-hover:border-amber-400"
                }`}
            >
                <AnimatePresence>
                    {checked && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Check
                                className="h-3 w-3 text-white"
                                strokeWidth={3}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                {label}
            </span>
        </button>
    );
}
