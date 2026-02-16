import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type forgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Reset code is required")
    .regex(/^\d+$/, "Reset code must contain only numbers"),
});

export type verifyResetCodeFormValues = z.infer<typeof verifyResetCodeSchema>;

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
  newPassword: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}<>|]/,
      "Password must contain at least one special character",
    ),
});

export type resetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
