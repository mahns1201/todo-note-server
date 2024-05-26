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
const find_sprint_dto_1 = require("./dto/find-sprint.dto");
let SprintController = class SprintController {
    constructor(sprintService) {
        this.sprintService = sprintService;
    }
    async createSprint(req, body) {
        const sprint = await this.sprintService.createSprint(Object.assign(Object.assign({}, body), { userId: req.user.id }));
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '스프린트를 생성했습니다.',
            item: {
                id: sprint.id,
                createdAt: sprint.createdAt,
                updatedAt: sprint.updatedAt,
                userId: sprint.userId,
                title: sprint.title,
                description: sprint.description,
                startAt: sprint.startAt,
                endAt: sprint.endAt,
            },
        };
    }
    async findSprint(req, param) {
        const sprint = await this.sprintService.findSprint({
            id: param.id,
            userId: req.user.id,
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '스프린트를 조회했습니다.',
            item: {
                id: sprint.id,
                createdAt: sprint.createdAt,
                updatedAt: sprint.updatedAt,
                userId: sprint.userId,
                title: sprint.title,
                description: sprint.description,
                startAt: sprint.startAt,
                endAt: sprint.endAt,
            },
        };
    }
};
exports.SprintController = SprintController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '스프린트 생성',
        description: '새로운 스프린트를 생성합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_sprint_dto_1.ResCreateSprintDto,
        status: common_1.HttpStatus.CREATED,
        description: '스프린트를 성공적으로 생성하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sprint_dto_1.CreateSprintDto]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "createSprint", null);
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
        type: find_sprint_dto_1.ResFindSprintDto,
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