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
    gender: string;
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
            toast.success("Welcome, Admin! 🙏");
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
        link.download = `ZonalCongress2025_Registrations_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    // --- 5. STATS CALCULATION ---
    const stats = useMemo(() => {
        const total = data.length;
        const students = data.filter((r) => r.category === "Student").length;
        const alumni = data.filter((r) => r.category === "Alumni").length;
        const guests = data.filter((r) => r.category === "Guest").length;

        // Gender Stats
        const males = data.filter((r) => r.gender === "Male").length;
        const females = data.filter((r) => r.gender === "Female").length;

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

        return { total, students, alumni, guests, males, females, chapterStats };
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
            <div className="relative flex min-h-screen items-center justify-center bg-[#fafaf8] p-4">
                {/* Background Decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
                </div>

                <div className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/60 bg-white p-10 shadow-2xl shadow-amber-900/5">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 shadow-inner">
                            <Lock className="h-10 w-10" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Admin Access
                        </h1>
                        <p className="mt-2 text-sm font-medium text-slate-500">
                            Zonal Congress Registry Control
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Passcode</label>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-center text-lg font-bold tracking-widest focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 focus:outline-none transition-all"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
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
        <div className="min-h-screen bg-[#fafaf8] pb-20 selection:bg-amber-100 selection:text-amber-900">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white shadow-lg">
                            AC
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black tracking-tight text-slate-900 uppercase">Zonal Congress Admin</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                {process.env.NEXT_PUBLIC_APP_ACTIVE === "true" ? (
                                    <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase tracking-widest">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600"></span>
                                        Realtime Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[9px] font-bold text-red-600 uppercase tracking-widest">
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                        Registration Closed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Auto-Refresh Indicator */}
                        <button
                            onClick={() => refreshData()}
                            disabled={loading || isAutoRefreshing}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${isAutoRefreshing ? "bg-amber-100 text-amber-700" : "text-slate-500 hover:bg-slate-100"}`}
                            title="Refresh Data"
                        >
                            <RefreshCcw
                                className={`h-4 w-4 ${loading || isAutoRefreshing ? "animate-spin" : ""}`}
                            />
                            {isAutoRefreshing && "Syncing..."}
                        </button>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-black tracking-widest text-white uppercase shadow-lg shadow-green-600/20 transition-all hover:bg-green-500 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Download className="h-4 w-4" /> Export CSV
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl space-y-10 px-4 pt-10">
                {/* 1. KPI Cards */}
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    <StatCard
                        label="Total Attendees"
                        value={stats.total}
                        icon={Users}
                        color="bg-slate-900 text-white"
                    />
                    <StatCard
                        label="Students"
                        value={stats.students}
                        icon={GraduationCap}
                        color="bg-amber-50 text-amber-600"
                    />
                    <StatCard
                        label="Alumni"
                        value={stats.alumni}
                        icon={Briefcase}
                        color="bg-slate-100 text-slate-600"
                    />
                    <StatCard
                        label="Guests"
                        value={stats.guests}
                        icon={UserCheck}
                        color="bg-green-50 text-green-600"
                    />
                </div>

                {/* 2. Analysis Grid */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Fellowship Leaderboard */}
                    <div className="rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/20 lg:col-span-2">
                        <div className="mb-8 flex items-center justify-between">
                            <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                                Fellowship Leaderboard
                            </h3>
                            <div className="rounded-full bg-slate-50 px-4 py-1 text-[10px] font-bold text-slate-500">
                                {stats.chapterStats.length} Active Chapters
                            </div>
                        </div>
                        <div className="max-h-[360px] space-y-5 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {stats.chapterStats.map((chap, i) => (
                                <div key={chap.id} className="group space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-3 font-bold text-slate-700">
                                            <span
                                                className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black ${i < 3 ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" : "bg-slate-100 text-slate-400"}`}
                                            >
                                                {i + 1}
                                            </span>
                                            {chap.name}
                                        </span>
                                        <span className="font-black text-slate-900">
                                            {chap.count}
                                        </span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-50">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? "bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm" : "bg-slate-900"}`}
                                            style={{
                                                width: `${(chap.count / stats.chapterStats[0]?.count) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insights Column */}
                    <div className="flex flex-col gap-8">
                        {/* Live Pulse */}
                        <div className="rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/20">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase">
                                    Live Registry
                                </h3>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
                                </span>
                            </div>
                            <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-5">
                                <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                    Recent Entry
                                </p>
                                <p className="truncate text-lg font-black text-slate-900 leading-tight">
                                    {data[0]?.full_name || "Syncing..."}
                                </p>
                                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-amber-600">
                                    <Clock className="h-3.5 w-3.5" />
                                    {data[0] ? timeAgo(data[0].created_at).toUpperCase() : "-"}
                                </div>
                            </div>
                        </div>

                        {/* Gender Distribution */}
                        <div className="rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/20">
                            <h3 className="mb-6 text-xs font-black tracking-widest text-slate-900 uppercase">
                                Gender Balance
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Male</span>
                                        <span className="text-2xl font-black text-slate-900">{stats.males}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Female</span>
                                        <span className="text-2xl font-black text-slate-900">{stats.females}</span>
                                    </div>
                                </div>
                                <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 flex">
                                    <div 
                                        className="h-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all duration-1000"
                                        style={{ width: `${stats.total ? (stats.males / stats.total) * 100 : 50}%` }}
                                    />
                                    <div 
                                        className="h-full bg-slate-400/30 transition-all duration-1000"
                                        style={{ width: `${stats.total ? (stats.females / stats.total) * 100 : 50}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>{stats.total ? Math.round((stats.males / stats.total) * 100) : 0}% Boys</span>
                                    <span>{stats.total ? Math.round((stats.females / stats.total) * 100) : 0}% Girls</span>
                                </div>
                            </div>
                        </div>

                        {/* Chapter Insight */}
                        <div className="flex-grow rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/20">
                            <h3 className="mb-6 text-xs font-black tracking-widest text-slate-900 uppercase">
                                Stats Overview
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                        Dominant Fellowship
                                    </p>
                                    <div className="flex items-end justify-between">
                                        <p className="max-w-[180px] truncate text-xl font-black text-amber-600">
                                            {stats.chapterStats[0]?.name || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black tracking-widest text-slate-500 uppercase">
                                        <span>Student Population</span>
                                        <span className="text-slate-900">
                                            {stats.total ? Math.round((stats.students / stats.total) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-50">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-slate-800 to-slate-900 transition-all duration-1000 shadow-sm"
                                            style={{
                                                width: `${stats.total ? (stats.students / stats.total) * 100 : 0}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registry Table */}
                <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/20">
                    <div className="flex flex-col justify-between gap-6 border-b border-slate-100 p-8 sm:flex-row sm:items-center">
                        <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                            Registry Entries
                        </h3>
                        <div className="relative">
                            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search attendees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-3 pr-5 pl-12 text-sm font-medium focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 focus:outline-none transition-all sm:w-80"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                <tr>
                                    <th className="px-8 py-5">Full Name</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Fellowship Info</th>
                                    <th className="px-8 py-5 whitespace-nowrap">Timestamp</th>
                                    <th className="px-8 py-5 text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedData.map((row) => {
                                    const fellowshipName = fellowships.find((f) => f.id === row.chapter)?.short || row.chapter || "-";
                                    return (
                                        <tr key={row.id} className="group transition-colors hover:bg-slate-50/50">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                                    {row.full_name}
                                                </div>
                                                <div className="text-[10px] font-medium text-slate-400">
                                                    {row.phone_number}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black tracking-widest uppercase ${
                                                    row.category === "Student" ? "bg-green-50 text-green-700" : 
                                                    row.category === "Alumni" ? "bg-slate-100 text-slate-700" : 
                                                    "bg-amber-50 text-amber-700"
                                                }`}>
                                                    {row.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-800">
                                                    {fellowshipName}
                                                </div>
                                                <div className="max-w-[150px] truncate text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                                    {row.unit || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-[11px] font-medium text-slate-500 uppercase">
                                                {timeAgo(row.created_at)}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <a
                                                    href={`/attendees/${row.id}`}
                                                    target="_blank"
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-amber-600 hover:text-white hover:shadow-lg hover:shadow-amber-600/20 active:scale-90"
                                                    title="Verify Ticket"
                                                >
                                                    <ArrowUpRight className="h-5 w-5" />
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                                                    <Search className="h-6 w-6" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-400">No matching registry entries found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 p-6">
                            <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
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
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/10 transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-8 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110 ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="h-10 w-10 opacity-5 grayscale group-hover:opacity-20 group-hover:grayscale-0 transition-all">
                    <Icon className="h-full w-full" />
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                    {label}
                </p>
                <p className="mt-1 text-4xl font-black text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
