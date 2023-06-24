
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TimeEntry } from '../time-entry/time-entry.entity';

@Entity()
export class User {
  // I prefer non-enumerable IDs, but for now this will have to do
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.user)
  timeEntries?: TimeEntry[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}