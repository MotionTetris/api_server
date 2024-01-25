import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/infra/PersistenceModule';
import { UserService } from './user/UserService';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth/AuthService';
import { JWT_SECRET } from 'src/constants';

const JWT_MODULE_OPTION: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '10m' },
};

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register(JWT_MODULE_OPTION)
  ],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class ServiceModule {}
