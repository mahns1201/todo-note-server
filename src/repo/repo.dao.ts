import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoEntity } from './repo.entity';
import { CreateRepoDto } from './dto/create-repo-dto';

@Injectable()
export class RepoDao {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,
  ) {}

  async create(input: CreateRepoDto): Promise<RepoEntity> {
    const repo = this.repoRepository.create(input);
    await this.repoRepository.save(repo);

    return repo;
  }

  async findById(id: number): Promise<RepoEntity> {
    return await this.repoRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['user'],
    });
  }
}
