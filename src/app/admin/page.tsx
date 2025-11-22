/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { getAdminData } from "@/actions/admin.action";
import { fellowships } from "@/data/fellowships";
import {
    Loader2,
    Users,
    GraduationCap,
    UserCheck,
    Download,
    Search,
    Lock,
    RefreshCcw,
    ArrowUpRight,
    Briefcase,
    Clock,
} from "lucide-react";
import { toast } from "sonner";
import { initSupabase } from "@/lib/supabase";

// --- INITIALIZE SUPABASE CLIENT (For Realtime Listening Only) ---
const supabase = initSupabase();

// --- TYPES ---
type Registration = {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    category: "Student" | "Alumni" | "Guest";
    chapter: string;
    unit: string;
    created_at: string;
};

// --- HELPER: Relative Time ---
function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function AdminDashboard() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");

    // Data State
    const [loading, setLoading] = useState(false);
    const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);
    const [data, setData] = useState<Registration[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Debounce Ref for Realtime
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // --- 1. AUTHENTICATION ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await getAdminData(passcode);
        setLoading(false);

        if (res.success && res.data) {
            setData(res.data);
            setIsAuthenticated(true);
            toast.success("Welcome Admin");
        } else {
            toast.error("Invalid Passcode");
        }
    };

    // --- 2. DATA FETCHING & REFRESH ---
    const refreshData = async (silent = false) => {
        if (!silent) setLoading(true);

        // Use the passcode stored in state (simple auth)
        const res = await getAdminData(passcode);

        if (res.success && res.data) {
            setData(res.data);
            if (!silent) toast.success("Data Refreshed");
        }
        if (!silent) setLoading(false);
    };

    // --- 3. REALTIME LISTENER ---
    useEffect(() => {
        if (!isAuthenticated) return;

        // Subscribe to INSERT events on 'registrations' table
        const channel = supabase
            .channel("registrations-db-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "registrations",
                },
                () => {
                    // TRIGGER DEBOUNCED REFRESH
                    setIsAutoRefreshing(true); // Start spinning icon immediately

                    if (debounceRef.current) {
                        clearTimeout(debounceRef.current);
                    }

                    // Wait 2 seconds after the last insert to fetch new data
                    // This prevents spamming the server if 50 people register at once
                    debounceRef.current = setTimeout(async () => {
                        await refreshData(true); // Silent refresh
                        setIsAutoRefreshing(false); // Stop spinning
                        toast.info("New attendees added!");
                    }, 2000);
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isAuthenticated, passcode]);

    // --- 4. CSV EXPORT ---
    const downloadCSV = () => {
        const headers = [
            "Name",
            "Phone",
            "Email",
            "Category",
            "Chapter",
            "Unit",
            "Time",
        ];
        const csvContent = [
            headers.join(","),
            ...data.map((row) =>
                [
                    `"${row.full_name}"`,
                    `"${row.phone_number}"`,
                    `"${row.email}"`,
                    row.category,
                    `"${fellowships.find((f) => f.id === row.chapter)?.name || row.chapter || "N/A"}"`,
                    `"${row.unit || "N/A"}"`,
                    new Date(row.created_at).toLocaleString(),
                ].join(","),
            ),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `CLT2025_Registrations_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    // --- 5. STATS CALCULATION ---
    const stats = useMemo(() => {
        const total = data.length;
        const students = data.filter((r) => r.category === "Student").length;
        const alumni = data.filter((r) => r.category === "Alumni").length;
        const guests = data.filter((r) => r.category === "Guest").length;

        // Group by Chapter
        const chapterCounts: Record<string, number> = {};
        data.forEach((r) => {
            if (r.chapter && r.chapter !== "guest") {
                const ch = r.chapter;
                chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
            }
        });

        // Sort Leaders
        const chapterStats = Object.entries(chapterCounts)
            .map(([id, count]) => ({
                id,
                name: fellowships.find((f) => f.id === id)?.short || id,
                count,
            }))
            .sort((a, b) => b.count - a.count);

        return { total, students, alumni, guests, chapterStats };
    }, [data]);

    // --- 6. FILTERING & PAGINATION ---
    const filteredData = useMemo(() => {
        return data.filter(
            (r) =>
                r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.phone_number.includes(searchTerm) ||
                r.chapter?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Reset page on search
    useEffect(() => {
        function runIt() {
            setCurrentPage(1);
        }

        runIt();
    }, [searchTerm]);

    // --- RENDER: LOGIN SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <Lock className="h-8 w-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Admin Access
                        </h1>
                        <p className="text-slate-500">
                            Enter passcode to view CLT Dashboard
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="Enter Access Code"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Unlock Dashboard"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- RENDER: DASHBOARD ---
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">CLT Admin</span>
                        {process.env.NEXT_PUBLIC_APP_ACTIVE === "true" ? (
                            <span className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-600">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600"></span>
                                LIVE
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                CLOSED
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Auto-Refresh Indicator */}
                        <button
                            onClick={() => refreshData()}
                            disabled={loading || isAutoRefreshing}
                            className={`rounded-lg p-2 transition-colors ${isAutoRefreshing ? "bg-amber-500/10 text-amber-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                            title="Refresh Data"
                        >
                            <RefreshCcw
                                className={`h-5 w-5 ${loading || isAutoRefreshing ? "animate-spin" : ""}`}
                            />
                        </button>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold transition-colors hover:bg-green-500"
                        >
                            <Download className="h-4 w-4" /> CSV
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl space-y-8 px-4 pt-8">
                {/* 1. KPI Cards (Updated) */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                    <StatCard
                        label="Total Attendees"
                        value={stats.total}
                        icon={Users}
                        color="bg-slate-100 text-slate-700"
                    />
                    <StatCard
                        label="Students"
                        value={stats.students}
                        icon={GraduationCap}
                        color="bg-green-50 text-green-600"
                    />
                    <StatCard
                        label="Alumni"
                        value={stats.alumni}
                        icon={Briefcase}
                        color="bg-blue-50 text-blue-600"
                    />
                    <StatCard
                        label="Guests"
                        value={stats.guests}
                        icon={UserCheck}
                        color="bg-amber-50 text-amber-600"
                    />
                </div>

                {/* 2. Charts & Analysis */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Col: Chapter Leaderboard */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
                        <h3 className="mb-6 font-bold text-slate-900">
                            Fellowship Leaderboard
                        </h3>
                        <div className="max-h-[300px] space-y-4 overflow-y-auto pr-2">
                            {stats.chapterStats.map((chap, i) => (
                                <div key={chap.id} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-2 font-medium text-slate-700">
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${i < 3 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}
                                            >
                                                {i + 1}
                                            </span>
                                            {chap.name}
                                        </span>
                                        <span className="font-bold text-slate-900">
                                            {chap.count}
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={`h-full rounded-full ${i === 0 ? "bg-green-500" : "bg-slate-900"}`}
                                            style={{
                                                width: `${(chap.count / stats.chapterStats[0]?.count) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Insights Column (Stacked) */}
                    <div className="flex flex-col gap-6">
                        {/* A. Live Pulse (Realtime Last Registration) */}
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">
                                    Registration Update
                                </h3>
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                </span>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <p className="mb-1 text-xs font-bold text-slate-500 uppercase">
                                    Last Registration
                                </p>
                                <p className="truncate font-bold text-slate-900">
                                    {data[0]?.full_name || "Waiting..."}
                                </p>
                                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
                                    <Clock className="h-3 w-3" />
                                    {data[0]
                                        ? timeAgo(data[0].created_at)
                                        : "-"}
                                </div>
                            </div>
                        </div>

                        {/* B. Deep Analysis (Restored) */}
                        <div className="flex-grow rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-slate-900">
                                Chapter Insight
                            </h3>
                            <div className="space-y-6">
                                {/* Top Fellowship */}
                                <div>
                                    <p className="mb-1 text-xs font-bold text-slate-500 uppercase">
                                        Leading Chapter
                                    </p>
                                    <div className="flex items-end justify-between">
                                        <p className="max-w-[150px] truncate text-lg font-bold text-green-600">
                                            {stats.chapterStats[0]?.name ||
                                                "N/A"}
                                        </p>
                                        {/* <p className="text-sm font-bold text-slate-900">
                                            {stats.chapterStats[0]?.count || 0}
                                        </p> */}
                                    </div>
                                </div>

                                {/* Student Ratio */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Student Ratio</span>
                                        <span className="font-bold">
                                            {stats.total
                                                ? Math.round(
                                                      (stats.students /
                                                          stats.total) *
                                                          100,
                                                  )
                                                : 0}
                                            %
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-amber-500 transition-all duration-1000"
                                            style={{
                                                width: `${stats.total ? (stats.students / stats.total) * 100 : 0}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-right text-xs text-slate-400">
                                        Total registered:{" "}
                                        {stats.chapterStats[0]?.count || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Detailed Table with Pagination */}
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
                        <h3 className="font-bold text-slate-900">
                            Attendees List
                        </h3>
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search name, phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none sm:w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 font-medium text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Info</th>
                                    <th className="px-6 py-4 whitespace-nowrap">
                                        Checked In
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedData.map((row) => {
                                    const fellowshipName =
                                        fellowships.find(
                                            (f) => f.id === row.chapter,
                                        )?.short ||
                                        row.chapter ||
                                        "-";
                                    return (
                                        <tr
                                            key={row.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">
                                                    {row.full_name}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {row.phone_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ${
                                                        row.category ===
                                                        "Student"
                                                            ? "bg-green-100 text-green-700"
                                                            : row.category ===
                                                                "Alumni"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-amber-100 text-amber-700"
                                                    }`}
                                                >
                                                    {row.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">
                                                    {fellowshipName}
                                                </div>
                                                <div className="max-w-[150px] truncate text-xs text-slate-500">
                                                    {row.unit || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                                {timeAgo(row.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href={`/attendees/${row.id}`}
                                                    target="_blank"
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-amber-100 hover:text-amber-600"
                                                    title="View Ticket"
                                                >
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-slate-400"
                                        >
                                            No attendees found matching your
                                            search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4">
                            <div className="text-xs text-slate-500">
                                Page {currentPage} of {totalPages} (
                                {filteredData.length} total)
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="rounded border border-slate-200 bg-white px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(totalPages, p + 1),
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="rounded border border-slate-200 bg-white px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Helper Component ---
function StatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: number;
    icon: any;
    color: string;
}) {
    return (
        <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-start justify-between">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
                >
                    <Icon className="h-5 w-5" />
                </div>
                {/* Optional mini sparkline or trend indicator could go here */}
            </div>
            <div>
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                    {label}
                </p>
                <p className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {value}
                </p>
            </div>
        </div>
    );
}
