import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { PasswordRemoverInterceptor } from '@app/interceptors/password-remover.interceptor';
import { JwtGuard } from '@app/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(PasswordRemoverInterceptor)
  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username)
  }

}
