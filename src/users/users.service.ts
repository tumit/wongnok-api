// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    // 10 = hash password 2^10 = 1024 rounds
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = { ...createUserDto, password: hashedPassword };

    const savedUser = await this.repository.save(user);

    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async findOne(id: number) {
    const user = await this.repository.findOneByOrFail({ id });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
