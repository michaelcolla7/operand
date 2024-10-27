import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
//import { MailerModule } from '@nestjs-modules/mailer';
//import { mailerConfig } from './configs/mailer.config';
import { FirebaseModule } from './configs/firebase.module';
import { TaskController } from './tasks/tasks.controller';
import { TaskService } from './tasks/tasks.service';
import {
  configuration,
  validationSchema,
} from './configs/configuration.firebase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRoot(typeOrmConfig[0]),
    WinstonModule.forRoot(winstonConfig),
    //MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    TaskService,
    FirebaseModule,
  ],
})
export class AppModule {}
