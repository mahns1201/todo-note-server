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
exports.TaskDao = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
let TaskDao = class TaskDao {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(dto) {
        const task = this.taskRepository.create(dto);
        await this.taskRepository.save(task);
        return task;
    }
    async findById(id) {
        return await this.taskRepository.findOne({
            where: {
                id,
                deletedAt: null,
            },
            relations: ['user', 'repo'],
        });
    }
    async find(dto) {
        const { page, pageSize, orderBy, sortBy, userId } = dto;
        const [results, total] = await this.taskRepository.findAndCount({
            where: { userId, deletedAt: null },
            take: pageSize,
            skip: pageSize * (page - 1),
            order: { [orderBy]: sortBy },
            relations: ['user', 'repo'],
        });
        return [results, total];
    }
};
exports.TaskDao = TaskDao;
exports.TaskDao = TaskDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TaskDao);
//# sourceMappingURL=task.dao.js.map