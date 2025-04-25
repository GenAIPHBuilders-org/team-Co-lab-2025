import { z } from 'zod';

export const registrationSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;