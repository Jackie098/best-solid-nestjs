import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../../dtos';
import {
  IFindUser,
  IUpdatePartialUser,
  IUser,
} from '../../../interfaces/user.interface';
import { UserService } from '../../../user.service';
import { User } from '../entities/user.entity';

@Injectable()
export default class UserRepository implements UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      email,
      name,
      password,
    });

    return this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne({ id, email }: IFindUser): Promise<User | null> {
    if (id) {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    } else {
      return this.usersRepository.findOne({
        where: {
          email,
        },
      });
    }
  }

  async update(id: number, data: IUser): Promise<any> {
    return await this.usersRepository.update(id, data);
  }

  async updatePartial(id: number, data: IUpdatePartialUser): Promise<boolean> {
    await this.usersRepository.update(id, data);

    return true;
  }

  async delete(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }

  async userExists(id: number): Promise<boolean> {
    if (
      !(await this.usersRepository.exists({
        where: {
          id,
        },
      }))
    ) {
      return false;
    }

    return true;
  }
}
