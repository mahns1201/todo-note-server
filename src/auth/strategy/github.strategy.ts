import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UserDao } from 'src/user/user.dao';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userDao: UserDao,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user'],
    });
  }
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { login: githubId, email, avatar_url: avatarUrl } = profile._json;

    let user = await this.userDao.findByEmail(email);
    if (user) {
      this.userDao.update(user.id, {
        githubId,
        avatarUrl,
        isGithub: true,
        githubAccessToken: accessToken,
      });
    } else {
      user = await this.userDao.create({
        email,
        password: null,
        githubId,
        avatarUrl,
        isGithub: true,
        githubAccessToken: accessToken,
      });
    }

    done(null, { ...user, githubAccessToken: accessToken });
  }
}
