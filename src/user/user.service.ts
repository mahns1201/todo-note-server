import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './user.dao';
import { FindUserByIdDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userDao.create(createUserDto);
  }

  async findUser(dto: FindUserByIdDto) {
    return await this.userDao.findById(dto.id);
  }

  async findUserGithubAcesToken(dto: FindUserByIdDto) {
    const user = await this.userDao.findById(dto.id);
    return user.githubAccessToken;
  }
}
