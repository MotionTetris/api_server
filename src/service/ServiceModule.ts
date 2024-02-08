import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/infra/PersistenceModule';
import { UserService } from './user/UserService';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth/AuthService';
import {
  JWT_SECRET,
  MAIL_DEFAULTS_FROM,
  MAIL_PASSWORD,
  MAIL_USER,
} from 'src/constants';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { MailService } from './mail/MailService';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { MailProcessor } from 'src/infra/mail/MailProcessor';

const JWT_MODULE_OPTION: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '10m' },
};

const MAILER_OPTION: MailerOptions = {
  transport: {
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  },
  defaults: {
    from: MAIL_DEFAULTS_FROM,
  },
};

const MAIL_QUEUE_OPTION: BullModuleOptions = {
  name: 'mail',
};

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register(JWT_MODULE_OPTION),
    MailerModule.forRoot(MAILER_OPTION),
    BullModule.registerQueue(MAIL_QUEUE_OPTION),
  ],
  providers: [UserService, AuthService, MailService, MailProcessor],
  exports: [UserService, AuthService, MailService],
})
export class ServiceModule {}
