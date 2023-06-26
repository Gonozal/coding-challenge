import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ClsService } from 'nestjs-cls';
import { MyClsStore } from '../nestjs-cls';
import { AuthenticateUserDto } from './dtos/authenticate-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly cls: ClsService<MyClsStore>
  ) {}

  public create(email: string): Promise<User> {
    const user = this.userRepository.create({ email });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  getLoggedInUser() {
    const userId = this.cls.get('userId');

    return this.userRepository.findOne({ where: { id: userId } });
  }

  authenticateUser(authenticateUserDto: AuthenticateUserDto) {
    return this.userRepository.findOne({
      where: { email: authenticateUserDto.email },
    });
  }
}
