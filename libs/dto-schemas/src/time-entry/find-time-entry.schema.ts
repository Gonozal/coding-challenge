import { z } from 'zod';

export const FindTimeEntrySchema = z
  .object({
    week: z.string().regex(/^\d+$/).transform(Number).optional(),
  })
  .strict();
