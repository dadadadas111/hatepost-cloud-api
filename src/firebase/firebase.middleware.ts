import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { firebaseAdmin } from './firebase.initialise';
import { EXCLUDED_PATHS } from './firebase.excluded-paths';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const path = req.path;
    const method = req.method;
    const pathMethod = `${method} ${path}`;
    if (EXCLUDED_PATHS.includes(pathMethod)) {
    } else {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new UnauthorizedException('Unauthorized');
      }
      const token = authorization.split(' ')[1];
      try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        req.user = decodedToken;
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    }
    next();
  }
}
