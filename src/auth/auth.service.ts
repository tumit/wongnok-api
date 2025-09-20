import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { UsersService } from '@app/users/users.service';
import bcrypt from 'bcrypt'
import { LoggedInDto } from './dto/logged-in.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<TokensDto> {

    // find by username
    const user = await this.usersService.findByUsername(loginDto.username)

    // compare hashed-password
    const matched = await bcrypt.compare(loginDto.password, user.password)
    if (!matched) {
      throw new UnauthorizedException(`wrong password: username=${loginDto.username}`)
    }

    // return token
    const loggedInDto: LoggedInDto = {
      username: user.username,
      role: user.role
    }
    
    return this.generateTokens(loggedInDto);
  }

  generateTokens(loggedInDto: LoggedInDto): TokensDto {
    const accessToken = this.jwtService.sign(loggedInDto)
    return { accessToken }
  }

}
