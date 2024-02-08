import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process, OnGlobalQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { DOMAIN_NAME } from 'src/constants';

@Processor('mail')
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendMail')
  async sendEmail(job: Job<{ email: string; name: string; code: string }>) {
    const { email, name, code } = job.data;
    const url = `https://${DOMAIN_NAME}/user/verify/${name}/${code}`;
    await this.mailerService.sendMail({
      to: email,
      subject: '[모션 테트리스] 가입을 축하합니다.',
      text: `가입을 축하합니다. 인증 링크: ${url}`,
    });
  }

  @OnGlobalQueueFailed()
  onFailed(err) {
    console.log(err);
  }
}
