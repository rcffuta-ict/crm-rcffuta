// app/data/fellowships.ts

export const fellowships = [
  {
    id: "rcf-futa",
    name: "RCF FUTA (Host)",
    units: ["Choir", "Drama", "Bible Study", "Prayer", "Ushering", "Technical", "Sanitation", "Welfare", "Organizing", "Academic", "Alumni Relations"]
  },
  {
    id: "rcf-aaua",
    name: "RCF AAUA",
    units: ["Choir", "Drama", "Bible Study", "Prayer", "Media", "Ushering"]
  },
  {
    id: "rcf-unimed",
    name: "RCF UNIMED",
    units: ["Choir", "Evangelism", "Prayer", "Technical"]
  },
  {
    id: "rcf-adeyemi",
    name: "RCF Adeyemi",
    units: ["Choir", "Drama", "Ushering", "Protocol"]
  },
  {
    id: "other",
    name: "Other / Guest",
    units: ["Guest", "Minister", "Observer"]
  }
] as const;

export type Fellowship = typeof fellowships[number];
