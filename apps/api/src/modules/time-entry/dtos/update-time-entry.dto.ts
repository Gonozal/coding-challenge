import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

import { UpdateTimeEntrySchema } from '@fc/dto-schemas';

const UpdateTimeEntry = extendApi(UpdateTimeEntrySchema);

export class UpdateTimeEntryDto extends createZodDto(UpdateTimeEntry) {}
