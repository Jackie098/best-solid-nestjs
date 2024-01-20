import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { User as UserEntity } from '../../app/modules/user/infra/typeorm/entities/user.entity';

export const User = createParamDecorator(
  (
    filter: keyof Omit<UserEntity, 'id' | 'password'>,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return filter
        ? request.user[filter]
        : { ...request.user, id: undefined, password: undefined };
    } else {
      throw new NotFoundException(
        "User doesn't exists in Request. Use the AUthGard to get related user",
      );
    }
  },
);
