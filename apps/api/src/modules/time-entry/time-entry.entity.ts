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
