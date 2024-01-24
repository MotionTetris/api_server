import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/User';
import { UserRepositoryProvider } from './UserPersistanceProvider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserRepositoryModule {}
