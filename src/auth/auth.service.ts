import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import * as client from 'openid-client';
import { UsersService } from '../modules/users/users.service';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { PayloadAuth } from './dto/payload-auth.dto';
import { LoggedInUserDto } from '../modules/users/dto/logged-in-user.dto';
import { LoggedInDto } from './dto/logged-in.dto';

@Injectable()
export class AuthService {
  private logger = new Logger();
  private jwks: ReturnType<typeof createRemoteJWKSet>;
  private config: client.Configuration;

  constructor(private configService: ConfigService, private usersService: UsersService) {}

  async getJwks() {
    if (this.jwks) {
      return this.jwks;
    }

    const config = await this.getConfig();
    this.jwks = createRemoteJWKSet(new URL(config.serverMetadata().jwks_uri!));

    return this.jwks;
  }

  async getConfig() {
    if (this.config) {
      return this.config;
    }

    console.log('init config');
    let server: URL = new URL(this.configService.get('OAUTH2_ISSUER')!);
    let clientId: string = this.configService.get('OAUTH2_CLIENT_ID')!;
    let clientSecret: string = this.configService.get('OAUTH2_CLIENT_SECRET')!;

    this.config = await client.discovery(server, clientId, clientSecret);

    return this.config;
  }

  async getRedirectAuthenticationUrl(): Promise<{ state: string; redirectUrl: string }> {
    let redirect_uri: string = this.configService.get('OAUTH2_CALLBACK_URL')!;
    let scope: string = this.configService.get('OAUTH2_SCOPE')!;
    const state = client.randomState();
    const parameters: Record<string, string> = {
      redirect_uri,
      scope,
      state,
    };

    let redirectTo: URL = client.buildAuthorizationUrl(await this.getConfig(), parameters);
    console.log('re', redirectTo);
    return { state, redirectUrl: decodeURIComponent(redirectTo.href) };
  }

  async callback(request: Request): Promise<{ idToken: string; loggedInUser: LoggedInUserDto }> {
    const getCurrentUrl: (...args: any) => URL = (req: Request) =>
      new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const state = `${request.cookies['state']}`;

    const tokens: client.TokenEndpointResponse = await client.authorizationCodeGrant(
      await this.getConfig(),
      getCurrentUrl(request),
      {
        expectedState: state,
      },
    )!;

    const idToken = tokens.id_token!;

    const jwks = await this.getJwks();
    const { payload } = await jwtVerify<PayloadAuth>(idToken, jwks, {
      issuer: this.configService.get('OAUTH2_ISSUER'),
      audience: this.configService.get('OAUTH2_CLIENT_ID'),
    });


    const loggedInUserDto: LoggedInUserDto = {
      id: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name
    };
    const loggedInUser = await this.usersService.upsert(loggedInUserDto)
    console.log('loggedInUser', loggedInUser)
    return { idToken, loggedInUser };
  }

  async logout(request: Request): Promise<string> {
    const idToken = `${request.cookies['idToken']}`;

    const logoutUrl = client.buildEndSessionUrl(await this.getConfig(), {
      id_token_hint: idToken,
      post_logout_redirect_uri: this.configService.get('OAUTH2_POST_LOGOUT_REDIRECT_URI')!,
    });

    return decodeURIComponent(logoutUrl.href);
  }
}
