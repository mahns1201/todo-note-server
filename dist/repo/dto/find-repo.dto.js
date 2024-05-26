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
exports.ResFindRepoDto = exports.FindRepoByIdDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const res_dto_1 = require("../../common/dto/res.dto");
const repo_dto_1 = require("./repo.dto");
class FindRepoByIdDto {
}
exports.FindRepoByIdDto = FindRepoByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindRepoByIdDto.prototype, "id", void 0);
class ResFindRepoDto extends res_dto_1.ResDto {
}
exports.ResFindRepoDto = ResFindRepoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '조회된 레포지토리' }),
    __metadata("design:type", repo_dto_1.ResRepoDto)
], ResFindRepoDto.prototype, "item", void 0);
//# sourceMappingURL=find-repo.dto.js.map