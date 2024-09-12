import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Can't be empty" }),
    password: z.string().min(8, { message: "Please check again" }),
    confirmPassword: z.string().min(8, { message: "Please check again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
