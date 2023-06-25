import { TimeEntry } from './time-entry.entity';
import { DeepPartial, Repository } from 'typeorm';
import { TimeEntryService } from './time-entry.service';
import { ClsService } from 'nestjs-cls';
import { MyClsStore } from '../nestjs-cls';

export const mockTimeEntryRepository: () => Repository<TimeEntry> = jest.fn(
  () => {
    const repository: DeepPartial<Repository<TimeEntry>> = {
      create: jest.fn((entity) => entity),
      save: jest.fn((entity) => entity),
      find: jest.fn(() => ({})),
      merge: jest.fn(() => ({})),
      findOneOrFail: jest.fn(() => ({})),
    };

    return repository as Repository<TimeEntry>;
  }
);

describe('TimeEntryService', () => {
  let repository: Repository<TimeEntry>;
  let service: TimeEntryService;

  beforeEach(async () => {
    repository = mockTimeEntryRepository();
    const clsService: DeepPartial<ClsService<MyClsStore>> = {
      get: jest.fn(() => 0),
    };

    service = new TimeEntryService(
      repository,
      clsService as ClsService<MyClsStore>
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a time-entry during time-entry creation', async () => {
    await service.create({ startedAt: new Date() });

    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should query the repository when looking for all time-entries', async () => {
    await service.findAll();

    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should query the repository when looking for all time-entries', async () => {
    await service.update({ id: 1 });

    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
