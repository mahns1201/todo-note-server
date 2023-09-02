import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(book: UserEntity): Promise<UserEntity> {
    const newBook = this.userRepository.create(book);
    return await this.userRepository.save(newBook);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, book: UserEntity): Promise<number> {
    await this.userRepository.update(id, book);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id;
  }
}
