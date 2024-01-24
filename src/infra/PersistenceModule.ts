import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './user/UserRepositoryModule';

@Module({
  imports: [UserRepositoryModule],
  exports: [UserRepositoryModule],
})
export class PersistenceModule {}
