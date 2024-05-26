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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const swagger_1 = require("@nestjs/swagger");
const find_task_dto_1 = require("./dto/find-task.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async createTask(req, body) {
        const task = await this.taskService.createTask(Object.assign(Object.assign({}, body), { userId: req.user.id }));
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '태스크를 생성했습니다.',
            item: {
                id: task.id,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                userId: task.userId,
                repoId: task.repoId,
                title: task.title,
                content: task.content,
                isGithubIssue: task.isGithubIssue,
            },
        };
    }
    async findTask(req, param) {
        const result = await this.taskService.findTask({
            id: param.id,
            userId: req.user.id,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '태스크를 조회했습니다.',
            item: {
                id: result.id,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                userId: result.userId,
                repoId: result.repoId,
                title: result.title,
                content: result.content,
                isGithubIssue: result.isGithubIssue,
            },
        };
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '태스크 생성',
        description: '새로운 태스크를 생성합니다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_task_dto_1.ResCreateTaskDto,
        status: common_1.HttpStatus.CREATED,
        description: '태스크를 성공적으로 생성하였습니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '태스크 조회',
        description: '태스크를 조회합니다.',
    }),
    (0, swagger_1.ApiParam)({
        type: Number,
        name: 'id',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: find_task_dto_1.ResFindTaskDto,
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('task'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiTags)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map