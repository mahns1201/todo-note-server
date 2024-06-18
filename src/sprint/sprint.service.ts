import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SprintDao } from './sprint.dao';
import { FindSprintByIdDto } from './dto/find-sprint.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { RepoService } from 'src/repo/repo.service';
import { FindSprintsDto } from './dto/find-sprints.dto';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';

@Injectable()
export class SprintService {
  constructor(
    private readonly sprintDao: SprintDao,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
    private readonly githubService: GithubService,
  ) {}

  async createSprint(dto: CreateSprintDto) {
    const { repoId, userId } = dto;
    await this.repoService.findRepo({ id: repoId, userId }); // 레포지토리 존재 여부 확인 및 권한 확인
    const createdSprint = await this.sprintDao.create(dto);

    return this.findSprint({ id: createdSprint.id, userId });
  }

  async findSprint(dto: FindSprintByIdDto) {
    const { id, userId } = dto;
    const sprint = await this.sprintDao.findById(id);

    if (!sprint) {
      throw new NotFoundException('스프린트를 찾을 수 없습니다.');
    }

    if (sprint.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return sprint;
  }

  async findSprints(dto: FindSprintsDto) {
    return await this.sprintDao.find(dto);
  }

  async syncRepoSprint(dto) {
    const { userId, repoId } = dto;

    const { githubId, githubToken } = await this.userService.findUser({
      id: userId,
    });

    const repo = await this.repoService.findRepo({ id: repoId, userId });
    const sprints = await this.sprintDao.findAllByUserId(userId);
    const githubMilestones = await this.githubService.getMilestones(
      githubToken,
      githubId,
      repo.repoName,
    );

    let syncCount = 0;
    const syncRepoNames = [];

    for (const githubMilestone of githubMilestones) {
      const sprintExists = sprints.some(
        (sprint) => sprint.title === githubMilestone.title,
      );
      if (!sprintExists) {
        const createdSprint = await this.createSprint({
          userId,
          repoId,
          title: githubMilestone.title,
          description: githubMilestone.description,
          startAt: githubMilestone.created_at,
          endAt: githubMilestone.closed_at,
        });
        if (createdSprint) {
          syncCount++;
          syncRepoNames.push(createdSprint.title);
          Logger.log(`${createdSprint.title} is synchronized`);
        }
      }
    }

    return { syncRepoNames, syncCount };
  }
}
