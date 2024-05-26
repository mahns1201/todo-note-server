import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './user.dao';
import { FindUserByEmailDto, FindUserByIdDto } from './dto/find-user.dto';

// TODO ResDto

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userDao.create(createUserDto);
  }

  async findUser(dto: FindUserByIdDto) {
    return await this.userDao.findById(dto.id);
  }

  async findUserByEmail(dto: FindUserByEmailDto) {
    return await this.userDao.findByEmail(dto.email);
  }

  async findUserGithubToken(dto: FindUserByIdDto) {
    const user = await this.userDao.findById(dto.id);
    return user.githubToken;
  }

  async updateUser(
    findDto: FindUserByIdDto,
    updateDto: Partial<CreateUserDto>,
  ) {
    return await this.userDao.update(findDto.id, updateDto);
  }
}
