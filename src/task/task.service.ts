import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(input) {
    const newTask = this.taskRepository.create(input);
    const result = await this.taskRepository.save(newTask);

    return { item: result };
  }

  async findTaskById(input) {
    const { id } = input;
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'repo', 'repoBranch'], // left join
    });

    return { item: task };
  }
}
