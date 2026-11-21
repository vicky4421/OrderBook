import { z } from "zod";

// Define a Zod schema for user registration input validation
export const zodRegisterUserSchema = z.object({

    // Validate the username field
    username: z
        .string({ error: "Username is required" })
        .trim()
        .toLowerCase()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be under 20 characters.")
        .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores."),

    // Validate the name field
    name: z
        .string({ error: "Username is required" })
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be under 50 characters."),

    // Validate the password field
    password: z
        .string({ error: "Password is required" })
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password is too long"),

})

// Automatically generate the TypeScript type from the schema!
export type RegisterUserInput = z.infer<typeof zodRegisterUserSchema>;