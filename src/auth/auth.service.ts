import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { LoggedInDto } from './dto/logged-in.dto';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import * as client from 'openid-client'

@Injectable()
export class AuthService {
  private logger = new Logger();
  private jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private http: HttpService,
  ) {
    const jwksUri = `${this.configService.get('OAUTH2_ISSUER')}/protocol/openid-connect/certs`;
    this.jwks = createRemoteJWKSet(new URL(jwksUri));
  }

  async getRedirectByClient(): Promise<{ state: string; url: string }> {
    let server: URL = new URL(this.configService.get('OAUTH2_ISSUER')!);
    let clientId: string = this.configService.get('OAUTH2_CLIENT_ID')!
    let clientSecret: string = this.configService.get('OAUTH2_CLIENT_SECRET')!

    let config: client.Configuration = await client.discovery(
      server,
      clientId,
      clientSecret,
    )

    let redirect_uri!: string
    let scope!: string // Scope of the access request
    /**
     * PKCE: The following MUST be generated for every redirect to the
     * authorization_endpoint. You must store the code_verifier and state in the
     * end-user session such that it can be recovered as the user gets redirected
     * from the authorization server back to your application.
     */
    let code_verifier: string = client.randomPKCECodeVerifier()
    let code_challenge: string =
      await client.calculatePKCECodeChallenge(code_verifier)
    let state!: string

    let parameters: Record<string, string> = {
      redirect_uri,
      scope,
      code_challenge,
      code_challenge_method: 'S256',
    }

    if (!config.serverMetadata().supportsPKCE()) {
      /**
       * We cannot be sure the server supports PKCE so we're going to use state too.
       * Use of PKCE is backwards compatible even if the AS doesn't support it which
       * is why we're using it regardless. Like PKCE, random state must be generated
       * for every redirect to the authorization_endpoint.
       */
      state = client.randomState()
      parameters.state = state
    }

    let redirectTo: URL = client.buildAuthorizationUrl(config, parameters)

    // now redirect the user to redirectTo.href
    console.log('redirecting to', redirectTo.href)

    return { state, url: redirectTo.href}

  }

  getRedirectAuthenticationUrl(): { state: string; url: string } {
    const auth_url = this.configService.get('OAUTH2_AUTH_URL');
    const client_id = this.configService.get('OAUTH2_CLIENT_ID');
    const redirect_uri = this.configService.get('OAUTH2_CALLBACK_URL');
    const scope = encodeURIComponent(this.configService.get<string>('OAUTH2_SCOPE')!);
    const response_type = this.configService.get('OAUTH2_RESPONSE_TYPE');
    const state = randomUUID();
    const url = `${auth_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&state=${state}`;
    return { state, url };
  }

  async exchange(code: string): Promise<LoggedInDto> {
    const tokenUrl = this.configService.get<string>('OAUTH2_TOKEN_URL', '');

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.configService.get('OAUTH2_CALLBACK_URL', ''));
    params.append('client_id', this.configService.get('OAUTH2_CLIENT_ID', ''));
    params.append('client_secret', this.configService.get('OAUTH2_CLIENT_SECRET', ''));

    const response$ = this.http.post(tokenUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { data } = await firstValueFrom(response$);

    // console.log('exchange', data);

    return this.validateUserByAccessToken(data.id_token);
  }

  async validateUserByAccessToken(token: string): Promise<LoggedInDto> {
    // const userInfo: { preferred_username: string } = await this.jwtService.decode(token);

    console.log('token', token)
    console.log('issuer', this.configService.get('OAUTH2_ISSUER'))
    console.log('audience', this.configService.get('OAUTH2_CLIENT_ID'))
    const { payload } = await jwtVerify(token, this.jwks, {
      issuer: this.configService.get('OAUTH2_ISSUER'),
      audience: this.configService.get('OAUTH2_CLIENT_ID'),
    });

    console.log('payload={}', payload)

    // const user = await this.usersService.findOneByUsername(userInfo.preferred_username);
    // if (!user) {
    //   this.logger.debug(`user not found: username=${userInfo.preferred_username}`, AuthService.name)
    //   return null
    // }

    // const { password, ...userWithoutPassword} = user;

    // return userWithoutPassword;
    return new Promise((resolve) => resolve({ id: 1, username: 'tumit' } as LoggedInDto));
  }

  realmUrl(configService: ConfigService) {
    const url = '';
    const realm = '';
    return `${url}/realm/${realm}`;
  }

  login(loggedInDto: LoggedInDto) {
    // payload = loggedInDto + other payload

    // sign access_token
    const payload: LoggedInDto = { ...loggedInDto, sub: loggedInDto.id };
    const access_token = this.jwtService.sign(payload);

    // sign refresh_token
    const refreshTokenSecret = this.configService.get('REFRESH_JWT_SECRET');
    const refreshTokenExpiresIn = this.configService.get('REFRESH_JWT_EXPIRES_IN');

    // sign with options of refresh
    const refresh_token = this.jwtService.sign(payload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiresIn,
    });

    // return access_token & refresh_token
    return { access_token, refresh_token };
  }
}
