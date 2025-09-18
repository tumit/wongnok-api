import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto): TokensDto {
    const accessToken = 'VALID_TOKEN'
    return { accessToken };
  }
}
