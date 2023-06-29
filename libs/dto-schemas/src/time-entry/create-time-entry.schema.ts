import { z } from 'zod';

export const CreateTimeEntrySchema = z
  .object({
    startedAt: z.string().datetime(),
    finishedAt: z.string().datetime(),
  })
  .strict();
