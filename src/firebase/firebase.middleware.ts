import { Injectable, NestMiddleware } from '@nestjs/common';
import { firebaseAdmin } from './firebase.initialise';
import { EXCLUDED_PATHS } from './firebase.excluded-paths';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const path = req.path;
    if (EXCLUDED_PATHS.includes(path)) {
      next();
    }
    else {
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).send('Unauthorized');
        return;
      }
      const token = authorization.split(' ')[1];
      firebaseAdmin.auth().verifyIdToken(token)
        .then((decodedToken) => {
          req.user = decodedToken;
          next();
        })
        .catch((error) => {
          res.status(401).send('Unauthorized');
        }
        );
      next();
    }
  }
}
