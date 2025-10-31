import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;


