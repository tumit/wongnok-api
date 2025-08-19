
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../modules/users/users.module';
import { UsersService } from '../modules/users/users.service';


@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [PassportModule],
})
export class AuthModule {}
