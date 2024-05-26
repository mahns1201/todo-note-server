import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BranchDao } from './branch.dao';
import { CreateBranchDto } from './dto/create-branch.dto';
import { FindBranchByIdDto } from './dto/find-branch.dto';
import { RepoService } from 'src/repo/repo.service';
import { GithubService } from 'src/github/github.service';
import { UserService } from 'src/user/user.service';
import { SyncBranchDto } from './dto/sync-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    private readonly branchDao: BranchDao,
    private readonly userService: UserService,
    private readonly repoService: RepoService,
    private readonly githubService: GithubService,
  ) {}

  async createBranch(dto: CreateBranchDto) {
    const { userId, repoId } = dto;
    await this.repoService.findRepo({ id: repoId, userId });

    return await this.branchDao.create(dto);
  }

  async findBranch(dto: FindBranchByIdDto) {
    const { id, repoId, userId } = dto;

    await this.repoService.findRepo({ id: repoId, userId });

    const branch = await this.branchDao.findById(id);
    if (!branch) {
      throw new NotFoundException('브랜치를 찾을 수 없습니다.');
    }

    return branch;
  }

  async syncRepoBranches(dto: SyncBranchDto) {
    const { userId, repoId } = dto;

    const githubToken = await this.userService.findUserGithubToken({
      id: userId,
    });
    const profile = await this.githubService.getProfile(githubToken);
    const repo = await this.repoService.findRepo({ id: repoId, userId });
    const branches = await this.branchDao.findAllByRepoId(repoId);
    const githubBranches = await this.githubService.getBranches(
      githubToken,
      profile.login,
      repo.repoName,
    );

    let syncCount = 0;
    const syncBranchNames = [];

    for (const githubBranch of githubBranches) {
      if (!branches.some((branch) => branch.branchName === githubBranch.name)) {
        const createdBranch = await this.createBranch({
          userId,
          repoId,
          branchName: githubBranch.name,
        });
        if (createdBranch) {
          syncCount++;
          syncBranchNames.push(githubBranch.name);

          Logger.log(`${githubBranch.name} is synchronized`);
        }
      }
    }

    return { syncBranchNames, syncCount };
  }
}
