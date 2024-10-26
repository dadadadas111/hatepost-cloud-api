import { Cache } from 'cache-manager';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache
  ) { }

  async signUp(email: string, password: string) {
    return this.firebaseService.firebaseSignUp(email, password);
  }

  async signIn(email: string, password: string) {
    return this.firebaseService.firebaseSignIn(email, password);
  }

  async resetPassword(email: string) {
    // this send link for reset password
    return this.firebaseService.firebaseResetPassword(email);
  }

  async sendEmailVerification(idToken: string) {
    // this send link for email verification
    return this.firebaseService.firebaseSendEmailVerification(idToken);
  }

  async sendCodeEmailVerification(email: string) {
    // this send 6 number code for email verification
    // using cache to store the code
    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      await this.cacheManager.set(email, code, {ttl : 300} as any);
      await this.mailerService.sendMail({
        to: email,
        subject: 'Email Verification',
        html: this.formatEmailContent(`Your email verification code is ${code}`),
      });
      return {
        success: true
      }
    }
    catch (error) {
      Logger.error(error, 'AuthService.sendCodeEmailVerification');
      throw new BadRequestException(error);
    }
  }

  async verifyCodeEmailVerification(email: string, code: number) {
    // this verify the code
    try {
      const cacheCode = await this.cacheManager.get(email);
      if (cacheCode === code) {
        await this.cacheManager.del(email);
        // set to firebase that email is verified
        await this.firebaseService.firebaseVerifyEmail(email);
        return {
          success: true
        }
      }
      return {
        success: false
      }
    }
    catch (error) {
      Logger.error(error, 'AuthService.verifyCodeEmailVerification');
      throw new BadRequestException(error);
    }
  }

  async sendPasswordResetEmailCode(email: string) {
    // this send 6 number code for reset password
    // using cache to store the code
    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      await this.cacheManager.set(email, code, {ttl : 300} as any);
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Password',
        html: this.formatEmailContent(`Your reset password code is ${code}`),
      });
      return {
        success: true
      }
    }
    catch (error) {
      Logger.error(error, 'AuthService.sendPasswordResetEmailCode');
      throw new BadRequestException(error);
    }
  }

  async verifyPasswordResetEmailCode(email: string, code: number, newPassword: string) {
    // this verify the code
    try {
      const cacheCode = await this.cacheManager.get(email);
      if (cacheCode === code) {
        await this.cacheManager.del(email);
        // set new password
        await this.firebaseService.firebaseResetPasswordByCode(email, newPassword);
        return {
          success: true
        }
      }
      return {
        success: false
      }
    }
    catch (error) {
      Logger.error(error, 'AuthService.verifyPasswordResetEmailCode');
      throw new BadRequestException(error);
    }
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
