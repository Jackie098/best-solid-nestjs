import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdatePatchUserDTO } from '../dtos/update-patch-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { User } from '../infra/typeorm/entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  update(id: number, data: UpdateUserDTO): Promise<User>;
  updatePartial(id: number, data: UpdatePatchUserDTO): Promise<User>;
  delete(id: number): Promise<any>;
  userExists(id: number): Promise<boolean>;
}
