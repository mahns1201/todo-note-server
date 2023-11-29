import { Injectable, Logger } from '@nestjs/common';
import { REQUEST_INFO } from 'src/common/request-url';
import { Repository } from 'typeorm';
import { RepoEntity } from './entity/repo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoBranchEntity } from './entity/repo-branch.entity';
import { Octokit } from 'octokit';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,

    @InjectRepository(RepoBranchEntity)
    private repoBranchRepository: Repository<RepoBranchEntity>,
  ) {}

  // ********** repo **********
  async findRepo(repoId) {
    const result = await this.repoRepository.findOne({
      where: {
        id: repoId,
      },
    });

    return result;
  }
  async findReposByUserId(user) {
    const result = await this.repoRepository.findAndCount({
      where: {
        user,
      },
    });

    return result;
  }

  async findRepoByUserIdAndRepoName(userId, repoName) {
    const [userRepo] = await this.repoRepository.find({
      where: {
        user: userId,
        repoName,
      },
    });

    return userRepo;
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
  async syncUserRepo(user, userRepo) {
    const newUserRepo = this.repoRepository.create({
      user,
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

  async getRepoListFromGithub(githubAccessToken, username) {
    console.log(githubAccessToken, username);
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const { data: result } = await octokit.request(
      'GET /users/{username}/repos',
      {
        username,
        headers: {
          'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
        },
      },
    );

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
  }

  // TODO updateRepo
  // TODO updateRepoBranch
}
