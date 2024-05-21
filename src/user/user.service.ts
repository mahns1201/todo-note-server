import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './user.dao';
import { ResDto } from 'src/common/common.dto';
import { FindUserByIdDto } from './dto/find-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResDto<UserDto>> {
    const user = await this.userDao.create(createUserDto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: '유저가 생성되었습니다.',
      item: user,
    };
  }

  async findUser(
    dto: FindUserByIdDto,
  ): Promise<ResDto<Omit<UserDto, 'password'>>> {
    const user = await this.userDao.findById(dto.id);

    return {
      httpStatus: HttpStatus.OK,
      message: '유저를 찾았습니다.',
      item: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
        isDeleted: user.isDeleted,
        email: user.email,
        githubId: user.githubId,
        avatarUrl: user.avatarUrl,
        isGithub: user.isGithub,
        githubAccessToken: user.githubAccessToken,
      },
    };
  }
}
