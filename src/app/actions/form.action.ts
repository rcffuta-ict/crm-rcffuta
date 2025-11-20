'use server'

import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  gender: z.enum(["Male", "Female"]),
  category: z.enum(["Student", "Alumni", "Guest"]),
  chapter: z.string().min(1, "Please select a chapter"),
  unit: z.string().min(1, "Please select a unit"),
  expectations: z.string().optional(),
})

export async function submitRegistration(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const rawData = {
    fullName: formData.get('fullName'),
    phoneNumber: formData.get('phoneNumber'),
    gender: formData.get('gender'),
    category: formData.get('category'),
    chapter: formData.get('chapter'),
    unit: formData.get('unit'),
    expectations: formData.get('expectations'),
  }

  const validatedFields = formSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { success: false, message: "Validation failed", errors: validatedFields.error.flatten() }
  }

  const { error } = await supabase
    .from('registrations')
    .insert({
      full_name: validatedFields.data.fullName,
      phone_number: validatedFields.data.phoneNumber,
      gender: validatedFields.data.gender,
      category: validatedFields.data.category,
      chapter: validatedFields.data.chapter,
      unit: validatedFields.data.unit,
      expectations: validatedFields.data.expectations,
    })

  if (error) {
    console.error('Supabase Error:', error)
    return { success: false, message: "Failed to save registration. Please try again." }
  }

  return { success: true, message: "Registration successful! See you at CLT 2025." }
}
