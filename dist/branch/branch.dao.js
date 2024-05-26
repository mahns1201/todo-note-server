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
exports.BranchDao = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const branch_entity_1 = require("./branch.entity");
let BranchDao = class BranchDao {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async create(dto) {
        const branch = this.branchRepository.create(dto);
        await this.branchRepository.save(branch);
        return branch;
    }
    async findById(id) {
        return await this.branchRepository.findOne({
            where: {
                id,
                deletedAt: null,
            },
            relations: ['repo'],
        });
    }
    async findAllByRepoId(repoId) {
        return await this.branchRepository.find({
            where: { repoId, deletedAt: null },
        });
    }
};
exports.BranchDao = BranchDao;
exports.BranchDao = BranchDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(branch_entity_1.BranchEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BranchDao);
//# sourceMappingURL=branch.dao.js.map