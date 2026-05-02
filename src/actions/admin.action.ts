"use server";

import { initSupabase } from "@/lib/supabase";

export async function getAdminData(passcode: string) {
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || "clt2025admin";

    console.log(ADMIN_PASS, passcode);

    if (passcode !== ADMIN_PASS) {
        return { success: false, message: "Invalid Access Code" };
    }

    // 2. Initialize Admin Client
    const supabaseAdmin = initSupabase(true);

    // 3. Fetch All Data
    const { data, error } = await supabaseAdmin
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Admin Fetch Error:", error);
        return { success: false, message: "Failed to fetch data" };
    }

    return { success: true, data };
}
