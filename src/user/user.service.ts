import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InputCreateUserDto } from './dto/create-user.dto';
import { ServiceResultDto } from 'src/common/common.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    input: InputCreateUserDto,
  ): Promise<ServiceResultDto<UserEntity>> {
    const { email, password, avatarUrl, isGithub } = input;
    const newUser = this.userRepository.create({
      email,
      password,
      avatarUrl,
      isGithub,
    });

    const result = await this.userRepository.save(newUser);

    return { item: result };
  }

  async findUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
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
