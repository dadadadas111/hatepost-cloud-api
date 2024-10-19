import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { FirebaseMiddleware } from 'src/firebase/firebase.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FirebaseModule,
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // use logger middleware and firebase middleware for all routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FirebaseMiddleware)
      .forRoutes('/')
  }
}
