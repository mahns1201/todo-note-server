import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { UploadService } from 'src/upload/upload.service';
import { RepoService } from 'src/repo/repo.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,

    private userService: UserService,

    private repoService: RepoService,

    private uploadService: UploadService,
  ) {}

  async createOne(input) {
    const { userId, repoId, repoBranchId, title, content } = input;

    const user = await this.userService.findOne(userId);
    const repo = await this.repoService.findRepo(repoId);
    const repoBranch = await this.repoService.findRepoBranch(repoBranchId);
    const taskObj = { user, repo, repoBranch, title, content };

    const newTask = this.taskRepository.create(taskObj);
    const result = await this.taskRepository.save(newTask);

    return result;
  }

  async findOne(id) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'repo', 'repoBranch'], // left join
    });

    const { item: upload } = await this.uploadService.findUploadByTaskId({
      taskId: id,
      userId: task.user.id,
    });

    return { task, upload };
  }
}
