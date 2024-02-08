import { Module } from '@nestjs/common';
import { UserController } from './UserController';
import { ServiceModule } from 'src/service/ServiceModule';

@Module({
  controllers: [UserController],
  imports: [ServiceModule],
  providers: [],
})
export class ControllerModule {}
