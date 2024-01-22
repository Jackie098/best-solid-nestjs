import { IUser } from '../../app/modules/user/interfaces/user.interface';
import { SignedToken } from './auth.interfaces';
import { AuthRegisterDTO } from './dtos/auth-register.dto';

export abstract class AuthService {
  private issuer = 'login';
  private audience = 'users';

  public createToken(user: IUser): SignedToken {
    return {} as SignedToken;
  }

  // FIXME: Find out type of verified token and add here
  public checkToken(token: string) {
    return {} as any;
  }

  public isValidToken(token: string): boolean {
    return false;
  }

  public login(email: string, password: string) {
    return {} as SignedToken;
  }

  public forget(email: string) {
    return {} as SignedToken;
  }

  public reset(password: string, token: string) {
    return {} as SignedToken;
  }

  public register(data: AuthRegisterDTO) {}
}
