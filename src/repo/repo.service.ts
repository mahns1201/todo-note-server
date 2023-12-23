import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { REQUEST_INFO } from 'src/common/request-url';
import { Repository } from 'typeorm';
import { RepoEntity } from './entity/repo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoBranchEntity } from './entity/repo-branch.entity';
import { Octokit } from 'octokit';
import {
  InputFindAllReposDto,
  InputFindRepoDto,
  InputFindReposDto,
} from './dto/find-repo.dto';
import {
  ServicePagingResultDto,
  ServiceResultDto,
} from 'src/common/common.dto';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,

    @InjectRepository(RepoBranchEntity)
    private repoBranchRepository: Repository<RepoBranchEntity>,
  ) {}

  // ********** repo **********
  async create(input) {
    const { userId, repoName } = input;

    const newRepo = this.repoRepository.create({
      user: userId,
      ...input,
    });

    const savedRepo = await this.repoRepository.save(newRepo);

    Logger.log(`유저 ${userId}, 레포지토리: ${repoName} 생성 완료`);

    return { item: savedRepo };
  }

  async createBranch(input) {
    const { repoId, branchName } = input;

    const newBranch = this.repoBranchRepository.create({
      repo: repoId,
      ...input,
    });

    const savedBranch = await this.repoBranchRepository.save(newBranch);

    Logger.log(`브랜치 ${repoId}, 레포지토리: ${branchName} 생성 완료`);

    return { item: savedBranch };
  }

  async find(
    input: InputFindReposDto,
  ): Promise<ServicePagingResultDto<RepoEntity[]>> {
    const { id: userId, page, limit } = input;

    const queryBuilder = this.repoRepository
      .createQueryBuilder('repo')
      .where('userId = :userId', { userId })
      .offset((page - 1) * limit)
      .limit(limit);

    const [repos, totalCount] = await queryBuilder.getManyAndCount();

    if (!repos.length) {
      throw new NotFoundException(`${page}p에 발견된 레포지토리가 없습니다.`);
    }

    return {
      items: repos,
      totalCount,
    };
  }

  async findAll(
    input: InputFindAllReposDto,
  ): Promise<ServiceResultDto<RepoEntity[]>> {
    const { id: userId } = input;

    const queryBuilder = this.repoRepository
      .createQueryBuilder('repo')
      .where('userId = :userId', { userId });

    const repos = await queryBuilder.getMany();

    return {
      items: repos,
    };
  }

  async findOne(
    input: InputFindRepoDto,
  ): Promise<ServiceResultDto<RepoEntity>> {
    const { id } = input;
    const repo = await this.repoRepository.findOne({
      where: { id },
    });

    return { item: repo };
  }

  /** @deprecated */
  async findRepo(repoId) {
    const result = await this.repoRepository.findOne({
      where: {
        id: repoId,
      },
    });

    return result;
  }

  async findRepoByUserIdAndRepoName(userId, repoName) {
    const queryBuilder = this.repoRepository
      .createQueryBuilder('repo')
      .where('userId = :userId AND repoName = :repoName', { userId, repoName });

    const userRepo = await queryBuilder.getOne();

    if (!userRepo) {
      throw new NotFoundException(
        `${repoName}으로 발견된 레포지토리가 없습니다.`,
      );
    }

    return {
      item: userRepo,
    };
  }

  // ********** repoBranch **********

  async findRepoBranch(repoBranchId) {
    const result = await this.repoBranchRepository.findOne({
      where: {
        id: repoBranchId,
      },
    });

    return result;
  }

  async findRepoBranchesByRepoId(repoId) {
    const result = await this.repoBranchRepository.find({
      where: {
        repo: repoId,
      },
    });

    return result;
  }

  // TODO sync 고도화
  // 1. 삭제된 레포지토리 deletedAt: new Date() 추가
  // 2. ...
  async syncRepoBranch(repoId, branchName) {
    const newRepoBranch = this.repoBranchRepository.create({
      repo: repoId,
      branchName,
    });

    const result = await this.repoBranchRepository.save(newRepoBranch);

    return { item: result };
  }

  async syncUserRepos(userId, userGithubRepos, userRepos) {
    let syncCount = 0;
    const syncRepoNames = [];

    await Promise.all(
      userGithubRepos.map(async (userGithubRepo) => {
        // userRepos에 없으면 동기화
        let sync = true;
        userRepos.forEach((userRepo) => {
          if (userRepo.repoName === userGithubRepo.name) {
            sync = false;
            return;
          }
        });

        if (sync) {
          const {
            name: repoName,
            description,
            language,
            default_branch: defaultBranch,
            owner: { avatar_url: ownerAvatarUrl },
            html_url: htmlUrl,
            private: isPrivate,
            fork: isFork,
          } = userGithubRepo;

          const { item } = await this.create({
            userId,
            repoName,
            description,
            language,
            defaultBranch,
            ownerAvatarUrl,
            htmlUrl,
            isPrivate,
            isFork,
            synchronizedAt: new Date(),
          });
          if (item) {
            syncCount++;
            syncRepoNames.push(userGithubRepo.name);
            Logger.log(`${userGithubRepo.name} is synchronized`);
          }
        }
      }),
    );

    return { item: { syncRepoNames, syncCount } };
  }

  async syncRepoBranches(repoId, githubRepoBranches, repoBranches) {
    let syncCount = 0;
    const syncBranchNames = [];

    await Promise.all(
      githubRepoBranches.map(async (githubRepoBranch) => {
        let sync = true;
        repoBranches.forEach((repoBranch) => {
          if (repoBranch.branchName === githubRepoBranch.name) {
            sync = false;
            return;
          }
        });

        if (sync) {
          const { name: branchName } = githubRepoBranch;
          const { item } = await this.createBranch({
            repoId,
            branchName,
          });
          if (item) {
            syncCount++;
            syncBranchNames.push(githubRepoBranch.name);
            Logger.log(`${githubRepoBranch.name} is synchronized`);
          }
        }
      }),
    );

    return { item: { syncBranchNames, syncCount } };
  }

  async getRepoListFromGithub(githubAccessToken, username) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const { data: result } = await octokit.request('GET /user/repos', {
      username,
      headers: {
        'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      },
    });

    return result;
  }

  async getRepoFromGithub(githubAccessToken, owner, repo) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const { data: result } = await octokit.request(
      'GET /repos/{owner}/{repo}',
      {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
        },
      },
    );

    return result;
  }

  async getRepoBranchesFromGithub(githubAccessToken, owner, repo) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    try {
      const { data: result } = await octokit.request(
        'GET /repos/{owner}/{repo}/branches',
        {
          owner,
          repo,
          headers: {
            'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
          },
        },
      );

      return result;
    } catch (error) {
      Logger.error(error);
    }
  }

  // TODO updateRepo
  // TODO updateRepoBranch
}
