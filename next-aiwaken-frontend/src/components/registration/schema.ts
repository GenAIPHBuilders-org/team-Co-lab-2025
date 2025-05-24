import { EmailRegex, PasswordRegex } from '@/utils/regex';
import { z } from 'zod';

export const registrationSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().regex(EmailRegex, {
        message: 'Invalid email address',
    }),
    password: z.string().regex(PasswordRegex, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 6 characters long' }),
}).refine((data) => {
    return data.password === data.confirmPassword;
},
    {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    },
);

export type RegistrationFormValues = z.infer<typeof registrationSchema>;