// import { User } from '../infra/typeorm/entities/user.entity';

export interface IFindUser {
  id?: number;
  email?: string;
}

// NOTE: Maybe use this is better
// type FindUser = Pick<User, 'id' | 'email'>;
