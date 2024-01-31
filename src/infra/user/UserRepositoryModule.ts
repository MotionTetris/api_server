import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../model/user/User';
import { UserRepositoryProvider } from './UserPersistanceProvider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserRepositoryModule {}
