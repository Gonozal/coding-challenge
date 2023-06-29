import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

import { CreateUserSchema } from '@fc/dto-schemas';

const CreateUser = extendApi(CreateUserSchema);

export class CreateUserDto extends createZodDto(CreateUser) {}
