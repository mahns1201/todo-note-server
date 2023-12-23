import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SprintEntity } from './entity/sprint.entity';
import { Repository } from 'typeorm';
import { InputCreateSprintDto } from './dto/create-sprint.dto';
import {
  ServicePagingResultDto,
  ServiceResultDto,
} from 'src/common/common.dto';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { InputFindSprintsDto } from './dto/find-sprint.dto';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(SprintEntity)
    private sprintRepository: Repository<SprintEntity>,
  ) {}

  async create(
    input: InputCreateSprintDto,
    repo: RepoEntity, // , //
  ): Promise<ServiceResultDto<SprintEntity>> {
    // const { repo } = input;

    const newSprint = this.sprintRepository.create({
      ...input,
      repo,
    });
    const savedSprint = await this.sprintRepository.save(newSprint);

    Logger.log(`생성 완료`);

    return { item: savedSprint };
  }

  async find(
    input: InputFindSprintsDto,
  ): Promise<ServicePagingResultDto<SprintEntity[]>> {
    const { id: userId, page, limit } = input;

    const queryBuilder = this.sprintRepository
      .createQueryBuilder('sprint')
      .where('userId = :userId', { userId })
      .offset((page - 1) * limit)
      .limit(limit);

    const [sprints, totalCount] = await queryBuilder.getManyAndCount();

    if (!sprints.length) {
      throw new NotFoundException(`${page}p에 발견된 스프린트가 없습니다.`);
    }

    return {
      items: sprints,
      totalCount,
    };
  }
}
