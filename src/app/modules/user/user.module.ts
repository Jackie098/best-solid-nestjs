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
import { AbstractUserService } from './service/abstract-user.service';
import UserRepository from './infra/typeorm/repositories/user.repository';
import { UserIdCheckMiddleware } from '../../../core/middlewares/user-id-check.middleware';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [{ provide: AbstractUserService, useClass: UserRepository }],
  exports: [{ provide: AbstractUserService, useClass: UserRepository }],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
