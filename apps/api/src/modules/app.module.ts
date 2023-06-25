import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TimeEntryModule } from './time-entry/time-entry.module';
import { TypeOrmConfig } from './typeorm';
import { NestClsConfig } from './nestjs-cls';

@Module({
  imports: [TypeOrmConfig, NestClsConfig, UserModule, TimeEntryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
