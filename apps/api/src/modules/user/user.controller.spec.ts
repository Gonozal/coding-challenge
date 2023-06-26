import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DeepPartial } from 'typeorm';

export const mockUserService: () => UserService = jest.fn(() => {
  const controller: DeepPartial<UserService> = {
    create: jest.fn((entity) => entity),
    findAll: jest.fn(() => []),
    getLoggedInUser: jest.fn(() => ({})),
    authenticateUser: jest.fn(() => ({})),
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

  describe('me', () => {
    it('should call the UserService getLoggedInUser function', async () => {
      await controller.me();

      expect(service.getLoggedInUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should call the UserService authenticateUser function', async () => {
      await controller.login({ email: 'a1@example.com' });

      expect(service.authenticateUser).toHaveBeenCalledTimes(1);
    });
  });
});
