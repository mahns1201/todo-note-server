import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDao } from 'src/user/user.dao';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDao: UserDao,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(email: string, password: string) {
    const user = await this.userDao.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`email: [${email}] 유저를 찾을 수 없습니다.`);
    }

    if (user.password != password) {
      throw new UnauthorizedException(
        `email: [${email}] 유저의 비밀번호가 유효하지 않습니다.`,
      );
    }

    return {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      githubId: user.githubId,
      avatarUrl: user.avatarUrl,
      isGithub: user.isGithub,
      githubAccessToken: user.githubAccessToken,
    };
  }

  async loginByPassword(user: any) {
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
