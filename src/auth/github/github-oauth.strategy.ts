import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { InputCreateUserDto } from 'src/user/dto/create-user.dto';
import { InputFindUserDto } from 'src/user/dto/find-user.dto';
import { InputGithubAccessTokenUpdateDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user', 'repo'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // github oauth는 refreshToken을 제공하지 않는다.
    const { login: githubId, email, avatar_url } = profile._json;

    const findUserInput: InputFindUserDto = { email };
    const createUserInput: InputCreateUserDto = {
      email,
      githubId,
      password: null,
      avatarUrl: avatar_url,
      isGithub: true,
      githubAccessToken: accessToken,
    };
    const updateAccessTokenInput: InputGithubAccessTokenUpdateDto = {
      email,
      githubAccessToken: accessToken,
    };

    const { item: user } = await this.userService.findUser(findUserInput);

    // email로 가입된 유저가 없으면 생성.
    // TODO 1. 비밀번호 난수 생성 필요.
    let createdUser: UserEntity;
    if (!user) {
      const { item } = await this.userService.createUser(createUserInput);
      createdUser = item;
    } else {
      const UpdateResult = await this.userService.updateGithubAccessToken(
        updateAccessTokenInput,
      );
      Logger.log(`Github accessToken 업데이트: ${UpdateResult.item}`);
    }

    // 기존 유저도 없고 생성된 유저도 없으면 에러 발생
    if (!user && !createdUser) {
      throw new UnauthorizedException();
    }

    return user || createdUser;
  }
}
