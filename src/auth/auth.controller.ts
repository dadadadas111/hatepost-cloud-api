import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signUp(email, password);
  }

  @Post('sign-in')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('send-email-verification')
  async sendEmailVerification(@Body('idToken') idToken: string) {
    return this.authService.sendEmailVerification(idToken);
  }

  @Post('send-code-email-verification')
  async sendCodeEmailVerification(@Body('email') email: string) {
    return this.authService.sendCodeEmailVerification(email);
  }

  @Post('verify-code-email-verification')
  async verifyCodeEmailVerification(
    @Body('email') email: string,
    @Body('code') code: number,
  ) {
    return this.authService.verifyCodeEmailVerification(email, code);
  }

  @Post('send-code-reset-password')
  async sendCodeResetPassword(@Body('email') email: string) {
    return this.authService.sendPasswordResetEmailCode(email);
  }

  @Post('verify-code-reset-password')
  async verifyCodeResetPassword(
    @Body('email') email: string,
    @Body('code') code: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.verifyPasswordResetEmailCode(
      email,
      code,
      newPassword,
    );
  }

  @Post('check-existing-email')
  async checkExistingEmail(@Body('email') email: string) {
    return this.authService.checkExistingEmail(email);
  }
}
