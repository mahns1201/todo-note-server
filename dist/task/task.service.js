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
let TaskService = class TaskService {
    constructor(taskRepository, uploadService) {
        this.taskRepository = taskRepository;
        this.uploadService = uploadService;
    }
    async createTask(input) {
        const newTask = this.taskRepository.create(input);
        const result = await this.taskRepository.save(newTask);
        return { item: result };
    }
    async findTaskById(input) {
        const { id } = input;
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user', 'repo', 'repoBranch'],
        });
        const { item: upload } = await this.uploadService.findUploadByTaskId({
            taskId: id,
            userId: task.user.id,
        });
        return { items: { task, upload } };
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        upload_service_1.UploadService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map