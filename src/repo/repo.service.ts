import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RepoDao } from './repo.dao';
import { FindRepoByIdDto } from './dto/find-repo.dto';
import { CreateRepoDto } from './dto/create-repo.dto';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';
import { SyncRepoDto } from './dto/sync-repo.dto';
import { FindReposDto } from './dto/find-repos.dto';

// TODO ResDto

@Injectable()
export class RepoService {
  constructor(
    private readonly repoDao: RepoDao,
    private readonly userService: UserService,
    private readonly githubService: GithubService,
  ) {}

  async createRepo(dto: CreateRepoDto) {
    return await this.repoDao.create(dto);
  }

  async findRepo(dto: FindRepoByIdDto) {
    const { id, userId } = dto;

    const repo = await this.repoDao.findById(id, userId);
    if (!repo) {
      throw new NotFoundException('레포지토리를 찾을 수 없습니다.');
    }
    if (repo.userId !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return repo;
  }

  async findRepos(dto: FindReposDto) {
    return await this.repoDao.find(dto);
  }

  async syncUserRepos(dto: SyncRepoDto) {
    const { userId } = dto;

    const { githubId, githubToken } = await this.userService.findUser({
      id: userId,
    });
    const repos = await this.repoDao.findAllByUserId(userId);
    const githubRepos = await this.githubService.getRepos(githubToken);

    let syncCount = 0;
    const syncRepoNames = [];

    for (const githubRepo of githubRepos) {
      const repoExists = repos.some(
        (repo) => repo.repoName === githubRepo.name,
      );
      if (!repoExists && githubRepo.owner.login === githubId) {
        const createdRepo = await this.createRepo({
          userId,
          repoName: githubRepo.name,
          description: githubRepo.description,
          language: githubRepo.language,
          defaultBranch: githubRepo.default_branch,
          ownerAvatarUrl: githubRepo.owner.avatar_url,
          htmlUrl: githubRepo.html_url,
          isPrivate: githubRepo.private,
          isFork: githubRepo.fork,
          synchronizedAt: new Date(),
        });
        if (createdRepo) {
          syncCount++;
          syncRepoNames.push(githubRepo.name);
          Logger.log(`${githubRepo.name} is synchronized`);
        }
      }
    }

    return { syncRepoNames, syncCount };
  }
}
