"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFindUserDto = exports.InputFindUserDto = void 0;
const common_dto_1 = require("../../common/common.dto");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
class InputFindUserDto extends (0, swagger_1.PickType)(user_dto_1.UserDto, ['email']) {
}
exports.InputFindUserDto = InputFindUserDto;
class OutputFindUserDto extends common_dto_1.SwaggerResponseDto {
}
exports.OutputFindUserDto = OutputFindUserDto;
//# sourceMappingURL=find-user.dto.js.map