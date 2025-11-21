import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://clt-2025.vercel.app";

export const viewport: Viewport = {
    themeColor: "#16a34a", // Green-600 matching CRM brand
    width: "device-width",
    initialScale: 1,
    maximumScale: 1, // Prevents auto-zoom on inputs on iOS
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Campus Leadership Training 2025 | CRM Ondo Zone",
        template: "%s | CLT 2025",
    },
    description:
        "Join student leaders across Ondo Zone for CLT 2025 at FUTA. A transformative convergence for spiritual empowerment, leadership training, and fellowship.",
    keywords: [
        "CLT 2025",
        "Campus Leadership Training",
        "CRM Ondo Zone",
        "RCF FUTA",
        "Christian Conference",
        "Student Leadership",
        "Ondo State",
        "FUTA",
    ],
    authors: [{ name: "RCF FUTA ICT Team", url: "https://ict.rcffuta.com" }],
    creator: "The Redeemed Christian Fellowship FUTA Chapter",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}
            >
                <Toaster position="top-center" richColors />
                {children}
                {/* --- Footer --- */}
                <Footer />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
