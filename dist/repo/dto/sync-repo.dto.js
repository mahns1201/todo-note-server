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
exports.ResSyncRepoDto = exports.SyncRepoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const repo_dto_1 = require("./repo.dto");
const res_dto_1 = require("../../common/dto/res.dto");
class SyncRepoDto extends (0, swagger_1.PickType)(repo_dto_1.RepoDto, ['userId']) {
}
exports.SyncRepoDto = SyncRepoDto;
class ResSyncRepoDto extends res_dto_1.ResDto {
}
exports.ResSyncRepoDto = ResSyncRepoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '레포지토리 동기화 목록' }),
    __metadata("design:type", Array)
], ResSyncRepoDto.prototype, "items", void 0);
//# sourceMappingURL=sync-repo.dto.js.map