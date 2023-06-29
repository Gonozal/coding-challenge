import { z } from 'zod';

export const AuthenticateUserSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();
