import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
})