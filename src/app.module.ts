import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { FirebaseMiddleware } from 'src/firebase/firebase.middleware';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // use logger middleware and firebase middleware for all routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FirebaseMiddleware)
      .forRoutes('*');
  }
}
