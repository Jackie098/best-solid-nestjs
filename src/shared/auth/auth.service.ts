import { IUser } from '../../app/modules/user/interfaces/user.interface';
import {
  RefreshToken,
  SignedToken,
  TokenAgent,
  TokenPayload,
} from './auth.interfaces';

export abstract class AuthService {
  public createToken(user: IUser): SignedToken {
    return {} as SignedToken;
  }

  // FIXME: Find out type of verified token and add here
  public checkToken(token: string, tokenAgent: TokenAgent): TokenPayload {
    return {} as any;
  }

  public isValidToken(token: string, tokenAgent: TokenAgent): boolean {
    return false;
  }

  // NOTE: Login service is not require, it must exists only in controller
  // public login(email: string, password: string): Promise<SignedToken> {
  //   return {} as Promise<SignedToken>;
  // }

  public isValidPassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return {} as Promise<boolean>;
  }

  public createForgetToken(user: IUser): RefreshToken {
    return {} as RefreshToken;
  }

  public async comparePassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return {} as boolean;
  }

  public encryptPassword(password: string): Promise<string> {
    return {} as unknown as Promise<string>;
  }
}
