// keycloak.service.ts
import { Injectable } from '@nestjs/common';
import { KeycloakParamsDto } from './dto/keycloak-params.dto';
import client from 'openid-client';
import { KeycloakConfig } from './keycloak.config';

@Injectable()
export class KeycloakService {

  private config: client.Configuration;

  constructor(private keycloakConfig: KeycloakConfig) { }

  private async getConfig() {

    // if discovery already then return config
    if (this.config) {
      return this.config;
    }

    // read config
    const server = new URL(this.keycloakConfig.issuer)
    const clientId = this.keycloakConfig.clientId
    const clientSecret = this.keycloakConfig.clientSecret

    // discovery
    this.config = await client.discovery(server, clientId, clientSecret + 'x')

    // this config
    return this.config
  }

  async getRedirectLoginUrl(): Promise<KeycloakParamsDto> {

    // state & codeVerifier are rand
    const state = client.randomState();
    const codeVerifier = client.randomPKCECodeVerifier();

    // url build from config & params
    const redirectUri = this.keycloakConfig.callbackUrl;
    const scope = this.keycloakConfig.scope;
    const codeChallenge =
      await client.calculatePKCECodeChallenge(codeVerifier)
    const parameters: Record<string, string> = {
      redirect_uri: redirectUri,
      scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state
    }

    const config = await this.getConfig();
    const redirectTo: URL = client.buildAuthorizationUrl(config, parameters)

    return { state, codeVerifier, url: decodeURIComponent(redirectTo.href) }

  }

}
