"use server";

import { initSupabase } from "@/lib/supabase";
import { z } from "zod";

// Schema for validation
const formSchema = z.object({
    fullName: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email address"),
    phoneNumber: z.string().min(10, "Invalid phone number"),
    gender: z.enum(["Male", "Female"]),
    category: z.enum(["Student", "Alumni", "Guest"]),
    chapter: z.string().optional().or(z.literal("")),
    unit: z.string().optional().or(z.literal("")),
    expectations: z.string().optional(),
});

export async function submitRegistration(formData: FormData) {
    // 1. Initialize Admin Client (Bypasses RLS)
    const supabaseAdmin = initSupabase(true);

    const rawData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        gender: formData.get("gender"),
        category: formData.get("category"),
        chapter: formData.get("chapter"),
        unit: formData.get("unit"),
        expectations: formData.get("expectations"),
    };

    const validatedFields = formSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // 2. Use supabaseAdmin instead of the standard supabase client
    const dbPayload = {
        full_name: validatedFields.data.fullName,
        email: validatedFields.data.email,
        phone_number: validatedFields.data.phoneNumber,
        gender: validatedFields.data.gender,
        category: validatedFields.data.category,
        chapter: validatedFields.data.chapter || "Guest", // Fallback if empty
        unit: validatedFields.data.unit || "N/A", // Fallback if empty
        expectations: validatedFields.data.expectations,
    };
    const { error, data } = await supabaseAdmin
        .from("registrations")
        .insert(dbPayload)
        .select()
        .single();

    if (error) {
        console.error("Supabase Error:", error);
        return {
            success: false,
            message: "Failed to save registration. Please try again.",
        };
    }

    return {
        success: true,
        message: "Registration successful! See you at CLT 2025.",
        id: data.id,
        data,
    };
}
