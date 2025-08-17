import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('redirect-url')
  redirectAuthenticationUrl(@Res({ passthrough: true }) response: Response): { state: string; url: string } {
    return this.authService.getRedirectAuthenticationUrl();
  }

  @Get('redirect')
  redirectToAuthentication(@Res({ passthrough: true }) response: Response) {
    const { state, url } = this.authService.getRedirectAuthenticationUrl();
    response.cookie('state', state);
    response.redirect(url);
    return;
  }

  @Get('login')
  login(@Req() request: Request) {

    const refState = `${request.cookies['state']}`;
    const reqState = `${request.query['state']}`;
    if (refState != reqState) {
      throw new UnauthorizedException();
    }

    const code = `${request.query['code']}`;
    return this.authService.exchange(code);
  }
}
