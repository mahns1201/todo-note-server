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
exports.ListResDto = exports.ResDto = exports.CommonResDto = exports.PagingReqDto = exports.TokenDto = exports.BaseDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BaseDto {
}
exports.BaseDto = BaseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BaseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BaseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BaseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseDto.prototype, "isDeleted", void 0);
class TokenDto {
}
exports.TokenDto = TokenDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenDto.prototype, "githubToken", void 0);
class PagingReqDto {
    constructor() {
        this.page = 1;
        this.pageSize = 10;
        this.orderBy = 'id';
        this.sortBy = 'desc';
    }
}
exports.PagingReqDto = PagingReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingReqDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingReqDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'id', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagingReqDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'desc', enum: ['asc', 'desc'], required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagingReqDto.prototype, "sortBy", void 0);
class CommonResDto {
}
exports.CommonResDto = CommonResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'http 상태 코드' }),
    __metadata("design:type", Number)
], CommonResDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 메시지' }),
    __metadata("design:type", String)
], CommonResDto.prototype, "message", void 0);
class ResDto extends CommonResDto {
}
exports.ResDto = ResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'http 상태 코드' }),
    __metadata("design:type", Number)
], ResDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 메시지' }),
    __metadata("design:type", String)
], ResDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 결과' }),
    __metadata("design:type", Object)
], ResDto.prototype, "item", void 0);
class ListResDto extends CommonResDto {
}
exports.ListResDto = ListResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'http 상태 코드' }),
    __metadata("design:type", Number)
], ListResDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 메시지' }),
    __metadata("design:type", String)
], ListResDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 결과' }),
    __metadata("design:type", Array)
], ListResDto.prototype, "items", void 0);
//# sourceMappingURL=common.dto.js.map