import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthenticateUserDto } from './dtos/authenticate-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto.email);
    if (!user) throw new BadRequestException();

    return user;
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/me')
  @ApiOkResponse({ type: User })
  async me(): Promise<User> {
    const user = await this.userService.getLoggedInUser();

    if (!user) throw new BadRequestException();

    return user;
  }

  @Post('/login')
  @ApiOkResponse({ type: User })
  async login(@Body() authenticateUserDto: AuthenticateUserDto): Promise<User> {
    const user = await this.userService.authenticateUser(authenticateUserDto);
    if (!user) throw new BadRequestException();

    return user;
  }
}
