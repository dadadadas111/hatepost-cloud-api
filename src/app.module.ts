import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { FirebaseMiddleware } from 'src/firebase/firebase.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from './tag/tag.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    FirebaseModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const redisHost = process.env.REDIS_CONNECTION.split(':')[0];
        const redisPort = process.env.REDIS_CONNECTION.split(':')[1];
        const store = await redisStore({
          password: process.env.REDIS_PASSWORD,
          socket: {
            host: redisHost,
            port: parseInt(redisPort),
          },
        });
        return {
          store: store as unknown as CacheStore,
          ttl: 60000,
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_CONNECTION.split(':')[0],
        port: parseInt(process.env.REDIS_CONNECTION.split(':')[1]),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        verifyTransporters: true,
        transport: {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
        defaults: {
          from: process.env.SMTP_USER,
        },
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TagModule,
    PostModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, FirebaseMiddleware).forRoutes('/');
  }
}
