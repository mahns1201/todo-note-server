"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputCreateUserDto = exports.InputCreateUserDto = void 0;
const common_dto_1 = require("../../common/common.dto");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
class InputCreateUserDto extends (0, swagger_1.OmitType)(user_dto_1.UserDto, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
]) {
}
exports.InputCreateUserDto = InputCreateUserDto;
class OutputCreateUserDto extends common_dto_1.SwaggerResponseDto {
}
exports.OutputCreateUserDto = OutputCreateUserDto;
//# sourceMappingURL=create-user.dto.js.map