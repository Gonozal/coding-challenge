import { z } from 'zod';

export const UpdateTimeEntrySchema = z
  .object({
    startedAt: z.string().datetime().optional(),
    finishedAt: z.string().datetime().optional(),
  })
  .strict();
