import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ThrottlerGuard } from '@nestjs/throttler';
import { Role } from '../../../core/enum/role.enum';
import { UserService } from './user.service';
import { CreateUserDTO, UpdatePatchUserDTO, UpdateUserDTO } from './dtos';
import UserRepository from './infra/typeorm/repositories/user.repository';
import { ParamId } from '../../../core/decorators/param-id.decorator';
import { Roles } from '../../../core/decorators/roles.decorator';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { RoleGuard } from '../../../core/guards/role.guard';
import { LogInterceptor } from '../../../core/interceptors/log.interceptor';
import AuthJwtStrategyService from '../../../shared/auth/infra/auth-jwt-strategy.service';
import { AuthService } from '../../../shared/auth/auth.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
// #TODO: Versioning the project v1, v2, v3...
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserRepository) private readonly userService: UserService,
    @Inject(AuthJwtStrategyService) private readonly authService: AuthService,
  ) {}

  @UseGuards(ThrottlerGuard)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async findOne(@ParamId() id: number) {
    return this.userService.findOne({ id });
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const encryptedPassword = await this.authService.encryptPassword(
      data.password,
    );

    return this.userService.create({ ...data, password: encryptedPassword });
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdateUserDTO) {
    const encryptedPassword = await this.authService.encryptPassword(
      data.password,
    );

    await this.userService.update(id, {
      ...data,
      password: encryptedPassword,
      birthAt: data.birthAt ? new Date(data.birthAt) : undefined,
    });

    return this.userService.findOne({ id });
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    let encryptedPassword: string = null;

    if (data.password) {
      encryptedPassword = await this.authService.encryptPassword(data.password);
    }

    await this.userService.updatePartial(id, {
      ...data,
      password: encryptedPassword ? encryptedPassword : data.password,
      birthAt: data.birthAt ? new Date(data.birthAt) : undefined,
    });

    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
