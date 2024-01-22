import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/typeorm/entities/user.entity';
import { UserService } from './user.service';
import UserRepository from './infra/typeorm/repositories/user.repository';
import { UserIdCheckMiddleware } from '../../../core/middlewares/user-id-check.middleware';
import { AuthModule } from '../../../shared/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [{ provide: UserService, useClass: UserRepository }],
  exports: [{ provide: UserService, useClass: UserRepository }],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
