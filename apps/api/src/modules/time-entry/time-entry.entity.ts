import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class TimeEntry {
  // I prefer non-enumerable IDs, but for now this will have to do
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  startedAt!: Date;

  @Column({nullable: true})
  finishedAt?: Date;

  @ManyToOne(() => TimeEntry, (timeEntry) => timeEntry.user)
  user?: TimeEntry

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}