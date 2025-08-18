import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('redirect')
  async redirectToAuthentication(@Res({ passthrough: true }) response: Response) {
    const { state, redirectUrl } = await this.authService.getRedirectAuthenticationUrl();
    response.cookie('state', state);
    response.redirect(redirectUrl);
    return;
  }

  @Get('callback')
  async login(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const { idToken, payload } = await this.authService.callback(request)
    response.cookie('idToken', idToken);
    return payload
  }

  @Get('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const logoutUrl = await this.authService.logout(request)
    response.redirect(logoutUrl);
    return
  }

}
