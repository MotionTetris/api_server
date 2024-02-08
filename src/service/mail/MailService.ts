import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  async sendVerifyEmail(email: string, name: string, code: string) {
    await this.mailQueue.add('sendMail', {
      email: email,
      name: name,
      code: code,
    });
  }
}
