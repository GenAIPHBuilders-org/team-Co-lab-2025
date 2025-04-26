import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;