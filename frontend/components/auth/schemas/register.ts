import { z } from 'zod';

/**
 * Schema for registration request form (initial step)
 * This is used when requesting a verification email - no password needed yet
 */
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Can only contain letters, numbers, and underscores'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

