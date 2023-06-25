import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import { CreateTimeEntryDto } from './dtos/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dtos/update-time-entry.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TimeEntry } from './time-entry.entity';

@Controller('time-entry')
@ApiTags('time-entry')
export class TimeEntryController {
  constructor(private timeEntryService: TimeEntryService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: TimeEntry })
  create(@Body() createTimeEntryDto: CreateTimeEntryDto) {
    return this.timeEntryService.create(createTimeEntryDto);
  }

  @Post('/start')
  @HttpCode(201)
  @ApiCreatedResponse({ type: TimeEntry })
  start() {
    return this.timeEntryService.create({ startedAt: new Date() });
  }

  @Post('/:id/finish')
  @HttpCode(200)
  @ApiOkResponse({ type: TimeEntry })
  finish(@Param('id') id: number) {
    return this.timeEntryService.update({ id, finishedAt: new Date() });
  }

  @Patch('/:id')
  @HttpCode(200)
  @ApiOkResponse({ type: TimeEntry })
  update(
    @Param('id') id: number,
    @Body() UpdateTimeEntryDto: UpdateTimeEntryDto
  ) {
    return this.timeEntryService.update({ ...UpdateTimeEntryDto, id });
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: [TimeEntry] })
  findAll() {
    return this.timeEntryService.findAll();
  }
}
