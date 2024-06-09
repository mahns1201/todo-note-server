import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskDao {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(dto: CreateTaskDto, sprint): Promise<TaskEntity> {
    const task = this.taskRepository.create(dto);
    task.sprints = sprint ? [sprint] : [];
    await this.taskRepository.save(task);

    return task;
  }

  async findById(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['user', 'repo'],
    });
  }

  async find(dto): Promise<[TaskEntity[], number]> {
    const { page, pageSize, orderBy, sortBy, userId } = dto;
    const [results, total] = await this.taskRepository.findAndCount({
      where: { userId, deletedAt: null },
      take: pageSize,
      skip: pageSize * (page - 1),
      order: { [orderBy]: sortBy },
      relations: ['user', 'repo'],
    });
    return [results, total];
  }

  async findByRepoId(dto): Promise<[TaskEntity[], number]> {
    const { page, pageSize, orderBy, sortBy, userId, repoId, sprintId } = dto;
    const [results, total] = await this.taskRepository.findAndCount({
      where: {
        userId,
        repoId,
        deletedAt: null,
        sprints: { id: sprintId },
      },
      take: pageSize,
      skip: pageSize * (page - 1),
      order: { [orderBy]: sortBy },
      relations: ['user', 'repo', 'sprints'],
    });
    return [results, total];
  }
}
