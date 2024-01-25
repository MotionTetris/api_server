import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/ControllerModule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBSERVER_HOST, DBMS_NAME, DB_PASSWORD, DB_USERNAME, DBSERVER_PORT, DB_NAME, MAIL_REDIS_HOST, MAIL_REDIS_PORT } from './constants';
import { BullModule } from '@nestjs/bull';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filter/GlobalExceptionFilter';
import { User } from './model/user/User';

const TYPEORM_MODULE_OPTION: TypeOrmModuleOptions = {
  type: DBMS_NAME,
  host: DBSERVER_HOST,
  port: DBSERVER_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User],
  synchronize: true,
  logging: true,
}

const MAIL_REDIS_OPTION = {
  redis: {
    host: MAIL_REDIS_HOST,
    port: MAIL_REDIS_PORT
  }
}

@Module({
  imports: [
    ControllerModule,
    TypeOrmModule.forRoot(TYPEORM_MODULE_OPTION),
    BullModule.forRoot(MAIL_REDIS_OPTION),
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  },
  ],
})
export class AppModule {}
