import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AbstractUserService } from '../../app/modules/user/service/abstract-user.service';
import UserRepository from '../../app/modules/user/infra/typeorm/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserRepository)
    private readonly userService: AbstractUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.token = data;
      request.user = await this.userService.findOne(data.id);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.guard.ts:30 ~ AuthGuard ~ canActivate ~ error:',
        error,
      );
      return false;
    }
  }
}
