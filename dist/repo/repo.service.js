"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoService = void 0;
const common_1 = require("@nestjs/common");
const request_url_1 = require("../common/request-url");
const typeorm_1 = require("typeorm");
const repo_entity_1 = require("./entity/repo.entity");
const typeorm_2 = require("@nestjs/typeorm");
const repo_branch_entity_1 = require("./entity/repo-branch.entity");
const octokit_1 = require("octokit");
let RepoService = class RepoService {
    constructor(repoRepository, repoBranchRepository) {
        this.repoRepository = repoRepository;
        this.repoBranchRepository = repoBranchRepository;
    }
    async create(input) {
        const { userId, repoName } = input;
        const newRepo = this.repoRepository.create(Object.assign({ user: userId }, input));
        const savedRepo = await this.repoRepository.save(newRepo);
        common_1.Logger.log(`유저 ${userId}, 레포지토리: ${repoName} 생성 완료`);
        return { item: savedRepo };
    }
    async createBranch(input) {
        const { repoId, branchName } = input;
        const newBranch = this.repoBranchRepository.create(Object.assign({ repo: repoId }, input));
        const savedBranch = await this.repoBranchRepository.save(newBranch);
        common_1.Logger.log(`브랜치 ${repoId}, 레포지토리: ${branchName} 생성 완료`);
        return { item: savedBranch };
    }
    async find(input) {
        const { id: userId, page, limit } = input;
        const queryBuilder = this.repoRepository
            .createQueryBuilder('repo')
            .where('userId = :userId', { userId })
            .offset((page - 1) * limit)
            .limit(limit);
        const [repos, totalCount] = await queryBuilder.getManyAndCount();
        if (!repos.length) {
            throw new common_1.NotFoundException(`${page}p에 발견된 레포지토리가 없습니다.`);
        }
        return {
            items: repos,
            totalCount,
        };
    }
    async findAll(input) {
        const { id: userId } = input;
        const queryBuilder = this.repoRepository
            .createQueryBuilder('repo')
            .where('userId = :userId', { userId });
        const repos = await queryBuilder.getMany();
        return {
            items: repos,
        };
    }
    async findOne(input) {
        const { id } = input;
        const repo = await this.repoRepository.findOne({
            where: { id },
        });
        return { item: repo };
    }
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
            throw new common_1.NotFoundException(`${repoName}으로 발견된 레포지토리가 없습니다.`);
        }
        return {
            item: userRepo,
        };
    }
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
        await Promise.all(userGithubRepos.map(async (userGithubRepo) => {
            let sync = true;
            userRepos.forEach((userRepo) => {
                if (userRepo.repoName === userGithubRepo.name) {
                    sync = false;
                    return;
                }
            });
            if (sync) {
                const { name: repoName, description, language, default_branch: defaultBranch, owner: { avatar_url: ownerAvatarUrl }, html_url: htmlUrl, private: isPrivate, fork: isFork, } = userGithubRepo;
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
                    common_1.Logger.log(`${userGithubRepo.name} is synchronized`);
                }
            }
        }));
        return { item: { syncRepoNames, syncCount } };
    }
    async syncRepoBranches(repoId, githubRepoBranches, repoBranches) {
        let syncCount = 0;
        const syncBranchNames = [];
        await Promise.all(githubRepoBranches.map(async (githubRepoBranch) => {
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
                    common_1.Logger.log(`${githubRepoBranch.name} is synchronized`);
                }
            }
        }));
        return { item: { syncBranchNames, syncCount } };
    }
    async getRepoListFromGithub(githubAccessToken, username) {
        const octokit = new octokit_1.Octokit({
            auth: githubAccessToken,
        });
        const { data: result } = await octokit.request('GET /user/repos', {
            username,
            headers: {
                'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            },
        });
        return result;
    }
    async getRepoFromGithub(githubAccessToken, owner, repo) {
        const octokit = new octokit_1.Octokit({
            auth: githubAccessToken,
        });
        const { data: result } = await octokit.request('GET /repos/{owner}/{repo}', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            },
        });
        return result;
    }
    async getRepoBranchesFromGithub(githubAccessToken, owner, repo) {
        const octokit = new octokit_1.Octokit({
            auth: githubAccessToken,
        });
        try {
            const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/branches', {
                owner,
                repo,
                headers: {
                    'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
                },
            });
            return result;
        }
        catch (error) {
            common_1.Logger.error(error);
        }
    }
};
RepoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(repo_entity_1.RepoEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(repo_branch_entity_1.RepoBranchEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], RepoService);
exports.RepoService = RepoService;
//# sourceMappingURL=repo.service.js.map