import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/infra/PersistenceModule';
import { UserService } from './user/UserService';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/AuthService';
import { JWT_SECRET } from 'src/constants';

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class ServiceModule {}
