import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService],
  imports: [
    FirebaseModule,
    BullModule.registerQueue({
      name: 'send-email',
    }),
  ],
})
export class AuthModule {}
