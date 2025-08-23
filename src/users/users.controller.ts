// users.controller.ts
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { LoggedInGuard } from '@app/auth/guards/logged-in.guard';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsernameParamDto } from './dto/username-param.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LoggedInGuard)
  @Get(':username')
  findByUsername(@Param() param: UsernameParamDto, @Request() request: { user: LoggedInDto }) {
    console.log('LoggedInDto from JWT:', request.user)
    return this.usersService.findByUsername(param.username);
  }
}
