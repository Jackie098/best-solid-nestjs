import { IsString, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
