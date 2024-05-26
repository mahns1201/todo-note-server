import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskDao } from './task.dao';
import { FindTaskByIdDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskDao: TaskDao) {}

  async createTask(dto: CreateTaskDto) {
    return await this.taskDao.create(dto);
  }

  async findTask(dto: FindTaskByIdDto) {
    const { id, userId } = dto;
    const task = await this.taskDao.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    if (task.user.id !== userId) {
      throw new UnauthorizedException('Access denied.');
    }

    return task;
  }
}
