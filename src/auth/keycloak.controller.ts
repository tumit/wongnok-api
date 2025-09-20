import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { KeycloakService } from './keycloak.service';

@Controller('keycloak')
export class KeycloakController {

  constructor(private keycloakService: KeycloakService) {}

  @Get('redirect-to-login')
  async redirectToLogin(
    @Res({ passthrough: true }) res: Response
  ) {

    // return state, codeVerifier, url
    const { state, codeVerifier, url } =
      await this.keycloakService.getRedirectLoginUrl()

    res.cookie('state', state) // what's req ?
    res.cookie('codeVerifier', codeVerifier) // who're you ?
    // res.redirect(url)  // where's keycloak ?
    return { url } ;
  }

}
