import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [FirebaseModule],
})
export class AuthModule {}
