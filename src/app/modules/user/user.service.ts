import { CreateUserDTO } from './dtos/create-user-dto';
import { User } from './infra/typeorm/entities/user.entity';
import {
  IFindUser,
  IUpdatePartialUser,
  IUser,
} from './interfaces/user.interface';

export abstract class UserService {
  public create(user: CreateUserDTO): Promise<User> {
    return user as unknown as Promise<User>;
  }

  public list(): Promise<User[]> {
    return {} as Promise<User[]>;
  }

  public findOne(data: IFindUser): Promise<User | null> {
    return data as unknown as Promise<User | null>;
  }

  public update(id: number, data: IUser): Promise<any> {
    return {} as Promise<any>;
  }

  public updatePartial(id: number, data: IUpdatePartialUser): Promise<boolean> {
    return { id, data } as unknown as Promise<boolean>;
  }

  public delete(id: number): Promise<any> {
    return id as any;
  }

  public userExists(id: number): Promise<boolean> {
    return id as unknown as Promise<boolean>;
  }
}
