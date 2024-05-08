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
const swagger_1 = require("@nestjs/swagger");
const task_service_1 = require("./task.service");
const auth_guard_1 = require("../auth/jwt/auth.guard");
const user_decorator_1 = require("../decorator/user.decorator");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async createTask(request, body) {
        const { id: userId } = request.user;
        const input = Object.assign({ userId }, body);
        const newTask = await this.taskService.createOne(input);
        const httpStatus = !newTask
            ? common_1.HttpStatus.INTERNAL_SERVER_ERROR
            : common_1.HttpStatus.CREATED;
        const message = !newTask
            ? '태스크 생성에 실패했습니다.'
            : '태스크가 성공적으로 생성되었습니다.';
        const result = { httpStatus, message, item: newTask };
        return result;
    }
    async findTaskById(user, param) {
        const { id: taskId } = param;
        const { item: task } = await this.taskService.findOne(taskId);
        const httpStatus = !task ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.OK;
        const message = !task
            ? '태스크를 해당 id로 찾을 수 없습니다.'
            : '태스크를 성공적으로 찾았습니다.';
        const result = { item: task, httpStatus, message };
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiHeader)({
        name: 'JWT',
        description: 'Bearer JWT 토큰을 해더에 담아서 요청',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                repoId: {
                    type: 'number',
                    description: 'repoId',
                },
                repoBranchId: {
                    type: 'number',
                    description: 'repoBranchId',
                },
                title: {
                    type: 'string',
                    description: '제목',
                },
                content: {
                    type: 'string',
                    description: '내용',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: '태스크 생성',
        description: '새로운 태스크를 생성합니다.',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiHeader)({
        name: 'JWT',
        description: 'Bearer JWT 토큰을 해더에 담아서 요청',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'taskId',
    }),
    (0, swagger_1.ApiOperation)({
        summary: '태스크 조회',
        description: 'parameter에 id를 넘겨 태스크를 조회합니다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findTaskById", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map