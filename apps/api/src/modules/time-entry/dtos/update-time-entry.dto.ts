import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class UpdateTimeEntryDto {
  @IsISO8601({ strict: true })
  @IsOptional()
  @ApiProperty({ nullable: true })
  startedAt?: Date;

  @IsISO8601({ strict: true })
  @IsOptional()
  @ApiProperty({ nullable: true })
  finishedAt?: Date;
}
