import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();
