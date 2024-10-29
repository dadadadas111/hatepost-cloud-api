import { Cache } from 'cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
    @InjectQueue('send-email')
    private readonly sendEmailQueue: Queue,
  ) {}

  async signUp(email: string, password: string) {
    const user = this.firebaseService.firebaseSignUp(email, password);
    // set to firebase that email is verified
    await this.firebaseService.firebaseVerifyEmail(email);
    return user;
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
      await this.cacheManager.set(email, code, { ttl: 300 } as any);
      // await this.mailerService.sendMail({
      //   to: email,
      //   subject: 'Email Verification',
      //   html: this.formatEmailContent(`Your email verification code is ${code}`),
      // });
      await this.sendEmailQueue.add(
        'send-email-verification',
        {
          email,
          code,
        },
        {
          removeOnComplete: true,
        },
      );
      return {
        success: true,
      };
    } catch (error) {
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
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      Logger.error(error, 'AuthService.verifyCodeEmailVerification');
      throw new BadRequestException(error);
    }
  }

  async sendPasswordResetEmailCode(email: string) {
    // this send 6 number code for reset password
    // using cache to store the code
    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      await this.cacheManager.set(email, code, { ttl: 300 } as any);
      // await this.mailerService.sendMail({
      //   to: email,
      //   subject: 'Reset Password',
      //   html: this.formatEmailContent(`Your reset password code is ${code}`),
      // });
      await this.sendEmailQueue.add(
        'send-reset-password-email',
        {
          email,
          code,
        },
        {
          removeOnComplete: true,
        },
      );
      return {
        success: true,
      };
    } catch (error) {
      Logger.error(error, 'AuthService.sendPasswordResetEmailCode');
      throw new BadRequestException(error);
    }
  }

  async verifyPasswordResetEmailCode(
    email: string,
    code: number,
    newPassword: string,
  ) {
    // this verify the code
    try {
      const cacheCode = await this.cacheManager.get(email);
      if (cacheCode === code) {
        await this.cacheManager.del(email);
        // set new password
        await this.firebaseService.firebaseResetPasswordByCode(
          email,
          newPassword,
        );
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      Logger.error(error, 'AuthService.verifyPasswordResetEmailCode');
      throw new BadRequestException(error);
    }
  }

  async checkExistingEmail(email: string) {
    return this.firebaseService.firebaseCheckExistingEmail(email);
  }
}
