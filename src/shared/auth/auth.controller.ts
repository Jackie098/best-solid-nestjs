import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import AuthJwtStrategyService from './infra/auth-jwt-strategy.service';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import UserRepository from '../../app/modules/user/infra/typeorm/repositories/user.repository';
import { UserService } from '../../app/modules/user/user.service';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { AuthForgetDTO } from './dtos/auth-forget.dto';
import { AuthResetDTO } from './dtos/auth-reset.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthJwtStrategyService) private readonly authService: AuthService,
    @Inject(UserRepository) private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    const user = await this.userService.create(body);

    return this.authService.createToken(user);
  }

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(`E-mail não existe.`);
    }

    const isValidPassword = this.authService.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(`E-mail ou senha incorretos.`);
    }

    return this.authService.createToken(user);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(`E-mail está incorreto.`);
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    // TODO: send email
    // await this.mailerService.sendMail({
    //   subject: 'Recuperação de Senha',
    //   to: email,
    //   template: 'forget',
    //   context: {
    //     name: user.name,
    //     token,
    //   },
    // });

    return true;
  }

  @Post('reset')
  async reset(@Body() { token, password }: AuthResetDTO) {
    try {
      const data = this.authService.checkToken(token, {
        issuer: 'forget',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Invalid token');
      }

      const encryptedPassword =
        await this.authService.encryptPassword(password);

      await this.userService.updatePartial(Number(data.id), {
        password: encryptedPassword,
      });

      const user = await this.userService.findOne({ id: Number(data.id) });

      return this.authService.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
