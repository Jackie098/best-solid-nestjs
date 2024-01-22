import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../../dtos/create-user-dto';
import { UpdatePatchUserDTO } from '../../../dtos/update-patch-user-dto';
import { UpdateUserDTO } from '../../../dtos/update-user-dto';
import { UserService } from '../../../user.service';
import { User } from '../entities/user.entity';

@Injectable()
export default class UserRepository implements UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    // if (
    //   await this.usersRepository.exists({
    //     where: {
    //       email: email,
    //     },
    //   })
    // ) {
    //   throw new BadRequestException('User already exists');
    // }

    const encryptedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(),
    );

    const user = this.usersRepository.create({
      email,
      name,
      password: encryptedPassword,
    });

    return this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const encryptedPassword = await bcrypt.hash(
      data.password,
      await bcrypt.genSalt(),
    );

    await this.usersRepository.update(id, {
      ...data,
      password: encryptedPassword,
      birthAt: data.birthAt ? new Date(data.birthAt) : undefined,
    });

    // FIXME: it does not return other repository function inside itself
    return this.findOne(id) as Promise<User>;
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO): Promise<User> {
    let encryptedPassword: string = null;

    if (data.password) {
      encryptedPassword = await bcrypt.hash(
        data.password,
        await bcrypt.genSalt(),
      );
    }

    await this.usersRepository.update(id, {
      ...data,
      password: encryptedPassword ? encryptedPassword : data.password,
      birthAt: data.birthAt ? new Date(data.birthAt) : undefined,
    });

    // FIXME: it does not return other repository function inside itself
    return this.findOne(id);
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
