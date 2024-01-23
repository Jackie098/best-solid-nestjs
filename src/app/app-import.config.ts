import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces';
import { User as UserEntity } from './modules/user/infra/typeorm/entities/user.entity';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const ThrottlerModuleConfig = [
  {
    ttl: 1000 * 60 * 1, // 1 minute
    limit: 6,
    ignoreUserAgents: [/googlebot/gi], //ignore agents like google search engine
  },
] as ThrottlerModuleOptions;

export const TypeOrmModuleConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity],
  synchronize: process.env.ENV === 'development',
} as TypeOrmModuleOptions;

export const MailerModuleOptionsConfig = {
  transport: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_AUTH_USER,
      pass: process.env.MAILER_AUTH_PASS,
    },
  },
  defaults: {
    from: '"Jack Soluções" <dannie23@ethereal.email>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
} as MailerOptions;
