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
exports.ResFindTasksDto = exports.FindTasksDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_dto_1 = require("../../common/common.dto");
const res_dto_1 = require("../../common/dto/res.dto");
class FindTasksDto extends common_dto_1.PagingReqDto {
}
exports.FindTasksDto = FindTasksDto;
class ResFindTasksDto extends res_dto_1.ResDto {
}
exports.ResFindTasksDto = ResFindTasksDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '조회된 태스크 목록' }),
    __metadata("design:type", Array)
], ResFindTasksDto.prototype, "items", void 0);
//# sourceMappingURL=find-tasks.dto.js.map