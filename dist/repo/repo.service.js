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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoService = void 0;
const common_1 = require("@nestjs/common");
const repo_dao_1 = require("./repo.dao");
const user_service_1 = require("../user/user.service");
const github_service_1 = require("../github/github.service");
let RepoService = class RepoService {
    constructor(repoDao, userService, githubService) {
        this.repoDao = repoDao;
        this.userService = userService;
        this.githubService = githubService;
    }
    async createRepo(dto) {
        return await this.repoDao.create(dto);
    }
    async findRepo(dto) {
        const { id, userId } = dto;
        const repo = await this.repoDao.findById(id, userId);
        if (!repo) {
            throw new common_1.NotFoundException('레포지토리를 찾을 수 없습니다.');
        }
        if (repo.userId !== userId) {
            throw new common_1.UnauthorizedException('접근 권한이 없습니다.');
        }
        return repo;
    }
    async findRepos(dto) {
        return await this.repoDao.find(dto);
    }
    async syncUserRepos(dto) {
        const { userId } = dto;
        const { githubId, githubToken } = await this.userService.findUser({
            id: userId,
        });
        const repos = await this.repoDao.findAllByUserId(userId);
        const githubRepos = await this.githubService.getRepos(githubToken);
        let syncCount = 0;
        const syncRepoNames = [];
        for (const githubRepo of githubRepos) {
            const repoExists = repos.some((repo) => repo.repoName === githubRepo.name);
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
                    common_1.Logger.log(`${githubRepo.name} is synchronized`);
                }
            }
        }
        return { syncRepoNames, syncCount };
    }
};
exports.RepoService = RepoService;
exports.RepoService = RepoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repo_dao_1.RepoDao,
        user_service_1.UserService,
        github_service_1.GithubService])
], RepoService);
//# sourceMappingURL=repo.service.js.map