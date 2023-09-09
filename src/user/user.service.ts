import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InputCreateUserDto } from './dto/create-user.dto';
import { ServiceResultDto } from 'src/common/common.dto';
import { InputFindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    input: InputCreateUserDto,
  ): Promise<ServiceResultDto<UserEntity>> {
    const { email, password, avatarUrl, isGithub, githubAccessToken } = input;

    const newUser = this.userRepository.create({
      email,
      password,
      avatarUrl,
      isGithub,
      githubAccessToken,
    });

    const result = await this.userRepository.save(newUser);

    return { item: result };
  }

  async findUser(
    input: InputFindUserDto,
  ): Promise<ServiceResultDto<UserEntity>> {
    const { email } = input;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return { item: user };
  }

  // async findAll(): Promise<UserEntity[]> {
  //   return this.userRepository.find();
  // }

  // async update(id: number, book: UserEntity): Promise<number> {
  //   await this.userRepository.update(id, book);
  //   return id;
  // }

  // async remove(id: number): Promise<number> {
  //   await this.userRepository.delete(id);
  //   return id;
  // }
}
