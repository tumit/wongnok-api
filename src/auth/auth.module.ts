
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [PassportModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [PassportModule],
})
export class AuthModule {}
