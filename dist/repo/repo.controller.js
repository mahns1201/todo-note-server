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
const auth_guard_1 = require("../auth/jwt/auth.guard");
const user_decorator_1 = require("../decorator/user.decorator");
const find_repo_dto_1 = require("./dto/find-repo.dto");
const common_dto_1 = require("../common/common.dto");
let RepoController = class RepoController {
    constructor(repoService, userService) {
        this.repoService = repoService;
        this.userService = userService;
    }
    async findUserRepos(user, query) {
        const { page, limit } = query;
        const { items, totalCount } = await this.repoService.find({
            id: user.id,
            page,
            limit,
        });
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: `${page}p 레포지토리 리스트를 성공적으로 조회했습니다.`,
            currentPage: page,
            limit,
            totalCount,
            items,
        };
    }
    async syncRepoByGithub(user, res) {
        let message = '모두 동기화 완료 상태입니다.';
        let httpStatus = common_1.HttpStatus.OK;
        const { id: userId, username } = user;
        const { item: githubAccessToken } = await this.userService.getGithubAccessToken({ id: userId });
        const githubRepositories = await this.repoService.getRepoListFromGithub(githubAccessToken, username);
        const { items: userRepos } = await this.repoService.findAll({
            id: userId,
        });
        const { item: { syncRepoNames, syncCount: syncRepoCount }, } = await this.repoService.syncUserRepos(userId, githubRepositories, userRepos);
        if (syncRepoCount) {
            message = `${syncRepoCount}개 레포지토리 동기화: [${syncRepoNames}]`;
            httpStatus = common_1.HttpStatus.CREATED;
        }
        for (const repoName of syncRepoNames) {
            const githubRepoBranches = await this.repoService.getRepoBranchesFromGithub(githubAccessToken, username, repoName);
            if (!githubRepoBranches || !githubRepoBranches.length) {
                continue;
            }
            const { item: { id: repoId }, } = await this.repoService.findRepoByUserIdAndRepoName(userId, repoName);
            const repoBranches = await this.repoService.findRepoBranchesByRepoId(repoId);
            const { item: { syncBranchNames }, } = await this.repoService.syncRepoBranches(repoId, githubRepoBranches, repoBranches);
            if (syncBranchNames.length) {
                message += `\n레포지토리 ${repoName}의 ${syncBranchNames.length}개 브랜치 동기화: [${syncBranchNames}]`;
            }
        }
        res.status(httpStatus).json({ message, httpStatus });
    }
};
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 레포지토리 리스트를 조회한다.' }),
    (0, swagger_1.ApiOkResponse)({
        type: find_repo_dto_1.OutputFindReposDto,
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.BAD_REQUEST,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.UNAUTHORIZED,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.NOT_FOUND,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_dto_1.PagingRequestDto]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "findUserRepos", null);
__decorate([
    (0, common_1.Post)('github/sync'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '유저의 레포지토리/브랜치를 깃허브와 동기화 한다.' }),
    (0, swagger_1.ApiOkResponse)({
        type: common_dto_1.BaseResponseDto,
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: common_dto_1.BaseResponseDto,
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.UNAUTHORIZED,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: common_dto_1.ErrorResponseDto,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "syncRepoByGithub", null);
RepoController = __decorate([
    (0, common_1.Controller)('repo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('repository'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [repo_service_1.RepoService,
        user_service_1.UserService])
], RepoController);
exports.RepoController = RepoController;
//# sourceMappingURL=repo.controller.js.map