import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    Logger.log(
      {
        request: {
          method: req.method,
          path: req.path,
          headers: req.headers,
          body: req.body,
          params: req.params,
          query: req.query,
        },
      },
      'HTTP Request',
    );
    next();
  }
}
