import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../jwt/auth.service';
import { UserService } from 'src/user/user.service';
import { InputFindUserDto } from 'src/user/dto/find-user.dto';
import { InputCreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { InputGithubAccessTokenUpdateDto } from 'src/user/dto/update-user.dto';
import axios from 'axios';

@Injectable()
export class GithubOauthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  githubLoginUrl() {
    const client_id = this.configService.get<string>('GITHUB_CLIENT_ID');

    return {
      item: `https://github.com/login/oauth/authorize?response_type=code&scope=user%2Crepo%2Cproject&client_id=${client_id}`,
    };
  }

  async getGithubAccessToken(code) {
    const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    };
    const opts = {
      headers: { accept: 'application/json' },
    };

    const token = await axios.post(
      'https://github.com/login/oauth/access_token',
      body,
      opts,
    );

    const result = token.data;

    return result;
  }

  async githubStrategyLogic(githubAccessToken) {
    const profile = await this.userService.getGithubProfile(githubAccessToken);
    const email = await this.userService.getGithubEmail(githubAccessToken);
    // github oauth는 refreshToken을 제공하지 않는다.
    const { login: githubId, avatar_url } = profile;

    const findUserInput = { email };
    const createUserInput: InputCreateUserDto = {
      email,
      githubId,
      password: null,
      avatarUrl: avatar_url,
      isGithub: true,
      githubAccessToken,
    };

    const updateAccessTokenInput: InputGithubAccessTokenUpdateDto = {
      email,
      githubAccessToken,
    };

    const { item: user } = await this.userService.findUser(findUserInput);

    // email로 가입된 유저가 없으면 생성.
    let createdUser: UserEntity;
    if (!user) {
      const { item } = await this.userService.create(createUserInput);
      createdUser = item;
      Logger.log(`유저: ${email} 깃허브 로그인으로 회원가입 완료`);
    } else {
      await this.userService.updateGithubAccessToken(updateAccessTokenInput);
      Logger.log(`유저: ${email} 깃허브 accessToken 업데이트 완료`);
    }

    // 기존 유저도 없고 생성된 유저도 없으면 에러 발생
    if (!user && !createdUser) {
      throw new UnauthorizedException();
    }

    const { access_token: accessToken } = await this.authService.signIn(email);

    return accessToken;
  }
}
