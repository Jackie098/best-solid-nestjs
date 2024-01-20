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
import { Role } from '../../../shared/enum/role.enum';
import { AbstractUserService } from './service/abstract-user.service';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { UpdatePatchUserDTO } from './dtos/update-patch-user-dto';
import UserRepository from './infra/typeorm/repositories/user.repository';
import { ParamId } from '../../../core/decorators/param-id.decorator';
import { Roles } from '../../../core/decorators/roles.decorator';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { RoleGuard } from '../../../core/guards/role.guard';
import { LogInterceptor } from '../../../core/interceptors/log.interceptor';

// CHECKPOINT - Import guards, interceptors, etc
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
// #TODO: Versioning the project v1, v2, v3...
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserRepository) private readonly userService: AbstractUserService,
  ) {}

  @UseGuards(ThrottlerGuard)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async findOne(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
