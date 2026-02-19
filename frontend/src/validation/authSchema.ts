import * as z from "zod";

const registerSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Full name is required" }),

  email: z
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" })
    .trim(),
});
