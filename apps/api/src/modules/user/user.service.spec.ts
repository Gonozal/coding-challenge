import { User } from './user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from './user.service';

export const mockUserRepository: () => Repository<User> = jest.fn(() => {
  const repository: DeepPartial<Repository<User>> = {
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    find: jest.fn(() => ({})),
  };

  return repository as Repository<User>;
});

describe('UserService', () => {
  let repository: Repository<User>;
  let service: UserService;

  beforeEach(async () => {
    repository = mockUserRepository();
    service = new UserService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a user during user creation', async () => {
    await service.create('test@exmaple.com');

    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should query the repository when looking for all users', async () => {
    await service.findAll();

    expect(repository.find).toHaveBeenCalledTimes(1);
  });
});
