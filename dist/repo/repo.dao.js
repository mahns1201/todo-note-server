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
exports.RepoDao = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const repo_entity_1 = require("./repo.entity");
let RepoDao = class RepoDao {
    constructor(repoRepository) {
        this.repoRepository = repoRepository;
    }
    async create(dto) {
        const repo = this.repoRepository.create(dto);
        await this.repoRepository.save(repo);
        return repo;
    }
    async findById(id) {
        return await this.repoRepository.findOne({
            where: {
                id,
                deletedAt: null,
            },
        });
    }
    async find(dto) {
        const { page, pageSize, orderBy, sortBy, userId } = dto;
        const [results, total] = await this.repoRepository.findAndCount({
            where: { userId, deletedAt: null },
            take: pageSize,
            skip: pageSize * (page - 1),
            order: { [orderBy]: sortBy },
            relations: ['user', 'branches'],
        });
        return [results, total];
    }
    async findAllByUserId(userId) {
        return await this.repoRepository.find({
            where: { userId, deletedAt: null },
        });
    }
};
exports.RepoDao = RepoDao;
exports.RepoDao = RepoDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(repo_entity_1.RepoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RepoDao);
//# sourceMappingURL=repo.dao.js.map