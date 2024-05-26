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
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const branch_dao_1 = require("./branch.dao");
const repo_service_1 = require("../repo/repo.service");
const github_service_1 = require("../github/github.service");
const user_service_1 = require("../user/user.service");
let BranchService = class BranchService {
    constructor(branchDao, userService, repoService, githubService) {
        this.branchDao = branchDao;
        this.userService = userService;
        this.repoService = repoService;
        this.githubService = githubService;
    }
    async createBranch(dto) {
        const { userId, repoId } = dto;
        await this.repoService.findRepo({ id: repoId, userId });
        return await this.branchDao.create(dto);
    }
    async findBranch(dto) {
        const { id, repoId, userId } = dto;
        await this.repoService.findRepo({ id: repoId, userId });
        const branch = await this.branchDao.findById(id);
        if (!branch) {
            throw new common_1.NotFoundException('브랜치를 찾을 수 없습니다.');
        }
        return branch;
    }
    async syncRepoBranches(dto) {
        const { userId, repoId } = dto;
        const githubToken = await this.userService.findUserGithubToken({
            id: userId,
        });
        const profile = await this.githubService.getProfile(githubToken);
        const repo = await this.repoService.findRepo({ id: repoId, userId });
        const branches = await this.branchDao.findAllByRepoId(repoId);
        const githubBranches = await this.githubService.getBranches(githubToken, profile.login, repo.repoName);
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
                    common_1.Logger.log(`${githubBranch.name} is synchronized`);
                }
            }
        }
        return { syncBranchNames, syncCount };
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [branch_dao_1.BranchDao,
        user_service_1.UserService,
        repo_service_1.RepoService,
        github_service_1.GithubService])
], BranchService);
//# sourceMappingURL=branch.service.js.map