"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputGithubAccessTokenUpdateDto = exports.InputGithubAccessTokenUpdateDto = void 0;
const common_dto_1 = require("../../common/common.dto");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
class InputGithubAccessTokenUpdateDto extends (0, swagger_1.PickType)(user_dto_1.UserDto, [
    'email',
]) {
}
exports.InputGithubAccessTokenUpdateDto = InputGithubAccessTokenUpdateDto;
class OutputGithubAccessTokenUpdateDto extends common_dto_1.SwaggerResponseDto {
}
exports.OutputGithubAccessTokenUpdateDto = OutputGithubAccessTokenUpdateDto;
//# sourceMappingURL=update-user.dto.js.map