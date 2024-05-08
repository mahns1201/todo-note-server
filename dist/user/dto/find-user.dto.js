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
exports.OutputFindUserDto = exports.InputFindUserDto = void 0;
const common_dto_1 = require("../../common/common.dto");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
class OutputUserDto extends (0, swagger_1.OmitType)(user_dto_1.UserDto, [
    'password',
    'githubAccessToken',
]) {
}
class InputFindUserDto extends (0, swagger_1.PickType)(user_dto_1.UserDto, ['id']) {
}
exports.InputFindUserDto = InputFindUserDto;
class OutputFindUserDto extends common_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", OutputUserDto)
], OutputFindUserDto.prototype, "item", void 0);
exports.OutputFindUserDto = OutputFindUserDto;
//# sourceMappingURL=find-user.dto.js.map