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
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const repo_service_1 = require("./repo.service");
const create_repo_dto_1 = require("./dto/create-repo.dto");
const common_dto_1 = require("../common/common.dto");
const swagger_1 = require("@nestjs/swagger");
const sync_repo_dto_1 = require("./dto/sync-repo.dto");
const repo_dto_1 = require("./dto/repo.dto");
let RepoController = class RepoController {
    constructor(repoService) {
        this.repoService = repoService;
    }
    serialize(repo) {
        return {
            id: repo.id,
            createdAt: repo.createdAt,
            updatedAt: repo.updatedAt,
            userId: repo.userId,
            repoName: repo.repoName,
            defaultBranch: repo.defaultBranch,
            htmlUrl: repo.htmlUrl,
            isPrivate: repo.isPrivate,
            isFork: repo.isFork,
            imageUrl: repo.imageUrl,
            description: repo.description,
            language: repo.language,
            ownerAvatarUrl: repo.ownerAvatarUrl,
            synchronizedAt: repo.synchronizedAt,
        };
    }
    async createRepo(req, body) {
        const repo = await this.repoService.createRepo(Object.assign(Object.assign({}, body), { userId: req.user.id }));
        return {
            message: '레포지토리를 생성했습니다.',
            statusCode: common_1.HttpStatus.CREATED,
            item: this.serialize(repo),
        };
    }
    async findUserRepos(req, query) {
        const [repos, totalCount] = await this.repoService.findRepos({
            userId: req.user.id,
            page: query.page,
            pageSize: query.pageSize,
            orderBy: query.orderBy,
            sortBy: query.sortBy,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `총 ${totalCount}개중 ${repos.length}개의 레포지토리 리스트를 조회했습니다.`,
            items: repos.map((repo) => this.serialize(repo)),
        };
    }
    async findUserRepo(req, param) {
        const repo = await this.repoService.findRepo({
            id: param.id,
            userId: req.user.id,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '레포지토리를 조회했습니다.',
            item: this.serialize(repo),
        };
    }
    async syncUserRepos(req) {
        const { syncRepoNames, syncCount } = await this.repoService.syncUserRepos({
            userId: req.user.id,
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: `${syncCount}개 레포지토리가 동기화됐습니다.`,
            items: syncRepoNames,
        };
    }
};
exports.RepoController = RepoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '레포지토리 생성',
        description: '새로운 레포지토리를 생성합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: repo_dto_1.ResRepoDto,
        status: common_1.HttpStatus.CREATED,
        description: '레포지토리를 성공적으로 생성하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_repo_dto_1.CreateRepoDto]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "createRepo", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '레포지토리 리스트 조회',
        description: '레포지토리 리스트를 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: [repo_dto_1.ResRepoDto],
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_dto_1.PagingReqDto]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "findUserRepos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiParam)({
        type: Number,
        name: 'id',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '레포지토리 조회',
        description: '레포지토리를 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: repo_dto_1.ResRepoDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "findUserRepo", null);
__decorate([
    (0, common_1.Post)('sync'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '레포지토리 동기화',
        description: '깃허브 레포지토리를 동기화합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: sync_repo_dto_1.ResSyncRepoDto,
        status: common_1.HttpStatus.CREATED,
        description: '레포지토리를 성공적으로 동기화 하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepoController.prototype, "syncUserRepos", null);
exports.RepoController = RepoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('repo'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiTags)('repo'),
    __metadata("design:paramtypes", [repo_service_1.RepoService])
], RepoController);
//# sourceMappingURL=repo.controller.js.map