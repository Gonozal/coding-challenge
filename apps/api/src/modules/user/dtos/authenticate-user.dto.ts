import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

import { AuthenticateUserSchema } from '@fc/dto-schemas';

const AuthenticateUser = extendApi(AuthenticateUserSchema);

export class AuthenticateUserDto extends createZodDto(AuthenticateUser) {}
