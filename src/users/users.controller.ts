// users.controller.ts
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IdParamDto } from '@app/common/dto/id-param.dto';
import { LoggedInGuard } from '@app/auth/guards/logged-in.guard';
import { UsernameParamDto } from './dto/username-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LoggedInGuard)
  @Get(':username')
  findByUsername(@Param() param: UsernameParamDto) {
    return this.usersService.findByUsername(param.username);
  }
}
