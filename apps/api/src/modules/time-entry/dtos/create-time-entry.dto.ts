import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

export class CreateTimeEntryDto {
  @IsISO8601({ strict: true })
  @ApiProperty()
  startedAt!: Date;

  @IsISO8601({ strict: true })
  @ApiProperty()
  finishedAt!: Date;
}
