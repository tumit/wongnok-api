import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import * as client from 'openid-client';

@Injectable()
export class AuthService {
  private logger = new Logger();
  private jwks: ReturnType<typeof createRemoteJWKSet>;
  private config: client.Configuration;

  constructor(private configService: ConfigService) {}

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

  async callback(request: Request): Promise<{ idToken: string; payload: any }> {
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
    const { payload } = await jwtVerify(idToken, jwks, {
      issuer: this.configService.get('OAUTH2_ISSUER'),
      audience: this.configService.get('OAUTH2_CLIENT_ID'),
    });

    return { idToken, payload };
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
