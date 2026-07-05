import { z } from "zod";

export const forgotSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
});

export type ForgotFields = z.infer<typeof forgotSchema>;
