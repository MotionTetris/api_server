import { Module } from '@nestjs/common';
import { InterfaceModule } from './interfaces/InterfaceModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user/User';
import { DBSERVER_HOST, DBMS_NAME, DB_PASSWORD, DB_USERNAME, DBSERVER_PORT, DB_NAME } from './constants';

@Module({
  imports: [
    InterfaceModule,
    TypeOrmModule.forRoot({
      type: DBMS_NAME,
      host: DBSERVER_HOST,
      port: DBSERVER_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [User],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
