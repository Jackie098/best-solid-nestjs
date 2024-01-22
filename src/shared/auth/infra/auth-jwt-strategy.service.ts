import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../../app/modules/user/interfaces/user.interface';
import {
  RefreshToken,
  SignedToken,
  TokenAgent,
  TokenPayload,
} from '../auth.interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export default class AuthJwtStrategyService implements AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(private readonly jwtService: JwtService) {}

  public createToken(user: IUser): SignedToken {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '3 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  public checkToken(
    token: string,
    { issuer, audience }: TokenAgent,
  ): TokenPayload {
    return this.jwtService.verify(token, {
      issuer: issuer,
      audience: audience,
    });
  }

  public isValidToken(token: string, tokenAgent: TokenAgent): boolean {
    return !!this.checkToken(token, tokenAgent);
  }

  // public async login(email: string, password: string): Promise<SignedToken> {
  //   const user = await this.userService.findOne({ email });
  // }

  public async isValidPassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, userPassword);
  }

  // TODO: The vars must be constants
  public createForgetToken(user: IUser): RefreshToken {
    return {
      refreshToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '30 minutes',
          subject: String(user.id),
          issuer: 'forget',
          audience: 'users',
        },
      ),
    };
  }

  public async comparePassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
  }

  public async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
