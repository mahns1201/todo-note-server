import axios from 'axios';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';

// TODO ReqDto, ResDto 설정

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly githubService: GithubService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(email: string, password: string) {
    const user = await this.userService.findUserByEmail({ email });
    if (!user) {
      throw new NotFoundException(`${email} 유저를 찾을 수 없습니다.`);
    }
    if (user.password != password) {
      throw new UnauthorizedException(`${email} 비밀번호가 유효하지 않습니다.`);
    }

    return {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      githubId: user.githubId,
      avatarUrl: user.avatarUrl,
      isGithub: user.isGithub,
      githubToken: user.githubToken,
    };
  }

  async signIn(user: any) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  githubLoginUrl() {
    const client_id = this.configService.get<string>('GITHUB_CLIENT_ID');
    return `https://github.com/login/oauth/authorize?response_type=code&scope=user%2Crepo%2Cproject&client_id=${client_id}`;
  }

  async getGithubTokenByCode(code: string) {
    const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');
    const res = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      { headers: { accept: 'application/json' } },
    );

    return await this.githubStrategyLogic(res.data.access_token);
  }

  async githubStrategyLogic(githubToken: string) {
    const email = await this.githubService.getEmail(githubToken);
    const profile = await this.githubService.getProfile(githubToken);
    const { login: githubId, avatar_url: avatarUrl } = profile;

    let user = await this.userService.findUserByEmail({ email });
    if (user) {
      this.userService.updateUser(
        { id: user.id },
        {
          githubId,
          avatarUrl,
          isGithub: true,
          githubToken,
        },
      );
    } else {
      user = await this.userService.createUser({
        email,
        password: null,
        githubId,
        avatarUrl,
        isGithub: true,
        githubToken,
      });
    }

    const accessToken = await this.signIn(user);

    return { ...user, githubToken, accessToken };
  }
}
