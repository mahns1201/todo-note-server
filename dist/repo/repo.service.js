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
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const request_url_1 = require("../common/request-url");
const typeorm_1 = require("typeorm");
const repo_entity_1 = require("./entity/repo.entity");
const typeorm_2 = require("@nestjs/typeorm");
const repo_branch_entity_1 = require("./entity/repo-branch.entity");
let RepoService = class RepoService {
    constructor(repoRepository, repoBranchRepository, httpService) {
        this.repoRepository = repoRepository;
        this.repoBranchRepository = repoBranchRepository;
        this.httpService = httpService;
    }
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
        await Promise.all(userGithubRepos.map(async (userGithubRepo) => {
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
                    common_1.Logger.log(`${userGithubRepo.name} is synchronized`);
                }
            }
        }));
        const result = { item: { syncCount } };
        return result;
    }
    async syncRepoBranches(repoId, githubRepoBranches, repoBranches) {
        let syncCount = 0;
        await Promise.all(githubRepoBranches.map(async (githubRepoBranch) => {
            let sync = true;
            repoBranches.forEach((repoBranch) => {
                if (repoBranch.branchName === githubRepoBranch.name) {
                    sync = false;
                    return;
                }
            });
            if (sync) {
                const { item } = await this.syncRepoBranch(repoId, githubRepoBranch.name);
                if (item) {
                    syncCount++;
                    common_1.Logger.log(`${githubRepoBranch.name} is synchronized`);
                }
            }
        }));
        const result = { item: { syncCount } };
        return result;
    }
    async getReposFromGithub(authorization) {
        const requestHeaders = {
            'Content-Type': request_url_1.REQUEST_INFO.GITHUB.CONTENT_TYPE,
            'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            Authorization: authorization,
        };
        try {
            const observable = this.httpService
                .get(`${request_url_1.REQUEST_INFO.GITHUB.PREFIX}/user/repos`, {
                headers: requestHeaders,
            })
                .pipe((0, rxjs_1.map)((res) => res.data));
            const items = await (0, rxjs_1.lastValueFrom)(observable);
            return { items };
        }
        catch (error) {
            common_1.Logger.error(`[RepoService][getRepos] message: ${error.message}`);
            return { items: null };
        }
    }
    async getRepoFromGithub(authorization, owner, repo, branch) {
        const requestHeaders = {
            'Content-Type': request_url_1.REQUEST_INFO.GITHUB.CONTENT_TYPE,
            'X-GitHub-Api-Version': request_url_1.REQUEST_INFO.GITHUB.API_VERSION,
            Authorization: authorization,
        };
        try {
            let requestUrl = `${request_url_1.REQUEST_INFO.GITHUB.PREFIX}/repos/${owner}/${repo}`;
            branch ? (requestUrl += '/branches') : requestUrl;
            const observable = this.httpService
                .get(requestUrl, {
                headers: requestHeaders,
            })
                .pipe((0, rxjs_1.map)((res) => res.data));
            const item = await (0, rxjs_1.lastValueFrom)(observable);
            return { item };
        }
        catch (error) {
            common_1.Logger.error(`[RepoService][getRepo] message: ${error.message}`);
            return { item: null };
        }
    }
};
RepoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(repo_entity_1.RepoEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(repo_branch_entity_1.RepoBranchEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        axios_1.HttpService])
], RepoService);
exports.RepoService = RepoService;
//# sourceMappingURL=repo.service.js.map