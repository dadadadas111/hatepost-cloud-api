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
}
