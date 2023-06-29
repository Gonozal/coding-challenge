import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from './time-entry.entity';
import {
  DeepPartial,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { MyClsStore } from '../nestjs-cls';
import { FindTimeEntryDto } from './dtos/find-time-entry.dto';
import { endOfWeek, setWeek, startOfWeek } from 'date-fns';

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

  public findAll(findTimeEntryDto?: FindTimeEntryDto) {
    const userId = this.cls.get('userId');
    const weekFilter = this.createWeekFilterObject(findTimeEntryDto?.week);

    return this.timeEntryRepository.find({
      where: { ...weekFilter, user: { id: userId } },
    });
  }

  private createWeekFilterObject(
    weekNumber?: number
  ): FindOptionsWhere<TimeEntry> {
    if (!weekNumber) return {};

    const today = new Date();
    const weekStart = startOfWeek(today);
    const requestedWeekStart = setWeek(weekStart, weekNumber);
    const requestedWeekEnd = endOfWeek(requestedWeekStart);

    return {
      finishedAt: MoreThanOrEqual(requestedWeekStart),
      startedAt: LessThanOrEqual(requestedWeekEnd),
    };
  }
}
