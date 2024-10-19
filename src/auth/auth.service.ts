import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async signUp(email: string, password: string) {
    return this.firebaseService.firebaseSignUp(email, password);
  }

  async signIn(email: string, password: string) {
    return this.firebaseService.firebaseSignIn(email, password);
  }
}
