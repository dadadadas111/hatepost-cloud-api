import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}
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

  async sendStars() {
    // get the current stars and then increase it by 1
    const stars: string = (await this.cacheManager.get('stars')) || '0';
    const startToNumber = parseInt(stars, 10);
    await this.cacheManager.set('stars', startToNumber + 1);
  }

  async getStars() {
    return (await this.cacheManager.get('stars')) || '0';
  }
}
