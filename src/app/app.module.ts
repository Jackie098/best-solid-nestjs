import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  MailerModuleOptionsConfig,
  ThrottlerModuleConfig,
  TypeOrmModuleConfig,
} from './app-import.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from '../shared/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(ThrottlerModuleConfig),
    TypeOrmModule.forRoot(TypeOrmModuleConfig),
    MailerModule.forRoot(MailerModuleOptionsConfig),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
