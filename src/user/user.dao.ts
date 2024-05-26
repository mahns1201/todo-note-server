import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  async update(id: number, dto: Partial<CreateUserDto>): Promise<UserEntity> {
    await this.userRepository.update(id, dto);
    return this.findById(id);
  }
}
