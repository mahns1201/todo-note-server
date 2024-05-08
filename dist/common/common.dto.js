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
exports.SwaggerResponseDto = exports.PagingResponseDto = exports.PagingRequestDto = exports.ErrorResponseDto = exports.BaseResponseDto = exports.BaseTimeDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BaseTimeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BaseTimeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BaseTimeDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BaseTimeDto.prototype, "deletedAt", void 0);
exports.BaseTimeDto = BaseTimeDto;
class BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'http 상태 코드' }),
    __metadata("design:type", Number)
], BaseResponseDto.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 메시지' }),
    __metadata("design:type", String)
], BaseResponseDto.prototype, "message", void 0);
exports.BaseResponseDto = BaseResponseDto;
class ErrorResponseDto extends BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'error 메시지' }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
exports.ErrorResponseDto = ErrorResponseDto;
class PagingRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'requestPage' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'limit' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingRequestDto.prototype, "limit", void 0);
exports.PagingRequestDto = PagingRequestDto;
class PagingResponseDto extends BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'currentPage' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'limit' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'totalCount' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PagingResponseDto.prototype, "totalCount", void 0);
exports.PagingResponseDto = PagingResponseDto;
class SwaggerResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'http 상태 코드' }),
    __metadata("design:type", Number)
], SwaggerResponseDto.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 메시지' }),
    __metadata("design:type", String)
], SwaggerResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 결과가 복수개 일 때의 결과' }),
    __metadata("design:type", Array)
], SwaggerResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'api 응답 결과가 단수개 일 때의 결과' }),
    __metadata("design:type", Object)
], SwaggerResponseDto.prototype, "item", void 0);
exports.SwaggerResponseDto = SwaggerResponseDto;
//# sourceMappingURL=common.dto.js.map