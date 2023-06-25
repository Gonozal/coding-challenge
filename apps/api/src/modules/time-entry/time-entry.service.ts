import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from './time-entry.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { MyClsStore } from '../nestjs-cls';

export type UpdateTimeEntry = DeepPartial<TimeEntry>;

@Injectable()
export class TimeEntryService {
  constructor(
    @InjectRepository(TimeEntry)
    private timeEntryRepository: Repository<TimeEntry>,
    private readonly cls: ClsService<MyClsStore>
  ) {}

  public create(newTimeEntry: DeepPartial<TimeEntry>): Promise<TimeEntry> {
    const userId = this.cls.get('userId');

    const timeEntry = this.timeEntryRepository.create({
      ...newTimeEntry,
      user: { id: userId },
    });
    return this.timeEntryRepository.save(timeEntry);
  }

  public async update({ id, ...update }: UpdateTimeEntry): Promise<TimeEntry> {
    const userId = this.cls.get('userId');

    const timeEntry = await this.timeEntryRepository.findOneOrFail({
      where: {
        user: { id: userId },
        id,
      },
    });

    const updated = this.timeEntryRepository.merge(timeEntry, update);

    return this.timeEntryRepository.save(updated);
  }

  findAll() {
    const userId = this.cls.get('userId');

    return this.timeEntryRepository.find({
      where: { user: { id: userId } },
    });
  }
}
