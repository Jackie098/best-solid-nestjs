import { CreateUserDTO } from './dtos/create-user-dto';
import { UpdatePatchUserDTO } from './dtos/update-patch-user-dto';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { User } from './infra/typeorm/entities/user.entity';

export abstract class UserService {
  public create(user: CreateUserDTO): Promise<User> {
    return user as unknown as Promise<User>;
  }

  public list(): Promise<User[]> {
    return {} as Promise<User[]>;
  }

  public findOne(id: number): Promise<User | null> {
    return id as unknown as Promise<User | null>;
  }

  public update(id: number, data: UpdateUserDTO): Promise<User> {
    return { id, data } as unknown as Promise<User>;
  }

  public updatePartial(id: number, data: UpdatePatchUserDTO): Promise<User> {
    return { id, data } as unknown as Promise<User>;
  }

  public delete(id: number): Promise<any> {
    return id as any;
  }

  public userExists(id: number): Promise<boolean> {
    return id as unknown as Promise<boolean>;
  }
}
