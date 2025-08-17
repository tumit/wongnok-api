import { Injectable, Logger } from '@nestjs/common';
import { LoggedInDto } from './dto/logged-in.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { randomUUID } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private http: HttpService,
  ) {}

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

    console.log('exchange', data)

    return this.validateUserByAccessToken(data.id_token);
  }

  async validateUserByAccessToken(token: string): Promise<LoggedInDto> {
    const userInfo: { preferred_username: string } = await this.jwtService.decode(token);

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
