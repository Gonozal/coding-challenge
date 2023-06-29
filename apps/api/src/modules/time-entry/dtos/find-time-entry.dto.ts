import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

import { FindTimeEntrySchema } from '@fc/dto-schemas';

const FindTimeEntry = extendApi(FindTimeEntrySchema);

export class FindTimeEntryDto extends createZodDto(FindTimeEntry) {}
