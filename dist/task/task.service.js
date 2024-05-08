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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const task_entity_1 = require("./entity/task.entity");
const upload_service_1 = require("../upload/upload.service");
const repo_service_1 = require("../repo/repo.service");
const user_service_1 = require("../user/user.service");
let TaskService = class TaskService {
    constructor(taskRepository, userService, repoService, uploadService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
        this.repoService = repoService;
        this.uploadService = uploadService;
    }
    async createOne(input) {
        const { userId, repoId, title, content } = input;
        const { item: user } = await this.userService.findOne(userId);
        const repo = await this.repoService.findRepo(repoId);
        const taskObj = { user, repo, title, content };
        const newTask = this.taskRepository.create(taskObj);
        const result = await this.taskRepository.save(newTask);
        return result;
    }
    async findOne(inputFindTaskDto) {
        const { id } = inputFindTaskDto;
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user', 'repo'],
        });
        return { item: task };
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService,
        repo_service_1.RepoService,
        upload_service_1.UploadService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map