import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://clt-rcffuta.vercel.app";

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
    creator: "Christ Redeemer's Ministries",
    openGraph: {
        type: "website",
        locale: "en_NG",
        url: SITE_URL,
        title: "Campus Leadership Training 2025",
        description:
            "Equipping the stewards of God's heritage for maximum impact. Register now for the largest gathering of campus leaders in Ondo Zone.",
        siteName: "CRM CLT 2025",
        images: [
            {
                url: "/images/og-image.jpg", // You must create this image
                width: 1200,
                height: 630,
                alt: "CLT 2025 Event Banner",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Campus Leadership Training 2025",
        description: "Equipping leaders for Kingdom Impact. Join us at FUTA.",
        images: ["/images/og-image.jpg"], // Same image as OG
        creator: "@rcffuta", // Replace with actual handle if available
    },
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
                {children}
            </body>
        </html>
    );
}
