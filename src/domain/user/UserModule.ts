import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/infra/PersistenceModule';

@Module({
  imports: [PersistenceModule],
})
export class UserModule {}
