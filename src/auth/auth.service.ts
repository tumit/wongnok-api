import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    // find user by username
    const user = await this.usersService.findByUsername(loginDto.username);

    // compare hashed-password
    // return token
    const accessToken = 'VALID-TOKEN-' + user.username;
    return { accessToken };
  }
}
