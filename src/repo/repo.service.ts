import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { REQUEST_INFO } from 'src/common/request-url';
import { Repository } from 'typeorm';
import { RepoEntity } from './entity/repo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoBranchEntity } from './entity/repo-branch.entity';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,

    @InjectRepository(RepoBranchEntity)
    private repoBranchRepository: Repository<RepoBranchEntity>,

    private httpService: HttpService,
  ) {}

  async findUserRepos(userId) {
    const userRepos = await this.repoRepository.findAndCount({
      where: {
        user: userId,
      },
    });

    return { items: userRepos };
  }

  async findUserRepo(userId, repoName) {
    const [userRepo] = await this.repoRepository.find({
      where: {
        user: userId,
        repoName,
      },
    });

    return { item: userRepo };
  }

  async findRepoBranches(repoId) {
    const repoBranches = await this.repoBranchRepository.find({
      where: {
        repo: repoId,
      },
    });

    return { items: repoBranches };
  }

  // TODO sync 고도화
  // 1. 삭제된 레포지토리 deletedAt: new Date() 추가
  // 2. ...
  async syncUserRepo(userId, userRepo) {
    const newUserRepo = this.repoRepository.create({
      user: userId,
      repoName: userRepo,
    });

    const result = await this.repoRepository.save(newUserRepo);

    return { item: result };
  }

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
          const { item } = await this.syncUserRepo(userId, userGithubRepo.name);
          if (item) {
            syncCount++;
            Logger.log(`${userGithubRepo.name} is synchronized`);
          }
        }
      }),
    );

    const result = { item: { syncCount } };

    return result;
  }

  async syncRepoBranches(repoId, githubRepoBranches, repoBranches) {
    let syncCount = 0;

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
          const { item } = await this.syncRepoBranch(
            repoId,
            githubRepoBranch.name,
          );
          if (item) {
            syncCount++;
            Logger.log(`${githubRepoBranch.name} is synchronized`);
          }
        }
      }),
    );

    const result = { item: { syncCount } };

    return result;
  }

  async getReposFromGithub(authorization) {
    const requestHeaders = {
      'Content-Type': REQUEST_INFO.GITHUB.CONTENT_TYPE,
      'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      Authorization: authorization,
    };

    try {
      const observable = this.httpService
        .get(`${REQUEST_INFO.GITHUB.PREFIX}/user/repos`, {
          headers: requestHeaders,
        })
        .pipe(map((res) => res.data));

      const items = await lastValueFrom(observable);

      return { items };
    } catch (error) {
      Logger.error(`[RepoService][getRepos] message: ${error.message}`);
      return { items: null };
    }
  }

  async getRepoFromGithub(authorization, owner, repo, branch) {
    const requestHeaders = {
      'Content-Type': REQUEST_INFO.GITHUB.CONTENT_TYPE,
      'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      Authorization: authorization,
    };

    try {
      let requestUrl = `${REQUEST_INFO.GITHUB.PREFIX}/repos/${owner}/${repo}`;
      branch ? (requestUrl += '/branches') : requestUrl;

      const observable = this.httpService
        .get(requestUrl, {
          headers: requestHeaders,
        })
        .pipe(map((res) => res.data));

      const item = await lastValueFrom(observable);

      return { item };
    } catch (error) {
      Logger.error(`[RepoService][getRepo] message: ${error.message}`);
      return { item: null };
    }
  }

  // TODO updateRepo
  // TODO updateRepoBranch
}
