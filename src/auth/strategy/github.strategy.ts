import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { GithubService } from 'src/github/github.service';
import { UserDao } from 'src/user/user.dao';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userDao: UserDao,
    private readonly githubService: GithubService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user'],
    });
  }
  async validate(
    githubAccessToken: string,
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
        githubAccessToken: githubAccessToken,
      });
    } else {
      const profile = await this.githubService.getProfile(githubAccessToken);
      const { login: githubId, avatar_url: avatarUrl } = profile;
      user = await this.userDao.create({
        email,
        password: null,
        githubId,
        avatarUrl,
        isGithub: true,
        githubAccessToken,
      });
    }

    const accessToken = await this.authService.loginByOauth(email);

    done(null, { ...user, githubAccessToken, accessToken });
  }
}
