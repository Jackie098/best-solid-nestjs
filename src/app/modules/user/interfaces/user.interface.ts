import { UpdatePatchUserDTO } from '../dtos';
import { User as UserEntity } from '../infra/typeorm/entities/user.entity';

export interface IUser extends UserEntity {}

export interface IFindUser {
  id?: number;
  email?: string;
}

export type IUpdatePartialUser = Omit<UpdatePatchUserDTO, 'birthAt'> & {
  birthAt?: Date;
};
