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
exports.SprintService = void 0;
const common_1 = require("@nestjs/common");
const sprint_dao_1 = require("./sprint.dao");
let SprintService = class SprintService {
    constructor(sprintDao) {
        this.sprintDao = sprintDao;
    }
    async createSprint(dto) {
        return await this.sprintDao.create(dto);
    }
    async findSprint(dto) {
        const { id, userId } = dto;
        const sprint = await this.sprintDao.findById(id);
        if (!sprint) {
            throw new common_1.NotFoundException('스프린트를 찾을 수 없습니다.');
        }
        if (sprint.user.id !== userId) {
            throw new common_1.UnauthorizedException('접근 권한이 없습니다.');
        }
        return sprint;
    }
};
exports.SprintService = SprintService;
exports.SprintService = SprintService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sprint_dao_1.SprintDao])
], SprintService);
//# sourceMappingURL=sprint.service.js.map