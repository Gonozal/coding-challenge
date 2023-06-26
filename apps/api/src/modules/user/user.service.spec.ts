import { User } from './user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from './user.service';
import { ClsService } from 'nestjs-cls';
import { MyClsStore } from '../nestjs-cls';

export const mockUserRepository: () => Repository<User> = jest.fn(() => {
  const repository: DeepPartial<Repository<User>> = {
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    find: jest.fn(() => ({})),
    findOne: jest.fn(() => ({})),
  };

  return repository as Repository<User>;
});

describe('UserService', () => {
  let repository: Repository<User>;
  let service: UserService;

  beforeEach(async () => {
    repository = mockUserRepository();
    const clsService: DeepPartial<ClsService<MyClsStore>> = {
      get: jest.fn(() => 0),
    };
    service = new UserService(repository, clsService as ClsService<MyClsStore>);
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

  it('should search for the current user-id for the currently logged in user', async () => {
    await service.getLoggedInUser();

    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
  });

  it('should search for the users email when authenticating', async () => {
    await service.authenticateUser({ email: 'a1@exammple.com' });

    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { email: 'a1@exammple.com' },
    });
  });
});
