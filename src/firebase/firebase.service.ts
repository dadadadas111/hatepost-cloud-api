import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  async firebaseSignUp(email: string, password: string) {
    // call to firebase auth api
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new BadRequestException(data.error);
      }
      return data;
    } catch (error) {
      Logger.error(error, 'FirebaseService.firebaseSignUp');
      throw new BadRequestException(error);
    }
  }

  async firebaseSignIn(email: string, password: string) {
    // call to firebase auth api
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new BadRequestException(data.error);
      }
      return data;
    } catch (error) {
      Logger.error(error, 'FirebaseService.firebaseSignIn');
      throw new BadRequestException(error);
    }
  }

  async firebaseResetPassword(email: string) {
    // call to firebase auth api
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          requestType: 'PASSWORD_RESET',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new BadRequestException(data.error);
      }
      return data;
    } catch (error) {
      Logger.error(error, 'FirebaseService.firebaseResetPassword');
      throw new BadRequestException(error);
    }
  }

  async firebaseSendEmailVerification(idToken: string) {
    // call to firebase auth api
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken,
          requestType: 'VERIFY_EMAIL',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new BadRequestException(data.error);
      }
      return data;
    } catch (error) {
      Logger.error(error, 'FirebaseService.firebaseSendEmailVerification');
      throw new BadRequestException(error);
    }
  }
}
