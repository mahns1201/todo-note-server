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

  async create(dto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create(dto);
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
}
