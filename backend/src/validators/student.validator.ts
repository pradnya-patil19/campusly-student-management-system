
import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  course: z.string().trim().min(2).max(120),
  year: z.coerce.number().int().min(1).max(6),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date of birth")
    .refine(
      (v) => v <= new Date().toISOString().slice(0, 10),
      "Date of birth cannot be in the future"
    ),
  email: z.string().trim().email().max(254),
  mobileNumber: z
  .string()
  .trim()
  .regex(
    /^[6-9]\d{9}$/,
    "Enter a valid Indian mobile number (10 digits, starting with 6, 7, 8 or 9)."
  ),
  gender: z.enum([
    "Male",
    "Female",
    "Other",
    "Prefer not to say",
  ]),

  address: z.string().trim().min(5).max(1000),
});

export type StudentInput = z.infer<typeof studentSchema>;