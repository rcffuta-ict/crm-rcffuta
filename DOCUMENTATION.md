# CRM Zonal Congress — Project Documentation

Welcome to the **CRM Zonal Congress** event application. This project is built with **Next.js**, **Tailwind CSS**, and **Supabase**, featuring a high-fidelity light-theme design system.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL + RLS)
- **Icons**: Lucide React

---

## ⚙️ Configuration (Single Source of Truth)

The entire application content is governed by one file:  
`src/data/rcrc.ts`

### What you can control in `rcrc.ts`:

- **Event Metadata**: Name, edition, theme, date, and venue.
- **Hierarchical Branding**: RCCG, CRM, and Hosting Chapter logos/details.
- **Navigation**: Navbar links and their scroll targets.
- **About Section**: Taglines, headings, paragraphs, and statistics.
- **Guest Ministers**: Roles, names, churches, and accent colors.
- **Schedule**: A 3-day program with customizable times, activities, and icons.
- **Registration State**: Toggle registration `isActive` globally.
- **Footer**: Contact details and social links.

---

## 🗃 Database Setup (Supabase)

The registration form submits data to the `registrations` table.

### Table Schema:

| Column         | Type      | Description                                   |
| :------------- | :-------- | :-------------------------------------------- |
| `id`           | UUID      | Primary Key (auto-generated)                  |
| `full_name`    | Text      | Attendee's full name                          |
| `email`        | Text      | Contact email                                 |
| `phone_number` | Text      | Contact phone                                 |
| `gender`       | Text      | Male / Female                                 |
| `category`     | Text      | Student / Alumni / Guest                      |
| `chapter`      | Text      | Fellowship chapter (ID from `fellowships.ts`) |
| `unit`         | Text      | Unit/Department name                          |
| `expectations` | Text      | Prayer requests or expectations               |
| `created_at`   | Timestamp | Registration time                             |

### Admin Access:

The admin panel is available at `/admin`.  
Access is controlled via the `ADMIN_PASSWORD` environment variable.

---

## 🎨 Design System

We use a "Cinematic Light" aesthetic with the following core tokens:

- **Ivory Base**: `#fafaf8` (Page background)
- **Burnished Gold**: `#C8960C` (Primary brand accent)
- **Brand Green**: `#16a34a` (Secondary accent)
- **Surface**: Card-based layouts with subtle `slate-200` borders and `white` backgrounds.

### Custom Components:

Located in `src/components/common/FormComponents.tsx`:

- `CustomSelect`: Animated dropdown with browser-native validation support.
- `RadioGroup`: Pill-style interactive buttons.
- `CustomCheckbox`: Modern checked/unchecked states.

---

## 🚀 Deployment

1. **Environment Variables**:
   Create a `.env.local` with:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_key
    ADMIN_PASSWORD=your_secure_password
    NEXT_PUBLIC_APP_ACTIVE=true
    ```

2. **Build**:
    ```bash
    npm run build
    npm run start
    ```

---

## 📝 Note on Fellowsips

Fellowship data is split between:

- `src/data/fellowships.ts`: Base data (Units, fixed details).
- `src/data/rcrc.ts`: Extended data (President images, founding years).

These are merged automatically in the UI.
