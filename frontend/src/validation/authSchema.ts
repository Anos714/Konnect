import * as z from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Full name is required" }),

  email: z
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be atleast 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be 8+ characters, include uppercase, lowercase, and symbol",
    ),
});

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be atleast 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be 8+ characters, include uppercase, lowercase, and symbol",
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
