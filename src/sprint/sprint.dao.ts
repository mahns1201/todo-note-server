import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SprintEntity } from './sprint.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';

@Injectable()
export class SprintDao {
  constructor(
    @InjectRepository(SprintEntity)
    private sprintRepository: Repository<SprintEntity>,
  ) {}

  async create(dto: CreateSprintDto): Promise<SprintEntity> {
    const sprint = this.sprintRepository.create(dto);
    await this.sprintRepository.save(sprint);

    return sprint;
  }

  async findById(id: number): Promise<SprintEntity> {
    return await this.sprintRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['user'],
    });
  }
}
