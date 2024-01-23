import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../app/modules/user/user.service';
import UserRepository from '../../app/modules/user/infra/typeorm/repositories/user.repository';
import { AuthService } from '../../shared/auth/auth.service';
import AuthJwtStrategyService from '../../shared/auth/infra/auth-jwt-strategy.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthJwtStrategyService)
    private readonly authService: AuthService,
    @Inject(UserRepository)
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
        { issuer: 'login', audience: 'users' },
      );

      request.token = data;
      request.user = await this.userService.findOne({ id: data.id });

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
