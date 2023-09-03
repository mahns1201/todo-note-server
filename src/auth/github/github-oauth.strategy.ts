import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user', 'repo'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // github oauth는 refreshToken을 제공하지 않는다.

    // TODO profile에서 필요한 정보 추출

    // TODO userService.findByEmail();
    // TODO !user -> userService.createUser();
    // TODO 예외처리 throw new UnauthorizedException();

    return 'validate result';
  }
}
