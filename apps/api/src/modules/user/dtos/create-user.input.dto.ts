import { IsEmail } from 'class-validator';

export class CreateUserInputDto {
  @IsEmail()
  email!: string;
}
