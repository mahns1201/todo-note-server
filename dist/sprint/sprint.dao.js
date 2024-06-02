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
exports.SprintDao = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const sprint_entity_1 = require("./sprint.entity");
let SprintDao = class SprintDao {
    constructor(sprintRepository) {
        this.sprintRepository = sprintRepository;
    }
    async create(dto) {
        const sprint = this.sprintRepository.create(dto);
        await this.sprintRepository.save(sprint);
        return sprint;
    }
    async findById(id) {
        return await this.sprintRepository.findOne({
            where: {
                id,
                deletedAt: null,
            },
            relations: ['user', 'repo'],
        });
    }
    async find(dto) {
        const { page, pageSize, orderBy, sortBy, userId } = dto;
        const [results, total] = await this.sprintRepository.findAndCount({
            where: { userId, deletedAt: null },
            take: pageSize,
            skip: pageSize * (page - 1),
            order: { [orderBy]: sortBy },
            relations: ['user', 'repo'],
        });
        return [results, total];
    }
};
exports.SprintDao = SprintDao;
exports.SprintDao = SprintDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sprint_entity_1.SprintEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SprintDao);
//# sourceMappingURL=sprint.dao.js.map