import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDto } from './dtos/create-user.input.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserInputDto)  {
    return this.userService.create(createUserDto.email)
  }

  @Get()
  findAll()  {
    return this.userService.findAll()
  }
}
