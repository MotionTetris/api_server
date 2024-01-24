import { Module } from '@nestjs/common';
import { UserController } from './user/UserController';
import { DomainModule } from 'src/domain/DomainModule';
import { ServiceModule } from 'src/application/ServiceModule';

@Module({
  controllers: [UserController],
  imports: [DomainModule, ServiceModule],
})
export class InterfaceModule {}
