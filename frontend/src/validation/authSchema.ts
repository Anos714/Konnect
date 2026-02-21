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

export const onBoardingSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, { message: "Full name is required" })
      .or(z.literal(""))
      .optional(),
    bio: z
      .string()
      .trim()
      .min(3, { message: "Bio must be atleast 3 characters long" })
      .max(250, { message: "Bio must not exceeds 250 charcters" })
      .or(z.literal(""))
      .optional(),
    nativeLang: z
      .string()
      .trim()
      .min(1, { message: "Native Language is Required" }),
    learningLang: z
      .string()
      .trim()
      .min(1, { message: "Learning Language is Required" }),
    location: z.string().trim().min(1, { message: "Location is Required" }),
  })
  .refine((data) => data.nativeLang !== data.learningLang, {
    message:
      "Your learning language must be different from your native language",
    path: ["learningLang"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type OnBoardingData = z.infer<typeof onBoardingSchema>;
