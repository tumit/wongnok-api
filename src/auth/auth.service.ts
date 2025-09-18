import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<TokensDto> {

    // find by username
    const user = await this.usersService.findByUsername(loginDto.username)

    const accessToken = 'VALID_TOKEN-' + user.username
    return { accessToken };
  }
}
