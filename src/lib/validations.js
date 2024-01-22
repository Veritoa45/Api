import { z } from 'zod'

export const userSchema = z.object ({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(30),
    userName: z.string().min(4).max(15),
    password: z.string().min(8).max(16),
})

