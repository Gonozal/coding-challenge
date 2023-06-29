import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/*
 * It would probably be useful to add additional computed properties to this
 * entity to make reads faster. E.g. individual columns for the day, week and year
 * of the entry.
 */
@Entity()
export class TimeEntry {
  // I prefer non-enumerable IDs, but for now this will have to do
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  startedAt!: Date;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  finishedAt?: Date;

  @Column()
  @ApiProperty()
  userId!: number;

  @ManyToOne(() => User, (user) => user.timeEntries)
  @ApiProperty({ required: false })
  user?: User;

  @CreateDateColumn()
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt!: Date;
}
