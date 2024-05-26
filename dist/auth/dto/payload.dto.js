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
exports.ResPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const res_dto_1 = require("../../common/dto/res.dto");
class PayLoad {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayLoad.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayLoad.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayLoad.prototype, "iat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayLoad.prototype, "exp", void 0);
class ResPayloadDto extends res_dto_1.ResDto {
}
exports.ResPayloadDto = ResPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '로그인 유저' }),
    __metadata("design:type", PayLoad)
], ResPayloadDto.prototype, "item", void 0);
//# sourceMappingURL=payload.dto.js.map