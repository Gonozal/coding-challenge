import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TimeEntry } from '../time-entry/time-entry.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  // I prefer non-enumerable IDs, but for now this will have to do
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  email!: string;

  @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.user)
  @ApiProperty({ required: false, type: [TimeEntry] })
  timeEntries?: TimeEntry[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt!: Date;
}
