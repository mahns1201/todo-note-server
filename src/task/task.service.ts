import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,

    private uploadService: UploadService,
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

    const { item: upload } = await this.uploadService.findUploadByTaskId({
      taskId: id,
      userId: task.user.id,
    });

    return { items: { task, upload } };
  }
}
