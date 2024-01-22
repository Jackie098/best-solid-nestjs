import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../app/modules/user/infra/typeorm/entities/user.entity';
import { UserModule } from '../../app/modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => UserModule),
    FileModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [{ provide: AuthService, useClass: {} }],
  exports: [AuthService],
})
export class AuthModule {}
