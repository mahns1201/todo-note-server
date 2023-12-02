import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtPayloadT } from 'src/constant/jwt.constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email) {
    const { item: user } = await this.userService.findUser({ email });

    const payload: jwtPayloadT = {
      id: user.id,
      email: user.email,
      username: user.githubId,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
