import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;