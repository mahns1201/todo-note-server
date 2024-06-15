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
exports.SprintController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const sprint_service_1 = require("./sprint.service");
const create_sprint_dto_1 = require("./dto/create-sprint.dto");
const swagger_1 = require("@nestjs/swagger");
const common_dto_1 = require("../common/common.dto");
const sprint_dto_1 = require("./dto/sprint.dto");
const progress_1 = require("../util/progress");
const typeorm_1 = require("typeorm");
let SprintController = class SprintController {
    constructor(sprintService) {
        this.sprintService = sprintService;
    }
    serialize(sprint) {
        return {
            id: sprint.id,
            createdAt: sprint.createdAt,
            updatedAt: sprint.updatedAt,
            userId: sprint.userId,
            repoId: sprint.repoId,
            title: sprint.title,
            description: sprint.description,
            startAt: sprint.startAt,
            endAt: sprint.endAt,
            repoName: sprint.repo.name,
            repoHtmlUrl: sprint.repo.htmlUrl,
            repoOwnerAvatarUrl: sprint.repo.ownerAvatarUrl,
            repoSynchronizedAt: sprint.repo.synchronizedAt,
        };
    }
    async createSprint(req, param, body) {
        const sprint = await this.sprintService.createSprint(Object.assign(Object.assign({}, body), { repoId: param.repoId, userId: req.user.id }));
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '스프린트를 생성했습니다.',
            item: this.serialize(sprint),
        };
    }
    async getUpcomingSprintList(req, query) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        const where = { endAt: (0, typeorm_1.LessThanOrEqual)(endDate) };
        const [sprints, totalCount] = await this.sprintService.findSprints({
            userId: req.user.id,
            page: query.page,
            pageSize: query.pageSize,
            orderBy: query.orderBy,
            sortBy: query.sortBy,
            where,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `총 ${totalCount}개중 ${sprints.length}개의 마감 임박 스프린트 리스트를 조회했습니다.`,
            items: sprints.map((sprint) => this.serialize(sprint)),
        };
    }
    async getSprintList(req, query) {
        const [sprints, totalCount] = await this.sprintService.findSprints({
            userId: req.user.id,
            page: query.page,
            pageSize: query.pageSize,
            orderBy: query.orderBy,
            sortBy: query.sortBy,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `총 ${totalCount}개중 ${sprints.length}개의 스프린트 리스트를 조회했습니다.`,
            items: sprints.map((sprint) => this.serialize(sprint)),
        };
    }
    async findSprint(req, param) {
        const sprint = await this.sprintService.findSprint({
            id: param.id,
            userId: req.user.id,
        });
        const [totalCount, openedCount, closedCount, progressPercent] = (0, progress_1.calcProgress)(sprint.tasks.length, sprint.tasks.filter((task) => task.isClosed).length);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '스프린트를 조회했습니다.',
            item: Object.assign(Object.assign({}, this.serialize(sprint)), { totalCount,
                openedCount,
                closedCount,
                progressPercent }),
        };
    }
};
exports.SprintController = SprintController;
__decorate([
    (0, common_1.Post)('repo/:repoId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '스프린트 생성',
        description: '새로운 스프린트를 생성합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: sprint_dto_1.ResSprintDto,
        status: common_1.HttpStatus.CREATED,
        description: '스프린트를 성공적으로 생성하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_sprint_dto_1.CreateSprintDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "createSprint", null);
__decorate([
    (0, common_1.Get)('list/upcoming'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '마감 임박 스프린트 목록 조회',
        description: '5일 이내로 마감될 스프린트 목록을 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: [sprint_dto_1.ResSprintDto],
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_dto_1.PagingReqDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "getUpcomingSprintList", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '스프린트 목록 조회',
        description: '스프린트 목록을 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: [sprint_dto_1.ResSprintDto],
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, common_dto_1.PagingReqDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "getSprintList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '스프린트 조회',
        description: '스프린트를 조회합니다.',
    }),
    (0, swagger_1.ApiParam)({
        type: Number,
        name: 'id',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: sprint_dto_1.ResSprintProgressDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "findSprint", null);
exports.SprintController = SprintController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('sprint'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiTags)('sprint'),
    __metadata("design:paramtypes", [sprint_service_1.SprintService])
], SprintController);
//# sourceMappingURL=sprint.controller.js.map