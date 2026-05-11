/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          crm-rcffuta — Event Configuration File          ║
 * ║       Zonal Congress 2026 · Theme: Steadfast             ║
 * ║  Edit this file to control all content on the site.     ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * HIERARCHY:
 *   RCCG (Parent Body)
 *    └─ CRM — Christ The Redeemers Ministries (Governing Body)
 *        └─ RCFFUTA — Hosting Fellowship
 */

const config = {
    // ─── SITE META ────────────────────────────────────────────
    site: {
        url: "https://crm.rcffuta.com",
        title: "Zonal Congress 2026 | CRM x RCFFUTA — Steadfast",
        description:
            "The Zonal Congress of the Redeemed Christian Fellowship, Ondo Zone. " +
            "Themed 'Steadfast' — a convergence of student leaders, ministers, and Kingdom ambassadors.",
        keywords: [
            "Zonal Congress",
            "Steadfast",
            "CRM",
            "RCFFUTA",
            "RCF Ondo Zone",
            "Christian Conference",
            "Student Leadership",
        ],
        ogImage: "/images/og-image.png",
    },

    // ─── EVENT DETAILS ────────────────────────────────────────
    event: {
        name: "Zonal Congress",
        edition: "2026",
        theme: "Steadfast",

        // Path to the theme logo image in /public
        themeLogo: "/images/crm/theme.png",

        subtitle: "Unshaken. Unmoved. Established in Him.",
        slogan: '"For we are more than conquerors"',

        // Set to actual date string when confirmed, e.g. "Nov 14–16, 2026"
        date: "May 28th - 31st, 2026",

        // Full venue name for details section
        venue: "The Redeemed Christian Fellowship, FUTA Chapter",

        // Short location for hero badge (only shown when date is not "TBA")
        venueShort: "RCFFUTA, Akure",
    },

    // ─── ORGANISATIONAL HIERARCHY ─────────────────────────────
    // Order: topmost body → immediate governing body → hosting chapter
    hierarchy: [
        {
            name: "RCCG",
            full: "Redeemed Christian Church of God",
            logo: "/images/logos/rccg.png", // leave empty string "" if no logo
        },
        {
            name: "CRM",
            full: "Christ The Redeemers Ministries",
            logo: "/images/logos/crm.png",
        },
        {
            name: "RCF",
            full: "Redeemed Christian Fellowship",
            logo: "/images/logos/fellowships/rcf_logo.png",
        },
    ],

    // ─── NAVIGATION LINKS ─────────────────────────────────────
    // Controls the header navbar. "target" must match a section's id attribute.
    nav: [
        { label: "About", target: "about" },
        { label: "Ministers", target: "ministers" },
        { label: "Fellowships", target: "fellowships" },
        { label: "Schedule", target: "schedule" },
    ],

    // ─── SOCIAL LINKS ─────────────────────────────────────────
    // Set to actual URLs. Use "#" to hide (link will still render).
    socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        whatsapp: "#",
    },

    // ─── ABOUT SECTION ────────────────────────────────────────
    about: {
        tagline: "About the Gathering",
        heading: "A Congress of STEADFAST Believers",
        highlight: "STEADFAST",

        // Rendered as separate paragraphs
        paragraphs: [
            "The Zonal Congress is the premier annual gathering of all Redeemed Christian Fellowship (RCF) chapters across the Ondo Zone — hosted by RCFFUTA.",
            "Under the oversight of Christ The Redeemers Ministries (CRM), this congress is designed to forge unwavering leaders, sharpen fellowship executives, and ignite a fresh move of God across campuses.",
        ],

        // Stat cards beneath the paragraphs
        stats: [
            { value: "8", suffix: "", label: "Ministering Vessels" },
            { value: "15", suffix: "", label: "Participating Chapters" },
            { value: "1000", suffix: "+", label: "Attendees" },
        ],

        // Image grid (leave src empty "" for placeholder)
        images: [
            { src: "", alt: "Worship" },
            { src: "", alt: "The Word" },
            { src: "", alt: "Prayer" },
            { src: "", alt: "Community" },
        ],
    },

    // ─── GUEST MINISTERS ──────────────────────────────────────
    // 8 slots. Fill in name, church, picture when confirmed.
    // accent: Tailwind gradient classes for the card glow.
    ministers: [
        {
            id: "m2",
            role: "Guest Minister",
            name: "Pst. Kayode Alowooja",
            church: "National Coordinator, CRM",
            picture: "https://i.imgur.com/xScvk0A.png",
            accent: "from-green-500 to-emerald-600",
        },
        {
            id: "m4",
            role: "Guest Minister",
            name: "Pst. Kolawole Adeboye",
            church: "TBA",
            picture: "https://i.imgur.com/46t1TJD.png",
            accent: "from-purple-500 to-violet-600",
        },
        {
            id: "m1",
            role: "Guest Minister",
            name: "Pst. Emmanuel Ayodele",
            church: "TBA",
            picture: "https://i.imgur.com/R86LiQA.png", // e.g. "/images/ministers/pastor-john.jpg"
            accent: "from-amber-500 to-orange-600",
        },
        {
            id: "m5",
            role: "Guest Minister",
            name: "Pst. Daniel Olawande",
            church: "TBA",
            picture: "https://i.imgur.com/8qTIfTC.png",
            accent: "from-rose-500 to-pink-600",
        },
        {
            id: "m3",
            role: "Guest Minister",
            name: "Pst. Emmanuel Oladapo",
            church: "TBA",
            picture: "https://i.imgur.com/Tp0AsCp.png",
            accent: "from-blue-500 to-indigo-600",
        },
        {
            id: "m6",
            role: "Guest Minister",
            name: "TBA",
            church: "TBA",
            picture: "https://i.imgur.com/GAByhu0.png",
            accent: "from-teal-500 to-cyan-600",
        },
        {
            id: "m7",
            role: "Guest Minister",
            name: "Min Lola Heritage",
            church: "TBA",
            picture: "https://i.imgur.com/11z13Q2.png",
            accent: "from-amber-400 to-yellow-600",
        },
        {
            id: "m8",
            role: "Guest Minister",
            name: "Pst. Karunwi Ayobami",
            church: "TBA",
            picture: "https://i.imgur.com/s4eYlnB.png",
            accent: "from-red-500 to-orange-600",
        },
        {
            id: "m9",
            role: "Zonal Coordinator",
            name: "Pst. Gbenga Emmanuel",
            church: "Zonal Coordinator, CRM Ondo Zone",
            picture: "https://i.imgur.com/LtyGzvx.jpeg",
            accent: "from-red-500 to-orange-600",
        },
    ],

    // ─── FELLOWSHIP EXTRAS ────────────────────────────────────
    // Extends the base data in fellowships.ts with president info.
    // id must match the id in fellowships.ts exactly.
    fellowships: [
        {
            id: "rcf-futa",
            president: "Bamise Emmanuel",
            presidentImage: "https://i.imgur.com/wqOGmHj.jpeg", // e.g. "/images/presidents/rcf-futa-president.jpg"
            founded: "1986",
            location: "FUTA Southgate, Akure",
        },
        {
            id: "rcf-oaustech",
            president: "Elefola Olumide ",
            presidentImage: "https://i.imgur.com/RC0mO1n.png",
            founded: "TBA",
            location: "Igodan, Okitipupa",
        },
        {
            id: "rcf-aaua",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akungba-Akoko",
        },
        {
            id: "rcf-rugipo",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Owo, Ondo State",
        },
        {
            id: "rcf-unimed",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Ondo City",
        },
        {
            id: "rcf-millennium",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akure, Ondo State",
        },
        {
            id: "rcf-afued",
            president: "ANIEGBO GOODNESS AMARACHI.",
            presidentImage: "https://i.imgur.com/Kut9Yyw.png",
            founded: "TBA",
            location: "Ondo State",
        },
        {
            id: "rcf-feca",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akure, Ondo State",
        },
        {
            id: "rccf-akure",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akure, Ondo State",
        },
        {
            id: "rcf-chta",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akure, Ondo State",
        },
        {
            id: "rcf-unimed-akure",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Akure, Ondo State",
        },
        {
            id: "rcf-achievers",
            president: "Adelanke Adenike Joy",
            presidentImage: "https://i.imgur.com/d1nBySB.png",
            founded: "TBA",
            location: "Owo, Ondo State",
        },
        {
            id: "rccf-irele",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Irele, Ondo State",
        },
        {
            id: "rccf-oaustech",
            president: "TBA",
            presidentImage: "",
            founded: "TBA",
            location: "Igodan, Okitipupa",
        },
        {
            id: "rcf-ileoluji",
            president: "Ishola Adeniyi James",
            presidentImage: "",
            founded: "TBA",
            location: "Ile Oluji",
        },
    ],

    // ─── SCHEDULE / ORDER OF EVENTS ───────────────────────────
    schedule: {
        // Set to true to show a "Stay Tuned" placeholder instead of the programme
        isUpcoming: false,
        upcomingMessage:
            "The Order of Events is yet to be determined. Stay steadfast — it's going to be glorious.",

        // 3-day programme — edit times/activities as needed
        // icon options: users | flag | music | book | zap | heart | sun | layers | flame | sparkles
        days: [
            {
                day: "Day 1",
                label: "Arrival & Consecration",
                date: "TBA", // e.g. "Friday, Nov 14"
                color: "amber", // amber | green | blue
                events: [
                    {
                        time: "4:00 PM",
                        activity: "Arrival & Registration",
                        desc: "Delegates check-in, fellowship bonding, and orientation",
                        icon: "users",
                    },
                    {
                        time: "6:00 PM",
                        activity: "Opening Ceremony",
                        desc: "Welcome address, dignitaries, and flag procession",
                        icon: "flag",
                    },
                    {
                        time: "7:30 PM",
                        activity: "Praise & Worship Night",
                        desc: "A night of deep worship to usher in the glory of God",
                        icon: "music",
                    },
                    {
                        time: "9:00 PM",
                        activity: "Opening Charge — Word Session I",
                        desc: "Setting the tone and spirit of the Congress",
                        icon: "book",
                    },
                    {
                        time: "10:30 PM",
                        activity: "Midnight Prayer",
                        desc: "Corporate prayer and prophetic activation",
                        icon: "heart",
                    },
                ],
            },
            {
                day: "Day 2",
                label: "The Word & Fire",
                date: "TBA",
                color: "green",
                events: [
                    {
                        time: "6:00 AM",
                        activity: "Morning Devotion",
                        desc: "Personal quiet time and group prayer",
                        icon: "sun",
                    },
                    {
                        time: "9:00 AM",
                        activity: "Word Session II — The Steadfast Man",
                        desc: "Teaching on unshakeable faith in turbulent times",
                        icon: "book",
                    },
                    {
                        time: "11:00 AM",
                        activity: "Creative Ministrations",
                        desc: "Drama, dance, and creative expressions of worship",
                        icon: "zap",
                    },
                    {
                        time: "12:30 PM",
                        activity: "Break & Fellowship Time",
                        desc: "Meals and inter-chapter bonding",
                        icon: "users",
                    },
                    {
                        time: "3:00 PM",
                        activity: "Workshop / Breakout Sessions",
                        desc: "Chapter excos and workers' training in units",
                        icon: "layers",
                    },
                    {
                        time: "6:00 PM",
                        activity: "Evening Worship & Word Session III",
                        desc: "The fire falls — an encounter with the Holy Spirit",
                        icon: "flame",
                    },
                    {
                        time: "9:00 PM",
                        activity: "Night of Testimonies",
                        desc: "Sharing what God has done",
                        icon: "sparkles",
                    },
                ],
            },
            {
                day: "Day 3",
                label: "Commissioning & Departure",
                date: "TBA",
                color: "blue",
                events: [
                    {
                        time: "7:00 AM",
                        activity: "Morning Prayer & Devotion",
                        desc: "A final corporate altar with the Lord",
                        icon: "heart",
                    },
                    {
                        time: "9:00 AM",
                        activity: "Word Session IV — Sent Forth Steadfast",
                        desc: "The final charge and commissioning message",
                        icon: "book",
                    },
                    {
                        time: "11:00 AM",
                        activity: "Choir & Special Ministrations",
                        desc: "Music ministrations and choir presentations",
                        icon: "music",
                    },
                    {
                        time: "12:30 PM",
                        activity: "Offering & Zonal Business",
                        desc: "Thanksgiving, reports, and zonal updates",
                        icon: "flag",
                    },
                    {
                        time: "1:30 PM",
                        activity: "Commissioning Service",
                        desc: "Laying of hands, impartation, and sending forth",
                        icon: "sparkles",
                    },
                    {
                        time: "3:00 PM",
                        activity: "Closing Benediction & Departure",
                        desc: "Closing praises and safe journey prayers",
                        icon: "heart",
                    },
                ],
            },
        ],
    },

    // ─── REGISTRATION ─────────────────────────────────────────
    registration: {
        // Toggle to false to show "Registration Closed" state
        isActive: true,

        headline: "Secure Your Place",
        subheadline:
            "Registration is mandatory for all attendees. Don't miss this move of God.",
    },

    // ─── FOOTER ───────────────────────────────────────────────
    footer: {
        copyrightName: "Christ the Redeemer’s Ministries, Ondo Zone", // shown in © notice
        poweredBy:
            "Redeemed Christian Fellowship, Federal University of Technology, Akure",
        poweredByUrl: "https://ict.rcffuta.com",
        contact: {
            addressTitle: "RCF FUTA Secretariat",
            addressDesc:
                "Besides His Grace Pavilion, FUTA Southgate, Akure, Ondo State, Nigeria.",
            mapsUrl: "https://maps.google.com",
            phone: "+234 810 123 4567",
            email: "ondocrm@gmail.com",
        },
    },
} as const;

export default config;
