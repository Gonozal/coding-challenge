import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DeepPartial } from 'typeorm';

export const mockUserService: () => UserService = jest.fn(() => {
  const controller: DeepPartial<UserService> = {
    create: jest.fn((entity) => entity),
    findAll: jest.fn(() => ({})),
  };

  return controller as UserService;
});

describe('UserController', () => {
  let service: UserService;
  let controller: UserController;

  beforeEach(async () => {
    service = mockUserService();
    controller = new UserController(service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the UserService create function', async () => {
      await controller.create({ email: 'test@exmaple.com' });

      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call the UserService findAll function', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
