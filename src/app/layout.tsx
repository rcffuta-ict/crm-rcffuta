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

import config from "@/data/rcrc";

const SITE_URL = config.site.url;

export const viewport: Viewport = {
    themeColor: "#16a34a",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: config.site.title,
        template: `%s | ${config.event.name}`,
    },
    description: config.site.description,
    keywords: [...config.site.keywords],
    authors: [{ name: config.footer.poweredBy, url: config.footer.poweredByUrl }],
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
