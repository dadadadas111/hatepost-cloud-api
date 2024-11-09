import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';

@Processor('send-email')
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send-email-verification')
  async sendSignupEmail(job) {
    const { email, code } = job.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      html: this.formatEmailContent(`Your email verification code is ${code}`),
    });
  }

  @Process('send-reset-password-email')
  async sendResetPasswordEmail(job) {
    const { email, code } = job.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      html: this.formatEmailContent(`Your reset password code is : ${code}`),
    });
  }

  formatEmailContent(content) {
    // from Hong-Phot.com
    // based on mode, this email is for verification or reset password
    // if you dont intent to do..., you can ignore this email
    // ending (thanks, regards, etc)
    const html = `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
            <p>Dear HongPhot user,</p>
            <p>${content}</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thanks,</p>
            <p>HongPhot Team</p>
          </div>
        `;

    return html;
  }
}
