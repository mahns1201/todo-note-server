import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './user.dao';
import { FindUserByIdDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userDao.create(createUserDto);
    return {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      githubId: user.githubId,
      avatarUrl: user.avatarUrl,
      isGithub: user.isGithub,
    };
  }

  async findUser(dto: FindUserByIdDto) {
    const user = await this.userDao.findById(dto.id);
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email: user.email,
      githubId: user.githubId,
      avatarUrl: user.avatarUrl,
      isGithub: user.isGithub,
    };
  }

  async findUserGithubAcesToken(dto: FindUserByIdDto) {
    const user = await this.userDao.findById(dto.id);
    return user.githubAccessToken;
  }
}
