// auth.service.ts
import { UsersService } from '@app/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoggedInDto } from './dto/logged-in.dto';
import { User } from '@app/users/entities/user.entity';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<TokensDto> {
    // find user by username
    const user: User = await this.usersService.findByUsername(loginDto.username);

    // compare hashed-password
    const matched = await bcrypt.compare(loginDto.password, user.password)
    if (!matched) {
      throw new UnauthorizedException(`wrong password: username=${loginDto.username}`)
    }

    // return token
    const loggedInDto: LoggedInDto = {
      id: user.id,
      username: user.username,
      role: user.role
    }
    return { accessToken: this.jwtService.sign(loggedInDto) };
  }
}
