// users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }
}
