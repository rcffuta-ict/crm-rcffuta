// app/data/fellowships.ts

export const fellowships = [
    {
        id: "rcf-futa",
        name: "RCF FUTA (Host)",
        short: "RCF FUTA",
        units: [
            "Choir",
            "Drama",
            "Bible Study",
            "Prayer",
            "Ushering",
            "Technical",
            "Sanitation",
            "Welfare",
            "Organizing",
            "Academic",
            "Alumni Relations",
        ],
        logo: "bg-purple-100 text-purple-700",
    },
    {
        id: "rcf-aaua",
        name: "RCF AAUA",
        short: "RCF AAUA",
        units: ["Choir", "Drama", "Bible Study", "Prayer", "Media", "Ushering"],
        logo: "bg-purple-100 text-purple-700",
    },
    {
        id: "rcf-unimed",
        name: "RCF UNIMED",
        short: "RCF UNIMED",
        units: ["Choir", "Evangelism", "Prayer", "Technical"],
        logo: "bg-purple-100 text-purple-700",
    },
    {
        id: "rcf-adeyemi",
        name: "RCF Adeyemi",
        short: "RCF Adeyemi",
        units: ["Choir", "Drama", "Ushering", "Protocol"],
        logo: "bg-purple-100 text-purple-700",
    },
    {
        id: "other",
        short: "other",
        name: "Other / Guest",
        units: ["Guest", "Minister", "Observer"],
        logo: "bg-purple-100 text-purple-700",
    },
] as const;

export type Fellowship = (typeof fellowships)[number];
