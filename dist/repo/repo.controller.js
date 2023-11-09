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
exports.RepoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const repo_service_1 = require("./repo.service");
const user_service_1 = require("../user/user.service");
const find_user_repo_dto_1 = require("./dto/find-user-repo.dto");
let RepoController = class RepoController {
    constructor(repoService, userService) {
        this.repoService = repoService;
        this.userService = userService;
    }
    async findUserRepos(input) {
        const { item: { id: userId }, } = await this.userService.findUser(input);
        const { items } = await this.repoService.findUserRepos(userId);
        const httpStatus = !items ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.OK;
        const message = !items
            ? '유저의 레포지토리를 해당 이름으로 찾을 수 없습니다.'
            : '유저의 레포지토리를 성공적으로 가지고 왔습니다.';
        return {
            items,
            message,
            httpStatus,
        };
    }
    async getReposFromGithub(headers) {
        const { authorization } = headers;
        const { items } = await this.repoService.getReposFromGithub(authorization);
        const httpStatus = !items
            ? common_1.HttpStatus.INTERNAL_SERVER_ERROR
            : common_1.HttpStatus.OK;
        const message = !items
            ? '유저의 레포지토리 리스트를 알 수 없는 이유로 찾을 수 없습니다.'
            : '유저의 레포지토리 리스트를 성공적으로 가지고 왔습니다.';
        return {
            items,
            message,
            httpStatus,
        };
    }
    async syncRepos(headers, input) {
        const { email } = input;
        const { item: { id: userId }, } = await this.userService.findUser(email);
        const { authorization } = headers;
        const { items: userGithubRepos } = await this.repoService.getReposFromGithub(authorization);
        const { items: userRepoItems } = await this.repoService.findUserRepos(userId);
        const [userRepos] = userRepoItems;
        const { item: { syncCount }, } = await this.repoService.syncUserRepos(userId, userGithubRepos, userRepos);
        const message = syncCount
            ? `레포지토리 ${syncCount}개가 성공적으로 동기화 되었습니다.`
            : '레포지토리 동기화 상태가 최신입니다.';
        const httpStatus = syncCount ? common_1.HttpStatus.CREATED : common_1.HttpStatus.OK;
        return { message, httpStatus };
    }
    async syncRepoBranch(headers, input) {
        const { authorization } = headers;
        const { owner, repo, branch = true, email } = input;
        const { item: { id: userId }, } = await this.userService.findUser(email);
        const { item: githubRepoBranches } = await this.repoService.getRepoFromGithub(authorization, owner, repo, branch);
        const { item: { id: repoId }, } = await this.repoService.findUserRepo(userId, repo);
        const { items: repoBranches } = await this.repoService.findRepoBranches(repoId);
        const { item: { syncCount }, } = await this.repoService.syncRepoBranches(repoId, githubRepoBranches, repoBranches);
        const message = syncCount
            ? `레포지토리 ${repo}의 브랜치 ${syncCount}개가 성공적으로 동기화 되었습니다.`
            : '레포지토리 ${repo}의 브랜치 동기화 상태가 최신입니다.';
        const httpStatus = syncCount ? common_1.HttpStatus.CREATED : common_1.HttpStatus.OK;
        return { message, httpStatus };
    }
};
__decorate([
    (0, common_1.Get)('/:email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_repo_dto_1.InputFindUserReposDto]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "findUserRepos", null);
__decorate([
    (0, common_1.Get)('github/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '유저 레포지토리 리스트 조회',
        description: '유저의 레포지토리 리스트를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '유저 레포지토리 리스트 조회에 성공했습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: '유저 레포지토리 리스트 조회에 실패했습니다.',
    }),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "getReposFromGithub", null);
__decorate([
    (0, common_1.Post)('github/sync'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '유저 레포지토리 동기화',
        description: '유저의 이메일로 레포지토리를 조회하여 db를 동기화 합니다',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "syncRepos", null);
__decorate([
    (0, common_1.Post)('github/sync/branch'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '유저 레포지토리 브랜치 동기화',
        description: '유저의 레포지토리 브랜치를 조회하여 db를 동기화 합니다',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "syncRepoBranch", null);
RepoController = __decorate([
    (0, common_1.Controller)('repo'),
    (0, swagger_1.ApiTags)('repository'),
    __metadata("design:paramtypes", [repo_service_1.RepoService,
        user_service_1.UserService])
], RepoController);
exports.RepoController = RepoController;
//# sourceMappingURL=repo.controller.js.map