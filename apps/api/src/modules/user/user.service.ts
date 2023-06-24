import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public create(email: string): Promise<User> {
    const user = this.userRepository.create({ email });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}
