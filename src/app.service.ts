import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async sendEmailTest() {
    const to = 'long6athcskl@gmail.com';
    await this.mailerService.sendMail({
      to,
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
    });
    return {
      success: true,
    };
  }
}
