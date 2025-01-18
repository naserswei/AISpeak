import * as z from "zod";

export const formShema = z.object({
  email: z
    .string()
    .min(1, "Email or username is required")
    .refine(
      (value) => {
        // Check if input is a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if input is a valid username (3-20 chars, alphanumeric and underscore)
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message: "Please enter a valid email address or username",
      }
    ),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long.")
    .max(100, "The password cannot exceed 100 characters."),
});

export const RegisterShema = z.object({
  email: z
    .string()
    .email("The email is not valid. Please provide a valid email."),
  username: z
    .string()
    .min(2, "The username must be at least 2 characters long.")
    .max(50, "The username cannot exceed 50 characters."),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long.")
    .max(100, "The password cannot exceed 100 characters."),
});

export type FormInputs = z.infer<typeof formShema>;
