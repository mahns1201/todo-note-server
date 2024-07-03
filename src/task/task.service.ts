import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskDao } from './task.dao';
import { FindTaskByIdDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { RepoService } from 'src/repo/repo.service';
import { FindTasksByRepoIdDto } from './dto/find-repo-tasks.dto';
import { SprintService } from 'src/sprint/sprint.service';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskDao: TaskDao,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
    private readonly sprintService: SprintService,
    private readonly githubService: GithubService,
  ) {}

  async createTask(dto: CreateTaskDto) {
    const { repoId, userId, sprintId } = dto;
    await this.repoService.findRepo({ id: repoId, userId }); // 레포지토리 존재 여부 확인 및 권한 확인

    let sprint;
    if (sprintId) {
      sprint = await this.sprintService.findSprint({ id: sprintId, userId });
    }

    const createdTask = await this.taskDao.create(dto, sprint);

    return this.findTask({ id: createdTask.id, userId });
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

  async findTasks(dto: FindTasksDto) {
    return await this.taskDao.find(dto);
  }

  async findTasksByRepoId(dto: FindTasksByRepoIdDto) {
    return await this.taskDao.findByRepoId(dto);
  }

  // async syncRepoTask(dto) {
  // const { userId, repoId } = dto;
  // const { githubId, githubToken } = await this.userService.findUser({
  //   id: userId,
  // });
  //   const repo = await this.repoService.findRepo({ id: repoId, userId });
  //   const tasks = await this.taskDao.findAllByUserId(userId);
  //   const githubIssues = await this.githubService.getIssues(
  //     githubToken,
  //     githubId,
  //     repo.repoName,
  //   );
  //   let syncCount = 0;
  //   const syncSprintNames = [];
  //   for (const githubMilestone of githubMilestones) {
  //     const sprintExists = sprints.some(
  //       (sprint) => sprint.title === githubMilestone.title,
  //     );
  //     if (!sprintExists) {
  //       const createdSprint = await this.createSprint({
  //         userId,
  //         repoId,
  //         title: githubMilestone.title,
  //         description: githubMilestone.description,
  //         startAt: githubMilestone.created_at,
  //         endAt: githubMilestone.closed_at,
  //       });
  //       if (createdSprint) {
  //         syncCount++;
  //         syncSprintNames.push(createdSprint.title);
  //         Logger.log(`${createdSprint.title} is synchronized`);
  //       }
  //     }
  //   }
  //   return { syncSprintNames, syncCount };
  // }
}
