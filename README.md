# Campus Leadership Training (CLT) 2025 Portal

![CLT 2025 Banner](public/images/og-image.jpg)

> **Official Registration & Event Portal for the CRM Ondo Zone Campus Leadership Training.**  
> _Hosted by RCF FUTA Chapter | November 21, 2025_

## 📋 Overview

This application serves as the central hub for **CLT 2025**, a major convergence of student leaders across the Ondo Zone. It handles attendee registration, dynamic digital ticket generation, and provides a real-time administrative dashboard for event organizers.

Built with performance and user experience in mind, the site features a "Mantle" themed UI (Gold/Amber & Dark Slate) combined with a high-performance Serverless backend.

## 🚀 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** (App Router, Server Actions)
- **[TypeScript](https://www.typescriptlang.org/)** (Strict type safety)
- **[Tailwind CSS v4](https://tailwindcss.com/)** (Zero-runtime styling)

### Backend & Database

- **[Supabase](https://supabase.com/)** (PostgreSQL Database)
- **Supabase Realtime** (Websockets for live admin updates)
- **Row Level Security (RLS)** (Data protection)

### UI & Animations

- **[Framer Motion](https://www.framer.com/motion/)** (Complex scroll animations & transitions)
- **[Lucide React](https://lucide.dev/)** (Iconography)
- **[Sonner](https://sonner.emilkowal.ski/)** (Toast notifications)

### Utilities

- **[Zod](https://zod.dev/)** (Server-side form validation)
- **[html-to-image](https://github.com/bubkoo/html-to-image)** (Ticket image generation)
- **[qrcode.react](https://github.com/zpao/qrcode.react)** (QR Code generation)

---

## ✨ Key Features

### 👤 User Experience

- **Cinematic Landing Page:** Parallax hero section with "The Mantle" theme.
- **Dynamic Registration:** Form adapts based on Category (Student/Alumni/Guest).
- **Smart Logic:** Auto-populates Units based on selected Fellowship Chapter.
- **Digital Ticket:** Generates a downloadable, high-res PNG tag with a unique QR code immediately after registration.
- **Verification Page:** Publicly accessible dynamic route (`/attendees/[id]`) to verify tags.

### 🛡️ Admin Dashboard

- **Real-time Updates:** Dashboard refreshes automatically via Supabase Sockets when new users register.
- **Analytics:** Live counters for Students, Alumni, Guests, and Total Attendees.
- **Leaderboard:** Visual ranking of Fellowships by attendance count.
- **Data Management:** Searchable table with pagination.
- **Export:** One-click CSV export for Excel integration.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/clt-2025.git
    cd clt-2025
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory:

    ```env
    # Supabase Connection
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Admin Privileges (Required for Registration Server Action to return ID)
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

    # Simple Admin Gate Password
    ADMIN_PASSWORD=

    # Site URL (For Metadata)
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

Run the following SQL in your Supabase SQL Editor to set up the database:

```sql
-- Create Registrations Table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT NOT NULL,
  gender TEXT NOT NULL,
  category TEXT NOT NULL,
  chapter TEXT,
  unit TEXT,
  expectations TEXT
);

-- Enable Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable insert for public" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users only" ON registrations FOR SELECT TO authenticated USING (true);
```

---

## 📂 Project Structure

```
├── app/
│   ├── actions/       # Server Actions (Form submit, Admin fetch)
│   ├── admin/         # Admin Dashboard Page
│   ├── attendees/     # Dynamic Verification Page [id]
│   ├── components/    # Reusable React Components
│   ├── data/          # Static Data (Fellowships, Ministers)
│   ├── lib/           # Utilities (Supabase client, formatters)
│   ├── layout.tsx     # Root Layout & SEO
│   └── page.tsx       # Landing Page
├── public/            # Static Assets (Images, Logos)
└── ...config files
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push code to GitHub.
2.  Import project to Vercel.
3.  Add the **Environment Variables** in the Vercel Dashboard.
4.  Deploy!

---

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 👥 Authors

**RCF FUTA ICT Team**

- Website: [ict.rcffuta.com](https://ict.rcffuta.com)
- Email: ict@rcffuta.com

---

© 2025 Christ Redeemer's Ministries (CRM) Ondo Zone. All Rights Reserved.
