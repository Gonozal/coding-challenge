import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

import { CreateTimeEntrySchema } from '@fc/dto-schemas';

const CreateTimeEntry = extendApi(CreateTimeEntrySchema);

export class CreateTimeEntryDto extends createZodDto(CreateTimeEntry) {}
