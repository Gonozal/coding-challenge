import { TimeEntryController } from './time-entry.controller';
import { TimeEntryService } from './time-entry.service';
import { DeepPartial } from 'typeorm';

export const mockTimeEntryService: () => TimeEntryService = jest.fn(() => {
  const controller: DeepPartial<TimeEntryService> = {
    create: jest.fn((entity) => entity),
    update: jest.fn((update) => update),
    findAll: jest.fn(() => ({})),
  };

  return controller as TimeEntryService;
});

describe('TimeEntryController', () => {
  let service: TimeEntryService;
  let controller: TimeEntryController;

  beforeEach(async () => {
    service = mockTimeEntryService();
    controller = new TimeEntryController(service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the TimeEntryService create function', async () => {
      await controller.create({
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
      });

      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('start', () => {
    it('should call the TimeEntryService create function', async () => {
      await controller.start();

      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('finish', () => {
    it('should call the TimeEntryService update function', async () => {
      await controller.finish(12);

      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call the TimeEntryService findAll function', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
