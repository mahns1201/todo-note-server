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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_dao_1 = require("./task.dao");
const repo_service_1 = require("../repo/repo.service");
const sprint_service_1 = require("../sprint/sprint.service");
let TaskService = class TaskService {
    constructor(taskDao, repoService, sprintService) {
        this.taskDao = taskDao;
        this.repoService = repoService;
        this.sprintService = sprintService;
    }
    async createTask(dto) {
        const { repoId, userId, sprintId } = dto;
        await this.repoService.findRepo({ id: repoId, userId });
        let sprint;
        if (sprintId) {
            sprint = await this.sprintService.findSprint({ id: sprintId, userId });
        }
        const createdTask = await this.taskDao.create(dto, sprint);
        return this.findTask({ id: createdTask.id, userId });
    }
    async findTask(dto) {
        const { id, userId } = dto;
        const task = await this.taskDao.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found.');
        }
        if (task.user.id !== userId) {
            throw new common_1.UnauthorizedException('Access denied.');
        }
        return task;
    }
    async findTasks(dto) {
        return await this.taskDao.find(dto);
    }
    async findTasksByRepoId(dto) {
        return await this.taskDao.findByRepoId(dto);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_dao_1.TaskDao,
        repo_service_1.RepoService,
        sprint_service_1.SprintService])
], TaskService);
//# sourceMappingURL=task.service.js.map