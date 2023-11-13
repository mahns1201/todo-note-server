import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { RepoEntity } from './entity/repo.entity';
import { RepoBranchEntity } from './entity/repo-branch.entity';
export declare class RepoService {
    private repoRepository;
    private repoBranchRepository;
    private httpService;
    constructor(repoRepository: Repository<RepoEntity>, repoBranchRepository: Repository<RepoBranchEntity>, httpService: HttpService);
    findUserRepos(userId: any): Promise<{
        items: [RepoEntity[], number];
    }>;
    findUserRepo(userId: any, repoName: any): Promise<{
        item: RepoEntity;
    }>;
    findRepoBranches(repoId: any): Promise<{
        items: RepoBranchEntity[];
    }>;
    syncUserRepo(userId: any, userRepo: any): Promise<{
        item: RepoEntity;
    }>;
    syncRepoBranch(repoId: any, branchName: any): Promise<{
        item: RepoBranchEntity;
    }>;
    syncUserRepos(userId: any, userGithubRepos: any, userRepos: any): Promise<{
        item: {
            syncCount: number;
        };
    }>;
    syncRepoBranches(repoId: any, githubRepoBranches: any, repoBranches: any): Promise<{
        item: {
            syncCount: number;
        };
    }>;
    getReposFromGithub(githubAccessToken: any): Promise<{
        items: any;
    }>;
    getRepoFromGithub(githubAccessToken: any, owner: any, repo: any, branch: any): Promise<{
        item: any;
    }>;
}
