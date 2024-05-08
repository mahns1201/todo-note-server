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
exports.SprintService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sprint_entity_1 = require("./entity/sprint.entity");
const typeorm_2 = require("typeorm");
const date_1 = require("../util/date");
let SprintService = class SprintService {
    constructor(sprintRepository) {
        this.sprintRepository = sprintRepository;
    }
    async create(input, repo) {
        const { startAt: startDate, endAt: endDate } = input;
        const startAt = (0, date_1.convertIncomingDate)(startDate);
        const endAt = (0, date_1.convertIncomingDate)(endDate);
        const newSprint = this.sprintRepository.create(Object.assign(Object.assign({}, input), { startAt,
            endAt,
            repo }));
        const savedSprint = await this.sprintRepository.save(newSprint);
        common_1.Logger.log(`생성 완료`);
        return { item: savedSprint };
    }
    async find(input) {
        const { id: userId, page, limit } = input;
        const queryBuilder = this.sprintRepository
            .createQueryBuilder('sprint')
            .leftJoinAndSelect('sprint.user', 'user')
            .leftJoinAndSelect('sprint.repo', 'repo')
            .where('sprint.userId = :userId', { userId })
            .offset((page - 1) * limit)
            .limit(limit);
        const [sprints, totalCount] = await queryBuilder.getManyAndCount();
        if (!sprints.length) {
            throw new common_1.NotFoundException(`${page}p에 발견된 스프린트가 없습니다.`);
        }
        return {
            items: sprints,
            totalCount,
        };
    }
};
SprintService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sprint_entity_1.SprintEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SprintService);
exports.SprintService = SprintService;
//# sourceMappingURL=sprint.service.js.map